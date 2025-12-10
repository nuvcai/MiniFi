# Frontend Vercel Deployment URLs

**Project:** minifi  
**Team:** nuvc  
**Last Updated:** 2025-12-10

---

## 🌐 All Frontend URLs

### Production URLs (Active)

#### Primary Vercel App URL ✅
```
https://minifi-nuvc.vercel.app
```
- **Status:** ✅ Working
- **Type:** Production deployment
- **Use:** Primary Vercel URL
- **Auto-updates:** On git push to main branch

#### Current Deployment URL ✅
```
https://minifi-j09edpaf7-nuvc.vercel.app
```
- **Status:** ✅ Working
- **Type:** Specific deployment
- **Deployment ID:** `dpl_26PaB6FU2io6RdHovNzqiuCTpdjS`
- **Created:** 2025-12-10 11:45:57 GMT+1100
- **Note:** This URL is for this specific deployment (doesn't change)

#### Git Branch URL ✅
```
https://minifi-git-main-nuvc.vercel.app
```
- **Status:** ✅ Working
- **Type:** Git branch deployment
- **Branch:** main
- **Auto-updates:** On git push to main branch

---

### Custom Domain URLs (Configured)

#### Primary Custom Domain ⏳
```
https://www.minifi.games
```
- **Status:** ⏳ Pending DNS propagation
- **Type:** Production (primary)
- **Configuration:** ✅ Valid Configuration
- **Expected:** Working in 30-60 minutes
- **Use:** Main production URL for users

#### Apex Domain ⏳
```
https://minifi.games
```
- **Status:** ⏳ Pending DNS propagation
- **Type:** 307 Redirect → www.minifi.games
- **Configuration:** ✅ Valid Configuration
- **Expected:** Redirects to www after propagation

---

## 📊 URL Comparison

| URL | Status | Type | Updates | Use Case |
|-----|--------|------|---------|----------|
| `minifi-nuvc.vercel.app` | ✅ Working | Production | Auto | **Use Now** |
| `minifi-j09edpaf7-nuvc.vercel.app` | ✅ Working | Deployment | Never | Specific deploy |
| `minifi-git-main-nuvc.vercel.app` | ✅ Working | Git branch | Auto | Git main |
| `www.minifi.games` | ⏳ Pending | Custom | Auto | **Primary** |
| `minifi.games` | ⏳ Pending | Redirect | Auto | Redirect to www |

---

## 🎯 Which URL to Use?

### For Immediate Use (Now):
**Recommended:**
```
https://minifi-nuvc.vercel.app
```
- Works immediately
- Always stays the same
- Auto-updates with deployments
- Share this with users/testers

### For Production (After DNS Propagation):
**Recommended:**
```
https://www.minifi.games
```
- Main production URL
- Custom branded domain
- Will work after DNS propagation (30-60 min)
- Use this as primary URL for marketing/users

### For Development/Testing:
**Options:**
```
https://minifi-git-main-nuvc.vercel.app (tracks main branch)
https://minifi-j09edpaf7-nuvc.vercel.app (specific deployment)
```

---

## 🔗 URL Patterns

### Vercel URL Pattern:
```
https://[project-name]-[unique-id]-[team].vercel.app
https://[project-name]-git-[branch]-[team].vercel.app
https://[project-name]-[team].vercel.app
```

### Your URLs Follow This Pattern:
- Project: `minifi`
- Team: `nuvc`
- Deployment ID: `j09edpaf7`
- Branch: `main`

---

## 📋 URL Checklist

### Vercel App URLs:
- [x] `minifi-nuvc.vercel.app` ✅ Working
- [x] `minifi-j09edpaf7-nuvc.vercel.app` ✅ Working
- [x] `minifi-git-main-nuvc.vercel.app` ✅ Working

### Custom Domain URLs:
- [x] Configured in Vercel ✅
- [x] DNS updated to Vercel nameservers ✅
- [ ] DNS propagation complete ⏳ (30-60 min)
- [ ] `www.minifi.games` working ⏳
- [ ] `minifi.games` redirecting ⏳

---

## 🔧 Environment Variables

All URLs use the same environment variables configured in Vercel:

**Production Environment:**
```bash
NEXT_PUBLIC_API_URL=https://minifi-onqw.onrender.com
```

**Note:** Make sure this is set in Vercel dashboard:
- Settings → Environment Variables
- Environment: Production
- All Vercel URLs will use this

---

## 🎯 Quick Reference

### Share with Users (Now):
```
https://minifi-nuvc.vercel.app
```

### Share with Users (After DNS):
```
https://www.minifi.games
```

### Development/Testing:
```
https://minifi-git-main-nuvc.vercel.app
```

### Specific Deployment (Immutable):
```
https://minifi-j09edpaf7-nuvc.vercel.app
```

---

## 📝 Notes

### URL Behavior:

1. **Vercel App URLs:**
   - Always work immediately
   - Not affected by DNS issues
   - Can be used while custom domain propagates
   - Good for testing/development

2. **Custom Domain URLs:**
   - Depend on DNS configuration
   - Take 15-60 minutes to propagate
   - Better for production/marketing
   - SEO-friendly

3. **Deployment-Specific URLs:**
   - Never change
   - Good for archiving/testing specific versions
   - Each deployment gets unique URL

### Auto-Update URLs:
- `minifi-nuvc.vercel.app` → Updates with each deployment
- `minifi-git-main-nuvc.vercel.app` → Updates on git push to main
- `www.minifi.games` → Updates with each deployment (after DNS)

### Static URLs:
- `minifi-j09edpaf7-nuvc.vercel.app` → Never changes (this specific deployment)

---

## 🚀 Deployment Workflow

### On Git Push to Main:

1. Vercel creates new deployment
2. New unique URL created: `minifi-[new-id]-nuvc.vercel.app`
3. Updates these URLs:
   - ✅ `minifi-nuvc.vercel.app`
   - ✅ `minifi-git-main-nuvc.vercel.app`
   - ✅ `www.minifi.games` (when DNS propagated)
   - ✅ `minifi.games` (when DNS propagated)
4. Old deployment URL still accessible: `minifi-j09edpaf7-nuvc.vercel.app`

---

## 🔍 How to Check URLs

### Test All URLs:
```bash
# Vercel app URL (should work):
curl -I https://minifi-nuvc.vercel.app

# Custom domain (may fail with curl due to bot protection):
# Test in browser instead
```

### Check DNS Propagation:
```bash
# Check nameservers:
dig minifi.games NS +short

# Check DNS resolution:
dig www.minifi.games +short
dig minifi.games +short
```

### Verify in Vercel Dashboard:
1. Go to: https://vercel.com/nuvc/minifi
2. Check: Deployments tab for all URLs
3. Check: Settings → Domains for custom domains

---

## 📊 Summary

### Working Now (Use These):
- ✅ `https://minifi-nuvc.vercel.app` (primary)
- ✅ `https://minifi-j09edpaf7-nuvc.vercel.app`
- ✅ `https://minifi-git-main-nuvc.vercel.app`

### Coming Soon (After DNS):
- ⏳ `https://www.minifi.games` (30-60 min)
- ⏳ `https://minifi.games` → redirects to www

### Recommended for Users:
- **Now:** `minifi-nuvc.vercel.app`
- **Production:** `www.minifi.games` (after DNS)

---

**Last Updated:** 2025-12-10  
**Status:** All Vercel URLs working, custom domain pending DNS propagation

