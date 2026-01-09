"""
Management command to help add images to existing food items.
This script provides instructions for adding images manually.
Run: python manage.py add_sample_images
"""
from django.core.management.base import BaseCommand
from api.models import FoodItem
import os
from django.conf import settings


class Command(BaseCommand):
    help = 'Provides instructions for adding sample food images'

    def handle(self, *args, **options):
        """Display instructions for adding images"""
        self.stdout.write(self.style.SUCCESS('\n=== Adding Sample Images to Food Items ===\n'))
        
        # Get all food items without images
        foods = FoodItem.objects.all()
        
        if not foods.exists():
            self.stdout.write(self.style.WARNING('No food items found. Run create_sample_foods first.'))
            return
        
        # Create media directory if it doesn't exist
        media_dir = settings.MEDIA_ROOT / 'food_images'
        media_dir.mkdir(parents=True, exist_ok=True)
        
        self.stdout.write('Food items in database:')
        for food in foods:
            has_image = bool(food.image and os.path.exists(food.image.path)) if food.image else False
            status = '✓ Has image' if has_image else '✗ No image'
            self.stdout.write(f'  {food.id}. {food.name} - {status}')
        
        self.stdout.write(self.style.WARNING('\nTo add images:'))
        self.stdout.write('1. Find food images online or use your own images')
        self.stdout.write('2. Save images in: backend/media/food_images/')
        self.stdout.write('3. Name them descriptively (e.g., pizza-margherita.jpg)')
        self.stdout.write('4. Go to Django Admin (http://127.0.0.1:8000/admin/)')
        self.stdout.write('5. Login and edit each Food Item to upload its image')
        self.stdout.write('\nOR use the Django shell to set images programmatically.')
        
        self.stdout.write(self.style.SUCCESS('\nMedia directory location:'))
        self.stdout.write(f'  {media_dir}')
        self.stdout.write('\n')
















