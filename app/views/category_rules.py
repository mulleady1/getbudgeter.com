import logging

from django.core.paginator import Paginator
from django.db.models.functions import Lower
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import action

from ..categorization import TransactionCategorizer
from ..models import Category, CategoryRule, Transaction
from .base import LoginRequiredViewSet

logger = logging.getLogger(__name__)


class CategoryRuleViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        group_by_category = request.GET.get("group_by_category") in ["on", "true"]
        page_number = request.GET.get("page", 1)
        search_query = request.GET.get("search", "").strip()

        if group_by_category:
            rules_queryset = (
                CategoryRule.objects.filter(user=request.user)
                .select_related("category")
                .order_by(Lower("category__name"), Lower("keyword"))
            )
        else:
            rules_queryset = (
                CategoryRule.objects.filter(user=request.user).select_related("category").order_by(Lower("keyword"))
            )

        if search_query:
            rules_queryset = rules_queryset.filter(keyword__icontains=search_query)

        paginator = Paginator(rules_queryset, 50)
        page_obj = paginator.get_page(page_number)

        categories = Category.objects.filter(user=request.user).order_by(Lower("name"))

        checkbox_params = QueryDict(mutable=True)
        if search_query:
            checkbox_params["search"] = search_query
        checkbox_params = checkbox_params.urlencode()

        inf_scroll_params = QueryDict(mutable=True)
        if page_obj.has_next():
            inf_scroll_params["page"] = str(page_obj.next_page_number())
        if group_by_category:
            inf_scroll_params["group_by_category"] = "true"
        if search_query:
            inf_scroll_params["search"] = search_query
        inf_scroll_params = inf_scroll_params.urlencode()

        if request.htmx and request.GET.get("page"):
            template = "category_rules/category_rules_page.html#rules-list"
        elif request.htmx and not request.htmx.boosted:
            template = "category_rules/category_rules_page.html#category-rules-card"
        else:
            template = "category_rules/category_rules_page.html"

        context = {
            "rules": page_obj.object_list,
            "page_obj": page_obj,
            "total_count": paginator.count,
            "categories": categories,
            "group_by_category": group_by_category,
            "search_query": search_query,
            "checkbox_params": checkbox_params,
            "inf_scroll_params": inf_scroll_params,
        }
        return render(request, template, context)

    def create(self, request):
        keyword = request.POST.get("keyword", "").strip()
        category_id = request.POST.get("category")
        priority = request.POST.get("priority", "0")

        if not keyword or not category_id:
            return JsonResponse({"success": False, "error": "Keyword and category are required"}, status=400)

        category = get_object_or_404(Category, id=category_id, user=request.user)

        existing = CategoryRule.objects.filter(user=request.user, keyword__iexact=keyword).first()
        if existing:
            return JsonResponse({"success": False, "error": "You already have a rule with this keyword"}, status=400)

        rule = CategoryRule.objects.create(
            user=request.user,
            keyword=keyword,
            category=category,
            priority=int(priority) if priority.isdigit() else 0,
            is_default=False,
        )

        logger.info(
            "User %s created category rule: '%s' → %s (priority: %s)",
            request.user.username,
            rule.keyword,
            category.name,
            rule.priority,
        )

        res = HttpResponse()
        res.headers["HX-Refresh"] = "true"
        return res

    def update(self, request, pk):
        data = QueryDict(request.body)
        rule = get_object_or_404(CategoryRule, id=pk, user=request.user)

        keyword = data.get("keyword", "").strip()
        if keyword:
            rule.keyword = keyword

        category_id = data.get("category")
        if category_id:
            rule.category = get_object_or_404(Category, id=category_id, user=request.user)

        priority = data.get("priority")
        if priority is not None:
            rule.priority = int(priority) if priority.isdigit() else 0

        rule.save()

        logger.info(
            "User %s updated category rule: '%s' → %s (priority: %s)",
            request.user.username,
            rule.keyword,
            rule.category.name,
            rule.priority,
        )
        return HttpResponse()

    def destroy(self, request, pk):
        rule = get_object_or_404(CategoryRule, id=pk, user=request.user)
        logger.info(
            "User %s deleted category rule: '%s' → %s",
            request.user.username,
            rule.keyword,
            rule.category.name,
        )
        rule.delete()
        return HttpResponse()

    @action(detail=False, methods=["post"])
    def reprocess(self, request):
        transactions = Transaction.objects.filter(user=request.user)

        if not transactions.exists():
            return JsonResponse({"success": False, "error": "No transactions to reprocess"}, status=400)

        categorizer = TransactionCategorizer(request.user)
        updated_count = 0
        for transaction in transactions:
            category = categorizer.categorize(transaction.merchant, transaction.description)
            if category is not None and transaction.category != category:
                transaction.category = category
                transaction.save()
                updated_count += 1

        total_count = transactions.count()
        logger.info(
            "User %s reprocessed transactions: %s updated out of %s total",
            request.user.username,
            updated_count,
            total_count,
        )

        if updated_count == 0:
            message = f"All {total_count} transactions already have correct categories."
        else:
            message = f"Successfully updated {updated_count} of {total_count} transactions."

        alert_html = f"""
    <div style="position: fixed; top: 60px; right: 50%; transform: translateX(50%);">
        <wa-callout variant="success" open>
        <script>
            var el = me()
            setTimeout(() => el.remove(), 5000)
        </script>
        {message}
        </wa-callout>
    </div>
    """
        res = HttpResponse(alert_html)
        res.headers["HX-Swap-OOB"] = "afterbegin:#category-rules-page"
        return res
