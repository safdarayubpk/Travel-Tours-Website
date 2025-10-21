# Quickstart: Implementing Clickable Navbar Logo

**Feature**: Navbar Home Link  
**Estimated Time**: 15 minutes  
**Difficulty**: Easy ⭐

## Prerequisites

- ✅ Branch `001-navbar-home-link` checked out
- ✅ Specification reviewed (`spec.md`)
- ✅ Plan reviewed (`plan.md`)
- ✅ Next.js 15+ project with Tailwind CSS

## Quick Summary

Make the Travel & Tours logo in the navbar clickable to navigate home with proper hover, focus, and accessibility support.

**Single File Change**: `components/layout/header.tsx`

## Step-by-Step Implementation

### Step 1: Open the Header Component

```bash
# Open the file
code components/layout/header.tsx
```

### Step 2: Add Link Import

**Add this line at the top of the file** (after existing imports):

```typescript
import Link from "next/link";
```

**Current imports section**:

```typescript
// Header component for Travel & Tours website

import { Navigation } from "./navigation";
```

**Updated imports section**:

```typescript
// Header component for Travel & Tours website

import Link from "next/link";
import { Navigation } from "./navigation";
```

### Step 3: Wrap Logo in Link Component

**Find this code** (lines 11-28):

```typescript
<div className="flex items-center space-x-2">
  <svg
    className="h-8 w-8 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span className="text-xl font-bold text-gray-900">
    Travel & Tours
  </span>
</div>
```

**Replace with**:

```typescript
<Link
  href="/"
  aria-label="Go to homepage"
  className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm"
>
  <svg
    className="h-8 w-8 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span className="text-xl font-bold text-gray-900">
    Travel & Tours
  </span>
</Link>
```

### Step 4: Save and Verify

```bash
# Save the file (Ctrl+S / Cmd+S)

# Run linter to check for errors
npm run lint

# Start dev server if not already running
npm run dev
```

## Complete File Preview

Here's what the complete `components/layout/header.tsx` should look like after changes:

```typescript
// Header component for Travel & Tours website

import Link from "next/link";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm"
          >
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900">
              Travel & Tours
            </span>
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}
```

## Quick Testing Checklist

After implementing, test these behaviors:

### Desktop Testing (5 min)

- [ ] **Hover**: Move mouse over logo → opacity reduces, cursor becomes pointer
- [ ] **Click**: Click logo from any page → navigates to homepage instantly
- [ ] **Keyboard**: Press Tab → logo gets blue outline focus ring
- [ ] **Keyboard**: Press Enter while focused → navigates to homepage

### Mobile Testing (3 min)

- [ ] **Tap**: Tap logo → navigates to homepage
- [ ] **Touch Target**: Logo is easy to tap (not too small)

### Accessibility Testing (2 min)

- [ ] **Screen Reader**: Logo announces as "Go to homepage, link"
- [ ] **Focus Visible**: Blue outline appears only on keyboard focus (not on click)

## What Each Class Does

Quick reference for the Tailwind classes added:

| Class                            | Effect                         | Why                       |
| -------------------------------- | ------------------------------ | ------------------------- |
| `transition-opacity`             | Enable smooth opacity changes  | Makes hover feel polished |
| `duration-200`                   | 200ms transition time          | Fast but visible          |
| `hover:opacity-80`               | Reduce opacity to 80% on hover | Visual feedback           |
| `cursor-pointer`                 | Change cursor to pointer hand  | Indicates clickability    |
| `focus-visible:outline`          | Show outline on keyboard focus | Accessibility             |
| `focus-visible:outline-2`        | 2px outline thickness          | Clear visibility          |
| `focus-visible:outline-blue-600` | Blue color for outline         | Matches brand             |
| `focus-visible:outline-offset-2` | 2px space around outline       | Cleaner look              |
| `rounded-sm`                     | Slight corner rounding         | Smooth outline            |

## Common Issues & Fixes

### Issue: TypeScript Error "Cannot find module 'next/link'"

