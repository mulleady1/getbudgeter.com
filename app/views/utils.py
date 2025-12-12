import logging
import random
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

    if request.htmx and not request.htmx.boosted:
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


def get_random_color():
    """Generate a random, visually pleasing color in hex format"""
    # Use HSL for better control over color appearance
    # Hue: 0-360 (full color spectrum)
    # Saturation: 50-80% (vibrant but not oversaturated)
    # Lightness: 50-70% (medium brightness for good contrast)
    hue = random.randint(0, 360)
    saturation = random.randint(50, 80)
    lightness = random.randint(50, 70)

    # Convert HSL to RGB
    h = hue / 360
    s = saturation / 100
    l = lightness / 100

    def hue_to_rgb(p, q, t):
        if t < 0:
            t += 1
        if t > 1:
            t -= 1
        if t < 1 / 6:
            return p + (q - p) * 6 * t
        if t < 1 / 2:
            return q
        if t < 2 / 3:
            return p + (q - p) * (2 / 3 - t) * 6
        return p

    if s == 0:
        r = g = b = l
    else:
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue_to_rgb(p, q, h + 1 / 3)
        g = hue_to_rgb(p, q, h)
        b = hue_to_rgb(p, q, h - 1 / 3)

    # Convert to hex
    return f"#{int(r * 255):02x}{int(g * 255):02x}{int(b * 255):02x}"
