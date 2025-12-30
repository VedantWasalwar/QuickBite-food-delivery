# 🍕 Food Delivery E-commerce Website

A beginner-friendly full-stack food delivery website built with React (Vite) and Django REST Framework. This project demonstrates how to build a complete e-commerce application with user authentication, shopping cart, and order management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Adding Food Images](#adding-food-images)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Frontend
- 🏠 **Home Page**: Browse all available food items
- 🍔 **Food Details Page**: View detailed information about each food item
- 🛒 **Shopping Cart**: Add, update quantities, and remove items
- 👤 **User Authentication**: Register and login functionality
- ✅ **Order Success Page**: Confirmation after placing an order
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop

### Backend
- 🔐 **Token Authentication**: Secure user authentication
- 🍕 **Food Management**: CRUD operations for food items
- 🛒 **Cart Management**: Add, update, and remove cart items
- 📦 **Order Processing**: Create orders from cart items
- 🖼️ **Image Upload**: Support for food item images

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - RESTful API framework
- **SQLite** - Database (default, easy to use)
- **Token Authentication** - Simple authentication method
- **Pillow** - Image processing library

## 📁 Project Structure

```
food-delivery/
├── backend/                 # Django backend
│   ├── api/                # API app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views (endpoints)
│   │   ├── serializers.py  # Data serialization
│   │   ├── urls.py         # API URLs
│   │   └── management/     # Management commands
│   ├── fooddelivery/       # Django project settings
│   ├── media/              # Uploaded images (created at runtime)
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── context/        # React Context (Auth)
    │   ├── api/            # API service functions
    │   └── App.jsx         # Main app component
    ├── package.json        # Node dependencies
    └── vite.config.js      # Vite configuration
```

## 🚀 Setup Instructions

### Prerequisites

Before starting, make sure you have installed:
- **Python 3.8+** (check with `python --version`)
- **Node.js 16+** (check with `node --version`)
- **npm** or **yarn** (comes with Node.js)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (optional, for admin access)
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create an admin account.

6. **Create sample food items**
   ```bash
   python manage.py create_sample_foods
   ```
   This creates 8 sample food items without images.

7. **Start the Django development server**
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000/api/
- **Django Admin**: http://127.0.0.1:8000/admin/ (use superuser credentials)

## 🔌 API Endpoints

All API endpoints are prefixed with `/api/`

### Authentication
- `POST /api/register/` - Register a new user
  ```json
  {
    "username": "john",
    "email": "john@example.com",
    "password": "secret123"
  }
  ```

- `POST /api/login/` - Login user
  ```json
  {
    "username": "john",
    "password": "secret123"
  }
  ```

### Food Items
- `GET /api/foods/` - Get all food items (no auth required)

### Cart Operations
- `GET /api/cart/` - Get user's cart (requires auth)
- `POST /api/cart/add/` - Add item to cart (requires auth)
  ```json
  {
    "food_id": 1,
    "quantity": 2
  }
  ```
- `PUT /api/cart/update/{item_id}/` - Update cart item quantity (requires auth)
  ```json
  {
    "quantity": 3
  }
  ```
- `DELETE /api/cart/update/{item_id}/` - Remove item from cart (requires auth)

### Orders
- `POST /api/order/create/` - Create order from cart (requires auth)

### Sample API Response

**GET /api/foods/**
```json
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato sauce...",
    "price": "12.99",
    "image": "/media/food_images/pizza.jpg",
    "created_at": "2024-01-01T12:00:00Z"
  }
]
```

## 🖼️ Adding Food Images

### Method 1: Using Django Admin (Easiest)

1. Start the Django server and go to http://127.0.0.1:8000/admin/
2. Login with your superuser credentials
3. Click on "Food Items" under API section
4. Click on a food item to edit it
5. Upload an image in the "Image" field
6. Click "Save"

### Method 2: Using Command Line

1. Place your food images in `backend/media/food_images/`
2. Use Django shell to update food items:
   ```bash
   python manage.py shell
   ```
   ```python
   from api.models import FoodItem
   food = FoodItem.objects.get(id=1)
   food.image = 'food_images/pizza-margherita.jpg'
   food.save()
   ```

### Image Recommendations

- **Format**: JPG or PNG
- **Size**: 300x300px to 600x600px (square images work best)
- **Naming**: Use descriptive names like `pizza-margherita.jpg`, `burger-deluxe.png`

### Sample Image Sources

You can download free food images from:
- Unsplash (https://unsplash.com/s/photos/food)
- Pexels (https://www.pexels.com/search/food/)
- Pixabay (https://pixabay.com/images/search/food/)

## 🧪 Testing the Application

1. **Register a new account**
   - Go to http://localhost:5173/register
   - Fill in username, email, and password
   - Click Register

2. **Browse food items**
   - Home page shows all available food items
   - Click on any item to see details

3. **Add items to cart**
   - On food details page, select quantity
   - Click "Add to Cart"
   - You need to be logged in

4. **View and manage cart**
   - Click "Cart" in navbar
   - Update quantities or remove items
   - View total price

5. **Place an order**
   - In cart page, click "Place Order"
   - You'll be redirected to order success page

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'django'`
- **Solution**: Make sure virtual environment is activated and dependencies are installed

**Problem**: `OperationalError: no such table`
- **Solution**: Run `python manage.py migrate`

**Problem**: Images not displaying
- **Solution**: Check that `MEDIA_ROOT` and `MEDIA_URL` are correctly set in settings.py

### Frontend Issues

**Problem**: `Cannot connect to API`
- **Solution**: Make sure Django server is running on port 8000

**Problem**: `CORS error`
- **Solution**: Check that `CORS_ALLOWED_ORIGINS` in settings.py includes `http://localhost:5173`

**Problem**: `Token authentication failed`
- **Solution**: Make sure you're logged in and token is stored in localStorage

### Common Issues

**Port already in use**
- Django: Change port with `python manage.py runserver 8001`
- Vite: Change port in `vite.config.js` or use `npm run dev -- --port 5174`

**Database locked (SQLite)**
- Make sure only one Django server instance is running

## 📝 Code Explanation for Beginners

### How Authentication Works

1. User registers/logs in → Backend returns a token
2. Token is stored in browser's localStorage
3. Token is sent with every API request in the `Authorization` header
4. Backend validates the token to identify the user

### How Cart Works

1. Cart items are stored in the database (not just in browser)
2. Each cart item links a user to a food item with a quantity
3. When user adds to cart, we create/update a CartItem record
4. Cart persists even if user closes the browser

### How Orders Work

1. User clicks "Place Order" → Frontend calls `/api/order/create/`
2. Backend creates an Order record with total price
3. Backend creates OrderItem records for each cart item
4. Backend clears the user's cart
5. User sees order confirmation

## 🎓 Learning Resources

- **React**: https://react.dev/
- **Django**: https://www.djangoproject.com/
- **Django REST Framework**: https://www.django-rest-framework.org/
- **Tailwind CSS**: https://tailwindcss.com/

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a beginner-friendly project. Feel free to:
- Add more features
- Improve the UI/UX
- Fix bugs
- Add more food items
- Enhance error handling

## 💡 Future Enhancements

Some ideas to expand this project:
- User profile page
- Order history page
- Payment integration
- Search and filter food items
- Reviews and ratings
- Admin dashboard for managing orders
- Email notifications
- Multiple restaurants/categories

---

**Happy Coding! 🚀**

If you encounter any issues, check the troubleshooting section or review the error messages in the browser console and terminal.



