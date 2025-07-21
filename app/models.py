from django.db import models
from django.contrib.auth.models import User


class Bill(models.Model):
    objects: models.Manager["Bill"]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid = models.BooleanField(default=False)
    link = models.URLField(blank=True, null=True)
    month = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.month:%Y-%m})"
