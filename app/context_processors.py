from pathlib import Path

UI_VERSION = Path("UI_VERSION").read_text().strip()


def app_variables(request):
    return {
        "UI_VERSION": UI_VERSION,
    }
