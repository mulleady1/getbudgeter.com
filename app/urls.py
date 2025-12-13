# fmt: off
from django.urls import path

from . import views

urlpatterns = [
    path("",                                                   views.home,                              name="home"),
    path("signup",                                             views.signup_view,                       name="signup"),
    path("login",                                              views.login_view,                        name="login"),
    path("logout",                                             views.logout_view,                       name="logout"),

    path("bills",                                              views.BillListCreateView.as_view(),      name="bills"),
    path("bills/new",                                          views.new_bill,                          name="new_bill"),
    path("bills/copy",                                         views.CopyBillsView.as_view(),           name="copy"),
    path("bills/stats",                                        views.bill_stats,                        name="bill_stats"),
    path("bills/income",                                       views.AddIncomeView.as_view(),           name="add_income"),
    path("bills/links",                                        views.BillLinksView.as_view(),           name="bill_links"),
    path("bills/links/new",                                    views.new_bill_link,                     name="new_bill_link"),
    path("bills/links/<int:link_id>",                          views.BillLinkEditDeleteView.as_view(),  name="edit_delete_bill_link"),
    path("bills/links/<int:link_id>/reorder/<str:direction>",  views.reorder_bill_link,                 name="reorder_bill_link"),
    path("bills/<int:bill_id>",                                views.BillEditDeleteView.as_view(),      name="edit_delete_bill"),
    path("bills/<int:bill_id>/toggle",                         views.toggle_paid,                       name="toggle_paid"),
    
    path("transactions",                                       views.TransactionListView.as_view(),     name="transactions"),
    path("transactions/upload",                                views.UploadCSVView.as_view(),           name="upload_csv"),
    path("transactions/bulk-categorize",                       views.bulk_categorize_transactions,      name="bulk_categorize_transactions"),
    path("transactions/categories",                            views.CategoryListView.as_view(),        name="category_list_create"),
    path("transactions/categories/new",                        views.new_category_dialog,               name="new_category_dialog"),
    path("transactions/categories/<int:category_id>",          views.CategoryDetailView.as_view(),      name="category_edit_delete"),
    path("transactions/<int:transaction_id>",                  views.TransactionDetailView.as_view(),   name="transaction_detail"),
    
    path("category-rules",                                     views.CategoryRuleListView.as_view(),    name="category_rules"),
    path("category-rules/reprocess",                           views.reprocess_transactions,            name="reprocess_transactions"),
    path("category-rules/<int:rule_id>",                       views.CategoryRuleDetailView.as_view(),  name="category_rule_edit_delete"),

    path("analytics",                                          views.AnalyticsView.as_view(),           name="analytics"),
    
    path("budgets",                                            views.BudgetListView.as_view(),          name="budgets"),
    path("budgets/new",                                        views.new_budget,                        name="new_budget"),
    path("budgets/<int:budget_id>",                            views.BudgetEditDeleteView.as_view(),    name="edit_delete_budget"),
]
