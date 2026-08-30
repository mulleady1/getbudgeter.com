import pytest
from django.contrib.auth.models import User
from playwright.sync_api import Page, expect

from tests.conftest import TEST_EMAIL, TEST_PASSWORD, fill_wa_input


def test_account_page_loads(authenticated_page: Page, live_server):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    expect(page.locator("#account-page h1")).to_have_text("Account")
    expect(page.locator("#account-email-card")).to_be_visible()
    expect(page.locator("#account-password-card")).to_be_visible()
    expect(page.locator("#delete-account-form")).to_be_visible()


def test_nav_has_account_link(authenticated_page: Page, live_server):
    page = authenticated_page
    page.goto(f"{live_server.url}/bills")
    page.locator('wa-button[aria-label="User menu"]').click()
    page.locator("wa-dropdown-item", has_text="Account").click()
    page.wait_for_url("**/account")


def test_email_change_wrong_password_shows_inline_error(authenticated_page: Page, live_server):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    fill_wa_input(page, '#account-email-card wa-input[name="email"]', "changed@example.com")
    fill_wa_input(page, '#account-email-card wa-input[name="password"]', "wrongpass")
    page.locator('#account-email-card wa-button[type="submit"]').click()
    expect(page.locator("#account-email-card .form-error")).to_contain_text("Current password is incorrect")


def test_email_change_success(authenticated_page: Page, live_server, test_user):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    fill_wa_input(page, '#account-email-card wa-input[name="email"]', "changed@example.com")
    fill_wa_input(page, '#account-email-card wa-input[name="password"]', TEST_PASSWORD)
    page.locator('#account-email-card wa-button[type="submit"]').click()
    expect(page.locator("wa-callout[variant='success']")).to_contain_text("Email address updated")
    expect(page.locator("#account-email-card .account-current-email")).to_have_text("changed@example.com")
    test_user.refresh_from_db()
    assert test_user.username == "changed@example.com"


def test_password_change_success(authenticated_page: Page, live_server, test_user):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    fill_wa_input(page, 'wa-input[name="current_password"]', TEST_PASSWORD)
    fill_wa_input(page, 'wa-input[name="new_password"]', "brandnewpass456")
    fill_wa_input(page, 'wa-input[name="confirm_password"]', "brandnewpass456")
    page.locator('#account-password-card wa-button[type="submit"]').click()
    expect(page.locator("wa-callout[variant='success']")).to_contain_text("Password updated")
    test_user.refresh_from_db()
    assert test_user.check_password("brandnewpass456")
    # still signed in
    page.goto(f"{live_server.url}/bills")
    assert "/login" not in page.url


def test_delete_account_requires_confirm_then_redirects(authenticated_page: Page, live_server, test_user):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    fill_wa_input(page, '#delete-account-form wa-input[name="password"]', TEST_PASSWORD)
    page.locator("#delete-account-form wa-button[variant='danger']").click()
    # confirmation dialog appears; cancel first
    page.locator("wa-dialog wa-button.cancel").click()
    page.wait_for_timeout(500)
    assert User.objects.filter(pk=test_user.pk).exists()

    page.locator("#delete-account-form wa-button[variant='danger']").click()
    page.locator("wa-dialog wa-button.confirm").click()
    page.wait_for_url(f"{live_server.url}/")
    assert not User.objects.filter(pk=test_user.pk).exists()
