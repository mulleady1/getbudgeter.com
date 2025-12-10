from datetime import datetime

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from ..models import Budget, Category


class BudgetListView(LoginRequiredMixin, View):
    def get(self, request):
        # Get current month
        current_month = datetime.now().replace(day=1).date()

        # Get budgets for current month
        budgets = Budget.objects.filter(user=request.user, month=current_month).select_related("category")

        # Get all categories
        categories = Category.objects.filter(user=None, is_default=True)

        context = {"budgets": budgets, "categories": categories, "current_month": current_month}

        if request.htmx:
            template = "budgets/budgets_page.html#budget-list"
        else:
            template = "budgets/budgets_page.html"

        return render(request, template, context)

    def post(self, request):
        category_id = request.POST.get("category")
        amount = request.POST.get("amount")
        month = request.POST.get("month")

        if month:
            month_date = datetime.strptime(month, "%Y-%m").date()
        else:
            month_date = datetime.now().replace(day=1).date()

        Budget.objects.update_or_create(
            user=request.user,
            category_id=category_id,
            month=month_date,
            defaults={"amount": amount},
        )

        budgets = Budget.objects.filter(user=request.user, month=month_date).select_related("category")

        response = render(request, "budgets/budgets_page.html#budget-list", {"budgets": budgets})
        response["HX-Trigger"] = "budgets-changed"
        return response


@require_http_methods(["GET"])
def new_budget(request):
    categories = Category.objects.filter(user=None, is_default=True)
    current_month = datetime.now().replace(day=1).date()
    return render(request, "budgets/budget_form.html", {"categories": categories, "current_month": current_month})


class BudgetEditDeleteView(LoginRequiredMixin, View):
    def get(self, request, budget_id):
        budget = get_object_or_404(Budget, id=budget_id, user=request.user)
        categories = Category.objects.filter(user=None, is_default=True)
        return render(request, "budgets/budget_form.html", {"budget": budget, "categories": categories})

    def put(self, request, budget_id):
        data = QueryDict(request.body)
        budget = get_object_or_404(Budget, id=budget_id, user=request.user)
        budget.amount = data.get("amount")
        budget.save()

        budgets = Budget.objects.filter(user=request.user, month=budget.month).select_related("category")
        response = render(request, "budgets/budgets_page.html#budget-list", {"budgets": budgets})
        response["HX-Trigger"] = "budgets-changed"
        return response

    def delete(self, request, budget_id):
        budget = get_object_or_404(Budget, id=budget_id, user=request.user)
        budget.delete()
        response = HttpResponse()
        response["HX-Trigger"] = "budgets-changed"
        return response
