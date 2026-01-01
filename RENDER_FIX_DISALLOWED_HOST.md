# 🔧 Fix: DisallowedHost Error on Render

अगर आपको यह error मिल रहा है:
```
DisallowedHost: Invalid HTTP_HOST header: 'quickbite-food-backend-wzem.onrender.com'
```

## ✅ Quick Fix (2 Methods)

### Method 1: Environment Variable Set करें (Recommended)

1. **Render Dashboard** पर जाएं: https://dashboard.render.com
2. अपनी **service** select करें
3. **"Environment"** tab पर click करें
4. **"Add Environment Variable"** click करें
5. ये variable add करें:

   **Key**: `ALLOWED_HOSTS`
   
   **Value**: `quickbite-food-backend-wzem.onrender.com`
   
   (अपना actual URL डालें)

6. **"Save Changes"** click करें
7. Service **automatically redeploy** होगा

### Method 2: Code Update (Permanent Fix)

Code में already fix add किया गया है जो automatically सभी `.onrender.com` domains allow करेगा।

अगर अभी भी error आ रहा है, तो:

1. **GitHub पर code push करें** (updated settings.py के साथ)
2. Render **automatically redeploy** करेगा

---

## 🔍 Verify करें

Deploy के बाद test करें:

1. **API Root**: `https://quickbite-food-backend-wzem.onrender.com/api/`
2. **Health Check**: `https://quickbite-food-backend-wzem.onrender.com/api/health/`
3. **Admin Panel**: `https://quickbite-food-backend-wzem.onrender.com/admin/`

---

## 📝 Current Configuration

आपका Render URL: `https://quickbite-food-backend-wzem.onrender.com`

**Environment Variable** में add करें:
```
ALLOWED_HOSTS=quickbite-food-backend-wzem.onrender.com
```

या **multiple hosts** के लिए:
```
ALLOWED_HOSTS=quickbite-food-backend-wzem.onrender.com,localhost,127.0.0.1
```

---

## ✅ Code में Fix

`backend/fooddelivery/settings.py` में automatically fix add किया गया है:

- Production mode में सभी `.onrender.com` subdomains automatically allow होंगे
- Environment variable से specific hosts भी add हो सकते हैं

---

**Fix के बाद service redeploy होगा और error resolve हो जाएगा! 🎉**

