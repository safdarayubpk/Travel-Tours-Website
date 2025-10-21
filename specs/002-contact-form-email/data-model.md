# Data Model: Contact Form Email Delivery

**Feature**: Contact Form Email Delivery  
**Date**: 2025-10-20  
**Status**: Complete

## Overview

This document defines the data structures for contact form email delivery. Since this feature enhances existing functionality, most data models already exist. This document focuses on the email-specific data structures.

## Existing Data Entities

### ContactFormData (Already Defined)

**Location**: `types/contact.ts`

**Structure** (from existing codebase):

```typescript
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredTour?: string;
}
```

**Validation** (from existing codebase):

- Uses Zod schema in `lib/validation.ts`
- `contactFormSchema` enforces:
  - name: min 2 chars, max 100 chars
  - email: valid email format
  - phone: optional, valid phone format if provided
  - message: min 10 chars, max 1000 chars
  - preferredTour: optional, must be valid tour slug or "none"

**Status**: ✅ No changes needed - already comprehensive

---

## New Data Entities

### EmailPayload

**Purpose**: Structure for email content sent via Resend API

**Type Definition**:

```typescript
export interface EmailPayload {
  from: string; // Sender email with display name
  to: string | string[]; // Recipient email address(es)
  subject: string; // Email subject line
  text: string; // Plain text email body
  reply_to?: string; // Reply-To header (customer email)
}
```

**Field Specifications**:

| Field    | Type   | Required | Constraints                    | Example                                       |
| -------- | ------ | -------- | ------------------------------ | --------------------------------------------- |
| from     | string | Yes      | Must be verified Resend domain | "Travel & Tours <onboarding@resend.dev>"      |
| to       | string | Yes      | Valid email address            | "safdarayub@gmail.com"                        |
| subject  | string | Yes      | 1-100 characters               | "New Contact Form Inquiry from John Smith"    |
| text     | string | Yes      | 10-5000 characters             | Formatted email body with all inquiry details |
| reply_to | string | No       | Valid email if provided        | Customer's email for easy replies             |

**Validation Rules**:

- `from` must match Resend verified sender
- `to` must be valid email format
- `subject` must not be empty
- `text` must contain formatted inquiry details
- `reply_to` must be customer's validated email

---

### EmailFormattedContent

**Purpose**: Structured email body content before conversion to plain text

**Type Definition**:

```typescript
export interface EmailFormattedContent {
  customerName: string;
  customerEmail: string;
  customerPhone: string; // "Not provided" if missing
  interestedTour: string; // Tour name or "General Inquiry"
  message: string;
  submittedDate: string; // Human-readable
  submittedISO: string; // ISO 8601
}
```

**Example Instance**:

```typescript
const emailContent: EmailFormattedContent = {
  customerName: "John Smith",
  customerEmail: "john.smith@example.com",
  customerPhone: "+1 (555) 123-4567",
  interestedTour: "Greece Island Hopping Adventure - $2,199",
  message: "I'm interested in booking this tour for June 2026...",
  submittedDate: "Monday, October 20, 2025 at 2:45 PM EST",
  submittedISO: "2025-10-20T14:45:32.123Z",
};
```

**Rendered as Plain Text**:

```
From: John Smith
Email: john.smith@example.com
Phone: +1 (555) 123-4567
Interested Tour: Greece Island Hopping Adventure - $2,199

Message:
I'm interested in booking this tour for June 2026...

---
Submitted: Monday, October 20, 2025 at 2:45 PM EST
(2025-10-20T14:45:32.123Z)
```

---

### EmailResult

**Purpose**: Response from email sending operation

**Type Definition**:

```typescript
export interface EmailResult {
  success: boolean;
  messageId?: string; // Resend email ID (if successful)
  error?: string; // Error message (if failed)
}
```

**Success Response**:

```typescript
{
  success: true,
  messageId: "b1946ac9-2f3a-4c3d-9012-3456789abcde",
  error: undefined
}
```

**Failure Response**:

```typescript
{
  success: false,
  messageId: undefined,
  error: "API key invalid"
}
```

**Usage in Server Action**:

```typescript
const emailResult = await sendContactEmail(formData);

if (emailResult.success) {
  return { success: true, message: "Email sent!" };
} else {
  console.error("Email failed:", emailResult.error);
  return { success: false, message: "Please try again" };
}
```

---

## Data Relationships

```
ContactFormData (User Input)
    ↓
EmailFormattedContent (Transform)
    ↓
EmailPayload (Resend Format)
    ↓
Resend API
    ↓
EmailResult (Response)
    ↓
FormState (UI Feedback)
```

**Flow Explanation**:

1. **ContactFormData**: User fills out form (existing types)
2. **EmailFormattedContent**: Transform form data into email-friendly format
3. **EmailPayload**: Structure for Resend API call
4. **EmailResult**: Response from email sending operation
5. **FormState**: Existing type for UI feedback (success/error messages)

---

## Data Validation

### Input Validation (Existing)

**Handled by**: `lib/validation.ts` (contactFormSchema)

**Rules**:

- Name: 2-100 characters, required
- Email: Valid email format, required
- Phone: Valid phone format, optional
- Message: 10-1000 characters, required
- Preferred Tour: Valid tour slug or "none", optional

**Status**: ✅ No changes needed

