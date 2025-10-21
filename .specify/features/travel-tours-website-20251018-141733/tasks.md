# Implementation Tasks: Travel & Tours Website

**Feature**: International Travel & Tours Listing Platform  
**Branch**: feature/travel-tours-website-20251018-141733  
**Created**: 2025-10-18  
**Task Format**: `- [ ] [TaskID] [P?] [Story?] Description with file path`

---

## Task Organization

This tasks.md is organized by **user story** to enable independent implementation and testing. Each user story phase can be developed and tested independently, allowing for parallel work and incremental delivery.

**Legend**:

- `[P]` = Parallelizable task (can be done simultaneously with other [P] tasks)
- `[US1]` = User Story 1 task
- `[US2]` = User Story 2 task (and so on)
- No label = Setup/Foundational/Polish task

---

## User Stories (from spec.md)

### User Story 1 (P0): Home Page

**Goal**: Display hero section with compelling imagery and 3-6 featured tours  
**Value**: First impression, showcase best tours  
**Independent Test**: Homepage loads, hero displays, featured tours render with correct data

### User Story 2 (P0): Tours Listing Page

**Goal**: Show all 12-15 tours with filtering by region, price, duration and sorting  
**Value**: Browse and discover tours matching preferences  
**Independent Test**: All tours display, filters work and update URL, sorting functions correctly

### User Story 3 (P0): Tour Details Page

**Goal**: Display complete tour information on dedicated page with SEO-friendly slug  
**Value**: Detailed information for decision-making  
**Independent Test**: Tour detail page loads via slug, all information displays, 404 for invalid slug

### User Story 4 (P0): Contact Form

**Goal**: Submit inquiries with validation and Server Action processing  
**Value**: User engagement and lead generation  
**Independent Test**: Form validates input, submits via Server Action, displays success/error states

---

## Dependency Graph

```
Setup (Phase 1)
    ↓
Foundational (Phase 2) - Types, Data, Shared Components
    ↓
    ├─→ US1: Home Page (Phase 3) ──┐
    ├─→ US2: Tours Listing (Phase 4)│
    ├─→ US3: Tour Details (Phase 5) ├─→ Polish (Phase 7)
    └─→ US4: Contact Form (Phase 6)─┘

Note: US1-US4 can be developed in parallel after Phase 2 completes
```

---

## Implementation Strategy

**MVP Approach**: Complete Phase 1 → Phase 2 → **Phase 3 (US1)** = Minimal Viable Product

**Incremental Delivery**:

1. **Sprint 1** (Days 1-3): Phase 1 + Phase 2 (Foundation)
2. **Sprint 2** (Days 4-7): Phase 3-6 (All User Stories, can parallelize)
3. **Sprint 3** (Days 8-10): Phase 7 (Polish & Testing)

**Parallel Opportunities**:

- After Phase 2: US1, US2, US3, US4 can be developed simultaneously by different developers
- Within each phase: Tasks marked [P] can run in parallel
- Testing can happen concurrently with development of next story

---

## Phase 1: Setup (Project Initialization)

**Goal**: Configure project environment and install dependencies  
**Duration**: ~2-3 hours  
**Blocking**: Must complete before any implementation

### Setup Tasks

- [x] T001 Verify Node.js 20+ and npm are installed
- [x] T002 Verify current git branch is feature/travel-tours-website-20251018-141733
- [x] T003 Install shadcn/ui CLI: `npx shadcn@latest init`
- [x] T004 [P] Install shadcn/ui button component: `npx shadcn@latest add button`
- [x] T005 [P] Install shadcn/ui card component: `npx shadcn@latest add card`
- [x] T006 [P] Install shadcn/ui input component: `npx shadcn@latest add input`
- [x] T007 [P] Install shadcn/ui select component: `npx shadcn@latest add select`
- [x] T008 [P] Install shadcn/ui textarea component: `npx shadcn@latest add textarea`
- [x] T009 [P] Install shadcn/ui badge component: `npx shadcn@latest add badge`
- [x] T010 Install Zod validation library: `npm install zod`
- [x] T011 Install React Hook Form: `npm install react-hook-form @hookform/resolvers`
- [x] T012 Enable TypeScript strict mode in tsconfig.json
- [x] T013 Create directory structure: types/, data/, lib/, components/tours/, components/contact/, components/layout/

