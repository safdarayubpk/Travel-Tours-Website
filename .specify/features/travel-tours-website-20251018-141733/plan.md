# Implementation Plan: Travel & Tours Website

## Metadata

- **Feature**: International Travel & Tours Listing Platform
- **Plan Version**: 1.0.0
- **Created**: 2025-10-18
- **Branch**: feature/travel-tours-website-20251018-141733
- **Status**: Phase 1 - Design Complete

## Executive Summary

This plan outlines the implementation strategy for building a demonstration Travel & Tours website using Next.js 15 App Router, TypeScript, Tailwind CSS, and shadcn/ui components. The project showcases modern Next.js patterns including Server Components, Server Actions, dynamic routing with slugs, and feature-based component architecture. Mock tour data will be managed locally without requiring a backend database, making the site easily deployable on Vercel.

## Technical Context

### Technology Stack (Confirmed)

**Core Framework**:

- Next.js 15.5.6 (App Router)
- React 19.1.0
- TypeScript 5 (strict mode)

**Styling & UI**:

- Tailwind CSS 4.1.14
- shadcn/ui components
- Lucide React icons
- Mobile-first responsive design

**Data Management**:

- Local JSON file or hardcoded TypeScript array for tour data
- No backend database required
- Client-side state management with React hooks where needed
- URL state for filters/sorting

**Form Handling**:

- Next.js 15 Server Actions for contact form
- Progressive enhancement
- Client-side validation with server-side processing

**Deployment**:

- Vercel-optimized (static + Server Components)
- No external services required
- Environment-agnostic mock data

### Project Constraints

**Demonstration Focus**:

- Primary goal: showcase layout, routing, and component architecture
- 12-15 sample tours across 4 regions (Europe, Asia, Americas, Africa)
- No real payment processing or user authentication
- Simulated form submissions with validation

**File Organization**:

- Feature-based component structure
- shadcn/ui components in `/components/ui`
- Tour components in `/components/tours`
- Contact components in `/components/contact`
- Shared layout components at root `/components`

**Routing Strategy**:

- Home: `/` (static)
- Tours listing: `/tours` (static with client filtering)
- Tour details: `/tours/[slug]` (dynamic, e.g., `/tours/paris-adventure`)
- Contact: `/contact` (static with Server Action)

## Constitution Alignment Check

### Principle 1: User Experience First ✅

**How This Plan Satisfies**:

- Server Components for fast initial page loads (< 2s on 3G)
- Loading states with skeleton loaders (`loading.tsx`)
- Error boundaries for graceful error handling (`error.tsx`)
- Immediate form validation feedback
- Responsive navigation with clear CTAs
- Image optimization with next/image

**Implementation Tasks**:

- [ ] Implement loading.tsx for all routes
- [ ] Create error.tsx boundaries
- [ ] Add form validation with real-time feedback
- [ ] Optimize images with next/image
- [ ] Test on 3G throttled connection

### Principle 2: Component Modularity ✅

**How This Plan Satisfies**:

- Feature-based component organization
- Single-responsibility components (< 250 lines)
- Reusable UI components (TourCard, Button, Form fields)
- Clear separation: presentation vs. logic
- TypeScript interfaces for all props

**Component Structure**:

```
/components
  /ui                  # shadcn/ui components
    - button.tsx
    - card.tsx
    - input.tsx
    - select.tsx
    - ...
  /tours               # Tour-specific components
    - tour-card.tsx
    - tour-grid.tsx
    - tour-filters.tsx
    - tour-hero.tsx
    - image-gallery.tsx
  /contact             # Contact-specific components
    - contact-form.tsx
    - form-field.tsx
  /layout              # Shared layout components
    - header.tsx
    - navigation.tsx
    - footer.tsx
    - breadcrumb.tsx
```

**Implementation Tasks**:

- [ ] Set up shadcn/ui with required components
- [ ] Create reusable TourCard component
- [ ] Build modular filter components
- [ ] Implement form field components
- [ ] Extract shared layout components

