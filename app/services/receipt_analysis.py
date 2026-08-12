from calendar import monthrange
from collections import defaultdict
from datetime import datetime
from decimal import Decimal

from django.db.models import Q

from ..models import ReceiptItem

# Shown for items the normalizer hasn't reached yet — distinct from the "Other"
# taxonomy bucket, which means "categorized, but nothing fits".
UNCATEGORIZED_LABEL = "Uncategorized"

# Sortable columns of the items table, keyed by the value the UI sends.
ITEM_SORT_KEYS = {
    "item": lambda g: g["description"].lower(),
    "category": lambda g: (g["product_category"] or "").lower(),
    "qty": lambda g: g["count"],
    "total": lambda g: g["total"],
}
DEFAULT_ITEM_SORT = "total"


def parse_date_range(mode, month_str, year_str, start_date_str="", end_date_str=""):
    today = datetime.now().date()
    if mode == "custom":
        try:
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date() if start_date_str else today.replace(day=1)
        except ValueError:
            start_date = today.replace(day=1)
        try:
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date() if end_date_str else today
        except ValueError:
            end_date = today
        return start_date, end_date
    elif mode == "year":
        try:
            year = int(year_str) if year_str else today.year
        except ValueError:
            year = today.year
        return datetime(year, 1, 1).date(), datetime(year, 12, 31).date()
    else:
        try:
            selected_month = datetime.strptime(month_str, "%Y-%m").date() if month_str else today.replace(day=1)
        except ValueError:
            selected_month = today.replace(day=1)
        start_date = selected_month.replace(day=1)
        last_day = monthrange(selected_month.year, selected_month.month)[1]
        return start_date, selected_month.replace(day=last_day)


def get_item_spending(
    user, start_date, end_date, search_query="", product_category="", sort=DEFAULT_ITEM_SORT, descending=True
):
    """
    Groups ReceiptItems by normalized product name for the given date range,
    falling back to the raw description for items the normalizer hasn't reached.
    Returns (groups, grand_total, total_occurrences, category_totals).

    `sort` is one of ITEM_SORT_KEYS; anything else falls back to total spent.

    Each group is a dict: description, total, count, merchants (list), last_seen,
    product_category, raw_descriptions (list).
    Each entry in category_totals is a dict: name, total, count.
    """
    qs = ReceiptItem.objects.filter(
        receipt__user=user,
        receipt__date__gte=start_date,
        receipt__date__lte=end_date,
        receipt__status="READY",
    ).select_related("receipt")

    if search_query:
        # Match either axis: the user may search what the receipt said or what
        # we renamed it to, and they have no way of knowing which is which.
        qs = qs.filter(
            Q(description__icontains=search_query) | Q(normalized_name__icontains=search_query)
        )
    if product_category:
        qs = qs.filter(product_category=product_category)

    groups = {}
    category_totals = defaultdict(lambda: {"total": Decimal("0"), "count": 0})

    for item in qs.order_by("receipt__date"):
        display = item.normalized_name or item.description
        key = display.lower()
        if key not in groups:
            groups[key] = {
                "description": display,
                "total": Decimal("0"),
                "count": 0,
                "merchants": set(),
                "last_seen": None,
                "product_category": "",
                "raw_descriptions": set(),
            }
        g = groups[key]
        g["total"] += item.amount
        g["count"] += 1
        g["raw_descriptions"].add(item.description)
        if item.receipt.merchant:
            g["merchants"].add(item.receipt.merchant)
        if g["last_seen"] is None or item.receipt.date > g["last_seen"]:
            g["last_seen"] = item.receipt.date
        if not g["product_category"] and item.product_category:
            g["product_category"] = item.product_category

        bucket = category_totals[item.product_category or UNCATEGORIZED_LABEL]
        bucket["total"] += item.amount
        bucket["count"] += 1

    # Two passes: the requested column on top of total-spent, so ties within a
    # category (or an equal qty) still lead with the biggest spend.
    result = sorted(groups.values(), key=lambda x: x["total"], reverse=True)
    result.sort(key=ITEM_SORT_KEYS.get(sort, ITEM_SORT_KEYS[DEFAULT_ITEM_SORT]), reverse=descending)
    for g in result:
        g["merchants"] = sorted(g["merchants"])
        # Surface the raw text only when normalization actually merged variants.
        g["raw_descriptions"] = sorted(
            raw for raw in g["raw_descriptions"] if raw.lower() != g["description"].lower()
        )

    rolled_up = sorted(
        ({"name": name, **totals} for name, totals in category_totals.items()),
        key=lambda x: x["total"],
        reverse=True,
    )

    grand_total = sum(g["total"] for g in result)
    total_occurrences = sum(g["count"] for g in result)
    return result, grand_total, total_occurrences, rolled_up
