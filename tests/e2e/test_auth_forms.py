"""Login and signup forms: plain inputs (for password managers) that still submit on Enter."""

import pytest
from django.contrib.auth.models import User
from playwright.sync_api import Page

from app.views.auth import SIGNUP_MIN_SECONDS
from tests.conftest import TEST_EMAIL, TEST_PASSWORD


def test_enter_submits_login(page: Page, live_server, test_user):
    page.goto(f"{live_server.url}/login")
    page.fill('input[name="email"]', TEST_EMAIL)
    page.fill('input[name="password"]', TEST_PASSWORD)
    page.press('input[name="password"]', "Enter")
    page.wait_for_url("**/bills")


@pytest.mark.django_db
def test_enter_submits_signup(page: Page, live_server):
    page.goto(f"{live_server.url}/signup")
    page.fill('input[name="email"]', "enter@example.com")
    page.fill('input[name="password"]', "pw12345!")
    page.fill('input[name="confirm_password"]', "pw12345!")
    page.wait_for_timeout(SIGNUP_MIN_SECONDS * 1000 + 200)
    page.press('input[name="confirm_password"]', "Enter")
    page.wait_for_url("**/bills")
    assert User.objects.filter(username="enter@example.com").exists()


def test_login_fields_are_in_the_light_dom(page: Page, live_server, db):
    page.goto(f"{live_server.url}/login")
    assert page.locator("form input[type=password]").count() == 1
    assert page.locator("wa-input").count() == 0
