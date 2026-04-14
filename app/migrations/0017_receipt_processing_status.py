from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0016_make_budget_month_nullable"),
    ]

    operations = [
        migrations.AddField(
            model_name="receipt",
            name="status",
            field=models.CharField(
                choices=[("PENDING", "Pending"), ("READY", "Ready"), ("FAILED", "Failed")],
                default="READY",
                max_length=20,
            ),
        ),
    ]
