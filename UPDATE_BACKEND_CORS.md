# 🔧 Backend CORS Update - Netlify के लिए

Frontend Netlify पर deploy करने के बाद, backend में Netlify URL add करना होगा।

## ✅ Step 1: Netlify URL Note करें

Netlify deploy के बाद आपको एक URL मिलेगा:
- Example: `https://your-site-name.netlify.app`

## ✅ Step 2: Backend में CORS Update करें

### Option 1: Environment Variable (Recommended)

Render Dashboard में:

1. **Environment** tab पर जाएं
2. **"Add Environment Variable"** click करें
3. Add करें:

   **Key**: `NETLIFY_URL`
   
   **Value**: `https://your-site-name.netlify.app`
   
   (अपना actual Netlify URL डालें)

4. **"Save Changes"** click करें
5. Service automatically redeploy होगा

### Option 2: Code में Direct Update

`backend/fooddelivery/settings.py` में:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://quickbite-food-delivery-1.onrender.com",
    "https://your-site-name.netlify.app",  # Netlify URL add करें
]
```

फिर GitHub पर push करें:
```bash
git add backend/fooddelivery/settings.py
git commit -m "Add Netlify URL to CORS"
git push
```

---

## 🧪 Test करें

CORS update के बाद:

1. Netlify site open करें
2. Browser console check करें - CORS errors नहीं आने चाहिए
3. Login/Register test करें
4. API calls successful हैं?

---

## ⚠️ Important

- Netlify URL में `https://` include करें
- Trailing slash न डालें (`.app` के बाद `/` नहीं)
- Multiple Netlify sites के लिए comma-separated list use करें

---

**CORS update के बाद frontend properly काम करेगा! 🎉**

