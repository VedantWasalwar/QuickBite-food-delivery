# ⚡ Render पर Backend Deploy - Quick Setup (5 Minutes)

यह एक quick guide है Render पर backend deploy करने के लिए।

## 🎯 Step-by-Step (सिर्फ 5 Steps)

### Step 1: Render Dashboard
1. https://dashboard.render.com पर जाएं
2. **"New +"** → **"Web Service"** click करें
3. GitHub repository connect करें

### Step 2: Basic Configuration

**Name**: `quickbite-backend` (या कोई भी name - यही आपका URL बनेगा)

**Region**: `Oregon` (या कोई भी)

**Branch**: `main`

**Root Directory**: `backend` ⚠️ **यह बहुत जरूरी है!**

### Step 3: Build & Start Commands

**Build Command**:
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
```

**Start Command**:
```bash
gunicorn fooddelivery.wsgi:application
```

### Step 4: Environment Variables

**Environment** tab में ये add करें:

```
PYTHON_VERSION=3.11.0
DEBUG=False
SECRET_KEY=your-super-secret-key-here-minimum-50-characters-long
ALLOWED_HOSTS=your-service-name.onrender.com
```

⚠️ **Important**: 
- `ALLOWED_HOSTS` में अपना actual service name डालें
- अगर service name `quickbite-backend` है, तो: `ALLOWED_HOSTS=quickbite-backend.onrender.com`
- `SECRET_KEY` के लिए strong random key use करें

### Step 5: Deploy

**"Create Web Service"** click करें और wait करें (5-10 minutes)

---

## ✅ Deploy के बाद Check करें

1. **Service URL** note करें (जैसे: `https://your-service-name.onrender.com`)

2. **Test करें**:
   - API: `https://your-service-name.onrender.com/api/`
   - Health: `https://your-service-name.onrender.com/api/health/`
   - Admin: `https://your-service-name.onrender.com/admin/`

3. **Superuser Create करें**:
   - Render Dashboard → Service → Shell tab
   - Run: `python manage.py createsuperuser`

---

## 🐛 अगर Error आए

### "DisallowedHost" Error
→ `ALLOWED_HOSTS` environment variable check करें - service name सही है?

### Build Fails
→ Logs check करें - कौन सा step fail हो रहा है?

### Service Not Starting
→ Start command check करें - `gunicorn` installed है?

---

## 📝 Important Notes

1. **Service Name = URL**: जो name आप देते हैं, वही URL बनेगा
   - Name: `my-backend` → URL: `https://my-backend.onrender.com`

2. **Root Directory**: हमेशा `backend` set करें (क्योंकि Django project `backend/` folder में है)

3. **ALLOWED_HOSTS**: Service name के बाद `.onrender.com` add करना न भूलें

4. **Free Tier**: Render free tier पर service sleep हो सकती है (15 minutes inactivity के बाद)

---

**Detailed Guide**: `RENDER_DEPLOYMENT_STEPS.md` देखें

**Happy Deploying! 🚀**

