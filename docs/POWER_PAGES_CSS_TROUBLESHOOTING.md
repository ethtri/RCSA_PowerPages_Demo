# Power Pages CSS Troubleshooting Guide

## 🚨 **Common Issue: Dashboard/Pages Lost All Styling**

### **Symptoms:**
- Dashboard cards appear as plain HTML (no shadows, borders, colors)
- Header becomes transparent or unstyled
- All custom RCSA styling disappears
- Console shows: `GET https://rcsa-demo.powerappsportals.com/rcsa-styles.css net::ERR_ABORTED 404 (Not Found)`

### **Root Cause: Incorrect CSS Path**
Power Pages requires **relative paths** for CSS resources, not absolute paths.

---

## ⚡ **Quick Fix (2 minutes)**

### **Step 1: Check CSS Links**
Look for this pattern in affected files:
```html
<!-- ❌ BROKEN - Absolute path causes 404 -->
<link rel="stylesheet" href="/rcsa-styles.css">

<!-- ✅ CORRECT - Relative path works -->
<link rel="stylesheet" href="rcsa-styles.css">
```

### **Step 2: Fix All Files**
Update these key files:
- `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/content-pages/scrDashboard_1LoD.en-US.webpage.copy.html`
- `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html`

### **Step 3: Deploy**
```bash
cd powerpages
pac powerpages upload --path rcsa-copilot-demo---rcsa-demo --modelVersion 2
```

### **Step 4: Verify**
Test both pages:
- Dashboard: https://rcsa-demo.powerappsportals.com/scrDashboard_1LoD
- Assessment: https://rcsa-demo.powerappsportals.com/wizAssessment

---

## 🔍 **Quick Diagnostic Commands**

### **Find All CSS Links:**
```bash
grep -n "rcsa-styles.css" powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/*/content-pages/*.html
```

### **Check if CSS File Exists as Web File:**
```bash
ls powerpages/rcsa-copilot-demo---rcsa-demo/web-files/rcsa-styles.css*
```
*If this returns "No such file", that's the problem! The CSS file needs to be uploaded as a web file.*

### **Check for Absolute Paths:**
```bash
grep -n 'href="/' powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/*/content-pages/*.html
```

---

## 🛡️ **Prevention Tips**

### **1. Always Use Relative Paths**
```html
<!-- ✅ Power Pages Approved -->
<link rel="stylesheet" href="rcsa-styles.css">
<script src="custom-script.js"></script>

<!-- ❌ Avoid These -->
<link rel="stylesheet" href="/rcsa-styles.css">
<link rel="stylesheet" href="/css/rcsa-styles.css">
```

### **2. Pre-Deployment Checklist**
- [ ] CSS links use relative paths
- [ ] No leading slashes in resource URLs
- [ ] Both dashboard and wizard pages have CSS links
- [ ] Test locally if possible

### **3. Post-Deployment Verification**
- [ ] Dashboard styling loads correctly
- [ ] Assessment wizard styling loads correctly
- [ ] No 404 errors in browser console
- [ ] Headers are properly styled (blue gradient)

---

## 🛠️ **If CSS File is Missing from Web Files**

If `ls powerpages/rcsa-copilot-demo---rcsa-demo/web-files/rcsa-styles.css*` shows "No such file":

### **Step 1: Copy CSS File**
```bash
copy design-system\rcsa-styles.css powerpages\rcsa-copilot-demo---rcsa-demo\web-files\rcsa-styles.css
```

### **Step 2: Create Metadata File**
Create `powerpages/rcsa-copilot-demo---rcsa-demo/web-files/rcsa-styles.css.webfile.yml`:
```yaml
adx_displayorder: 4
adx_enabletracking: false
adx_excludefromsearch: true
adx_hiddenfromsitemap: false
adx_name: rcsa-styles.css
adx_parentpageid: 88c12c7a-31f2-4b55-bea4-45f12fae67cb
adx_partialurl: rcsa-styles.css
adx_publishingstateid: 5c88a359-5719-44bf-928c-a320e34b4a07
adx_webfileid: 5fb9ff86-39d7-4814-c32e-df9ff0eae59e
annotationid: 587c4f6f-4675-f122-cfd3-111e4b5fdc8b
filename: rcsa-styles.css
isdocument: true
mimetype: text/css
objectid: 5fb9ff86-39d7-4814-c32e-df9ff0eae59e
objecttypecode: adx_webfile
```

### **Step 3: Deploy**
```bash
pac powerpages upload --path powerpages/rcsa-copilot-demo---rcsa-demo --modelVersion 2
```

---

## 🎯 **Expected Results After Fix**

✅ **Dashboard Should Show:**
- Beautiful card formatting with shadows
- Branded blue gradient header
- Proper RCSA color scheme
- Professional button styling
- AI-prioritized tasks styling

✅ **Assessment Wizard Should Show:**
- Custom wizard header
- Progress indicator styling
- Risk assessment card formatting
- Modern 5x5 risk matrix styling

---

## 📞 **When This Happens**

1. **Don't Panic** - This is a 2-minute fix
2. **Check CSS paths** - Look for absolute paths with leading `/`
3. **Fix to relative paths** - Remove leading `/` from CSS hrefs
4. **Deploy immediately** - `pac powerpages upload --path rcsa-copilot-demo---rcsa-demo --modelVersion 2`
5. **Test both pages** - Verify dashboard and wizard work

---

**💡 Pro Tip:** This issue often happens when copying CSS links from other environments or when auto-complete adds absolute paths. Always double-check CSS links in Power Pages! 