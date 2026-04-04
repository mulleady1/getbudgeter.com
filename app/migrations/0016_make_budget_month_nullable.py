from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0015_make_receipt_fields_nullable"),
    ]

    operations = [
        migrations.AlterField(
            model_name="budget",
            name="month",
            field=models.DateField(blank=True, null=True),
        ),
    ]
