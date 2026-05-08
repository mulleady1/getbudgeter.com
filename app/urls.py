# fmt: off
from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter(trailing_slash=False)
router.register("bills/links",             views.BillLinkViewSet,    basename="bill-link")
router.register("bills",                   views.BillViewSet,        basename="bill")
router.register("transactions/categories", views.CategoryViewSet,    basename="category")
router.register("transactions",            views.TransactionViewSet, basename="transaction")
router.register("receipts",               views.ReceiptViewSet,      basename="receipt")
router.register("category-rules",         views.CategoryRuleViewSet, basename="category-rule")
router.register("analytics",              views.AnalyticsViewSet,    basename="analytics")
router.register("budgets",                views.BudgetViewSet,       basename="budget")

urlpatterns = [
    path("",        views.home,         name="home"),
    path("signup",  views.signup_view,  name="signup"),
    path("login",   views.login_view,   name="login"),
    path("logout",  views.logout_view,  name="logout"),
] + router.urls
