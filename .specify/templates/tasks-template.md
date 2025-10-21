# Task Management Template

## Overview

This template helps organize and track development tasks while ensuring alignment with project constitution principles.

## Task Categories

Tasks are categorized by principle alignment and work type to ensure comprehensive coverage of all constitutional requirements.

### Category 1: User Experience (Principle 1)

**Focus**: User-facing features and interactions

- [ ] Implement intuitive navigation
- [ ] Add loading indicators for async operations
- [ ] Create user-friendly error messages
- [ ] Add form validation with immediate feedback
- [ ] Implement hover and focus states for interactive elements
- [ ] Optimize page load times (target: < 2s on 3G)

### Category 2: Component Development (Principle 2)

**Focus**: Modular, reusable component architecture

- [ ] Create base UI components in `/components/ui`
- [ ] Implement feature-specific components
- [ ] Extract repeated patterns into shared components
- [ ] Ensure components follow single responsibility
- [ ] Keep component files under 250 lines
- [ ] Add TypeScript interfaces for all props

### Category 3: Next.js Implementation (Principle 3)

**Focus**: App Router conventions and best practices

- [ ] Implement Server Components for data fetching
- [ ] Add Client Components only where needed ('use client')
- [ ] Create loading.tsx for loading states
- [ ] Create error.tsx for error boundaries
- [ ] Implement layouts for shared UI
- [ ] Add route handlers in app/api/
- [ ] Configure metadata with generateMetadata

### Category 4: Type Safety (Principle 4)

**Focus**: TypeScript strict mode compliance

- [ ] Enable TypeScript strict mode
- [ ] Define types for all components
- [ ] Create API response type definitions
- [ ] Add prop interfaces
- [ ] Remove any usage of `any` type
- [ ] Add type validation for external data

### Category 5: Responsive Design (Principle 5)

**Focus**: Mobile-first, multi-device support

- [ ] Implement mobile-first layouts (320px+)
- [ ] Add responsive breakpoints (768px, 1024px, 1280px)
- [ ] Ensure touch targets are 44x44px minimum
- [ ] Use Next.js Image for responsive images
- [ ] Test on mobile, tablet, and desktop
- [ ] Implement flexible grid layouts

### Category 6: Performance (Principle 6)

**Focus**: Optimization and speed

- [ ] Optimize images with Next.js Image component
- [ ] Implement dynamic imports for heavy components
- [ ] Use next/font for font optimization
- [ ] Minimize client-side JavaScript
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Analyze bundle size
- [ ] Implement code splitting

### Category 7: Code Quality (Principle 7)

**Focus**: Standards and maintainability

- [ ] Configure ESLint rules
- [ ] Fix ESLint errors and warnings
- [ ] Use meaningful variable names
- [ ] Add comments for complex logic
- [ ] Replace magic numbers with constants
- [ ] Follow conventional commit format
- [ ] Conduct code reviews

### Category 8: SEO & Accessibility (Principle 8)

**Focus**: Search optimization and inclusivity

- [ ] Add unique page titles
- [ ] Write meta descriptions (150-160 chars)
- [ ] Use semantic HTML (header, nav, main, footer)
- [ ] Add alt text to all images
- [ ] Implement keyboard navigation
- [ ] Ensure color contrast meets WCAG AA (4.5:1)
- [ ] Add ARIA labels where needed
- [ ] Implement structured data (JSON-LD)
- [ ] Test with screen readers

## Task Template

### Task: [Task Name]

- **ID**: TASK-[XXX]
- **Category**: [Principle Category]
- **Priority**: [P0 - Critical | P1 - High | P2 - Medium | P3 - Low]
- **Status**: [Todo | In Progress | In Review | Blocked | Done]
- **Assignee**: [Name/Role]
- **Estimated Effort**: [Hours/Days]
- **Due Date**: [YYYY-MM-DD]

**Description**:
[Clear description of what needs to be done]

**Acceptance Criteria**:

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Constitution Alignment**:

- Principles addressed: [List principle numbers]
- Compliance verification: [How to verify principle compliance]

**Technical Details**:

```typescript
// Code examples or technical notes
```

**Dependencies**:

- Depends on: [Other task IDs]
- Blocks: [Other task IDs]

**Testing Requirements**:

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance tests
- [ ] Accessibility tests

**Notes**:
[Additional context, links, or references]

---

## Sprint Planning

### Sprint: [Sprint Name/Number]

**Duration**: [Start Date] - [End Date]

**Goals**:

1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

**Capacity**: [Team size × days × hours]

**Committed Tasks**:

#### P0 - Critical (Must Complete)

- [ ] TASK-001: [Task name] (Est: Xh) - [Assignee]
- [ ] TASK-002: [Task name] (Est: Xh) - [Assignee]

#### P1 - High (Should Complete)

- [ ] TASK-003: [Task name] (Est: Xh) - [Assignee]
- [ ] TASK-004: [Task name] (Est: Xh) - [Assignee]

#### P2 - Medium (Nice to Complete)

- [ ] TASK-005: [Task name] (Est: Xh) - [Assignee]

**Principle Coverage Check**:

- [ ] Principle 1 - User Experience: [X tasks]
- [ ] Principle 2 - Component Modularity: [X tasks]
- [ ] Principle 3 - Next.js Best Practices: [X tasks]
- [ ] Principle 4 - Type Safety: [X tasks]
- [ ] Principle 5 - Responsive Design: [X tasks]
- [ ] Principle 6 - Performance: [X tasks]
- [ ] Principle 7 - Code Quality: [X tasks]
- [ ] Principle 8 - SEO & Accessibility: [X tasks]

**Risks**:

- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]

---

## Daily Standup Template

**Date**: [YYYY-MM-DD]

**Team Member**: [Name]

**Yesterday**:

- Completed: [Tasks]
- Progress: [Partial completions]

**Today**:

- Planning to work on: [Tasks]
- Focus: [Main goal]

**Blockers**:

- [Blocker 1]
- [Blocker 2]

**Constitution Compliance Notes**:

- [Any principle violations or concerns]

---

## Task Board States

### Todo

Tasks that are defined and ready to start

### In Progress

Tasks currently being worked on (limit: 1-2 per person)

### In Review

Tasks awaiting code review or approval

### Blocked

Tasks that cannot proceed due to dependencies or issues

- MUST include blocker description and expected resolution

### Done

Tasks that are completed, reviewed, tested, and deployed

- MUST satisfy all acceptance criteria
- MUST comply with relevant constitution principles
- MUST pass all tests and linting

---

## Retrospective Template

**Sprint**: [Sprint Name/Number]
**Date**: [YYYY-MM-DD]

**What Went Well** ✅

- [Item 1]
- [Item 2]

**What Could Be Improved** 🔄

- [Item 1]
- [Item 2]

**Action Items** 🎯

- [ ] Action 1 - [Owner] - [Due Date]
- [ ] Action 2 - [Owner] - [Due Date]

**Constitution Compliance Review**:

- Principles well-followed: [List]
- Principles needing attention: [List]
- Proposed amendments: [Any constitution updates needed]

---

_All tasks must align with at least one constitutional principle. Use this template to maintain organized, principle-driven development._