### Email Payload Validation

**New Validation**:

```typescript
function validateEmailPayload(payload: EmailPayload): boolean {
  // Basic validation before sending
  if (!payload.from || !payload.to || !payload.subject || !payload.text) {
    return false;
  }

  // Validate sender matches allowed domain
  if (!payload.from.includes("onboarding@resend.dev")) {
    return false;
  }

  // Validate recipient
  if (!payload.to.includes("safdarayub@gmail.com")) {
    return false;
  }

  return true;
}
```

**Purpose**: Prevent malformed email requests before API call

---

## State Management

### Existing State (No Changes)

**FormState** (from `types/contact.ts`):

```typescript
export interface FormState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    preferredTour?: string[];
  };
}
```

**Used in**: `contact-form.tsx` via `useActionState` hook

**Status**: ✅ No modifications needed - existing state structure supports success/error messaging

---

## Configuration Data

### Environment Variables

**Required**:

```typescript
// Environment variable type definitions
interface EmailConfig {
  RESEND_API_KEY: string; // Resend API key
}

// Runtime validation
const emailConfig: EmailConfig = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
};

if (!emailConfig.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not configured");
}
```

**Storage**:

- Development: `.env.local` (not committed)
- Production: Environment variables (Vercel/hosting platform)

### Email Constants

```typescript
export const EMAIL_CONFIG = {
  FROM: "Travel & Tours <onboarding@resend.dev>",
  TO: "safdarayub@gmail.com",
  SUBJECT_PREFIX: "New Contact Form Inquiry from",
  TIMEOUT_MS: 5000, // 5 second timeout
} as const;
```

**Status**: Will be defined in implementation

---

## Database Schema

**N/A** - No database storage required

**Rationale**: Per specification, storing inquiries in database is out of scope. Email delivery is the primary persistence mechanism.

---

## API Data Contracts

### Resend API Request

**Endpoint**: `https://api.resend.com/emails`  
**Method**: POST  
**Authentication**: Bearer token (API key in header)

**Request Body**:

```json
{
  "from": "Travel & Tours <onboarding@resend.dev>",
  "to": "safdarayub@gmail.com",
  "subject": "New Contact Form Inquiry from John Smith",
  "text": "[formatted email content]",
  "reply_to": "john.smith@example.com"
}
```

**Success Response** (200):

```json
{
  "id": "b1946ac9-2f3a-4c3d-9012-3456789abcde"
}
```

**Error Response** (400/401/500):

```json
{
  "message": "Error description",
  "name": "validation_error"
}
```

**Documentation**: See `contracts/resend-api.yaml` for full OpenAPI spec

---

## Data Volume & Scale

### Expected Usage

**Daily Volume**: 5-20 contact form submissions  
**Monthly Volume**: 150-600 emails  
**Peak Load**: 10 submissions/hour (during business hours)

**Resend Free Tier**: 100 emails/day, 3,000/month  
**Headroom**: ~5-10x current expected volume

### Data Retention

**Email Service**: Resend logs emails for 30 days (API logs)  
**Server Logs**: Indefinite (log aggregation system dependent)  
**Client Data**: No persistence (form clears on success)

**Privacy Note**: Customer data only persists in:

1. Recipient's Gmail inbox (safdarayub@gmail.com)
2. Resend logs (30 days)
3. Server error logs (if delivery failed)

---

## Security Considerations

### Data Protection

**In Transit**:

- ✅ HTTPS for all API communication
- ✅ Resend API uses TLS 1.2+
- ✅ Environment variables protected server-side

**At Rest**:

- ✅ No database storage (transient processing only)
- ✅ Email stored in Gmail (end-user's security model)
- ✅ Logs sanitized (no sensitive data in production logs)

### Access Control

**API Key Security**:

- ✅ Never exposed to client
- ✅ Server-side only access
- ✅ Environment variable (not in source code)
- ✅ Can be rotated if compromised

**Form Submission**:

- ✅ Server Actions have CSRF protection (Next.js built-in)
- ✅ No additional authentication needed (per specification)
- ✅ Validation prevents injection attacks

---

## Data Flow Diagram

```
[User Browser]
      ↓ (form data)
[ContactForm Component]
      ↓ (Server Action)
[submitContactForm]
      ↓ (validated data)
[Email Utility]
      ↓ (EmailPayload)
[Resend API]
      ↓ (email sent)
[safdarayub@gmail.com]
```

**Data Transformation**:

1. **User Input** → ContactFormData (raw form data)
2. **Validation** → ContactFormData (validated)
3. **Formatting** → EmailFormattedContent (structured for email)
4. **Email Composition** → EmailPayload (Resend format)
5. **API Response** → EmailResult (success/failure)
6. **UI Feedback** → FormState (user message)

---

## Related Documentation

- **Implementation Plan**: `/specs/002-contact-form-email/plan.md`
- **Research**: `/specs/002-contact-form-email/research.md`
- **Specification**: `/specs/002-contact-form-email/spec.md`
- **API Contracts**: `/specs/002-contact-form-email/contracts/`

---

**Data Model Status**: ✅ Complete  
**New Types Required**: 3 (EmailPayload, EmailFormattedContent, EmailResult)  
**Existing Types**: 2 (ContactFormData, FormState - no changes)  
**Database Changes**: None (no persistence)
