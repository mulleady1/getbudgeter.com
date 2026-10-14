"""Heuristics behind the staff activity pages: which requests look automated and which
accounts look like bots. Everything here is a signal for a human to weigh, not a verdict
the app acts on."""

from dataclasses import dataclass, field
from datetime import timedelta

from django.contrib.auth.models import User
from django.db.models import Count, Max, Min, Q
from django.utils import timezone

from app.models import Bill, Budget, Receipt, RequestLog, Transaction

# Lowercase substrings that mark a user agent as a crawler, an HTTP library, a scanner or a
# headless browser. Real browsers (Chrome, Safari, Firefox, Edge, mobile WebViews) contain none.
BOT_UA_MARKERS = (
    "mozlila",  # misspelled Mozilla: a long-lived scanner signature
    "bot",
    "crawl",
    "spider",
    "slurp",
    "curl/",
    "wget",
    "python",
    "httpclient",
    "http-client",
    "go-http",
    "java/",
    "libwww",
    "scrapy",
    "headless",
    "phantomjs",
    "okhttp",
    "axios",
    "node-fetch",
    "undici",
    "postman",
    "httpx",
    "aiohttp",
    "zgrab",
    "masscan",
    "nmap",
    "nikto",
    "sqlmap",
    "censys",
    "facebookexternalhit",
    "semrush",
    "ahrefs",
    "petalbot",
    "bytespider",
    "gptbot",
    "claudebot",
    "ccbot",
    "dataforseo",
    "mj12bot",
    "dotbot",
    "lighthouse",
    "pingdom",
    "uptimerobot",
)


def prune_request_logs(days):
    """Delete log rows older than `days`. Returns how many went."""
    cutoff = timezone.now() - timedelta(days=days)
    deleted, _ = RequestLog.objects.filter(created_at__lt=cutoff).delete()
    return deleted


def is_bot_user_agent(user_agent):
    """True when the user agent is missing, names an automated client, or is a bare "Mozilla/5.0"
    with no browser details after it, which no real browser ever sends."""
    if not user_agent or not user_agent.strip():
        return True
    ua = user_agent.strip().lower()
    if ua in ("mozilla/5.0", "mozilla/4.0"):
        return True
    return any(marker in ua for marker in BOT_UA_MARKERS)


def looks_like_email(username):
    local, sep, domain = username.partition("@")
    return bool(sep and local and "." in domain and not domain.endswith("."))


@dataclass
class Signal:
    label: str
    weight: int
    detail: str = ""


@dataclass
class UserActivity:
    user: User
    requests: int = 0
    htmx_requests: int = 0
    bot_requests: int = 0
    first_seen: object = None
    last_seen: object = None
    bills: int = 0
    transactions: int = 0
    receipts: int = 0
    budgets: int = 0
    signals: list[Signal] = field(default_factory=list)

    @property
    def content_total(self):
        return self.bills + self.transactions + self.receipts + self.budgets

    @property
    def score(self):
        return sum(s.weight for s in self.signals)

    @property
    def verdict(self):
        """"bot" needs at least one strong signal (weight >= 2); circumstantial ones only ever
        add up to "suspicious", however many there are."""
        strong = any(s.weight >= 2 for s in self.signals)
        if strong and self.score >= 3:
            return "bot"
        if self.score >= 2:
            return "suspicious"
        return "human"


def _signals_for(activity):
    user = activity.user
    signals = []
    if activity.bot_requests:
        signals.append(Signal("Bot user agent", 3, f"{activity.bot_requests} request(s) from an automated client"))
    if not looks_like_email(user.username):
        signals.append(Signal("Not an email", 3, "Signed up with something that isn't an email address"))
    if activity.requests and not activity.htmx_requests:
        signals.append(Signal("No htmx requests", 2, "Every logged request was a plain HTTP hit; no JavaScript ran"))
    profile = getattr(user, "profile", None)
    if profile is not None and not profile.timezone:
        signals.append(Signal("No timezone", 1, "The browser never reported a timezone, which JavaScript does on signup"))
    one_day_old = user.date_joined < timezone.now() - timedelta(days=1)
    only_login_was_signup = user.last_login is not None and user.last_login - user.date_joined < timedelta(minutes=1)
    if one_day_old and (user.last_login is None or only_login_was_signup):
        signals.append(Signal("Never came back", 1, "No login after the one that signup performed"))
    if activity.content_total == 0:
        signals.append(Signal("Empty account", 1, "No bills, transactions, receipts or budgets"))
    return signals


def _counts_by_user(model):
    rows = model.objects.values("user").annotate(n=Count("id"))
    return {row["user"]: row["n"] for row in rows}


def user_activities(users):
    """Build a `UserActivity` for each user in one pass of a handful of grouped queries."""
    users = list(users)
    ids = [u.pk for u in users]
    log_rows = (
        RequestLog.objects.filter(user_id__in=ids)
        .values("user")
        .annotate(
            requests=Count("id"),
            htmx_requests=Count("id", filter=Q(is_htmx=True)),
            bot_requests=Count("id", filter=Q(is_bot=True)),
            first_seen=Min("created_at"),
            last_seen=Max("created_at"),
        )
    )
    logs = {row["user"]: row for row in log_rows}
    bills = _counts_by_user(Bill)
    transactions = _counts_by_user(Transaction)
    receipts = _counts_by_user(Receipt)
    budgets = _counts_by_user(Budget)

    activities = []
    for user in users:
        row = logs.get(user.pk, {})
        activity = UserActivity(
            user=user,
            requests=row.get("requests", 0),
            htmx_requests=row.get("htmx_requests", 0),
            bot_requests=row.get("bot_requests", 0),
            first_seen=row.get("first_seen"),
            last_seen=row.get("last_seen"),
            bills=bills.get(user.pk, 0),
            transactions=transactions.get(user.pk, 0),
            receipts=receipts.get(user.pk, 0),
            budgets=budgets.get(user.pk, 0),
        )
        activity.signals = _signals_for(activity)
        activities.append(activity)
    return activities


def signup_details(user):
    """The signup POST for this user plus how long the client had been on the site before it.

    A human needs a few seconds to type the form; a script posts within a second of its
    first hit, or with no earlier hit at all.
    """
    signup = (
        RequestLog.objects.filter(user=user, method="POST", path="/signup").order_by("created_at").first()
    )
    if signup is None:
        return None
    earlier = RequestLog.objects.filter(
        created_at__lt=signup.created_at, created_at__gte=signup.created_at - timedelta(minutes=30)
    )
    if signup.session_key:
        earlier = earlier.filter(Q(session_key=signup.session_key) | Q(ip=signup.ip))
    elif signup.ip:
        earlier = earlier.filter(ip=signup.ip)
    else:
        earlier = earlier.none()
    first_hit = earlier.order_by("created_at").first()
    seconds_on_site = (signup.created_at - first_hit.created_at).total_seconds() if first_hit else None
    return {"log": signup, "seconds_on_site": seconds_on_site, "first_hit": first_hit}