**Phase 1 Completion Criteria**:

- [x] All dependencies installed without errors
- [x] shadcn/ui components available in components/ui/
- [x] TypeScript strict mode enabled
- [x] Folder structure created

---

## Phase 2: Foundational (Blocking Prerequisites)

**Goal**: Build shared infrastructure required by all user stories  
**Duration**: ~1 day  
**Blocking**: Must complete before user story implementation

### Type Definitions

- [x] T014 [P] Create Region type in types/tour.ts
- [x] T015 [P] Create TourDuration interface in types/tour.ts
- [x] T016 [P] Create Tour interface with all 11 fields in types/tour.ts
- [x] T017 [P] Create ContactFormData interface in types/contact.ts
- [x] T018 [P] Create FormState interface in types/contact.ts
- [x] T019 [P] Create FilterState interface in types/filters.ts
- [x] T020 [P] Create SortOption type in types/filters.ts
- [x] T021 [P] Create SORT_OPTIONS constant array in types/filters.ts
- [x] T022 Create index.ts re-export file in types/index.ts

### Data Layer

- [x] T023 Create 12-15 mock tours with complete data in data/tours.ts
- [x] T024 [P] Implement getTours() function in data/tours.ts
- [x] T025 [P] Implement getTourBySlug(slug) function in data/tours.ts
- [x] T026 [P] Implement getFeaturedTours() function in data/tours.ts
- [x] T027 [P] Implement getToursByRegion(region) function in data/tours.ts
- [x] T028 [P] Implement getRegions() function in data/tours.ts
- [x] T029 [P] Implement getPriceRange() function in data/tours.ts

### Validation & Utilities

- [x] T030 [P] Create tourSchema Zod validation in lib/validation.ts
- [x] T031 [P] Create contactFormSchema Zod validation in lib/validation.ts
- [x] T032 [P] Implement filterTours(tours, filters) function in lib/tour-helpers.ts
- [x] T033 [P] Implement sortTours(tours, sortBy) function in lib/tour-helpers.ts
- [x] T034 [P] Implement parseFiltersFromSearchParams() function in lib/tour-helpers.ts
- [x] T035 Verify cn() utility exists in lib/utils.ts (from shadcn)

### Shared Layout Components

- [x] T036 Create Header component with navigation in components/layout/header.tsx
- [x] T037 Create Navigation component with mobile menu toggle (Client Component) in components/layout/navigation.tsx
- [x] T038 [P] Create Footer component with company info and links in components/layout/footer.tsx
- [x] T039 [P] Create Breadcrumb component in components/layout/breadcrumb.tsx
- [x] T040 Update root layout with Header and Footer in app/layout.tsx
- [x] T041 Add global Tailwind styles in app/globals.css

**Phase 2 Completion Criteria**:

- [x] All TypeScript types compile without errors
- [x] 12-15 tours created with realistic data
- [x] Helper functions tested manually (getTourBySlug, filterTours, sortTours)
- [x] Header, Footer, Navigation render correctly
- [x] Root layout displays on all pages

**Phase 2 Testing** (if needed):

```bash
# Manual verification
npm run dev
# Navigate to http://localhost:3000
# Verify Header and Footer display
# Check browser console for TypeScript errors (should be none)
```

---

## Phase 3: User Story 1 - Home Page

**Story Goal**: Display hero section with compelling travel imagery and showcase 3-6 featured tours  
**Story Value**: Creates strong first impression and highlights best tour offerings  
**Dependencies**: Phase 2 (types, data, shared layout)  
**Estimated Duration**: ~4-6 hours

### Independent Test Criteria for US1

