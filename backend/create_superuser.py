import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fooddelivery.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
email = os.environ.get("DJANGO_SUPERUSER_EMAIL")

if username and password:
    user, created = User.objects.get_or_create(
        username=username,
        defaults={"email": email or ""}
    )

    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.save()

    if created:
        print("✅ Superuser created successfully")
    else:
        print("♻️ Superuser already existed — password updated")
else:
    print("⚠️ Superuser env variables not set")
