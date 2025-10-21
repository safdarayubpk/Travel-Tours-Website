<!--
Sync Impact Report:
Version change: none → 1.0.0
Modified principles: Initial creation
Added sections: All sections (new constitution)
Removed sections: None
Templates requiring updates:
  ✅ plan-template.md - created
  ✅ spec-template.md - created
  ✅ tasks-template.md - created
  ✅ commands/constitution.md - created
Follow-up TODOs: None
-->

# Project Constitution

## Metadata

- **Project Name**: Travel & Tours Website
- **Constitution Version**: 1.0.0
- **Ratification Date**: 2025-10-18
- **Last Amended Date**: 2025-10-18
- **Technology Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Project Type**: Travel & Tours Booking Platform

## Purpose

This constitution establishes the foundational principles and governance for the Travel & Tours website. It ensures consistent, high-quality development following Next.js best practices with a focus on simplicity, clean design, and modular architecture. All code, components, and features MUST align with these principles.

## Core Principles

### Principle 1: User Experience First

**Declaration**: Every feature and design decision MUST prioritize user experience, ensuring intuitive navigation, fast load times, and accessible interfaces.

**Rules**:

- All pages MUST load critical content within 2 seconds on 3G connections
- Navigation MUST be intuitive with clear calls-to-action
- Forms MUST provide immediate validation feedback
- All interactive elements MUST have visible hover and focus states
- Error messages MUST be user-friendly and actionable

**Rationale**: For a Travel & Tours website, user trust and engagement are paramount. Users need to quickly find destinations, view details, and complete bookings without friction.

### Principle 2: Component Modularity

**Declaration**: All UI components MUST be modular, reusable, and follow single-responsibility principles.

**Rules**:

- Each component MUST have a single, well-defined purpose
- Components MUST be located in `/components` with logical subdirectory organization
- Shared UI components MUST reside in `/components/ui`
- Feature-specific components MUST be co-located with their features
- Components MUST accept props with TypeScript interfaces
- Component files MUST NOT exceed 250 lines (extract sub-components if needed)

**Rationale**: Modular architecture ensures maintainability, testability, and enables rapid feature development. This is critical for scaling the platform with new tours, destinations, and booking features.

### Principle 3: Next.js App Router Best Practices

**Declaration**: All routing, data fetching, and rendering MUST follow Next.js 15 App Router conventions and best practices.

**Rules**:

- MUST use App Router (not Pages Router)
- Server Components MUST be the default; Client Components only when necessary
- Data fetching MUST use async/await in Server Components
- Client Components MUST be marked with 'use client' directive
- Route handlers MUST be placed in `app/api/` directories
- Layouts MUST be used for shared UI across routes
- Loading and error states MUST use loading.tsx and error.tsx conventions
- Metadata MUST be defined using generateMetadata for SEO

**Rationale**: Following App Router conventions ensures optimal performance, automatic code splitting, and server-side rendering benefits essential for SEO and user experience in travel websites.

### Principle 4: Type Safety

**Declaration**: All code MUST be type-safe using TypeScript with strict mode enabled.

**Rules**:

- TypeScript strict mode MUST be enabled
- `any` type is FORBIDDEN except in edge cases with explicit justification
- All function parameters and return types MUST be explicitly typed
- Props interfaces MUST be defined for all components
- API response types MUST be defined and validated
- Type definitions MUST be co-located or in `/types` directory

**Rationale**: Type safety prevents runtime errors, improves developer experience with autocomplete, and ensures data integrity for booking and payment flows.

### Principle 5: Responsive & Mobile-First Design

**Declaration**: All UI MUST be responsive and follow mobile-first design principles.

**Rules**:

- Designs MUST work on mobile (320px+), tablet (768px+), and desktop (1024px+)
- Tailwind CSS MUST be used for styling with mobile-first breakpoints
- Images MUST be responsive using Next.js Image component
- Touch targets MUST be minimum 44x44px for mobile
- Layouts MUST adapt gracefully to different screen sizes