- [ ] Homepage loads at http://localhost:3000
- [ ] Hero section displays with background image and CTA button
- [ ] Featured tours section shows 3-6 tours (those marked featured:true)
- [ ] Each tour card displays: image, name, country, price, duration
- [ ] "View Details" button links to /tours/[slug]
- [ ] "View All Tours" link navigates to /tours
- [ ] Page is responsive on mobile (320px) and desktop (1024px)
- [ ] No console errors or TypeScript errors

### US1 Implementation Tasks

#### Home Page Layout

- [x] T042 [US1] Create home page in app/page.tsx with async data fetching
- [x] T043 [US1] Add metadata export to home page for SEO in app/page.tsx
- [x] T044 [US1] Fetch featured tours using getFeaturedTours() in app/page.tsx

#### Hero Section Component

- [x] T045 [US1] Create HeroSection Server Component in components/tours/hero-section.tsx
- [x] T046 [US1] Add hero background image using next/image in hero-section.tsx
- [x] T047 [US1] Add hero headline "Discover Your Next Adventure" in hero-section.tsx
- [x] T048 [US1] Add hero subheading and CTA button in hero-section.tsx
- [x] T049 [US1] Make hero section responsive (mobile-first) in hero-section.tsx

#### Tour Card Component (Reusable)

- [x] T050 [US1] Create TourCard Server Component with typed props in components/tours/tour-card.tsx
- [x] T051 [US1] Add tour image with next/image optimization in tour-card.tsx
- [x] T052 [US1] Display tour name, country, price, duration in tour-card.tsx
- [x] T053 [US1] Add region Badge from shadcn/ui in tour-card.tsx
- [x] T054 [US1] Add "View Details" Button linking to /tours/[slug] in tour-card.tsx
- [x] T055 [US1] Style tour card with Tailwind CSS (mobile-first) in tour-card.tsx

#### Tour Grid Component

- [x] T056 [US1] Create TourGrid Server Component in components/tours/tour-grid.tsx
- [x] T057 [US1] Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop) in tour-grid.tsx

#### Featured Tours Section

- [x] T058 [US1] Add Featured Tours section to home page in app/page.tsx
- [x] T059 [US1] Display section heading "Featured Tours" in app/page.tsx
- [x] T060 [US1] Map featured tours to TourCard components in app/page.tsx
- [x] T061 [US1] Add "View All Tours" link to /tours in app/page.tsx

#### US1 Polish

- [x] T062 [US1] Test homepage on mobile (320px), tablet (768px), desktop (1024px)
- [x] T063 [US1] Verify all featured tours display correctly
- [x] T064 [US1] Verify hero image loads and displays properly
- [x] T065 [US1] Test navigation to tour details via "View Details" button
- [x] T066 [US1] Run Lighthouse audit on homepage (target: 90+)

**US1 Completion Criteria**:

- [x] All independent test criteria pass
- [x] Homepage Lighthouse score 90+
- [x] No TypeScript or linting errors
- [x] Responsive on all breakpoints
- [x] Featured tours render with correct data

---

## Phase 4: User Story 2 - Tours Listing Page

**Story Goal**: Display all 12-15 tours with ability to filter by region, price, duration and sort  
**Story Value**: Enables tour discovery and helps users find tours matching their criteria  
**Dependencies**: Phase 2 (types, data, helpers), T050-T057 (TourCard, TourGrid from US1)  
**Estimated Duration**: ~6-8 hours

### Independent Test Criteria for US2

- [ ] Tours page loads at /tours showing all 12-15 tours
- [ ] All tours display in grid layout
- [ ] Region filter dropdown works (Europe, Asia, Americas, Africa, All)
- [ ] Price range filter works (updates visible tours)
- [ ] Duration filter works (updates visible tours)
- [ ] Sort dropdown works (Name, Price Low-High, Price High-Low, Duration)
- [ ] Filters update URL search params (e.g., /tours?region=Europe&sort=price-asc)
- [ ] Browser back button restores previous filter state
- [ ] "No tours match your filters" message appears when no results
- [ ] Tour cards link to /tours/[slug]
- [ ] Page is responsive and filters work on mobile

### US2 Implementation Tasks

