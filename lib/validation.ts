// Zod validation schemas for Travel & Tours website

import { z } from "zod";

/**
 * Tour validation schema
 */
export const tourSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(2).max(100),
  country: z.string().min(2),
  region: z.enum(["Europe", "Asia", "Americas", "Africa"]),
  price: z.number().positive().int(),
  currency: z.string().length(3),
  duration: z.object({
    days: z.number().int().min(1).max(30),
    nights: z.number().int().min(0).max(29),
  }),
  description: z.string().min(50).max(500),
  extendedDescription: z.string().min(200).max(2000),
  images: z.array(z.string().url()).min(1).max(5),
  featured: z.boolean(),
  highlights: z.array(z.string()).min(3).max(8),
  category: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().positive().optional(),
});

/**
 * Contact form validation schema
 */
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
