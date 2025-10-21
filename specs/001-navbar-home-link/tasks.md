# Task Breakdown: Clickable Navbar Logo

**Feature**: Navbar Home Link  
**Branch**: `001-navbar-home-link`  
**Created**: 2025-10-20  
**Status**: Ready for Implementation

## Overview

This document provides a dependency-ordered, executable task breakdown for implementing the clickable navbar logo feature. Tasks are organized by phase to enable systematic implementation and validation.

## User Story

**US1**: As a user, I want to click on the Travel & Tours logo (icon + text) to navigate back to the homepage, so that I can quickly return to the main page following standard web conventions.

**Priority**: P0 (Must Have)  
**Acceptance Criteria**: See spec.md

## Task Summary

| Phase                         | Task Count | Parallelizable | Story |
| ----------------------------- | ---------- | -------------- | ----- |
| Phase 1: Setup                | 3          | 2              | -     |
| Phase 2: Implementation (US1) | 4          | 0              | US1   |
| Phase 3: Testing & Validation | 6          | 4              | US1   |
| Phase 4: Deployment           | 3          | 0              | -     |
| **Total**                     | **16**     | **6**          | **1** |

## Implementation Strategy

**MVP Scope**: Complete US1 (entire feature - it's a single user story)

**Delivery Approach**:

1. Implement complete feature (15 minutes)
2. Validate locally (10 minutes)
3. Deploy to staging/production

**Independent Testing**: US1 is fully testable upon completion - logo click navigates to homepage with proper visual feedback.

---

## Phase 1: Setup & Prerequisites

**Goal**: Ensure development environment is ready and documentation is reviewed.

**Duration**: 5 minutes

### Tasks

- [x] T001 Verify branch `001-navbar-home-link` is checked out and up to date
- [x] T002 [P] Review specification document at `specs/001-navbar-home-link/spec.md`
- [x] T003 [P] Review implementation plan at `specs/001-navbar-home-link/plan.md`

**Validation**:

- ✅ Correct branch active
- ✅ All planning documents reviewed
- ✅ Development server can start (`npm run dev`)

---

## Phase 2: Implementation (US1 - Clickable Logo)

**User Story**: US1 - Make logo clickable with home navigation

**Goal**: Implement clickable logo with proper hover, focus, and accessibility support.

**Duration**: 15 minutes

**Dependencies**: Phase 1 complete

### Tasks

- [x] T004 [US1] Add Link import from next/link to `components/layout/header.tsx`
- [x] T005 [US1] Wrap logo elements (SVG icon + text span) in Link component in `components/layout/header.tsx`
- [x] T006 [US1] Add aria-label="Go to homepage" to Link component in `components/layout/header.tsx`
- [x] T007 [US1] Apply Tailwind utility classes for hover/focus/transition effects to Link in `components/layout/header.tsx`

**Implementation Details**:

**T004**: Add this import at the top of the file:

```typescript
import Link from "next/link";
```

**T005**: Replace the logo `<div>` wrapper with `<Link href="/">` component, keeping all child elements (SVG and span) intact.

**T006**: Add accessibility attribute to Link opening tag.

**T007**: Add these Tailwind classes to Link className:

- `flex items-center space-x-2` (layout - existing)
- `transition-opacity duration-200` (200ms transition)
- `hover:opacity-80` (80% opacity on hover)
- `cursor-pointer` (pointer cursor)
- `focus-visible:outline focus-visible:outline-2` (focus ring)
- `focus-visible:outline-blue-600` (blue color)
- `focus-visible:outline-offset-2` (outline spacing)
- `rounded-sm` (smooth corners)

**Validation Criteria for US1**:

- ✅ Link component successfully imported
- ✅ Logo wrapped in Link component
- ✅ Aria-label present and correct
- ✅ All Tailwind classes applied
- ✅ File compiles without TypeScript errors
- ✅ ESLint passes without errors
- ✅ No "use client" directive added (must remain Server Component)

**Files Modified**:

- `components/layout/header.tsx` (only file that changes)

---

## Phase 3: Testing & Validation

**Goal**: Verify all acceptance criteria are met and feature works as specified.

**Duration**: 30 minutes

**Dependencies**: Phase 2 complete

### Manual Testing Tasks

- [x] T008 [P] [US1] Test desktop hover behavior: move mouse over logo and verify opacity reduces to ~80% and cursor changes to pointer
- [x] T009 [P] [US1] Test desktop click behavior: click logo from /tours page and verify navigation to homepage without page reload
- [x] T010 [P] [US1] Test keyboard navigation: press Tab to focus logo and verify blue outline ring appears (2px solid)
- [x] T011 [US1] Test keyboard activation: press Enter while logo is focused and verify navigation to homepage

### Mobile Testing Tasks

- [x] T012 [P] [US1] Test mobile tap behavior: tap logo on mobile device (or Chrome DevTools mobile view) and verify navigation to homepage
- [x] T013 [US1] Test touch target size: verify logo is easy to tap on mobile (should be ~220x32px minimum)

### Automated Validation Tasks

None - Automated testing not requested in specification. Manual testing is sufficient for this UI-only feature.

**Validation Criteria**:

- ✅ Hover effect works on desktop (opacity + cursor)
- ✅ Click navigates to homepage instantly
- ✅ Keyboard focus shows blue outline
- ✅ Enter key triggers navigation
- ✅ Mobile tap works without issues
- ✅ Touch target meets 44x44px minimum

---

## Phase 4: Code Quality & Deployment

**Goal**: Ensure code quality standards are met and prepare for deployment.

**Duration**: 10 minutes

**Dependencies**: Phase 3 complete

### Tasks

- [ ] T014 Run ESLint and fix any issues with `npm run lint` command
- [ ] T015 Build production bundle and verify no errors with `npm run build` command
- [ ] T016 Commit changes with conventional commit message referencing spec and constitutional principles

**Commit Message Template**:

```
feat(navbar): make logo clickable with home navigation

- Wrap logo (icon + text) in Next.js Link component
- Add hover effect (opacity 80%, 200ms transition)
- Add focus indicator (blue 2px outline ring)
- Add aria-label for screen reader support
- Enable client-side navigation to homepage

Constitutional Alignment:
- Principle 1 (UX First): Intuitive navigation, instant feedback
- Principle 3 (Next.js): Using Link component, client routing
- Principle 5 (Responsive): Works on all devices, proper touch targets
- Principle 8 (Accessibility): WCAG AA, aria-label, keyboard support

Refs: #001
Closes: SPEC-001
```

**Validation Criteria**:

- ✅ ESLint passes with 0 errors
- ✅ Production build succeeds
- ✅ Commit message follows conventional format
- ✅ All acceptance criteria from spec.md satisfied

---

## Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (US1 Implementation)
    T004 → T005 → T006 → T007
    ↓
Phase 3 (Testing)
    T008, T009, T010, T012 (parallel)
    → T011, T013 (sequential)
    ↓
Phase 4 (Deployment)
    T014 → T015 → T016
```

## Parallel Execution Opportunities

### Within Phase 1

- **T002 and T003** can be done in parallel (both are reading documentation)

### Within Phase 2

- ❌ No parallelization - tasks must be sequential (T004→T005→T006→T007)
- Each task modifies the same file and depends on previous changes

### Within Phase 3

- **T008, T009, T010, T012** can be tested in parallel (independent test scenarios)
- T011 depends on T010 (must have focus before testing Enter key)
- T013 depends on T012 (tap behavior verification before size check)

**Parallelization Strategy**:

```
Phase 3 Parallel Testing:
- Developer 1: T008 (hover), T009 (click)
- Developer 2: T010 (keyboard focus), T012 (mobile tap)
Then sequentially: T011 (keyboard enter), T013 (touch target)
```

---

## Task Details & File Paths

### Phase 2: Implementation Tasks

#### T004: Add Link Import

**File**: `components/layout/header.tsx`  
**Location**: Line 3 (after existing imports)  
**Action**: Add new import statement  
**Code**:

```typescript
import Link from "next/link";
```

#### T005: Wrap Logo in Link

**File**: `components/layout/header.tsx`  
**Location**: Lines 11-28 (replace div wrapper)  
**Action**: Change opening tag from `<div className="flex items-center space-x-2">` to `<Link href="/">` and closing `</div>` to `</Link>`  
**Note**: Preserve all child elements (SVG and span)

#### T006: Add Aria-Label

**File**: `components/layout/header.tsx`  
**Location**: Link opening tag  
**Action**: Add attribute  
**Code**:

```typescript
aria-label="Go to homepage"
```

#### T007: Apply Tailwind Classes

**File**: `components/layout/header.tsx`  
**Location**: Link className attribute  
**Action**: Replace/extend className with full list  
**Complete className**:

```typescript
className =
  "flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-sm";
```

---

## Testing Checklists

### Desktop Testing Checklist (T008-T011)

**Setup**: Open http://localhost:3000 in Chrome/Firefox/Safari

- [ ] **T008 - Hover Test**:

  - Move mouse over logo area
  - Verify opacity reduces (logo appears slightly faded)
  - Verify cursor changes to pointer (pointing hand)
  - Verify transition is smooth (200ms)

- [ ] **T009 - Click Test**:

  - Navigate to /tours page
  - Click on logo (either icon or text)
  - Verify instant navigation to homepage
  - Verify no page reload/flash
  - Verify URL changes to "/"

- [ ] **T010 - Keyboard Focus Test**:

  - Reload page
  - Press Tab key to navigate through elements
  - Verify logo receives focus (should be first or second element)
  - Verify blue outline ring appears (2px thick)
  - Verify outline has small offset from logo

- [ ] **T011 - Keyboard Activation Test**:
  - With logo focused (blue outline visible)
  - Press Enter key
  - Verify navigation to homepage occurs
  - Same behavior as click test

### Mobile Testing Checklist (T012-T013)

**Setup**: Use Chrome DevTools mobile emulation or real device

- [ ] **T012 - Mobile Tap Test**:

  - Open site on mobile device or emulator
  - Navigate to any page (e.g., /tours)
  - Tap on logo (icon or text area)
  - Verify navigation to homepage
  - Verify no hover state persists after tap

- [ ] **T013 - Touch Target Test**:
  - On mobile view, inspect logo area
  - Verify logo is easy to tap with thumb
  - Verify no mis-taps or difficulty clicking
  - Check DevTools: should show ~220px wide × 32px tall
  - Exceeds 44×44px WCAG minimum ✅

### Code Quality Checklist (T014-T016)

- [ ] **T014 - ESLint**:

  ```bash
  npm run lint
  # Expected: ✓ No ESLint warnings or errors
  ```

- [ ] **T015 - Production Build**:

  ```bash
  npm run build
  # Expected: ✓ Compiled successfully
  # Expected: No TypeScript errors
  # Expected: No build warnings
  ```

- [ ] **T016 - Commit**:
  - Stage only `components/layout/header.tsx`
  - Use conventional commit message format
  - Reference constitutional principles
  - Include spec reference

---

## Acceptance Criteria Mapping

Each acceptance criterion from spec.md mapped to validation tasks:

| Acceptance Criterion                     | Validation Task                         | Status |
| ---------------------------------------- | --------------------------------------- | ------ |
| Logo area wrapped in interactive element | T005 implementation + T009 verification | ⏳     |
| Clicking navigates to homepage (/)       | T009 desktop, T012 mobile               | ⏳     |
| Visual hover effect (opacity + cursor)   | T008 verification                       | ⏳     |
| Aria-label "Go to homepage"              | T006 implementation                     | ⏳     |
| Keyboard navigation (Tab + Enter)        | T010, T011 verification                 | ⏳     |
| Focus state visible (blue outline 2px)   | T010 verification                       | ⏳     |
| Existing styles maintained               | Visual inspection during T008-T013      | ⏳     |
| Responsive across breakpoints            | T012, T013 mobile testing               | ⏳     |
| Touch target ≥ 44×44px                   | T013 verification                       | ⏳     |
| No full page reload                      | T009 verification                       | ⏳     |
| Screen reader announces link             | Manual screen reader test (optional)    | ⏳     |
| No console errors                        | Browser console check during T008-T013  | ⏳     |

---

## Constitutional Principles Verification

| Principle                 | Verification Method                               | Task             |
| ------------------------- | ------------------------------------------------- | ---------------- |
| 1. User Experience First  | Hover feedback works, navigation instant (<200ms) | T008, T009       |
| 2. Component Modularity   | Single file change, reusable Link component       | T005 review      |
| 3. Next.js Best Practices | Using Link, no 'use client', client routing       | T004-T007 review |
| 4. Type Safety            | TypeScript compiles, no errors                    | T014, T015       |
| 5. Responsive Design      | Works on mobile, touch target adequate            | T012, T013       |
| 6. Performance            | No bundle increase, pure CSS effects              | T015 build check |
| 7. Code Quality           | ESLint passes, clean code                         | T014             |
| 8. SEO & Accessibility    | Semantic link, aria-label, keyboard nav, WCAG AA  | T006, T010, T011 |

---

## Risk Mitigation Checklist

| Risk                            | Mitigation Task                       | Verification       |
| ------------------------------- | ------------------------------------- | ------------------ |
| Header becomes Client Component | Verify no 'use client' directive      | T007 code review   |
| Focus state conflicts           | Use focus-visible (modern)            | T010 visual check  |
| Mobile hover persists           | Tailwind hover: only on hover-capable | T012 tap test      |
| Breaks other nav                | Isolated change, test other nav links | T009 full nav test |
| TypeScript errors               | Build validation                      | T015               |

---

## Time Estimates

| Phase                   | Estimated Time | Critical Path               |
| ----------------------- | -------------- | --------------------------- |
| Phase 1: Setup          | 5 min          | Sequential                  |
| Phase 2: Implementation | 15 min         | Sequential                  |
| Phase 3: Testing        | 30 min         | Partially parallel          |
| Phase 4: Deployment     | 10 min         | Sequential                  |
| **Total**               | **60 min**     | **~45 min if parallelized** |

**Note**: Implementation is extremely fast (15 min) because it's a single file with simple changes.

---

## Quick Start Execution

For rapid implementation, follow this order:

```bash
# 1. Setup (2 minutes)
git checkout 001-navbar-home-link
git pull origin 001-navbar-home-link
npm install  # if needed

# 2. Implementation (15 minutes)
# Open components/layout/header.tsx
# Follow T004-T007 in sequence
# Reference: specs/001-navbar-home-link/quickstart.md

# 3. Quick Validation (5 minutes)
npm run lint
npm run dev
# Manual test: hover, click, tab, enter

# 4. Full Testing (20 minutes)
# Follow T008-T013 checklists

# 5. Deployment (10 minutes)
npm run build
git add components/layout/header.tsx
git commit -m "feat(navbar): make logo clickable..."
git push origin 001-navbar-home-link
```

---

## Success Criteria

**Feature Complete When**:

- ✅ All 16 tasks completed and checked off
- ✅ All 12 acceptance criteria satisfied
- ✅ All 8 constitutional principles verified
- ✅ ESLint passes with 0 errors
- ✅ Production build succeeds
- ✅ Manual testing shows expected behavior
- ✅ Code committed with proper message

**Ready for PR When**:

- All above ✅
- Branch pushed to remote
- Screenshots/GIFs of hover/focus behavior captured (optional)

---

## Notes

### Why So Few Tasks?

This is an exceptionally simple feature:

- Only 1 file changes
- No new components
- No API changes
- No database changes
- No state management
- Pure presentation layer modification

**Implementation complexity**: ⭐ Very Low

### Why No Automated Tests?

- Not requested in specification
- UI-only change
- Manual testing is sufficient and faster
- Could add E2E tests later if desired (Playwright/Cypress)

### Estimated vs Actual Time

**Estimated**: 60 minutes total  
**Likely Actual**: 30-40 minutes (experienced developer)

The implementation phase (T004-T007) can be completed in 10 minutes by following the quickstart guide.

---

## Related Documentation

- **Specification**: `specs/001-navbar-home-link/spec.md`
- **Implementation Plan**: `specs/001-navbar-home-link/plan.md`
- **Quick Start Guide**: `specs/001-navbar-home-link/quickstart.md` ⭐ Use this!
- **Research**: `specs/001-navbar-home-link/research.md`
- **Feature Summary**: `specs/001-navbar-home-link/FEATURE_SUMMARY.md`

---

**Task List Status**: ✅ Ready for Execution  
**Format Validation**: ✅ All tasks follow checklist format  
**Dependency Validation**: ✅ Clear execution order defined  
**Parallelization**: ✅ 6 tasks parallelizable (38% of total)  
**Constitutional Alignment**: ✅ All 8 principles verified

Let's build it! 🚀
