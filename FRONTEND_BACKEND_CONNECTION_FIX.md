# 🔧 Frontend-Backend Connection Fix

## ✅ Changes Made:

### 1. **API URL Updated** ✅
- Backend URL: `https://quickbite-food-backend-wzem.onrender.com/api/`
- Production mode में automatically use होगा

### 2. **Better Error Logging** ✅
- Console में detailed error messages
- API URL display होगा error में
- Browser console (F12) में full error details

### 3. **Debugging Improved** ✅
- API calls के समय console logs
- Success/Error messages clear
- URL tracking for debugging

---

## 🧪 Testing Steps:

### Step 1: Browser Console Check करें

1. Frontend open करें
2. **F12** press करें (Developer Tools)
3. **Console** tab check करें
4. ये logs दिखने चाहिए:
   ```
   🔗 API Base URL: https://quickbite-food-backend-wzem.onrender.com/api/
   🔗 Backend Base URL: https://quickbite-food-backend-wzem.onrender.com
   📡 Fetching foods from: https://quickbite-food-backend-wzem.onrender.com/api/foods/
   ```

### Step 2: Network Tab Check करें

1. **Network** tab open करें
2. Page refresh करें
3. `/api/foods/` request check करें:
   - **Status**: 200 (Success) या error code
   - **URL**: `https://quickbite-food-backend-wzem.onrender.com/api/foods/`
   - **Response**: Food items data

### Step 3: Backend Test करें

Direct browser में test करें:
```
https://quickbite-food-backend-wzem.onrender.com/api/foods/
```

यह JSON response देना चाहिए।

---

## 🐛 Common Issues & Solutions:

### Issue 1: CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
1. Backend `settings.py` में Netlify URL add करें
2. Render Dashboard → Environment → `NETLIFY_URL` add करें
3. Service redeploy करें

### Issue 2: 404 Not Found

**Error**: `404 - Not Found`

**Solution**:
- Backend URL check करें: `https://quickbite-food-backend-wzem.onrender.com/api/`
- Backend service running है? Render Dashboard में check करें

### Issue 3: 500 Internal Server Error

**Error**: `500 - Internal Server Error`

**Solution**:
- Backend logs check करें (Render Dashboard → Logs)
- Database migrations run हुए हैं?
- Static files collected हैं?

### Issue 4: Timeout Error

**Error**: `Request timeout`

**Solution**:
- Render free tier slow हो सकता है
- Wait करें (30 seconds timeout है)
- Retry करें

### Issue 5: Network Error

**Error**: `Network Error` या `Failed to fetch`

**Solution**:
- Internet connection check करें
- Backend URL accessible है? Browser में directly open करें
- Firewall/VPN issue हो सकता है

---

## 🔍 Debugging Checklist:

- [ ] Browser console में API URL correct है?
- [ ] Network tab में request visible है?
- [ ] Backend URL directly browser में open हो रहा है?
- [ ] CORS headers present हैं response में?
- [ ] Backend service running है Render पर?
- [ ] Environment variable `VITE_BACKEND_URL` set है? (अगर Netlify पर deploy है)

---

## 📝 Environment Variable Setup:

### Local Development:
`.env` file में (optional):
```
VITE_BACKEND_URL=http://127.0.0.1:8000/api
```

### Production (Netlify):
Netlify Dashboard → Environment Variables:
```
VITE_BACKEND_URL=https://quickbite-food-backend-wzem.onrender.com/api/
```

---

## ✅ Expected Behavior:

1. **Page Load**: Loading spinner दिखेगा
2. **API Call**: Console में "Fetching foods" log
3. **Success**: Foods display होंगे
4. **Error**: Error message with backend URL दिखेगा

---

## 🎯 Quick Fix:

अगर अभी भी error आ रहा है:

1. **Browser Console** (F12) check करें - exact error क्या है?
2. **Network Tab** check करें - request fail हो रही है?
3. **Backend URL** directly browser में test करें
4. **Backend Logs** check करें (Render Dashboard)

---

**Connection fix complete! Test करें और console में logs check करें! 🚀**

