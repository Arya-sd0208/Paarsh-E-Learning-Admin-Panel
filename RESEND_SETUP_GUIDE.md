# Resend Setup Guide - Simple Email Solution

## ✅ What I've Done:
1. ✅ Installed Resend (professional email service)
2. ✅ Created server-side email API
3. ✅ Removed all EmailJS dependencies
4. ✅ Beautiful HTML email template included

## 🚀 Get Your FREE Resend API Key (2 minutes):

### Step 1: Sign Up
1. Go to: https://resend.com/signup
2. Sign up with your email (or GitHub)
3. Verify your email

### Step 2: Get API Key
1. After login, you'll see your dashboard
2. Click **"API Keys"** in the left sidebar
3. Click **"Create API Key"**
4. Name it: `Paarsh E-Learning`
5. **Copy the API key** (starts with `re_`)

### Step 3: Add to .env
Open your `.env` file and replace:
```env
RESEND_API_KEY=re_123456789_YourAPIKeyHere
```

With your actual API key:
```env
RESEND_API_KEY=re_abc123xyz789_YourActualKeyHere
```

### Step 4: Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 🎯 Test It!
1. Go to `/forgot-password`
2. Enter: `aryaphunne2005@gmail.com`
3. Click "Send Reset Link"
4. **Check your Gmail inbox** (arrives in seconds!)

---

## ✨ Why Resend is Better:
- ✅ **No template configuration needed** - works immediately
- ✅ **Server-side** (more secure than EmailJS)
- ✅ **Free tier**: 3,000 emails/month
- ✅ **Beautiful HTML emails** built-in
- ✅ **99.9% delivery rate**
- ✅ **No spam folder issues**

---

## 📧 Free Tier Limits:
- 3,000 emails per month
- 100 emails per day
- Perfect for your e-learning platform!

---

## 🔒 Security:
- API key is server-side only (never exposed to browser)
- More secure than client-side EmailJS
- Professional email delivery

---

That's it! Just get the API key and add it to `.env` - everything else is done! 🚀
