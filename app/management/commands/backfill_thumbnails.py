"""Build thumbnails for receipts uploaded before thumbnailing existed.

Run once after deploying. New uploads get a thumbnail from the background pass,
so this only has to catch up the historical rows. Safe to re-run: it skips
receipts that already have one unless --all is given.
"""

import logging

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError

from ...models import Receipt
from ...services import generate_thumbnail

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Generate thumbnails for existing receipt images."

    def add_arguments(self, parser):
        parser.add_argument("--user", help="Limit to a single username (default: every user).")
        parser.add_argument(
            "--all",
            action="store_true",
            help="Rebuild thumbnails that already exist (default: only missing ones).",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Report what would be built without writing any files.",
        )

    def handle(self, *args, **options):
        receipts = Receipt.objects.exclude(image="").order_by("pk")

        if options["user"]:
            try:
                user = User.objects.get(username=options["user"])
            except User.DoesNotExist:
                raise CommandError(f"No user named {options['user']!r}.")
            receipts = receipts.filter(user=user)

        if not options["all"]:
            receipts = receipts.filter(thumbnail="")

        total = receipts.count()
        if not total:
            self.stdout.write("No receipts need thumbnails.")
            return

        if options["dry_run"]:
            self.stdout.write(f"Would build {total} thumbnail(s).")
            return

        built = failed = 0
        # iterator() so a large backlog doesn't pull every row into memory at once.
        for receipt in receipts.iterator(chunk_size=100):
            if generate_thumbnail(receipt):
                built += 1
            else:
                failed += 1
                self.stderr.write(f"Receipt {receipt.pk}: could not read {receipt.image.name}")

            if (built + failed) % 100 == 0:
                self.stdout.write(f"  {built + failed}/{total}...")

        self.stdout.write(self.style.SUCCESS(f"Built {built} thumbnail(s)."))
        if failed:
            self.stdout.write(self.style.WARNING(f"{failed} receipt(s) failed; they still render from the original."))
