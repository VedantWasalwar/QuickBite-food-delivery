# 🚀 Netlify पर Frontend Deploy करने की Complete Guide

यह guide आपको step-by-step बताएगी कि कैसे React frontend को Netlify पर deploy करें।

## 📋 Prerequisites (जरूरी चीजें)

1. ✅ GitHub account
2. ✅ Netlify account (https://netlify.com पर signup करें - free)
3. ✅ Code GitHub पर push होना चाहिए
4. ✅ Backend Render पर deployed होना चाहिए

---

## 🔥 Method 1: GitHub से Deploy (Recommended)

### Step 1: GitHub पर Code Push करें

अगर code GitHub पर नहीं है:

```bash
# Git initialize (अगर नहीं किया है)
git init

# Add all files
git add .

# Commit
git commit -m "Add Netlify configuration for frontend"

# GitHub पर repository बनाएं और push करें
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Netlify Dashboard पर जाएं

1. **Netlify Dashboard** खोलें: https://app.netlify.com
2. **Login** करें (या signup करें - free)
3. **"Add new site"** → **"Import an existing project"** click करें

### Step 3: GitHub Connect करें

1. **"GitHub"** select करें
2. **Repository select करें** जहाँ आपका frontend code है
3. **"Connect"** button click करें

### Step 4: Build Settings Configure करें

Netlify automatically detect करेगा, लेकिन verify करें:

**Base directory**: `frontend` (क्योंकि frontend folder में code है)

**Build command**: 
```bash
npm run build
```

**Publish directory**: 
```
frontend/dist
```

⚠️ **Important**: अगर base directory `frontend` है, तो:
- Build command: `cd frontend && npm run build` (या `npm run build` अगर root से run कर रहे हैं)
- Publish directory: `frontend/dist`

### Step 5: Environment Variables Set करें

**"Advanced"** → **"New variable"** click करें:

**Key**: `VITE_BACKEND_URL`

**Value**: `https://quickbite-food-backend-wzem.onrender.com/api`

⚠️ **Important**: अपना actual Render backend URL डालें!

### Step 6: Deploy करें

1. **"Deploy site"** button click करें
2. ⏳ **Wait करें** (2-5 minutes)
3. ✅ Deploy complete होने पर **site URL** मिलेगा

---

## 🔥 Method 2: Netlify CLI से Deploy

### Step 1: Netlify CLI Install करें

```bash
npm install -g netlify-cli
```

### Step 2: Login करें

```bash
netlify login
```

Browser में login करें

### Step 3: Build करें

```bash
cd frontend
npm run build
```

### Step 4: Deploy करें

```bash
# First time - initialize
netlify init

# Or direct deploy
netlify deploy --prod --dir=dist
```

---

## 🔥 Method 3: Drag & Drop (Quick Test)

### Step 1: Build करें

```bash
cd frontend
npm install
npm run build
```

### Step 2: Netlify Dashboard

1. Netlify Dashboard → **"Sites"**
2. **"Add new site"** → **"Deploy manually"**
3. **`frontend/dist`** folder drag & drop करें
4. ⏳ Wait करें
5. ✅ Site deploy हो जाएगा

⚠️ **Note**: यह method manual है - auto-deploy नहीं होगा

---

## ✅ Deploy के बाद Configuration

### Environment Variables Set करें

1. Netlify Dashboard → अपनी site select करें
2. **"Site settings"** → **"Environment variables"**
3. **"Add variable"** click करें
4. Add करें:

   **Key**: `VITE_BACKEND_URL`
   
   **Value**: `https://quickbite-food-backend-wzem.onrender.com/api`

5. **"Save"** click करें
6. **"Trigger deploy"** → **"Clear cache and deploy site"** click करें

### Custom Domain (Optional)

1. **"Site settings"** → **"Domain management"**
2. **"Add custom domain"** click करें
3. अपना domain enter करें

---

## 🧪 Testing

Deploy के बाद test करें:

1. **Homepage**: `https://your-site-name.netlify.app`
2. **Login/Register**: Forms काम कर रहे हैं?
3. **API Calls**: Browser console में check करें - API calls successful हैं?
4. **Images**: Food images load हो रहे हैं?

---

## 🐛 Common Issues & Solutions

### Issue 1: "Page Not Found" on Routes

**Error**: React Router routes काम नहीं कर रहे

**Solution**: 
- `netlify.toml` file check करें - redirects configured हैं?
- `public/_redirects` file exists है?
- Netlify में **"Site settings"** → **"Build & deploy"** → **"Post processing"** → **"Asset optimization"** disable करें

### Issue 2: API Calls Failing (CORS Error)

**Error**: CORS policy error

**Solution**:
- Backend में `CORS_ALLOWED_ORIGINS` में Netlify URL add करें
- Backend `settings.py` में:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "http://localhost:5173",
      "https://your-site-name.netlify.app",  # Netlify URL add करें
  ]
  ```

### Issue 3: Environment Variable Not Working

**Error**: `VITE_BACKEND_URL` not found

**Solution**:
- Netlify Dashboard → Environment variables check करें
- Variable name `VITE_BACKEND_URL` है? (VITE_ prefix जरूरी है)
- **"Redeploy"** करें (environment variables change के बाद)

### Issue 4: Build Fails

**Error**: Build command fails

**Solution**:
- Build logs check करें
- `package.json` में build script correct है?
- Node version check करें (Netlify में Node 18 use करें)

### Issue 5: Images Not Loading

**Error**: Food images 404 error

**Solution**:
- Backend URL correct है?
- `VITE_BACKEND_URL` environment variable set है?
- Backend में media files properly serve हो रहे हैं?

---

## 📝 Quick Checklist

Deploy करने से पहले:

- [ ] Code GitHub पर push है
- [ ] `netlify.toml` file `frontend/` folder में है
- [ ] `public/_redirects` file `frontend/public/` folder में है
- [ ] `package.json` में build script है
- [ ] Backend Render पर deployed है
- [ ] Backend URL note किया है
- [ ] Environment variable `VITE_BACKEND_URL` set किया है

---

## 🔧 Configuration Files

### 1. `frontend/netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. `frontend/public/_redirects`

```
/*    /index.html   200
```

### 3. Environment Variable

Netlify Dashboard में:
```
VITE_BACKEND_URL=https://quickbite-food-backend-wzem.onrender.com/api
```

---

## 🎯 Final Steps

1. ✅ **Frontend Deploy**: Netlify पर deploy complete
2. ✅ **Backend URL Update**: Backend `settings.py` में Netlify URL add करें
3. ✅ **CORS Update**: Backend में Netlify origin allow करें
4. ✅ **Test**: सभी features test करें

---

## 🔗 Useful Links

- **Netlify Dashboard**: https://app.netlify.com
- **Netlify Docs**: https://docs.netlify.com
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html#netlify

---

## 📊 Current URLs

**Backend (Render)**: `https://quickbite-food-backend-wzem.onrender.com`

**Frontend (Netlify)**: `https://your-site-name.netlify.app` (deploy के बाद मिलेगा)

---

**Happy Deploying! 🚀**

Deploy के बाद अपना Netlify URL share करें - मैं backend CORS configuration update कर दूंगा!

