from django.conf import settings
from django.core.management.base import BaseCommand

from app.services.activity import prune_request_logs


class Command(BaseCommand):
    help = "Delete RequestLog rows older than --days (default REQUEST_LOG_RETENTION_DAYS). The app also does this on its own once a day."

    def add_arguments(self, parser):
        parser.add_argument("--days", type=int, default=settings.REQUEST_LOG_RETENTION_DAYS)

    def handle(self, *args, **options):
        deleted = prune_request_logs(options["days"])
        self.stdout.write(f"Deleted {deleted} request log rows older than {options['days']} days.")