### Principle 3: Next.js App Router Best Practices ✅

**How This Plan Satisfies**:

- Server Components by default for all pages
- Client Components only for interactive elements ('use client')
- Server Actions for form submission
- Dynamic routing with `[slug]` parameter
- Metadata API for SEO
- Layouts for shared UI
- loading.tsx and error.tsx conventions

**App Router Structure**:

```
/app
  layout.tsx          # Root layout (Server Component)
  page.tsx            # Home page (Server Component)
  loading.tsx         # Global loading state
  error.tsx           # Global error boundary
  /tours
    page.tsx          # Tours listing (Server Component)
    loading.tsx       # Tours loading state
    /[slug]
      page.tsx        # Tour details (Server Component, dynamic)
      loading.tsx     # Detail loading state
  /contact
    page.tsx          # Contact page (Server Component)
    actions.ts        # Server Actions
```

**Implementation Tasks**:

- [ ] Set up App Router structure
- [ ] Implement Server Components for pages
- [ ] Create Server Actions for contact form
- [ ] Add dynamic [slug] route with generateStaticParams
- [ ] Configure metadata API for SEO

### Principle 4: Type Safety ✅

**How This Plan Satisfies**:

- TypeScript strict mode enabled
- All tour data fully typed
- Props interfaces for every component
- No `any` types
- Zod validation for form inputs
- Type-safe Server Actions

**Type Definitions** (in `/types` or co-located):

```typescript
// types/tour.ts
export interface Tour {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: "Europe" | "Asia" | "Americas" | "Africa";
  price: number;
  currency: string;
  duration: {
    days: number;
    nights: number;
  };
  description: string;
  extendedDescription: string;
  images: string[];
  featured: boolean;
  highlights: string[];
}

// types/contact.ts
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredTour?: string;
}

export interface FormState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}
```

**Implementation Tasks**:

- [ ] Create type definitions for all entities
- [ ] Define component prop interfaces
- [ ] Add Zod schemas for validation
- [ ] Type Server Action parameters and returns
- [ ] Enable TypeScript strict mode

### Principle 5: Responsive & Mobile-First Design ✅

**How This Plan Satisfies**:

- Tailwind CSS mobile-first utilities
- Breakpoints: 320px, 768px, 1024px, 1280px
- Touch-friendly targets (44x44px minimum)
- Responsive image handling
- Mobile navigation (hamburger menu)

**Responsive Patterns**:

```typescript
// Mobile-first Tailwind classes
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Discover Tours
  </h1>
</div>

// Tour grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
</div>
```

**Implementation Tasks**:

- [ ] Implement mobile-first layouts
- [ ] Create responsive navigation
- [ ] Test on multiple screen sizes
- [ ] Ensure touch targets meet 44x44px
- [ ] Add responsive image sizes

### Principle 6: Performance Optimization ✅

**How This Plan Satisfies**:

- Server Components reduce client JS
- next/image for optimized images
- Dynamic imports for heavy components
- Code splitting per route (automatic)
- Static generation where possible
- Lazy loading for images below fold

**Performance Strategies**:

```typescript
// Image optimization
import Image from 'next/image';

<Image
  src={tour.images[0]}
  alt={tour.name}
  width={800}
  height={600}
  priority={featured}
  loading={featured ? 'eager' : 'lazy'}
/>

// Dynamic import for heavy components
const ImageGallery = dynamic(() => import('@/components/tours/image-gallery'), {
  loading: () => <GallerySkeleton />
});
```

**Implementation Tasks**:

- [ ] Use next/image for all images
- [ ] Implement dynamic imports where appropriate
- [ ] Add loading skeletons
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Optimize bundle size

### Principle 7: Code Quality & Standards ✅

**How This Plan Satisfies**:

- ESLint with Next.js config
- Consistent naming conventions
- Component documentation
- Type safety throughout
- Git conventional commits

