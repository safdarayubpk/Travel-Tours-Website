# Quickstart Guide: Travel & Tours Website

**Project**: Travel & Tours Demonstration Website  
**Framework**: Next.js 15 (App Router) + TypeScript + Tailwind CSS  
**Purpose**: Implement a clean, modern tour listing website  
**Timeline**: 10 days (full-time) or 2-3 weeks (part-time)

---

## Prerequisites

**Required**:

- Node.js 20+ installed
- Git installed
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

**Helpful**:

- Familiarity with Tailwind CSS
- Understanding of Server Components vs Client Components
- Experience with Next.js App Router

---

## Project Setup (Day 1)

### 1. Verify Environment

```bash
# Check versions
node --version    # Should be 20+
npm --version     # Should be 10+
git --version     # Should be 2+

# Navigate to project
cd /home/safdarayub/Desktop/Images/travel_tours

# Check current branch
git branch --show-current  # Should be feature/travel-tours-website-*
```

### 2. Install Dependencies

```bash
# Install shadcn/ui CLI and components
npx shadcn@latest init

# Follow prompts:
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate (or your choice)
# - CSS variables: Yes

# Install required shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add badge

# Install additional packages
npm install zod
npm install react-hook-form @hookform/resolvers
```

### 3. Configure TypeScript Strict Mode

```json
// tsconfig.json - Verify these settings
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 4. Set Up Folder Structure

```bash
# Create directories
mkdir -p types data lib components/tours components/contact components/layout

# Verify structure
tree -L 2 -I node_modules
```

---

## Implementation Checklist

### Phase 1: Foundation (Days 1-3)

#### Day 1: Setup & Types ✅

- [ ] Install shadcn/ui components
- [ ] Install Zod and form libraries
- [ ] Enable TypeScript strict mode
- [ ] Create folder structure
- [ ] Create type definitions

**Files to Create**:

```
types/
  ├── tour.ts         # Tour interface, Region type, TourDuration
  ├── contact.ts      # ContactFormData, FormState
  ├── filters.ts      # FilterState, SortOption
  └── index.ts        # Re-exports
```

**Example**: `types/tour.ts`

```typescript
export type Region = "Europe" | "Asia" | "Americas" | "Africa";

export interface TourDuration {
  days: number;
  nights: number;
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: Region;
  price: number;
  currency: string;
  duration: TourDuration;
  description: string;
  extendedDescription: string;
  images: string[];
  featured: boolean;
  highlights: string[];
}
```

#### Day 2: Data Layer ✅

- [ ] Create Tour interface
- [ ] Build mock tour data (12-15 tours)
- [ ] Add Zod validation schemas
- [ ] Create tour helper functions
- [ ] Test data structure

**Files to Create**:

```
data/
  └── tours.ts        # 12-15 mock tours + helper functions

lib/
  ├── validation.ts   # Zod schemas
  ├── tour-helpers.ts # Filter/sort functions
  └── utils.ts        # cn() utility (from shadcn)
```

**Example**: `data/tours.ts` structure

```typescript
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
    description: "...",
    extendedDescription: "...",
    images: [
      "https://images.unsplash.com/photo-xxx",
      "https://images.unsplash.com/photo-yyy",
    ],
    featured: true,
    highlights: ["...", "...", "..."],
  },
  // ... 11-14 more tours (3-4 per region)
];

export function getTours(): Tour[] {
  return tours;
}
export function getTourBySlug(slug: string): Tour | undefined {
  /*...*/
}
export function getFeaturedTours(): Tour[] {
  /*...*/
}
```

**Tip**: Use AI to generate tour descriptions. Example prompt:

> "Generate a realistic 7-day Paris tour description including highlights like Eiffel Tower, Louvre, Versailles"

#### Day 3: Shared Components ✅

- [ ] Build Header component
- [ ] Create Navigation (mobile responsive)
- [ ] Implement Footer
- [ ] Add Breadcrumb component
- [ ] Set up root layout

**Files to Create**:

```
components/layout/
  ├── header.tsx
  ├── navigation.tsx
  ├── footer.tsx
  └── breadcrumb.tsx

app/
  ├── layout.tsx      # Root layout with Header/Footer
  ├── globals.css     # Tailwind imports
  └── page.tsx        # Update home page
```

**Example**: `app/layout.tsx`

```typescript
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Phase 2: Core Pages (Days 4-7)

#### Day 4: Home Page ✅

- [ ] Create home page layout
- [ ] Build HeroSection component
- [ ] Implement FeaturedTours section
- [ ] Create TourCard component (reusable)
- [ ] Add TourGrid component
- [ ] Configure metadata

**Files to Create**:

```
app/
  └── page.tsx            # Home page

components/tours/
  ├── tour-card.tsx       # Reusable tour card
  ├── tour-grid.tsx       # Grid layout
  └── hero-section.tsx    # Hero banner
```

