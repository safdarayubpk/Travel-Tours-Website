# API Contract: Resend Email Delivery

**Service**: Resend Email API  
**Integration**: Contact Form Email Delivery  
**Date**: 2025-10-20

## Overview

This document specifies the contract between the Travel & Tours contact form and the Resend email delivery service.

## External Service: Resend API

### Authentication

**Method**: Bearer Token (API Key)

**Header**:

```
Authorization: Bearer re_xxxxxxxxxxxxxxxxxxxx
```

**API Key Source**:

- Environment variable: `process.env.RESEND_API_KEY`
- Storage: `.env` or `.env.local` file
- Format: String starting with `re_`

---

### Endpoint: Send Email

**URL**: `https://api.resend.com/emails`  
**Method**: `POST`  
**Content-Type**: `application/json`

#### Request

**Headers**:

```http
Authorization: Bearer {RESEND_API_KEY}
Content-Type: application/json
```

**Body Schema**:

```typescript
{
  from: string;      // Sender email (must be verified domain)
  to: string;        // Recipient email
  subject: string;   // Email subject line
  text: string;      // Plain text email body
  reply_to?: string; // Optional reply-to address
}
```

**Example Request**:

```json
{
  "from": "Travel & Tours <onboarding@resend.dev>",
  "to": "safdarayub@gmail.com",
  "subject": "New Contact Form Inquiry from John Smith",
  "text": "From: John Smith\nEmail: john@example.com\nPhone: +1 (555) 123-4567\n\nMessage:\nI'm interested in the Greece tour...\n\n---\nSubmitted: Monday, October 20, 2025 at 2:45 PM EST\n(2025-10-20T14:45:32.123Z)",
  "reply_to": "john@example.com"
}
```

#### Success Response (200 OK)

**Schema**:

```typescript
{
  id: string; // Unique email message ID
}
```

**Example**:

```json
{
  "id": "b1946ac9-2f3a-4c3d-9012-3456789abcde"
}
```

**Timing**: Typically 200-500ms response time

#### Error Responses

**400 Bad Request** - Invalid request data

```json
{
  "message": "Invalid 'from' email address",
  "name": "validation_error"
}
```

**401 Unauthorized** - Invalid or missing API key

```json
{
  "message": "Invalid API key",
  "name": "authentication_error"
}
```

**429 Too Many Requests** - Rate limit exceeded

```json
{
  "message": "Rate limit exceeded",
  "name": "rate_limit_error"
}
```

**500 Internal Server Error** - Resend service issue

```json
{
  "message": "Internal server error",
  "name": "server_error"
}
```

---

## Integration Contract

### Server Action → Resend API

**Function**: `submitContactForm` (Server Action)

**Input**: `FormData` from contact form

**Processing Flow**:

1. Extract form fields from FormData
2. Validate using existing Zod schema
3. **[NEW]** Format email content
4. **[NEW]** Call Resend API
5. **[NEW]** Handle API response
6. Return FormState to client

**Output**: `FormState` (existing type)

---

### Email Content Contract

**Template Structure**:

```typescript
function formatEmailContent(data: ContactFormData): string {
  const timestamp = new Date();
  const readable = timestamp.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  return `From: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Interested Tour: ${getTourNameOrDefault(data.preferredTour)}

Message:
${data.message}

---
Submitted: ${readable}
(${timestamp.toISOString()})`;
}
```

**Subject Line Format**:

```typescript
const subject = `New Contact Form Inquiry from ${data.name}`;
```

---

## Error Handling Contract

### Resend API Errors

| Error Type          | HTTP Status | User Message                                                      | Log Level | Retry |
| ------------------- | ----------- | ----------------------------------------------------------------- | --------- | ----- |
| Invalid API key     | 401         | "Service configuration error. Please contact support."            | ERROR     | No    |
| Validation error    | 400         | "We couldn't send your message. Please try again."                | WARN      | No    |
| Rate limit exceeded | 429         | "Too many requests. Please try again in a few minutes."           | WARN      | No    |
| Service outage      | 500         | "Email service temporarily unavailable. Please try again later."  | ERROR     | No    |
| Network timeout     | -           | "Connection timed out. Please check your internet and try again." | ERROR     | No    |
| Unknown error       | -           | "An unexpected error occurred. Please try again."                 | ERROR     | No    |

**User Message Strategy**:

