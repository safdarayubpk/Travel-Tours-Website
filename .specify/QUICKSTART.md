# Constitution Quick Reference

This guide provides a quick overview of the project constitution and how to use it in daily development.

## 8 Core Principles (Priority Order)

### 1. 👤 User Experience First

**Key Rule**: All pages load critical content in < 2s on 3G  
**Before Coding**: Ask "Does this improve user experience?"

### 2. 🔒 Type Safety

**Key Rule**: No `any` types allowed (strict TypeScript)  
**Before Coding**: Define all interfaces and types first

### 3. ⚡ Next.js App Router Best Practices

**Key Rule**: Server Components by default, Client Components only when needed  
**Before Coding**: Decide if component needs 'use client'

### 4. ♿ SEO & Accessibility

**Key Rule**: WCAG AA compliance + unique meta tags for every page  
**Before Coding**: Plan semantic HTML and ARIA labels

### 5. 🧩 Component Modularity

**Key Rule**: Single responsibility, < 250 lines per component  
**Before Coding**: Break complex components into smaller pieces

### 6. 🚀 Performance Optimization

**Key Rule**: Lighthouse score 90+  
**Before Coding**: Use next/image, consider dynamic imports

### 7. 📱 Responsive & Mobile-First Design

**Key Rule**: Design for 320px first, scale up  
**Before Coding**: Write mobile Tailwind classes first

### 8. ✅ Code Quality & Standards

**Key Rule**: ESLint must pass without errors  
**Before Coding**: Follow naming conventions, add comments

## Daily Developer Checklist

When starting any task:

```markdown
- [ ] Which principles does this feature address?
- [ ] Is this Server or Client Component?
- [ ] Have I defined TypeScript types?
- [ ] Is it mobile-first responsive?
- [ ] Does it meet performance targets?
- [ ] Is it accessible (WCAG AA)?
- [ ] Have I added SEO metadata?
- [ ] Does ESLint pass?
```

## Quick Decision Tree

### Should this be a Server or Client Component?

```
Does it use interactivity (onClick, useState, useEffect)?
├─ YES → Client Component ('use client')
└─ NO → Server Component (default)
    └─ Does it fetch data?
        └─ YES → Use async/await in component
```

### Should I create a new component?

```
Is this logic > 50 lines?
├─ YES → Extract to new component
└─ NO → Is it reused elsewhere?
    ├─ YES → Extract to new component in /components/ui
    └─ NO → Keep inline (but watch component size)
```

### Where should this component live?

```
Is it a generic UI element (button, card, input)?
├─ YES → /components/ui/[name].tsx
└─ NO → Is it feature-specific?
    └─ YES → /components/[feature]/[name].tsx
```

## Common Patterns

### Server Component with Data Fetching

```typescript
// app/tours/page.tsx
export default async function ToursPage() {
  const tours = await fetchTours();
  return <ToursList tours={tours} />;
}
```

### Client Component (Interactive)

```typescript
// components/booking/BookingForm.tsx
"use client";

interface BookingFormProps {
  tourId: string;
}

export function BookingForm({ tourId }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  // ... interactive logic
}
```

### Type-Safe API Response

```typescript
// types/tour.ts
export interface Tour {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface ToursResponse {
  data: Tour[];
  total: number;
}
```

### Mobile-First Responsive

```typescript
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Discover Tours
  </h1>
</div>
```

### Accessible Form

```typescript
<form>
  <label htmlFor="email" className="block text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    className="mt-1 block w-full"
  />
  <p id="email-error" className="text-red-600 text-sm">
    {error}
  </p>
</form>
```

## Pre-Commit Checklist

Before committing code:

```bash
# 1. Linting
npm run lint

# 2. Type checking
npx tsc --noEmit

# 3. Format (if using prettier)
npm run format

# 4. Test build
npm run build
```

Constitutional compliance:

- [ ] No `any` types used
- [ ] ESLint passes
- [ ] Components < 250 lines
- [ ] Mobile-responsive tested
- [ ] Accessibility tested (keyboard navigation)
- [ ] Performance checked (no console errors)

## PR Description Template

```markdown
## Feature: [Name]

### Constitutional Alignment

- Principle 1 (UX): [How it improves UX]
- Principle 2 (Modularity): [Component structure]
- Principle 3 (Next.js): [Server/Client component decisions]
- Principle 4 (Type Safety): [Types defined]
- Principle 5 (Responsive): [Mobile-first approach]
- Principle 6 (Performance): [Optimizations]
- Principle 7 (Quality): [ESLint status]
- Principle 8 (SEO/A11y): [Accessibility & SEO]

### Testing

- [ ] Manual testing complete
- [ ] Responsive design verified (320px, 768px, 1024px)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Lighthouse score 90+

### Changes

- [List of changes]
```

## Common Violations to Avoid

❌ **WRONG**

```typescript
// Using 'any' type
function handleData(data: any) { ... }

// Not mobile-first
<div className="lg:p-8 md:p-6 p-4">

// Client component for static content
'use client';
export default function StaticPage() { ... }

// Missing types
export function Component({ title, count }) { ... }
```

✅ **CORRECT**

```typescript
// Properly typed
interface Tour { id: string; name: string; }
function handleData(data: Tour) { ... }

// Mobile-first
<div className="p-4 md:p-6 lg:p-8">

// Server component (default)
export default function StaticPage() { ... }

// Typed props
interface ComponentProps {
  title: string;
  count: number;
}
export function Component({ title, count }: ComponentProps) { ... }
```

## Resources

- **Full Constitution**: `.specify/memory/constitution.md`
- **Plan Template**: `.specify/templates/plan-template.md`
- **Spec Template**: `.specify/templates/spec-template.md`
- **Tasks Template**: `.specify/templates/tasks-template.md`

## Questions?

When in doubt:

1. Check the constitution (`.specify/memory/constitution.md`)
2. Review principle priority order (User Experience First wins)
3. Look for similar patterns in existing code
4. Ask for code review

---

**Remember**: The constitution exists to ensure we build a high-quality, maintainable, user-friendly Travel & Tours platform. When principles conflict, refer to the priority order. User experience always comes first! 🎯
