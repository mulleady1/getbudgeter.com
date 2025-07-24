from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("signup", views.signup_view, name="signup"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("bills", views.BillListCreateView.as_view(), name="bills"),
    path("bills/new", views.new_bill, name="new_bill"),
    path(
        "bills/<int:bill_id>",
        views.BillEditDeleteView.as_view(),
        name="edit_delete_bill",
    ),
    path("bills/<int:bill_id>/toggle", views.toggle_paid, name="toggle_paid"),
    path("bills/copy", views.CopyBillsView.as_view(), name="copy"),
]
