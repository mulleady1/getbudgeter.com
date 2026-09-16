import logging
import os
import threading

from django.db import connection
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from django_htmx.http import trigger_client_event
from rest_framework.decorators import action

from ..models import Receipt, ReceiptItem
from ..services import (
    AIReceiptProcessor,
    ItemNormalizer,
    TransactionCategorizer,
    ReceiptOCRProcessor,
    alias_key,
    generate_thumbnail,
)
from ..taxonomy import PRODUCT_CATEGORIES, PRODUCT_CATEGORIES_AZ
from .base import LoginRequiredViewSet

logger = logging.getLogger(__name__)

ALLOWED_IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff")
MAX_IMAGE_BYTES = 5 * 1024 * 1024


def _validate_receipt_image(image_file):
    """Return a human-readable reason the upload is unusable, or None if it's fine."""
    if not image_file.name.lower().endswith(ALLOWED_IMAGE_EXTENSIONS):
        return "not a supported image format (JPG, PNG, GIF, BMP, TIFF)"
    if image_file.size > MAX_IMAGE_BYTES:
        return f"{image_file.size / 1024 / 1024:.1f}MB exceeds the 5MB limit"
    return None


def _create_receipt_items(receipt, user, items_data, merchant):
    """Create ReceiptItems for a processed receipt, normalized where possible.

    Normalization is best-effort: if the API call fails the items are still
    created, just with empty normalized fields for a later backfill to fill in.
    """
    try:
        normalized = ItemNormalizer(user).normalize([item["description"] for item in items_data])
    except Exception as e:
        logger.error("Item normalization unavailable for receipt %s: %s", receipt.id, e, exc_info=True)
        normalized = {}

    categorizer = TransactionCategorizer(user)
    created = []
    for item_data in items_data:
        match = normalized.get(item_data["description"])
        created.append(
            ReceiptItem.objects.create(
                receipt=receipt,
                description=item_data["description"],
                amount=item_data["amount"],
                category=categorizer.categorize(merchant=merchant, description=item_data["description"]),
                normalized_name=match.name if match else "",
                product_category=match.category if match else "",
            )
        )
    return created


def _apply_alias_to_items(user, description, match):
    """Push a corrected alias onto every item across the user's receipts that says the same thing.

    Matching goes through `alias_key`, not raw equality, because case and spacing
    drift between scans of the same product — the whole reason the alias table is
    keyed that way. Returns the number of rows updated.
    """
    key = alias_key(description)
    ids = [
        item_id
        for item_id, raw in ReceiptItem.objects.filter(receipt__user=user).values_list("id", "description")
        if alias_key(raw) == key
    ]
    if not ids:
        return 0
    return ReceiptItem.objects.filter(id__in=ids).update(
        normalized_name=match.name, product_category=match.category
    )


