# Gmail App Password Setup for Password Reset Emails

## ✅ What I've Done:
1. ✅ Installed Nodemailer (professional email library)
2. ✅ Created server-side email system
3. ✅ Updated backend API to send emails directly
4. ✅ Removed dependency on EmailJS template configuration

## 🔐 Final Step: Get Your Gmail App Password (2 minutes)

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to: https://myaccount.google.com/security
2. Click on **"2-Step Verification"**
3. Follow the steps to enable it (if not already enabled)

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Type: **Paarsh E-Learning**
5. Click **Generate**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Your .env File
Open `.env` file and replace:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
```

With your actual credentials:

```env
EMAIL_USER=aryaphunne2005@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

(Use the 16-character password from Step 2, remove spaces)

### Step 4: Restart Your Dev Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## 🎯 Test It!
1. Go to `/forgot-password`
2. Enter: `aryaphunne2005@gmail.com`
3. Click "Send Reset Link"
4. **Check your Gmail inbox** (should arrive in seconds!)

---

## ✨ Benefits of This Approach:
- ✅ **No EmailJS template configuration needed**
- ✅ **Professional HTML email design**
- ✅ **Server-side (more secure)**
- ✅ **Works with any email provider**
- ✅ **Full control over email content**

---

## 🔒 Security Notes:
- App passwords are safer than your actual Gmail password
- They can be revoked anytime
- Only works with 2FA enabled (more secure)

---

## Alternative: Use a Different Email Provider

If you don't want to use Gmail, you can use:
- **SendGrid** (100 emails/day free)
- **Mailgun** (100 emails/day free)
- **AWS SES** (62,000 emails/month free)

Let me know if you want to use any of these instead!
