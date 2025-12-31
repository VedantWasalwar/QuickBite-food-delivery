# 🔧 Render Deployment Fix - "Not Found" Error Solution

## Problem
जब आप `https://quickbite-food-delivery-1.onrender.com/api` को open करते हैं, तो "Not Found" error आता है।

## Solution Steps

### Step 1: Render Dashboard पर जाएं
1. https://dashboard.render.com पर login करें
2. अपनी backend service select करें

### Step 2: Service को Manual Deploy करें
1. Service settings में जाएं
2. "Manual Deploy" button click करें
3. "Deploy latest commit" select करें
4. Deploy start हो जाएगा

### Step 3: Build Settings Verify करें

Render service settings में ये settings होनी चाहिए:

**Build Command:**
```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput
```

**Start Command:**
```bash
cd backend && gunicorn fooddelivery.wsgi:application
```

**OR use the build script:**
```bash
cd backend && chmod +x build.sh && ./build.sh && gunicorn fooddelivery.wsgi:application
```

### Step 4: Environment Variables Check करें

Render dashboard में Environment Variables section में:

```
DEBUG=False
SECRET_KEY=your-secret-key-here (कम से कम 50 characters)
```

### Step 5: Logs Check करें

1. Render dashboard में "Logs" tab पर जाएं
2. Check करें कि कोई error तो नहीं है
3. Common errors:
   - `ModuleNotFoundError` - dependencies install नहीं हुईं
   - `ALLOWED_HOSTS` error - domain name check करें
   - Database errors - migrations run करें

### Step 6: Test करें

Deploy complete होने के बाद:

1. **API Root**: `https://quickbite-food-delivery-1.onrender.com/api`
   - Should show: `{"message": "QuickBite Food Delivery API is running!", ...}`

2. **Health Check**: `https://quickbite-food-delivery-1.onrender.com/api/health/`
   - Should show: `{"status": "healthy"}`

3. **Foods**: `https://quickbite-food-delivery-1.onrender.com/api/foods/`
   - Should show: Array of food items

## Common Issues & Fixes

### Issue 1: "Not Found" Error
**Cause**: Backend service properly deploy नहीं हुआ या URLs configure नहीं हैं

**Fix**:
- Service को restart करें
- Build logs check करें
- Verify करें कि `backend/api/urls.py` में root endpoint है

### Issue 2: CORS Errors
**Cause**: Frontend URL CORS में add नहीं है

**Fix**: 
- `backend/fooddelivery/settings.py` में frontend URL check करें
- Render पर frontend URL add करें

### Issue 3: Static Files Not Loading
**Cause**: Static files collect नहीं हुए

**Fix**:
- Build command में `python manage.py collectstatic --noinput` add करें

### Issue 4: Database Errors
**Cause**: Migrations run नहीं हुईं

**Fix**:
- Build command में `python manage.py migrate` add करें

## Quick Fix Commands

अगर आप Render dashboard से directly commands run कर सकते हैं:

```bash
# Dependencies install
cd backend
pip install -r requirements.txt

# Static files collect
python manage.py collectstatic --noinput

# Migrations run
python manage.py migrate

# Server start (for testing)
python manage.py runserver 0.0.0.0:8000
```

## Verification Checklist

- [ ] Backend service Render पर deployed है
- [ ] Build command सही है
- [ ] Start command सही है
- [ ] Environment variables set हैं
- [ ] Latest code GitHub से pull हुआ है
- [ ] Logs में कोई error नहीं है
- [ ] `/api/` endpoint respond कर रहा है
- [ ] `/api/health/` endpoint respond कर रहा है

## Still Not Working?

अगर अभी भी problem है:

1. **Render Support**: Render dashboard में support ticket open करें
2. **Logs Share**: Error logs share करें
3. **Service Restart**: Service को completely restart करें
4. **Fresh Deploy**: Service delete करके फिर से create करें

---

**Note**: Render free tier पर services sleep हो जाती हैं। पहली request slow हो सकती है (cold start)।

