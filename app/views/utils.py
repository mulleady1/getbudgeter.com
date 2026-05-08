import logging
import random
from datetime import datetime
from urllib.parse import parse_qs, urlparse

from ..csv_parsers.bofa import BofAParser
from ..csv_parsers.capital_one import CapitalOneParser
from ..csv_parsers.citi import CitiParser

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


def get_parser_class(bank_type: str):
    """Map bank type string to parser class"""
    mapping = {
        "bofa": BofAParser,
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
    l = lightness / 100  # noqa: E741

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
