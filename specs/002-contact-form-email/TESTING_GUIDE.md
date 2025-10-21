# Phase 4: Testing & Validation Guide

**Feature**: Contact Form Email Delivery  
**Phase**: 4 of 5  
**Duration**: 30 minutes  
**Status**: Ready for Testing

---

## Prerequisites Verification

✅ **Development Server**: Running on http://localhost:3001  
✅ **Resend API Key**: Configured in `.env.local`  
✅ **Implementation**: Phase 3 complete (email logic implemented)  
✅ **Email Account**: Access to safdarayub@gmail.com

---

## Testing Overview

Phase 4 includes **7 manual tests** organized into **2 groups**:

### Group 1: Parallel Tests (T014-T018)

These tests can be performed in any order:

- ✅ T014: Successful email delivery
- ✅ T015: Email content format verification
- ✅ T016: Reply-To functionality
- ✅ T017: Error handling
- ✅ T018: Form reset behavior

### Group 2: Sequential Tests (T019-T020)

Perform these after Group 1:

- ✅ T019: Minimal form submission
- ✅ T020: Existing validation preservation

---

## Test Scenarios

### T014: Test Successful Email Delivery 🎯

**Goal**: Verify emails are delivered successfully to safdarayub@gmail.com

**Steps**:

1. Open http://localhost:3001/contact in your browser
2. Fill out the complete form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Phone**: +1 (555) 123-4567
   - **Tour**: Select any tour (e.g., "African Safari")
   - **Message**: "This is a test of email delivery for the contact form feature."
3. Click **"Send Message"** button
4. Wait for response (should be ~2-5 seconds)
5. Check safdarayub@gmail.com inbox

**Expected Results**:

- ✅ Success message displays: "Thank you for your inquiry! We will contact you within 24 hours."
- ✅ Success message appears within 5 seconds
- ✅ Email arrives in safdarayub@gmail.com inbox within 10 seconds
- ✅ Subject line: "New Contact Form Inquiry from Test User"
- ✅ From address: "Travel & Tours <onboarding@resend.dev>"

**Server Console Check**:
Look for this log in your terminal:

```
Contact form email sent: {
  customer: 'Test User',
  customerEmail: 'test@example.com',
  timestamp: '2025-10-20T...'
}
```

**Pass Criteria**:

- [ ] Success message displayed
- [ ] Email received within 10 seconds
- [ ] Subject line correct
- [ ] From address correct
- [ ] Server log shows success

---

### T015: Test Email Content Format 📧

**Goal**: Verify email contains all form data in correct format

**Steps**:

1. Open the email received from T014 in Gmail
2. Verify all fields are present and correctly formatted

**Expected Email Content**:

```
From: Test User
Email: test@example.com
Phone: +1 (555) 123-4567
Interested Tour: African Safari - $2,999

Message:
This is a test of email delivery for the contact form feature.

---
Submitted: Monday, October 20, 2025, 11:45 AM EST
(2025-10-20T11:45:23.456Z)
```

**Pass Criteria**:

- [ ] Name field present and correct
- [ ] Email field present and correct
- [ ] Phone field present and correct
- [ ] Tour name and price included
- [ ] Message content preserved exactly
- [ ] Human-readable timestamp included
- [ ] ISO 8601 timestamp included
- [ ] All formatting clean and readable

---

### T016: Test Reply-To Functionality 📬

**Goal**: Verify clicking Reply addresses the customer's email

**Steps**:

1. In Gmail, open the test email from T014
2. Click the **"Reply"** button
3. Observe the recipient field in the compose window

**Expected Result**:

- ✅ Reply composer opens
- ✅ "To:" field is automatically filled with: test@example.com
- ✅ Subject line: "Re: New Contact Form Inquiry from Test User"

**Pass Criteria**:

- [ ] Reply button works
- [ ] Reply addresses customer email (test@example.com)
- [ ] NOT replying to onboarding@resend.dev
- [ ] Can compose and send reply directly to customer