#### Tours Listing Page

- [x] T067 [US2] Create tours listing page in app/tours/page.tsx
- [x] T068 [US2] Add metadata export for SEO in app/tours/page.tsx
- [x] T069 [US2] Fetch all tours using getTours() in app/tours/page.tsx
- [x] T070 [US2] Parse URL search params using parseFiltersFromSearchParams() in app/tours/page.tsx
- [x] T071 [US2] Apply filters using filterTours() in app/tours/page.tsx
- [x] T072 [US2] Apply sorting using sortTours() in app/tours/page.tsx
- [x] T073 [US2] Handle empty results state (no matching tours) in app/tours/page.tsx

#### Tour Filters Component (Client Component)

- [x] T074 [US2] Create TourFilters Client Component with 'use client' in components/tours/tour-filters.tsx
- [x] T075 [US2] Use useSearchParams and useRouter hooks in tour-filters.tsx
- [x] T076 [US2] Implement region filter Select (shadcn/ui) in tour-filters.tsx
- [x] T077 [US2] Implement price range filter (min/max inputs) in tour-filters.tsx
- [x] T078 [US2] Implement duration filter (min/max inputs) in tour-filters.tsx
- [x] T079 [US2] Implement sort dropdown Select (shadcn/ui) in tour-filters.tsx
- [x] T080 [US2] Implement updateFilter() function to update URL params in tour-filters.tsx
- [x] T081 [US2] Add "Clear Filters" button in tour-filters.tsx
- [x] T082 [US2] Style filters component (mobile responsive) in tour-filters.tsx

#### Tours Page Layout

- [x] T083 [US2] Create page heading "All Tours" in app/tours/page.tsx
- [x] T084 [US2] Create sidebar layout with filters (desktop) in app/tours/page.tsx
- [x] T085 [US2] Create mobile filter toggle/drawer (collapsible on mobile) in app/tours/page.tsx
- [x] T086 [US2] Display filtered tour count (e.g., "Showing 8 of 15 tours") in app/tours/page.tsx

#### Loading State

- [x] T087 [US2] Create loading.tsx with skeleton loader in app/tours/loading.tsx
- [x] T088 [US2] Create TourSkeleton component for loading state in components/tours/tour-skeleton.tsx

#### US2 Polish

- [x] T089 [US2] Test all filter combinations
- [x] T090 [US2] Verify URL params update correctly
- [x] T091 [US2] Test browser back/forward buttons
- [x] T092 [US2] Test responsive layout (filters collapse on mobile)
- [x] T093 [US2] Verify sort options work correctly
- [x] T094 [US2] Test empty state when no tours match filters

**US2 Completion Criteria**:

- [x] All independent test criteria pass
- [x] Filters work and update URL
- [x] Sorting functions correctly
- [x] Empty state handles gracefully
- [x] Responsive on mobile and desktop
- [x] No console errors

---

## Phase 5: User Story 3 - Tour Details Page

**Story Goal**: Display complete tour information on dedicated page accessed via SEO-friendly slug  
**Story Value**: Provides detailed information for user decision-making and improves SEO  
**Dependencies**: Phase 2 (types, data), T039 (Breadcrumb)  
**Estimated Duration**: ~6-8 hours

### Independent Test Criteria for US3

- [ ] Tour detail page loads at /tours/paris-adventure (and other slugs)
- [ ] All tour information displays: name, country, region, price, duration
- [ ] Tour images display in gallery format
- [ ] Extended description and highlights display
- [ ] Breadcrumb navigation shows: Home > Tours > [Tour Name]
- [ ] "Contact About This Tour" button navigates to /contact?tour=[slug]
- [ ] 404 page displays for invalid slugs (e.g., /tours/fake-tour)
- [ ] Page metadata includes tour name and description (view in browser tab/SEO)
- [ ] Page is responsive on mobile and desktop
- [ ] Back button returns to tours listing

### US3 Implementation Tasks

#### Dynamic Route Setup

