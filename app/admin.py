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
