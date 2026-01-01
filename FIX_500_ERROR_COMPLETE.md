# 🔧 Complete Fix for 500 Server Error - Step by Step

## Problem
500 Server Error बार-बार आ रहा है जब आप API endpoints को call करते हैं।

## Root Causes & Solutions

### 1. Database Migrations Not Run ⚠️ (Most Common - 90% cases)

**Problem**: Database tables create नहीं हुईं

**Solution**: Build command में migrations add करें

**Render Build Command (Copy-Paste यही use करें):**
```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

**Verify करें:**
- Render logs में "Running migrations..." दिखना चाहिए
- "Operations to perform:" दिखना चाहिए
- "Applying api.0001_initial... OK" दिखना चाहिए

### 2. Database File Missing

**Problem**: SQLite database file (`db.sqlite3`) create नहीं हुआ

**Solution**: 
- Build command में `migrate` command जरूर होनी चाहिए
- Render logs check करें

### 3. Missing Dependencies

**Problem**: Python packages install नहीं हुईं

**Solution**: 
- `requirements.txt` verify करें
- Build logs में check करें कि सभी packages install हुईं

### 4. Static Files Not Collected

**Problem**: Static files collect नहीं हुए

**Solution**: Build command में `collectstatic` add करें

### 5. Code Errors

**Problem**: Code में syntax errors या runtime errors

**Solution**: ✅ **FIXED** - Error handling add की गई है

## Complete Step-by-Step Fix

### Step 1: Render Dashboard पर जाएं
1. https://dashboard.render.com पर login करें
2. Backend service (quickbite-food-delivery-1) select करें

### Step 2: Build Command Update करें (IMPORTANT!)

**Service Settings → Build Command:**

```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

**⚠️ Important**: 
- `migrate --noinput` जरूर add करें
- यह database tables create करेगा
- बिना इसके 500 error आएगा

### Step 3: Start Command Verify करें

**Start Command:**
```bash
cd backend && gunicorn fooddelivery.wsgi:application
```

### Step 4: Environment Variables Check करें

**Environment Variables:**
```
DEBUG=False
SECRET_KEY=your-strong-secret-key-here (minimum 50 characters, use random string)
```

**⚠️ Important**: 
- `SECRET_KEY` strong होनी चाहिए
- कम से कम 50 characters
- Random string use करें

### Step 5: Manual Deploy करें
1. "Manual Deploy" button click करें
2. "Deploy latest commit" select करें
3. Wait for build to complete (2-5 minutes)

### Step 6: Logs Check करें (CRITICAL!)

**Render Dashboard → Logs Tab:**

Check करें:

✅ **Success Indicators:**
```
Running migrations...
Operations to perform:
  Apply all migrations: admin, api, auth, authtoken, contenttypes, sessions
Applying api.0001_initial... OK
Collecting static files...
Build successful
```

❌ **Error Indicators:**
```
no such table: api_fooditem
ModuleNotFoundError
Permission denied
```

### Step 7: Test करें

Deploy complete होने के बाद:

1. **API Root**: `https://quickbite-food-delivery-1.onrender.com/api`
   - Should show: `{"message": "QuickBite Food Delivery API is running!", ...}`

2. **Foods Endpoint**: `https://quickbite-food-delivery-1.onrender.com/api/foods/`
   - Should show: `[]` (empty array) या food items
   - **NOT** 500 error

3. **Health Check**: `https://quickbite-food-delivery-1.onrender.com/api/health/`
   - Should show: `{"status": "healthy"}`

## Debugging 500 Errors

### Method 1: Check Render Logs (Best Method)

1. Render Dashboard → Logs tab
2. Scroll down to latest errors
3. Error message copy करें
4. Error type identify करें

### Method 2: Enable DEBUG Mode (Temporary)

**⚠️ Warning**: Production में DEBUG=True नहीं रखना चाहिए, सिर्फ debugging के लिए

**Environment Variable:**
```
DEBUG=True
```

**Then redeploy** - अब detailed error messages दिखेंगी

**After debugging, change back to:**
```
DEBUG=False
```

