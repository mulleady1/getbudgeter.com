from django import template

register = template.Library()


@register.filter
def currency(value):
    try:
        value = float(value)
    except (TypeError, ValueError):
        return value
    rv = f"${value:,.2f}"
    if rv.endswith(".00"):
        rv = rv[:-3]
    return rv
