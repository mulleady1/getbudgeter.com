"""Per-user timezones: capture at signup, browser backfill, account setting, and the default month."""

from datetime import date, datetime, timezone as dt_timezone
from unittest.mock import patch

import pytest
from django.contrib.auth.models import User

from tests.conftest import TEST_EMAIL

# 9:20pm Sep 30 in Honolulu, already Oct 1 in UTC.
HONOLULU_SEP_30_EVENING = datetime(2026, 10, 1, 7, 20, tzinfo=dt_timezone.utc)


def _set_tz(user, name):
    user.profile.timezone = name
    user.profile.save(update_fields=["timezone"])


@pytest.mark.django_db
class TestSignup:
    def _signup(self, client, tz):
        return client.post(
            "/signup",
            {"email": "new@example.com", "password": "pw12345!", "confirm_password": "pw12345!", "timezone": tz},
        )

    def test_stores_browser_timezone(self, client):
        self._signup(client, "Pacific/Honolulu")
        assert User.objects.get(email="new@example.com").profile.timezone == "Pacific/Honolulu"

    def test_ignores_invalid_timezone(self, client):
        self._signup(client, "Mars/Olympus_Mons")
        assert User.objects.get(email="new@example.com").profile.timezone == ""


@pytest.mark.django_db
class TestDefaultMonth:
    def _default_month(self, client):
        with patch("django.utils.timezone.now", return_value=HONOLULU_SEP_30_EVENING):
            return client.get("/bills").context["selected_month"]

    def test_uses_users_timezone(self, client, test_user):
        _set_tz(test_user, "Pacific/Honolulu")
        client.force_login(test_user)
        assert self._default_month(client) == date(2026, 9, 1)

    def test_falls_back_to_utc(self, client, test_user):
        client.force_login(test_user)
        assert self._default_month(client) == date(2026, 10, 1)


@pytest.mark.django_db
class TestDetectTimezone:
    def test_backfills_blank_timezone_and_refreshes_when_day_differs(self, client, test_user):
        client.force_login(test_user)
        with patch("django.utils.timezone.now", return_value=HONOLULU_SEP_30_EVENING):
            res = client.post("/account/detect-timezone", {"timezone": "Pacific/Honolulu"})
        test_user.profile.refresh_from_db()
        assert test_user.profile.timezone == "Pacific/Honolulu"
        assert res.headers.get("HX-Refresh") == "true"

    def test_no_refresh_when_day_matches(self, client, test_user):
        client.force_login(test_user)
        noon_utc = datetime(2026, 9, 30, 12, 0, tzinfo=dt_timezone.utc)
        with patch("django.utils.timezone.now", return_value=noon_utc):
            res = client.post("/account/detect-timezone", {"timezone": "Pacific/Honolulu"})
        assert "HX-Refresh" not in res.headers

    def test_does_not_overwrite_existing_choice(self, client, test_user):
        _set_tz(test_user, "Europe/Berlin")
        client.force_login(test_user)
        client.post("/account/detect-timezone", {"timezone": "Pacific/Honolulu"})
        test_user.profile.refresh_from_db()
        assert test_user.profile.timezone == "Europe/Berlin"

    def test_detector_only_rendered_while_timezone_blank(self, client, test_user):
        client.force_login(test_user)
        assert b"/account/detect-timezone" in client.get("/bills").content
        _set_tz(test_user, "Pacific/Honolulu")
        assert b"/account/detect-timezone" not in client.get("/bills").content


@pytest.mark.django_db
class TestAccountTimezone:
    def test_updates_timezone(self, client, test_user):
        client.force_login(test_user)
        res = client.post("/account/timezone", {"timezone": "America/New_York"})
        assert res.status_code == 200
        test_user.profile.refresh_from_db()
        assert test_user.profile.timezone == "America/New_York"

    def test_rejects_invalid_timezone(self, client, test_user):
        client.force_login(test_user)
        res = client.post("/account/timezone", {"timezone": "Nope/Nowhere"})
        assert res.status_code == 400
        test_user.profile.refresh_from_db()
        assert test_user.profile.timezone == ""

    def test_account_page_preselects_saved_timezone(self, client, test_user):
        _set_tz(test_user, "Pacific/Honolulu")
        client.force_login(test_user)
        assert b'value="Pacific/Honolulu"' in client.get("/account").content
