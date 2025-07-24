import logging
from datetime import datetime, timedelta
from urllib.parse import urlparse, parse_qs
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse, QueryDict
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.views.generic import View
from .models import Bill

logger = logging.getLogger(__name__)


def get_month_from_url(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    try:
        month_str = query_params.get("month")[0]  # type: ignore
        month = datetime.strptime(month_str, "%Y-%m").date()
    except:  # pylint: disable=bare-except
        month = datetime.now().replace(day=1)
    return month


def home(request):
    if request.user.is_authenticated:
        return redirect("bills")
    return redirect("login")


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
        return redirect("bills")

    return render(request, "app/signup.html")


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("bills")
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

        return render(request, template_name, context)

    def post(self, request):
        name = request.POST.get("name")
        amount = request.POST.get("amount")
        link = request.POST.get("link")
        month = get_month_from_url(request.htmx.current_url)

        bill = Bill.objects.create(
            user=request.user, name=name, amount=amount, link=link, month=month
        )

        bills = Bill.objects.filter(user=request.user, month=bill.month)

        return render(request, "bills/bill_list.html", {"bills": bills})


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
        bill.month = datetime.strptime(str(data.get("month")), "%Y-%m").date()
        bill.save()
        bills = Bill.objects.filter(user=request.user, month=bill.month)
        return render(request, "bills/bill_list.html", {"bills": bills})

    def delete(self, request, bill_id):
        bill = get_object_or_404(Bill, id=bill_id, user=request.user)
        bill.delete()
        return HttpResponse()


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
    return render(request, "bills/bill_list_item.html", {"bill": bill})


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
                month=target_month,
            )
            new_bills.append(bill)

        logger.info("copied %s bills for %s", len(new_bills), target_month)
        return render(request, "bills/bill_list.html", {"bills": new_bills})