**Example**: `components/tours/tour-card.tsx`

```typescript
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Tour } from '@/types/tour';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={tour.images[0]}
        alt={tour.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{tour.name}</h3>
          <Badge>{tour.region}</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {tour.country} • {tour.duration.days} days
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            ${tour.price}
          </span>
          <Button asChild>
            <Link href={`/tours/${tour.slug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

#### Day 5: Tours Listing ✅

- [ ] Create tours listing page
- [ ] Build TourFilters component (Client Component)
- [ ] Implement URL-based filter state
- [ ] Add filtering logic
- [ ] Add sorting functionality
- [ ] Create loading.tsx

**Files to Create**:

```
app/tours/
  ├── page.tsx        # Tours listing (Server Component)
  └── loading.tsx     # Loading skeleton

components/tours/
  ├── tour-filters.tsx    # Filter controls (Client Component)
  └── tour-skeleton.tsx   # Loading skeleton
```

**Example**: `app/tours/page.tsx`

```typescript
import { getTours } from '@/data/tours';
import { filterTours, sortTours, parseFiltersFromSearchParams } from '@/lib/tour-helpers';
import { TourGrid } from '@/components/tours/tour-grid';
import { TourCard } from '@/components/tours/tour-card';
import { TourFilters } from '@/components/tours/tour-filters';

export default function ToursPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const allTours = getTours();
  const filters = parseFiltersFromSearchParams(new URLSearchParams(searchParams));

  let filteredTours = filterTours(allTours, filters);
  filteredTours = sortTours(filteredTours, filters.sort || 'name');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Tours</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <TourFilters />
        </aside>

        <div className="lg:col-span-3">
          {filteredTours.length === 0 ? (
            <p>No tours match your filters.</p>
          ) : (
            <TourGrid>
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </TourGrid>
          )}
        </div>
      </div>
    </div>
  );
}
```

#### Day 6: Tour Details (Dynamic Route) ✅

- [ ] Set up /tours/[slug] dynamic route
- [ ] Implement getTourBySlug
- [ ] Add generateStaticParams
- [ ] Build TourHero component
- [ ] Create TourHeader with badges
- [ ] Implement ImageGallery (Client Component)
- [ ] Add description sections
- [ ] Configure dynamic metadata

**Files to Create**:

```
app/tours/[slug]/
  ├── page.tsx        # Tour details (Server Component)
  ├── loading.tsx     # Detail loading
  └── error.tsx       # Error boundary

components/tours/
  ├── tour-hero.tsx
  ├── tour-header.tsx
  └── image-gallery.tsx   # Client Component
```

**Example**: `app/tours/[slug]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import { getTours, getTourBySlug } from '@/data/tours';
import { TourHero } from '@/components/tours/tour-hero';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const tours = getTours();
  return tours.map(tour => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);
  if (!tour) return {};

  return {
    title: `${tour.name} - Travel & Tours`,
    description: tour.description,
  };
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Tours', href: '/tours' },
        { label: tour.name, href: `/tours/${tour.slug}` },
      ]} />

      <TourHero tour={tour} />

      {/* Tour details sections */}
    </div>
  );
}
```

#### Day 7: Contact Page ✅

- [ ] Create contact page
- [ ] Build ContactForm component (Client Component)
- [ ] Implement Server Action
- [ ] Add Zod validation
- [ ] Create success/error states
- [ ] Add tour selection dropdown
- [ ] Test form flow

**Files to Create**:

```
app/contact/
  ├── page.tsx        # Contact page
  └── actions.ts      # Server Actions

components/contact/
  ├── contact-form.tsx    # Form (Client Component)
  └── form-field.tsx      # Reusable field wrapper
```

**Example**: `app/contact/actions.ts` (see contracts/contact-action.ts for full implementation)

### Phase 3: Polish & Testing (Days 8-10)

#### Day 8: Responsive Design ✅

- [ ] Test mobile (320px, 375px, 425px)
- [ ] Test tablet (768px, 1024px)
- [ ] Test desktop (1280px, 1920px)
- [ ] Fix responsive issues
- [ ] Verify touch targets (44x44px)
- [ ] Test mobile navigation

**Testing Checklist**:

```
Mobile (320px-767px):
- [ ] Navigation collapses to hamburger
- [ ] Tour cards stack vertically
- [ ] Filters work in mobile view
- [ ] Form fields are full-width
- [ ] Images scale properly

Tablet (768px-1023px):
- [ ] Tour grid shows 2 columns
- [ ] Filters sidebar visible
- [ ] Navigation inline

Desktop (1024px+):
- [ ] Tour grid shows 3 columns
- [ ] All content visible
- [ ] Hover states work
```

#### Day 9: Performance & Accessibility ✅

- [ ] Run Lighthouse audit
- [ ] Optimize images (next/image)
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Add alt text
- [ ] Test with screen reader

**Performance Optimization**:

```bash
# Build and analyze
npm run build
npm run start

# Run Lighthouse
# Open Chrome DevTools > Lighthouse > Run audit

# Target scores:
# - Performance: 90+
# - Accessibility: 100
# - Best Practices: 100
# - SEO: 100
```

**Accessibility Checklist**:

- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators visible
- [ ] Color contrast 4.5:1 minimum
- [ ] ARIA labels where needed
- [ ] Semantic HTML (header, nav, main, footer)

#### Day 10: Deployment ✅

- [ ] ESLint fixes
- [ ] TypeScript check (no errors)
- [ ] Build for production
- [ ] Test production build locally
- [ ] Deploy to Vercel
- [ ] Verify live site
- [ ] Update documentation

**Deployment Steps**:

```bash
# 1. Lint and type check
npm run lint
npx tsc --noEmit

# 2. Build production
npm run build

# 3. Test production build locally
npm run start
# Visit http://localhost:3000

# 4. Deploy to Vercel
# Option A: Connect GitHub repo (automatic)
# - Push to GitHub
# - Import to Vercel
# - Auto-deploy on push

# Option B: Manual deploy
npx vercel
# Follow prompts
```

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Add shadcn component
npx shadcn@latest add [component-name]
```

---

## Key Files Reference

### Must-Create Files

| File                                  | Purpose                      | Type      |
| ------------------------------------- | ---------------------------- | --------- |
| `types/tour.ts`                       | Tour type definitions        | Type      |
| `data/tours.ts`                       | Mock tour data (12-15 tours) | Data      |
| `lib/validation.ts`                   | Zod schemas                  | Logic     |
| `lib/tour-helpers.ts`                 | Filter/sort functions        | Logic     |
| `app/layout.tsx`                      | Root layout                  | Layout    |
| `app/page.tsx`                        | Home page                    | Page      |
| `app/tours/page.tsx`                  | Tours listing                | Page      |
| `app/tours/[slug]/page.tsx`           | Tour details                 | Page      |
| `app/contact/page.tsx`                | Contact page                 | Page      |
| `app/contact/actions.ts`              | Server Actions               | API       |
| `components/tours/tour-card.tsx`      | Tour card                    | Component |
| `components/tours/tour-filters.tsx`   | Filters                      | Component |
| `components/contact/contact-form.tsx` | Contact form                 | Component |
| `components/layout/header.tsx`        | Site header                  | Component |
| `components/layout/footer.tsx`        | Site footer                  | Component |

### Key Implementation Patterns

**Server Component (Default)**:

```typescript
// No 'use client' directive
export default function MyPage() {
  const data = fetchData(); // Can be async
  return <div>{data}</div>;
}
```

**Client Component (Interactive)**:

```typescript
'use client'; // At top of file

import { useState } from 'react';

export function MyComponent() {
  const [state, setState] = useState('');
  return <button onClick={() => setState('clicked')}>Click</button>;
}
```

**Dynamic Route with Static Generation**:

```typescript
// app/tours/[slug]/page.tsx

export async function generateStaticParams() {
  const tours = getTours();
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);
  // ...
}
```

---

## Troubleshooting

### Common Issues

**Issue**: TypeScript errors with `any` type  
**Solution**: Define explicit types, enable strict mode

**Issue**: Images not loading from Unsplash  
**Solution**: Add domains to next.config.ts:

```typescript
module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
};
```

**Issue**: Client Component hydration errors  
**Solution**: Ensure server and client render the same content initially

**Issue**: Form submission not working  
**Solution**: Check Server Action is marked with 'use server'

**Issue**: Filters not updating URL  
**Solution**: Use `useRouter().push()` in Client Component

---

## Resources

**Documentation**:

- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev/)

**Project Files**:

- [Specification](./spec.md)
- [Data Model](./data-model.md)
- [Research Decisions](./research.md)
- [Implementation Plan](./plan.md)

**Helpful Tools**:

- [Unsplash](https://unsplash.com/) - Free images
- [Lucide Icons](https://lucide.dev/) - Icon library
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## Success Criteria

**Technical**:

- ✅ All 4 pages functional
- ✅ 12-15 tours with complete data
- ✅ TypeScript strict mode, no errors
- ✅ ESLint passes
- ✅ Production build succeeds

**Constitutional**:

- ✅ Lighthouse 90+ (Principle 6)
- ✅ WCAG AA compliant (Principle 8)
- ✅ Components < 250 lines (Principle 2)
- ✅ Server Components used (Principle 3)

**User Experience**:

- ✅ Intuitive navigation
- ✅ Filters work smoothly
- ✅ Form validation clear
- ✅ Mobile experience excellent

---

**Ready to start? Begin with Day 1 setup!** 🚀

**Questions?** Refer to the specification and data model documents, or check the constitution for guiding principles.

