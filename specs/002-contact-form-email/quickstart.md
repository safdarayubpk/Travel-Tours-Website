# Quickstart: Contact Form Email Delivery

**Feature**: Contact Form Email Delivery  
**Estimated Time**: 30 minutes  
**Difficulty**: Easy ⭐⭐

## Prerequisites

- ✅ Branch `002-contact-form-email` checked out
- ✅ Specification reviewed (`spec.md`)
- ✅ Plan reviewed (`plan.md`)
- ✅ Resend account created (https://resend.com)
- ✅ Resend API key obtained

## Quick Summary

Integrate Resend email delivery into the existing contact form so that submitted inquiries are automatically emailed to safdarayub@gmail.com.

**Files to Change**: 1 (`app/contact/actions.ts`)  
**Files to Create**: 1 (`.env.local`)  
**New Dependencies**: 1 (`resend` package)

## Step-by-Step Implementation

### Step 1: Install Resend Package

```bash
# Install Resend SDK
npm install resend

# Verify installation
npm list resend
# Expected: resend@4.x.x
```

**Time**: ~1 minute

---

### Step 2: Configure Environment Variables

Create or update `.env.local` file in the project root:

```bash
# Create .env.local file
touch .env.local

# Add Resend API key
echo "RESEND_API_KEY=your_actual_api_key_here" >> .env.local
```

**Get Your API Key**:

1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy the key (starts with `re_`)
4. Replace `your_actual_api_key_here` in `.env.local`

**⚠️ Important**: Never commit `.env.local` to git!

Verify `.gitignore` includes:

```bash
# Check .gitignore
grep ".env.local" .gitignore
# Should show: .env.local
```

**Time**: ~2 minutes

---

### Step 3: Update Contact Form Server Action

Open `app/contact/actions.ts` and add Resend integration.

**Current Code** (lines 36-49):

```typescript
// Simulate processing delay (demonstration)
await new Promise((resolve) => setTimeout(resolve, 2000));

// Log form submission (would send email in production)
console.log("Contact form submitted:", {
  ...result.data,
  timestamp: new Date().toISOString(),
});

// Return success
return {
  success: true,
  message: "Thank you for your inquiry! We will contact you within 24 hours.",
};
```

**Replace with** (Resend integration):

```typescript
// Send email via Resend
try {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Format email content
  const timestamp = new Date();
  const formattedDate = timestamp.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  // Get tour name if selected
  let tourInfo = "General Inquiry";
  if (result.data.preferredTour) {
    const { getTours } = await import("@/data/tours");
    const tours = getTours();
    const selectedTour = tours.find(
      (t) => t.slug === result.data.preferredTour
    );
    if (selectedTour) {
      tourInfo = `${selectedTour.name} - $${selectedTour.price.toLocaleString()}`;
    }
  }

  const emailContent = `From: ${result.data.name}
Email: ${result.data.email}
Phone: ${result.data.phone || "Not provided"}
Interested Tour: ${tourInfo}

Message:
${result.data.message}

---
Submitted: ${formattedDate}
(${timestamp.toISOString()})`;

  // Send email
  await resend.emails.send({
    from: "Travel & Tours <onboarding@resend.dev>",
    to: "safdarayub@gmail.com",
    subject: `New Contact Form Inquiry from ${result.data.name}`,
    text: emailContent,
    reply_to: result.data.email,
  });

  // Log success
  console.log("Contact form email sent:", {
    customer: result.data.name,
    timestamp: new Date().toISOString(),
  });

  // Return success
  return {
    success: true,
    message: "Thank you for your inquiry! We will contact you within 24 hours.",
  };
} catch (emailError) {
  // Log email error
  console.error("Email delivery failed:", emailError);

  // Return user-friendly error
  return {
    success: false,
    message:
      "We couldn't send your message right now. Please try again in a few moments.",
  };
}
```

**Time**: ~10 minutes

---

### Step 4: Add Import at Top of File

At the very top of `app/contact/actions.ts` (after `"use server";`), the dynamic imports are already handled in the code above. No top-level imports needed.

**Why dynamic imports?**

- Resend is only used in one code path
- Reduces initial bundle size
- Next.js optimizes server-side dynamic imports

**Time**: ~1 minute

---

### Step 5: Test Email Delivery

```bash
# Start development server
npm run dev

# Open contact form
open http://localhost:3001/contact
# (or visit in browser)
```

**Test Process**:

1. Fill out the contact form:

   - Name: "Test User"
   - Email: "your-email@example.com"
   - Phone: "+1 (555) 123-4567" (optional)
   - Tour: Select any tour (optional)
   - Message: "This is a test message to verify email delivery"

2. Click "Send Message"

3. Wait for response (should see success message in ~2-3 seconds)

4. Check safdarayub@gmail.com inbox for the email

**Expected Email**:

```
From: Travel & Tours <onboarding@resend.dev>
To: safdarayub@gmail.com
Subject: New Contact Form Inquiry from Test User

From: Test User
Email: your-email@example.com
Phone: +1 (555) 123-4567
Interested Tour: [Tour Name] - $[Price]

Message:
This is a test message to verify email delivery

---
Submitted: [Date and Time]
([ISO Timestamp])
```

**Time**: ~5 minutes

---

### Step 6: Test Error Scenarios

**Test 1: Invalid API Key**

```bash
# Temporarily use invalid API key
# Edit .env.local:
RESEND_API_KEY=invalid_key_for_testing

# Restart dev server
# Submit form
# Expected: See error message "We couldn't send your message right now..."
```

**Test 2: Network Issues**

```bash
# Disconnect internet briefly
# Submit form
# Expected: See error message about connection issues
```

**Test 3: Valid Submission After Error**

```bash
# Restore valid API key
# Restart server
# Submit form again
# Expected: Success message, email delivered
```

**Time**: ~10 minutes

---

## Complete Implementation Code

Here's the complete `app/contact/actions.ts` file after changes:

```typescript
"use server";

// Server Action for contact form submission

import { contactFormSchema } from "@/lib/validation";
import type { FormState } from "@/types/contact";

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const tourValue = formData.get("preferredTour");
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      message: formData.get("message"),
      preferredTour: tourValue === "none" ? undefined : tourValue || undefined,
    };

    // Validate with Zod
    const result = contactFormSchema.safeParse(rawData);

    if (!result.success) {
      // Return validation errors
      return {
        success: false,
        message: "Please fix the errors below",
        errors: result.error.flatten().fieldErrors,
      };
    }

    // Send email via Resend
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Format email content
      const timestamp = new Date();
      const formattedDate = timestamp.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      });

      // Get tour name if selected
      let tourInfo = "General Inquiry";
      if (result.data.preferredTour) {
        const { getTours } = await import("@/data/tours");
        const tours = getTours();
        const selectedTour = tours.find(
          (t) => t.slug === result.data.preferredTour
        );
        if (selectedTour) {
          tourInfo = `${selectedTour.name} - $${selectedTour.price.toLocaleString()}`;
        }
      }

      const emailContent = `From: ${result.data.name}
Email: ${result.data.email}
Phone: ${result.data.phone || "Not provided"}
Interested Tour: ${tourInfo}

Message:
${result.data.message}

---
Submitted: ${formattedDate}
(${timestamp.toISOString()})`;

      // Send email
      await resend.emails.send({
        from: "Travel & Tours <onboarding@resend.dev>",
        to: "safdarayub@gmail.com",
        subject: `New Contact Form Inquiry from ${result.data.name}`,
        text: emailContent,
        reply_to: result.data.email,
      });

      // Log success
      console.log("Contact form email sent:", {
        customer: result.data.name,
        timestamp: new Date().toISOString(),
      });

      // Return success
      return {
        success: true,
        message:
          "Thank you for your inquiry! We will contact you within 24 hours.",
      };
    } catch (emailError) {
      // Log email error
      console.error("Email delivery failed:", emailError);

      // Return user-friendly error
      return {
        success: false,
        message:
          "We couldn't send your message right now. Please try again in a few moments.",
      };
    }
  } catch (error) {
    // Catch unexpected errors
    console.error("Contact form error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
```

---

## Verification Checklist

After implementation, verify:

### Functionality

- [ ] Form submission sends email to safdarayub@gmail.com
- [ ] Email contains all form fields (name, email, phone, tour, message)
- [ ] Email has correct subject line
- [ ] Reply-To header is set to customer email
- [ ] Timestamp included in email

### User Experience

- [ ] Success message displays when email sent
- [ ] Error message displays when delivery fails
- [ ] Form can be resubmitted after error
- [ ] Loading state shows during submission
- [ ] No visual changes to form design

### Technical

- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] No console errors in browser
- [ ] Server logs show email delivery status
- [ ] `.env.local` not committed to git

