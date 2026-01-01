# ⚡ Netlify Quick Deploy (5 Minutes)

## 🎯 Fastest Way to Deploy

### Step 1: GitHub पर Push करें
```bash
git add .
git commit -m "Add Netlify config"
git push
```

### Step 2: Netlify Dashboard
1. https://app.netlify.com पर जाएं
2. **"Add new site"** → **"Import from Git"**
3. **GitHub** select करें
4. Repository select करें

### Step 3: Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

### Step 4: Environment Variable
**"Show advanced"** → **"New variable"**:
- **Key**: `VITE_BACKEND_URL`
- **Value**: `https://quickbite-food-backend-wzem.onrender.com/api`

### Step 5: Deploy
**"Deploy site"** click करें → Wait (2-5 minutes) → Done! ✅

---

## ✅ Deploy के बाद

1. **Site URL** note करें (जैसे: `https://your-site.netlify.app`)
2. **Backend CORS Update**: Backend में Netlify URL add करें
3. **Test करें**: Site open करके check करें

---

## 🐛 अगर Error आए

### Build Fails
→ Build logs check करें - कौन सा step fail हो रहा है?

### Routes Not Working
→ `netlify.toml` file check करें - redirects configured हैं?

### API Not Working
→ Environment variable `VITE_BACKEND_URL` set है? Redeploy करें

---

**Detailed Guide**: `NETLIFY_DEPLOYMENT.md` देखें

**Happy Deploying! 🚀**

