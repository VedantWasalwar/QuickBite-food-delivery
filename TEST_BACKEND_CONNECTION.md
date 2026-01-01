# 🧪 Backend Connection Test Guide

## ✅ Step 1: Backend URL Direct Test

Browser में directly test करें:

### Test 1: API Root
```
https://quickbite-food-backend-wzem.onrender.com/api/
```

**Expected Response**:
```json
{
  "message": "QuickBite Food Delivery API is running!",
  "status": "success",
  "endpoints": {...}
}
```

### Test 2: Health Check
```
https://quickbite-food-backend-wzem.onrender.com/api/health/
```

**Expected Response**:
```json
{
  "status": "healthy",
  "message": "API is operational"
}
```

### Test 3: Foods Endpoint
```
https://quickbite-food-backend-wzem.onrender.com/api/foods/
```

**Expected Response**:
```json
[
  {
    "id": 1,
    "name": "Food Name",
    "description": "...",
    "price": "100.00",
    "image": "...",
    "created_at": "..."
  },
  ...
]
```

---

## ✅ Step 2: Browser Console Check

1. Frontend open करें
2. **F12** press करें
3. **Console** tab check करें
4. **Network** tab check करें

### Console में देखें:
- API URL logs
- Error messages
- Request details

### Network Tab में देखें:
- `/api/foods/` request
- Status code (200 = success, 400/500 = error)
- Response data
- CORS headers

---

## ✅ Step 3: CORS Headers Check

Network tab → `/api/foods/` request → **Headers** tab में check करें:

**Response Headers** में ये होना चाहिए:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 🐛 Common Issues:

### Issue 1: Backend Not Responding

**Symptoms**: 
- Browser में URL open नहीं हो रहा
- Timeout error
- 502/503 error

**Solution**:
- Render Dashboard check करें - service running है?
- Service logs check करें
- Service restart करें

### Issue 2: CORS Error

**Symptoms**:
- Console में: `Access to XMLHttpRequest has been blocked by CORS policy`
- Network tab में: CORS error

**Solution**:
- Backend `settings.py` में `CORS_ALLOW_ALL_ORIGINS = True` set है?
- Service redeploy करें

### Issue 3: 404 Not Found

**Symptoms**:
- 404 error
- "Not Found" message

**Solution**:
- URL check करें: `/api/foods/` (trailing slash important)
- Backend URLs configured हैं?

### Issue 4: 500 Internal Server Error

**Symptoms**:
- 500 error
- Backend logs में error

**Solution**:
- Backend logs check करें (Render Dashboard)
- Database migrations run हुए हैं?
- Static files collected हैं?

---

## 🔧 Quick Fixes:

### Fix 1: CORS Allow All (Temporary)

Backend `settings.py` में:
```python
CORS_ALLOW_ALL_ORIGINS = True  # Production में भी
```

### Fix 2: Backend Service Restart

Render Dashboard:
1. Service select करें
2. **"Manual Deploy"** → **"Deploy latest commit"**

### Fix 3: Check Backend Logs

Render Dashboard → **Logs** tab:
- Errors check करें
- Request logs देखें

---

## 📝 Test Checklist:

- [ ] Backend URL directly browser में open हो रहा है?
- [ ] `/api/` endpoint response दे रहा है?
- [ ] `/api/foods/` endpoint response दे रहा है?
- [ ] CORS headers present हैं?
- [ ] Frontend console में error क्या है?
- [ ] Network tab में request status क्या है?
- [ ] Backend service running है Render पर?

---

**Test करें और results share करें! 🚀**

