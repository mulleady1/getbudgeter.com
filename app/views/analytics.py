import json
from collections import defaultdict
from datetime import timedelta
from decimal import Decimal

from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import action

from ..models import Category, Transaction
from ..services import DEFAULT_ITEM_SORT, ITEM_SORT_KEYS, get_item_spending, parse_date_range
from ..taxonomy import PRODUCT_CATEGORIES, PRODUCT_CATEGORIES_AZ
from .base import LoginRequiredViewSet


# Header cells of the items table. `key` matches ITEM_SORT_KEYS; the text columns
# have no css class so they keep the plain header styling.
ITEM_COLUMNS = [
    {"key": "item", "label": "Item", "css": ""},
    {"key": "category", "label": "Category", "css": ""},
    {"key": "qty", "label": "Qty", "css": "col-qty"},
    {"key": "total", "label": "Total", "css": "col-total"},
]


def _htmx_target_id(request):
    """The id of the element this request will swap, or None for a full page load.

    htmx 4 sends HX-Target as `tag#id` (e.g. `div#analytics-panel`), not the bare id.
    """
    if not request.htmx or request.htmx.boosted:
        return None
    return (request.htmx.target or "").rpartition("#")[2] or None


class AnalyticsViewSet(LoginRequiredViewSet):
    def _get_merchant_chart_data(self, transactions, selected_category=None):
        filtered = transactions
        if selected_category and selected_category != "all":
            try:
                filtered = transactions.filter(category_id=int(selected_category))
            except (ValueError, TypeError):
                pass

        merchant_spending = defaultdict(Decimal)
        for trans in filtered:
            if trans.merchant:
                merchant_spending[trans.merchant] += abs(trans.amount)

        top_merchants = sorted(merchant_spending.items(), key=lambda x: x[1], reverse=True)[:10]
        if top_merchants:
            return {"labels": [m[0] for m in top_merchants], "data": [float(m[1]) for m in top_merchants]}
        return None

    def _get_trend_chart_data(self, transactions, mode, start_date, end_date, selected_category=None):
        filtered_items = transactions
        if selected_category and selected_category != "all":
            try:
                filtered_items = transactions.filter(category_id=int(selected_category))
            except (ValueError, TypeError):
                pass

        if mode == "month":
            weekly_spending = defaultdict(Decimal)
            for item in filtered_items:
                week_start = item.date - timedelta(days=item.date.weekday())
                weekly_spending[week_start] += abs(item.amount)

            if weekly_spending:
                weeks = sorted(weekly_spending.keys())
                return {
                    "labels": [w.strftime("Week of %b %d") for w in weeks],
                    "data": [float(weekly_spending[w]) for w in weeks],
                    "period": "Week",
                }
        elif end_date.year > start_date.year:
            # A range spanning multiple calendar years would otherwise plot one point
            # per month, which gets unreadable — collapse to one point per year instead.
            yearly_spending = defaultdict(Decimal)
            for item in filtered_items:
                yearly_spending[item.date.year] += abs(item.amount)

            if yearly_spending:
                years = sorted(yearly_spending.keys())
                return {
                    "labels": [str(y) for y in years],
                    "data": [float(yearly_spending[y]) for y in years],
                    "period": "Year",
                }
        else:
            monthly_spending = defaultdict(Decimal)
            for item in filtered_items:
                monthly_spending[item.date.replace(day=1)] += abs(item.amount)

            if monthly_spending:
                months = sorted(monthly_spending.keys())
                return {
                    "labels": [m.strftime("%b %Y") for m in months],
                    "data": [float(monthly_spending[m]) for m in months],
                    "period": "Month",
                }
        return None

    def _parse_params(self, request):
        """
        Read the shared controls (date range + which view) plus the per-view filters.

        The date range is deliberately shared across both views: flipping from
        Transactions to Receipt Items should keep the period you were looking at.
        Params round-trip through the session so a bare /analytics resumes where
        you left off.
        """
        today = timezone.localdate()
        source = request.session.get("analytics_params", {}) if not request.GET else request.GET

        mode = source.get("mode") or "month"
        month = source.get("month") or today.strftime("%Y-%m")
        year = source.get("year") or str(today.year)
        start_date_str = source.get("start_date") or ""
        end_date_str = source.get("end_date") or ""
        selected_category = source.get("category") or "all"
        view = source.get("view") or "transactions"
        if view not in ("transactions", "items"):
            view = "transactions"
        search_query = (source.get("q") or "").strip()
        product_category = (source.get("product_category") or "").strip()
        if product_category not in PRODUCT_CATEGORIES:
            product_category = ""
        items_sort = source.get("sort") or DEFAULT_ITEM_SORT
        if items_sort not in ITEM_SORT_KEYS:
            items_sort = DEFAULT_ITEM_SORT
        items_dir = "asc" if source.get("dir") == "asc" else "desc"

        if request.GET:
            request.session["analytics_params"] = {
                "mode": mode, "month": month, "year": year,
                "start_date": start_date_str, "end_date": end_date_str,
                "category": selected_category, "view": view,
                "q": search_query, "product_category": product_category,
                "sort": items_sort, "dir": items_dir,
            }

        start_date, end_date = parse_date_range(mode, month, year, start_date_str, end_date_str)

        return {
            "mode": mode, "month": month, "year": year,
            "custom_start_date": start_date_str, "custom_end_date": end_date_str,
            "selected_category": selected_category, "view": view,
            "search_query": search_query, "product_category": product_category,
            "items_sort": items_sort, "items_dir": items_dir,
            "start_date": start_date, "end_date": end_date,
        }

    def _transactions_context(self, request, params):
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=params["start_date"],
            date__lte=params["end_date"],
            amount__gte=0,
            anomaly=False,
        ).select_related("category")

        category_spending = defaultdict(Decimal)
        for trans in transactions:
            key = trans.category.name if trans.category else "Uncategorized"
            category_spending[key] += abs(trans.amount)

        category_chart_data = (
            {"labels": list(category_spending.keys()), "data": [float(v) for v in category_spending.values()]}
            if category_spending else None
        )
        trend_chart_data = self._get_trend_chart_data(
            transactions, params["mode"], params["start_date"], params["end_date"], params["selected_category"]
        )
        merchant_chart_data = self._get_merchant_chart_data(transactions, params["selected_category"])

        return {
            "category_chart_data": json.dumps(category_chart_data) if category_chart_data else None,
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "categories": Category.objects.filter(user=request.user).order_by("name"),
            "total_transactions": transactions.count(),
            "total_spent": sum(abs(t.amount) for t in transactions),
        }

    def _items_context(self, request, params):
        groups, grand_total, total_occurrences, category_totals = get_item_spending(
            request.user,
            params["start_date"],
            params["end_date"],
            params["search_query"],
            params["product_category"],
            params["items_sort"],
            params["items_dir"] == "desc",
        )
        return {
            "groups": groups,
            "grand_total": grand_total,
            "total_occurrences": total_occurrences,
            "category_totals": category_totals,
            "product_categories": PRODUCT_CATEGORIES_AZ,
            "item_columns": ITEM_COLUMNS,
        }

    def list(self, request):
        params = self._parse_params(request)
        context = dict(params)

        if params["view"] == "items":
            context.update(self._items_context(request, params))
        else:
            context.update(self._transactions_context(request, params))

        # The search box lives inside the items panel, so typing swaps only the
        # results table — replacing the whole panel would steal focus mid-keystroke.
        target = _htmx_target_id(request)
        if target == "items-results":
            return render(request, "analytics/items_partial.html#items-results", context)
        if target == "analytics-panel":
            return render(request, "analytics/analytics_page.html#analytics-panel", context)
        return render(request, "analytics/analytics_page.html", context)

    @action(detail=False, methods=["get"], url_path="merchant-chart")
    def merchant_chart(self, request):
        params = self._parse_params(request)
        selected_category = params["selected_category"]
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=params["start_date"],
            date__lte=params["end_date"],
            amount__gte=0,
            anomaly=False,
        ).select_related("category")
        categories = Category.objects.filter(user=request.user).order_by("name")
        merchant_chart_data = self._get_merchant_chart_data(transactions, selected_category)
        context = {
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "categories": categories,
            "selected_category": selected_category,
        }
        return render(request, "analytics/merchant_chart_partial.html", context)

    @action(detail=False, methods=["get"], url_path="trend-chart")
    def trend_chart(self, request):
        params = self._parse_params(request)
        selected_category = params["selected_category"]
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=params["start_date"],
            date__lte=params["end_date"],
            amount__gte=0,
            anomaly=False,
        ).select_related("category")
        categories = Category.objects.filter(user=request.user).order_by("name")
        trend_chart_data = self._get_trend_chart_data(
            transactions, params["mode"], params["start_date"], params["end_date"], selected_category
        )
        context = {
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "categories": categories,
            "selected_category": selected_category,
        }
        return render(request, "analytics/trend_chart_partial.html", context)
