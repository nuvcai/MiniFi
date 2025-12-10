# Environment Variables

**Project:** minifi  
**Platform:** Vercel

---

## Production Environment Variables

### Required:

```bash
NEXT_PUBLIC_API_URL=https://minifi-onqw.onrender.com
```

---

## How to Set in Vercel

1. Go to: https://vercel.com/nuvc/minifi
2. Navigate to: **Settings → Environment Variables**
3. Click: **Add New**
4. Set:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://minifi-onqw.onrender.com`
   - **Environment:** Production
5. Click: **Save**
6. **Redeploy** to apply changes

---

## Verify Environment Variable

Check if set correctly:
```bash
# Using Vercel CLI (if linked):
vercel env ls

# Or check in Vercel dashboard:
# Settings → Environment Variables
```

---

**Note:** All Vercel URLs (minifi-nuvc.vercel.app, www.minifi.games, etc.) use the same production environment variables.

---

**Last Updated:** 2025-12-10
