"use client";

// Contact form with Server Action integration

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "@/app/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getTours } from "@/data/tours";
import type { FormState } from "@/types/contact";
import { useEffect, useRef } from "react";

const initialState: FormState = {
  success: undefined,
  message: undefined,
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-select tour from query parameter
  const tourParam = searchParams.get("tour") || "";

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const allTours = getTours();

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your full name"
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-red-600">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="your.email@example.com"
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          aria-describedby={state.errors?.phone ? "phone-error" : undefined}
        />
        {state.errors?.phone && (
          <p id="phone-error" className="text-sm text-red-600">
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      {/* Preferred Tour Selection */}
      <div className="space-y-2">
        <Label htmlFor="preferredTour">Interested Tour (optional)</Label>
        <Select name="preferredTour" defaultValue={tourParam || "none"}>
          <SelectTrigger id="preferredTour">
            <SelectValue placeholder="Select a tour" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">-- No specific tour --</SelectItem>
            {allTours.map((tour) => (
              <SelectItem key={tour.id} value={tour.slug}>
                {tour.name} - ${tour.price.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your travel plans and any questions you have..."
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-red-600">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Success/Error Message */}
      {state.message && (
        <div
          className={`rounded-lg p-4 ${
            state.success
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="alert"
        >
          {state.message}
        </div>
      )}

      {/* Submit Button */}
      <SubmitButton />

      <p className="text-center text-sm text-gray-500">
        <span className="text-red-500">*</span> Required fields
      </p>
    </form>
  );
}

