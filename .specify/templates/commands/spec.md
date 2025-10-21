---
description: Create a detailed feature specification from a plan, with full technical details and constitutional compliance.
---

## User Input

```text
$ARGUMENTS
```

## Outline

You are creating a detailed technical specification. Follow these steps:

1. **Parse Input**:

   - Extract feature name from user input
   - Look for corresponding plan file in `.specify/plans/`
   - If no plan exists, create one first using plan.md command

2. **Load Templates and Constitution**:

   - Read `.specify/templates/spec-template.md`
   - Read `.specify/memory/constitution.md`
   - Read the feature plan (if exists)

3. **Create Specification**:

   - Use spec-template.md structure
   - Fill executive summary (2-3 sentences)
   - Define functional requirements (MoSCoW: Must, Should, Could)
   - Define non-functional requirements aligned with principles:
     - Performance targets (Principle 6)
     - Accessibility requirements (Principle 8)
     - SEO requirements (Principle 8)
     - Type safety requirements (Principle 4)
     - Responsive design specs (Principle 5)

4. **Technical Specification**:

   - Component architecture:
     - Identify Server Components (default)
     - Identify Client Components ('use client')
     - Show component hierarchy
   - Data model with TypeScript interfaces
   - API endpoints with full type signatures
   - State management approach
   - Error handling strategy (user-friendly per Principle 1)
   - Loading states using loading.tsx convention

5. **Styling Specification**:

   - Mobile-first Tailwind classes
   - Design tokens
   - Responsive breakpoints (320px, 768px, 1024px, 1280px)

6. **Testing Strategy**:

   - Unit tests for components
   - Integration tests for data flow
   - E2E tests for critical paths
   - Performance tests (Lighthouse 90+)
   - Accessibility tests (WCAG AA)

7. **Checklists**:

   - Complete accessibility checklist (8 items minimum)
   - Complete SEO checklist (8 items minimum)
   - Ensure all align with Principle 8

8. **Success Criteria**:

   - All P0 requirements
   - All constitutional principles satisfied
   - Performance targets met
   - Tests passing
   - Documentation complete

9. **Save Specification**:

   - Save to `.specify/specs/[feature-name]-spec.md`
   - Set status to "Draft" initially
   - Link to related plan file

10. **Output Summary**:
    - Specification location
    - Key requirements count
    - Constitutional alignment status
    - Recommended next steps (implementation, design review)

## Validation Rules

Before finalizing, verify:

- [ ] All types defined (no `any`)
- [ ] Performance targets specified
- [ ] Accessibility checklist complete
- [ ] SEO checklist complete
- [ ] Mobile-first approach documented
- [ ] Server/Client components clearly marked
- [ ] Error handling specified
- [ ] Testing strategy complete

## Quality Standards

A good specification:

- Is unambiguous and testable
- Includes all non-functional requirements
- Has clear acceptance criteria
- Defines success metrics
- Documents edge cases
- Includes rollback plan
- References constitution principles

A specification must be approved before implementation begins.