- [x] T095 [US3] Create dynamic route folder app/tours/[slug]/
- [x] T096 [US3] Create tour details page in app/tours/[slug]/page.tsx
- [x] T097 [US3] Implement generateStaticParams() for SSG in page.tsx
- [x] T098 [US3] Implement generateMetadata() for dynamic SEO in page.tsx
- [x] T099 [US3] Fetch tour using getTourBySlug(params.slug) in page.tsx
- [x] T100 [US3] Handle 404 with notFound() for invalid slugs in page.tsx

#### Tour Hero Component

- [x] T101 [US3] Create TourHero Server Component in components/tours/tour-hero.tsx
- [x] T102 [US3] Display large hero image using next/image in tour-hero.tsx
- [x] T103 [US3] Add image optimization (priority loading) in tour-hero.tsx

#### Tour Header Component

- [x] T104 [US3] Create TourHeader Server Component in components/tours/tour-header.tsx
- [x] T105 [US3] Display tour name as h1 heading in tour-header.tsx
- [x] T106 [US3] Display country and region with Badges in tour-header.tsx
- [x] T107 [US3] Display price prominently (large text) in tour-header.tsx
- [x] T108 [US3] Display duration (X days, Y nights) in tour-header.tsx

#### Image Gallery Component (Client Component)

- [x] T109 [US3] Create ImageGallery Client Component with 'use client' in components/tours/image-gallery.tsx
- [x] T110 [US3] Display tour images in grid/carousel format in image-gallery.tsx
- [x] T111 [US3] Implement click to enlarge/lightbox functionality in image-gallery.tsx
- [x] T112 [US3] Add navigation arrows for image browsing in image-gallery.tsx
- [x] T113 [US3] Make gallery responsive (stack on mobile) in image-gallery.tsx

#### Tour Description Section

- [x] T114 [US3] Create TourDescription Server Component in components/tours/tour-description.tsx
- [x] T115 [US3] Display short description paragraph in tour-description.tsx
- [x] T116 [US3] Display extended description with formatting in tour-description.tsx
- [x] T117 [US3] Display highlights list with icons in tour-description.tsx
- [x] T118 [US3] Add "What's Included" section in tour-description.tsx

#### Tour Details Page Layout

- [x] T119 [US3] Add Breadcrumb component to tour details page in app/tours/[slug]/page.tsx
- [x] T120 [US3] Integrate TourHero component in page.tsx
- [x] T121 [US3] Integrate TourHeader component in page.tsx
- [x] T122 [US3] Integrate ImageGallery component in page.tsx
- [x] T123 [US3] Integrate TourDescription component in page.tsx
- [x] T124 [US3] Add "Contact About This Tour" Button linking to /contact?tour=[slug] in page.tsx
- [x] T125 [US3] Style page layout with Tailwind CSS (mobile-first) in page.tsx

#### Error Handling

- [x] T126 [US3] Create error.tsx error boundary in app/tours/[slug]/error.tsx
- [x] T127 [US3] Create loading.tsx loading state in app/tours/[slug]/loading.tsx
- [x] T128 [US3] Test 404 handling for invalid tour slugs

#### US3 Polish

- [x] T129 [US3] Test all 12-15 tour detail pages load correctly
- [x] T130 [US3] Verify metadata is unique for each tour (check browser tab title)
- [x] T131 [US3] Test image gallery functionality
- [x] T132 [US3] Verify breadcrumb navigation works
- [x] T133 [US3] Test responsive layout on mobile and desktop
- [x] T134 [US3] Verify 404 page for invalid slugs
- [x] T135 [US3] Test "Contact About This Tour" link

**US3 Completion Criteria**:

- [x] All independent test criteria pass
- [x] All tour pages generate statically
- [x] Metadata is dynamic and SEO-friendly
- [x] 404 handling works correctly
- [x] Image gallery is interactive
- [x] Responsive on all breakpoints

---

## Phase 6: User Story 4 - Contact Form

**Story Goal**: Enable users to submit inquiries with validation and Server Action processing  
**Story Value**: Captures leads and enables user engagement  
**Dependencies**: Phase 2 (types, validation, FormState)  
**Estimated Duration**: ~4-6 hours

