from django.contrib import admin

from .models import Bill, BillLink, Budget, Category, CategoryRule, Receipt, ReceiptItem, Transaction

# Register your models here.
admin.site.register(Bill)
admin.site.register(BillLink)
admin.site.register(Receipt)
admin.site.register(ReceiptItem)
admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(CategoryRule)
admin.site.register(Budget)