---

### T017: Test Error Handling ⚠️

**Goal**: Verify graceful error handling when email delivery fails

**Steps**:

1. **Break the configuration** (temporarily):

   ```bash
   # In terminal, stop the dev server (Ctrl+C)

   # Edit .env.local to use invalid API key
   echo "RESEND_API_KEY=invalid_key_for_testing" > /home/safdarayub/Desktop/Images/travel_tours/.env.local

   # Restart dev server
   npm run dev
   ```

2. Open http://localhost:3001/contact
3. Fill out the form:
   - Name: Error Test
   - Email: error@example.com
   - Message: Testing error handling
4. Click "Send Message"
5. Observe the result

**Expected Results**:

- ✅ Error message displays: "We couldn't send your message right now. Please try again in a few moments."
- ✅ NO technical details shown to user
- ✅ NO API key or error stack visible
- ✅ Form remains functional (not broken)
- ✅ Can try submitting again

**Server Console Check**:
Look for error log:

```
Email delivery failed: [Error details]
```

**Pass Criteria**:

- [ ] User-friendly error message shown
- [ ] No technical jargon displayed
- [ ] No sensitive data leaked
- [ ] Error logged to server console
- [ ] Form still functional

**⚠️ IMPORTANT - Restore Configuration**:

```bash
# Stop server (Ctrl+C)

# Restore valid API key (replace with your actual key)
echo "RESEND_API_KEY=re_your_actual_key" > /home/safdarayub/Desktop/Images/travel_tours/.env.local

# Restart server
npm run dev
```

---

### T018: Test Form Reset 🔄

**Goal**: Verify form clears after successful submission

**Steps**:

1. Open http://localhost:3001/contact
2. Fill out the form completely:
   - Name: John Smith
   - Email: john@example.com
   - Phone: +1 (555) 987-6543
   - Tour: Select any tour
   - Message: Test form reset functionality
3. Click "Send Message"
4. Wait for success message
5. Observe form fields

**Expected Results**:

- ✅ Success message displays
- ✅ All form fields are cleared:
  - Name field: empty
  - Email field: empty
  - Phone field: empty
  - Tour dropdown: reset to "Select a tour"
  - Message field: empty
- ✅ Can immediately fill and submit a new inquiry

**Pass Criteria**:

- [ ] Success message appears
- [ ] All fields cleared after success
- [ ] Form ready for new submission
- [ ] No residual data from previous submission

---

### T019: Test Minimal Form Submission 📝

**Goal**: Verify email works with only required fields

**Steps**:

1. Open http://localhost:3001/contact
2. Fill ONLY required fields:
   - **Name**: Jane Doe
   - **Email**: jane@example.com
   - **Message**: Minimal test inquiry
3. Leave optional fields empty:
   - Phone: (leave empty)
   - Tour: (leave as "Select a tour" or "none")
4. Click "Send Message"
5. Check safdarayub@gmail.com inbox

**Expected Email Content**:

```
From: Jane Doe
Email: jane@example.com
Phone: Not provided
Interested Tour: General Inquiry

Message:
Minimal test inquiry

---
Submitted: [timestamp]
```

**Pass Criteria**:

- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Email received in inbox
- [ ] Optional fields show "Not provided"
- [ ] Tour shows "General Inquiry"
- [ ] No errors or missing data

---

### T020: Test Existing Validation 🛡️

**Goal**: Verify existing form validation still works (no regression)

**Test Cases**:

#### Test Case A: Empty Name Field

1. Open http://localhost:3001/contact
2. Leave Name field empty
3. Fill email and message
4. Click "Send Message"

**Expected**: Validation error for name field, no email sent

#### Test Case B: Invalid Email Format

1. Open http://localhost:3001/contact
2. Enter Name: "Test User"
3. Enter Email: "not-a-valid-email"
4. Enter Message: "Testing validation"
5. Click "Send Message"