**Code Standards**:

- Component names: PascalCase
- File names: kebab-case
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Meaningful variable names
- Comments for complex logic

**Implementation Tasks**:

- [ ] Configure ESLint rules
- [ ] Set up Prettier (if desired)
- [ ] Document complex components
- [ ] Follow naming conventions
- [ ] Use conventional commits

### Principle 8: SEO & Accessibility ✅

**How This Plan Satisfies**:

- Metadata API for all pages
- Semantic HTML throughout
- ARIA labels where needed
- Alt text for all images
- Keyboard navigation support
- Color contrast compliance
- Structured data (JSON-LD)

**SEO Implementation**:

```typescript
// app/tours/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);

  return {
    title: `${tour.name} - Travel & Tours`,
    description: tour.description,
    openGraph: {
      title: tour.name,
      description: tour.description,
      images: [tour.images[0]],
    },
  };
}
```

**Implementation Tasks**:

- [ ] Add metadata to all pages
- [ ] Implement semantic HTML
- [ ] Add ARIA labels
- [ ] Include alt text on images
- [ ] Test keyboard navigation
- [ ] Add structured data
- [ ] Verify color contrast

## Phase 0: Research & Decisions

### Research Document Summary

**Key Decisions Made**:

1. **Data Storage Pattern**

   - **Decision**: Local TypeScript file with typed array
   - **Rationale**: Type-safe, version controlled, no build-time dependencies
   - **Location**: `/data/tours.ts` exporting `const tours: Tour[]`
   - **Alternative Considered**: JSON file (less type-safe, requires runtime parsing)

2. **shadcn/ui Component Selection**

   - **Decision**: Install Button, Card, Input, Select, Textarea, Badge
   - **Rationale**: Covers all UI needs, fully typed, customizable
   - **Installation**: Use shadcn CLI to add components as needed
   - **Alternative Considered**: Building from scratch (more time, less polished)

3. **Form Validation Library**

   - **Decision**: Zod for schema validation
   - **Rationale**: Type-safe, works with Server Actions, excellent TypeScript integration
   - **Usage**: Define schemas, validate in Server Actions
   - **Alternative Considered**: Yup (less TypeScript-first)

4. **State Management for Filters**

   - **Decision**: URL search params + React hooks
   - **Rationale**: Shareable URLs, browser navigation works, no extra library
   - **Implementation**: `useSearchParams` + `useRouter` for updates
   - **Alternative Considered**: React Context (not shareable, complicates routing)

5. **Image Strategy**

   - **Decision**: Unsplash API or local placeholder images
   - **Rationale**: High-quality, free, no attribution required for demo
   - **Backup**: Local placeholder images in `/public/images/tours/`
   - **Alternative Considered**: Lorem Picsum (less travel-specific)

6. **Tour Slug Generation**
   - **Decision**: Kebab-case from destination name
   - **Rationale**: SEO-friendly, readable, consistent
   - **Implementation**: `name.toLowerCase().replace(/\s+/g, '-')`
   - **Alternative Considered**: UUID-based (not readable)

See [research.md](./research.md) for full details.

## Phase 1: Design & Implementation Plan

### Data Model

See [data-model.md](./data-model.md) for complete entity definitions.

**Core Entities**:

1. **Tour Entity**

   - 11 fields (id, slug, name, country, region, price, duration, descriptions, images, featured, highlights)
   - 12-15 instances across 4 regions
   - Type-safe with TypeScript interface

2. **ContactFormData Entity**

   - 5 fields (name, email, phone, message, preferredTour)
   - Validated with Zod schema
   - Server Action return type

3. **FilterState Type**
   - URL-based state management
   - Fields: region, minPrice, maxPrice, minDays, maxDays, sort

### API Contracts (Server Actions)

See [contracts/contact-action.ts](./contracts/contact-action.ts) for implementation spec.

**Contact Form Server Action**:

