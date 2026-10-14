"""Request logging middleware, bot heuristics, and the staff activity pages."""

import time
from datetime import timedelta

import pytest
from django.contrib.auth.models import User
from django.utils import timezone

from app.models import Bill, RequestLog
from app.services.activity import is_bot_user_agent, looks_like_email, signup_details, user_activities
from app.views.auth import make_signup_token
from tests.conftest import TEST_EMAIL, TEST_PASSWORD

CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
PYTHON = "python-requests/2.32.3"


@pytest.fixture
def staff_client(client, db):
    user = User.objects.create_user(username="staff@example.com", email="staff@example.com", password="pw", is_staff=True)
    client.force_login(user)
    return client


class TestHeuristics:
    @pytest.mark.parametrize(
        "ua",
        [
            "",
            "   ",
            PYTHON,
            "curl/8.4.0",
            "Mozilla/5.0 (compatible; Googlebot/2.1)",
            "HeadlessChrome/120",
            "Mozilla/5.0",
            "Mozlila/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M)",
        ],
    )
    def test_bot_user_agents(self, ua):
        assert is_bot_user_agent(ua)

    @pytest.mark.parametrize(
        "ua",
        [
            CHROME,
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
        ],
    )
    def test_browser_user_agents(self, ua):
        assert not is_bot_user_agent(ua)

    @pytest.mark.parametrize("name,expected", [("a@b.co", True), ("asdf", False), ("Fff", False), ("x@y", False)])
    def test_looks_like_email(self, name, expected):
        assert looks_like_email(name) is expected


@pytest.mark.django_db
class TestMiddleware:
    def test_logs_anonymous_request(self, client):
        client.get("/login?next=/bills", HTTP_USER_AGENT=CHROME, REMOTE_ADDR="10.0.0.5")
        log = RequestLog.objects.get()
        assert (log.method, log.path, log.query, log.status) == ("GET", "/login", "next=/bills", 200)
        assert log.user is None and not log.is_bot and not log.is_htmx and log.ip == "10.0.0.5"
        assert log.session_key, "session is saved before the log row is written"

    def test_attributes_login_post_to_the_user_it_signs_in(self, client, test_user):
        client.post("/login", {"email": TEST_EMAIL, "password": TEST_PASSWORD}, HTTP_USER_AGENT=PYTHON)
        log = RequestLog.objects.get(path="/login", method="POST")
        assert log.user == test_user and log.status == 302 and log.is_bot
        assert log.query == "", "POST bodies and params are never stored"

    def test_htmx_flag_and_forwarded_ip(self, client):
        client.get("/", HTTP_HX_REQUEST="true", HTTP_X_FORWARDED_FOR="203.0.113.9, 10.0.0.1")
        log = RequestLog.objects.get()
        assert log.is_htmx and log.ip == "203.0.113.9"

    def test_bad_forwarded_ip_is_dropped(self, client):
        client.get("/", HTTP_X_FORWARDED_FOR="not-an-ip")
        assert RequestLog.objects.get().ip is None

    def test_skips_static_and_staff_pages(self, staff_client):
        staff_client.get("/static/css/app.css")
        staff_client.get("/admin/activity")
        staff_client.get("/admin/users")
        staff_client.get("/admin/requests?who=bots")
        staff_client.get("/favicon.ico")
        assert RequestLog.objects.count() == 0

    def test_still_logs_django_admin_itself(self, client):
        res = client.get("/admin/", HTTP_USER_AGENT=PYTHON)
        assert res.status_code == 302, "Django admin still answers under /admin/"
        assert RequestLog.objects.get().path == "/admin/"

    def test_logs_404_probes(self, client):
        client.get("/wp-login.php", HTTP_USER_AGENT="")
        log = RequestLog.objects.get()
        assert log.status == 404 and log.is_bot


