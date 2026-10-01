from django.utils import timezone

from app.util import user_timezone


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
