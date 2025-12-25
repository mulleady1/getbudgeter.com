from typing import TYPE_CHECKING

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """Extends the User model with additional fields"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    income = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}'s profile"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Automatically create a profile when a new user is created"""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save the profile whenever the user is saved"""
    instance.profile.save()


@receiver(post_save, sender=User)
def clone_default_categories_and_rules(sender, instance, created, **kwargs):
    """Clone default categories and category rules for new users"""
    if created:
        # First, clone default categories
        default_categories = Category.objects.filter(user=None)
        category_mapping = {}  # Map old category PK to new category

        for default_cat in default_categories:
            new_cat = Category.objects.create(
                name=default_cat.name,
                user=instance,
                is_default=False,
                color=default_cat.color,
            )
            category_mapping[default_cat.pk] = new_cat

        # Then, clone default category rules
        default_rules = CategoryRule.objects.filter(user=None).select_related("category")

        for default_rule in default_rules:
            # Get the user's corresponding category
            new_category = category_mapping.get(default_rule.category.pk)
            if new_category:
                CategoryRule.objects.create(
                    user=instance,
                    keyword=default_rule.keyword,
                    category=new_category,
                    is_default=False,
                    priority=default_rule.priority,
                )


class Bill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)
    autopay = models.BooleanField(default=False)
    link = models.URLField(blank=True, null=True)
    month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.month:%Y-%m})"


class BillLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.URLField()
    label = models.CharField(max_length=255)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "label"]

    def __str__(self):
        return f"{self.label} - {self.user.username}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_default = models.BooleanField(default=False)
    color = models.CharField(max_length=7, default="#9c6ade")

    class Meta:
        unique_together = [["name", "user"]]
        verbose_name_plural = "Categories"

    def __str__(self):
        if self.user:
            return f"{self.name} ({self.user.username})"
        return self.name

    def get_text_color(self):
        """Return white or black text color based on background brightness"""
        hex_color = self.color.lstrip("#")
        r, g, b = tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))
        brightness = (r * 299 + g * 587 + b * 114) / 1000
        return "white" if brightness < 165 else "#333"


class CategoryRule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    keyword = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)

    class Meta:
        ordering = ["-priority", "keyword"]

    def __str__(self):
        return f"{self.keyword} → {self.category.name}"


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(db_index=True)
    description = models.CharField(max_length=500)
    merchant = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)

    transaction_hash = models.CharField(max_length=64, db_index=True)

    original_data = models.JSONField()
    source = models.CharField(max_length=50)
    anomaly = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    if TYPE_CHECKING:
        category_id: int | None

    class Meta:
        ordering = ["-date", "-created_at"]
        indexes = [
            models.Index(fields=["user", "date"]),
            models.Index(fields=["user", "transaction_hash"]),
        ]

    def __str__(self):
        return f"{self.date} - {self.merchant or self.description} - ${self.amount}"


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["user", "category", "month"]]
        ordering = ["category__name"]

    def __str__(self):
        return f"{self.user.username} - {self.category.name} - {self.month:%Y-%m} - ${self.amount}"


class Receipt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="receipts/%Y/%m/")
    merchant = models.CharField(max_length=255, blank=True)
    date = models.DateField(db_index=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    raw_ocr_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-created_at"]
        indexes = [
            models.Index(fields=["user", "date"]),
        ]

    def __str__(self):
        return f"{self.date} - {self.merchant or 'Unknown'} - ${self.total}"


class ReceiptItem(models.Model):
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE, related_name="items")
    description = models.CharField(max_length=500)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.description} - ${self.amount}"
