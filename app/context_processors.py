import os


def app_variables(request):
    return {
        "UI_VERSION": os.getenv("UI_VERSION", ""),
    }