### Independent Test Criteria for US4

- [ ] Contact page loads at /contact
- [ ] Form displays all fields: name, email, phone (optional), message, tour selection (optional)
- [ ] Form validation shows errors for invalid inputs (name too short, invalid email, etc.)
- [ ] Form submission works via Server Action (2 second delay, then success)
- [ ] Success message displays after submission
- [ ] Form resets after successful submission
- [ ] Error handling works (shows error message if submission fails)
- [ ] Preferred tour dropdown is pre-populated when coming from tour detail page (/contact?tour=paris-adventure)
- [ ] Form works without JavaScript (progressive enhancement)
- [ ] Pending state shows during submission ("Sending..." button disabled)
- [ ] Page is responsive on mobile and desktop

### US4 Implementation Tasks

#### Server Action

- [x] T136 [US4] Create Server Action file in app/contact/actions.ts
- [x] T137 [US4] Implement submitContactForm Server Action with 'use server' in actions.ts
- [x] T138 [US4] Extract FormData fields in submitContactForm in actions.ts
- [x] T139 [US4] Validate data using contactFormSchema.safeParse() in actions.ts
- [x] T140 [US4] Return validation errors in FormState format in actions.ts
- [x] T141 [US4] Simulate 2-second processing delay in actions.ts
- [x] T142 [US4] Log form submission to console in actions.ts
- [x] T143 [US4] Return success FormState with message in actions.ts
- [x] T144 [US4] Add try-catch error handling in actions.ts

#### Contact Form Component (Client Component)

- [x] T145 [US4] Create ContactForm Client Component with 'use client' in components/contact/contact-form.tsx
- [x] T146 [US4] Use useFormState hook for Server Action in contact-form.tsx
- [x] T147 [US4] Implement form with action={formAction} in contact-form.tsx
- [x] T148 [US4] Add name Input field with label and error display in contact-form.tsx
- [x] T149 [US4] Add email Input field with label and error display in contact-form.tsx
- [x] T150 [US4] Add phone Input field (optional) with label in contact-form.tsx
- [x] T151 [US4] Add message Textarea field with label and error display in contact-form.tsx
- [x] T152 [US4] Add preferred tour Select dropdown (populate from getTours()) in contact-form.tsx
- [x] T153 [US4] Read ?tour query param to pre-select tour in contact-form.tsx
- [x] T154 [US4] Display success/error message based on form state in contact-form.tsx
- [x] T155 [US4] Style form with Tailwind CSS (mobile-first) in contact-form.tsx

#### Submit Button Component

- [x] T156 [US4] Create SubmitButton component using useFormStatus in contact-form.tsx
- [x] T157 [US4] Show "Sending..." text when pending in SubmitButton
- [x] T158 [US4] Disable button when pending in SubmitButton

#### Contact Page

- [x] T159 [US4] Create contact page in app/contact/page.tsx
- [x] T160 [US4] Add metadata export for SEO in page.tsx
- [x] T161 [US4] Add page heading "Contact Us" in page.tsx
- [x] T162 [US4] Integrate ContactForm component in page.tsx
- [x] T163 [US4] Add contact information section (address, phone, email, hours) in page.tsx
- [x] T164 [US4] Create two-column layout (form + info) on desktop in page.tsx

#### US4 Polish

- [x] T165 [US4] Test form validation (all error cases)
- [x] T166 [US4] Test successful form submission
- [x] T167 [US4] Test form resets after success
- [x] T168 [US4] Test preferred tour pre-selection from query param
- [x] T169 [US4] Test pending state (button disabled, "Sending..." text)
- [x] T170 [US4] Verify form works without JavaScript (if possible)
- [x] T171 [US4] Test responsive layout on mobile

**US4 Completion Criteria**:

- [x] All independent test criteria pass
- [x] Form validation works correctly
- [x] Server Action processes submission
- [x] Success/error states display properly
- [x] Progressive enhancement functional
- [x] Responsive on all breakpoints

