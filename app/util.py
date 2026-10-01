from functools import cache
from zoneinfo import ZoneInfo, available_timezones

# Top-level IANA regions offered in the account timezone picker. Leaves out legacy aliases
# like "US/Hawaii" and "Etc/GMT+10", which still validate but would clutter the list.
TIMEZONE_REGIONS = ("Africa", "America", "Antarctica", "Asia", "Atlantic", "Australia", "Europe", "Indian", "Pacific")


@cache
def _available_timezones():
    return frozenset(available_timezones())


@cache
def timezone_choices():
    return ["UTC", *sorted(tz for tz in _available_timezones() if tz.split("/")[0] in TIMEZONE_REGIONS)]


def is_valid_timezone(name):
    return name in _available_timezones()


def user_timezone(user):
    """The user's saved timezone as a ZoneInfo, or None if they haven't set a valid one."""
    profile = getattr(user, "profile", None)
    if profile and is_valid_timezone(profile.timezone):
        return ZoneInfo(profile.timezone)
    return None


def is_mobile_device(user_agent):
    """
    Detect if the user agent indicates a mobile device.
    Returns True for mobile devices, False for desktop.
    """
    if not user_agent:
        return False

    user_agent = user_agent.lower()

    mobile_keywords = [
        "mobile",
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "webos",
        "opera mini",
    ]

    return any(keyword in user_agent for keyword in mobile_keywords)
