from django.contrib import admin

from .models import (
    Bill,
    BillLink,
    Budget,
    Category,
    CategoryRule,
    ItemAlias,
    Receipt,
    ReceiptItem,
    RequestLog,
    Transaction,
)

# Register your models here.
admin.site.register(Bill)
admin.site.register(BillLink)
admin.site.register(Receipt)
admin.site.register(ReceiptItem)
admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(CategoryRule)
admin.site.register(Budget)


@admin.register(ItemAlias)
class ItemAliasAdmin(admin.ModelAdmin):
    list_display = ("raw_description", "normalized_name", "product_category", "is_user_override", "user")
    list_filter = ("product_category", "is_user_override", "user")
    search_fields = ("raw_description", "normalized_name")


@admin.register(RequestLog)
class RequestLogAdmin(admin.ModelAdmin):
    list_display = ("created_at", "user", "method", "path", "status", "duration_ms", "is_htmx", "is_bot", "ip")
    list_filter = ("is_bot", "is_htmx", "method", "status")
    search_fields = ("path", "user_agent", "ip", "user__username")
    date_hierarchy = "created_at"
    readonly_fields = [f.name for f in RequestLog._meta.fields]
