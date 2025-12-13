import logging
from typing import cast
from urllib.parse import parse_qs, urlparse

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from ..categorization import TransactionCategorizer
from ..csv_parsers.base import BaseCSVParser
from ..models import Category, CategoryRule, Transaction
from .utils import get_parser_class, get_random_color

logger = logging.getLogger(__name__)


def create_category_rule_from_search(request, category_id, user):
    """
    Creates a CategoryRule if there's a search query in the current URL.

    Args:
        request: The HTTP request object
        category_id: The ID of the category to associate with the rule
        user: The user creating the rule

    Returns:
        The search query string if a rule was created, None otherwise
    """
    current_url = request.headers.get("HX-Current-URL", "")
    if not current_url:
        return None

    parsed_url = urlparse(current_url)
    query_params = parse_qs(parsed_url.query)
    search_query = query_params.get("q", [""])[0].strip()

    if not search_query:
        return None

    # Get the category
    category = get_object_or_404(Category, id=category_id)

    # Check if a rule with this keyword already exists for this user
    existing_rule = CategoryRule.objects.filter(user=user, keyword__iexact=search_query).first()

    if not existing_rule:
        # Create a new CategoryRule
        CategoryRule.objects.create(user=user, keyword=search_query, category=category, is_default=False, priority=0)
        logger.info(
            "user %s created CategoryRule: '%s' → %s",
            user.id,
            search_query,
            category.name,
        )
        return search_query

    return None


class UploadCSVView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "transactions/upload.html")

    def post(self, request):
        if "csv_file" not in request.FILES:
            context = {"error": "No file uploaded"}
            return render(request, "transactions/upload.html", context)

        csv_file = request.FILES["csv_file"]
        bank_type = request.POST.get("bank_type", "").strip()

        # Validate file type
        if not csv_file.name.endswith(".csv"):
            context = {"error": "Please upload a CSV file"}
            return render(request, "transactions/upload.html", context)

        # Validate file size (5MB max)
        if csv_file.size > 5 * 1024 * 1024:
            context = {"error": "File size must be less than 5MB"}
            return render(request, "transactions/upload.html", context)

        # Validate bank type
        if not bank_type:
            context = {"error": "Please select a bank type"}
            return render(request, "transactions/upload.html", context)

        try:
            # Get parser class from selected type
            parser_class = get_parser_class(bank_type)
            if not parser_class:
                context = {"error": "Invalid bank type selected. Supported formats: Citi, Capital One"}
                return render(request, "transactions/upload.html", context)

            # Parse CSV
            parser = parser_class()
            transactions_data = parser.parse(csv_file)

            if not transactions_data:
                context = {"error": "No transactions found in CSV"}
                return render(request, "transactions/upload.html", context)

            # Categorize transactions
            categorizer = TransactionCategorizer(request.user)

            # Process transactions with deduplication
            created_count = 0
            skipped_count = 0
            transactions_to_create = []

            for trans_data in transactions_data:
                # Generate hash for deduplication
                trans_hash = BaseCSVParser.generate_transaction_hash(
                    request.user.id, trans_data["date"], trans_data["description"], trans_data["amount"]
                )

                # Check if transaction already exists
                if Transaction.objects.filter(user=request.user, transaction_hash=trans_hash).exists():
                    skipped_count += 1
                    continue

                # Categorize transaction
                category = categorizer.categorize(trans_data["merchant"], trans_data["description"])

                # Create transaction object
                transaction = Transaction(
                    user=request.user,
                    date=trans_data["date"],
                    description=trans_data["description"],
                    merchant=trans_data["merchant"],
                    amount=trans_data["amount"],
                    category=category,
                    transaction_hash=trans_hash,
                    original_data=trans_data["original_data"],
                    source=parser.BANK_NAME,
                )
                transactions_to_create.append(transaction)

            # Bulk create transactions
            if transactions_to_create:
                Transaction.objects.bulk_create(transactions_to_create)
                created_count = len(transactions_to_create)

            context = {
                "success": True,
                "created_count": created_count,
                "skipped_count": skipped_count,
                "bank": parser.BANK_NAME,
            }

            logger.info(
                "User %s uploaded CSV: %s transactions created, %s skipped",
                request.user.username,
                created_count,
                skipped_count,
            )

            return render(request, "transactions/upload_summary.html", context)

        except Exception as e:
            logger.error("Error processing CSV upload: %s", str(e), exc_info=True)
            context = {"error": f"Error processing CSV: {str(e)}"}
            return render(request, "transactions/upload.html", context)


