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


def test_dark_mode_toggle_persists(authenticated_page: Page, live_server, test_user):
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    html = page.locator("html")
    expect(html).not_to_have_class("wa-dark")

    page.locator("#account-appearance-card wa-switch").locator("label").click()
    # Applied immediately on the client...
    expect(html).to_have_class("wa-dark")
    # ...and persisted on the server.
    expect(page.locator("#account-appearance-card wa-switch")).to_have_attribute("checked", "")
    test_user.refresh_from_db()
    assert test_user.profile.theme == "dark"

    page.goto(f"{live_server.url}/bills")
    expect(page.locator("html")).to_have_class("wa-dark")

    page.goto(f"{live_server.url}/account")
    page.locator("#account-appearance-card wa-switch").locator("label").click()
    expect(page.locator("html")).not_to_have_class("wa-dark")
    expect(page.locator("#account-appearance-card wa-switch")).not_to_have_attribute("checked", "")
    test_user.refresh_from_db()
    assert test_user.profile.theme == "light"


@pytest.mark.browser_context_args(timezone_id="Pacific/Honolulu")
def test_browser_timezone_backfilled_on_first_page(authenticated_page: Page, live_server, test_user):
    page = authenticated_page
    page.goto(f"{live_server.url}/bills")
    page.wait_for_load_state("networkidle")
    test_user.profile.refresh_from_db()
    assert test_user.profile.timezone == "Pacific/Honolulu"


@pytest.mark.browser_context_args(timezone_id="Pacific/Honolulu")
def test_signup_captures_browser_timezone(page: Page, live_server, db):
    page.goto(f"{live_server.url}/signup")
    fill_wa_input(page, 'wa-input[name="email"]', "tz@example.com")
    fill_wa_input(page, 'wa-input[name="password"]', "pw12345!")
    fill_wa_input(page, 'wa-input[name="confirm_password"]', "pw12345!")
    page.locator('wa-button[type="submit"]').click()
    page.wait_for_url("**/bills")
    assert User.objects.get(email="tz@example.com").profile.timezone == "Pacific/Honolulu"


def test_change_timezone_from_account_page(authenticated_page: Page, live_server, test_user):
    test_user.profile.timezone = "Pacific/Honolulu"
    test_user.profile.save(update_fields=["timezone"])
    page = authenticated_page
    page.goto(f"{live_server.url}/account")
    select = page.locator('#account-timezone-card wa-select[name="timezone"]')
    expect(select).to_have_attribute("value", "Pacific/Honolulu")
    select.click()
    page.locator('#account-timezone-card wa-option[value="Europe/Berlin"]').click()
    expect(page.locator("wa-callout", has_text="Timezone updated.")).to_be_visible()
    test_user.profile.refresh_from_db()
    assert test_user.profile.timezone == "Europe/Berlin"
