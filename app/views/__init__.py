from .analytics import AnalyticsView
from .auth import home, login_view, logout_view, signup_view
from .bills import (
    AddIncomeView,
    BillEditDeleteView,
    BillLinkEditDeleteView,
    BillLinksView,
    BillListCreateView,
    CopyBillsView,
    bill_stats,
    new_bill,
    new_bill_link,
    reorder_bill_link,
    toggle_paid,
)
from .budgets import BudgetEditDeleteView, BudgetListView, new_budget
from .transactions import (
    CategoryEditDeleteView,
    CategoryListCreateView,
    TransactionEditDeleteView,
    TransactionListView,
    UploadCSVView,
    bulk_categorize_transactions,
    categorize_transaction,
    new_category_dialog,
)

__all__ = [
    # Auth
    "home",
    "login_view",
    "logout_view",
    "signup_view",
    # Bills
    "BillListCreateView",
    "BillEditDeleteView",
    "new_bill",
    "toggle_paid",
    "CopyBillsView",
    "AddIncomeView",
    "bill_stats",
    "BillLinksView",
    "BillLinkEditDeleteView",
    "new_bill_link",
    "reorder_bill_link",
    # Transactions
    "UploadCSVView",
    "TransactionListView",
    "TransactionEditDeleteView",
    "categorize_transaction",
    "bulk_categorize_transactions",
    "CategoryListCreateView",
    "CategoryEditDeleteView",
    "new_category_dialog",
    # Analytics
    "AnalyticsView",
    # Budgets
    "BudgetListView",
    "new_budget",
    "BudgetEditDeleteView",
]
