from django.contrib import admin

from .models import Bill, BillLink, Receipt, ReceiptItem

# Register your models here.
admin.site.register(Bill)
admin.site.register(BillLink)
admin.site.register(Receipt)
admin.site.register(ReceiptItem)
