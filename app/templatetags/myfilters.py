import os

from django import template

register = template.Library()


@register.filter
def basename(value):
    """Strip the directory portion off an uploaded file's stored path."""
    if not value:
        return ""
    return os.path.basename(str(value))


@register.filter
def currency(value):
    try:
        value = float(value)
    except (TypeError, ValueError):
        return value

    if value < 0:
        rv = f"-${abs(value):,.2f}"
    else:
        rv = f"${value:,.2f}"

    if rv.endswith(".00"):
        rv = rv[:-3]
    return rv


@register.filter
def startswith(value, arg):
    """Check if value starts with arg"""
    if value is None:
        return False
    return str(value).startswith(str(arg))
