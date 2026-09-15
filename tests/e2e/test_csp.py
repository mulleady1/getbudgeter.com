"""The strict CSP + hx-csp setup must not break real interactions.

Anything the policy blocks shows up as a console error, either from the browser
("Refused to execute inline script ... Content Security Policy") or from the extension
("htmx: [hx-csp] blocked ..."), so every test here records the console and asserts it is clean.
"""

import pytest
from playwright.sync_api import Page, expect

BLOCKED_MARKERS = ("Content Security Policy", "[hx-csp]")


def _watch_console(page: Page):
    problems = []

    def on_console(msg):
        if msg.type in ("error", "warning") and any(m in msg.text for m in BLOCKED_MARKERS):
            problems.append(msg.text)

    page.on("console", on_console)
    page.on("pageerror", lambda err: problems.append(f"pageerror: {err}"))
    return problems


@pytest.mark.django_db
class TestCsp:
    def test_page_nonce_is_found_and_nothing_is_blocked(self, logged_in_page: Page, live_server):
        page = logged_in_page
        problems = _watch_console(page)
        page.goto(f"{live_server.url}/bills")
        page.wait_for_load_state("networkidle")

        # hx-csp reads the page nonce from the first nonced <script>; the loader stamps them all.
        assert page.evaluate("document.querySelector('script[nonce]')?.nonce") not in (None, "")
        # The body carries htmx attributes, so it must have survived the nonce gate.
        assert page.evaluate("document.body.hasAttribute('hx-indicator:inherited')")
        assert problems == []

    def test_swapped_in_drawer_and_hx_on_handlers_work(self, logged_in_page: Page, live_server):
        """Swapped fragments carry the *response* nonce; hx-csp must rewrite it to the page nonce
        so the drawer's htmx attributes survive, and the Cancel button's `hx-on:click` (formerly
        an inline `onclick`, which the CSP forbids) must run through safeEval."""
        page = logged_in_page
        problems = _watch_console(page)
        page.goto(f"{live_server.url}/bills")
        page.wait_for_load_state("networkidle")

        page.locator('wa-button[hx-get="/bills/new"]').click()
        # The drawer arrives in a partial response and is appended to <body>.
        # The <wa-drawer> host has no box of its own (the panel lives in its shadow root), so
        # assert on the `open` attribute app.js sets and on a control inside it.
        drawer = page.locator("wa-drawer:has(form)").last
        expect(drawer).to_have_attribute("open", "")
        expect(drawer.locator("wa-input").first).to_be_visible()

        # Cancel is `hx-on:click="this.closest('wa-drawer').open = false"`; app.js removes the
        # drawer from the DOM once it has hidden.
        drawer.locator("wa-button", has_text="Cancel").click()
        expect(drawer).not_to_be_attached()
        assert problems == []

    def test_inline_scripts_in_swapped_content_still_run(self, logged_in_page: Page, live_server):
        """Analytics partials ship inline <script> blocks that build charts; those scripts are
        re-inserted by htmx and must keep their (rewritten) nonce to execute."""
        page = logged_in_page
        problems = _watch_console(page)
        page.goto(f"{live_server.url}/analytics")
        page.wait_for_load_state("networkidle")
        assert problems == []
