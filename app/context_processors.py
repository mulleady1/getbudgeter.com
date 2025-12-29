from pathlib import Path

from app.util import is_mobile_device

UI_VERSION = Path("UI_VERSION").read_text().strip()


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
    }
