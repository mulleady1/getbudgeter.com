import json
from calendar import monthrange
from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View

from ..models import Category, Receipt, ReceiptItem, Transaction


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

    def get_trend_chart_data(self, data_items, mode, selected_category=None, data_source="transactions"):
        """Generate trend chart data, optionally filtered by category"""
        # Filter by category if specified
        if selected_category and selected_category != "all":
            try:
                if hasattr(data_items, "filter"):
                    filtered_items = data_items.filter(category_id=int(selected_category))
                else:
                    # It's a list, filter manually
                    filtered_items = [item for item in data_items if item.category_id == int(selected_category)]
            except (ValueError, TypeError):
                filtered_items = data_items
        else:
            filtered_items = data_items

        # Spending over time (by week for month mode, by month otherwise)
        if mode == "month":
            # Group by week for month view
            weekly_spending = defaultdict(Decimal)
            for item in filtered_items:
                # Get the date (transactions have date, receipt items need receipt.date)
                if data_source == "receipts":
                    item_date = item.receipt.date
                else:
                    item_date = item.date
                # Get the Monday of the week this item belongs to
                week_start = item_date - timedelta(days=item_date.weekday())
                weekly_spending[week_start] += abs(item.amount)

            if weekly_spending:
                weeks = sorted(weekly_spending.keys())
                return {
                    "labels": [w.strftime("Week of %b %d") for w in weeks],
                    "data": [float(weekly_spending[w]) for w in weeks],
                    "period": "Week",
                }
        else:
            # Group by month for year/custom view
            monthly_spending = defaultdict(Decimal)
            for item in filtered_items:
                # Get the date (transactions have date, receipt items need receipt.date)
                if data_source == "receipts":
                    item_date = item.receipt.date
                else:
                    item_date = item.date
                month_key = item_date.replace(day=1)
                monthly_spending[month_key] += abs(item.amount)

            if monthly_spending:
                months = sorted(monthly_spending.keys())
                return {
                    "labels": [m.strftime("%b %Y") for m in months],
                    "data": [float(monthly_spending[m]) for m in months],
                    "period": "Month",
                }
        return None

    def get(self, request):
        today = datetime.now().date()

        # If there are no query parameters, try to load from session
        if not request.GET:
            session_params = request.session.get("analytics_params", {})
            mode = session_params.get("mode", "month")
            month = session_params.get("month", today.strftime("%Y-%m"))
            year = session_params.get("year", str(today.year))
            start_date_str = session_params.get("start_date", "")
            end_date_str = session_params.get("end_date", "")
            selected_category = session_params.get("category", "all")
            data_source = session_params.get("data_source", "transactions")
        else:
            # Get parameters from query string
            mode = request.GET.get("mode", "month")
            month = request.GET.get("month", today.strftime("%Y-%m"))
            year = request.GET.get("year", str(today.year))
            start_date_str = request.GET.get("start_date", "")
            end_date_str = request.GET.get("end_date", "")
            selected_category = request.GET.get("category", "all")
            data_source = request.GET.get("data_source", "transactions")

            # Save to session for next visit
            request.session["analytics_params"] = {
                "mode": mode,
                "month": month,
                "year": year,
                "start_date": start_date_str,
                "end_date": end_date_str,
                "category": selected_category,
                "data_source": data_source,
            }

        # Calculate date range based on mode
        if mode == "custom":
            # Use custom dates if provided
            start_date = (
                datetime.strptime(start_date_str, "%Y-%m-%d").date()
                if start_date_str
                else today.replace(day=1)
            )
            end_date = (
                datetime.strptime(end_date_str, "%Y-%m-%d").date()
                if end_date_str
                else today
            )
        elif mode == "year":
            # Parse year input (format: YYYY)
            if year:
                try:
                    selected_year = int(year)
                except ValueError:
                    selected_year = today.year
            else:
                selected_year = today.year

            # Get first and last day of the selected year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:  # month mode (default)
            # Parse month input (format: YYYY-MM)
            if month:
                try:
                    selected_month = datetime.strptime(month, "%Y-%m").date()
                except ValueError:
                    selected_month = today.replace(day=1)
            else:
                selected_month = today.replace(day=1)

            # Get first and last day of the selected month
            start_date = selected_month.replace(day=1)
            last_day = monthrange(selected_month.year, selected_month.month)[1]
            end_date = selected_month.replace(day=last_day)

        # Get data based on source (transactions or receipts)
        if data_source == "receipts":
            # Get receipts and their items
            receipts = Receipt.objects.filter(
                user=request.user, date__gte=start_date, date__lte=end_date
            ).prefetch_related("items__category")

            # Build a list of items for charting
            items = []
            total_count = 0
            total_amount = Decimal("0")
            for receipt in receipts:
                receipt_items = receipt.items.all()
                items.extend(receipt_items)
                total_count += 1
                total_amount += receipt.total

            # Spending by category (from receipt items)
            category_spending = defaultdict(Decimal)
            for item in items:
                if item.category:
                    category_name = item.category.name
                    category_spending[category_name] += abs(item.amount)
                else:
                    category_spending["Uncategorized"] += abs(item.amount)

            # Store for trend calculation
            data_items = items
            count_label = "receipts"
            total_transactions = total_count
            total_spent = total_amount

        else:
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

            # Store for calculations
            data_items = transactions
            count_label = "transactions"
            total_transactions = transactions.count()
            total_spent = sum(abs(t.amount) for t in transactions)

        # Create data for pie chart
        if category_spending:
            category_chart_data = {
                "labels": list(category_spending.keys()),
                "data": [float(v) for v in category_spending.values()],
            }
        else:
            category_chart_data = None

        # Get categories for dropdown
        categories = Category.objects.filter(user=request.user).order_by("name")

        # Generate trend chart data with optional category filter
        trend_chart_data = self.get_trend_chart_data(data_items, mode, selected_category, data_source)

        # Generate merchant chart data only for transactions (not for receipts)
        if data_source == "transactions":
            merchant_chart_data = self.get_merchant_chart_data(data_items, selected_category)
        else:
            merchant_chart_data = None

        context = {
            "category_chart_data": json.dumps(category_chart_data) if category_chart_data else None,
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "start_date": start_date,
            "end_date": end_date,
            "total_transactions": total_transactions,
            "total_spent": total_spent,
            "mode": mode,
            "month": month,
            "year": year,
            "custom_start_date": start_date_str,
            "custom_end_date": end_date_str,
            "categories": categories,
            "selected_category": selected_category,
            "data_source": data_source,
            "count_label": count_label,
        }

        return render(request, "analytics/analytics_page.html", context)


