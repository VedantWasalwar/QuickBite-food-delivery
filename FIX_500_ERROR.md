# 🔧 Fix 500 Server Error - QuickBite API

## Problem
जब आप `https://quickbite-food-delivery-1.onrender.com/api/foods/` को call करते हैं, तो **Server Error (500)** आता है।

## Common Causes & Solutions

### 1. Database Migrations Not Run ⚠️ (Most Common)

**Problem**: Database tables create नहीं हुईं

**Solution**: Render build command में migrations add करें

**Render Build Command:**
```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

**OR use build script:**
```bash
cd backend && chmod +x build.sh && ./build.sh && gunicorn fooddelivery.wsgi:application
```

### 2. Database File Missing

**Problem**: SQLite database file (`db.sqlite3`) create नहीं हुआ

**Solution**: 
- Build command में `python manage.py migrate` जरूर run करें
- Render logs check करें कि migrations successful हुईं या नहीं

### 3. Missing Dependencies

**Problem**: कुछ Python packages install नहीं हुईं

**Solution**: 
- `requirements.txt` verify करें
- Build logs में check करें कि सभी packages install हुईं

### 4. Image Field Serialization Error

**Problem**: Image field properly serialize नहीं हो रहा

**Solution**: ✅ **FIXED** - Code में error handling add की गई है

### 5. Static Files Not Collected

**Problem**: Static files collect नहीं हुए

**Solution**: Build command में `collectstatic` add करें

## Step-by-Step Fix

### Step 1: Render Dashboard पर जाएं
1. https://dashboard.render.com पर login करें
2. Backend service select करें

### Step 2: Build Settings Update करें

**Build Command:**
```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

**Start Command:**
```bash
cd backend && gunicorn fooddelivery.wsgi:application
```

### Step 3: Environment Variables Check करें

```
DEBUG=False
SECRET_KEY=your-strong-secret-key-here (minimum 50 characters)
```

### Step 4: Manual Deploy करें
1. "Manual Deploy" button click करें
2. "Deploy latest commit" select करें
3. Wait for build to complete (2-5 minutes)

### Step 5: Logs Check करें

**Important**: Logs में actual error देखें:

1. Render dashboard में "Logs" tab पर जाएं
2. Error message copy करें
3. Common errors:

#### Error: "no such table: api_fooditem"
**Fix**: Migrations run नहीं हुईं
```bash
# Add to build command:
python manage.py migrate --noinput
```

#### Error: "ModuleNotFoundError: No module named 'xxx'"
**Fix**: Dependencies install नहीं हुईं
```bash
# Verify requirements.txt और build command
pip install -r requirements.txt
```

#### Error: "ImageField" related errors
**Fix**: ✅ Code में fix add की गई है - latest code deploy करें

### Step 6: Test करें

Deploy complete होने के बाद:

1. **API Root**: `https://quickbite-food-delivery-1.onrender.com/api`
   - Should show API information

2. **Foods Endpoint**: `https://quickbite-food-delivery-1.onrender.com/api/foods/`
   - Should show: `[]` (empty array) या food items list
   - **NOT** 500 error

3. **Health Check**: `https://quickbite-food-delivery-1.onrender.com/api/health/`
   - Should show: `{"status": "healthy"}`

## Quick Test Commands

अगर आप Render shell access कर सकते हैं:

```bash
# Database check
cd backend
python manage.py showmigrations

# Run migrations manually
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Test API locally
python manage.py runserver 0.0.0.0:8000
```

## Code Changes Made

### 1. Error Handling in `food_list` view
- Try-catch block add किया
- Better error messages
- Image URL handling improved

### 2. Image Serializer Fix
- `SerializerMethodField` use किया
- Proper image URL handling

### 3. Logging Configuration
- Production में error logging enable की

## Verification Checklist

- [ ] Build command में `migrate` command है
- [ ] Build command में `collectstatic` command है
- [ ] Environment variables set हैं
- [ ] Latest code deployed है
- [ ] Logs में कोई error नहीं है
- [ ] Database tables create हुईं (logs में check करें)
- [ ] `/api/foods/` endpoint respond कर रहा है

## Still Getting 500 Error?

### Step 1: Check Render Logs
1. Render dashboard → Logs tab
2. Error message copy करें
3. Error type identify करें

### Step 2: Common Fixes

**If "no such table" error:**
```bash
# Add to build command:
python manage.py migrate --noinput
```

**If "ModuleNotFoundError":**
```bash
# Check requirements.txt
# Verify all packages are listed
```

**If "Permission denied":**
```bash
# Check file permissions
# Verify database file permissions
```

### Step 3: Fresh Deploy
अगर कुछ भी काम नहीं कर रहा:
1. Service delete करें
2. New service create करें
3. Same settings use करें
4. Latest code deploy करें

## Debug Mode (Temporary)

अगर आपको exact error देखना है, temporarily DEBUG=True set करें:

**Environment Variable:**
```
DEBUG=True
```

**⚠️ Warning**: Production में DEBUG=True नहीं रखना चाहिए, सिर्फ debugging के लिए use करें।

---

**Note**: Render free tier पर services sleep हो जाती हैं। पहली request slow हो सकती है (30-60 seconds)।

