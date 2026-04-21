import logging
import os
import threading

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import connection
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template.loader import render_to_string
from django.views.decorators.http import require_http_methods
from django.views.generic import View
from django_htmx.http import trigger_client_event

from ..ai_receipt_processor import AIReceiptProcessor
from ..categorization import TransactionCategorizer
from ..models import Category, Receipt, ReceiptItem
from ..receipt_ocr import ReceiptOCRProcessor

logger = logging.getLogger(__name__)


def _process_receipt_background(receipt_id):
    """Run AI receipt processing in a background thread."""
    try:
        receipt = Receipt.objects.select_related("user").get(id=receipt_id)
        ai_processor = AIReceiptProcessor()
        data = ai_processor.process_receipt(receipt.image.path)

        receipt.merchant = data["merchant"]
        receipt.date = data["date"]
        receipt.total = data["total"]
        receipt.status = Receipt.READY
        receipt.save()

        categorizer = TransactionCategorizer(receipt.user)
        for item_data in data["items"]:
            category = categorizer.categorize(merchant=data["merchant"], description=item_data["description"])
            ReceiptItem.objects.create(
                receipt=receipt,
                description=item_data["description"],
                amount=item_data["amount"],
                category=category,
            )

        logger.info(
            "Background processing complete for receipt %s: %d items, total $%s",
            receipt_id,
            len(data["items"]),
            receipt.total,
        )
    except Exception as e:
        logger.error("Background receipt processing failed for receipt %s: %s", receipt_id, e, exc_info=True)
        Receipt.objects.filter(id=receipt_id).update(status=Receipt.FAILED)
    finally:
        connection.close()


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
        if request.htmx and (request.GET.get("page") or not request.htmx.boosted):
            return render(request, "receipts/receipts_page.html#receipt-grid-items", context)
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
            return render(
                request,
                "form_error.html",
                {"message": "Please upload a valid image file (JPG, PNG, GIF, BMP, TIFF)"},
                status=400,
            )

        # Validate file size (5MB max — Anthropic API limit)
        if image_file.size > 5 * 1024 * 1024:
            return render(request, "form_error.html", {"message": "File size must be less than 5MB"}, status=400)

        try:
            # Save the image and kick off background AI processing
            receipt = Receipt(user=request.user, status=Receipt.PENDING)
            receipt.image = image_file
            receipt.save()

            threading.Thread(target=_process_receipt_background, args=(receipt.id,), daemon=True).start()

            logger.info(
                "User %s uploaded receipt %s, AI processing started in background", request.user.username, receipt.id
            )

            categories = Category.objects.filter(user=request.user).order_by("name")
            receipt_detail_html = render_to_string(
                "receipts/receipt_detail.html",
                context={"receipt": receipt, "items": [], "categories": categories, "item_count": 0, "open": True},
                request=request,
            )

            grid_item_html = render_to_string(
                "receipts/receipts_page.html#receipt-grid-item-partial-prepend",
                context={"receipt": receipt},
                request=request,
            )

            return HttpResponse(receipt_detail_html + grid_item_html)

        except Exception as e:
            logger.error("Error processing receipt upload: %s", str(e), exc_info=True)
            context = {"error": f"Error processing receipt: {str(e)}"}
            return render(request, "receipts/upload.html#error", context)


class ReceiptDetailView(LoginRequiredMixin, View):
    def get(self, request, receipt_id):
        receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
        items = receipt.items.all()
        item_count = items.count()
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(
            request,
            "receipts/receipt_detail.html",
            {"receipt": receipt, "items": items, "categories": categories, "item_count": item_count},
        )

    def delete(self, request, receipt_id):
        receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
        receipt.delete()
        res = HttpResponse()
        trigger_client_event(res, "reload-receipts")
        return res


@login_required
@require_http_methods(["GET"])
def receipt_status(request, receipt_id):
    """Polling endpoint — returns the dialog-content partial while AI is processing."""
    receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
    items = receipt.items.all()
    categories = Category.objects.filter(user=request.user).order_by("name")

    html = render_to_string(
        "receipts/receipt_detail.html#dialog-content",
        context={"receipt": receipt, "items": items, "categories": categories, "item_count": items.count()},
        request=request,
    )

    if receipt.status == Receipt.READY:
        grid_item_html = render_to_string(
            "receipts/receipts_page.html#receipt-grid-item-partial",
            context={"receipt": receipt},
            request=request,
        )
        html += grid_item_html

    return HttpResponse(html)


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


