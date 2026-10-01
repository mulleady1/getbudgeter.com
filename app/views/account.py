import logging
from datetime import timezone as dt_timezone
from zoneinfo import ZoneInfo

from django.contrib.auth import logout, update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import action

from ..models import Receipt, UserProfile
from ..util import is_valid_timezone, timezone_choices
from .base import LoginRequiredViewSet

logger = logging.getLogger(__name__)

# `User.username` is a CharField(max_length=150) and we keep it in sync with the email.
USERNAME_MAX_LENGTH = User._meta.get_field("username").max_length


def _form_error(request, message):
    return render(request, "form_error.html", {"message": message}, status=400)


def _timezone_context(user):
    current = user.profile.timezone or "UTC"
    choices = timezone_choices()
    # A valid alias the browser reported (e.g. "US/Hawaii") isn't in the picker; keep it selectable.
    if current not in choices:
        choices = [current, *choices]
    return {"current_timezone": current, "timezone_choices": choices}


class AccountViewSet(LoginRequiredViewSet):
    def list(self, request):
        # `dark_mode` comes from the app_variables context processor.
        context = {"email": request.user.email, **_timezone_context(request.user)}
        return render(request, "account/account_page.html", context)

    @action(detail=False, methods=["post"])
    def theme(self, request):
        # The switch only submits its value while checked, so a missing field means "light".
        dark = request.POST.get("theme") == UserProfile.THEME_DARK
        profile = request.user.profile
        profile.theme = UserProfile.THEME_DARK if dark else UserProfile.THEME_LIGHT
        profile.save(update_fields=["theme"])
        return render(request, "account/account_page.html#account-appearance-card", {"dark_mode": dark})

    @action(detail=False, methods=["post"], url_path="timezone")
    def set_timezone(self, request):
        tz_name = request.POST.get("timezone", "")
        if not is_valid_timezone(tz_name):
            return _form_error(request, "Choose a valid timezone.")
        profile = request.user.profile
        profile.timezone = tz_name
        profile.save(update_fields=["timezone"])
        return render(
            request,
            "account/account_page.html#account-timezone-card",
            {**_timezone_context(request.user), "toast": "Timezone updated."},
        )

    @action(detail=False, methods=["post"], url_path="detect-timezone")
    def detect_timezone(self, request):
        """Backfill for accounts with no timezone. base.html posts the browser's zone once."""
        tz_name = request.POST.get("timezone", "")
        profile = request.user.profile
        res = HttpResponse()
        if profile.timezone or not is_valid_timezone(tz_name):
            return res
        profile.timezone = tz_name
        profile.save(update_fields=["timezone"])
        # This page was rendered in UTC; reload it if that put it on the wrong day.
        if timezone.localdate(timezone=ZoneInfo(tz_name)) != timezone.localdate(timezone=dt_timezone.utc):
            res.headers["HX-Refresh"] = "true"
        return res

    @action(detail=False, methods=["post"])
    def email(self, request):
        new_email = request.POST.get("email", "").strip()
        password = request.POST.get("password", "")

        if not new_email or not password:
            return _form_error(request, "Email and current password are required.")

        if not request.user.check_password(password):
            return _form_error(request, "Current password is incorrect.")

        try:
            validate_email(new_email)
        except ValidationError:
            return _form_error(request, "Enter a valid email address.")

        if len(new_email) > USERNAME_MAX_LENGTH:
            return _form_error(request, f"Email must be {USERNAME_MAX_LENGTH} characters or fewer.")

        if new_email.lower() == request.user.email.lower():
            return _form_error(request, "That is already your email address.")

        taken = (
            User.objects.filter(Q(email__iexact=new_email) | Q(username__iexact=new_email))
            .exclude(pk=request.user.pk)
            .exists()
        )
        if taken:
            return _form_error(request, "That email is already registered.")

        # Accounts are created with `username=email` and login authenticates on username,
        # so both fields have to move together or the user can no longer sign in.
        old_email = request.user.email
        request.user.username = new_email
        request.user.email = new_email
        request.user.save(update_fields=["username", "email"])

        logger.info("User %s changed email to %s", old_email, new_email)

        return render(
            request,
            "account/account_page.html#account-email-card",
            {"email": new_email, "toast": "Email address updated."},
        )

    @action(detail=False, methods=["post"])
    def password(self, request):
        current_password = request.POST.get("current_password", "")
        new_password = request.POST.get("new_password", "")
        confirm_password = request.POST.get("confirm_password", "")

        if not current_password or not new_password or not confirm_password:
            return _form_error(request, "All fields are required.")

        if not request.user.check_password(current_password):
            return _form_error(request, "Current password is incorrect.")

        if new_password != confirm_password:
            return _form_error(request, "New passwords do not match.")

        try:
            validate_password(new_password, request.user)
        except ValidationError as exc:
            return _form_error(request, " ".join(exc.messages))

        request.user.set_password(new_password)
        request.user.save()
        # set_password rotates the session auth hash, which would log the user out on the
        # next request unless the session is re-stamped with it.
        update_session_auth_hash(request, request.user)

        logger.info("User %s changed their password", request.user.username)

        return render(
            request,
            "account/account_page.html#account-password-card",
            {"toast": "Password updated."},
        )

    @action(detail=False, methods=["post"], url_path="delete")
    def delete_account(self, request):
        password = request.POST.get("password", "")

        if not password:
            return _form_error(request, "Enter your password to delete your account.")

        if not request.user.check_password(password):
            return _form_error(request, "Password is incorrect.")

        user = request.user
        logger.info("Deleting account for user %s (id=%s)", user.username, user.pk)

        # The cascade removes the Receipt rows but not the uploaded files, so hold on to
        # the file handles and clear them once the account is actually gone.
        receipts = Receipt.objects.filter(user=user).exclude(image="")
        receipt_images = [f for r in receipts for f in (r.image, r.thumbnail) if f]

        logout(request)
        user.delete()

        for image in receipt_images:
            image.delete(save=False)

        res = HttpResponse()
        res.headers["HX-Redirect"] = "/"
        return res
