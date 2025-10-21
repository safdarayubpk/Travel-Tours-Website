# Data Model Specification

**Feature**: Travel & Tours Website  
**Created**: 2025-10-18  
**Purpose**: Define all data entities, types, and relationships

---

## Overview

This data model defines the structure for a demonstration Travel & Tours website with 12-15 sample tours across 4 regions. All entities are TypeScript interfaces with strict typing and no `any` types.

**Data Storage**: Local TypeScript file (`data/tours.ts`)  
**No Backend**: All data is statically defined  
**Type Safety**: Full TypeScript strict mode compliance

---

## Entity 1: Tour

### Purpose

Represents a complete travel package with destination, pricing, duration, and media information.

### TypeScript Definition

```typescript
// types/tour.ts

export type Region = "Europe" | "Asia" | "Americas" | "Africa";

export interface TourDuration {
  days: number;
  nights: number;
}

export interface Tour {
  // Identity
  id: string; // Unique identifier (e.g., "1", "2")
  slug: string; // URL-friendly identifier (e.g., "paris-adventure")

  // Basic Information
  name: string; // Destination name (e.g., "Paris Adventure")
  country: string; // Country name (e.g., "France")
  region: Region; // Geographic region

  // Pricing
  price: number; // Base price per person
  currency: string; // Currency code (default: "USD")

  // Duration
  duration: TourDuration; // Days and nights

  // Descriptions
  description: string; // Short overview (1-2 paragraphs)
  extendedDescription: string; // Detailed itinerary and information

  // Media
  images: string[]; // Array of image URLs (2-3 images per tour)

  // Metadata
  featured: boolean; // Whether tour appears on homepage
  highlights: string[]; // Key tour highlights (3-5 items)

  // Optional future fields
  category?: string; // Tour type (e.g., "Adventure", "Cultural")
  rating?: number; // Average rating (0-5)
  reviewCount?: number; // Number of reviews
}
```

### Field Specifications

| Field                 | Type     | Required | Constraints                  | Example               |
| --------------------- | -------- | -------- | ---------------------------- | --------------------- |
| `id`                  | string   | ✅ Yes   | Unique, numeric string       | "1"                   |
| `slug`                | string   | ✅ Yes   | Unique, kebab-case, URL-safe | "paris-adventure"     |
| `name`                | string   | ✅ Yes   | 2-100 characters             | "Paris Adventure"     |
| `country`             | string   | ✅ Yes   | Valid country name           | "France"              |
| `region`              | Region   | ✅ Yes   | One of 4 enum values         | "Europe"              |
| `price`               | number   | ✅ Yes   | Positive integer             | 1299                  |
| `currency`            | string   | ✅ Yes   | ISO 4217 code                | "USD"                 |
| `duration.days`       | number   | ✅ Yes   | 1-30 days                    | 7                     |
| `duration.nights`     | number   | ✅ Yes   | 0-29 nights                  | 6                     |
| `description`         | string   | ✅ Yes   | 50-500 characters            | "Explore the City..." |
| `extendedDescription` | string   | ✅ Yes   | 200-2000 characters          | "Day 1: Arrival..."   |
| `images`              | string[] | ✅ Yes   | 1-5 URLs                     | ["url1", "url2"]      |
| `featured`            | boolean  | ✅ Yes   | true/false                   | true                  |
| `highlights`          | string[] | ✅ Yes   | 3-8 items                    | ["Eiffel Tower", ...] |
| `category`            | string   | ❌ No    | Optional classification      | "Adventure"           |
| `rating`              | number   | ❌ No    | 0-5 (future)                 | 4.5                   |
| `reviewCount`         | number   | ❌ No    | Positive integer (future)    | 127                   |

### Validation Rules

```typescript
// lib/validation.ts

import { z } from "zod";

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
```

### Data Volume

**Total Tours**: 12-15 tours  
**Distribution by Region**:

- Europe: 3-4 tours
- Asia: 3-4 tours
- Americas: 3-4 tours
- Africa: 3-4 tours

**Featured Tours**: 3-6 tours (with `featured: true`)

### Sample Data Structure

