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
      // Dynamic import of Resend SDK (server-side only)
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Format timestamp for email content
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

      // Get tour information if selected
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

      // Format email content with all form fields
      const emailContent = `From: ${result.data.name}
Email: ${result.data.email}
Phone: ${result.data.phone || "Not provided"}
Interested Tour: ${tourInfo}

Message:
${result.data.message}

---
Submitted: ${formattedDate}
(${timestamp.toISOString()})`;

      // Send email with Resend API
      await resend.emails.send({
        from: "Travel & Tours <onboarding@resend.dev>",
        to: "safdarayub@gmail.com",
        subject: `New Contact Form Inquiry from ${result.data.name}`,
        text: emailContent,
        replyTo: result.data.email,
      });

      // Log successful email delivery
      console.log("Contact form email sent:", {
        customer: result.data.name,
        customerEmail: result.data.email,
        timestamp: timestamp.toISOString(),
      });

      // Return success
      return {
        success: true,
        message:
          "Thank you for your inquiry! We will contact you within 24 hours.",
      };
    } catch (emailError) {
      // Log email delivery failure with details
      console.error("Email delivery failed:", emailError);

      // Return user-friendly error message
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
