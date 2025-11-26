from django.contrib import admin
from .models import Bill, BillLink

# Register your models here.
admin.site.register(Bill)
admin.site.register(BillLink)