```typescript
"use server";

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Parse form data
  // 2. Validate with Zod schema
  // 3. Simulate processing (2-3 sec delay)
  // 4. Return success/error state
}
```

**No REST API Required**: All interactions handled via:

- Static data imports
- Server Actions for mutations
- Client-side filtering

### Component Architecture

**Component Hierarchy**:

```
Layout (Server Component)
├── Header (Server Component)
│   ├── Logo (Server Component)
│   └── Navigation (Client Component - mobile menu toggle)
│
├── Main Content Area
│   │
│   ├── Home Page
│   │   ├── HeroSection (Server Component)
│   │   │   └── HeroImage (next/image)
│   │   └── FeaturedTours (Server Component)
│   │       └── TourGrid (Server Component)
│   │           └── TourCard (Server Component with Link)
│   │
│   ├── Tours Page
│   │   ├── TourFilters (Client Component - interactive)
│   │   │   ├── RegionFilter (Client)
│   │   │   ├── PriceRangeFilter (Client)
│   │   │   └── DurationFilter (Client)
│   │   └── TourGrid (Server Component)
│   │       └── TourCard (Server Component)
│   │
│   ├── Tour Details Page
│   │   ├── Breadcrumb (Server Component)
│   │   ├── TourHero (Server Component)
│   │   ├── TourHeader (Server Component)
│   │   │   ├── Badge (shadcn/ui)
│   │   │   └── PriceDisplay
│   │   ├── ImageGallery (Client Component - interactive)
│   │   └── TourDescription (Server Component)
│   │
│   └── Contact Page
│       ├── ContactForm (Client Component - form state)
│       │   ├── FormField (shadcn/ui Input)
│       │   ├── Textarea (shadcn/ui)
│       │   ├── Select (shadcn/ui - tour selection)
│       │   └── Button (shadcn/ui)
│       └── ContactInfo (Server Component)
│
└── Footer (Server Component)
    ├── CompanyInfo
    ├── QuickLinks
    └── SocialMedia
```

**Client Component Decisions**:

- Navigation: Mobile menu toggle requires state
- TourFilters: Interactive filtering requires client state
- ImageGallery: Carousel/lightbox interaction
- ContactForm: Form state management and validation feedback

**Server Component Benefits**:

- All static content (Hero, Tour cards, Info sections)
- Data fetching without client JS
- Better SEO and initial load performance

### Folder Structure

```
travel_tours/
├── app/
│   ├── layout.tsx                 # Root layout with Header/Footer
│   ├── page.tsx                   # Home page
│   ├── loading.tsx                # Global loading
│   ├── error.tsx                  # Global error boundary
│   ├── globals.css                # Global styles + Tailwind
│   ├── tours/
│   │   ├── page.tsx               # Tours listing
│   │   ├── loading.tsx            # Tours loading
│   │   └── [slug]/
│   │       ├── page.tsx           # Tour details
│   │       ├── loading.tsx        # Detail loading
│   │       └── error.tsx          # Detail error
│   └── contact/
│       ├── page.tsx               # Contact page
│       └── actions.ts             # Contact form Server Action
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   └── badge.tsx
│   ├── tours/
│   │   ├── tour-card.tsx          # Reusable tour card
│   │   ├── tour-grid.tsx          # Grid layout wrapper
│   │   ├── tour-filters.tsx       # Filter sidebar/panel
│   │   ├── tour-hero.tsx          # Hero image section
│   │   ├── image-gallery.tsx      # Tour image carousel
│   │   └── tour-skeleton.tsx      # Loading skeleton
│   ├── contact/
│   │   ├── contact-form.tsx       # Contact form component
│   │   └── form-field.tsx         # Reusable form field
│   └── layout/
│       ├── header.tsx             # Site header
│       ├── navigation.tsx         # Nav menu
│       ├── footer.tsx             # Site footer
│       └── breadcrumb.tsx         # Breadcrumb navigation
│
├── data/
│   └── tours.ts                   # Tour data (12-15 tours typed array)
│
├── types/
│   ├── tour.ts                    # Tour interfaces
│   ├── contact.ts                 # Contact form types
│   └── index.ts                   # Re-exports
│
├── lib/
│   ├── utils.ts                   # Utility functions (cn, etc.)
│   ├── validation.ts              # Zod schemas
│   └── tour-helpers.ts            # Tour filtering/sorting logic
│
├── public/
│   └── images/
│       └── tours/                 # Backup tour images
│
├── .specify/                      # Project governance (existing)
├── components.json                # shadcn/ui config
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
└── package.json                   # Dependencies
```

