# 🚀 Quick Start Guide

Get your Food Delivery website running in 10 minutes!

## Prerequisites Check

Before starting, make sure you have:
- ✅ Python 3.8+ installed (`python --version`)
- ✅ Node.js 16+ installed (`node --version`)
- ✅ npm installed (comes with Node.js)

## Step-by-Step Setup

### 1️⃣ Backend Setup (Terminal 1)

```bash
# Go to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt

# Create database tables
python manage.py migrate

# Create admin user (optional but recommended)
python manage.py createsuperuser
# Enter username, email, and password when prompted

# Add sample food items
python manage.py create_sample_foods

# Start the server
python manage.py runserver
```

✅ **Backend is running!** You should see:
```
Starting development server at http://127.0.0.1:8000/
```

### 2️⃣ Frontend Setup (Terminal 2)

**Open a NEW terminal window** and run:

```bash
# Go to frontend folder
cd frontend

# Install packages (this takes 2-3 minutes)
npm install

# Start development server
npm run dev
```

✅ **Frontend is running!** You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 3️⃣ Open the Website

1. Open your browser
2. Go to **http://localhost:5173**
3. You should see the Food Delivery homepage!

## First Steps in the App

1. **Register an Account**
   - Click "Register" in the top right
   - Fill in username, email, and password
   - Click "Register"
   - You'll be automatically logged in

2. **Browse Food Items**
   - Home page shows all available food items
   - Click on any food item to see details

3. **Add to Cart**
   - On a food details page, select quantity
   - Click "Add to Cart"
   - You must be logged in

4. **View Cart**
   - Click "Cart 🛒" in the navbar
   - Update quantities or remove items
   - Click "Place Order" when ready

5. **Place Order**
   - Review your cart
   - Click "Place Order"
   - See order confirmation

## Adding Food Images (Optional)

Food items are created without images. To add images:

1. Go to **http://127.0.0.1:8000/admin/**
2. Login with your superuser credentials
3. Click "Food Items" under API section
4. Click on a food item to edit
5. Upload an image in the "Image" field
6. Click "Save"

**Tip**: Download free food images from:
- Unsplash: https://unsplash.com/s/photos/food
- Pexels: https://www.pexels.com/search/food/

## Common Issues & Solutions

### ❌ "ModuleNotFoundError: No module named 'django'"
**Solution**: Make sure virtual environment is activated. You should see `(venv)` in your terminal prompt.

### ❌ "Port 8000 already in use"
**Solution**: Stop other Django servers or use a different port:
```bash
python manage.py runserver 8001
```

### ❌ "Port 5173 already in use"
**Solution**: Vite will automatically use the next available port, or change it in `vite.config.js`

### ❌ "Cannot connect to API" or CORS error
**Solution**: 
- Make sure Django server is running on port 8000
- Check browser console for specific error
- Verify backend URL in `frontend/src/api/api.js`

### ❌ Images not showing
**Solution**: 
- Upload images through Django admin
- Check that `media` folder exists in backend directory
- Verify image paths in database

### ❌ "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can see homepage with food items
- [ ] Can register a new account
- [ ] Can login with credentials
- [ ] Can view food details
- [ ] Can add items to cart (when logged in)
- [ ] Can view cart
- [ ] Can update cart quantities
- [ ] Can remove items from cart
- [ ] Can place an order
- [ ] See order success page

## What's Next?

Once everything is working:

1. ✅ **Read the README.md** - Detailed documentation
2. ✅ **Check API_EXAMPLES.md** - See all API endpoints
3. ✅ **Read PROJECT_SUMMARY.md** - Understand the architecture
4. ✅ **Add food images** - Make it look better!
5. ✅ **Customize the UI** - Change colors, add more styles
6. ✅ **Add new features** - Search, filters, categories, etc.

## Need More Help?

- Check **README.md** for detailed explanations
- Review **API_EXAMPLES.md** for API testing
- Read **PROJECT_SUMMARY.md** to understand the code structure

## Project Structure Quick Reference

```
food-delivery/
├── backend/          ← Django API server
│   ├── api/         ← Main app code
│   ├── manage.py    ← Django commands
│   └── requirements.txt
│
└── frontend/        ← React website
    ├── src/        ← React code
    └── package.json
```

## Commands Cheat Sheet

### Backend Commands
```bash
python manage.py runserver          # Start server
python manage.py migrate            # Update database
python manage.py createsuperuser    # Create admin
python manage.py create_sample_foods # Add sample data
```

### Frontend Commands
```bash
npm install    # Install packages
npm run dev    # Start dev server
npm run build  # Build for production
```

---

**🎉 You're all set! Happy coding!**







