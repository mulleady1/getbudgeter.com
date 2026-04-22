from datetime import datetime

from django.db.models import Sum
from django.http import HttpResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import action

from ..models import Budget, Category, Transaction
from .base import LoginRequiredViewSet
from .utils import get_month_from_url


def _get_selected_month(request):
    month_str = request.GET.get("month")
    if month_str:
        try:
            return datetime.strptime(month_str, "%Y-%m").date()
        except ValueError:
            pass
    return datetime.now().replace(day=1).date()


def _get_month_from_htmx_url(request):
    if request.htmx and request.htmx.current_url:
        return get_month_from_url(request.htmx.current_url)
    return datetime.now().replace(day=1).date()


def _get_budgets_for_month(user, selected_month):
    budgets = Budget.objects.filter(user=user, month=selected_month).select_related("category")
    if budgets.exists():
        return budgets, False
    budgets = Budget.objects.filter(user=user, month=None).select_related("category")
    return budgets, True


def _build_budget_data(request, budgets, selected_month):
    spending_qs = (
        Transaction.objects.filter(
            user=request.user,
            date__year=selected_month.year,
            date__month=selected_month.month,
            category__isnull=False,
        )
        .values("category_id")
        .annotate(total=Sum("amount"))
    )
    spending_by_category = {s["category_id"]: s["total"] for s in spending_qs}

    budget_data = []
    for budget in budgets:
        spent = spending_by_category.get(budget.category_id, 0)
        remaining = float(budget.amount) - float(spent)
        pct = min(100, int(float(spent) / float(budget.amount) * 100)) if budget.amount > 0 else 0
        budget_data.append({
            "budget": budget, "spent": spent,
            "remaining": remaining, "pct": pct, "over": remaining < 0,
        })
    return budget_data


class BudgetViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        selected_month = _get_selected_month(request)
        budgets, showing_defaults = _get_budgets_for_month(request.user, selected_month)
        categories = Category.objects.filter(user=request.user)
        budget_data = _build_budget_data(request, budgets, selected_month)

        context = {
            "budget_data": budget_data,
            "budgets": budgets,
            "categories": categories,
            "selected_month": selected_month,
            "showing_defaults": showing_defaults,
        }

        if request.htmx and not request.htmx.boosted:
            template = "budgets/budgets_page.html#budget-list"
        else:
            template = "budgets/budgets_page.html"

        return render(request, template, context)

    def create(self, request):
        category_id = request.POST.get("category")
        amount = request.POST.get("amount")

        Budget.objects.update_or_create(
            user=request.user, category_id=category_id, month=None,
            defaults={"amount": amount},
        )

        selected_month = _get_month_from_htmx_url(request)
        budgets, showing_defaults = _get_budgets_for_month(request.user, selected_month)
        categories = Category.objects.filter(user=request.user)
        budget_data = _build_budget_data(request, budgets, selected_month)

        response = render(
            request, "budgets/budgets_page.html#budget-list",
            {"budget_data": budget_data, "budgets": budgets, "categories": categories,
             "selected_month": selected_month, "showing_defaults": showing_defaults},
        )
        response["HX-Trigger"] = "budgets-changed"
        return response

    def retrieve(self, request, pk):
        budget = get_object_or_404(Budget, id=pk, user=request.user)
        categories = Category.objects.filter(user=request.user)
        return render(request, "budgets/budget_form.html", {"budget": budget, "categories": categories})

    def update(self, request, pk):
        data = QueryDict(request.body)
        budget = get_object_or_404(Budget, id=pk, user=request.user)
        budget.amount = data.get("amount")
        budget.save()

        selected_month = _get_month_from_htmx_url(request)
        budgets, showing_defaults = _get_budgets_for_month(request.user, selected_month)
        categories = Category.objects.filter(user=request.user)
        budget_data = _build_budget_data(request, budgets, selected_month)

        response = render(
            request, "budgets/budgets_page.html#budget-list",
            {"budget_data": budget_data, "budgets": budgets, "categories": categories,
             "selected_month": selected_month, "showing_defaults": showing_defaults},
        )
        response["HX-Trigger"] = "budgets-changed"
        return response

    def destroy(self, request, pk):
        budget = get_object_or_404(Budget, id=pk, user=request.user)
        budget.delete()

        selected_month = _get_month_from_htmx_url(request)
        budgets, showing_defaults = _get_budgets_for_month(request.user, selected_month)
        categories = Category.objects.filter(user=request.user)
        budget_data = _build_budget_data(request, budgets, selected_month)

        response = render(
            request, "budgets/budgets_page.html#budget-list",
            {"budget_data": budget_data, "budgets": budgets, "categories": categories,
             "selected_month": selected_month, "showing_defaults": showing_defaults},
        )
        response["HX-Trigger"] = "budgets-changed"
        return response

    @action(detail=False, methods=["get"])
    def new(self, request):
        categories = Category.objects.filter(user=request.user)
        return render(request, "budgets/budget_form.html", {"categories": categories})

    @action(detail=False, methods=["get"])
    def stats(self, request):
        selected_month = _get_selected_month(request)
        budgets, showing_defaults = _get_budgets_for_month(request.user, selected_month)

        spending_qs = (
            Transaction.objects.filter(
                user=request.user,
                date__year=selected_month.year,
                date__month=selected_month.month,
                category__isnull=False,
            )
            .values("category_id")
            .annotate(total=Sum("amount"))
        )
        spending_by_category = {s["category_id"]: s["total"] for s in spending_qs}

        total_budgeted = sum(float(b.amount) for b in budgets)
        total_spent = sum(float(spending_by_category.get(b.category_id, 0)) for b in budgets)
        total_remaining = total_budgeted - total_spent
        overall_pct = min(100, int(total_spent / total_budgeted * 100)) if total_budgeted > 0 else 0

        context = {
            "total_budgeted": total_budgeted,
            "total_spent": total_spent,
            "total_remaining": total_remaining,
            "overall_pct": overall_pct,
            "showing_defaults": showing_defaults,
        }
        return render(request, "budgets/budget_stats.html", context)