@pytest.mark.django_db
class TestUserSignals:
    def _labels(self, user):
        return {s.label for s in user_activities([user])[0].signals}

    def test_bot_user_agent_and_no_htmx(self, test_user):
        RequestLog.objects.create(user=test_user, method="GET", path="/bills", status=200, user_agent=PYTHON, is_bot=True)
        labels = self._labels(test_user)
        assert {"Bot user agent", "No htmx requests", "Empty account"} <= labels
        assert user_activities([test_user])[0].verdict == "bot"

    def test_human_with_content_and_htmx(self, test_user):
        test_user.profile.timezone = "America/New_York"
        test_user.profile.save()
        Bill.objects.create(user=test_user, name="Rent", amount=1, month=timezone.localdate())
        RequestLog.objects.create(user=test_user, method="GET", path="/bills", status=200, user_agent=CHROME, is_htmx=True)
        activity = user_activities([test_user])[0]
        assert activity.signals == [] and activity.verdict == "human"
        assert activity.bills == 1 and activity.requests == 1

    def test_non_email_username_is_flagged(self, db):
        user = User.objects.create_user(username="asdf", password="pw")
        assert "Not an email" in self._labels(user)

    def test_never_came_back(self, test_user):
        test_user.date_joined = timezone.now() - timedelta(days=3)
        test_user.last_login = test_user.date_joined + timedelta(seconds=1)
        test_user.save()
        assert "Never came back" in self._labels(test_user)

    def test_signup_details_measure_time_on_site(self, client):
        client.get("/signup", HTTP_USER_AGENT=CHROME)
        client.post(
            "/signup",
            {
                "email": "new@example.com",
                "password": "pw12345!",
                "confirm_password": "pw12345!",
                "form_token": make_signup_token(time.time() - 10),
            },
            HTTP_USER_AGENT=CHROME,
        )
        details = signup_details(User.objects.get(username="new@example.com"))
        assert details["log"].path == "/signup" and details["first_hit"].method == "GET"
        assert details["seconds_on_site"] is not None and details["seconds_on_site"] < 5

    def test_signup_details_without_earlier_hit(self, client):
        client.post(
            "/signup",
            {
                "email": "bot@example.com",
                "password": "pw12345!",
                "confirm_password": "pw12345!",
                "form_token": make_signup_token(time.time() - 10),
            },
        )
        details = signup_details(User.objects.get(username="bot@example.com"))
        assert details["seconds_on_site"] is None


@pytest.mark.django_db
class TestStaffPages:
    PAGES = ["/admin/activity", "/admin/users", "/admin/requests"]

    def test_anonymous_is_sent_to_login(self, client):
        res = client.get("/admin/activity")
        assert res.status_code == 302 and res.url.startswith("/login?next=/admin/activity")

    def test_non_staff_gets_404(self, client, test_user):
        client.force_login(test_user)
        for page in self.PAGES + [f"/admin/users/{test_user.pk}"]:
            assert client.get(page).status_code == 404, page

    def test_pages_render_for_staff(self, staff_client, test_user):
        RequestLog.objects.create(user=test_user, method="GET", path="/bills", status=200, user_agent=PYTHON, is_bot=True)
        RequestLog.objects.create(method="GET", path="/wp-login.php", status=404, user_agent="", is_bot=True)
        for page in self.PAGES + [f"/admin/users/{test_user.pk}", "/admin/activity?period=30d", "/admin/requests?who=bots&status=4xx"]:
            res = staff_client.get(page)
            assert res.status_code == 200, page
        body = staff_client.get("/admin/activity").content.decode()
        assert "/wp-login.php" in body and "Likely bot" in body

    def test_htmx_requests_get_fragments(self, staff_client):
        res = staff_client.get("/admin/activity?period=24h", HTTP_HX_REQUEST="true")
        body = res.content.decode()
        assert 'id="staff-overview"' in body and "<html" not in body
        res = staff_client.get("/admin/users?show=flagged", HTTP_HX_REQUEST="true")
        assert 'id="user-list"' in res.content.decode()
        res = staff_client.get("/admin/requests?who=anonymous", HTTP_HX_REQUEST="true")
        assert 'id="request-list"' in res.content.decode()

    def test_request_filters(self, staff_client, test_user):
        RequestLog.objects.create(user=test_user, method="GET", path="/bills", status=200, user_agent=CHROME)
        RequestLog.objects.create(method="GET", path="/.env", status=404, user_agent="curl/8", is_bot=True)
        page = staff_client.get("/admin/requests?who=bots").context["page"]
        assert [log.path for log in page.object_list] == ["/.env"]
        page = staff_client.get(f"/admin/requests?user={test_user.pk}").context["page"]
        assert [log.path for log in page.object_list] == ["/bills"]
        page = staff_client.get("/admin/requests?user=test@&status=2xx&path=bill").context["page"]
        assert [log.path for log in page.object_list] == ["/bills"]

    def test_flagged_filter_hides_humans(self, staff_client, test_user):
        test_user.profile.timezone = "UTC"
        test_user.profile.save()
        Bill.objects.create(user=test_user, name="Rent", amount=1, month=timezone.localdate())
        bot = User.objects.create_user(username="asdf", password="pw")
        shown = {a.user.pk for a in staff_client.get("/admin/users?show=flagged").context["activities"]}
        assert bot.pk in shown and test_user.pk not in shown

    def test_prune_command(self, db):
        from django.core.management import call_command

        old = RequestLog.objects.create(method="GET", path="/", status=200)
        RequestLog.objects.filter(pk=old.pk).update(created_at=timezone.now() - timedelta(days=100))
        RequestLog.objects.create(method="GET", path="/", status=200)
        call_command("prune_request_logs", days=90)
        assert RequestLog.objects.count() == 1


