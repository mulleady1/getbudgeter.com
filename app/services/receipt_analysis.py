from calendar import monthrange
from collections import defaultdict
from datetime import datetime
from decimal import Decimal

from ..models import ReceiptItem


def parse_date_range(mode, month_str, year_str):
    today = datetime.now().date()
    if mode == "year":
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


def get_item_spending(user, start_date, end_date, search_query=""):
    """
    Groups ReceiptItems by description (case-insensitive) for the given date range.
    Returns (groups, grand_total, total_occurrences).
    Each group is a dict: description, total, count, merchants (list), last_seen, category.
    """
    qs = ReceiptItem.objects.filter(
        receipt__user=user,
        receipt__date__gte=start_date,
        receipt__date__lte=end_date,
        receipt__status="READY",
    ).select_related("receipt", "category")

    if search_query:
        qs = qs.filter(description__icontains=search_query)

    groups = {}
    for item in qs.order_by("receipt__date"):
        key = item.description.lower()
        if key not in groups:
            groups[key] = {
                "description": item.description,
                "total": Decimal("0"),
                "count": 0,
                "merchants": set(),
                "last_seen": None,
                "category": None,
            }
        g = groups[key]
        g["total"] += item.amount
        g["count"] += 1
        if item.receipt.merchant:
            g["merchants"].add(item.receipt.merchant)
        if g["last_seen"] is None or item.receipt.date > g["last_seen"]:
            g["last_seen"] = item.receipt.date
        if g["category"] is None and item.category:
            g["category"] = item.category

    result = sorted(groups.values(), key=lambda x: x["total"], reverse=True)
    for g in result:
        g["merchants"] = sorted(g["merchants"])

    grand_total = sum(g["total"] for g in result)
    total_occurrences = sum(g["count"] for g in result)
    return result, grand_total, total_occurrences
