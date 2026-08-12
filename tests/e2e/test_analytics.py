"""Analytics page: switching between the Transactions and Receipt Items views.

The two views share one date range and one form, and the items filters swap only the
results table so the search box keeps focus. That wiring is all client-side, so it needs
a real browser to verify.
"""

import datetime
from decimal import Decimal

import pytest
from playwright.sync_api import Page, expect

from app.models import Receipt, ReceiptItem, Transaction
from tests.conftest import fill_wa_input

TODAY = datetime.date.today()


@pytest.fixture
def receipt_data(test_user):
    """One receipt with two aliases of the same item, so grouping is observable."""
    receipt = Receipt.objects.create(
        user=test_user,
        image="receipts/test.jpg",
        merchant="Trader Joes",
        date=TODAY,
        total=Decimal("31.76"),
        status="READY",
    )
    for description, normalized, product_category, amount in [
        ("ORG AVOCADO 4CT", "Avocados", "Produce", "7.99"),
        ("AVOCADOS ORGANIC", "Avocados", "Produce", "6.49"),
        ("WHOLE MILK 1GAL", "Whole Milk", "Dairy & Eggs", "4.29"),
        ("PINOT NOIR 750ML", "Pinot Noir", "Alcohol", "12.99"),
    ]:
        ReceiptItem.objects.create(
            receipt=receipt,
            description=description,
            normalized_name=normalized,
            product_category=product_category,
            amount=Decimal(amount),
        )
    Transaction.objects.create(
        user=test_user,
        date=TODAY,
        description="TRADER JOES #123",
        merchant="Trader Joes",
        amount=Decimal("31.76"),
        transaction_hash="analytics-test-hash",
        original_data={},
        source="test",
    )
    return receipt


def open_analytics(page: Page, live_server, query=""):
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    page.goto(f"{live_server.url}/analytics{query}")
    page.wait_for_load_state("networkidle")
    return errors


def test_defaults_to_transactions_view(logged_in_page: Page, live_server, receipt_data):
    errors = open_analytics(logged_in_page, live_server)

    expect(logged_in_page.locator('wa-button[data-view="transactions"]')).to_have_attribute("aria-pressed", "true")
    expect(logged_in_page.locator("#category-chart")).to_be_visible()
    expect(logged_in_page.locator("#item-search")).to_have_count(0)
    assert not errors, errors


def test_switching_to_items_keeps_the_date_range(logged_in_page: Page, live_server, receipt_data):
    errors = open_analytics(logged_in_page, live_server, "?mode=month&month=" + TODAY.strftime("%Y-%m"))

    logged_in_page.locator('wa-button[data-view="items"]').click()
    logged_in_page.wait_for_selector("#item-search")

    # The shared controls are outside the swapped panel, so the month must survive.
    expect(logged_in_page.locator("#month-input")).to_have_js_property("value", TODAY.strftime("%Y-%m"))
    expect(logged_in_page.locator('wa-button[data-view="items"]')).to_have_attribute("aria-pressed", "true")
    expect(logged_in_page.locator("#items-table tbody tr")).to_have_count(3)
    assert not errors, errors


def test_item_search_swaps_results_and_keeps_focus(logged_in_page: Page, live_server, receipt_data):
    errors = open_analytics(logged_in_page, live_server, "?view=items")
    logged_in_page.wait_for_selector("#item-search")

    fill_wa_input(logged_in_page, "#item-search", "avocado")
    expect(logged_in_page.locator("#items-table tbody tr")).to_have_count(1)
    expect(logged_in_page.locator("#items-table tbody tr").first).to_contain_text("Avocados")

    # Only #items-results was replaced, so the input the user typed in still has focus.
    assert logged_in_page.evaluate("document.activeElement?.id") == "item-search"
    assert not errors, errors


def test_category_pill_filters_and_updates_the_select(logged_in_page: Page, live_server, receipt_data):
    errors = open_analytics(logged_in_page, live_server, "?view=items")
    logged_in_page.wait_for_selector("#item-search")

    logged_in_page.locator('[data-product-category="Produce"]').click()
    logged_in_page.wait_for_selector('#items-results [data-product-category="all"]')

    # The pill swaps the whole panel so the select above it re-renders to match.
    expect(logged_in_page.locator("#product-category-select")).to_have_js_property("value", "Produce")
    expect(logged_in_page.locator("#items-table tbody tr")).to_have_count(1)

    # Clearing via the chip goes back to the unfiltered "all" sentinel.
    logged_in_page.locator('#items-results [data-product-category="all"]').click()
    logged_in_page.wait_for_selector('[data-product-category="Produce"]')
    expect(logged_in_page.locator("#product-category-select")).to_have_js_property("value", "all")
    expect(logged_in_page.locator("#items-table tbody tr")).to_have_count(3)
    assert not errors, errors


def test_switching_back_to_transactions_restores_charts(logged_in_page: Page, live_server, receipt_data):
    errors = open_analytics(logged_in_page, live_server, "?view=items")
    logged_in_page.wait_for_selector("#item-search")

    logged_in_page.locator('wa-button[data-view="transactions"]').click()
    logged_in_page.wait_for_selector("#category-chart")

    expect(logged_in_page.locator("#item-search")).to_have_count(0)
    expect(logged_in_page.locator("#trend-chart-container")).to_be_visible()
    assert not errors, errors


def test_old_receipts_url_redirects(logged_in_page: Page, live_server, receipt_data):
    logged_in_page.goto(f"{live_server.url}/receipts/items-analysis")
    logged_in_page.wait_for_load_state("networkidle")

    assert "/analytics" in logged_in_page.url
    expect(logged_in_page.locator("#item-search")).to_be_visible()
