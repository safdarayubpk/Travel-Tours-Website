# Research & Technical Decisions

**Feature**: Travel & Tours Website  
**Created**: 2025-10-18  
**Purpose**: Document all technical decisions, rationale, and alternatives considered

---

## Decision 1: Data Storage Pattern

### Context

The demonstration site needs to store 12-15 tour entries with full details (name, country, price, description, images, etc.) without a backend database.

### Decision

**Use a local TypeScript file with a typed array of tour objects**

### Rationale

1. **Type Safety**: Full TypeScript support with compile-time checking
2. **Version Control**: Tour data checked into git, easy to track changes
3. **Zero Dependencies**: No database, no API, no build-time data fetching
4. **Developer Experience**: Auto-completion and type checking in IDE
5. **Performance**: Data bundled with application, instant access
6. **Simplicity**: Single source of truth, no sync issues

### Implementation

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
    description: "Explore the City of Light...",
    extendedDescription: "Full itinerary details...",
    images: ["/images/tours/paris-1.jpg", "/images/tours/paris-2.jpg"],
    featured: true,
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
  },
  // ... 11-14 more tours
];

// Helper functions
export function getTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

export function getToursByRegion(region: string): Tour[] {
  return tours.filter((tour) => tour.region === region);
}
```

### Alternatives Considered

**Option A: JSON File**

- ❌ No type safety at authoring time
- ❌ Requires JSON.parse() at runtime
- ❌ No IDE autocomplete when editing
- ✅ Easier for non-developers to edit
- **Rejected**: Type safety more important for demonstration

**Option B: CMS (Contentful, Sanity)**

- ❌ External dependency
- ❌ API keys and configuration needed
- ❌ Network requests required
- ❌ Overkill for 12-15 static entries
- ✅ More realistic for production
- **Rejected**: Adds unnecessary complexity for demo

**Option C: SQLite Database**

- ❌ Requires build-time database setup
- ❌ Deployment complexity
- ❌ Not serverless-friendly
- ✅ More realistic data layer
- **Rejected**: Violates "no database" constraint

---

## Decision 2: shadcn/ui Component Selection

### Context

Need UI components for forms, cards, buttons, and interactive elements that are accessible, type-safe, and customizable.

### Decision

**Use shadcn/ui component library with selective component installation**

### Components to Install

1. **Button** - CTAs, form submissions, navigation
2. **Card** - Tour cards, contact info display
3. **Input** - Text fields for contact form
4. **Select** - Dropdowns for filters and tour selection
5. **Textarea** - Message field in contact form
6. **Badge** - Region/category labels on tours

### Rationale

1. **Copy-Paste Components**: Not a dependency, components live in your codebase
2. **Full Customization**: Tailwind-based, easy to modify
3. **Accessibility**: Built-in ARIA labels and keyboard navigation
4. **TypeScript**: Fully typed with excellent DX
5. **Radix UI Primitives**: Battle-tested accessible components
6. **Tailwind CSS Integration**: Seamless styling with existing setup
7. **No Bundle Bloat**: Only install components you use

### Installation Commands

```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add badge
```

### Alternatives Considered

**Option A: Build from Scratch**

- ✅ Maximum control
- ✅ Learning experience
- ❌ Time-consuming
- ❌ Accessibility harder to get right
- ❌ Less polished result
- **Rejected**: Time investment not worth it for demo

**Option B: Material UI / Chakra UI**

- ✅ Complete component libraries
- ✅ Well-documented
- ❌ Large bundle size
- ❌ Opinionated styling
- ❌ Harder to customize
- **Rejected**: Too heavy for demonstration site

**Option C: Headless UI**

- ✅ Lightweight
- ✅ Unstyled primitives
- ❌ Requires styling everything
- ❌ More setup work
- **Rejected**: shadcn/ui provides better starting point

---

## Decision 3: Form Validation Strategy

### Context

Contact form needs client-side validation for UX and server-side validation for security, with type safety throughout.

### Decision

**Use Zod for schema-based validation with Server Actions**

### Rationale

1. **Type Safety**: Infer TypeScript types from Zod schemas
2. **Runtime Validation**: Catch invalid data at runtime
3. **Server + Client**: Same schema works on both sides
4. **Excellent DX**: Clear error messages, auto-completion
5. **Next.js Integration**: Works seamlessly with Server Actions
6. **Industry Standard**: Widely adopted in Next.js ecosystem

### Implementation

```typescript
// lib/validation.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredTour: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// app/contact/actions.ts
("use server");

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    preferredTour: formData.get("preferredTour"),
  };

  // Validate with Zod
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    message: "Thank you! We will contact you soon.",
  };
}
```

### Alternatives Considered

**Option A: React Hook Form + Yup**

- ✅ Mature ecosystem
- ✅ Good DX
- ❌ Yup not as TypeScript-first as Zod
- ❌ More boilerplate
- **Rejected**: Zod has better TypeScript integration

**Option B: Manual Validation**

- ✅ No dependencies
- ✅ Full control
- ❌ More code to write
- ❌ Error-prone
- ❌ Type safety harder
- **Rejected**: Reinventing the wheel

**Option C: Joi**

- ✅ Mature library
- ❌ Not TypeScript-first
- ❌ Larger bundle
- **Rejected**: Zod better for TypeScript projects

---

## Decision 4: State Management for Filters

### Context

Tours listing page needs filtering (region, price, duration) and sorting, with shareable URLs and browser navigation support.

### Decision

**Use URL search parameters with Next.js useSearchParams and useRouter hooks**

### Rationale

1. **Shareable URLs**: Users can bookmark/share filtered results
2. **Browser Navigation**: Back/forward buttons work correctly
3. **No Extra Library**: Built into Next.js, zero dependencies
4. **SEO Friendly**: Search engines can crawl different filter states
5. **Simple State**: No global state management needed
6. **Server + Client**: Can read params in Server Components too

### Implementation

```typescript
// components/tours/tour-filters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const region = searchParams.get('region') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || 'name';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <Select
        value={region}
        onValueChange={(value) => updateFilter('region', value)}
      >
        <option value="">All Regions</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
      </Select>
      {/* More filters... */}
    </div>
  );
}

