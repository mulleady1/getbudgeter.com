import os

import pytest
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.sessions.backends.db import SessionStore
from playwright.sync_api import Page

# Allow Django to work in async contexts (needed for Playwright integration)
os.environ.setdefault("DJANGO_ALLOW_ASYNC_UNSAFE", "true")

# `login_view` authenticates with `username=<the email field>`, and signup creates users as
# `username=email`, so a test user's username must be its email or no login can succeed.
TEST_EMAIL = "test@example.com"
TEST_PASSWORD = "testpass123"


@pytest.fixture(scope="function")
def test_user(db):
    """Create a test user for authentication tests."""
    user = User.objects.create_user(username=TEST_EMAIL, email=TEST_EMAIL, password=TEST_PASSWORD)
    yield user
    user.delete()


def fill_wa_input(page: Page, host_selector: str, value: str):
    """Type into a `wa-input`.

    The `name` lives on the custom-element host; its inner native input has no `name`, so
    `page.fill('input[name=...]')` never matches. Target the host, then its inner control.
    """
    page.locator(f"{host_selector} input").first.fill(value)


def log_in(page: Page, live_server, email: str = TEST_EMAIL, password: str = TEST_PASSWORD):
    """Drive the real login form."""
    page.goto(f"{live_server.url}/login")
    fill_wa_input(page, 'wa-input[name="email"]', email)
    fill_wa_input(page, 'wa-input[name="password"]', password)
    page.locator('wa-button[type="submit"]').click()
    page.wait_for_load_state("networkidle")


@pytest.fixture(scope="function")
def authenticated_page(page: Page, test_user, live_server):
    """A Playwright page logged in through the real login form.

    Usage:
        def test_something(authenticated_page, live_server):
            authenticated_page.goto(f"{live_server.url}/bills")
    """
    log_in(page, live_server)
    assert "/login" not in page.url, f"login did not succeed, still at {page.url}"
    return page


@pytest.fixture(scope="function")
def logged_in_page(page: Page, test_user, live_server):
    """Same as `authenticated_page` but authenticates by planting a session cookie.

    Faster and independent of the login UI — use it when the test isn't about auth.
    """
    session = SessionStore()
    session["_auth_user_id"] = str(test_user.pk)
    session["_auth_user_backend"] = "django.contrib.auth.backends.ModelBackend"
    session["_auth_user_hash"] = test_user.get_session_auth_hash()
    session.save()

    page.goto(f"{live_server.url}/")
    page.context.add_cookies([{
        "name": settings.SESSION_COOKIE_NAME,
        "value": session.session_key,
        "url": live_server.url,
    }])
    return page
