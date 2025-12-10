# Solution 1: Clear DNS Cache & Test

**Date:** 2025-12-10  
**Action:** Clearing DNS cache and testing in incognito mode

---

## Step 1: Clear DNS Cache (Terminal)

**Run this command in your terminal:**
```bash
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

**You'll be prompted for your password** - this is normal and required.

---

## Step 2: Clear Browser Cache

### Chrome:
1. Open Chrome Settings (⌘ + ,)
2. Privacy and security → Clear browsing data
3. Select: **Cached images and files**
4. Time range: **Last hour**
5. Click **Clear data**

### Safari:
1. Safari → Settings (⌘ + ,)
2. Advanced → Show Develop menu
3. Develop menu → Empty Caches (⌘ + ⌥ + E)

### Firefox:
1. Firefox → Settings
2. Privacy & Security → Cookies and Site Data
3. Click **Clear Data**
4. Select **Cached Web Content**
5. Click **Clear**

---

## Step 3: Test in Incognito Mode

### Open Incognito Window:
- **Chrome:** ⌘ + Shift + N
- **Safari:** ⌘ + Shift + N
- **Firefox:** ⌘ + Shift + P

### Test URLs:

**1. Test apex domain:**
```
https://minifi.games
```

**What to expect:**
- ✅ **Best case:** Redirects to www.minifi.games (it's working!)
- ⏳ **If still error:** Edge network still propagating (wait 30-60 min)

**2. Test www subdomain:**
```
https://www.minifi.games
```

**What to expect:**
- ✅ **Should work:** Loads site directly

---

## Step 4: Additional DNS Flush (If Needed)

**If still having issues, try these additional commands:**

```bash
# Flush all DNS caches:
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
sudo discoveryutil mdnsflushcache
sudo discoveryutil udnsflushcaches

# Restart network services:
sudo networksetup -setv6off Wi-Fi
sudo networksetup -setv6automatic Wi-Fi
```

---

## Step 5: Verify DNS Resolution

**Check what IP your computer sees:**
```bash
# Check apex domain:
nslookup minifi.games

# Check www subdomain:
nslookup www.minifi.games
```

**Expected IPs (Vercel):**
- `216.150.x.x` (Vercel IPs)

**If you see different IPs:**
- DNS cache not cleared yet
- Wait 5 minutes and try again

---

## 🎯 What to Report

After trying these steps, please report:

1. **Did incognito mode work?**
   - Yes → DNS cache was the issue!
   - No → Edge network still propagating

2. **Which URL works?**
   - `www.minifi.games` works? → Use this for now
   - `minifi.games` works? → Problem solved!
   - Both work? → Everything fixed!
   - Neither works? → Need further investigation

3. **What error do you see (if any)?**
   - "ERR_CONNECTION_RESET" → Still propagating
   - "SSL error" → Certificate issue
   - "Site can't be reached" → DNS issue
   - Site loads → Success!

---

## ✅ Success Indicators

### If Working:
- ✅ `minifi.games` redirects to `www.minifi.games`
- ✅ URL bar shows `https://www.minifi.games`
- ✅ Green lock icon (secure)
- ✅ Site loads with all content

### If Still Not Working:
- ⏳ Wait 30-60 more minutes
- ⏳ Edge network propagating
- ✅ Use `www.minifi.games` meanwhile

---

## 📱 Alternative: Test from Mobile Device

**Quick test without DNS cache issues:**

1. **Open your phone** (iPhone/Android)
2. **Use mobile data** (not WiFi - different DNS)
3. **Visit:** `https://minifi.games`

**If works on mobile but not computer:**
→ DNS cache issue on computer (needs more flushing)

**If doesn't work on mobile either:**
→ Edge network still propagating globally

---

## 🔧 Troubleshooting

### Issue: Password Required
**Solution:** This is normal for DNS cache clear. Enter your Mac password.

### Issue: Command Not Found
**Solution:** Run in Terminal app (Applications → Utilities → Terminal)

### Issue: Still Getting Error
**Solution:** 
- Wait 30-60 minutes
- Try again with fresh incognito window
- Use `www.minifi.games` meanwhile

---

## ⏰ Timeline

**If DNS cache was the issue:**
- ✅ Works immediately after clearing

**If edge network propagation:**
- ⏳ 30-60 more minutes
- ⏳ Try again after waiting
- ✅ Will resolve automatically

---

**Last Updated:** 2025-12-10  
**Next Steps:** Clear cache → Test in incognito → Report results
