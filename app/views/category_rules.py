import logging

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.views.generic import View

from ..models import Category, CategoryRule

logger = logging.getLogger(__name__)


class CategoryRuleListView(LoginRequiredMixin, View):
    def get(self, request):
        # Check if grouping by category is enabled
        group_by_category = request.GET.get("group_by_category") == "true"

        # Get user-specific rules with appropriate ordering
        if group_by_category:
            # Sort by category name, then keyword
            rules = (
                CategoryRule.objects.filter(user=request.user)
                .select_related("category")
                .order_by("category__name", "keyword")
            )
        else:
            # Default: sort by keyword only
            rules = CategoryRule.objects.filter(user=request.user).select_related("category").order_by("keyword")

        # Get categories for dropdown
        categories = Category.objects.filter(Q(user=None, is_default=True) | Q(user=request.user)).order_by("name")

        if request.htmx and not request.htmx.boosted:
            template = "category_rules/category_rules_page.html#category-rules-card"
        else:
            template = "category_rules/category_rules_page.html"

        context = {
            "rules": rules,
            "categories": categories,
            "group_by_category": group_by_category,
        }

        return render(request, template, context)

    def post(self, request):
        keyword = request.POST.get("keyword", "").strip()
        category_id = request.POST.get("category")
        priority = request.POST.get("priority", "0")

        if not keyword or not category_id:
            return JsonResponse({"success": False, "error": "Keyword and category are required"}, status=400)

        # Validate category exists and is accessible
        category = get_object_or_404(
            Category, Q(id=category_id) & (Q(user=None, is_default=True) | Q(user=request.user))
        )

        # Check if rule with this keyword already exists for this user
        existing = CategoryRule.objects.filter(user=request.user, keyword__iexact=keyword).first()
        if existing:
            return JsonResponse({"success": False, "error": "You already have a rule with this keyword"}, status=400)

        # Create the rule
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


class CategoryRuleDetailView(LoginRequiredMixin, View):
    def put(self, request, rule_id):
        data = QueryDict(request.body)
        rule = get_object_or_404(CategoryRule, id=rule_id, user=request.user)

        # Update keyword if provided
        keyword = data.get("keyword", "").strip()
        if keyword:
            rule.keyword = keyword

        # Update category if provided
        category_id = data.get("category")
        if category_id:
            category = get_object_or_404(
                Category, Q(id=category_id) & (Q(user=None, is_default=True) | Q(user=request.user))
            )
            rule.category = category

        # Update priority if provided
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

    def delete(self, request, rule_id):
        rule = get_object_or_404(CategoryRule, id=rule_id, user=request.user)

        logger.info(
            "User %s deleted category rule: '%s' → %s",
            request.user.username,
            rule.keyword,
            rule.category.name,
        )

        rule.delete()
        return HttpResponse()
