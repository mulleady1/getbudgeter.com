import json
from calendar import monthrange
from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal

from django.shortcuts import render
from rest_framework.decorators import action

from ..models import Category, Receipt, Transaction
from .base import LoginRequiredViewSet


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

    def _get_trend_chart_data(self, data_items, mode, selected_category=None, data_source="transactions"):
        if selected_category and selected_category != "all":
            try:
                if hasattr(data_items, "filter"):
                    filtered_items = data_items.filter(category_id=int(selected_category))
                else:
                    filtered_items = [item for item in data_items if item.category_id == int(selected_category)]
            except (ValueError, TypeError):
                filtered_items = data_items
        else:
            filtered_items = data_items

        if mode == "month":
            weekly_spending = defaultdict(Decimal)
            for item in filtered_items:
                item_date = item.receipt.date if data_source == "receipts" else item.date
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
            monthly_spending = defaultdict(Decimal)
            for item in filtered_items:
                item_date = item.receipt.date if data_source == "receipts" else item.date
                monthly_spending[item_date.replace(day=1)] += abs(item.amount)

            if monthly_spending:
                months = sorted(monthly_spending.keys())
                return {
                    "labels": [m.strftime("%b %Y") for m in months],
                    "data": [float(monthly_spending[m]) for m in months],
                    "period": "Month",
                }
        return None

    def _parse_date_range(self, request):
        today = datetime.now().date()

        if not request.GET:
            p = request.session.get("analytics_params", {})
            mode = p.get("mode", "month")
            month = p.get("month", today.strftime("%Y-%m"))
            year = p.get("year", str(today.year))
            start_date_str = p.get("start_date", "")
            end_date_str = p.get("end_date", "")
            selected_category = p.get("category", "all")
            data_source = p.get("data_source", "transactions")
        else:
            mode = request.GET.get("mode", "month")
            month = request.GET.get("month", today.strftime("%Y-%m"))
            year = request.GET.get("year", str(today.year))
            start_date_str = request.GET.get("start_date", "")
            end_date_str = request.GET.get("end_date", "")
            selected_category = request.GET.get("category", "all")
            data_source = request.GET.get("data_source", "transactions")
            request.session["analytics_params"] = {
                "mode": mode, "month": month, "year": year,
                "start_date": start_date_str, "end_date": end_date_str,
                "category": selected_category, "data_source": data_source,
            }

        if mode == "custom":
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date() if start_date_str else today.replace(day=1)
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date() if end_date_str else today
        elif mode == "year":
            try:
                selected_year = int(year) if year else today.year
            except ValueError:
                selected_year = today.year
            start_date = datetime(selected_year, 1, 1).date()
            end_date = datetime(selected_year, 12, 31).date()
        else:
            try:
                selected_month = datetime.strptime(month, "%Y-%m").date() if month else today.replace(day=1)
            except ValueError:
                selected_month = today.replace(day=1)
            start_date = selected_month.replace(day=1)
            last_day = monthrange(selected_month.year, selected_month.month)[1]
            end_date = selected_month.replace(day=last_day)

        return mode, month, year, start_date, end_date, start_date_str, end_date_str, selected_category, data_source

    def list(self, request):
        mode, month, year, start_date, end_date, start_date_str, end_date_str, selected_category, data_source = (
            self._parse_date_range(request)
        )

        if data_source == "receipts":
            receipts = Receipt.objects.filter(
                user=request.user, date__gte=start_date, date__lte=end_date
            ).prefetch_related("items__category")

            items = []
            total_count = 0
            total_amount = Decimal("0")
            for receipt in receipts:
                items.extend(receipt.items.all())
                total_count += 1
                total_amount += receipt.total

            category_spending = defaultdict(Decimal)
            for item in items:
                key = item.category.name if item.category else "Uncategorized"
                category_spending[key] += abs(item.amount)

            data_items = items
            count_label = "receipts"
            total_transactions = total_count
            total_spent = total_amount
        else:
            transactions = Transaction.objects.filter(
                user=request.user, date__gte=start_date, date__lte=end_date, amount__gte=0, anomaly=False
            ).select_related("category")

            category_spending = defaultdict(Decimal)
            for trans in transactions:
                key = trans.category.name if trans.category else "Uncategorized"
                category_spending[key] += abs(trans.amount)

            data_items = transactions
            count_label = "transactions"
            total_transactions = transactions.count()
            total_spent = sum(abs(t.amount) for t in transactions)

        category_chart_data = (
            {"labels": list(category_spending.keys()), "data": [float(v) for v in category_spending.values()]}
            if category_spending else None
        )
        categories = Category.objects.filter(user=request.user).order_by("name")
        trend_chart_data = self._get_trend_chart_data(data_items, mode, selected_category, data_source)
        merchant_chart_data = self._get_merchant_chart_data(data_items, selected_category) if data_source == "transactions" else None

        context = {
            "category_chart_data": json.dumps(category_chart_data) if category_chart_data else None,
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "merchant_chart_data": json.dumps(merchant_chart_data) if merchant_chart_data else None,
            "start_date": start_date, "end_date": end_date,
            "total_transactions": total_transactions, "total_spent": total_spent,
            "mode": mode, "month": month, "year": year,
            "custom_start_date": start_date_str, "custom_end_date": end_date_str,
            "categories": categories, "selected_category": selected_category,
            "data_source": data_source, "count_label": count_label,
        }
        return render(request, "analytics/analytics_page.html", context)

    @action(detail=False, methods=["get"], url_path="merchant-chart")
    def merchant_chart(self, request):
        mode, month, year, start_date, end_date, start_date_str, end_date_str, selected_category, _ = (
            self._parse_date_range(request)
        )
        transactions = Transaction.objects.filter(
            user=request.user, date__gte=start_date, date__lte=end_date, amount__gte=0, anomaly=False
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
        mode, month, year, start_date, end_date, start_date_str, end_date_str, selected_category, _ = (
            self._parse_date_range(request)
        )
        transactions = Transaction.objects.filter(
            user=request.user, date__gte=start_date, date__lte=end_date, amount__gte=0, anomaly=False
        ).select_related("category")
        categories = Category.objects.filter(user=request.user).order_by("name")
        trend_chart_data = self._get_trend_chart_data(transactions, mode, selected_category)
        context = {
            "trend_chart_data": json.dumps(trend_chart_data) if trend_chart_data else None,
            "categories": categories,
            "selected_category": selected_category,
        }
        return render(request, "analytics/trend_chart_partial.html", context)
