"""
URL configuration for API app.
This file maps URLs to our API views.
"""
from django.urls import path
from . import views

urlpatterns = [
    # User authentication
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    
    # Food items
    path('foods/', views.food_list, name='food_list'),
    
    # Cart operations
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/', views.cart_add, name='cart_add'),
    path('cart/update/<int:item_id>/', views.cart_update, name='cart_update'),
    
    # Orders
    path('order/create/', views.create_order, name='create_order'),
]