- ❌ Never expose: API keys, stack traces, internal error codes
- ✅ Always provide: Actionable guidance, friendly language
- ✅ Consistent with: Existing form error messages

---

## Performance Contract

### SLA Expectations

| Metric                     | Target  | Measured By             |
| -------------------------- | ------- | ----------------------- |
| Resend API response time   | < 500ms | API call duration       |
| Total form submission time | < 5s    | Server Action execution |
| UI feedback delay          | < 2s    | User-perceived time     |
| Email delivery to inbox    | < 30s   | Resend delivery time    |

### Timeout Configuration

```typescript
const RESEND_TIMEOUT_MS = 5000; // 5 seconds

// Implementation with timeout
const emailPromise = resend.emails.send(payload);
const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), RESEND_TIMEOUT_MS)
);

const result = await Promise.race([emailPromise, timeoutPromise]);
```

---

## Security Contract

### API Key Management

**Requirements**:

- ✅ API key stored in environment variables only
- ✅ Never logged or exposed to client
- ✅ Server-side access only
- ✅ Rotation supported (change env var, restart server)

**Validation at Startup**:

```typescript
// Check on server startup
if (!process.env.RESEND_API_KEY) {
  console.error("CRITICAL: RESEND_API_KEY not configured");
  // Optionally: throw error to prevent server start
}
```

### Customer Data Protection

**PII Handling**:

- Customer email: Sent to Resend (required for email delivery)
- Customer phone: Sent to Resend (included in email body)
- Customer message: Sent to Resend (email content)

**Compliance**:

- Data transmitted via HTTPS
- No storage beyond email delivery
- Customer can request deletion (contact business team)

---

## Testing Contract

### Test Scenarios

**1. Successful Email Delivery**

**Input**:

```typescript
{
  name: "Test User",
  email: "test@example.com",
  phone: "+1 (555) 123-4567",
  message: "This is a test message",
  preferredTour: "greece-adventure"
}
```

**Expected**:

- Resend API returns 200 with message ID
- User sees success message
- Email appears in safdarayub@gmail.com inbox
- Email has correct subject, from, to, content

**2. Invalid API Key**

**Setup**: Use invalid RESEND_API_KEY

**Expected**:

- Resend API returns 401
- User sees: "Service configuration error. Please contact support."
- Error logged to server console
- Form remains interactive (can retry after fix)

**3. Network Timeout**

**Setup**: Simulate slow/unreliable network

**Expected**:

- Operation times out after 5 seconds
- User sees: "Connection timed out. Please check your internet and try again."
- Error logged with timeout details
- Form can be resubmitted

---

## Versioning

**Resend SDK Version**: ^4.0.0 (latest stable)

**Compatibility**:

- Node.js 18+ (Next.js 15 requirement)
- TypeScript 5+ (project standard)
- Next.js 15+ App Router (project version)

**Breaking Changes**:

- None expected in Resend SDK v4.x
- Pin version in package.json to prevent unexpected updates

---

## Monitoring & Observability

### Logging Requirements

**Success Logs**:

```typescript
console.log("Contact form email sent:", {
  messageId: result.id,
  customerEmail: data.email,
  timestamp: new Date().toISOString(),
});
```

**Error Logs**:

```typescript
console.error("Contact form email failed:", {
  error: error.message,
  customerEmail: data.email,
  timestamp: new Date().toISOString(),
  // Stack trace in development only
});
```

**Metrics to Track** (future enhancement):

- Total emails sent
- Success rate
- Average delivery time
- Error rate by type

---

## Rollback Plan

### If Email Integration Fails in Production

**Immediate Rollback**:

```bash
git revert [commit-hash]
git push
```

**Fallback Behavior**:

- Form reverts to console logging (current behavior)
- Users still see success message
- Manual follow-up required for logged inquiries

**Safe Rollback**: Changes are isolated to `actions.ts` - easy to revert

---

## Related Documentation

- **Implementation Plan**: `/specs/002-contact-form-email/plan.md`
- **Research**: `/specs/002-contact-form-email/research.md`
- **Specification**: `/specs/002-contact-form-email/spec.md`
- **Data Model**: `/specs/002-contact-form-email/data-model.md`

---

**Contract Status**: ✅ Complete  
**External Dependencies**: 1 (Resend API)  
**Internal Contracts**: 0 (no new endpoints)  
**Type Safety**: ✅ Full TypeScript support