```typescript
// data/tours.ts

import { Tour } from "@/types/tour";

export const tours: Tour[] = [
  {
    id: "1",
    slug: "paris-adventure",
    name: "Paris Adventure",
    country: "France",
    region: "Europe",
    price: 1299,
    currency: "USD",
    duration: { days: 7, nights: 6 },
    description:
      "Explore the enchanting City of Light with visits to iconic landmarks including the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Experience authentic French cuisine and culture in the heart of Europe.",
    extendedDescription:
      "Day 1: Arrival in Paris and welcome dinner. Day 2: Eiffel Tower and Seine River cruise. Day 3: Louvre Museum and Champs-Élysées. Day 4: Versailles Palace day trip. Day 5: Montmartre and Sacré-Cœur. Day 6: Latin Quarter and free time. Day 7: Departure.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
    ],
    featured: true,
    highlights: [
      "Eiffel Tower guided tour",
      "Louvre Museum skip-the-line access",
      "Seine River dinner cruise",
      "Versailles Palace day trip",
      "Professional local guide",
    ],
  },
  // ... 11-14 more tours
];
```

### Helper Functions

```typescript
// data/tours.ts (continued)

/**
 * Get all tours
 */
export function getTours(): Tour[] {
  return tours;
}

/**
 * Get a single tour by slug
 */
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

/**
 * Get all featured tours (for homepage)
 */
export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

/**
 * Get tours by region
 */
export function getToursByRegion(region: string): Tour[] {
  return tours.filter((tour) => tour.region === region);
}

/**
 * Get all unique regions
 */
export function getRegions(): string[] {
  return Array.from(new Set(tours.map((tour) => tour.region)));
}

/**
 * Get price range (min, max)
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = tours.map((tour) => tour.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
```

---

## Entity 2: ContactFormData

### Purpose

Captures user information and inquiries submitted through the contact form.

### TypeScript Definition

```typescript
// types/contact.ts

export interface ContactFormData {
  name: string; // User's full name
  email: string; // User's email address
  phone?: string; // Optional phone number
  message: string; // User's inquiry/message
  preferredTour?: string; // Optional tour slug reference
}

export interface FormState {
  success?: boolean; // Whether form submission succeeded
  message?: string; // Success or error message for user
  errors?: Record<string, string[]>; // Field-specific validation errors
}
```

### Field Specifications

| Field           | Type   | Required | Constraints           | Example             |
| --------------- | ------ | -------- | --------------------- | ------------------- |
| `name`          | string | ✅ Yes   | 2-100 characters      | "John Doe"          |
| `email`         | string | ✅ Yes   | Valid email format    | "john@example.com"  |
| `phone`         | string | ❌ No    | Optional, 10-20 chars | "+1-555-123-4567"   |
| `message`       | string | ✅ Yes   | 10-1000 characters    | "I'm interested..." |
| `preferredTour` | string | ❌ No    | Valid tour slug       | "paris-adventure"   |

### Validation Schema

```typescript
// lib/validation.ts

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(/^[\d\s+()-]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),

  preferredTour: z.string().optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

### Usage in Server Action

```typescript
// app/contact/actions.ts
"use server";

import { contactFormSchema, type ContactFormInput } from "@/lib/validation";
import type { FormState } from "@/types/contact";

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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
    return {
      success: false,
      message: "Please fix the errors below",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Simulate processing delay (demonstration)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Log form submission (demonstration - would send email in production)
  console.log("Contact form submitted:", result.data);

  return {
    success: true,
    message: "Thank you for your inquiry! We will contact you within 24 hours.",
  };
}
```

---

## Entity 3: FilterState

### Purpose

Represents the current state of tour filters applied on the listing page, managed via URL search parameters.

### TypeScript Definition

```typescript
// types/filters.ts

export interface FilterState {
  region?: string; // Filter by region
  minPrice?: number; // Minimum price filter
  maxPrice?: number; // Maximum price filter
  minDays?: number; // Minimum duration filter
  maxDays?: number; // Maximum duration filter
  sort?: SortOption; // Sort order
}

export type SortOption =
  | "name"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "duration-asc", label: "Duration (Shortest First)" },
  { value: "duration-desc", label: "Duration (Longest First)" },
];
```

### Usage with URL Search Params

```typescript
// lib/tour-helpers.ts

import { Tour } from "@/types/tour";
import { FilterState, SortOption } from "@/types/filters";

/**
 * Filter tours based on criteria
 */
