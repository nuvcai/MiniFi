# Redeploy Instructions - Force Edge Network Update

**Date:** 2025-12-10  
**Action:** Redeploy to fix apex domain connection reset

---

## 🚀 How to Redeploy via Vercel Dashboard

### Step 1: Navigate to Deployments

1. **Go to your project:**
   - URL: https://vercel.com/nuvc/minifi
   
2. **Click the "Deployments" tab** (top of page)

---

### Step 2: Find Latest Deployment

**Look for the most recent deployment:**
- Should be at the top of the list
- Created: ~2 hours ago
- Status: "Ready" with green checkmark
- URL: `minifi-j09edpaf7-nuvc.vercel.app`

---

### Step 3: Trigger Redeploy

1. **Click the three dots (⋮)** on the right side of the deployment
2. **Select "Redeploy"** from the dropdown menu
3. **Confirm the redeploy** when prompted

**OR:**

1. **Click on the deployment** to open details
2. **Click the "Redeploy" button** (top right)
3. **Confirm**

---

### Step 4: Monitor Deployment

**Watch the deployment progress:**
- Build status will show
- Takes 2-5 minutes typically
- Wait for "Ready" status

**URL will be:** `minifi-[new-id]-nuvc.vercel.app`

---

### Step 5: Wait for Edge Propagation

**After deployment completes:**
- Wait **15-20 minutes** for edge network update
- This gives all edge nodes time to receive new config
- Much faster than waiting 2-4 hours

---

### Step 6: Test the Apex Domain

**After 15-20 minutes:**

1. **Clear DNS cache:**
   ```bash
   sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
   ```

2. **Open incognito mode:**
   - Chrome: ⌘ + Shift + N
   - Safari: ⌘ + Shift + N

3. **Visit:**
   ```
   https://minifi.games
   ```

4. **Expected result:**
   - Redirects to `https://www.minifi.games`
   - Site loads correctly
   - No connection reset

---

## ✅ What Redeploying Does

### Forces Edge Network Update:

1. **New Deployment Created:**
   - Fresh deployment ID
   - New configuration bundle

2. **Edge Network Notified:**
   - All edge nodes receive update signal
   - Priority update (not background propagation)
   - Faster than waiting for natural propagation

3. **SSL & DNS Refreshed:**
   - Edge nodes pull latest SSL certs
   - Domain configurations updated
   - Routing rules refreshed

4. **Global Propagation:**
   - 5-10 minutes for deployment
   - 10-20 minutes for edge propagation
   - Total: 15-30 minutes

---

## 📊 Expected Timeline

| Action | Time | Status |
|--------|------|--------|
| Click Redeploy | 0 min | Starting |
| Build & Deploy | 2-5 min | Building |
| Deployment Ready | 5 min | ✅ Complete |
| Edge Propagation | 15-20 min | ⏳ Updating |
| Test Domain | 20 min | ✅ Should work |

---

## 🎯 Alternative: Use Production Hook

If you don't see the redeploy button:

1. **Go to:** Settings → Git
2. **Find:** Production Branch (`main`)
3. **Click:** "Redeploy" next to latest commit
4. **Or:** Push an empty commit to trigger deploy

---

## 🔧 If Redeploy Button Not Found

### Method 1: Git Push (Fastest)

**Trigger new deployment with git:**
```bash
# Make an empty commit:
git commit --allow-empty -m "Trigger redeploy for edge network update"

# Push to main:
git push origin main
```

This will automatically trigger new Vercel deployment.

---

### Method 2: Vercel Dashboard Direct Deploy

1. **Go to:** https://vercel.com/nuvc/minifi
2. **Click:** "Redeploy" button (should be visible on overview)
3. **Or:** Deployments → Latest → ⋮ → Redeploy

---

## ✅ Success Indicators

### After Redeployment + 20 Minutes:

**Test in incognito mode:**
```
https://minifi.games
```

**✅ Success:**
- URL redirects to `https://www.minifi.games`
- Page loads without errors
- Green lock icon (SSL valid)
- No connection reset

**❌ Still failing:**
- Wait another 30 minutes
- Edge network still propagating
- Try different network (mobile data)

---

## 📱 Quick Test

**While waiting, test on mobile:**
- Use mobile phone
- Use mobile data (not WiFi)
- Visit: `https://minifi.games`
- If works → Your computer's DNS cache
- If fails → Wait for edge propagation

---

## 📝 What to Report

After redeploying and waiting 20 minutes:

1. **Did the redeploy complete successfully?**
   - Check deployment status in dashboard
   - Should show "Ready" ✅

2. **Does `minifi.games` work in incognito?**
   - Yes → Problem solved! ✅
   - No → Still propagating (wait 30 more min)

3. **Does `www.minifi.games` still work?**
   - Should be: Yes ✅
   - This shouldn't be affected

---

**Last Updated:** 2025-12-10  
**Action:** Redeploy via Vercel dashboard  
**Expected Resolution:** 15-30 minutes after redeploy  
**Fallback:** Use www.minifi.games (always works) ✅
