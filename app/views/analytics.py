import json
from collections import defaultdict
from datetime import datetime
from decimal import Decimal

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View

from ..models import Transaction


class AnalyticsView(LoginRequiredMixin, View):
    def get_merchant_chart_data(self, transactions, selected_category=None):
        """Generate merchant chart data, optionally filtered by category"""
        # Filter by category if specified
        filtered_transactions = transactions
        if selected_category and selected_category != "all":
            try:
                filtered_transactions = transactions.filter(category_id=int(selected_category))
            except (ValueError, TypeError):
                pass

        # Top merchants
        merchant_spending = defaultdict(Decimal)
        for trans in filtered_transactions:
            if trans.merchant:
                merchant_spending[trans.merchant] += abs(trans.amount)

        top_merchants = sorted(merchant_spending.items(), key=lambda x: x[1], reverse=True)[:10]

        if top_merchants:
            return {
                "labels": [m[0] for m in top_merchants],
                "data": [float(m[1]) for m in top_merchants],
            }
        return None

    def get(self, request):
        from calendar import monthrange

        today = datetime.now().date()
        mode = request.GET.get("mode", "month")

        # Calculate date range based on mode
        if mode == "custom":
            # Use custom dates if provided
            start_date = (
                datetime.strptime(request.GET.get("start_date"), "%Y-%m-%d").date()
                if request.GET.get("start_date")
                else today.replace(day=1)
            )
            end_date = (
                datetime.strptime(request.GET.get("end_date"), "%Y-%m-%d").date()
                if request.GET.get("end_date")
                else today
            )
        elif mode == "year":
            # Parse year input (format: YYYY)
            year_str = request.GET.get("year")
            if year_str:
                try:
                    selected_year = int(year_str)
                except ValueError:
                    selected_year = today.year
            else:
                selected_year = today.year

            # Get first and last day of the selected year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:  # month mode (default)
            # Parse month input (format: YYYY-MM)
            month_str = request.GET.get("month")
            if month_str:
                try:
                    selected_month = datetime.strptime(month_str, "%Y-%m").date()
                except ValueError:
                    selected_month = today.replace(day=1)
            else:
                selected_month = today.replace(day=1)

            # Get first and last day of the selected month
            start_date = selected_month.replace(day=1)
            last_day = monthrange(selected_month.year, selected_month.month)[1]
            end_date = selected_month.replace(day=last_day)

        # Get transactions
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=start_date,
            date__lte=end_date,
            amount__gte=0,  # Only non-negative amounts
            anomaly=False,  # Exclude anomaly transactions
        ).select_related("category")

        # Spending by category
        category_spending = defaultdict(Decimal)
        for trans in transactions:
            if trans.category:
                category_name = trans.category.name
                category_spending[category_name] += abs(trans.amount)
            else:
                category_spending["Uncategorized"] += abs(trans.amount)

        # Create data for pie chart
        if category_spending:
            category_chart_data = {
                "labels": list(category_spending.keys()),
                "data": [float(v) for v in category_spending.values()],
            }
        else:
            category_chart_data = None

        # Spending over time (by week for month mode, by month otherwise)
        if mode == "month":
            # Group by week for month view
            from datetime import timedelta

            weekly_spending = defaultdict(Decimal)
            for trans in transactions:
                # Get the Monday of the week this transaction belongs to
                week_start = trans.date - timedelta(days=trans.date.weekday())
                weekly_spending[week_start] += abs(trans.amount)

            if weekly_spending:
                weeks = sorted(weekly_spending.keys())
                trend_chart_data = {
                    "labels": [w.strftime("Week of %b %d") for w in weeks],
                    "data": [float(weekly_spending[w]) for w in weeks],
                    "period": "Week",
                }
            else:
                trend_chart_data = None
        else:
            # Group by month for year/custom view
            monthly_spending = defaultdict(Decimal)
            for trans in transactions:
                month_key = trans.date.replace(day=1)
                monthly_spending[month_key] += abs(trans.amount)

            if monthly_spending:
                months = sorted(monthly_spending.keys())
                trend_chart_data = {
                    "labels": [m.strftime("%b %Y") for m in months],
                    "data": [float(monthly_spending[m]) for m in months],
                    "period": "Month",
                }
            else:
                trend_chart_data = None

        # Get categories for dropdown
        from ..models import Category

        categories = Category.objects.filter(user=request.user).order_by("name")
        selected_category = request.GET.get("category", "all")

        # Generate merchant chart data with optional category filter
        merchant_chart_data = self.get_merchant_chart_data(transactions, selected_category)

        context = {
            "category_chart_data": json.dumps(category_chart_data) if category_chart_data else None,
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "start_date": start_date,
            "end_date": end_date,
            "total_transactions": transactions.count(),
            "total_spent": sum(abs(t.amount) for t in transactions),
            "mode": mode,
            "month": request.GET.get("month", today.strftime("%Y-%m")),
            "year": request.GET.get("year", str(today.year)),
            "custom_start_date": request.GET.get("start_date", ""),
            "custom_end_date": request.GET.get("end_date", ""),
            "categories": categories,
            "selected_category": selected_category,
        }

        return render(request, "analytics/analytics_page.html", context)


class MerchantChartPartialView(LoginRequiredMixin, View):
    """Partial view for merchant chart with category filter"""

    def get(self, request):
        from calendar import monthrange

        from ..models import Category

        today = datetime.now().date()
        mode = request.GET.get("mode", "month")

        # Calculate date range based on mode (same logic as main analytics view)
        if mode == "custom":
            start_date = (
                datetime.strptime(request.GET.get("start_date"), "%Y-%m-%d").date()
                if request.GET.get("start_date")
                else today.replace(day=1)
            )
            end_date = (
                datetime.strptime(request.GET.get("end_date"), "%Y-%m-%d").date()
                if request.GET.get("end_date")
                else today
            )
        elif mode == "year":
            year_str = request.GET.get("year")
            if year_str:
                try:
                    selected_year = int(year_str)
                except ValueError:
                    selected_year = today.year
            else:
                selected_year = today.year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:  # month mode (default)
            month_str = request.GET.get("month")
            if month_str:
                try:
                    selected_month = datetime.strptime(month_str, "%Y-%m").date()
                except ValueError:
                    selected_month = today.replace(day=1)
            else:
                selected_month = today.replace(day=1)
            start_date = selected_month.replace(day=1)
            last_day = monthrange(selected_month.year, selected_month.month)[1]
            end_date = selected_month.replace(day=last_day)

        # Get transactions
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=start_date,
            date__lte=end_date,
            amount__gte=0,
            anomaly=False,
        ).select_related("category")

        # Get selected category
        selected_category = request.GET.get("category", "all")

        # Get categories for dropdown
        categories = Category.objects.filter(user=request.user).order_by("name")

        # Generate merchant chart data
        analytics_view = AnalyticsView()
        merchant_chart_data = analytics_view.get_merchant_chart_data(transactions, selected_category)

        context = {
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "categories": categories,
            "selected_category": selected_category,
        }

        return render(request, "analytics/merchant_chart_partial.html", context)
