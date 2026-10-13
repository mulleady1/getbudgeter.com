import ipaddress
import logging
import threading
import time

from django.conf import settings
from django.db import connection
from django.utils import timezone

from app.models import RequestLog
from app.services.activity import is_bot_user_agent, prune_request_logs
from app.util import user_timezone

logger = logging.getLogger(__name__)


class UserTimezoneMiddleware:
    """Run each request in the signed-in user's timezone so `timezone.localdate()` and date
    lookups (`__date`, `TruncMonth`) agree with the user's calendar. Storage stays UTC."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        tz = user_timezone(request.user) if request.user.is_authenticated else None
        if tz:
            timezone.activate(tz)
        else:
            timezone.deactivate()
        return self.get_response(request)


class RequestLogMiddleware:
    """Record every request as a `RequestLog` row once the response is ready.

    Installed first (outermost) so it times the whole stack and runs its response half
    last, after the session has been saved and `request.user` reflects any login or
    logout the view performed. Logging must never break a request, so failures are
    logged and swallowed.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.exclude_prefixes = tuple(getattr(settings, "REQUEST_LOG_EXCLUDE_PREFIXES", ()))
        self.exclude_paths = frozenset(getattr(settings, "REQUEST_LOG_EXCLUDE_PATHS", ()))

    # The log prunes itself: once per PRUNE_INTERVAL per process, the request that notices the
    # interval has passed starts a daemon thread that drops rows older than
    # REQUEST_LOG_RETENTION_DAYS. Each gunicorn worker does this independently, which is harmless.
    PRUNE_INTERVAL = 24 * 60 * 60
    _next_prune = 0.0
    _prune_lock = threading.Lock()

    def __call__(self, request):
        started = time.monotonic()
        response = self.get_response(request)
        if self.should_log(request):
            try:
                self.record(request, response, started)
            except Exception:
                logger.exception("could not record request log for %s", request.path)
            self.maybe_prune()
        return response

    @classmethod
    def maybe_prune(cls):
        """Start a background prune if the interval has elapsed. Returns whether one was started."""
        now = time.monotonic()
        with cls._prune_lock:
            if now < cls._next_prune:
                return False
            cls._next_prune = now + cls.PRUNE_INTERVAL
        threading.Thread(target=cls.prune, name="prune-request-logs", daemon=True).start()
        return True

    @staticmethod
    def prune():
        try:
            deleted = prune_request_logs(settings.REQUEST_LOG_RETENTION_DAYS)
            if deleted:
                logger.info("pruned %d request log rows", deleted)
        except Exception:
            logger.exception("could not prune request logs")
        finally:
            # Threads get their own DB connection; close it so it isn't leaked.
            connection.close()

    def should_log(self, request):
        path = request.path
        return path not in self.exclude_paths and not path.startswith(self.exclude_prefixes)

    def record(self, request, response, started):
        user = getattr(request, "user", None)
        session = getattr(request, "session", None)
        user_agent = request.headers.get("User-Agent", "")
        RequestLog.objects.create(
            user=user if user is not None and user.is_authenticated else None,
            session_key=(session.session_key if session is not None else None) or "",
            ip=client_ip(request),
            method=request.method[:8],
            path=request.path[:500],
            query=request.META.get("QUERY_STRING", "")[:500] if request.method == "GET" else "",
            status=response.status_code,
            duration_ms=int((time.monotonic() - started) * 1000),
            user_agent=user_agent[:500],
            referer=request.headers.get("Referer", "")[:500],
            is_htmx=request.headers.get("HX-Request") == "true",
            is_bot=is_bot_user_agent(user_agent),
        )


def client_ip(request):
    """The client's address, honouring the first hop of X-Forwarded-For behind the proxy."""
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    candidate = forwarded.split(",")[0].strip() if forwarded else request.META.get("REMOTE_ADDR", "")
    try:
        return str(ipaddress.ip_address(candidate))
    except ValueError:
        return None