**Expected**: Validation error for email format, no email sent

#### Test Case C: Message Too Short

1. Open http://localhost:3001/contact
2. Enter Name: "Test User"
3. Enter Email: "test@example.com"
4. Enter Message: "Hi" (less than 10 characters)
5. Click "Send Message"

**Expected**: Validation error for message length, no email sent

#### Test Case D: All Fields Empty

1. Open http://localhost:3001/contact
2. Leave all fields empty
3. Click "Send Message"

**Expected**: Validation errors for all required fields, no email sent

**Pass Criteria**:

- [ ] Empty name shows validation error
- [ ] Invalid email format rejected
- [ ] Short message rejected
- [ ] Multiple validation errors shown together
- [ ] No emails sent for invalid forms
- [ ] Error messages clear and helpful
- [ ] Validation works exactly as before

---

## Testing Checklist

### Group 1: Core Functionality

- [ ] T014: Successful email delivery ✉️
- [ ] T015: Email content format 📧
- [ ] T016: Reply-To functionality 📬
- [ ] T017: Error handling ⚠️
- [ ] T018: Form reset 🔄

### Group 2: Edge Cases

- [ ] T019: Minimal form submission 📝
- [ ] T020: Existing validation 🛡️

---

## Additional Checks

### Visual/UX Checks (No Regression)

- [ ] Contact form looks identical to before (no UI changes)
- [ ] Form is responsive on mobile (test at 320px width)
- [ ] All buttons work correctly
- [ ] Loading states appropriate
- [ ] Success/error messages styled correctly

### Performance Checks

- [ ] Form submission completes within 5 seconds
- [ ] No page reload or flash
- [ ] Smooth user experience
- [ ] No console errors in browser DevTools

### Accessibility Checks

- [ ] Form can be filled using keyboard only (Tab navigation)
- [ ] Error messages announced to screen readers
- [ ] Success messages announced
- [ ] All form inputs have proper labels

---

## After Testing

### Mark Tasks Complete

Once you've verified all tests pass, update `tasks.md`:

```bash
# Update tasks.md to mark T014-T020 as complete
# Change [ ] to [x] for each passing test
```

### Next Steps

After all Phase 4 tests pass:

```bash
/speckit.implement implement phase 5
```

Phase 5 will run code quality checks (ESLint, TypeScript) and create documentation.

---

## Troubleshooting

### Email Not Received

- Check Resend dashboard for delivery logs
- Check spam/junk folder in Gmail
- Verify API key is valid
- Check server console for errors

### Error Message Appears

- Check `.env.local` has valid API key
- Restart dev server after env changes
- Check server console for detailed error
- Verify Resend account is active

### Form Not Clearing

- Check browser console for JavaScript errors
- Verify success message appears
- Try hard refresh (Ctrl+Shift+R)

### Validation Not Working

- Clear browser cache
- Check browser console for errors
- Verify no TypeScript/build errors

---

## Success Criteria

**Phase 4 is complete when**:

- ✅ All 7 test tasks (T014-T020) pass
- ✅ Email delivered successfully to safdarayub@gmail.com
- ✅ Email content correctly formatted
- ✅ Reply-To works correctly
- ✅ Error handling graceful
- ✅ Form resets after success
- ✅ Minimal submissions work
- ✅ Existing validation unchanged
- ✅ No visual regressions
- ✅ No accessibility issues
- ✅ Performance acceptable

---

## Quick Test Summary

**Fastest path to validate core functionality** (5 minutes):

1. **Submit valid form** → Email arrives → T014 ✅
2. **Check email content** → All fields present → T015 ✅
3. **Click Reply** → Addresses customer → T016 ✅
4. **Test validation** → Empty fields rejected → T020 ✅

That covers 80% of functionality. Complete T017-T019 for full coverage.

---

**Ready to test?** Open http://localhost:3001/contact and start with T014! 🚀
