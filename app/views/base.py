from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.viewsets import ViewSet


@method_decorator(login_required, name="dispatch")
class LoginRequiredViewSet(ViewSet):
    pass
