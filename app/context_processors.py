from pathlib import Path

from app.models import UserProfile
from app.util import is_mobile_device

UI_VERSION = Path("UI_VERSION").read_text().strip()


def _theme(request):
    user = getattr(request, "user", None)
    if user is None or not user.is_authenticated:
        return UserProfile.THEME_LIGHT
    profile = getattr(user, "profile", None)
    return profile.theme if profile else UserProfile.THEME_LIGHT


def app_variables(request):
    # Detect device type and cache in session
    if "is_mobile" not in request.session:
        user_agent = request.META.get("HTTP_USER_AGENT", "")
        request.session["is_mobile"] = is_mobile_device(user_agent)

    is_mobile = request.session["is_mobile"]
    is_desktop = not is_mobile

    return {
        "UI_VERSION": UI_VERSION,
        "is_mobile": is_mobile,
        "is_desktop": is_desktop,
        "dark_mode": _theme(request) == UserProfile.THEME_DARK,
    }
