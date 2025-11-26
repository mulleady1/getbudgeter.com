import logging
from datetime import datetime, timedelta
from urllib.parse import parse_qs, urlparse

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.http import HttpResponse, QueryDict
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from .models import Bill, BillLink

logger = logging.getLogger(__name__)


def get_month_from_url(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    try:
        month_str = query_params.get("month")[0]  # type: ignore
        month = datetime.strptime(month_str, "%Y-%m").date()
    except:  # noqa
        month = datetime.now().replace(day=1)
    return month


def get_bills(request):
    # Get the selected month from the request, default to current month
    selected_month = request.GET.get("month")
    if selected_month:
        selected_month = datetime.strptime(selected_month, "%Y-%m").date()
    else:
        selected_month = datetime.now().replace(day=1).date()

    # Filter bills for the selected month
    bills = Bill.objects.filter(user=request.user, month=selected_month)

    context = {
        "bills": bills,
        "selected_month": selected_month,
    }

    if request.htmx:
        template_name = "bills/bill_list.html"
    else:
        template_name = "bills/bills_page.html"

    res = render(request, template_name, context)

    # Check if session will expire within a month and regenerate if needed
    session_expiry = request.session.get_expiry_date()
    one_month_from_now = timezone.now() + timedelta(days=30)
    if session_expiry and session_expiry < one_month_from_now:
        request.session.set_expiry(60 * 60 * 24 * 365)  # Reset to 1 year
        logger.info("session close to expire, added 1 year")

    return res


def home(request):
    if not request.user.is_authenticated:
        return redirect("login")

    return get_bills(request)


def signup_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # Validate input
        if not email or not password:
            return render(
                request,
                "app/signup.html",
                {
                    "error": "All fields are required.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                },
            )

        if password != confirm_password:
            return render(
                request,
                "app/signup.html",
                {
                    "error": "Passwords do not match.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                },
            )

        if User.objects.filter(email=email).exists():
            return render(
                request,
                "app/signup.html",
                {
                    "error": "Email already registered.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                },
            )

        # Create user
        user = User.objects.create_user(username=email, email=email, password=password)
        login(request, user)
        return redirect("/")

    return render(request, "app/signup.html")


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(
                request,
                "app/login.html",
                {
                    "email": email,
                    "password": password,
                    "error": "Invalid email or password.",
                },
            )
    return render(request, "app/login.html", {"email": "", "password": ""})


def logout_view(request):
    logout(request)
    return redirect("home")


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
            user=request.user, name=name, amount=amount, link=link, autopay=autopay, month=month
        )

        bills = Bill.objects.filter(user=request.user, month=bill.month)

        response = render(request, "bills/bill_list.html", {"bills": bills})
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
        response = render(request, "bills/bill_list.html", {"bills": bills})
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
    response = render(request, "bills/bill_list_item.html", {"bill": bill})
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
        source_month = datetime.strptime(
            request.POST.get("source_month"), "%Y-%m"
        ).date()

        target_month = datetime.strptime(
            request.POST.get("target_month"), "%Y-%m"
        ).date()

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
        response = render(request, "bills/bill_list.html", {"bills": new_bills})
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

        BillLink.objects.create(user=request.user, label=label, url=url)

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
    return render(request, "bills/bill_link_form.html", {"link": link})
