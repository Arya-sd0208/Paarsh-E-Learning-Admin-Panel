# EmailJS Password Reset Template Setup Guide

## Quick 2-Minute Setup

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/
2. Login with your credentials

### Step 2: Edit Template `template_e8nuaml`
1. Click on **"Email Templates"** in the left sidebar
2. Find and click on **`template_e8nuaml`**

### Step 3: Configure the Template Settings (RIGHT SIDE)

**IMPORTANT: On the right side panel, set these fields:**

- **To Email**: `{{to_email}}`  ← CRITICAL! This must be exactly this
- **From Name**: `Paarsh E-Learning`
- **From Email**: Your verified email (e.g., `noreply@paarshelearning.com`)
- **Subject**: `{{subject}}`
- **Reply To**: `{{to_email}}`

### Step 4: Configure the Email Body (LEFT SIDE)

Replace the entire email body with this:

```
Hello {{to_name}},

{{message}}

If you didn't request this, please ignore this email.

Best regards,
Paarsh E-Learning Team
```

### Step 5: Save the Template
Click the **"Save"** button at the top right

---

## That's it! 

Now when you test the password reset:
1. Go to `/forgot-password`
2. Enter: `aryaphunne2005@gmail.com`
3. Click "Send Reset Link"
4. Check your email inbox (and spam folder!)

---

## Alternative: Create a New Template

If you prefer to create a dedicated password reset template:

1. Click **"Create New Template"**
2. Name it: `Password Reset`
3. Template ID will be auto-generated (e.g., `template_xyz123`)
4. Follow Steps 3-5 above
5. Copy the new template ID
6. Update your `.env` file:
   ```
   NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_TEMPLATE_ID=template_xyz123
   ```
7. Let me know and I'll update the code to use this new template

---

## Troubleshooting

**Still not receiving emails?**

1. **Check Spam Folder** - Reset emails often go to spam
2. **Verify Email Service** - Make sure your EmailJS account email service is connected
3. **Check Monthly Limit** - Free plan has 200 emails/month limit
4. **Test with Gmail** - Try with a Gmail address first as they're most reliable

**Need Help?**
Let me know which step you're stuck on and I'll help!