class TransactionListView(LoginRequiredMixin, View):
    def get(self, request):
        # Get filter parameters
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        category_id = request.GET.get("category")
        search_query = request.GET.get("q", "").strip()
        page = int(request.GET.get("page", "1"))

        # Pagination settings
        page_size = 50
        offset = (page - 1) * page_size

        # Base queryset
        transactions = Transaction.objects.filter(user=request.user).select_related("category").order_by("-date", "-id")

        # Apply filters
        if start_date:
            transactions = transactions.filter(date__gte=start_date)
        if end_date:
            transactions = transactions.filter(date__lte=end_date)
        if category_id:
            if category_id == "uncategorized":
                transactions = transactions.filter(category__isnull=True)
            else:
                transactions = transactions.filter(category_id=category_id)

        # Apply search filter
        if search_query:
            transactions = transactions.filter(
                Q(merchant__icontains=search_query)
                | Q(description__icontains=search_query)
                | Q(amount__icontains=search_query)
                | Q(date__icontains=search_query)
            )

        # Get categories for filter dropdown (both default and user-specific)
        categories = Category.objects.filter(Q(user=None, is_default=True) | Q(user=request.user)).order_by("name")

        # Get total count before limiting
        total_count = transactions.count()
        paginated_transactions = transactions[offset : offset + page_size]
        has_more = total_count > offset + page_size

        context = {
            "transactions": paginated_transactions,
            "categories": categories,
            "start_date": start_date,
            "end_date": end_date,
            "selected_category": category_id,
            "search_query": search_query,
            "total_count": total_count,
            "showing_count": min(offset + len(paginated_transactions), total_count),
            "page": page,
            "has_more": has_more,
        }

        # Check if this is an infinite scroll request
        if request.htmx and request.GET.get("page"):
            # Return only transaction rows for infinite scroll
            from django.template.loader import render_to_string

            return render(request, "transactions/transactions_page.html#transaction-rows", context)
        elif request.htmx and not request.htmx.boosted:
            # Return main table + OOB query count
            from django.template.loader import render_to_string

            table_html = render_to_string(
                "transactions/transactions_page.html#transactions-table", context, request=request
            )
            query_count_html = render_to_string(
                "transactions/transactions_page.html#query-count", context, request=request
            )
            return HttpResponse(table_html + query_count_html)
        else:
            template = "transactions/transactions_page.html"
            return render(request, template, context)


class TransactionDetailView(LoginRequiredMixin, View):
    def get(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        categories = Category.objects.filter(Q(user=None, is_default=True) | Q(user=request.user)).order_by("name")
        return render(
            request, "transactions/categorize_form.html", {"transaction": transaction, "categories": categories}
        )

    def put(self, request, transaction_id):
        data = QueryDict(request.body)
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        category_id = data.get("category")
        if category_id:
            transaction.category_id = cast(int, category_id)
            transaction.save()

            # Create a CategoryRule if there's a search query
            create_category_rule_from_search(request, category_id, request.user)

        categories = Category.objects.filter(Q(user=None, is_default=True) | Q(user=request.user)).order_by("name")

        return render(
            request,
            "transactions/transactions_page.html#transaction-row",
            {"transaction": transaction, "categories": categories},
        )

    def delete(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        transaction.delete()
        return HttpResponse()


@login_required
@require_http_methods(["POST"])
def bulk_categorize_transactions(request):
    """Bulk categorize multiple transactions at once"""
    transaction_ids = request.POST.get("transaction_ids", "").split(",")
    category_id = request.POST.get("category_id")

    if not transaction_ids or not category_id:
        return JsonResponse({"success": False, "error": "Missing required fields"}, status=400)

    # Verify category exists and is accessible
    category = get_object_or_404(Category, id=category_id)

    # Update transactions - only for the current user
    updated_count = Transaction.objects.filter(id__in=transaction_ids, user=request.user).update(
        category_id=category_id
    )

    # Create a CategoryRule if there's a search query
    create_category_rule_from_search(request, category_id, request.user)

    logger.info(
        "user %s bulk categorized %s transactions to category %s", request.user.id, updated_count, category.name
    )

    res = HttpResponse()
    res.headers["HX-Trigger"] = "reload-transactions"
    return res


@login_required
@require_http_methods(["GET"])
def new_category_dialog(request):
    """Return the new category dialog HTML"""
    return render(request, "transactions/new_category_dialog.html")


class CategoryListView(LoginRequiredMixin, View):
    def get(self, request):
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "transactions/manage_categories.html", {"categories": categories})

    def post(self, request):
        category_name = request.POST.get("name", "").strip()
        inline = "inline" in request.GET
        if not category_name:
            return JsonResponse({"success": False, "error": "Category name is required"}, status=400)

        # Validate length
        if len(category_name) > 100:
            return JsonResponse({"success": False, "error": "Category name must be 100 characters or less"}, status=400)

        # Check if user already has a category with this exact name
        existing = Category.objects.filter(user=request.user, name=category_name).first()
        if existing:
            return JsonResponse({"success": False, "error": "You already have a category with this name"}, status=400)

        # Create the category for this user
        # Note: We bypass the choices validation by using save() directly
        category = Category(name=category_name, user=request.user, is_default=False, color=get_random_color())
        # Save without validation to allow custom names
        category.save()

        logger.info(
            "User %s created custom category '%s'",
            request.user.username,
            category.name,
        )

        if inline:
            return render(request, "transactions/manage_categories.html#category-item", {"category": category})

        res = HttpResponse()
        res.headers["HX-Refresh"] = "true"
        return res


class CategoryDetailView(LoginRequiredMixin, View):
    def put(self, request, category_id):
        category = get_object_or_404(Category, id=category_id, user=request.user)
        category.name = request.POST.get("name", "").strip()
        category.save()
        return HttpResponse()

    def delete(self, request, category_id):
        category = get_object_or_404(Category, id=category_id, user=request.user)
        category.delete()
        return HttpResponse()
