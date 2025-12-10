from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render


def home(request):
    if not request.user.is_authenticated:
        return redirect("login")

    return redirect("bills")


def signup_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

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
                },
            )

        # Create user
        user = User.objects.create_user(username=email, email=email, password=password)
        login(request, user)
        return redirect("/")

    return render(request, "app/signup.html")


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
