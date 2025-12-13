from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal

import plotly.express as px
import plotly.graph_objects as go
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View

from ..models import Transaction


class AnalyticsView(LoginRequiredMixin, View):
    def get(self, request):
        today = datetime.now().date()
        range_preset = request.GET.get("range_preset", "this_month")

        # Calculate date range based on preset
        if range_preset == "custom":
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
        elif range_preset == "this_month":
            start_date = today.replace(day=1)
            end_date = today
        elif range_preset == "last_month":
            first_of_this_month = today.replace(day=1)
            end_date = first_of_this_month - timedelta(days=1)
            start_date = end_date.replace(day=1)
        elif range_preset == "this_quarter":
            quarter = (today.month - 1) // 3
            start_date = today.replace(month=quarter * 3 + 1, day=1)
            end_date = today
        elif range_preset == "this_year":
            start_date = today.replace(month=1, day=1)
            end_date = today
        elif range_preset == "last_6_months":
            end_date = today
            start_date = (today - timedelta(days=180)).replace(day=1)
        elif range_preset == "all_time":
            # Get actual min/max dates from transactions
            user_transactions = Transaction.objects.filter(user=request.user)
            if user_transactions.exists():
                start_date = user_transactions.order_by("date").first().date
                end_date = user_transactions.order_by("-date").first().date
            else:
                start_date = today.replace(day=1)
                end_date = today
        else:
            # Default to this month
            start_date = today.replace(day=1)
            end_date = today

        # Get transactions
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=start_date,
            date__lte=end_date,
            amount__gte=0,  # Only non-negative amounts
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
        if category_spending:
            fig = px.pie(
                names=list(category_spending.keys()),
                values=[float(v) for v in category_spending.values()],
                title="Spending by Category",
            )
            fig.update_layout(height=400)
            category_chart = fig.to_html(
                include_plotlyjs="cdn", div_id="category-chart", config={"displayModeBar": False}
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
            trend_chart = fig.to_html(include_plotlyjs="cdn", div_id="trend-chart", config={"displayModeBar": False})
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
                include_plotlyjs="cdn", div_id="merchant-chart", config={"displayModeBar": False}
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
            "range_preset": range_preset,
            "custom_start_date": request.GET.get("start_date", ""),
            "custom_end_date": request.GET.get("end_date", ""),
        }

        return render(request, "analytics/analytics_page.html", context)
