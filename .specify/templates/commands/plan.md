---
description: Create a feature plan using the plan template, ensuring constitutional principle alignment.
---

## User Input

```text
$ARGUMENTS
```

## Outline

You are creating or updating a feature plan. Follow these steps:

1. **Parse User Input**:

   - Extract feature name and description from user input
   - Identify any specific requirements or constraints mentioned
   - Note any deadlines or priority indicators

2. **Load Plan Template**:

   - Read `.specify/templates/plan-template.md`
   - This template includes constitutional principle checkboxes

3. **Load Constitution**:

   - Read `.specify/memory/constitution.md`
   - Review all 8 core principles for this project
   - Understand principle priority order

4. **Create Plan**:

   - Use template structure from plan-template.md
   - Fill in feature information from user input
   - Write clear description and user story
   - Complete constitution alignment checklist:
     - For each principle, assess how this feature aligns
     - Check boxes that are satisfied
     - Add notes for principles that need attention
     - Flag any principle violations early

5. **Technical Planning**:

   - Define component structure following Principle 2 (Modularity)
   - Plan Server vs Client components per Principle 3 (Next.js)
   - Define TypeScript types per Principle 4 (Type Safety)
   - Plan responsive layouts per Principle 5 (Mobile-First)
   - Consider performance implications per Principle 6
   - Ensure accessibility planning per Principle 8

6. **Validation**:

   - Ensure at least 6 of 8 principles are explicitly addressed
   - Flag any principle conflicts
   - Verify all P0 requirements align with User Experience First (Principle 1)

7. **Save Plan**:

   - Save to `.specify/plans/[feature-name]-plan.md`
   - Use kebab-case for filename
   - Set status to "Draft"

8. **Output Summary**:
   - List key features planned
   - Highlight any constitutional concerns
   - Suggest next steps (spec creation, design review, etc.)

## Formatting

- Use ISO dates (YYYY-MM-DD)
- Keep line length < 100 chars for readability
- Use markdown checkboxes for trackable items
- Include code examples in appropriate language blocks

## Examples

**Good Plan Characteristics**:

- Clear user story
- All constitutional principles checked
- Specific technical approach
- Measurable success criteria
- Identified risks with mitigations

**Red Flags**:

- Missing constitution alignment
- Vague requirements
- No performance considerations
- Accessibility not mentioned
- Type safety ignored
