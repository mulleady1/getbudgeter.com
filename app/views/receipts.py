import logging
from decimal import Decimal

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from ..categorization import TransactionCategorizer
from ..models import Category, Receipt, ReceiptItem
from ..receipt_ocr import ReceiptOCRProcessor

logger = logging.getLogger(__name__)


class ReceiptListView(LoginRequiredMixin, View):
    def get(self, request):
        # Get filter parameters
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        search_query = request.GET.get("q", "").strip()
        page = int(request.GET.get("page", "1"))

        # Pagination settings
        page_size = 50
        offset = (page - 1) * page_size

        # Base queryset
        receipts = Receipt.objects.filter(user=request.user).prefetch_related("items").order_by("-date", "-id")

        # Apply filters
        if start_date:
            receipts = receipts.filter(date__gte=start_date)
        if end_date:
            receipts = receipts.filter(date__lte=end_date)

        # Apply search filter
        if search_query:
            receipts = receipts.filter(
                Q(merchant__icontains=search_query) | Q(total__icontains=search_query) | Q(date__icontains=search_query)
            )

        # Get total count before limiting
        total_count = receipts.count()
        paginated_receipts = receipts[offset : offset + page_size]
        has_more = total_count > offset + page_size

        context = {
            "receipts": paginated_receipts,
            "start_date": start_date,
            "end_date": end_date,
            "search_query": search_query,
            "total_count": total_count,
            "showing_count": min(offset + len(paginated_receipts), total_count),
            "page": page,
            "has_more": has_more,
        }

        # Check if this is an infinite scroll request
        if request.htmx and request.GET.get("page"):
            return render(request, "receipts/receipts_page.html#receipt-rows", context)
        else:
            return render(request, "receipts/receipts_page.html", context)


class ReceiptUploadView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "receipts/upload.html")

    def post(self, request):
        if "receipt_image" not in request.FILES:
            context = {"error": "No image uploaded"}
            return render(request, "receipts/upload.html", context)

        image_file = request.FILES["receipt_image"]

        # Validate file type
        allowed_extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"]
        if not any(image_file.name.lower().endswith(ext) for ext in allowed_extensions):
            context = {"error": "Please upload a valid image file (JPG, PNG, GIF, BMP, TIFF)"}
            return render(request, "receipts/upload.html", context)

        # Validate file size (10MB max)
        if image_file.size > 10 * 1024 * 1024:
            context = {"error": "File size must be less than 10MB"}
            return render(request, "receipts/upload.html", context)

        try:
            # Create initial receipt object to save the image
            receipt = Receipt(user=request.user)
            receipt.image = image_file
            receipt.save()

            # Process the image with OCR
            ocr_processor = ReceiptOCRProcessor()
            ocr_data = ocr_processor.process_receipt(receipt.image.path)

            # Update receipt with OCR data
            receipt.raw_ocr_text = ocr_data["raw_text"]
            receipt.merchant = ocr_data["merchant"]
            receipt.date = ocr_data["date"]
            receipt.total = ocr_data["total"]
            receipt.save()

            # Create receipt items
            categorizer = TransactionCategorizer(request.user)
            for item_data in ocr_data["items"]:
                # Try to categorize the item
                category = categorizer.categorize(
                    merchant=ocr_data["merchant"], description=item_data["description"]
                )

                ReceiptItem.objects.create(
                    receipt=receipt,
                    description=item_data["description"],
                    amount=item_data["amount"],
                    category=category,
                )

            logger.info(
                "User %s uploaded receipt: %s items extracted, total $%s",
                request.user.username,
                len(ocr_data["items"]),
                receipt.total,
            )

            context = {
                "success": True,
                "receipt": receipt,
                "items_count": len(ocr_data["items"]),
            }

            return render(request, "receipts/upload_summary.html", context)

        except Exception as e:
            logger.error("Error processing receipt upload: %s", str(e), exc_info=True)
            context = {"error": f"Error processing receipt: {str(e)}"}
            return render(request, "receipts/upload.html", context)


class ReceiptDetailView(LoginRequiredMixin, View):
    def get(self, request, receipt_id):
        receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
        items = receipt.items.all()
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "receipts/receipt_detail.html", {"receipt": receipt, "items": items, "categories": categories})

    def delete(self, request, receipt_id):
        receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
        receipt.delete()
        return HttpResponse()


@login_required
@require_http_methods(["PUT"])
def update_receipt_item_category(request, item_id):
    """Update the category of a receipt item"""
    from django.http import QueryDict

    item = get_object_or_404(ReceiptItem, id=item_id, receipt__user=request.user)
    data = QueryDict(request.body)
    category_id = data.get("category")

    if category_id:
        item.category_id = int(category_id)
        item.save()

    categories = Category.objects.filter(user=request.user).order_by("name")
    return render(request, "receipts/receipt_detail.html#item-row", {"item": item, "categories": categories})
