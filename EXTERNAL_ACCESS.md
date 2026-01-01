# External Access Setup Guide

This guide explains how to access your Food Delivery app from other devices on the same network.

## Quick Start

### Option 1: Use the Batch Script (Windows)
Double-click `start-external.bat` to start both servers with external access enabled.

### Option 2: Manual Setup

## Step 1: Find Your Network IP Address

### Windows:
```powershell
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

### Mac/Linux:
```bash
ifconfig | grep "inet "
```
or
```bash
hostname -I
```

## Step 2: Start Backend with External Access

```bash
cd backend
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

python manage.py runserver 0.0.0.0:8000
```

**Note:** Using `0.0.0.0` allows Django to accept connections from any network interface.

## Step 3: Start Frontend (Already Configured)

The frontend is already configured for external access. Just start it normally:

```bash
cd frontend
npm run dev
```

## Step 4: Access from Other Devices

Once both servers are running, you can access the app from:

### On the Same Computer:
- **Frontend**: http://localhost:5173
- **Backend**: http://127.0.0.1:8000

### On Other Devices (Same Network):
Replace `YOUR_IP` with your actual IP address (found in Step 1):

- **Frontend**: http://YOUR_IP:5173
- **Backend API**: http://YOUR_IP:8000/api/
- **Django Admin**: http://YOUR_IP:8000/admin/

### Example:
If your IP is `192.168.1.100`:
- Frontend: http://192.168.1.100:5173
- Backend: http://192.168.1.100:8000

## Configuration Changes Made

### Frontend (vite.config.js)
- Added `host: '0.0.0.0'` to allow external connections
- API calls now dynamically use the current hostname

### Frontend (api.js)
- API URL now uses `window.location.hostname` instead of hardcoded `127.0.0.1`
- Automatically works with localhost or network IP

### Backend (settings.py)
- CORS now allows all origins in development mode
- Enables API calls from any IP address

### Image URLs
- All image URLs now use dynamic hostname
- Works with both localhost and network IP

## Firewall Configuration

### Windows Firewall
When you first start the servers, Windows may ask for permission. Click "Allow access".

If you need to manually configure:
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Create inbound rules for ports 5173 and 8000
4. Allow connections for both TCP ports

### Mac Firewall
System Preferences → Security & Privacy → Firewall → Firewall Options
Add Python and Node.js to allowed applications.

### Linux Firewall
```bash
# If using ufw
sudo ufw allow 5173
sudo ufw allow 8000

# If using firewalld
sudo firewall-cmd --add-port=5173/tcp --permanent
sudo firewall-cmd --add-port=8000/tcp --permanent
sudo firewall-cmd --reload
```

## Testing External Access

1. **On your development machine:**
   - Start both servers
   - Note your IP address

2. **On another device (phone, tablet, another computer):**
   - Make sure it's connected to the same Wi-Fi network
   - Open a web browser
   - Navigate to: `http://YOUR_IP:5173`
   - The app should load!

## Troubleshooting

### "Connection Refused" or "Cannot Connect"
- **Check firewall**: Make sure ports 5173 and 8000 are open
- **Check network**: Ensure both devices are on the same network
- **Check IP address**: Verify you're using the correct IP (not localhost)

### API Calls Failing from External Device
- **Check CORS settings**: Ensure `DEBUG = True` in Django settings
- **Check backend URL**: Verify backend is running on `0.0.0.0:8000`

### Images Not Loading
- Images should automatically use the correct hostname
- If issues persist, check that Django media files are being served correctly

### Can't Find IP Address
**Windows PowerShell:**
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*"} | Select-Object IPAddress
```

**Windows CMD:**
```cmd
ipconfig | findstr "IPv4"
```

## Security Note

⚠️ **Important**: The current configuration allows access from any device on your network. This is fine for development, but:

- **Don't use this in production** without proper security measures
- **Don't expose this to the public internet** without authentication and HTTPS
- **Always use strong passwords** for your Django admin account

For production, you should:
- Use specific CORS origins instead of allowing all
- Set `DEBUG = False`
- Use HTTPS
- Implement proper authentication and rate limiting

## Mobile Device Testing

Testing on your phone is great for checking responsive design!

1. Connect your phone to the same Wi-Fi as your development machine
2. Find your computer's IP address
3. On your phone's browser, go to: `http://YOUR_IP:5173`
4. You should see the Food Delivery app!

---

**Happy Testing! 🚀**