### Implementation Roadmap

#### Sprint 1: Foundation (Days 1-3)

**Day 1: Project Setup**

- [ ] Verify Next.js 15 + TypeScript configuration
- [ ] Install shadcn/ui (Button, Card, Input, Select, Textarea, Badge)
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Create type definitions in `/types`
- [ ] Enable TypeScript strict mode

**Day 2: Data Layer**

- [ ] Create Tour interface and types
- [ ] Build mock tour data (12-15 tours, 4 regions)
- [ ] Add Zod validation schemas
- [ ] Create tour helper functions (filtering, sorting)
- [ ] Test data structure

**Day 3: Shared Components**

- [ ] Build Header component with Navigation
- [ ] Create Footer component
- [ ] Implement mobile navigation
- [ ] Add Breadcrumb component
- [ ] Set up root layout

#### Sprint 2: Core Pages (Days 4-7)

**Day 4: Home Page**

- [ ] Create home page layout
- [ ] Build HeroSection component
- [ ] Implement FeaturedTours section
- [ ] Add TourCard component (reusable)
- [ ] Add TourGrid component
- [ ] Configure home page metadata

**Day 5: Tours Listing**

- [ ] Create tours listing page
- [ ] Build TourFilters component (Client)
- [ ] Implement URL-based filter state
- [ ] Add filtering logic
- [ ] Add sorting functionality
- [ ] Create loading.tsx skeleton

**Day 6: Tour Details (Dynamic Route)**

- [ ] Set up /tours/[slug] dynamic route
- [ ] Implement getTourBySlug function
- [ ] Add generateStaticParams for SSG
- [ ] Build TourHero component
- [ ] Create TourHeader with badges
- [ ] Implement ImageGallery component
- [ ] Add tour description sections
- [ ] Configure dynamic metadata

**Day 7: Contact Page**

- [ ] Create contact page layout
- [ ] Build ContactForm component
- [ ] Implement Server Action for submission
- [ ] Add Zod validation
- [ ] Create success/error states
- [ ] Add tour selection dropdown
- [ ] Test form submission flow

#### Sprint 3: Polish & Testing (Days 8-10)

**Day 8: Responsive Design**

- [ ] Test all pages on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] Fix responsive issues
- [ ] Verify touch targets
- [ ] Test mobile navigation

**Day 9: Performance & Accessibility**

- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Add alt text to images
- [ ] Test with screen reader

**Day 10: Final Testing & Deployment**

- [ ] Cross-browser testing
- [ ] ESLint fixes
- [ ] Type checking (no errors)
- [ ] Build for production
- [ ] Test production build locally
- [ ] Deploy to Vercel
- [ ] Verify live deployment
- [ ] Update documentation

### Testing Strategy

**Manual Testing Checklist**:

1. **Home Page**

   - [ ] Hero section displays correctly
   - [ ] Featured tours load (3-6 tours)
   - [ ] Cards link to tour details
   - [ ] Responsive on mobile/tablet/desktop

2. **Tours Listing**

   - [ ] All 12-15 tours display
   - [ ] Filters work (region, price, duration)
   - [ ] Sort options work (price, duration, name)
   - [ ] URL updates with filter state
   - [ ] "No results" message for empty filters
   - [ ] Loading skeleton appears

