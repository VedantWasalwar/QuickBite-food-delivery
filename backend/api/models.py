"""
Database models for our food delivery app.
Models define the structure of data stored in the database.
"""
from django.db import models
from django.contrib.auth.models import User


class FoodItem(models.Model):
    """
    FoodItem model - stores information about each food item in the restaurant.
    This is like a menu item with name, price, description, and image.
    """
    name = models.CharField(max_length=200)  # Food name (e.g., "Margherita Pizza")
    description = models.TextField()  # Description of the food
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price (e.g., 12.99)
    image = models.ImageField(upload_to='food_images/', blank=True, null=True)  # Image stored in media/food_images/ (optional)
    created_at = models.DateTimeField(auto_now_add=True)  # When item was added
    
    def __str__(self):
        """String representation - shows food name in admin panel"""
        return self.name
    
    class Meta:
        ordering = ['-created_at']  # Newest items first


class CartItem(models.Model):
    """
    CartItem model - stores items that users add to their cart.
    Each cart item links a user to a food item with a quantity.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Which user owns this cart item
    food = models.ForeignKey(FoodItem, on_delete=models.CASCADE)  # Which food item
    quantity = models.PositiveIntegerField(default=1)  # How many of this item
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        """String representation - shows user and food name"""
        return f"{self.user.username} - {self.food.name} x{self.quantity}"
    
    class Meta:
        unique_together = ['user', 'food']  # One cart item per user-food combination


class Order(models.Model):
    """
    Order model - stores information about a completed order.
    When user places an order, we create one Order with multiple OrderItems.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Which user placed the order
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # Total order amount
    created_at = models.DateTimeField(auto_now_add=True)  # When order was placed
    
    def __str__(self):
        """String representation - shows user and order date"""
        return f"Order #{self.id} - {self.user.username} - {self.created_at.date()}"
    
    class Meta:
        ordering = ['-created_at']  # Newest orders first


class OrderItem(models.Model):
    """
    OrderItem model - stores individual items in an order.
    One Order can have multiple OrderItems (one for each food item ordered).
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')  # Which order
    food = models.ForeignKey(FoodItem, on_delete=models.CASCADE)  # Which food item
    quantity = models.PositiveIntegerField()  # How many ordered
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of order
    
    def __str__(self):
        """String representation"""
        return f"{self.order.id} - {self.food.name} x{self.quantity}"

