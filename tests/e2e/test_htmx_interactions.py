import pytest
from playwright.sync_api import Page, expect


@pytest.mark.django_db
class TestHTMXInteractions:
    """
    Tests specifically for HTMX functionality.

    These tests demonstrate how to work with HTMX requests and partial page updates.
    """

    def test_htmx_request_headers_are_present(self, authenticated_page: Page, live_server):
        """Verify that HTMX requests include proper headers."""

        # Listen for requests to verify HTMX headers
        htmx_requests = []

        def handle_request(request):
            if "HX-Request" in request.headers:
                htmx_requests.append(request)

        authenticated_page.on("request", handle_request)

        # Navigate to a page that uses HTMX
        authenticated_page.goto(f"{live_server.url}/bills")

        # Trigger an HTMX action (adjust based on your UI)
        # For example, clicking a button that makes an HTMX request
        button = authenticated_page.locator('button[hx-get], button[hx-post]').first
        if button.is_visible():
            button.click()
            authenticated_page.wait_for_load_state("networkidle")

            # Verify at least one HTMX request was made
            assert len(htmx_requests) > 0, "No HTMX requests detected"

    def test_partial_content_update(self, authenticated_page: Page, live_server):
        """
        Test that HTMX partial updates work correctly.

        This test verifies that clicking an HTMX element updates
        only the targeted section, not the whole page.
        """
        page = authenticated_page
        page.goto(f"{live_server.url}/bills")
        page.wait_for_load_state("networkidle")

        initial_title = page.title()
        # Sentinel on the JS context: a full page reload wipes it, a partial swap does not.
        page.evaluate("window.__notReloaded = true")

        # Use a specific, safe hx-get element rather than "the first [hx-target]" — that one is
        # a month picker wired to `change`, so clicking it can't produce a swap.
        trigger = page.locator('wa-button[hx-get="/bills/new"]')
        assert trigger.count() == 1, "expected the Add Bill button to drive an htmx request"

        with page.expect_request(lambda r: "/bills/new" in r.url) as req_info:
            trigger.click()
        request = req_info.value
        page.wait_for_load_state("networkidle")

        # It was a real htmx request, not a browser navigation
        assert request.headers.get("hx-request") == "true", request.headers
        assert page.evaluate("window.__notReloaded") is True, "page fully reloaded"
        assert page.title() == initial_title

        # ...and the response was swapped into the DOM (drawer appended to <body>)
        expect(page.locator("form#bill-form")).to_be_visible()

    def test_loading_states_during_htmx_request(self, authenticated_page: Page, live_server):
        """
        Test that loading indicators appear during HTMX requests.

        This assumes you're using hx-indicator or similar loading states.
        """
        authenticated_page.goto(f"{live_server.url}/bills")

        # Find an element that triggers a potentially slow HTMX request
        htmx_trigger = authenticated_page.locator('[hx-get], [hx-post]').first

        if htmx_trigger.is_visible():
            # Get the indicator selector if specified
            indicator_selector = htmx_trigger.get_attribute('hx-indicator')

            if indicator_selector:
                indicator = authenticated_page.locator(indicator_selector)

                # Click to trigger request
                htmx_trigger.click()

                # Verify loading indicator appears
                # Note: This might be very fast in tests, consider using --slowmo flag
                expect(indicator).to_be_visible()

                # Wait for request to complete
                authenticated_page.wait_for_load_state("networkidle")

                # Verify loading indicator is hidden
                expect(indicator).to_be_hidden()

    def test_htmx_form_validation_errors(self, authenticated_page: Page, live_server):
        """
        Test that HTMX form submissions handle validation errors.

        This tests that server-side validation errors are displayed
        without a full page reload.
        """
        authenticated_page.goto(f"{live_server.url}/bills/new")
        authenticated_page.wait_for_load_state("networkidle")

        # Submit form without filling required fields
        submit_button = authenticated_page.locator('button[type="submit"]').first

        if submit_button.is_visible():
            # Click submit without filling form
            submit_button.click()

            # Wait for HTMX response
            authenticated_page.wait_for_load_state("networkidle")

            # Verify error messages appear
            # Adjust based on how your app displays errors
            error_elements = authenticated_page.locator('.error, .errorlist, [role="alert"]')
            expect(error_elements.first).to_be_visible()

    def test_delete_with_confirmation(self, authenticated_page: Page, live_server):
        """
        Test HTMX delete action with confirmation.

        Many HTMX apps use hx-confirm for delete actions.
        """
        authenticated_page.goto(f"{live_server.url}/bills")

        # Listen for confirm dialogs
        authenticated_page.on("dialog", lambda dialog: dialog.accept())

        # Find a delete button (adjust selector based on your UI)
        delete_button = authenticated_page.locator('button:has-text("Delete")').first

        if delete_button.is_visible():
            # Store the text of the item to verify it's removed
            item_text = authenticated_page.locator('[data-bill-id]').first.inner_text()

            # Click delete
            delete_button.click()

            # Wait for HTMX to complete
            authenticated_page.wait_for_load_state("networkidle")

            # Verify item is removed
            expect(authenticated_page.locator(f'text={item_text}')).to_be_hidden()
