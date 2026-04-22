import logging
import os
import threading

from django.db import connection
from django.db.models import Q
from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.template.loader import render_to_string
from django_htmx.http import trigger_client_event
from rest_framework.decorators import action

from ..ai_receipt_processor import AIReceiptProcessor
from ..categorization import TransactionCategorizer
from ..models import Category, Receipt, ReceiptItem
from ..receipt_ocr import ReceiptOCRProcessor
from .base import LoginRequiredViewSet

logger = logging.getLogger(__name__)


def _process_receipt_background(receipt_id):
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
                receipt=receipt, description=item_data["description"],
                amount=item_data["amount"], category=category,
            )

        logger.info(
            "Background processing complete for receipt %s: %d items, total $%s",
            receipt_id, len(data["items"]), receipt.total,
        )
    except Exception as e:
        logger.error("Background receipt processing failed for receipt %s: %s", receipt_id, e, exc_info=True)
        Receipt.objects.filter(id=receipt_id).update(status=Receipt.FAILED)
    finally:
        connection.close()


class ReceiptViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        search_query = request.GET.get("q", "").strip()
        page = int(request.GET.get("page", "1"))

        page_size = 50
        offset = (page - 1) * page_size

        receipts = Receipt.objects.filter(user=request.user).prefetch_related("items").order_by("-date", "-id")

        if start_date:
            receipts = receipts.filter(date__gte=start_date)
        if end_date:
            receipts = receipts.filter(date__lte=end_date)
        if search_query:
            receipts = receipts.filter(
                Q(merchant__icontains=search_query) | Q(total__icontains=search_query) | Q(date__icontains=search_query)
            )

        total_count = receipts.count()
        paginated_receipts = receipts[offset: offset + page_size]
        has_more = total_count > offset + page_size

        context = {
            "receipts": paginated_receipts,
            "start_date": start_date, "end_date": end_date,
            "search_query": search_query,
            "total_count": total_count,
            "showing_count": min(offset + len(paginated_receipts), total_count),
            "page": page, "has_more": has_more,
        }

        if request.htmx and (request.GET.get("page") or not request.htmx.boosted):
            return render(request, "receipts/receipts_page.html#receipt-grid-items", context)
        return render(request, "receipts/receipts_page.html", context)

    def retrieve(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        items = receipt.items.all()
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "receipts/receipt_detail.html", {
            "receipt": receipt, "items": items, "categories": categories, "item_count": items.count(),
        })

    def destroy(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        receipt.delete()
        res = HttpResponse()
        trigger_client_event(res, "reload-receipts")
        return res

    @action(detail=False, methods=["get", "post"])
    def upload(self, request):
        if request.method == "POST":
            if "receipt_image" not in request.FILES:
                return render(request, "form_error.html", {"message": "No image uploaded"}, status=400)

            image_file = request.FILES["receipt_image"]
            allowed_extensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"]
            if not any(image_file.name.lower().endswith(ext) for ext in allowed_extensions):
                return render(
                    request, "form_error.html",
                    {"message": "Please upload a valid image file (JPG, PNG, GIF, BMP, TIFF)"}, status=400,
                )
            if image_file.size > 5 * 1024 * 1024:
                return render(request, "form_error.html", {"message": "File size must be less than 5MB"}, status=400)

            try:
                receipt = Receipt(user=request.user, status=Receipt.PENDING)
                receipt.image = image_file
                receipt.save()

                threading.Thread(target=_process_receipt_background, args=(receipt.id,), daemon=True).start()
                logger.info("User %s uploaded receipt %s, AI processing started in background", request.user.username, receipt.id)

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
                return render(request, "form_error.html", {"message": f"Error processing receipt: {str(e)}"}, status=500)

        return render(request, "receipts/upload.html")

    @action(detail=True, methods=["get"])
    def status(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        items = receipt.items.all()
        categories = Category.objects.filter(user=request.user).order_by("name")

        html = render_to_string(
            "receipts/receipt_detail.html#dialog-content",
            context={"receipt": receipt, "items": items, "categories": categories, "item_count": items.count()},
            request=request,
        )
        if receipt.status == Receipt.READY:
            html += render_to_string(
                "receipts/receipts_page.html#receipt-grid-item-partial",
                context={"receipt": receipt},
                request=request,
            )
        return HttpResponse(html)

    @action(detail=True, methods=["post"], url_path="process-image")
    def process_image(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        processing_type = request.GET.get("type", "ocr")

        try:
            if processing_type == "ai":
                if not os.getenv("ANTHROPIC_API_KEY"):
                    return JsonResponse(
                        {"success": False, "error": "AI processing is not configured. Please add ANTHROPIC_API_KEY to your environment."},
                        status=500,
                    )
                data = AIReceiptProcessor().process_receipt(receipt.image.path)
                processing_method = "AI"
            elif processing_type == "ocr":
                data = ReceiptOCRProcessor().process_receipt(receipt.image.path)
                processing_method = "OCR"
            else:
                return JsonResponse({"success": False, "error": f"Invalid processing type: {processing_type}"}, status=400)

            receipt.merchant = data["merchant"]
            receipt.date = data["date"]
            receipt.total = data["total"]
            if processing_type == "ocr":
                receipt.raw_ocr_text = data["raw_text"]
            receipt.save()

            receipt.items.all().delete()
            categorizer = TransactionCategorizer(request.user)
            for item_data in data["items"]:
                ReceiptItem.objects.create(
                    receipt=receipt,
                    description=item_data["description"],
                    amount=item_data["amount"],
                    category=categorizer.categorize(merchant=data["merchant"], description=item_data["description"]),
                )

            logger.info(
                "User %s processed receipt %s with %s: %d items extracted, total $%s",
                request.user.username, pk, processing_method, len(data["items"]), receipt.total,
            )

            dialog_html = render_to_string(
                "receipts/receipt_detail.html#dialog-content",
                context={"process_success": True, "processing_method": processing_method, "receipt": receipt,
                         "items": data["items"], "item_count": len(data["items"])},
                request=request,
            )
            list_item_html = render_to_string(
                "receipts/receipts_page.html#receipt-grid-item-partial",
                context={"receipt": receipt},
                request=request,
            )
            return HttpResponse(dialog_html + list_item_html)

        except Exception as e:
            logger.error("Error processing receipt %s with %s: %s", pk, processing_type.upper(), str(e), exc_info=True)
            return JsonResponse({"success": False, "error": f"Error processing receipt: {str(e)}"}, status=500)

    @action(detail=True, methods=["get"], url_path="merchant/edit")
    def merchant_edit(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        return render(request, "receipts/receipt_detail.html#merchant-edit-form", {"receipt": receipt})

    @action(detail=True, methods=["put"], url_path="merchant")
    def merchant_update(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        data = QueryDict(request.body)
        merchant = data.get("merchant", "").strip()
        receipt.merchant = merchant if merchant else None
        receipt.save()

        merchant_field_html = render_to_string(
            "receipts/receipt_detail.html#merchant-field", context={"receipt": receipt}, request=request,
        )
        list_item_html = render_to_string(
            "receipts/receipts_page.html#receipt-grid-item-partial", context={"receipt": receipt}, request=request,
        )
        return HttpResponse(merchant_field_html + list_item_html)

    @action(detail=True, methods=["get"], url_path="merchant/cancel")
    def merchant_cancel(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        return render(request, "receipts/receipt_detail.html#merchant-field", {"receipt": receipt})

    @action(detail=False, methods=["put"], url_path=r"items/(?P<item_id>\d+)/category")
    def item_category(self, request, item_id):
        item = get_object_or_404(ReceiptItem, id=item_id, receipt__user=request.user)
        data = QueryDict(request.body)
        category_id = data.get("category")
        if category_id:
            item.category_id = int(category_id)
            item.save()
        categories = Category.objects.filter(user=request.user).order_by("name")
        return render(request, "receipts/receipt_detail.html#item-row", {"item": item, "categories": categories})
