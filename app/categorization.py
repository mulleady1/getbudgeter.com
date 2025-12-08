from typing import Optional

from django.contrib.auth.models import User

from .models import Category, CategoryRule


class TransactionCategorizer:
    """
    Rule-based transaction categorization engine

    Matches transactions to categories based on keyword rules.
    User-specific rules take priority over default rules.
    """

    def __init__(self, user: User):
        self.user = user
        self._load_rules()

    def _load_rules(self):
        """Load and cache category rules for this user"""
        # Get all rules (user-specific + defaults)
        user_rules = list(CategoryRule.objects.filter(user=self.user).select_related("category"))
        default_rules = list(CategoryRule.objects.filter(user=None, is_default=True).select_related("category"))

        # User rules have higher priority
        self.rules = user_rules + default_rules

    def categorize(self, merchant: str, description: str) -> Optional[Category]:
        """
        Categorize a transaction based on merchant and description

        Args:
            merchant: Merchant name
            description: Transaction description

        Returns:
            Category object if a match is found, None otherwise
        """
        # Combine merchant and description for matching
        search_text = f"{merchant} {description}".lower()

        # Try to match against rules (already sorted by priority)
        for rule in self.rules:
            keyword = rule.keyword.lower()
            if keyword in search_text:
                return rule.category

        return None

    def categorize_batch(self, transactions: list) -> dict:
        """
        Categorize multiple transactions

        Args:
            transactions: List of transaction dicts with 'merchant' and 'description' keys

        Returns:
            Dict mapping transaction index to Category object
        """
        results = {}
        for i, transaction in enumerate(transactions):
            category = self.categorize(transaction.get("merchant", ""), transaction.get("description", ""))
            if category:
                results[i] = category

        return results
