# Backend URL Configuration

## ✅ Current Backend URL

**Production Backend:** `https://minifi-onqw.onrender.com`

---

## Status

- ✅ Backend deployed and running
- ✅ Health endpoint working: `/health`
- ✅ CORS configured for `minifi.games` and `www.minifi.games`
- ✅ API documentation available: `/docs`

---

## Environment Variables

### Frontend (Vercel)

**Required Environment Variable:**
```bash
NEXT_PUBLIC_API_URL=https://minifi-onqw.onrender.com
```

**How to Update:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Set `NEXT_PUBLIC_API_URL` to `https://minifi-onqw.onrender.com`
3. Redeploy the frontend

### Backend (Render)

The backend is deployed at: `https://minifi-onqw.onrender.com`

**Service Name:** `minifi-onqw` (or `minifi-backend` in Render dashboard)

---

## API Endpoints

### Health Check
```bash
GET https://minifi-onqw.onrender.com/health
```

### Root Endpoint
```bash
GET https://minifi-onqw.onrender.com/
```

### API Documentation
```
https://minifi-onqw.onrender.com/docs
```

### Available Routes
- `/health` - Health check
- `/quotes` - Get stock/crypto quotes
- `/coach` - AI coach advice
- `/simulate` - Investment simulation
- `/leaderboard` - Leaderboard data
- `/prices` - Historical price data
- `/seed/events` - Historical events

---

## CORS Configuration

The backend CORS is configured to allow:
- `https://minifi.games`
- `https://www.minifi.games`
- `https://minifi.vercel.app`
- `https://minifi-app.vercel.app`
- `https://minifi-tick-ai.vercel.app`
- All `*.vercel.app` subdomains

---

## Testing

### Test Backend Health
```bash
curl https://minifi-onqw.onrender.com/health
```

### Test CORS from Frontend
Open browser console on `https://www.minifi.games`:
```javascript
fetch('https://minifi-onqw.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

### Test API Endpoint
```bash
curl 'https://minifi-onqw.onrender.com/quotes?ids=apple,bitcoin'
```

---

## Troubleshooting

### Backend Returns 404
- Check if service is running in Render dashboard
- Verify service URL matches `minifi-onqw.onrender.com`
- Check Render logs for errors

### CORS Errors
- Verify `minifi.games` is in CORS allowed origins
- Check browser console for specific CORS error
- Test with `curl` to verify CORS headers

### Frontend Can't Connect
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel
- Check Vercel deployment logs
- Ensure frontend is redeployed after env var change

---

**Last Updated:** 2025-12-10  
**Backend Status:** ✅ Operational