**Rationale**: Over 60% of travel bookings start on mobile devices. Mobile-first ensures excellent experience on all devices.

### Principle 6: Performance Optimization

**Declaration**: All features MUST be optimized for performance and minimal bundle size.

**Rules**:

- Images MUST use Next.js Image component with proper sizing
- Dynamic imports MUST be used for heavy components
- Client-side JavaScript MUST be minimized
- Fonts MUST use next/font for optimization
- Lighthouse performance score MUST be 90+ on production builds
- Bundle analyzer MUST be run before major releases

**Rationale**: Fast loading times directly impact conversion rates. Performance is critical for SEO and user retention in competitive travel industry.

### Principle 7: Code Quality & Standards

**Declaration**: All code MUST follow consistent formatting, linting rules, and coding standards.

**Rules**:

- ESLint MUST be configured and pass without errors
- Code MUST follow Airbnb/Standard style guide conventions
- Meaningful variable and function names MUST be used
- Complex logic MUST include explanatory comments
- Magic numbers and strings MUST be replaced with named constants
- Git commits MUST follow conventional commit format

**Rationale**: Consistent code quality ensures maintainability, reduces bugs, and enables effective team collaboration.

### Principle 8: SEO & Accessibility

**Declaration**: All pages MUST be search engine optimized and accessibility compliant (WCAG 2.1 Level AA minimum).

**Rules**:

- All pages MUST have unique, descriptive titles and meta descriptions
- Semantic HTML MUST be used (header, nav, main, article, footer)
- Images MUST have descriptive alt text
- Keyboard navigation MUST be fully supported
- Color contrast MUST meet WCAG AA standards (4.5:1 for text)
- ARIA labels MUST be used where necessary
- Structured data (JSON-LD) MUST be implemented for tours and destinations

**Rationale**: SEO drives organic traffic for tour discovery. Accessibility ensures the platform is usable by everyone, expanding market reach and meeting legal requirements.

## Governance

### Amendment Process

1. Proposed changes MUST be documented in a markdown file with rationale
2. Changes MUST be reviewed against project goals and existing principles
3. Version MUST be incremented following semantic versioning:
   - MAJOR: Backward incompatible governance/principle removals or redefinitions
   - MINOR: New principle/section added or materially expanded guidance
   - PATCH: Clarifications, wording, typo fixes, non-semantic refinements
4. All dependent templates MUST be updated to maintain consistency
5. Sync Impact Report MUST be generated and prepended to constitution

### Versioning Policy

- Constitution version follows semantic versioning (MAJOR.MINOR.PATCH)
- Last Amended Date MUST be updated with each change
- Ratification Date remains unchanged from initial adoption
- Version history SHOULD be tracked in git commits

### Compliance Review

- All pull requests MUST reference relevant principles in description
- Code reviews MUST verify compliance with applicable principles
- Architecture decisions MUST document which principles they satisfy
- Principle violations MUST be flagged and resolved before merge

### Template Synchronization

The following templates MUST remain synchronized with this constitution:

- `.specify/templates/plan-template.md` - Planning and principle alignment
- `.specify/templates/spec-template.md` - Specification requirements
- `.specify/templates/tasks-template.md` - Task categorization and principles
- `.specify/templates/commands/*.md` - Command-specific guidance files

## Enforcement

Adherence to this constitution is mandatory for all project contributions. Deviations require explicit justification and must be documented. When principles conflict, the following priority order applies:

1. User Experience First
2. Type Safety
3. Next.js App Router Best Practices
4. SEO & Accessibility
5. Component Modularity
6. Performance Optimization
7. Responsive & Mobile-First Design
8. Code Quality & Standards

This prioritization ensures that user-facing quality and technical correctness take precedence while maintaining high standards across all dimensions.

---

_This constitution is a living document that evolves with the project. Regular reviews ensure it remains relevant and actionable._
