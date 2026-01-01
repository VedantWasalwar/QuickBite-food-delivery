# 🔗 Backend Render URL Configuration Guide

This guide explains how to configure and update the backend Render URL for your Food Delivery application.

## Current Backend URL

**Production Backend URL**: `https://quickbite-food-delivery-1.onrender.com`

**API Endpoint**: `https://quickbite-food-delivery-1.onrender.com/api`

**Admin Panel**: `https://quickbite-food-delivery-1.onrender.com/admin/`

## Configuration Files

### 1. Frontend Configuration (`frontend/src/api/api.js`)

The frontend automatically detects the backend URL using this priority:

1. **Environment Variable** (`VITE_BACKEND_URL`) - Highest priority
2. **Development Mode** - Uses `http://127.0.0.1:8000/api`
3. **Production Mode** - Uses `https://quickbite-food-delivery-1.onrender.com/api`

### 2. Backend Configuration (`backend/fooddelivery/settings.py`)

The backend is configured with:
- **ALLOWED_HOSTS**: Includes `quickbite-food-delivery-1.onrender.com`
- **CORS_ALLOWED_ORIGINS**: Includes the backend URL for CORS

## How to Update Backend URL

### Option 1: Using Environment Variables (Recommended)

#### For Frontend:

1. **Create `.env` file** in `frontend/` directory:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Edit `.env` file**:
   ```
   VITE_BACKEND_URL=https://your-new-backend-url.onrender.com/api
   ```

3. **Restart frontend**:
   ```bash
   npm run dev
   ```

#### For Backend:

1. **Update `ALLOWED_HOSTS`** in `backend/fooddelivery/settings.py`:
   ```python
   ALLOWED_HOSTS = [
       "localhost",
       "127.0.0.1",
       "your-new-backend-url.onrender.com",
   ]
   ```

2. **Update `CORS_ALLOWED_ORIGINS`** in `backend/fooddelivery/settings.py`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:5173",
       "http://127.0.0.1:5173",
       "https://your-new-backend-url.onrender.com",
   ]
   ```

3. **Redeploy backend** on Render

### Option 2: Direct Code Update

#### Update Frontend API URL:

Edit `frontend/src/api/api.js`:

```javascript
// Change line 23
return "https://your-new-backend-url.onrender.com/api";
```

And line 36:
```javascript
return "https://your-new-backend-url.onrender.com";
```

#### Update Backend Settings:

Edit `backend/fooddelivery/settings.py`:
- Update `ALLOWED_HOSTS` (line 24)
- Update `CORS_ALLOWED_ORIGINS` (line 130)

## Render Deployment Configuration

### Using `render.yaml` (Recommended)

1. **Update `render.yaml`** with your new backend URL:
   ```yaml
   - key: ALLOWED_HOSTS
     value: your-new-backend-url.onrender.com
   ```

2. **Deploy via Render Dashboard**:
   - Connect your GitHub repository
   - Render will automatically use `render.yaml` configuration

### Manual Render Configuration

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your backend service**
3. **Go to Environment tab**
4. **Add/Update environment variables**:
   - `ALLOWED_HOSTS`: `your-new-backend-url.onrender.com`
   - `DEBUG`: `False`
   - `SECRET_KEY`: (your secret key)

## Testing the Configuration

### 1. Test Backend API

```bash
# Test API root
curl https://your-backend-url.onrender.com/api

# Test health check
curl https://your-backend-url.onrender.com/api/health/

# Test foods endpoint
curl https://your-backend-url.onrender.com/api/foods/
```

### 2. Test Frontend Connection

1. **Open browser console** (F12)
2. **Check API URL**:
   ```javascript
   console.log("API URL:", import.meta.env.VITE_BACKEND_URL || "Using default")
   ```
3. **Test API call**:
   - Try logging in or fetching foods
   - Check Network tab for API requests

## Common Issues & Solutions

### Issue 1: CORS Errors

**Solution**: Make sure your frontend URL is in `CORS_ALLOWED_ORIGINS` in `backend/fooddelivery/settings.py`

### Issue 2: "DisallowedHost" Error

**Solution**: Add your Render domain to `ALLOWED_HOSTS` in `backend/fooddelivery/settings.py`

### Issue 3: Frontend Not Connecting to Backend

**Solution**: 
- Check `.env` file exists and has correct `VITE_BACKEND_URL`
- Restart frontend dev server
- Clear browser cache

### Issue 4: Environment Variable Not Working

**Solution**:
- Make sure variable name starts with `VITE_` (required for Vite)
- Restart dev server after changing `.env`
- Check `.env` file is in `frontend/` directory

## Quick Reference

### Current URLs

| Service | URL |
|---------|-----|
| Backend API | `https://quickbite-food-delivery-1.onrender.com/api` |
| Backend Base | `https://quickbite-food-delivery-1.onrender.com` |
| Admin Panel | `https://quickbite-food-delivery-1.onrender.com/admin/` |
| Health Check | `https://quickbite-food-delivery-1.onrender.com/api/health/` |

### Files to Update When Changing URL

1. ✅ `frontend/.env` (or `frontend/src/api/api.js`)
2. ✅ `backend/fooddelivery/settings.py` (ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS)
3. ✅ `render.yaml` (if using)
4. ✅ Render Dashboard environment variables

## Environment Variables Reference

### Frontend (`.env`)

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api
```

### Backend (Render Dashboard)

```
DEBUG=False
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-backend-url.onrender.com
PYTHON_VERSION=3.11.0
```

---

**Last Updated**: Configuration supports both environment variables and hardcoded URLs for maximum flexibility.

