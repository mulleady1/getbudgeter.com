from django import template

register = template.Library()


@register.filter
def currency(value):
    try:
        value = float(value)
    except (TypeError, ValueError):
        return value
    return f"${value:,.2f}"