### Testing

- [ ] Test with all required fields
- [ ] Test with optional fields empty
- [ ] Test with invalid API key (error handling)
- [ ] Test with very long message (1000 chars)
- [ ] Test on mobile device/emulator

---

## Troubleshooting

### Issue: "RESEND_API_KEY is not defined"

**Solution**:

```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Verify content
cat .env.local
# Should show: RESEND_API_KEY=re_xxxx...

# 3. Restart dev server
# Stop current server (Ctrl+C)
npm run dev
```

### Issue: Email not received

**Check**:

1. **Spam folder**: Gmail might filter it
2. **API key validity**: Try sending test email via Resend dashboard
3. **Server logs**: Check for error messages
4. **Resend dashboard**: Check email logs at resend.com

### Issue: "Cannot find module 'resend'"

**Solution**:

```bash
# Reinstall package
npm install resend

# Clear cache
rm -rf node_modules
npm install
```

### Issue: TypeScript errors

**Solution**:

```bash
# Restart TypeScript server
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# Check types are installed
npm list @types/node
```

---

## Environment Setup

### Development (.env.local)

```bash
# .env.local (DO NOT COMMIT)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

### Production (Vercel/Hosting)

```bash
# Add environment variable in hosting dashboard
# Vercel: Settings → Environment Variables
# Key: RESEND_API_KEY
# Value: re_xxxxxxxxxxxxxxxxxxxx
# Scope: Production
```

---

## Testing Guide

### Quick Test (2 minutes)

```bash
# 1. Start server
npm run dev

