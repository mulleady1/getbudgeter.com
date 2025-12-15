from collections import defaultdict
from datetime import datetime
from decimal import Decimal

import plotly.express as px
import plotly.graph_objects as go
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View

from ..models import Transaction


class AnalyticsView(LoginRequiredMixin, View):
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

        # Create pie chart for spending by category
        # Plotly.js is loaded separately in the template, so we don't include it here
        if category_spending:
            fig = px.pie(
                names=list(category_spending.keys()),
                values=[float(v) for v in category_spending.values()],
                title="Spending by Category",
            )
            fig.update_layout(height=400)
            category_chart = fig.to_html(
                include_plotlyjs=False, div_id="category-chart", config={"displayModeBar": False}
            )
        else:
            category_chart = None

        # Spending over time (by month)
        monthly_spending = defaultdict(Decimal)
        for trans in transactions:
            month_key = trans.date.replace(day=1)
            monthly_spending[month_key] += abs(trans.amount)

        if monthly_spending:
            months = sorted(monthly_spending.keys())
            amounts = [float(monthly_spending[m]) for m in months]
            month_labels = [m.strftime("%b %Y") for m in months]

            fig = go.Figure(data=[go.Scatter(x=month_labels, y=amounts, mode="lines+markers", line=dict(width=3))])
            fig.update_layout(title="Spending Trend", xaxis_title="Month", yaxis_title="Amount ($)", height=400)
            trend_chart = fig.to_html(include_plotlyjs=False, div_id="trend-chart", config={"displayModeBar": False})
        else:
            trend_chart = None

        # Top merchants
        merchant_spending = defaultdict(Decimal)
        for trans in transactions:
            if trans.merchant:
                merchant_spending[trans.merchant] += abs(trans.amount)

        top_merchants = sorted(merchant_spending.items(), key=lambda x: x[1], reverse=True)[:10]

        if top_merchants:
            merchants = [m[0] for m in top_merchants]
            amounts = [float(m[1]) for m in top_merchants]

            fig = go.Figure(data=[go.Bar(x=merchants, y=amounts)])
            fig.update_layout(title="Top 10 Merchants", xaxis_title="Merchant", yaxis_title="Amount ($)", height=400)
            merchant_chart = fig.to_html(
                include_plotlyjs=False, div_id="merchant-chart", config={"displayModeBar": False}
            )
        else:
            merchant_chart = None

        context = {
            "category_chart": category_chart,
            "trend_chart": trend_chart,
            "merchant_chart": merchant_chart,
            "start_date": start_date,
            "end_date": end_date,
            "total_transactions": transactions.count(),
            "total_spent": sum(abs(t.amount) for t in transactions),
            "mode": mode,
            "month": request.GET.get("month", today.strftime("%Y-%m")),
            "year": request.GET.get("year", str(today.year)),
            "custom_start_date": request.GET.get("start_date", ""),
            "custom_end_date": request.GET.get("end_date", ""),
        }

        return render(request, "analytics/analytics_page.html", context)
