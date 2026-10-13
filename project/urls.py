"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from app import views

urlpatterns = [
    # Staff activity pages live under /admin/ but are ours, not Django admin's. They must come
    # before the admin include because its catch-all would otherwise swallow them.
    path("admin/activity",        views.staff_overview,    name="staff-overview"),
    path("admin/users",           views.staff_users,       name="staff-users"),
    path("admin/users/<int:pk>",  views.staff_user_detail, name="staff-user-detail"),
    path("admin/requests",        views.staff_requests,    name="staff-requests"),
    path("admin/", admin.site.urls),
    path("", include("app.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