@login_required
@require_http_methods(["GET"])
def edit_receipt_merchant(request, receipt_id):
    """Show the merchant edit form"""
    receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
    return render(request, "receipts/receipt_detail.html#merchant-edit-form", {"receipt": receipt})


@login_required
@require_http_methods(["PUT"])
def update_receipt_merchant(request, receipt_id):
    """Update the merchant name of a receipt"""
    from django.http import QueryDict

    receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
    data = QueryDict(request.body)
    merchant = data.get("merchant", "").strip()

    receipt.merchant = merchant if merchant else None
    receipt.save()

    merchant_field_html = render_to_string(
        "receipts/receipt_detail.html#merchant-field", context={"receipt": receipt}, request=request
    )

    list_item_html = render_to_string(
        "receipts/receipts_page.html#receipt-grid-item-partial",
        context={"receipt": receipt},
        request=request,
    )

    return HttpResponse(merchant_field_html + list_item_html)


@login_required
@require_http_methods(["GET"])
def cancel_edit_merchant(request, receipt_id):
    """Cancel editing the merchant name"""
    receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)
    return render(request, "receipts/receipt_detail.html#merchant-field", {"receipt": receipt})


@login_required
@require_http_methods(["POST"])
def process_receipt_image(request, receipt_id):
    """Process a receipt image with either OCR or AI based on the type parameter"""
    receipt = get_object_or_404(Receipt, id=receipt_id, user=request.user)

    # Get the processing type from query parameters (default to 'ocr')
    processing_type = request.GET.get("type", "ocr")

    try:
        if processing_type == "ai":
            # Check if ANTHROPIC_API_KEY is configured
            if not os.getenv("ANTHROPIC_API_KEY"):
                return JsonResponse(
                    {
                        "success": False,
                        "error": "AI processing is not configured. Please add ANTHROPIC_API_KEY to your environment.",
                    },
                    status=500,
                )

            # Process the receipt with AI
            ai_processor = AIReceiptProcessor()
            data = ai_processor.process_receipt(receipt.image.path)
            processing_method = "AI"

        elif processing_type == "ocr":
            # Process the receipt with OCR
            ocr_processor = ReceiptOCRProcessor()
            data = ocr_processor.process_receipt(receipt.image.path)
            processing_method = "OCR"
        else:
            return JsonResponse(
                {"success": False, "error": f"Invalid processing type: {processing_type}"},
                status=400,
            )

        # Update receipt with processed data
        receipt.merchant = data["merchant"]
        receipt.date = data["date"]
        receipt.total = data["total"]
        if processing_type == "ocr":
            receipt.raw_ocr_text = data["raw_text"]
        receipt.save()

        # Delete existing items and create new ones
        receipt.items.all().delete()

        # Create new receipt items with categorization
        categorizer = TransactionCategorizer(request.user)
        for item_data in data["items"]:
            # Try to categorize the item
            category = categorizer.categorize(merchant=data["merchant"], description=item_data["description"])

            ReceiptItem.objects.create(
                receipt=receipt,
                description=item_data["description"],
                amount=item_data["amount"],
                category=category,
            )

        logger.info(
            "User %s processed receipt %s with %s: %d items extracted, total $%s",
            request.user.username,
            receipt_id,
            processing_method,
            len(data["items"]),
            receipt.total,
        )

        dialog_html = render_to_string(
            "receipts/receipt_detail.html#dialog-content",
            context={
                "process_success": True,
                "processing_method": processing_method,
                "receipt": receipt,
                "items": data["items"],
                "item_count": len(data["items"]),
            },
            request=request,
        )

        list_item_html = render_to_string(
            "receipts/receipts_page.html#receipt-grid-item-partial",
            context={"receipt": receipt},
            request=request,
        )

        return HttpResponse(dialog_html + list_item_html)

    except Exception as e:
        logger.error(
            "Error processing receipt %s with %s: %s", receipt_id, processing_type.upper(), str(e), exc_info=True
        )
        return JsonResponse({"success": False, "error": f"Error processing receipt: {str(e)}"}, status=500)
