/**
 * Server Action Contract: Contact Form Submission
 *
 * Purpose: Handle contact form submissions with validation and simulated processing
 * Pattern: Next.js 15 Server Actions with progressive enhancement
 * Location: app/contact/actions.ts
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Contact form input data structure
 */
export interface ContactFormData {
  name: string; // User's full name (required, 2-100 chars)
  email: string; // User's email (required, valid email format)
  phone?: string; // User's phone number (optional, 10-20 chars)
  message: string; // User's inquiry (required, 10-1000 chars)
  preferredTour?: string; // Optional tour slug reference
}

/**
 * Form submission state returned to client
 */
export interface FormState {
  success?: boolean; // Whether submission succeeded
  message?: string; // User-facing message
  errors?: Record<string, string[]>; // Field-specific validation errors
}

// ============================================================================
// ZOD VALIDATION SCHEMA
// ============================================================================

/**
 * Validation schema for contact form
 * Location: lib/validation.ts
 */
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .trim(),

  preferredTour: z.string().optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ============================================================================
// SERVER ACTION IMPLEMENTATION
// ============================================================================

/**
 * Contact form Server Action
 *
 * @param prevState - Previous form state (for progressive enhancement)
 * @param formData - Form data from client
 * @returns FormState with success/error information
 *
 * Implementation Details:
 * 1. Extract form data from FormData object
 * 2. Validate using Zod schema
 * 3. Return validation errors if any
 * 4. Simulate processing delay (2 seconds)
 * 5. Log submission (console.log for demo, would send email in production)
 * 6. Return success state
 *
 * Progressive Enhancement:
 * - Works without JavaScript (form submission)
 * - Enhanced with JavaScript (inline validation, pending UI)
 *
 * Error Handling:
 * - Validation errors: Return field-specific errors
 * - Server errors: Catch and return generic error message
 * - No throwing: Always return FormState
 */
// "use server"; // This will be added in actual implementation file

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      message: formData.get("message"),
      preferredTour: formData.get("preferredTour") || undefined,
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

    // Simulate processing delay (demonstration)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log form submission (would send email in production)
    console.log("Contact form submitted:", {
      ...result.data,
      timestamp: new Date().toISOString(),
    });

    // In production, would:
    // - Send email via service (SendGrid, Resend, etc.)
    // - Store in database
    // - Trigger notification

    // Return success
    return {
      success: true,
      message:
        "Thank you for your inquiry! We will contact you within 24 hours.",
    };
  } catch (error) {
    // Catch unexpected errors
    console.error("Contact form error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// ============================================================================
// CLIENT-SIDE USAGE
// ============================================================================

/**
 * Example usage in Contact Form component
 * Location: components/contact/contact-form.tsx
 */

/*
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/contact/actions';
import type { FormState } from '@/types/contact';

const initialState: FormState = {
  success: undefined,
  message: undefined,
  errors: undefined,
};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {state.errors?.phone && (
          <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="preferredTour" className="block text-sm font-medium">
          Interested Tour (optional)
        </label>
        <select
          id="preferredTour"
          name="preferredTour"
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="">-- Select a tour --</option>
          <option value="paris-adventure">Paris Adventure</option>
          <option value="tokyo-explorer">Tokyo Explorer</option>
        </select>
      </div>

      {state.message && (
        <div
          className={`p-4 rounded-md ${
            state.success
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}
*/

// ============================================================================
// TESTING
// ============================================================================

/**
 * Manual testing checklist:
 *
 * ✓ Valid submission succeeds after 2 second delay
 * ✓ Success message displays correctly
 * ✓ Empty name shows validation error
 * ✓ Invalid email shows validation error
 * ✓ Short message (< 10 chars) shows error
 * ✓ Long message (> 1000 chars) shows error
 * ✓ Invalid phone format shows error
 * ✓ Phone is optional (can be empty)
 * ✓ Form works without JavaScript
 * ✓ Form enhanced with JavaScript (pending state, inline errors)
 * ✓ Multiple rapid submissions handled gracefully
 * ✓ Browser validation doesn't interfere
 * ✓ Tour selection dropdown populates from data
 * ✓ Form resets after successful submission
 */

/**
 * Unit test examples (if implementing tests):
 *
 * - submitContactForm with valid data returns success
 * - submitContactForm with invalid email returns error
 * - submitContactForm with short name returns error
 * - submitContactForm with empty required field returns error
 * - submitContactForm logs data correctly
 * - Validation schema rejects invalid formats
 * - Validation schema accepts valid formats
 */

// ============================================================================
// PRODUCTION CONSIDERATIONS
// ============================================================================

/**
 * For production deployment, replace console.log with actual email service:
 *
 * 1. Install email service package:
 *    - npm install resend  (recommended)
 *    - npm install @sendgrid/mail
 *    - npm install nodemailer
 *
 * 2. Add environment variables:
 *    - RESEND_API_KEY or SENDGRID_API_KEY
 *    - CONTACT_EMAIL_TO (recipient)
 *    - CONTACT_EMAIL_FROM (sender)
 *
 * 3. Replace console.log with email send:
 *
 *    import { Resend } from 'resend';
 *    const resend = new Resend(process.env.RESEND_API_KEY);
 *
 *    await resend.emails.send({
 *      from: process.env.CONTACT_EMAIL_FROM,
 *      to: process.env.CONTACT_EMAIL_TO,
 *      subject: `Contact Form: ${result.data.name}`,
 *      text: result.data.message,
 *      replyTo: result.data.email,
 *    });
 *
 * 4. Add error handling for email service failures
 * 5. Consider rate limiting to prevent spam
 * 6. Store submissions in database for tracking
 */

/**
 * Rate limiting (production recommendation):
 *
 * - Use IP-based rate limiting
 * - Max 3 submissions per hour per IP
 * - Consider honeypot fields for bot detection
 * - Add reCAPTCHA for additional protection
 */

/**
 * Database storage (optional for production):
 *
 * interface ContactSubmission {
 *   id: string;
 *   name: string;
 *   email: string;
 *   phone?: string;
 *   message: string;
 *   preferredTour?: string;
 *   createdAt: Date;
 *   ipAddress?: string;
 *   userAgent?: string;
 * }
 */

// ============================================================================
// CONTRACT SUMMARY
// ============================================================================

/**
 * Contract Guarantees:
 *
 * ✓ Type-safe Server Action with full TypeScript support
 * ✓ Zod validation for runtime type safety
 * ✓ Field-specific error messages
 * ✓ Progressive enhancement (works with/without JS)
 * ✓ User-friendly success/error feedback
 * ✓ 2-second simulated processing delay
 * ✓ Console logging for demonstration
 * ✓ No throwing errors (always returns FormState)
 * ✓ Ready for production email service integration
 *
 * Dependencies:
 * - zod (validation)
 * - Next.js 15 Server Actions
 * - React useFormState/useFormStatus hooks
 *
 * Files:
 * - app/contact/actions.ts (implementation)
 * - lib/validation.ts (Zod schemas)
 * - types/contact.ts (TypeScript types)
 * - components/contact/contact-form.tsx (client component)
 */

export default submitContactForm;