# 2. Open contact form
open http://localhost:3001/contact

# 3. Fill and submit form with test data
# Name: Test User
# Email: test@example.com
# Message: Testing email delivery

# 4. Check success message appears

# 5. Check safdarayub@gmail.com inbox
```

### Complete Test Suite (15 minutes)

**Test 1: Full Form Submission**

- Fill all fields including optional ones
- Submit
- Verify email received with all data

**Test 2: Minimal Form**

- Fill only required fields (name, email, message)
- Leave phone and tour empty
- Verify email shows "Not provided" for optional fields

**Test 3: Tour Selection**

- Select a specific tour
- Verify email includes tour name and price

**Test 4: Error Handling**

- Use invalid API key
- Verify user-friendly error message
- Fix API key and retry successfully

**Test 5: Mobile Responsive**

- Open in mobile view (Chrome DevTools)
- Submit form
- Verify functionality identical to desktop

---

## Commit Message

Once implemented and tested:

```bash
git add app/contact/actions.ts package.json package-lock.json
git commit -m "feat(contact): integrate Resend email delivery

- Install resend npm package
- Add Resend email integration to contact form Server Action
- Send inquiries to safdarayub@gmail.com
- Format email with all form fields and timestamp
- Add Reply-To header for easy customer responses
- Implement error handling with user-friendly messages
- Maintain existing form validation and UI

Constitutional Alignment:
- Principle 1 (UX): Reliable delivery, clear feedback
- Principle 3 (Next.js): Server Actions, proper error handling
- Principle 4 (Type Safety): TypeScript, Resend SDK types
- Principle 7 (Quality): Clean code, proper logging

Refs: #002
Closes: SPEC-002"
```

---

## Post-Implementation

### Verify in Production

After deploying:

1. **Test real submission**: Fill out production contact form
2. **Check email delivery**: Verify email arrives at safdarayub@gmail.com
3. **Test Reply-To**: Click reply in Gmail, verify it goes to customer
4. **Monitor logs**: Check server logs for any errors first 24 hours
5. **Verify spam**: Ensure emails don't go to spam folder

### Monitor Usage

```bash
# Check Resend dashboard
# Visit: https://resend.com/emails
# Monitor: Delivery rate, bounces, spam reports
```

### Documentation

Update README if needed:

```markdown
## Environment Variables

Required environment variables:

- `RESEND_API_KEY` - Resend API key for email delivery
```

---

## Constitutional Principles Satisfied

This implementation satisfies:

- ✅ **Principle 1 (User Experience First)**: Immediate feedback, reliable delivery
- ✅ **Principle 2 (Component Modularity)**: Single responsibility, modular email utility
- ✅ **Principle 3 (Next.js Best Practices)**: Server Actions, proper error handling
- ✅ **Principle 4 (Type Safety)**: TypeScript, Resend SDK fully typed
- ✅ **Principle 5 (Responsive Design)**: No UI changes, existing responsive design maintained
- ✅ **Principle 6 (Performance)**: Server-side only, no client bundle impact
- ✅ **Principle 7 (Code Quality)**: Clean code, proper error handling, logging
- ✅ **Principle 8 (SEO & Accessibility)**: No changes, existing accessibility maintained

---

## Quick Links

### Planning Documents

- **Specification**: `specs/002-contact-form-email/spec.md`
- **Implementation Plan**: `specs/002-contact-form-email/plan.md`
- **Research**: `specs/002-contact-form-email/research.md`
- **Data Model**: `specs/002-contact-form-email/data-model.md`

### External Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Next.js Guide](https://resend.com/docs/send-with-nextjs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**Estimated Total Time**: 30 minutes  
**Complexity**: Easy ⭐⭐ (straightforward API integration)  
**Risk**: Low (isolated changes, good error handling)  
**Impact**: High (enables real customer communication)

Happy coding! 📧