**Fix**: Next.js is already installed, just restart TypeScript server:

```bash
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Hover effect doesn't work

**Check**: Make sure you're testing on a device with a mouse/trackpad. Hover effects don't apply on touch devices (this is correct behavior).

### Issue: Focus outline doesn't appear

**Check**: Use keyboard (Tab key), not mouse clicks. The `focus-visible` class only shows on keyboard navigation, not mouse clicks (this is correct behavior).

### Issue: ESLint errors

**Fix**: Run auto-fix:

```bash
npm run lint -- --fix
```

## Performance Verification

After implementation, verify no performance regression:

```bash
# Build production bundle
npm run build

# Check bundle size
npm run analyze  # If available

# Or use Lighthouse
# Open http://localhost:3000 in Chrome
# DevTools → Lighthouse → Run audit
# Verify Performance score 90+
```

## Accessibility Verification

Quick accessibility checks:

```bash
# 1. Automated testing with axe DevTools (Chrome extension)
#    - Install: https://chrome.google.com/webstore (search "axe DevTools")
#    - Open site → DevTools → axe DevTools tab → Scan
#    - Verify 0 violations

# 2. Screen reader testing
#    macOS: Enable VoiceOver (Cmd+F5)
#    Windows: Enable Narrator (Win+Ctrl+Enter)
#    - Tab to logo → Listen for "Go to homepage, link"

# 3. Keyboard navigation
#    - Tab to logo (should see blue outline)
#    - Press Enter (should navigate to homepage)
```

## Commit Message

Once implemented and tested, use this conventional commit message:

```bash
git add components/layout/header.tsx
git commit -m "feat(navbar): make logo clickable with home navigation

- Wrap logo (icon + text) in Next.js Link component
- Add hover effect (opacity 80%, 200ms transition)
- Add focus indicator (blue 2px outline ring)
- Add aria-label for screen reader support
- Enable client-side navigation to homepage

Refs: #001 (navbar-home-link)
Closes: SPEC-001"
```

## Next Steps

After implementation:

1. ✅ **Push branch**: `git push origin 001-navbar-home-link`
2. ✅ **Create PR**: Reference spec and plan documents
3. ✅ **Request review**: Tag reviewer familiar with accessibility
4. ✅ **Run CI/CD**: Ensure all automated tests pass
5. ✅ **Deploy to staging**: Test on real devices
6. ✅ **Get approval**: Merge to main

## Documentation

Related files for reference:

- **Specification**: `specs/001-navbar-home-link/spec.md`
- **Implementation Plan**: `specs/001-navbar-home-link/plan.md`
- **Research**: `specs/001-navbar-home-link/research.md`
- **Data Model**: `specs/001-navbar-home-link/data-model.md` (N/A for this feature)

## Constitutional Principles Satisfied

This implementation satisfies:

- ✅ **Principle 1 (User Experience First)**: Intuitive navigation, instant feedback
- ✅ **Principle 2 (Component Modularity)**: Single responsibility, reusable Link
- ✅ **Principle 3 (Next.js Best Practices)**: Using Link component, client-side routing
- ✅ **Principle 4 (Type Safety)**: TypeScript enforces prop types
- ✅ **Principle 5 (Responsive Design)**: Works on all devices, proper touch targets
- ✅ **Principle 6 (Performance)**: Zero JS overhead, pure CSS transitions
- ✅ **Principle 7 (Code Quality)**: ESLint compliant, clean code
- ✅ **Principle 8 (SEO & Accessibility)**: WCAG AA, semantic HTML, screen reader support

## Questions?

If you encounter issues:

1. Check the full plan: `specs/001-navbar-home-link/plan.md`
2. Review research findings: `specs/001-navbar-home-link/research.md`
3. Verify specification: `specs/001-navbar-home-link/spec.md`
4. Consult project constitution: `.specify/memory/constitution.md`

---

**Estimated Total Time**: 15 minutes  
**Complexity**: Low ⭐  
**Risk**: Very Low  
**Impact**: High (improves UX for all users)

Happy coding! 🚀
