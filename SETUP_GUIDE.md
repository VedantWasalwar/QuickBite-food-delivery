# Quick Setup Guide

Follow these steps to get the Food Delivery website running quickly!

## Step 1: Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Create virtual environment (Mac/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Create admin user (optional - for accessing admin panel)
python manage.py createsuperuser

# Create sample food items
python manage.py create_sample_foods

# Start server
python manage.py runserver
```

✅ Backend should now be running on http://127.0.0.1:8000

## Step 2: Frontend Setup (3 minutes)

Open a **NEW terminal window** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies (this may take 2-3 minutes)
npm install

# Start development server
npm run dev
```

✅ Frontend should now be running on http://localhost:5173

## Step 3: Add Food Images (Optional)

1. Go to http://127.0.0.1:8000/admin/
2. Login with your superuser credentials
3. Click "Food Items"
4. Click on each food item
5. Upload an image
6. Click "Save"

**Tip**: Download free food images from Unsplash or Pexels!

## Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Register" to create an account
3. Browse food items on the home page
4. Click on a food item to see details
5. Add items to cart
6. Go to cart and place an order

## Common Commands

### Backend
- Start server: `python manage.py runserver`
- Create migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`
- Access Django shell: `python manage.py shell`

### Frontend
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Troubleshooting

**"Module not found" error**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

**"Port already in use"**
- Django: `python manage.py runserver 8001`
- Vite: Check `vite.config.js` for port settings

**"Cannot connect to API"**
- Make sure Django server is running
- Check that backend is on port 8000
- Check browser console for CORS errors

**Images not showing**
- Make sure you uploaded images through admin panel
- Check that `media` folder exists in backend directory
- Verify image path in database

## Need Help?

Check the main README.md for detailed documentation and explanations!












