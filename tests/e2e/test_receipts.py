import io
from datetime import date

import pytest
from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
from django.core.files.base import ContentFile
from playwright.sync_api import Page, expect
from PIL import Image

from app.models import Receipt, ReceiptItem

DRAWER = "wa-drawer.receipt-detail-dialog"


@pytest.fixture
def receipts_page(page: Page, test_user, live_server):
    """A logged-in page on /receipts with one ready receipt that has a categorized item.

    Authenticates by planting a session cookie: the login form uses `wa-input`, whose inner
    control carries no `name`, so driving it by selector is unreliable.
    """
    buf = io.BytesIO()
    Image.new("RGB", (60, 90), "white").save(buf, format="PNG")
    receipt = Receipt(
        user=test_user, status=Receipt.READY, merchant="Costco", total="42.00", date=date(2026, 8, 5)
    )
    receipt.image.save("receipt.png", ContentFile(buf.getvalue()), save=True)

    ReceiptItem.objects.create(
        receipt=receipt,
        description="ORG BANANAS 3LB",
        amount="3.50",
        normalized_name="Bananas",
        product_category="Produce",
    )

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
    page.goto(f"{live_server.url}/receipts")
    return page


def open_detail_drawer(page: Page):
    page.locator(".receipt-card").first.click()
    drawer = page.locator(DRAWER)
    expect(drawer).to_have_attribute("open", "")
    page.wait_for_timeout(500)  # let the open animation settle
    assert drawer.evaluate("el => el.open") is True
    return drawer


class TestReceiptListCard:
    def test_card_has_no_view_or_delete_buttons(self, receipts_page: Page):
        card = receipts_page.locator(".receipt-card").first
        assert card.locator("wa-button").count() == 0, "list cards should carry no buttons"

    def test_whole_card_opens_the_detail_drawer(self, receipts_page: Page):
        page = receipts_page
        # Click the text area, not the image — the old markup only wired up the <img>.
        page.locator(".receipt-card .receipt-card-merchant").first.click()
        expect(page.locator(DRAWER)).to_have_attribute("open", "")

    def test_enter_key_opens_the_detail_drawer(self, receipts_page: Page):
        page = receipts_page
        page.locator(".receipt-card").first.focus()
        page.keyboard.press("Enter")
        expect(page.locator(DRAWER)).to_have_attribute("open", "")

    def test_card_text_is_a_2x2_grid(self, receipts_page: Page):
        page = receipts_page
        boxes = page.evaluate(
            """() => {
                const body = document.querySelector('.receipt-card .receipt-card-body');
                const get = sel => { const b = body.querySelector(sel).getBoundingClientRect();
                    return {top: Math.round(b.top), left: Math.round(b.left), right: Math.round(b.right)}; };
                return {
                    cols: getComputedStyle(body).gridTemplateColumns.split(' ').length,
                    merchant: get('.receipt-card-merchant'),
                    total: get('.receipt-card-total'),
                    date: get('.receipt-card-date'),
                    items: get('.receipt-card-items'),
                };
            }"""
        )
        assert boxes["cols"] == 2, f"expected 2 grid columns, got {boxes['cols']}"
        # Row 1: merchant | total. Row 2: date | items.
        assert abs(boxes["merchant"]["top"] - boxes["total"]["top"]) <= 6, boxes
        assert abs(boxes["date"]["top"] - boxes["items"]["top"]) <= 6, boxes
        assert boxes["date"]["top"] > boxes["merchant"]["top"], "date should be on the second row"
        assert boxes["total"]["left"] > boxes["merchant"]["left"], "total should be in the right column"
        assert boxes["items"]["left"] > boxes["date"]["left"], "item count should be in the right column"

    def test_pending_card_grid_survives_missing_date_and_total(self, receipts_page: Page, test_user):
        """A freshly-uploaded (PENDING) receipt has no date or total; empty cells break baseline
        alignment, so those are placeholdered."""
        page = receipts_page
        Receipt.objects.create(user=test_user, status=Receipt.PENDING)
        page.reload()

        rows = page.evaluate(
            """() => [...document.querySelectorAll('.receipt-card')].map(card => {
                const t = sel => {
                    const el = card.querySelector(sel);
                    const b = el.getBoundingClientRect();
                    return {top: Math.round(b.top), text: el.textContent.trim()};
                };
                return {date: t('.receipt-card-date'), items: t('.receipt-card-items')};
            })"""
        )
        assert len(rows) == 2, f"expected both receipts to be listed, got {len(rows)}"
        for row in rows:
            assert row["date"]["text"], "date cell must never be empty"
            assert abs(row["date"]["top"] - row["items"]["top"]) <= 6, row


