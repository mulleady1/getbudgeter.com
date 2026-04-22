import logging
from datetime import datetime, timedelta

from django.db.models import Max
from django.http import QueryDict
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import action

from ..models import Bill, BillLink
from .base import LoginRequiredViewSet
from .utils import get_bills, get_month_from_url

logger = logging.getLogger(__name__)


def _stats_context(user, month):
    bills = Bill.objects.filter(user=user, month=month)
    paid = sum(b.amount for b in bills if b.paid)
    total = sum(b.amount for b in bills)
    return {
        "paid": paid,
        "total": total,
        "income": user.profile.income,
        "remaining": user.profile.income - total,
    }


class BillViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        return get_bills(request)

    def create(self, request):
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
        return render(request, "bills/bills_page.html#bills-list", {"bills": bills})

    def retrieve(self, request, pk):
        bill = get_object_or_404(Bill, id=pk, user=request.user)
        return render(request, "bills/bill_form.html", {"bill": bill})

    def update(self, request, pk):
        data = QueryDict(request.body)
        bill = get_object_or_404(Bill, id=pk, user=request.user)
        bill.name = data.get("name")
        bill.amount = data.get("amount")
        bill.link = data.get("link")
        bill.autopay = data.get("autopay") == "on"
        bill.save()
        bills = Bill.objects.filter(user=request.user, month=bill.month)
        return render(request, "bills/bills_page.html#bills-list", {"bills": bills})

    def destroy(self, request, pk):
        bill = get_object_or_404(Bill, id=pk, user=request.user)
        month = bill.month
        bill.delete()
        return render(request, "bills/bills_page.html#bills-stats-update", _stats_context(request.user, month))

    @action(detail=False, methods=["get"])
    def new(self, request):
        bill = Bill(user=request.user)
        return render(request, "bills/bill_form.html", {"bill": bill})

    @action(detail=False, methods=["get", "post"])
    def copy(self, request):
        if request.method == "POST":
            source_month = datetime.strptime(request.POST.get("source_month"), "%Y-%m").date()
            target_month = datetime.strptime(request.POST.get("target_month"), "%Y-%m").date()

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
            return render(request, "bills/bills_page.html#bills-list", {"bills": new_bills})

        target_month = get_month_from_url(request.htmx.current_url)
        source_month = (target_month - timedelta(days=1)).replace(day=1)
        return render(request, "bills/copy_bills.html", {
            "source_month": source_month,
            "target_month": target_month,
        })

    @action(detail=False, methods=["get"])
    def stats(self, request):
        month = get_month_from_url(request.htmx.current_url)
        return render(request, "bills/bills_page.html#bills-stats", _stats_context(request.user, month))

    @action(detail=False, methods=["get", "post"])
    def income(self, request):
        if request.method == "POST":
            income = int(request.POST.get("income"))
            request.user.profile.income = income
            request.user.profile.save()
            month = get_month_from_url(request.htmx.current_url)
            return render(request, "bills/bills_page.html#bills-stats-update", _stats_context(request.user, month))
        return render(request, "bills/income_form.html", {"income": request.user.profile.income})

    @action(detail=True, methods=["patch"])
    def amount(self, request, pk):
        data = QueryDict(request.body)
        bill = get_object_or_404(Bill, id=pk, user=request.user)
        bill.amount = data.get("amount")
        bill.save()
        return render(request, "bills/bills_page.html#bill-amount-with-stats", {"bill": bill, **_stats_context(request.user, bill.month)})

    @action(detail=True, methods=["post"])
    def toggle(self, request, pk):
        bill = get_object_or_404(Bill, id=pk, user=request.user)
        bill.paid = not bill.paid
        bill.save()
        return render(request, "bills/bills_page.html#bill-item-with-stats", {"bill": bill, **_stats_context(request.user, bill.month)})


class BillLinkViewSet(LoginRequiredViewSet):
    lookup_value_regex = r"\d+"

    def list(self, request):
        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links})

    def create(self, request):
        label = request.POST.get("label")
        url = request.POST.get("url")
        max_order = BillLink.objects.filter(user=request.user).aggregate(Max("sort_order"))["sort_order__max"]
        next_order = (max_order or 0) + 1
        BillLink.objects.create(user=request.user, label=label, url=url, sort_order=next_order)
        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links})

    def retrieve(self, request, pk):
        link = get_object_or_404(BillLink, id=pk, user=request.user)
        return render(request, "bills/bill_link_form.html", {"link": link})

    def update(self, request, pk):
        data = QueryDict(request.body)
        link = get_object_or_404(BillLink, id=pk, user=request.user)
        link.label = data.get("label")
        link.url = data.get("url")
        link.save()
        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links, "edit_mode": True})

    def destroy(self, request, pk):
        link = get_object_or_404(BillLink, id=pk, user=request.user)
        link.delete()
        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links, "edit_mode": True})

    @action(detail=False, methods=["get"])
    def new(self, request):
        link = BillLink(user=request.user)
        link.url = "https://"
        return render(request, "bills/bill_link_form.html", {"link": link})

    @action(detail=True, methods=["post"], url_path=r"reorder/(?P<direction>[^/.]+)")
    def reorder(self, request, pk, direction):
        link = get_object_or_404(BillLink, id=pk, user=request.user)
        all_links = list(BillLink.objects.filter(user=request.user).order_by("sort_order"))
        current_index = all_links.index(link)

        if direction == "up" and current_index > 0:
            other_link = all_links[current_index - 1]
            link.sort_order, other_link.sort_order = other_link.sort_order, link.sort_order
            link.save()
            other_link.save()
        elif direction == "down" and current_index < len(all_links) - 1:
            other_link = all_links[current_index + 1]
            link.sort_order, other_link.sort_order = other_link.sort_order, link.sort_order
            link.save()
            other_link.save()

        links = BillLink.objects.filter(user=request.user)
        return render(request, "bills/bill_links.html", {"links": links, "edit_mode": True})
