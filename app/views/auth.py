import logging
import time

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core import signing
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render

from ..util import is_valid_timezone

logger = logging.getLogger(__name__)

# Two cheap, script-free bot checks on signup:
#  - A honeypot text field that CSS hides; browsers submit it empty, form-stuffing scripts fill it.
#  - A signed timestamp issued with the form. A POST without one never loaded the page; a POST
#    younger than SIGNUP_MIN_SECONDS was faster than any person can type three fields.
HONEYPOT_FIELD = "website"
SIGNUP_TOKEN_SALT = "signup-form"
SIGNUP_MIN_SECONDS = 2
SIGNUP_MAX_SECONDS = 60 * 60 * 6


def make_signup_token(issued_at=None):
    return signing.dumps({"t": issued_at if issued_at is not None else time.time()}, salt=SIGNUP_TOKEN_SALT)


def signup_token_age(token):
    """Seconds since the token was issued, or None if it is missing, forged or expired."""
    if not token:
        return None
    try:
        data = signing.loads(token, salt=SIGNUP_TOKEN_SALT, max_age=SIGNUP_MAX_SECONDS)
    except signing.BadSignature:
        return None
    age = time.time() - data["t"]
    return None if age > SIGNUP_MAX_SECONDS else age


def signup_looks_automated(request):
    """A short reason string when the POST trips a bot check, else None."""
    if request.POST.get(HONEYPOT_FIELD):
        return "honeypot filled"
    age = signup_token_age(request.POST.get("form_token"))
    if age is None:
        return "no valid form token"
    if age < SIGNUP_MIN_SECONDS:
        return f"submitted {age:.1f}s after the form was issued"
    return None


def home(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect("/bills")
    return render(request, "app/landing.html")


def signup_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        reason = signup_looks_automated(request)
        if reason:
            logger.info("rejected signup for %r: %s", email, reason)
            # Keep the submitted token: a person who retries will be past the minimum age by then,
            # whereas a fresh token would make an instant retry fail again.
            return render(
                request,
                "app/signup.html",
                {
                    "error": "Something went wrong. Please try again.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                    "form_token": request.POST.get("form_token") or make_signup_token(),
                },
                status=400,
            )

        # Validate input
        if not email or not password:
            return render(
                request,
                "app/signup.html",
                {
                    "error": "All fields are required.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                    "form_token": request.POST.get("form_token") or make_signup_token(),
                },
            )

        if password != confirm_password:
            return render(
                request,
                "app/signup.html",
                {
                    "error": "Passwords do not match.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                    "form_token": request.POST.get("form_token") or make_signup_token(),
                },
            )

        if User.objects.filter(email=email).exists():
            return render(
                request,
                "app/signup.html",
                {
                    "error": "Email already registered.",
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password,
                    "form_token": request.POST.get("form_token") or make_signup_token(),
                },
            )

        # Create user
        user = User.objects.create_user(username=email, email=email, password=password)
        tz_name = request.POST.get("timezone", "")
        if is_valid_timezone(tz_name):
            user.profile.timezone = tz_name
            user.profile.save(update_fields=["timezone"])
        login(request, user)
        return redirect("/")

    return render(request, "app/signup.html", {"form_token": make_signup_token()})


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(
                request,
                "app/login.html",
                {
                    "email": email,
                    "password": password,
                    "error": "Invalid email or password.",
                },
            )
    return render(request, "app/login.html", {"email": "", "password": ""})


def logout_view(request):
    logout(request)
    return redirect("home")