@pytest.mark.django_db
class TestSelfPrune:
    def test_prunes_once_per_interval(self, monkeypatch):
        from unittest.mock import patch

        from app.middleware import RequestLogMiddleware

        monkeypatch.setattr(RequestLogMiddleware, "_next_prune", 0.0)
        with patch("app.middleware.threading.Thread") as thread:
            assert RequestLogMiddleware.maybe_prune() is True
            assert RequestLogMiddleware.maybe_prune() is False, "second call inside the interval does nothing"
        thread.assert_called_once()
        assert thread.call_args.kwargs["target"] is RequestLogMiddleware.prune
        thread.return_value.start.assert_called_once()

    def test_request_triggers_prune(self, client, monkeypatch):
        from unittest.mock import patch

        from app.middleware import RequestLogMiddleware

        monkeypatch.setattr(RequestLogMiddleware, "_next_prune", 0.0)
        with patch("app.middleware.threading.Thread") as thread:
            client.get("/")
            client.get("/")
        thread.assert_called_once()

    def test_prune_deletes_only_old_rows(self, settings):
        from app.services.activity import prune_request_logs

        settings.REQUEST_LOG_RETENTION_DAYS = 30
        old = RequestLog.objects.create(method="GET", path="/", status=200)
        RequestLog.objects.filter(pk=old.pk).update(created_at=timezone.now() - timedelta(days=31))
        RequestLog.objects.create(method="GET", path="/", status=200)
        assert prune_request_logs(settings.REQUEST_LOG_RETENTION_DAYS) == 1
        assert RequestLog.objects.count() == 1


@pytest.mark.django_db
def test_circumstantial_signals_alone_are_only_suspicious(test_user):
    # No timezone + never came back + empty account: every abandoned real account looks like this.
    test_user.date_joined = timezone.now() - timedelta(days=3)
    test_user.last_login = test_user.date_joined + timedelta(seconds=1)
    test_user.save()
    activity = user_activities([test_user])[0]
    assert len(activity.signals) == 3 and activity.verdict == "suspicious"


@pytest.mark.django_db
class TestSignupBotChecks:
    FIELDS = {"email": "new@example.com", "password": "pw12345!", "confirm_password": "pw12345!"}

    def _post(self, client, **extra):
        return client.post("/signup", {**self.FIELDS, **extra})

    def test_get_issues_a_token(self, client):
        res = client.get("/signup")
        assert 'name="form_token" value="' in res.content.decode()
        assert 'name="website"' in res.content.decode()

    def test_rejects_post_without_token(self, client):
        res = self._post(client)
        assert res.status_code == 400 and not User.objects.filter(username="new@example.com").exists()

    def test_rejects_forged_token(self, client):
        res = self._post(client, form_token="abc:def")
        assert res.status_code == 400

    def test_rejects_instant_submit(self, client):
        res = self._post(client, form_token=make_signup_token())
        assert res.status_code == 400 and not User.objects.exists()

    def test_rejects_filled_honeypot(self, client):
        res = self._post(client, form_token=make_signup_token(time.time() - 10), website="http://spam.example")
        assert res.status_code == 400 and not User.objects.exists()

    def test_accepts_human_pace(self, client):
        res = self._post(client, form_token=make_signup_token(time.time() - 10))
        assert res.status_code == 302 and User.objects.filter(username="new@example.com").exists()

    def test_rejection_keeps_the_same_token_so_a_retry_works(self, client):
        token = make_signup_token()
        res = self._post(client, form_token=token)
        assert f'value="{token}"' in res.content.decode()

    def test_expired_token_is_rejected(self, client):
        res = self._post(client, form_token=make_signup_token(time.time() - 7 * 60 * 60))
        assert res.status_code == 400


def test_robots_txt(client):
    res = client.get("/robots.txt")
    assert res.status_code == 200 and res["Content-Type"].startswith("text/plain")
    assert "Disallow: /" in res.content.decode() and "Allow: /$" in res.content.decode()