export function filterTours(tours: Tour[], filters: FilterState): Tour[] {
  return tours.filter((tour) => {
    // Region filter
    if (filters.region && tour.region !== filters.region) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && tour.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && tour.price > filters.maxPrice) {
      return false;
    }

    // Duration filter
    if (filters.minDays !== undefined && tour.duration.days < filters.minDays) {
      return false;
    }
    if (filters.maxDays !== undefined && tour.duration.days > filters.maxDays) {
      return false;
    }

    return true;
  });
}

/**
 * Sort tours by specified option
 */
export function sortTours(tours: Tour[], sortBy: SortOption = "name"): Tour[] {
  const sorted = [...tours]; // Create copy to avoid mutation

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "duration-asc":
      return sorted.sort((a, b) => a.duration.days - b.duration.days);

    case "duration-desc":
      return sorted.sort((a, b) => b.duration.days - a.duration.days);

    case "name":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Parse filters from URL search params
 */
export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): FilterState {
  return {
    region: searchParams.get("region") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    minDays: searchParams.get("minDays")
      ? Number(searchParams.get("minDays"))
      : undefined,
    maxDays: searchParams.get("maxDays")
      ? Number(searchParams.get("maxDays"))
      : undefined,
    sort: (searchParams.get("sort") as SortOption) || "name",
  };
}
```

---

## Data Relationships

### Tour → Contact Form (Optional Reference)

```
Tour.slug (string)
    ↓
ContactFormData.preferredTour (optional string)
```

When a user clicks "Contact About This Tour" from a tour detail page, the tour's slug can be pre-populated in the contact form.

```typescript
// Example: Pre-populate contact form from tour page
<Link href={`/contact?tour=${tour.slug}`}>
  <Button>Contact About This Tour</Button>
</Link>

// Contact form reads URL param
const searchParams = useSearchParams();
const preferredTour = searchParams.get('tour') || '';
```

### No Other Relationships

- Tours are independent entities (no foreign keys)
- No user accounts or sessions
- No booking or payment entities
- No reviews or ratings (can be added as optional Tour fields later)

---

## Type Exports

### Central Type Index

```typescript
// types/index.ts

export type { Tour, Region, TourDuration } from "./tour";
export type { ContactFormData, FormState } from "./contact";
export type { FilterState, SortOption } from "./filters";

// Re-export validation schemas
export { tourSchema, contactFormSchema } from "@/lib/validation";
```

### Usage in Components

```typescript
// Import types
import type { Tour } from "@/types/tour";
import type { FilterState } from "@/types/filters";

// Component with typed props
interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export function TourCard({ tour, featured = false }: TourCardProps) {
  // ...
}
```

---

## Data Integrity

### Uniqueness Constraints

```typescript
// Validation: Ensure unique IDs and slugs
const ids = tours.map((t) => t.id);
const slugs = tours.map((t) => t.slug);

if (new Set(ids).size !== ids.length) {
  throw new Error("Duplicate tour IDs detected");
}

if (new Set(slugs).size !== slugs.length) {
  throw new Error("Duplicate tour slugs detected");
}
```

### Type Safety Checks

```typescript
// Compile-time type checking with TypeScript strict mode
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Runtime Validation

```typescript
// Optional: Validate tour data at build/dev time
import { tourSchema } from "@/lib/validation";

tours.forEach((tour, index) => {
  const result = tourSchema.safeParse(tour);
  if (!result.success) {
    console.error(`Invalid tour data at index ${index}:`, result.error);
    throw new Error(`Tour validation failed for: ${tour.name}`);
  }
});
```

---

## Summary

**Total Entities**: 3 (Tour, ContactFormData, FilterState)  
**Total Tour Instances**: 12-15  
**Storage**: Local TypeScript file  
**Type Safety**: 100% (no `any` types)  
**Validation**: Zod schemas for runtime safety  
**Relationships**: Minimal (Tour slug → Contact form reference only)

**Next Steps**:

1. Implement Tour interface in `/types/tour.ts`
2. Create mock tour data in `/data/tours.ts`
3. Add validation schemas in `/lib/validation.ts`
4. Build helper functions in `/lib/tour-helpers.ts`
5. Implement Server Actions in `/app/contact/actions.ts`

---

**Document Status**: Complete  
**Last Updated**: 2025-10-18

