"""
API Views - handle HTTP requests and return JSON responses.
These views define what happens when frontend calls our API endpoints.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import FoodItem, CartItem, Order, OrderItem
from .serializers import (
    UserSerializer, FoodItemSerializer, CartItemSerializer,
    OrderSerializer, OrderItemSerializer
)


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    Root API endpoint - shows API is working and lists available endpoints.
    GET /api/
    """
    return Response({
        'message': 'QuickBite Food Delivery API is running!',
        'status': 'success',
        'endpoints': {
            'health': '/api/health/',
            'register': '/api/register/',
            'login': '/api/login/',
            'foods': '/api/foods/',
            'cart': '/api/cart/',
            'cart_add': '/api/cart/add/',
            'order_create': '/api/order/create/',
        },
        'version': '1.0.0'
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint for monitoring.
    GET /api/health/
    """
    return Response({
        'status': 'healthy',
        'message': 'API is operational'
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register a new user.
    POST /api/register/
    Body: {"username": "john", "email": "john@example.com", "password": "secret123"}
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Create token for the new user
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Login an existing user.
    POST /api/login/
    Body: {"username": "john", "password": "secret123"}
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        # Authenticate user
        user = authenticate(username=username, password=password)
        if user:
            # Get or create token
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid username or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    return Response(
        {'error': 'Username and password required'},
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def food_list(request):
    """
    Get list of all food items.
    GET /api/foods/
    No authentication required (anyone can see the menu).
    """
    try:
        foods = FoodItem.objects.all()
        serializer = FoodItemSerializer(foods, many=True)
        
        # Update image URLs to include full path
        data = serializer.data
        for item in data:
            if item.get('image'):
                # If image path is relative, make it absolute
                if item['image'] and not item['image'].startswith('http'):
                    request_scheme = 'https' if request.is_secure() else 'http'
                    item['image'] = f"{request_scheme}://{request.get_host()}{item['image']}"
        
        return Response(data)
    except Exception as e:
        # Log error for debugging
        import traceback
        print(f"Error in food_list: {str(e)}")
        print(traceback.format_exc())
        return Response(
            {'error': 'Failed to retrieve food items', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_view(request):
    """
    Get current user's cart items.
    GET /api/cart/
    Requires authentication (user must be logged in).
    """
    try:
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        
        # Calculate total price
        total = sum(item.food.price * item.quantity for item in cart_items)
        
        return Response({
            'items': serializer.data,
            'total': float(total)
        })
    except Exception as e:
        import traceback
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error in cart_view: {str(e)}")
        logger.error(traceback.format_exc())
        return Response(
            {'error': 'Failed to retrieve cart', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cart_add(request):
    """
    Add a food item to cart.
    POST /api/cart/add/
    Body: {"food_id": 1, "quantity": 2}
    """
    food_id = request.data.get('food_id')
    quantity = request.data.get('quantity', 1)
    
    try:
        food = FoodItem.objects.get(id=food_id)
    except FoodItem.DoesNotExist:
        return Response(
            {'error': 'Food item not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Get or create cart item (if exists, update quantity)
    cart_item, created = CartItem.objects.get_or_create(
        user=request.user,
        food=food,
        defaults={'quantity': quantity}
    )
    
    if not created:
        # Item already in cart, increase quantity
        cart_item.quantity += quantity
        cart_item.save()
    
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def cart_update(request, item_id):
    """
    Update or delete a cart item.
    PUT /api/cart/update/{item_id}/ - Update quantity
    DELETE /api/cart/update/{item_id}/ - Remove item
    """
    try:
        cart_item = CartItem.objects.get(id=item_id, user=request.user)
    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method == 'PUT':
        # Update quantity
        new_quantity = request.data.get('quantity')
        if new_quantity and new_quantity > 0:
            cart_item.quantity = new_quantity
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data)
        return Response(
            {'error': 'Invalid quantity'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    elif request.method == 'DELETE':
        # Remove item from cart
        cart_item.delete()
        return Response(
            {'message': 'Item removed from cart'},
            status=status.HTTP_204_NO_CONTENT
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    """
    Create an order from current cart.
    POST /api/order/create/
    This will create an order with all items in the user's cart and clear the cart.
    """
    try:
        cart_items = CartItem.objects.filter(user=request.user)
        
        if not cart_items.exists():
            return Response(
                {'error': 'Cart is empty'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Calculate total price
        total_price = sum(item.food.price * item.quantity for item in cart_items)
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            total_price=total_price
        )
        
        # Create order items from cart items
        order_items = []
        for cart_item in cart_items:
            order_item = OrderItem.objects.create(
                order=order,
                food=cart_item.food,
                quantity=cart_item.quantity,
                price=cart_item.food.price
            )
            order_items.append(order_item)
        
        # Clear cart after creating order
        cart_items.delete()
        
        # Return order details
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        import traceback
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error in create_order: {str(e)}")
        logger.error(traceback.format_exc())
        return Response(
            {'error': 'Failed to create order', 'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )







