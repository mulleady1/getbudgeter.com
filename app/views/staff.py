"""Staff-only activity pages: what users (and bots) are doing, fed by `RequestLog`."""

import json
from datetime import timedelta
from functools import wraps

from django.contrib.auth.models import User
from django.contrib.auth.views import redirect_to_login
from django.core.paginator import Paginator
from django.db.models import Count, Q
from django.db.models.functions import TruncDate
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from django.utils import timezone
from django.utils.http import urlencode

from ..models import RequestLog
from ..services.activity import signup_details, user_activities

PERIODS = {
    "24h": ("Last 24 hours", timedelta(hours=24)),
    "7d": ("Last 7 days", timedelta(days=7)),
    "30d": ("Last 30 days", timedelta(days=30)),
    "90d": ("Last 90 days", timedelta(days=90)),
}
DEFAULT_PERIOD = "7d"
REQUESTS_PER_PAGE = 100

WHO_CHOICES = [
    ("all", "Everyone"),
    ("humans", "Browser user agents"),
    ("bots", "Bot user agents"),
    ("signed_in", "Signed in"),
    ("anonymous", "Anonymous"),
]
STATUS_CHOICES = [("all", "Any status"), ("2xx", "2xx"), ("3xx", "3xx"), ("4xx", "4xx"), ("5xx", "5xx")]


def staff_required(view):
    """Anonymous visitors go to login; signed-in non-staff get a 404 so the pages stay unlisted."""

    @wraps(view)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect_to_login(request.get_full_path())
        if not request.user.is_staff:
            raise Http404
        return view(request, *args, **kwargs)

    return wrapper


def _template(request, page, fragment):
    if request.htmx and not request.htmx.boosted:
        return f"staff/{page}#{fragment}"
    return f"staff/{page}"


def _period(request):
    key = request.GET.get("period", DEFAULT_PERIOD)
    if key not in PERIODS:
        key = DEFAULT_PERIOD
    label, delta = PERIODS[key]
    return key, label, timezone.now() - delta


def _daily_series(logs, since):
    """Per-day request counts split into browser and bot user agents, with empty days filled."""
    rows = (
        logs.annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(humans=Count("id", filter=Q(is_bot=False)), bots=Count("id", filter=Q(is_bot=True)))
        .order_by("day")
    )
    by_day = {row["day"]: row for row in rows}
    labels, humans, bots = [], [], []
    day = timezone.localdate(since)
    today = timezone.localdate()
    while day <= today:
        row = by_day.get(day, {})
        labels.append(day.strftime("%b %-d"))
        humans.append(row.get("humans", 0))
        bots.append(row.get("bots", 0))
        day += timedelta(days=1)
    return {"labels": labels, "humans": humans, "bots": bots}


@staff_required
def overview(request):
    period, period_label, since = _period(request)
    logs = RequestLog.objects.filter(created_at__gte=since)
    total = logs.count()
    bot_total = logs.filter(is_bot=True).count()
    stats = {
        "requests": total,
        "bot_requests": bot_total,
        "bot_pct": round(100 * bot_total / total) if total else 0,
        "visitors": logs.filter(user__isnull=True).values("session_key").distinct().count(),
        "active_users": logs.filter(user__isnull=False).values("user").distinct().count(),
        "signups": User.objects.filter(date_joined__gte=since).count(),
        "not_found": logs.filter(status=404).count(),
        "errors": logs.filter(status__gte=500).count(),
    }
    top_paths = logs.values("method", "path").annotate(n=Count("id")).order_by("-n")[:15]
    top_agents = logs.values("user_agent", "is_bot").annotate(n=Count("id")).order_by("-n")[:15]
    probes = logs.filter(status=404).values("path").annotate(n=Count("id")).order_by("-n")[:15]
    recent_signups = user_activities(User.objects.filter(date_joined__gte=since).order_by("-date_joined")[:10])
    recent = logs.select_related("user")[:30]
    context = {
        "period": period,
        "period_label": period_label,
        "periods": [(key, label) for key, (label, _) in PERIODS.items()],
        "stats": stats,
        "daily_json": json.dumps(_daily_series(logs, since)),
        "top_paths": top_paths,
        "top_agents": top_agents,
        "probes": probes,
        "recent_signups": recent_signups,
        "recent": recent,
    }
    return render(request, _template(request, "overview.html", "overview"), context)


@staff_required
def users(request):
    show = request.GET.get("show", "all")
    if show not in ("all", "flagged"):
        show = "all"
    activities = user_activities(User.objects.select_related("profile").order_by("-date_joined"))
    if show == "flagged":
        activities = [a for a in activities if a.verdict != "human"]
    context = {
        "show": show,
        "activities": activities,
        "total_users": User.objects.count(),
        "flagged_count": sum(1 for a in activities if a.verdict != "human") if show == "all" else len(activities),
    }
    return render(request, _template(request, "users.html", "user-list"), context)


@staff_required
def user_detail(request, pk):
    user = get_object_or_404(User.objects.select_related("profile"), pk=pk)
    activity = user_activities([user])[0]
    logs = RequestLog.objects.filter(user=user)
    context = {
        "activity": activity,
        "signup": signup_details(user),
        "distinct_ips": logs.exclude(ip__isnull=True).values("ip").distinct().count(),
        "agents": logs.values("user_agent", "is_bot").annotate(n=Count("id")).order_by("-n")[:5],
        "recent": logs[:100],
    }
    return render(request, "staff/user_detail.html", context)


@staff_required
def requests(request):
    who = request.GET.get("who", "all")
    status = request.GET.get("status", "all")
    path = request.GET.get("path", "").strip()
    user_q = request.GET.get("user", "").strip()

    logs = RequestLog.objects.select_related("user")
    if who == "humans":
        logs = logs.filter(is_bot=False)
    elif who == "bots":
        logs = logs.filter(is_bot=True)
    elif who == "signed_in":
        logs = logs.filter(user__isnull=False)
    elif who == "anonymous":
        logs = logs.filter(user__isnull=True)
    else:
        who = "all"
    if status in ("2xx", "3xx", "4xx", "5xx"):
        low = int(status[0]) * 100
        logs = logs.filter(status__gte=low, status__lt=low + 100)
    else:
        status = "all"
    if path:
        logs = logs.filter(path__icontains=path)
    if user_q:
        if user_q.isdigit():
            logs = logs.filter(user_id=int(user_q))
        else:
            logs = logs.filter(user__username__icontains=user_q)

    paginator = Paginator(logs, REQUESTS_PER_PAGE)
    page = paginator.get_page(request.GET.get("page"))
    filters = {"who": who, "status": status, "path": path, "user": user_q}
    context = {
        "page": page,
        "filters": filters,
        "query": urlencode({key: value for key, value in filters.items() if value and value != "all"}),
        "who_choices": WHO_CHOICES,
        "status_choices": STATUS_CHOICES,
    }
    return render(request, _template(request, "requests.html", "request-list"), context)