class TestReceiptDetailDrawer:
    """`wa-after-hide` bubbles, so a nested overlay closing must not tear down the drawer.

    Regression guard for app.js's auto-remove listener (it needs an event-target check).
    """

    def test_header_actions_menu_does_not_close_the_drawer(self, receipts_page: Page):
        page = receipts_page
        drawer = open_detail_drawer(page)

        page.locator(f'{DRAWER} wa-button[aria-label="Receipt actions"]').click()
        page.wait_for_timeout(500)

        assert page.locator(DRAWER).count() == 1, "drawer was removed from the DOM"
        assert drawer.evaluate("el => el.open") is True, "clicking the header menu dismissed the drawer"
        assert page.locator(f"{DRAWER} wa-dropdown").first.evaluate("el => el.open") is True
        expect(page.get_by_text("Process With AI")).to_be_visible()

    def test_item_category_dropdown_does_not_close_the_drawer(self, receipts_page: Page):
        page = receipts_page
        drawer = open_detail_drawer(page)

        page.locator(f"{DRAWER} tbody wa-badge", has_text="Produce").click()
        page.wait_for_timeout(500)

        assert page.locator(DRAWER).count() == 1, "drawer was removed from the DOM"
        assert drawer.evaluate("el => el.open") is True, "opening a row's category menu dismissed the drawer"

    def test_row_shows_the_normalized_name_over_the_raw_line(self, receipts_page: Page):
        """Same shape as the analytics items table: canonical name, printed text beneath."""
        row = receipts_page.locator(f"{DRAWER} tbody tr").first
        open_detail_drawer(receipts_page)

        expect(row).to_contain_text("Bananas")
        expect(row.locator(".receipt-item-raw")).to_have_text("ORG BANANAS 3LB")

    def test_recategorizing_an_item_repoints_every_matching_line(self, receipts_page: Page, test_user):
        """The edit is an alias override, so it has to reach the user's other receipts too."""
        page = receipts_page
        other = Receipt.objects.create(
            user=test_user, status=Receipt.READY, merchant="Safeway", total="4.00", date=date(2026, 7, 1)
        )
        # Different case and spacing — alias_key has to collapse it to the same item.
        twin = ReceiptItem.objects.create(
            receipt=other, description="Org  Bananas 3lb", amount="4.00",
            normalized_name="Bananas", product_category="Produce",
        )

        open_detail_drawer(page)
        page.locator(f"{DRAWER} tbody wa-badge", has_text="Produce").click()
        page.get_by_role("menuitem", name="Snacks & Candy").click()

        expect(page.locator(f"{DRAWER} tbody wa-badge").first).to_have_text("Snacks & Candy")
        twin.refresh_from_db()
        assert twin.product_category == "Snacks & Candy", "the other receipt's matching line was left behind"

    def test_header_action_buttons_are_vertically_aligned(self, receipts_page: Page):
        """The slotted ⋮ trigger must line up with the drawer's built-in close button."""
        page = receipts_page
        open_detail_drawer(page)

        centers = page.evaluate(
            """() => {
                const d = document.querySelector('wa-drawer.receipt-detail-dialog');
                const mid = el => { const b = el.getBoundingClientRect(); return (b.top + b.bottom) / 2; };
                return {
                    ellipsis: mid(d.querySelector('wa-button[aria-label="Receipt actions"] wa-icon')),
                    close: mid(d.shadowRoot.querySelector('wa-button.close wa-icon')),
                };
            }"""
        )
        delta = abs(centers["ellipsis"] - centers["close"])
        assert delta <= 0.6, f"⋮ icon is {delta:.1f}px off the close icon: {centers}"

    def test_close_button_is_outlined(self, receipts_page: Page):
        page = receipts_page
        drawer = open_detail_drawer(page)
        close = drawer.locator('.drawer-footer wa-button:text("Close")')
        assert close.get_attribute("appearance") == "outlined"

    def test_delete_from_the_menu_closes_the_drawer_and_removes_the_card(self, receipts_page: Page):
        page = receipts_page
        open_detail_drawer(page)

        page.locator(f'{DRAWER} wa-button[aria-label="Receipt actions"]').click()
        page.wait_for_timeout(300)
        page.locator(f"{DRAWER} wa-dropdown-item", has_text="Delete").click()

        confirm = page.locator("wa-dialog.dialog-overview")
        expect(confirm).to_have_attribute("open", "")
        page.wait_for_timeout(300)
        confirm.locator("wa-button.confirm").click()

        page.wait_for_timeout(1200)
        assert page.locator(DRAWER).count() == 0, "drawer should close after deleting the receipt"
        assert page.locator(".receipt-card").count() == 0, "the deleted receipt's card should be gone"

    def test_closing_the_drawer_still_removes_it(self, receipts_page: Page):
        """The target check must not break the intended auto-cleanup."""
        page = receipts_page
        drawer = open_detail_drawer(page)

        drawer.evaluate("el => el.open = false")
        page.wait_for_timeout(800)  # hide animation + removal

        assert page.locator(DRAWER).count() == 0, "closed drawer should be removed from the DOM"
