import pytest
from playwright.sync_api import Page, expect

from tests.conftest import fill_wa_input, log_in


@pytest.mark.django_db
class TestBillManagement:
    """End-to-end tests for bill management functionality."""

    def test_user_can_view_bills_page(self, authenticated_page: Page, live_server):
        """Test that authenticated user can view the bills page."""
        authenticated_page.goto(f"{live_server.url}/bills")

        # Wait for page to load
        authenticated_page.wait_for_load_state("networkidle")

        # Verify we're on the bills page
        expect(authenticated_page).to_have_url(f"{live_server.url}/bills")

    def test_user_can_create_new_bill(self, authenticated_page: Page, live_server):
        """Test that user can create a new bill using HTMX."""
        authenticated_page.goto(f"{live_server.url}/bills")

        # Open the drawer holding the bill form ("Add Bill")
        authenticated_page.locator('wa-button[hx-get="/bills/new"]').click()
        form = authenticated_page.locator("form#bill-form")
        expect(form).to_be_visible()
        authenticated_page.wait_for_timeout(300)  # drawer open animation

        fill_wa_input(authenticated_page, 'wa-input[name="name"]', "Test Electric Bill")
        fill_wa_input(authenticated_page, 'wa-input[name="amount"]', "150.00")

        authenticated_page.locator('wa-button[type="submit"][form="bill-form"]').click()
        authenticated_page.wait_for_load_state("networkidle")

        # Verify the bill appears in the list, swapped in without a page navigation
        expect(authenticated_page).to_have_url(f"{live_server.url}/bills")
        expect(authenticated_page.locator("#bills-list").get_by_text("Test Electric Bill")).to_be_visible()

    def test_user_can_toggle_bill_paid_status(self, authenticated_page: Page, live_server):
        """Test that user can toggle a bill's paid status using HTMX."""
        # First create a bill (you might want to use a fixture for this in real tests)
        authenticated_page.goto(f"{live_server.url}/bills")
        authenticated_page.wait_for_load_state("networkidle")

        # Find and click a toggle button
        # Note: Adjust the selector based on your actual UI
        toggle_button = authenticated_page.locator('button:has-text("Mark Paid")').first

        if toggle_button.is_visible():
            # Click the toggle
            toggle_button.click()

            # Wait for HTMX to complete
            authenticated_page.wait_for_load_state("networkidle")

            # Verify the status changed
            # This will depend on how your UI indicates paid status
            # For example, you might check for a class change or text change
            expect(authenticated_page.locator('button:has-text("Mark Unpaid")')).to_be_visible()


@pytest.mark.django_db
class TestAuthentication:
    """End-to-end tests for authentication flows."""

    def test_month_picker_sends_month_param(self, authenticated_page: Page, live_server):
        """Changing the month sends ?month= to the server.

        Regression test: htmx 4 doesn't serialize web-component values into GET params,
        so without the app.js `config:request` hook the picker updates visually but the
        request goes out with no month param.
        """
        page = authenticated_page
        page.goto(f"{live_server.url}/bills")
        page.wait_for_load_state("networkidle")

        bills_requests = []
        page.on("request", lambda req: bills_requests.append(req.url) if "/bills?" in req.url else None)

        page.locator('wa-button[hx-on\\:click="changeMonth(1)"]').click()
        expected_month = page.locator("wa-input#month").evaluate("el => el.value")
        page.wait_for_timeout(1500)  # hx-trigger has delay:500ms

        assert any(
            f"month={expected_month}" in url for url in bills_requests
        ), f"expected a /bills request with month={expected_month}, got: {bills_requests}"

    def test_login_with_invalid_credentials(self, page: Page, live_server):
        """Test that login fails with invalid credentials."""
        log_in(page, live_server, email="wrong@example.com", password="wrongpass")

        # Verify error message appears and we're still on the login page
        expect(page.locator("text=Invalid")).to_be_visible()
        assert "/login" in page.url

    def test_logout_flow(self, authenticated_page: Page, live_server):
        """Test that user can log out successfully."""
        # Logout lives in the user menu, so open the dropdown first
        authenticated_page.locator('wa-button[aria-label="User menu"]').click()
        authenticated_page.locator("wa-dropdown-item", has_text="Logout").click()

        # Wait for navigation
        authenticated_page.wait_for_load_state("networkidle")

        # `logout_view` redirects to home, not /login
        expect(authenticated_page).to_have_url(f"{live_server.url}/")

        # Confirm the session is really gone: a protected page now bounces to login
        authenticated_page.goto(f"{live_server.url}/bills")
        authenticated_page.wait_for_load_state("networkidle")
        assert "/login" in authenticated_page.url, f"still authenticated, landed on {authenticated_page.url}"
