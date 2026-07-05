import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

# Serve built frontend assets
assets_root = os.path.join(settings.BASE_DIR.parent, "dist", "assets")
urlpatterns += [
    re_path(r"^assets/(?P<path>.*)$", serve, {"document_root": assets_root}),
]

# Serve frontend for all other routes (SPA fallback)
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
