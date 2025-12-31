# 🔐 Django Admin Panel Access - Render

## Admin Panel URL

आपका Django admin panel इस URL पर available है:

```
https://quickbite-food-delivery-1.onrender.com/admin/
```

## Step 1: Superuser Create करें

Admin panel access करने के लिए पहले **superuser** create करना होगा।

### Option 1: Render Shell से (Recommended)

1. **Render Dashboard** पर जाएं: https://dashboard.render.com
2. अपनी **backend service** select करें
3. **Shell** tab पर click करें (या "Open Shell" button)
4. ये commands run करें:

```bash
cd backend
python manage.py createsuperuser
```

5. Prompts follow करें:
   - **Username**: अपना username enter करें (e.g., `admin`)
   - **Email**: अपना email enter करें (optional)
   - **Password**: Strong password enter करें (कम से कम 8 characters)

### Option 2: Local से Superuser Create करें

अगर आपके पास local database है:

```bash
cd backend
venv\Scripts\activate  # Windows
python manage.py createsuperuser
```

**Note**: Local database और Render database अलग हैं। Render पर admin access के लिए Render database में superuser create करना होगा।

### Option 3: Management Command से (Advanced)

अगर आप script से superuser create करना चाहते हैं, एक management command बना सकते हैं।

## Step 2: Admin Panel Login करें

1. Browser में ये URL open करें:
   ```
   https://quickbite-food-delivery-1.onrender.com/admin/
   ```

2. Login page पर:
   - **Username**: वो username enter करें जो आपने superuser create करते समय दिया था
   - **Password**: वो password enter करें जो आपने दिया था

3. **Log in** button click करें

## Step 3: Admin Panel Features

Admin panel में आप ये manage कर सकते हैं:

### 1. Food Items (Food Items)
- ✅ Add new food items
- ✅ Edit existing food items
- ✅ Upload food images
- ✅ Delete food items
- ✅ Search और filter food items

### 2. Cart Items (Cart Items)
- ✅ View user carts
- ✅ See what items users have in cart
- ✅ Manage cart items

### 3. Orders (Orders)
- ✅ View all orders
- ✅ See order details
- ✅ Check order history
- ✅ Filter orders by date

### 4. Users (Users)
- ✅ View registered users
- ✅ Manage user accounts
- ✅ Create new users

## Troubleshooting

### Problem 1: "Please enter the correct username and password"
**Solution**: 
- Verify करें कि superuser properly create हुआ है
- Render shell से फिर से `createsuperuser` run करें
- Username और password सही enter करें

### Problem 2: "CSRF verification failed"
**Solution**:
- Browser cookies clear करें
- Incognito/Private window में try करें
- Render service restart करें

### Problem 3: Admin panel load नहीं हो रहा
**Solution**:
- Service running है या नहीं check करें
- Logs में errors check करें
- Static files properly collect हुए हैं या नहीं verify करें

### Problem 4: "You don't have permission"
**Solution**:
- Verify करें कि user superuser है
- Render shell से check करें:
  ```bash
  python manage.py shell
  >>> from django.contrib.auth.models import User
  >>> user = User.objects.get(username='your_username')
  >>> user.is_superuser
  True  # Should be True
  >>> user.is_staff
  True  # Should be True
  ```

## Quick Commands Reference

### Create Superuser
```bash
cd backend
python manage.py createsuperuser
```

### Check if User is Superuser
```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.filter(is_superuser=True)
```

### Change Superuser Password
```bash
python manage.py changepassword username
```

### List All Users
```bash
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.all()
```

## Security Tips

⚠️ **Important Security Notes**:

1. **Strong Password**: Admin password strong रखें (कम से कम 12 characters, numbers, symbols)
2. **HTTPS Only**: Render automatically HTTPS provide करता है
3. **Don't Share Credentials**: Admin credentials किसी के साथ share न करें
4. **Regular Updates**: Django और dependencies regularly update करें

## Admin Panel Customization

Admin panel already configured है `backend/api/admin.py` में:

- **Food Items**: Search, filter, और list display configured
- **Orders**: Order details और filtering
- **Cart Items**: User cart management

आप `backend/api/admin.py` file edit करके और customization add कर सकते हैं।

---

**Admin Panel URL**: https://quickbite-food-delivery-1.onrender.com/admin/

**Happy Admin Managing! 🎉**