class MerchantChartPartialView(LoginRequiredMixin, View):
    """Partial view for merchant chart with category filter"""

    def get(self, request):
        today = datetime.now().date()

        # Get parameters from query string or session
        if not request.GET:
            session_params = request.session.get("analytics_params", {})
            mode = session_params.get("mode", "month")
            month = session_params.get("month", today.strftime("%Y-%m"))
            year = session_params.get("year", str(today.year))
            start_date_str = session_params.get("start_date", "")
            end_date_str = session_params.get("end_date", "")
            selected_category = session_params.get("category", "all")
        else:
            mode = request.GET.get("mode", "month")
            month = request.GET.get("month", today.strftime("%Y-%m"))
            year = request.GET.get("year", str(today.year))
            start_date_str = request.GET.get("start_date", "")
            end_date_str = request.GET.get("end_date", "")
            selected_category = request.GET.get("category", "all")

        # Calculate date range based on mode (same logic as main analytics view)
        if mode == "custom":
            start_date = (
                datetime.strptime(start_date_str, "%Y-%m-%d").date()
                if start_date_str
                else today.replace(day=1)
            )
            end_date = (
                datetime.strptime(end_date_str, "%Y-%m-%d").date()
                if end_date_str
                else today
            )
        elif mode == "year":
            if year:
                try:
                    selected_year = int(year)
                except ValueError:
                    selected_year = today.year
            else:
                selected_year = today.year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:  # month mode (default)
            if month:
                try:
                    selected_month = datetime.strptime(month, "%Y-%m").date()
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


class TrendChartPartialView(LoginRequiredMixin, View):
    """Partial view for trend chart with category filter"""

    def get(self, request):
        today = datetime.now().date()

        # Get parameters from query string or session
        if not request.GET:
            session_params = request.session.get("analytics_params", {})
            mode = session_params.get("mode", "month")
            month = session_params.get("month", today.strftime("%Y-%m"))
            year = session_params.get("year", str(today.year))
            start_date_str = session_params.get("start_date", "")
            end_date_str = session_params.get("end_date", "")
            selected_category = session_params.get("category", "all")
        else:
            mode = request.GET.get("mode", "month")
            month = request.GET.get("month", today.strftime("%Y-%m"))
            year = request.GET.get("year", str(today.year))
            start_date_str = request.GET.get("start_date", "")
            end_date_str = request.GET.get("end_date", "")
            selected_category = request.GET.get("category", "all")

        # Calculate date range based on mode (same logic as main analytics view)
        if mode == "custom":
            start_date = (
                datetime.strptime(start_date_str, "%Y-%m-%d").date()
                if start_date_str
                else today.replace(day=1)
            )
            end_date = (
                datetime.strptime(end_date_str, "%Y-%m-%d").date()
                if end_date_str
                else today
            )
        elif mode == "year":
            if year:
                try:
                    selected_year = int(year)
                except ValueError:
                    selected_year = today.year
            else:
                selected_year = today.year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:  # month mode (default)
            if month:
                try:
                    selected_month = datetime.strptime(month, "%Y-%m").date()
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

        # Get categories for dropdown
        categories = Category.objects.filter(user=request.user).order_by("name")

        # Generate trend chart data
        analytics_view = AnalyticsView()
        trend_chart_data = analytics_view.get_trend_chart_data(transactions, mode, selected_category)

        context = {
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "categories": categories,
            "selected_category": selected_category,
        }

        return render(request, "analytics/trend_chart_partial.html", context)
