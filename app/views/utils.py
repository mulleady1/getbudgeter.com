import logging
from datetime import datetime, timedelta
from urllib.parse import parse_qs, urlparse

from django.shortcuts import render
from django.utils import timezone

from ..csv_parsers.capital_one import CapitalOneParser
from ..csv_parsers.citi import CitiParser
from ..models import Bill

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
        template_name = "bills/bills_page.html#bills-list"
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


def get_parser_class(bank_type: str):
    """Map bank type string to parser class"""
    mapping = {
        "citi": CitiParser,
        "capital_one": CapitalOneParser,
    }
    return mapping.get(bank_type.lower())
