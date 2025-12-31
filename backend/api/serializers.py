"""
Serializers convert our database models to JSON format for the API.
They also validate data when creating/updating items.
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import FoodItem, CartItem, Order, OrderItem


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model - converts user data to/from JSON.
    Used when registering a new user.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}  # Don't show password in response
    
    def create(self, validated_data):
        """Create a new user with encrypted password"""
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class FoodItemSerializer(serializers.ModelSerializer):
    """
    Serializer for FoodItem model.
    Returns food item data with image URL.
    """
    image = serializers.SerializerMethodField()  # Use method to handle image URL
    
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'description', 'price', 'image', 'created_at']
    
    def get_image(self, obj):
        """
        Return image URL if image exists, otherwise return None.
        """
        if obj.image:
            # Return relative path - will be converted to absolute in view
            return obj.image.url
        return None


class CartItemSerializer(serializers.ModelSerializer):
    """
    Serializer for CartItem model.
    Includes food item details in the response.
    """
    food = FoodItemSerializer(read_only=True)  # Include full food details
    food_id = serializers.IntegerField(write_only=True)  # For creating cart items
    
    class Meta:
        model = CartItem
        fields = ['id', 'food', 'food_id', 'quantity', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for OrderItem model.
    Includes food item details in the response.
    """
    food = FoodItemSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'food', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Order model.
    Includes all order items in the response.
    """
    items = OrderItemSerializer(many=True, read_only=True)  # All items in this order
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'created_at', 'items']







