import logging
from typing import cast
from urllib.parse import parse_qs, urlparse

from django.db.models import Q
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.template.loader import render_to_string
from rest_framework.decorators import action

from ..categorization import TransactionCategorizer
from ..csv_parsers.base import BaseCSVParser
from ..models import Category, CategoryRule, Transaction
from .base import LoginRequiredViewSet
from .utils import get_parser_class, get_random_color

logger = logging.getLogger(__name__)


def _create_category_rule_from_search(request, category_id, user):
    current_url = request.headers.get("HX-Current-URL", "")
    if not current_url:
        return None

    parsed_url = urlparse(current_url)
    search_query = parse_qs(parsed_url.query).get("q", [""])[0].strip()
    if not search_query:
        return None

    category = get_object_or_404(Category, id=category_id)
    existing_rule = CategoryRule.objects.filter(user=user, keyword__iexact=search_query).first()

    if not existing_rule:
        CategoryRule.objects.create(user=user, keyword=search_query, category=category, is_default=False, priority=0)
        logger.info("user %s created CategoryRule: '%s' → %s", user.id, search_query, category.name)
        return search_query

    return None


class TransactionViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        date_mode = request.GET.get("date_mode", "range")
        category_id = request.GET.get("category")
        merchants = [m for m in request.GET.get("merchants", "").split(",") if m]
        descriptions = [d for d in request.GET.get("descriptions", "").split(",") if d]
        amount_min = request.GET.get("amount_min")
        amount_max = request.GET.get("amount_max")
        search_query = request.GET.get("q", "").strip()
        page = int(request.GET.get("page", "1"))

        page_size = 50
        offset = (page - 1) * page_size

        transactions = Transaction.objects.filter(user=request.user).select_related("category").order_by("-date", "-id")

        if start_date:
            if date_mode == "on":
                transactions = transactions.filter(date=start_date)
            elif date_mode == "before":
                transactions = transactions.filter(date__lt=start_date)
            elif date_mode == "on_or_before":
                transactions = transactions.filter(date__lte=start_date)
            elif date_mode == "after":
                transactions = transactions.filter(date__gt=start_date)
            elif date_mode == "on_or_after":
                transactions = transactions.filter(date__gte=start_date)
            elif date_mode == "range" and end_date:
                transactions = transactions.filter(date__gte=start_date, date__lte=end_date)

        if category_id:
            if category_id == "uncategorized":
                transactions = transactions.filter(category__isnull=True)
            else:
                transactions = transactions.filter(category_id=category_id)

        if merchants:
            transactions = transactions.filter(merchant__in=merchants)
        if descriptions:
            transactions = transactions.filter(description__in=descriptions)
        if amount_min:
            transactions = transactions.filter(amount__gte=amount_min)
        if amount_max:
            transactions = transactions.filter(amount__lte=amount_max)
        if search_query:
            transactions = transactions.filter(
                Q(merchant__icontains=search_query)
                | Q(description__icontains=search_query)
                | Q(amount__icontains=search_query)
                | Q(date__icontains=search_query)
            )

        categories = Category.objects.filter(user=request.user).order_by("name")
        total_count = transactions.count()
        paginated_transactions = transactions[offset: offset + page_size]
        has_more = total_count > offset + page_size

        context = {
            "transactions": paginated_transactions,
            "categories": categories,
            "start_date": start_date, "end_date": end_date,
            "selected_category": category_id,
            "search_query": search_query,
            "total_count": total_count,
            "showing_count": min(offset + len(paginated_transactions), total_count),
            "page": page, "has_more": has_more,
            "active_filters": {
                "merchants": merchants, "descriptions": descriptions,
                "category": category_id, "start_date": start_date,
                "end_date": end_date, "date_mode": date_mode,
                "amount_min": amount_min, "amount_max": amount_max,
            },
            "has_active_filters": any([merchants, descriptions, category_id, start_date, end_date, amount_min, amount_max]),
        }

        if request.htmx and request.GET.get("page"):
            table_html = render_to_string("transactions/transactions_page.html#transaction-rows", context, request=request)
            query_count_html = render_to_string("transactions/transactions_page.html#query-count", context, request=request)
            return HttpResponse(table_html + query_count_html)
        elif request.htmx and not request.htmx.boosted:
            table_html = render_to_string("transactions/transactions_page.html#transactions-table", context, request=request)
            query_count_html = render_to_string("transactions/transactions_page.html#query-count", context, request=request)
            return HttpResponse(table_html + query_count_html)
        else:
            return render(request, "transactions/transactions_page.html", context)

    def retrieve(self, request, pk):
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "transactions/categorize_form.html", {"transaction": transaction, "categories": categories})

    def update(self, request, pk):
        data = QueryDict(request.body)
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        category_id = data.get("category")
        if category_id:
            transaction.category_id = cast(int, category_id)
            transaction.save()
            _create_category_rule_from_search(request, category_id, request.user)

        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(
            request, "transactions/transactions_page.html#transaction-row",
            {"transaction": transaction, "categories": categories},
        )

    def destroy(self, request, pk):
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        transaction.delete()
        return HttpResponse()

    @action(detail=False, methods=["get", "post"])
    def upload(self, request):
        if request.method == "POST":
            if "csv_file" not in request.FILES:
                return render(request, "transactions/upload.html", {"error": "No file uploaded"})

            csv_file = request.FILES["csv_file"]
            bank_type = request.POST.get("bank_type", "").strip()

            if not csv_file.name.lower().endswith(".csv"):
                return render(request, "form_error.html", {"message": "Please upload a CSV file."}, status=400)
            if csv_file.size > 5 * 1024 * 1024:
                return render(request, "form_error.html", {"message": "File size must be less than 5MB."}, status=400)
            if not bank_type:
                return render(request, "form_error.html", {"message": "Please select a bank type."}, status=400)

            try:
                parser_class = get_parser_class(bank_type)
                if not parser_class:
                    return render(
                        request, "form_error.html",
                        {"message": "Invalid bank type selected. Supported formats: Citi, Capital One, Bank of America."},
                        status=400,
                    )

                parser = parser_class()
                transactions_data = parser.parse(csv_file)

                if not transactions_data:
                    return render(request, "form_error.html", {"message": "No transactions found in CSV."}, status=400)

                categorizer = TransactionCategorizer(request.user)
                created_count = 0
                skipped_count = 0
                transactions_to_create = []

                for trans_data in transactions_data:
                    trans_hash = BaseCSVParser.generate_transaction_hash(
                        request.user.id, trans_data["date"], trans_data["description"], trans_data["amount"]
                    )
                    if Transaction.objects.filter(user=request.user, transaction_hash=trans_hash).exists():
                        skipped_count += 1
                        continue

                    category = categorizer.categorize(trans_data["merchant"], trans_data["description"])
                    transactions_to_create.append(Transaction(
                        user=request.user,
                        date=trans_data["date"],
                        description=trans_data["description"],
                        merchant=trans_data["merchant"],
                        amount=trans_data["amount"],
                        category=category,
                        transaction_hash=trans_hash,
                        original_data=trans_data["original_data"],
                        source=parser.BANK_NAME,
                    ))

                if transactions_to_create:
                    Transaction.objects.bulk_create(transactions_to_create)
                    created_count = len(transactions_to_create)

                logger.info(
                    "User %s uploaded CSV: %s transactions created, %s skipped",
                    request.user.username, created_count, skipped_count,
                )
                return render(request, "transactions/upload_summary.html", {
                    "success": True, "created_count": created_count,
                    "skipped_count": skipped_count, "bank": parser.BANK_NAME,
                })

            except Exception as e:
                logger.error("Error processing CSV upload: %s", str(e), exc_info=True)
                return render(request, "form_error.html", {"message": f"Error processing CSV: {str(e)}."}, status=500)

        return render(request, "transactions/upload.html")

    @action(detail=False, methods=["post"], url_path="bulk-categorize")
    def bulk_categorize(self, request):
        transaction_ids = request.POST.get("transaction_ids", "").split(",")
        category_id = request.POST.get("category_id")

        if not transaction_ids or not category_id:
            return JsonResponse({"success": False, "error": "Missing required fields"}, status=400)

        category = get_object_or_404(Category, id=category_id)
        updated_count = Transaction.objects.filter(id__in=transaction_ids, user=request.user).update(category_id=category_id)
        _create_category_rule_from_search(request, category_id, request.user)

        logger.info("user %s bulk categorized %s transactions to category %s", request.user.id, updated_count, category.name)

        res = HttpResponse()
        res.headers["HX-Trigger"] = "reload-transactions"
        return res

    @action(detail=False, methods=["get"], url_path=r"filter-options/(?P<filter_type>[^/.]+)")
    def filter_options(self, request, filter_type):
        if filter_type == "merchants":
            values = list(
                Transaction.objects.filter(user=request.user)
                .values_list("merchant", flat=True)
                .distinct().order_by("merchant")
            )
            values = [v for v in values if v]
            selected = [m for m in request.GET.get("merchants", "").split(",") if m]
        elif filter_type == "descriptions":
            values = list(
                Transaction.objects.filter(user=request.user)
                .values_list("description", flat=True)
                .distinct().order_by("description")
            )
            values = [v for v in values if v]
            selected = [d for d in request.GET.get("descriptions", "").split(",") if d]
        else:
            return JsonResponse({"error": "Invalid filter type"}, status=400)

        if not selected:
            selected = values

        return render(request, "transactions/filter_checkbox_list.html", {
            "items": values, "selected_items": selected, "filter_type": filter_type,
        })

    @action(detail=True, methods=["post"], url_path="toggle-anomaly")
    def toggle_anomaly(self, request, pk):
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        transaction.anomaly = not transaction.anomaly
        transaction.save()
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(
            request, "transactions/transactions_page.html#transaction-row",
            {"transaction": transaction, "categories": categories},
        )

    @action(detail=True, methods=["get"], url_path=r"token-selection/(?P<category_id>\d+)")
    def token_selection(self, request, pk, category_id):
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        get_object_or_404(Category, id=category_id, user=request.user)
        tokens = [token.strip() for token in transaction.description.split() if token.strip()]
        return render(request, "transactions/token_selection_dialog.html", {
            "transaction": transaction, "category_id": category_id, "tokens": tokens,
        })

    @action(detail=True, methods=["post"], url_path="create-rule")
    def create_rule(self, request, pk):
        transaction = get_object_or_404(Transaction, id=pk, user=request.user)
        token = request.POST.get("token", "").strip()
        category_id = request.POST.get("category_id")

        if not token or not category_id:
            return JsonResponse({"success": False, "error": "Token and category are required"}, status=400)

        category = get_object_or_404(Category, id=category_id, user=request.user)

        existing_rule = CategoryRule.objects.filter(user=request.user, keyword__iexact=token).first()
        if not existing_rule:
            CategoryRule.objects.create(
                user=request.user, keyword=token, category=category, is_default=False, priority=0,
            )
            logger.info("User %s created CategoryRule from token: '%s' → %s", request.user.username, token, category.name)

        transaction.category = category
        transaction.save()

        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(
            request, "transactions/transactions_page.html#transaction-row",
            {"transaction": transaction, "categories": categories},
        )


class CategoryViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "transactions/manage_categories.html", {"categories": categories})

    def create(self, request):
        category_name = request.POST.get("name", "").strip()
        inline = "inline" in request.GET

        if not category_name:
            return JsonResponse({"success": False, "error": "Category name is required"}, status=400)
        if len(category_name) > 100:
            return JsonResponse({"success": False, "error": "Category name must be 100 characters or less"}, status=400)

        existing = Category.objects.filter(user=request.user, name=category_name).first()
        if existing:
            return JsonResponse({"success": False, "error": "You already have a category with this name"}, status=400)

        category = Category(name=category_name, user=request.user, is_default=False, color=get_random_color())
        category.save()

        logger.info("User %s created custom category '%s'", request.user.username, category.name)

        if inline:
            return render(request, "transactions/manage_categories.html#category-item", {"category": category})

        res = HttpResponse()
        res.headers["HX-Refresh"] = "true"
        return res

    def update(self, request, pk):
        category = get_object_or_404(Category, id=pk, user=request.user)
        category.name = request.POST.get("name", "").strip()
        category.save()
        return HttpResponse()

    def destroy(self, request, pk):
        category = get_object_or_404(Category, id=pk, user=request.user)
        category.delete()
        return HttpResponse()

    @action(detail=False, methods=["get"])
    def new(self, request):
        return render(request, "transactions/new_category_dialog.html")