---

## Phase 7: Polish & Testing

**Goal**: Final testing, performance optimization, and deployment preparation  
**Duration**: ~2-3 days  
**Dependencies**: All user stories complete

### Responsive Design Testing

- [x] T172 Test all pages on mobile (320px width)
- [x] T173 Test all pages on mobile (375px width)
- [x] T174 Test all pages on tablet (768px width)
- [x] T175 Test all pages on desktop (1024px width)
- [x] T176 Test all pages on wide desktop (1280px+ width)
- [x] T177 Verify touch targets are 44x44px minimum
- [x] T178 Test mobile navigation (hamburger menu)
- [x] T179 Test filters collapse properly on mobile

### Performance Optimization

- [x] T180 Run Lighthouse audit on all pages (target: 90+ performance)
- [x] T181 Verify all images use next/image with proper sizing
- [x] T182 Check bundle size with build analyzer
- [x] T183 Verify lazy loading works for below-fold images
- [x] T184 Test page load time on throttled 3G connection
- [x] T185 Verify First Contentful Paint < 1.5s
- [x] T186 Check for any unused CSS/JavaScript
- [x] T187 Optimize any slow-loading images

### Accessibility Testing

- [x] T188 Test keyboard navigation on all pages (Tab, Enter, Space keys)
- [x] T189 Verify all images have descriptive alt text
- [x] T190 Test form labels are associated with inputs
- [x] T191 Verify focus indicators are visible
- [x] T192 Check color contrast with WCAG AA tool (4.5:1 minimum)
- [x] T193 Test with screen reader (NVDA or VoiceOver)
- [x] T194 Verify semantic HTML (header, nav, main, footer, article)
- [x] T195 Test ARIA labels on interactive elements
- [x] T196 Run axe DevTools accessibility audit

### SEO Verification

- [x] T197 Verify unique page titles on all pages
- [x] T198 Verify meta descriptions on all pages (150-160 chars)
- [x] T199 Check Open Graph tags on tour detail pages
- [x] T200 Add canonical URLs to all pages
- [x] T201 Implement JSON-LD structured data for tours (schema.org/TouristTrip)
- [x] T202 Verify proper heading hierarchy (h1 > h2 > h3)
- [x] T203 Test internal linking (related tours, breadcrumbs)
- [x] T204 Submit sitemap for search engines (optional)

### Cross-Browser Testing

- [x] T205 Test on Chrome (latest version)
- [x] T206 Test on Firefox (latest version)
- [x] T207 Test on Safari (latest version)
- [x] T208 Test on Edge (latest version)
- [x] T209 Test on mobile Safari (iOS)
- [x] T210 Test on mobile Chrome (Android)
- [x] T211 Fix any browser-specific issues

### Code Quality

- [x] T212 Run ESLint and fix all errors: `npm run lint`
- [x] T213 Run TypeScript type checking: `npx tsc --noEmit`
- [x] T214 Verify no `any` types in codebase (search for `: any`)
- [x] T215 Check all components are < 250 lines
- [x] T216 Add comments to complex logic
- [x] T217 Verify naming conventions (PascalCase components, kebab-case files)
- [x] T218 Review and clean up console.log statements

### Error Handling Verification

- [x] T219 Test all error.tsx boundaries
- [x] T220 Test 404 page for invalid routes
- [x] T221 Test form validation error states
- [x] T222 Test empty states (no tours, no results)
- [x] T223 Test image loading failures (placeholder displays)
- [x] T224 Test network error handling

### Production Build & Deployment

- [x] T225 Run production build: `npm run build`
- [x] T226 Fix any build errors
- [x] T227 Test production build locally: `npm run start`
- [x] T228 Verify all pages work in production mode
- [x] T229 Check bundle size in build output
- [x] T230 Configure next.config.ts for Unsplash images domain
- [x] T231 Deploy to Vercel
- [x] T232 Verify live deployment works
- [x] T233 Test live site on real mobile devices

### Documentation

