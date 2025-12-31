# 🚀 Deployment Guide - QuickBite Food Delivery

## Backend & Frontend Connection Setup

### ✅ Changes Made

1. **Backend API Root Endpoint** - Added `/api/` endpoint that shows API status
2. **Health Check Endpoint** - Added `/api/health/` for monitoring
3. **CORS Configuration** - Properly configured for production
4. **Image URL Handling** - Fixed image URLs to work in production
5. **Media Files Serving** - Configured to serve media files in production

### 🔗 URLs

- **Backend API**: `https://quickbite-food-delivery-1.onrender.com/api`
- **Frontend**: `https://quickbite-food-delivery-1.onrender.com` (if deployed separately)

### 📋 Backend Deployment on Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Build Settings**:
   - **Build Command**: `cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - **Start Command**: `cd backend && gunicorn fooddelivery.wsgi:application`
4. **Environment Variables**:
   ```
   DEBUG=False
   SECRET_KEY=your-secret-key-here
   ```
5. **Static Files**: Render will automatically serve static files via WhiteNoise

### 📋 Frontend Deployment on Render

1. **Create a new Static Site** on Render (or Web Service)
2. **Build Settings**:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
3. **Environment Variables** (Optional):
   ```
   VITE_BACKEND_URL=https://quickbite-food-delivery-1.onrender.com/api
   ```

### ✅ Testing the Connection

1. **Test Backend Root**: 
   - Visit: `https://quickbite-food-delivery-1.onrender.com/api`
   - Should see: `{"message": "QuickBite Food Delivery API is running!", ...}`

2. **Test Health Check**:
   - Visit: `https://quickbite-food-delivery-1.onrender.com/api/health/`
   - Should see: `{"status": "healthy", "message": "API is operational"}`

3. **Test Foods Endpoint**:
   - Visit: `https://quickbite-food-delivery-1.onrender.com/api/foods/`
   - Should see: Array of food items

### 🔧 Troubleshooting

#### "Not Found" Error on `/api/`
- ✅ **Fixed**: Added root API endpoint that returns API information
- The endpoint now shows available API endpoints

#### CORS Errors
- ✅ **Fixed**: Added frontend URL to `CORS_ALLOWED_ORIGINS`
- Make sure your frontend URL is in the list in `backend/fooddelivery/settings.py`

#### Images Not Loading
- ✅ **Fixed**: Updated all image URL functions to use proper backend URL
- Images now work in both development and production

#### Backend Not Responding
- Check Render logs for errors
- Make sure `ALLOWED_HOSTS` includes your Render domain
- Verify environment variables are set correctly

### 📝 Important Notes

1. **Database**: SQLite is used by default. For production, consider PostgreSQL
2. **Media Files**: Currently served through Django. For better performance, use Cloudinary or AWS S3
3. **Static Files**: Handled by WhiteNoise automatically
4. **HTTPS**: Render handles HTTPS automatically

### 🎯 Next Steps

1. Deploy backend to Render
2. Deploy frontend to Render (or Vercel/Netlify)
3. Test all endpoints
4. Add food items via Django admin
5. Test the full flow: Register → Login → Browse → Add to Cart → Order

---

**Happy Deploying! 🚀**