### Method 3: Test Individual Endpoints

Test करें:
- `/api/` - Root endpoint
- `/api/health/` - Health check
- `/api/foods/` - Foods list
- `/api/register/` - Register (POST)
- `/api/login/` - Login (POST)

## Common Error Messages & Fixes

### Error: "no such table: api_fooditem"
**Cause**: Migrations run नहीं हुईं

**Fix**: 
```bash
# Add to build command:
python manage.py migrate --noinput
```

### Error: "ModuleNotFoundError: No module named 'xxx'"
**Cause**: Dependencies install नहीं हुईं

**Fix**: 
```bash
# Verify requirements.txt
# Check build logs
pip install -r requirements.txt
```

### Error: "OperationalError: database is locked"
**Cause**: SQLite database lock हो गई

**Fix**: 
- Service restart करें
- या PostgreSQL use करें (better for production)

### Error: "CSRF verification failed"
**Cause**: CSRF token issue

**Fix**: 
- API calls में CSRF token include करें
- या CSRF exempt endpoints use करें (already done)

### Error: "Permission denied"
**Cause**: File permissions issue

**Fix**: 
- Render automatically handle करता है
- अगर problem है, service restart करें

## Code Changes Made (Already Fixed)

✅ **Error Handling**: सभी views में try-catch blocks add किए
✅ **Logging**: Better error logging configured
✅ **Image Serialization**: Image URL handling fixed
✅ **Global Exception Handler**: Middleware add किया (optional)

## Verification Checklist

Before deploying, verify:

- [ ] Build command में `migrate --noinput` है
- [ ] Build command में `collectstatic --noinput` है
- [ ] Start command सही है
- [ ] Environment variables set हैं
- [ ] `SECRET_KEY` strong है (50+ characters)
- [ ] Latest code GitHub पर push हुआ है
- [ ] Render service latest code pull कर रही है

After deploying, verify:

- [ ] Build successful हुआ
- [ ] Migrations run हुईं (logs में check करें)
- [ ] Static files collect हुए
- [ ] Service running है
- [ ] `/api/` endpoint respond कर रहा है
- [ ] `/api/foods/` endpoint respond कर रहा है (500 नहीं आ रहा)
- [ ] Logs में कोई error नहीं है

## Still Getting 500 Error?

### Step 1: Get Exact Error
1. Render logs में exact error message copy करें
2. Error type identify करें
3. Error message share करें

### Step 2: Common Fixes

**If "no such table" error:**
```bash
# Build command में add करें:
python manage.py migrate --noinput
```

**If "ModuleNotFoundError":**
```bash
# requirements.txt verify करें
# Build logs check करें
```

**If "Permission denied":**
```bash
# Service restart करें
```

### Step 3: Fresh Deploy
अगर कुछ भी काम नहीं कर रहा:

1. Service settings note करें
2. Service delete करें
3. New service create करें
4. Same settings use करें
5. Latest code deploy करें

## Quick Test Commands

अगर आप Render shell access कर सकते हैं:

```bash
# Database check
cd backend
python manage.py showmigrations

# Run migrations manually
python manage.py migrate

# Check database
python manage.py shell
>>> from api.models import FoodItem
>>> FoodItem.objects.count()

# Test server
python manage.py runserver 0.0.0.0:8000
```

## Important Notes

1. **First Deploy**: पहली बार deploy करते समय migrations जरूर run होनी चाहिए
2. **Cold Start**: Render free tier पर first request slow हो सकती है (30-60 seconds)
3. **Empty Response**: अगर `/api/foods/` से `[]` आ रहा है, यह normal है - database में food items add करें
4. **Logs**: हमेशा logs check करें - actual error वहीं दिखेगी

## Support

अगर अभी भी problem है:

1. **Render Logs**: Latest error logs share करें
2. **Error Message**: Exact error message share करें
3. **Build Command**: Current build command share करें
4. **Environment Variables**: (Secret key छोड़कर) share करें

---

**Most Important**: Build command में `python manage.py migrate --noinput` जरूर add करें! यह 90% cases में problem solve कर देगा।