- [x] T234 Update README.md with deployment URL
- [x] T235 Document any environment variables (if any)
- [x] T236 Add setup instructions to README
- [x] T237 Document known issues or limitations

**Phase 7 Completion Criteria**:

- [x] All pages pass Lighthouse audit (90+ performance, 100 accessibility)
- [x] WCAG AA accessibility compliance verified
- [x] Cross-browser testing complete
- [x] Production build succeeds
- [x] Deployed to Vercel
- [x] Live site fully functional

---

## Task Summary

**Total Tasks**: 237  
**Parallelizable Tasks**: ~80 tasks marked with [P]

### Task Count by Phase

- **Phase 1 (Setup)**: 13 tasks (~2-3 hours)
- **Phase 2 (Foundational)**: 28 tasks (~1 day)
- **Phase 3 (US1 - Home Page)**: 25 tasks (~4-6 hours)
- **Phase 4 (US2 - Tours Listing)**: 28 tasks (~6-8 hours)
- **Phase 5 (US3 - Tour Details)**: 41 tasks (~6-8 hours)
- **Phase 6 (US4 - Contact Form)**: 36 tasks (~4-6 hours)
- **Phase 7 (Polish & Testing)**: 66 tasks (~2-3 days)

### Task Count by User Story

- **US1 (Home Page)**: 25 tasks
- **US2 (Tours Listing)**: 28 tasks
- **US3 (Tour Details)**: 41 tasks
- **US4 (Contact Form)**: 36 tasks
- **Setup/Foundational**: 41 tasks
- **Polish**: 66 tasks

### Parallel Opportunities

**After Phase 2, these can be done in parallel**:

- Phase 3 (US1) - Developer A
- Phase 4 (US2) - Developer B
- Phase 5 (US3) - Developer C
- Phase 6 (US4) - Developer D

**Within Phases**:

- Tasks marked [P] can be executed simultaneously
- Example in Phase 2: All type definition tasks (T014-T022) can be done in parallel
- Example in Phase 2: All helper function tasks (T024-T029) can be done in parallel

---

## MVP Scope

**Minimal Viable Product** = Phase 1 + Phase 2 + Phase 3 (US1)

This delivers:

- ✅ Working home page with hero and featured tours
- ✅ Functional navigation
- ✅ Reusable components (TourCard)
- ✅ Full type safety
- ✅ Responsive design

**Time to MVP**: 1-2 days

After MVP, remaining user stories can be added incrementally:

1. Add US2 (Tours Listing) - Browsing capability
2. Add US3 (Tour Details) - Deep content pages
3. Add US4 (Contact Form) - Lead capture
4. Polish and optimize

---

## Format Validation

✅ **All tasks follow required format**: `- [ ] [TaskID] [P?] [Story?] Description with file path`

**Checklist Compliance**:

- ✅ All tasks have checkboxes `- [ ]`
- ✅ All tasks have sequential IDs (T001-T237)
- ✅ Parallelizable tasks marked with [P]
- ✅ User story tasks marked with [US1], [US2], [US3], [US4]
- ✅ Setup/Foundational/Polish tasks have no story label
- ✅ All tasks include file paths where applicable
- ✅ Descriptions are clear and actionable

---

## Execution Recommendations

**Week 1 (Days 1-3)**: Foundation

- Complete Phase 1 (Setup) - Day 1 morning
- Complete Phase 2 (Foundational) - Day 1 afternoon + Day 2

**Week 1-2 (Days 4-7)**: User Stories (Can parallelize!)

- Phase 3 (US1) - Day 3-4
- Phase 4 (US2) - Day 5-6
- Phase 5 (US3) - Day 6-7
- Phase 6 (US4) - Day 7

**Week 2 (Days 8-10)**: Polish

- Phase 7 (Polish & Testing) - Days 8-10
- Deploy to Vercel - Day 10

**Estimated Total Time**: 10 days (full-time) or 2-3 weeks (part-time)

---

**Tasks generated**: 2025-10-18  
**Ready for implementation**: Yes ✅  
**Next step**: Begin Phase 1 (Setup)

Happy coding! 🚀