// lib/tour-helpers.ts
export function filterTours(
  tours: Tour[],
  filters: {
    region?: string;
    minPrice?: number;
    maxPrice?: number;
    minDays?: number;
    maxDays?: number;
  }
): Tour[] {
  return tours.filter(tour => {
    if (filters.region && tour.region !== filters.region) return false;
    if (filters.minPrice && tour.price < filters.minPrice) return false;
    if (filters.maxPrice && tour.price > filters.maxPrice) return false;
    if (filters.minDays && tour.duration.days < filters.minDays) return false;
    if (filters.maxDays && tour.duration.days > filters.maxDays) return false;
    return true;
  });
}

export function sortTours(tours: Tour[], sortBy: string): Tour[] {
  const sorted = [...tours];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'duration-asc':
      return sorted.sort((a, b) => a.duration.days - b.duration.days);
    case 'duration-desc':
      return sorted.sort((a, b) => b.duration.days - a.duration.days);
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}
```

### Alternatives Considered

**Option A: React Context**

- ✅ Centralized state
- ❌ Not shareable via URL
- ❌ Browser navigation doesn't work
- ❌ Extra complexity
- **Rejected**: URL params are better UX

**Option B: Zustand / Redux**

- ✅ Powerful state management
- ❌ Overkill for simple filters
- ❌ Not URL-based
- ❌ Extra dependency
- **Rejected**: Too complex for this use case

**Option C: Local State Only (useState)**

- ✅ Simple
- ❌ Not shareable
- ❌ Lost on page refresh
- **Rejected**: Poor UX compared to URL params

---

## Decision 5: Image Strategy

### Context

Need high-quality travel destination images for 12-15 tours (2-3 images per tour = 24-45 images total).

### Decision

**Use Unsplash images with Next.js Image component optimization**

### Rationale

1. **High Quality**: Professional photography
2. **Free to Use**: No licensing fees for demonstration
3. **Easy Integration**: Direct URLs or Unsplash API
4. **Next.js Optimization**: Automatic resizing, WebP conversion
5. **Backup Plan**: Local placeholder images if Unsplash unavailable
6. **Realistic**: Similar to production image workflows

### Implementation

```typescript
// Tour data with Unsplash images
{
  id: '1',
  slug: 'paris-adventure',
  name: 'Paris Adventure',
  images: [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
  ],
  // ...
}

