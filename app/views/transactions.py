import logging

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from ..categorization import TransactionCategorizer
from ..csv_parsers.base import BaseCSVParser
from ..models import Category, Transaction
from .utils import get_parser_class

logger = logging.getLogger(__name__)


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

        # Base queryset
        transactions = Transaction.objects.filter(user=request.user).select_related("category")

        # Apply filters
        if start_date:
            transactions = transactions.filter(date__gte=start_date)
        if end_date:
            transactions = transactions.filter(date__lte=end_date)
        if category_id:
            transactions = transactions.filter(category_id=category_id)

        # Get categories for filter dropdown
        categories = Category.objects.filter(user=None, is_default=True)

        context = {
            "transactions": transactions[:100],  # Limit to 100 for now
            "categories": categories,
            "start_date": start_date,
            "end_date": end_date,
            "selected_category": category_id,
        }

        if request.htmx:
            template = "transactions/transaction_list.html"
        else:
            template = "transactions/transactions_page.html"

        return render(request, template, context)


class TransactionEditDeleteView(LoginRequiredMixin, View):
    def get(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        categories = Category.objects.filter(user=None, is_default=True)
        return render(
            request, "transactions/categorize_form.html", {"transaction": transaction, "categories": categories}
        )

    def put(self, request, transaction_id):
        data = QueryDict(request.body)
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        category_id = data.get("category")
        if category_id:
            transaction.category_id = category_id
            transaction.save()
        return HttpResponse()

    def delete(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
        transaction.delete()
        return HttpResponse()


@login_required
@require_http_methods(["POST"])
def categorize_transaction(request, transaction_id):
    transaction = get_object_or_404(Transaction, id=transaction_id, user=request.user)
    category_id = request.POST.get("category")

    if category_id:
        transaction.category_id = category_id
        transaction.save()

    return render(request, "transactions/transaction_list_item.html", {"transaction": transaction})