3. **Tour Details**

   - [ ] Correct tour loads for slug
   - [ ] All tour information displays
   - [ ] Image gallery works
   - [ ] Breadcrumb navigation works
   - [ ] 404 for invalid slugs
   - [ ] Metadata correct (title, description)

4. **Contact Page**

   - [ ] Form displays all fields
   - [ ] Validation shows errors
   - [ ] Tour dropdown populated
   - [ ] Server Action submission works
   - [ ] Success message appears
   - [ ] Error handling works

5. **Navigation**

   - [ ] All nav links work
   - [ ] Mobile menu toggles
   - [ ] Active page highlighted
   - [ ] Breadcrumbs accurate

6. **Performance**

   - [ ] Lighthouse score 90+ (mobile & desktop)
   - [ ] Page loads < 2s on 3G
   - [ ] Images lazy load
   - [ ] No console errors

7. **Accessibility**
   - [ ] Keyboard navigation works
   - [ ] Screen reader compatible
   - [ ] Color contrast passes
   - [ ] ARIA labels present
   - [ ] Focus indicators visible

### Dependencies

**Package Installation**:

```bash
# Already installed (from package.json)
# - next@15.5.6
# - react@19.1.0
# - typescript@5
# - tailwindcss@4.1.14

# shadcn/ui components (install as needed)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add badge

# Additional packages to install
npm install zod                    # Form validation
npm install @hookform/resolvers    # React Hook Form + Zod
npm install react-hook-form        # Form state management
npm install embla-carousel-react   # Image gallery (if using Embla)
```

**Optional Dependencies**:

- `clsx` / `tailwind-merge` (already installed for `cn` utility)
- `date-fns` (if adding date formatting for tours)
- `lucide-react` (already installed for icons)

### Risk Assessment

**Low Risk**:

- ✅ No backend/database complexity
- ✅ All data is static/mock
- ✅ No authentication required
- ✅ No payment processing
- ✅ Vercel deployment is straightforward

**Medium Risk**:

- ⚠️ Image sourcing (mitigation: use Unsplash or placeholders)
- ⚠️ Content creation for 12-15 tours (mitigation: AI-generated descriptions)
- ⚠️ shadcn/ui learning curve (mitigation: excellent documentation)

**Mitigations**:

- Use AI to generate tour descriptions
- Unsplash API for high-quality images
- Follow shadcn/ui documentation closely
- Test early and often on mobile devices

### Success Criteria

**Technical Completeness**:

- [ ] All 4 pages implemented and functional
- [ ] 12-15 tours with complete data
- [ ] TypeScript strict mode with no errors
- [ ] ESLint passes with no warnings
- [ ] Builds successfully for production

**Constitutional Compliance**:

- [ ] All 8 principles satisfied
- [ ] Lighthouse score 90+ (Principle 6)
- [ ] WCAG AA compliant (Principle 8)
- [ ] Components < 250 lines (Principle 2)
- [ ] Server Components used appropriately (Principle 3)

**User Experience**:

- [ ] Intuitive navigation across all pages
- [ ] Filters work smoothly without page reloads
- [ ] Form provides clear validation feedback
- [ ] Loading states prevent confusion
- [ ] Mobile experience is excellent

**Demonstration Quality**:

- [ ] Showcases Next.js 15 patterns effectively
- [ ] Component architecture is clean and reusable
- [ ] Code is well-organized and documented
- [ ] Deployable to Vercel with one click
- [ ] Suitable for portfolio presentation

---

## Next Steps

1. **Review this plan** - Ensure alignment with expectations
2. **Generate artifacts** - Run Phase 1 artifact generation (data-model.md, contracts/)
3. **Begin Sprint 1** - Start with project setup and data layer
4. **Daily standup** - Track progress against roadmap
5. **Deploy early** - Push to Vercel after Sprint 2 for early feedback

**Estimated Completion**: 10 days (full-time) or 2-3 weeks (part-time)

**Ready to begin implementation!** 🚀

