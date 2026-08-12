"""Backfill normalized names and product categories onto existing receipt items.

Run after deploying normalization to map the historical corpus, and again after
any change to `app.taxonomy` (with --all --clear-aliases) to remap it.
"""

import logging

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

from ...models import ItemAlias, ReceiptItem
from ...services import ItemNormalizer

logger = logging.getLogger(__name__)

UPDATE_BATCH_SIZE = 500


class Command(BaseCommand):
    help = "Backfill normalized names and product categories on existing receipt items."

    def add_arguments(self, parser):
        parser.add_argument("--user", help="Limit to a single username (default: every user).")
        parser.add_argument(
            "--all",
            action="store_true",
            help="Include items that are already normalized (default: only unnormalized ones).",
        )
        parser.add_argument(
            "--clear-aliases",
            action="store_true",
            help="Delete cached aliases first, forcing a fresh AI pass. Keeps user overrides.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Report what would be normalized without calling the API or writing.",
        )

    def handle(self, *args, **options):
        users = User.objects.order_by("username")
        if options["user"]:
            users = users.filter(username=options["user"])
            if not users.exists():
                raise CommandError(f"No user named {options['user']!r}")

        for user in users:
            self._normalize_user(user, options)

    def _normalize_user(self, user, options):
        items = ReceiptItem.objects.filter(receipt__user=user)
        if not options["all"]:
            items = items.filter(normalized_name="")

        descriptions = sorted(set(items.values_list("description", flat=True)))
        if not descriptions:
            self.stdout.write(f"{user.username}: nothing to normalize")
            return

        if options["dry_run"]:
            self.stdout.write(
                f"{user.username}: would normalize {items.count()} item(s) "
                f"across {len(descriptions)} distinct description(s)"
            )
            return

        if options["clear_aliases"]:
            deleted, _ = ItemAlias.objects.filter(user=user, is_user_override=False).delete()
            self.stdout.write(f"{user.username}: cleared {deleted} cached alias(es)")

        self.stdout.write(
            f"{user.username}: normalizing {len(descriptions)} distinct description(s)…"
        )
        mapping = ItemNormalizer(user).normalize(descriptions)
        if not mapping:
            self.stdout.write(self.style.WARNING(f"{user.username}: no mappings returned"))
            return

        pending, updated = [], 0
        for item in items.iterator():
            match = mapping.get(item.description)
            if match is None:
                continue
            item.normalized_name = match.name
            item.product_category = match.category
            pending.append(item)

            if len(pending) >= UPDATE_BATCH_SIZE:
                ReceiptItem.objects.bulk_update(pending, ["normalized_name", "product_category"])
                updated += len(pending)
                pending = []

        if pending:
            ReceiptItem.objects.bulk_update(pending, ["normalized_name", "product_category"])
            updated += len(pending)

        unresolved = len(descriptions) - len(mapping)
        message = f"{user.username}: updated {updated} item(s) from {len(mapping)} mapping(s)"
        if unresolved:
            message += f", {unresolved} description(s) unresolved"
        self.stdout.write(self.style.SUCCESS(message))