def _process_receipt_background(receipt_id):
    try:
        receipt = Receipt.objects.select_related("user").get(id=receipt_id)

        # Before the AI call, which takes seconds. The upload response renders its
        # grid cards off the original, so the sooner the thumbnail lands the sooner
        # the next poll swaps them onto it.
        generate_thumbnail(receipt)

        ai_processor = AIReceiptProcessor()
        data = ai_processor.process_receipt(receipt.image.path)

        receipt.merchant = data["merchant"]
        receipt.date = data["date"]
        receipt.total = data["total"]
        receipt.save()

        _create_receipt_items(receipt, receipt.user, data["items"], data["merchant"])

        # Flip to READY only once the items exist. Clients poll on this status and
        # render the item list the moment they see it, so an earlier flip shows an
        # empty receipt for however long normalization takes.
        receipt.status = Receipt.READY
        receipt.save(update_fields=["status"])

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
        return render(request, "receipts/receipt_detail.html", {
            "receipt": receipt, "items": items, "product_categories": PRODUCT_CATEGORIES_AZ,
            "item_count": items.count(),
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
            image_files = request.FILES.getlist("receipt_image")
            if not image_files:
                return render(request, "form_error.html", {"message": "No image uploaded"}, status=400)

            try:
                accepted, rejected = [], []
                for image_file in image_files:
                    reason = _validate_receipt_image(image_file)
                    if reason:
                        rejected.append({"name": image_file.name, "reason": reason})
                        continue

                    receipt = Receipt(user=request.user, status=Receipt.PENDING)
                    receipt.image = image_file
                    receipt.save()
                    threading.Thread(target=_process_receipt_background, args=(receipt.id,), daemon=True).start()
                    accepted.append(receipt)

                if not accepted:
                    message = "; ".join(f"{file['name']}: {file['reason']}" for file in rejected)
                    return render(request, "form_error.html", {"message": message}, status=400)

                logger.info(
                    "User %s uploaded %d receipt(s) (%d rejected), AI processing started in background",
                    request.user.username, len(accepted), len(rejected),
                )

                # Prepend in reverse so the grid ends up in the order the files were selected.
                grid_html = "".join(
                    render_to_string(
                        "receipts/receipts_page.html#receipt-grid-item-partial-prepend",
                        context={"receipt": receipt},
                        request=request,
                    )
                    for receipt in reversed(accepted)
                )

                if len(image_files) == 1:
                    receipt_detail_html = render_to_string(
                        "receipts/receipt_detail.html",
                        context={"receipt": accepted[0], "items": [],
                                 "product_categories": PRODUCT_CATEGORIES_AZ,
                                 "item_count": 0, "open": True},
                        request=request,
                    )
                    return HttpResponse(receipt_detail_html + grid_html)

                batch_html = render_to_string(
                    "receipts/upload_batch.html",
                    context={
                        "receipts": accepted,
                        "rejected": rejected,
                        "ids_param": ",".join(str(receipt.id) for receipt in accepted),
                        "pending": True,
                    },
                    request=request,
                )
                return HttpResponse(batch_html + grid_html)

            except Exception as e:
                logger.error("Error processing receipt upload: %s", str(e), exc_info=True)
                return render(request, "form_error.html", {"message": f"Error processing receipt: {str(e)}"}, status=500)

        return render(request, "receipts/upload.html")

    @action(detail=False, methods=["get"], url_path="batch-status")
    def batch_status(self, request):
        ids = [int(value) for value in request.GET.get("ids", "").split(",") if value.isdigit()]
        receipts_by_id = Receipt.objects.filter(id__in=ids, user=request.user).in_bulk()
        receipts = [receipts_by_id[receipt_id] for receipt_id in ids if receipt_id in receipts_by_id]

        html = render_to_string(
            "receipts/upload_batch.html#batch-list",
            context={
                "receipts": receipts,
                "ids_param": ",".join(str(receipt.id) for receipt in receipts),
                "pending": any(receipt.status == Receipt.PENDING for receipt in receipts),
            },
            request=request,
        )
        for receipt in receipts:
            if receipt.status != Receipt.PENDING:
                html += render_to_string(
                    "receipts/receipts_page.html#receipt-grid-item-partial",
                    context={"receipt": receipt},
                    request=request,
                )
        return HttpResponse(html)

    @action(detail=True, methods=["get"])
    def status(self, request, pk):
        receipt = get_object_or_404(Receipt, id=pk, user=request.user)
        items = receipt.items.all()

        html = render_to_string(
            "receipts/receipt_detail.html#dialog-content",
            context={"receipt": receipt, "items": items,
                     "product_categories": PRODUCT_CATEGORIES_AZ, "item_count": items.count()},
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
            items = _create_receipt_items(receipt, request.user, data["items"], data["merchant"])

            logger.info(
                "User %s processed receipt %s with %s: %d items extracted, total $%s",
                request.user.username, pk, processing_method, len(items), receipt.total,
            )

            dialog_html = render_to_string(
                "receipts/receipt_detail.html#dialog-content",
                context={"process_success": True, "processing_method": processing_method, "receipt": receipt,
                         "items": items, "product_categories": PRODUCT_CATEGORIES_AZ,
                         "item_count": len(items)},
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
        merchant = request.data.get("merchant", "").strip()
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

    @action(detail=False, methods=["get"], url_path="items-analysis")
    def items_analysis(self, request):
        """Receipt item analytics moved onto /analytics as its own view; keep the old
        URL working for anyone who bookmarked it."""
        query = request.GET.urlencode()
        return redirect(f"/analytics?view=items&{query}" if query else "/analytics?view=items")

    @action(detail=False, methods=["put"], url_path=r"items/(?P<item_id>\d+)/product-category")
    def item_product_category(self, request, item_id):
        """Recategorize a line item — and, with it, every other line that says the same thing.

        The edit is written as an ItemAlias override rather than onto the row, so
        the correction survives re-normalization and keeps the item grouped with
        its past and future purchases in analytics.
        """
        item = get_object_or_404(ReceiptItem, id=item_id, receipt__user=request.user)
        product_category = (request.data.get("product_category") or "").strip()

        if product_category in PRODUCT_CATEGORIES:
            match = ItemNormalizer(request.user).set_override(
                item.description, item.display_name, product_category
            )
            _apply_alias_to_items(request.user, item.description, match)
            item.refresh_from_db()
        else:
            logger.warning("Ignoring unknown product category %r for item %s", product_category, item_id)

        return render(
            request,
            "receipts/receipt_detail.html#item-row",
            {"item": item, "product_categories": PRODUCT_CATEGORIES_AZ},
        )
