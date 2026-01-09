"""
Management command to create sample food items.
Run: python manage.py create_sample_foods
"""
from django.core.management.base import BaseCommand
from api.models import FoodItem


class Command(BaseCommand):
    help = 'Creates sample food items for testing'

    def handle(self, *args, **options):
        """Create sample food items"""
        foods = [
            {
                'name': 'Margherita Pizza',
                'description': 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
                'price': 12.99,
            },
            {
                'name': 'Pepperoni Pizza',
                'description': 'Delicious pizza topped with pepperoni and mozzarella cheese',
                'price': 14.99,
            },
            {
                'name': 'Caesar Salad',
                'description': 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
                'price': 9.99,
            },
            {
                'name': 'Burger Deluxe',
                'description': 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
                'price': 11.99,
            },
            {
                'name': 'Chicken Wings',
                'description': 'Crispy chicken wings with your choice of sauce (BBQ, Buffalo, or Honey Mustard)',
                'price': 10.99,
            },
            {
                'name': 'Pasta Carbonara',
                'description': 'Creamy pasta with bacon, eggs, and parmesan cheese',
                'price': 13.99,
            },
            {
                'name': 'Fish & Chips',
                'description': 'Beer-battered fish with crispy fries and tartar sauce',
                'price': 15.99,
            },
            {
                'name': 'Chocolate Brownie',
                'description': 'Warm chocolate brownie with vanilla ice cream',
                'price': 6.99,
            },
        ]
        
        created_count = 0
        for food_data in foods:
            food, created = FoodItem.objects.get_or_create(
                name=food_data['name'],
                defaults=food_data
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {food.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Already exists: {food.name}'))
        
        self.stdout.write(self.style.SUCCESS(f'\nCreated {created_count} new food items!'))
