// Component usage with next/image
import Image from 'next/image';

<Image
  src={tour.images[0]}
  alt={`${tour.name} - ${tour.country}`}
  width={800}
  height={600}
  className="rounded-lg object-cover"
  priority={featured}
  loading={featured ? 'eager' : 'lazy'}
/>
```

### Image Sources

- **Primary**: Unsplash (https://unsplash.com/)
- **Backup**: Local images in `/public/images/tours/`
- **Fallback**: Placeholder service (https://placehold.co/)

### Next.js Image Optimization Benefits

- Automatic WebP/AVIF conversion
- Responsive image sizing
- Lazy loading below the fold
- Blur placeholder (optional)
- CDN caching

### Alternatives Considered

**Option A: Lorem Picsum / Placeholder.com**

- ✅ Simple
- ❌ Generic, not travel-specific
- ❌ Less professional
- **Rejected**: Unsplash has better travel photos

**Option B: Stock Photo Purchase**

- ✅ High quality
- ✅ Licensed properly
- ❌ Costs money
- ❌ Overkill for demo
- **Rejected**: Unsplash is free and sufficient

**Option C: AI-Generated Images**

- ✅ Unique
- ✅ Customizable
- ❌ May not look realistic
- ❌ Requires AI service
- **Rejected**: Real photos more convincing

---

## Decision 6: Tour Slug Generation

### Context

Dynamic routes need URL-friendly identifiers (slugs) derived from tour names for SEO and readability.

### Decision

**Generate kebab-case slugs from destination names at data creation time**

### Rationale

1. **SEO Friendly**: Readable URLs like `/tours/paris-adventure`
2. **Human Readable**: Users can understand URL structure
3. **Static**: Pre-generated, no runtime conversion
4. **Type Safe**: Slugs are part of Tour type
5. **Unique**: Can be validated at build time

### Implementation

```typescript
// Slug generation helper
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-');      // Replace multiple hyphens with single
}

// Usage in tour data
{
  id: '1',
  slug: 'paris-adventure',        // Pre-generated from "Paris Adventure"
  name: 'Paris Adventure',
  // ...
}

// Dynamic route: app/tours/[slug]/page.tsx
export default async function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return <TourDetails tour={tour} />;
}

// Static generation
export async function generateStaticParams() {
  const tours = getTours();
  return tours.map(tour => ({
    slug: tour.slug,
  }));
}
```

### Slug Validation

```typescript
// Ensure unique slugs at build time
const slugs = tours.map((t) => t.slug);
const uniqueSlugs = new Set(slugs);
if (slugs.length !== uniqueSlugs.size) {
  throw new Error("Duplicate tour slugs detected");
}
```

### Alternatives Considered

**Option A: UUID-based URLs**

- ✅ Guaranteed unique
- ❌ Not readable: `/tours/550e8400-e29b-41d4-a716-446655440000`
- ❌ Poor SEO
- **Rejected**: Readability important for demo

**Option B: Numeric IDs**

- ✅ Simple
- ❌ Not SEO friendly: `/tours/1`
- ❌ Doesn't showcase routing skills
- **Rejected**: Less professional

**Option C: Runtime Slug Generation**

- ✅ Automatic
- ❌ Performance overhead
- ❌ Potential collisions
- **Rejected**: Pre-generation is safer

---

## Summary of Technical Decisions

| Decision      | Choice                | Key Benefit                  |
| ------------- | --------------------- | ---------------------------- |
| Data Storage  | TypeScript array      | Type safety + zero deps      |
| UI Components | shadcn/ui             | Accessible + customizable    |
| Validation    | Zod                   | TypeScript-first schemas     |
| Filter State  | URL search params     | Shareable URLs + nav support |
| Images        | Unsplash + next/image | Quality + optimization       |
| URL Slugs     | Kebab-case from names | SEO + readability            |

All decisions prioritize:

- **Type Safety**: Full TypeScript coverage
- **Developer Experience**: Excellent tooling and DX
- **Performance**: Optimized for speed
- **Simplicity**: No unnecessary complexity
- **Demonstration Value**: Showcase best practices

---

**Document Status**: Complete  
**Last Updated**: 2025-10-18  
**Next Steps**: Proceed to data-model.md and implementation

