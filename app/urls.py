# fmt: off
from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

_router = SimpleRouter(trailing_slash=False)
_router.register("bills/links",             views.BillLinkViewSet,    basename="bill-link")
_router.register("bills",                   views.BillViewSet,        basename="bill")
_router.register("transactions/categories", views.CategoryViewSet,    basename="category")
_router.register("transactions",            views.TransactionViewSet, basename="transaction")
_router.register("receipts",               views.ReceiptViewSet,     basename="receipt")
_router.register("category-rules",         views.CategoryRuleViewSet, basename="category-rule")
_router.register("analytics",              views.AnalyticsViewSet,   basename="analytics")
_router.register("budgets",                views.BudgetViewSet,      basename="budget")

urlpatterns = [
    path("",        views.home,         name="home"),
    path("signup",  views.signup_view,  name="signup"),
    path("login",   views.login_view,   name="login"),
    path("logout",  views.logout_view,  name="logout"),
] + _router.urls
