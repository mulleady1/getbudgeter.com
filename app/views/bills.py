import logging
from datetime import datetime, timedelta

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Max
from django.http import HttpResponse, QueryDict
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from ..models import Bill, BillLink
from .utils import get_bills, get_month_from_url

logger = logging.getLogger(__name__)


class BillListCreateView(LoginRequiredMixin, View):
    def get(self, request):
        return get_bills(request)

    def post(self, request):
        name = request.POST.get("name")
        amount = request.POST.get("amount")
        link = request.POST.get("link")
        autopay = request.POST.get("autopay") == "on"
        month = get_month_from_url(request.htmx.current_url)

        bill = Bill.objects.create(
            user=request.user,
            name=name,
            amount=amount,
            link=link,
            autopay=autopay,
            month=month,
        )

        bills = Bill.objects.filter(user=request.user, month=bill.month)

        response = render(request, "bills/bills_page.html#bills-list", {"bills": bills})
        response["HX-Trigger"] = "bills-changed"
        return response


class BillEditDeleteView(LoginRequiredMixin, View):
    def get(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id, user=request.user)
        return render(request, "bills/bill_form.html", {"bill": bill})

    def put(self, request, bill_id):
        data = QueryDict(request.body)
        bill = get_object_or_404(Bill, id=bill_id, user=request.user)
        bill.name = data.get("name")
        bill.amount = data.get("amount")
        bill.link = data.get("link")
        bill.autopay = data.get("autopay") == "on"
        bill.save()
        bills = Bill.objects.filter(user=request.user, month=bill.month)
        response = render(request, "bills/bills_page.html#bills-list", {"bills": bills})
        response["HX-Trigger"] = "bills-changed"
        return response

    def delete(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id, user=request.user)
        bill.delete()
        response = HttpResponse()
        response["HX-Trigger"] = "bills-changed"
        return response


@login_required
@require_http_methods(["GET"])
def new_bill(request):
    bill = Bill(user=request.user)
    return render(request, "bills/bill_form.html", {"bill": bill})


@login_required
@require_http_methods(["POST"])
def toggle_paid(request, bill_id):
    bill = get_object_or_404(Bill, id=bill_id, user=request.user)
    bill.paid = not bill.paid
    bill.save()
    response = render(request, "bills/bills_page.html#bill-item", {"bill": bill})
    response["HX-Trigger"] = "bills-changed"
    return response


class CopyBillsView(LoginRequiredMixin, View):
    def get(self, request):
        target_month = get_month_from_url(request.htmx.current_url)
        source_month = (target_month - timedelta(days=1)).replace(day=1)

        context = {
            "source_month": source_month,
            "target_month": target_month,
        }

        template_name = "bills/copy_bills.html"
        return render(request, template_name, context)

    def post(self, request):
        source_month = datetime.strptime(request.POST.get("source_month"), "%Y-%m").date()

        target_month = datetime.strptime(request.POST.get("target_month"), "%Y-%m").date()

        # Delete all bills for the target month
        count, _ = Bill.objects.filter(user=request.user, month=target_month).delete()
        logger.info("deleted %s bills for %s", count, target_month)

        old_bills = Bill.objects.filter(user=request.user, month=source_month)
        new_bills = []
        for old_bill in old_bills:
            bill = Bill.objects.create(
                user=request.user,
                name=old_bill.name,
                amount=old_bill.amount,
                link=old_bill.link,
                autopay=old_bill.autopay,
                month=target_month,
            )
            new_bills.append(bill)

        logger.info("copied %s bills for %s", len(new_bills), target_month)
        response = render(request, "bills/bills_page.html#bills-list", {"bills": new_bills})
        response["HX-Trigger"] = "bills-changed"
        return response


class AddIncomeView(LoginRequiredMixin, View):
    def get(self, request):
        template_name = "bills/income_form.html"
        context = {
            "income": request.user.profile.income,
        }
        return render(request, template_name, context)

    def post(self, request):
        income = int(request.POST.get("income"))
        request.user.profile.income = income
        request.user.profile.save()
        response = HttpResponse(status=200)
        response["HX-Trigger"] = "bills-changed"
        return response


@login_required
@require_http_methods(["GET"])
def bill_stats(request):
    month = get_month_from_url(request.htmx.current_url)
    bills = Bill.objects.filter(user=request.user, month=month)
    paid = sum(bill.amount for bill in bills if bill.paid)
    total = sum(bill.amount for bill in bills)
    context = {
        "paid": paid,
        "total": total,
        "income": request.user.profile.income,
        "remaining": request.user.profile.income - total,
    }

    return render(request, "bills/bill_stats.html", context)


class BillLinksView(LoginRequiredMixin, View):
    def get(self, request):
        links = BillLink.objects.filter(user=request.user)
        context = {
            "links": links,
        }
        return render(request, "bills/bill_links.html", context)

    def post(self, request):
        label = request.POST.get("label")
        url = request.POST.get("url")

        # Get the max sort_order for this user and add 1
        max_order = BillLink.objects.filter(user=request.user).aggregate(Max("sort_order"))["sort_order__max"]
        next_order = (max_order or 0) + 1

        BillLink.objects.create(user=request.user, label=label, url=url, sort_order=next_order)

        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links})


class BillLinkEditDeleteView(LoginRequiredMixin, View):
    def get(self, request, link_id):
        link = get_object_or_404(BillLink, id=link_id, user=request.user)
        return render(request, "bills/bill_link_form.html", {"link": link})

    def put(self, request, link_id):
        data = QueryDict(request.body)
        link = get_object_or_404(BillLink, id=link_id, user=request.user)
        link.label = data.get("label")
        link.url = data.get("url")
        link.save()
        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links})

    def delete(self, request, link_id):
        link = get_object_or_404(BillLink, id=link_id, user=request.user)
        link.delete()
        return HttpResponse()


@login_required
@require_http_methods(["GET"])
def new_bill_link(request):
    link = BillLink(user=request.user)
    link.url = "https://"
    return render(request, "bills/bill_link_form.html", {"link": link})


@login_required
@require_http_methods(["POST"])
def reorder_bill_link(request, link_id, direction):
    """Move a bill link up or down in the sort order"""
    link = get_object_or_404(BillLink, id=link_id, user=request.user)
    all_links = list(BillLink.objects.filter(user=request.user).order_by("sort_order"))

    current_index = all_links.index(link)

    if direction == "up" and current_index > 0:
        # Swap with previous link
        other_link = all_links[current_index - 1]
        link.sort_order, other_link.sort_order = other_link.sort_order, link.sort_order
        link.save()
        other_link.save()
    elif direction == "down" and current_index < len(all_links) - 1:
        # Swap with next link
        other_link = all_links[current_index + 1]
        link.sort_order, other_link.sort_order = other_link.sort_order, link.sort_order
        link.save()
        other_link.save()

    links = BillLink.objects.filter(user=request.user)
    return render(request, "bills/bill_links.html", {"links": links})
