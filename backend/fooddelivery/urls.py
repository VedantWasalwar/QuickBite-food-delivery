"""
Main URL configuration for the food delivery project.
This file connects all our app URLs together.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # All API URLs will be under /api/
]

# Serve media files (for images) - works in both development and production
# Note: For production, consider using a CDN like Cloudinary or AWS S3
if settings.DEBUG:
    # Development: use static() helper
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # Production: serve media files through Django (for Render)
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]







