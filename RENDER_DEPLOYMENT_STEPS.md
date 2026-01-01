# 🚀 Render पर Backend Deploy करने की Complete Guide

यह guide आपको step-by-step बताएगी कि कैसे Django backend को Render पर properly deploy करें।

## 📋 Prerequisites (जरूरी चीजें)

1. ✅ GitHub account
2. ✅ Render account (https://render.com पर signup करें)
3. ✅ Code GitHub पर push होना चाहिए

---

## 🔥 Step 1: GitHub पर Code Push करें

अगर आपका code GitHub पर नहीं है, तो पहले push करें:

```bash
# Git initialize (अगर नहीं किया है)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Food Delivery Backend"

# GitHub पर repository बनाएं और push करें
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

---

## 🔥 Step 2: Render Dashboard पर जाएं

1. **Render Dashboard** खोलें: https://dashboard.render.com
2. **Login** करें (या signup करें)
3. **"New +"** button click करें
4. **"Web Service"** select करें

---

## 🔥 Step 3: GitHub Repository Connect करें

1. **"Connect GitHub"** button click करें
2. **Repository select करें** जहाँ आपका backend code है
3. **"Connect"** button click करें

---

## 🔥 Step 4: Service Configuration

### Basic Settings:

1. **Name**: अपना service name दें (जैसे: `quickbite-backend`)
   - ⚠️ **Important**: यह name आपका URL बनेगा: `your-service-name.onrender.com`
   - Example: अगर name `quickbite-backend` है, तो URL होगा: `https://quickbite-backend.onrender.com`

2. **Region**: `Oregon (US West)` या कोई भी select करें

3. **Branch**: `main` या `master` (जो भी आपका main branch है)

4. **Root Directory**: `backend` (क्योंकि backend folder में Django project है)

### Build & Start Commands:

#### Build Command:
```bash
cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

#### Start Command:
```bash
cd backend && gunicorn fooddelivery.wsgi:application
```

---

## 🔥 Step 5: Environment Variables Set करें

**Environment** tab में ये variables add करें:

### Required Variables:

| Key | Value | Description |
|-----|-------|-------------|
| `PYTHON_VERSION` | `3.11.0` | Python version |
| `DEBUG` | `False` | Production mode |
| `SECRET_KEY` | `your-very-long-random-secret-key-here` | Django secret key (कम से कम 50 characters) |
| `ALLOWED_HOSTS` | `your-service-name.onrender.com` | आपका Render URL (service name के बाद `.onrender.com`) |

### Example:

अगर आपका service name `quickbite-backend` है, तो:

```
PYTHON_VERSION=3.11.0
DEBUG=False
SECRET_KEY=django-insecure-your-super-secret-key-change-this-in-production-12345678901234567890
ALLOWED_HOSTS=quickbite-backend.onrender.com
```

### ⚠️ Important Notes:

1. **SECRET_KEY**: एक strong random key generate करें:
   ```python
   # Python में run करें:
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

2. **ALLOWED_HOSTS**: 
   - Service name के बाद `.onrender.com` add करें
   - अगर आपका service name `my-backend` है, तो `ALLOWED_HOSTS=my-backend.onrender.com`
   - Multiple hosts के लिए comma use करें: `my-backend.onrender.com,localhost,127.0.0.1`

---

## 🔥 Step 6: Advanced Settings (Optional)

### Health Check Path:
```
/api/health/
```

### Auto-Deploy:
✅ **Enable** करें (जब भी GitHub पर push करेंगे, automatically deploy होगा)

---

## 🔥 Step 7: Deploy करें

1. **"Create Web Service"** button click करें
2. Render automatically build start करेगा
3. **Logs** देखें - build process monitor करें
4. ⏳ **Wait करें** (5-10 minutes लग सकते हैं)

---

## 🔥 Step 8: Deploy Complete होने के बाद

### ✅ Check करें:

1. **Service URL** note करें (जैसे: `https://your-service-name.onrender.com`)

2. **Test API**:
   ```
   https://your-service-name.onrender.com/api/
   ```
   यह response देना चाहिए:
   ```json
   {
     "message": "QuickBite Food Delivery API is running!",
     ...
   }
   ```

3. **Test Health Check**:
   ```
   https://your-service-name.onrender.com/api/health/
   ```

4. **Test Admin Panel**:
   ```
   https://your-service-name.onrender.com/admin/
   ```

---

## 🔥 Step 9: Settings.py Update करें (अगर जरूरत हो)

अगर आपका Render URL अलग है, तो `backend/fooddelivery/settings.py` में update करें:

### Option 1: Environment Variable Use करें (Recommended)

Settings.py में already configured है - बस Render dashboard में `ALLOWED_HOSTS` environment variable set करें।

### Option 2: Direct Update करें

अगर environment variable नहीं use करना चाहते:

```python
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "your-actual-render-url.onrender.com",  # यहाँ अपना URL डालें
]
```

और CORS में भी:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://your-actual-render-url.onrender.com",  # यहाँ अपना URL डालें
]
```

---

## 🔥 Step 10: Superuser Create करें

Admin panel access के लिए:

1. Render Dashboard में अपनी service select करें
2. **"Shell"** tab पर click करें
3. ये commands run करें:

```bash
cd backend
python manage.py createsuperuser
```

4. Username, email, password enter करें

---

## 🐛 Common Issues & Solutions

### Issue 1: "DisallowedHost" Error

**Error**: `Invalid HTTP_HOST header`

**Solution**:
- Render dashboard में `ALLOWED_HOSTS` environment variable check करें
- Service name के बाद `.onrender.com` add करना न भूलें
- Example: अगर service name `my-backend` है, तो `ALLOWED_HOSTS=my-backend.onrender.com`

### Issue 2: Build Fails

**Error**: Build command fails

**Solution**:
- `requirements.txt` check करें - सभी dependencies सही हैं?
- Build logs में error देखें
- Python version check करें (3.11.0 recommended)

### Issue 3: Static Files Not Loading

**Error**: CSS/JS files 404 error

**Solution**:
- Build command में `collectstatic` include है?
- `whitenoise` installed है? (requirements.txt में check करें)

### Issue 4: Database Migration Error

**Error**: Migration fails

**Solution**:
- Build command में `migrate` include है?
- SQLite database properly configured है?

### Issue 5: Service Not Starting

**Error**: Service crashes on start

**Solution**:
- Start command check करें: `cd backend && gunicorn fooddelivery.wsgi:application`
- Logs में error message देखें
- `gunicorn` installed है? (requirements.txt में check करें)

---

## 📝 Quick Checklist

Deploy करने से पहले verify करें:

- [ ] Code GitHub पर push है
- [ ] `requirements.txt` में सभी dependencies हैं
- [ ] `gunicorn` और `whitenoise` installed हैं
- [ ] `build.sh` file executable है (chmod +x build.sh)
- [ ] Environment variables properly set हैं
- [ ] `ALLOWED_HOSTS` में correct Render URL है
- [ ] `SECRET_KEY` strong और random है
- [ ] `DEBUG=False` production में

---

## 🎯 Final Steps

1. ✅ **Backend URL Note करें**: `https://your-service-name.onrender.com`
2. ✅ **Frontend में Update करें**: `frontend/src/api/api.js` में backend URL update करें
3. ✅ **Test करें**: सभी API endpoints test करें
4. ✅ **Superuser Create करें**: Admin panel access के लिए

---

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Render Docs**: https://render.com/docs
- **Django Deployment**: https://docs.djangoproject.com/en/4.2/howto/deployment/

---

**Happy Deploying! 🚀**

अगर कोई problem आए, तो Render logs check करें - वहाँ detailed error messages मिलेंगी।

