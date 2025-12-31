"""
Admin configuration - customize Django admin panel.
This lets us manage food items, orders, etc. from the admin interface.
"""
from django.contrib import admin
from .models import FoodItem, CartItem, Order, OrderItem


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    """Admin view for FoodItem model"""
    list_display = ['name', 'price', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    """Admin view for CartItem model"""
    list_display = ['user', 'food', 'quantity', 'created_at']
    list_filter = ['created_at']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    """Admin view for Order model"""
    list_display = ['id', 'user', 'total_price', 'created_at']
    list_filter = ['created_at']
    readonly_fields = ['created_at']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    """Admin view for OrderItem model"""
    list_display = ['order', 'food', 'quantity', 'price']





