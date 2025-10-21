# .specify Directory

This directory contains the project's governance framework, development templates, and planning artifacts.

## Directory Structure

```
.specify/
├── README.md                    # This file
├── QUICKSTART.md               # Quick reference guide for developers
├── memory/
│   └── constitution.md         # Project constitution (v1.0.0)
├── templates/
│   ├── plan-template.md        # Feature planning template
│   ├── spec-template.md        # Technical specification template
│   ├── tasks-template.md       # Task management template
│   └── commands/               # Command-specific templates
│       ├── constitution.md     # Constitution update command
│       ├── plan.md             # Plan creation command
│       └── spec.md             # Spec creation command
├── plans/                      # Feature plans (created as needed)
└── specs/                      # Technical specifications (created as needed)
```

## Key Documents

### Constitution (v1.0.0)

**Location**: `memory/constitution.md`  
**Purpose**: Defines 8 core principles governing all development  
**Status**: Ratified 2025-10-18

The constitution establishes:

1. User Experience First
2. Component Modularity
3. Next.js App Router Best Practices
4. Type Safety
5. Responsive & Mobile-First Design
6. Performance Optimization
7. Code Quality & Standards
8. SEO & Accessibility

### Quick Reference

**Location**: `QUICKSTART.md`  
**Purpose**: Developer-friendly quick reference for daily use  
**Audience**: All developers

### Templates

#### Plan Template

**Location**: `templates/plan-template.md`  
**Use**: Creating feature plans with constitutional alignment  
**Process**: Copy template → Fill details → Save to `plans/[feature-name]-plan.md`

#### Spec Template

**Location**: `templates/spec-template.md`  
**Use**: Creating detailed technical specifications  
**Process**: Copy template → Fill details → Save to `specs/[feature-name]-spec.md`

#### Tasks Template

**Location**: `templates/tasks-template.md`  
**Use**: Organizing development tasks by principle category  
**Process**: Copy template → Customize for sprint/feature

## Workflow

### Planning a New Feature

1. **Create Plan** (Draft stage)

   ```bash
   # Copy template
   cp .specify/templates/plan-template.md .specify/plans/booking-system-plan.md

   # Fill in details, check constitutional alignment
   # Review with team
   ```

2. **Create Specification** (Detail stage)

   ```bash
   # Copy template
   cp .specify/templates/spec-template.md .specify/specs/booking-system-spec.md

   # Fill technical details
   # Define types, components, APIs
   # Complete checklists
   ```

3. **Create Tasks** (Execution stage)

   ```bash
   # Use tasks template to break down work
   # Organize by constitutional principle
   # Assign and track in project management tool
   ```

4. **Implement & Review**
   - Code against specification
   - Verify constitutional compliance
   - Test thoroughly
   - Submit PR with principle references

### Amending the Constitution

See `templates/commands/constitution.md` for full process.

Quick overview:

1. Propose changes with rationale
2. Review against project goals
3. Update version (semantic versioning)
4. Update dependent templates
5. Generate Sync Impact Report
6. Commit with description

## Version History

### Constitution v1.0.0 (2025-10-18)

- Initial ratification
- 8 core principles established
- Governance framework defined
- Templates created and synchronized

## Guidelines

### File Naming Conventions

- **Plans**: `[feature-name]-plan.md` (kebab-case)
- **Specs**: `[feature-name]-spec.md` (kebab-case)
- **Tasks**: `[sprint-name]-tasks.md` or `[feature-name]-tasks.md`

### Status Values

- **Draft**: Work in progress, not approved
- **In Review**: Under team review
- **Approved**: Ready for implementation
- **In Development**: Being implemented
- **Complete**: Finished and deployed
- **Archived**: Historical reference only

### Markdown Formatting

- Use ATX-style headers (`#`, `##`, `###`)
- Line length < 100 characters for readability
- Single blank line between sections
- Code blocks with language identifiers
- Checklists for trackable items (`- [ ]`)

## Tools & Commands

### Validation

```bash
# Check TypeScript
npx tsc --noEmit

# Run linter
npm run lint

# Build check
npm run build

# Performance audit
npx lighthouse http://localhost:3000
```

### Constitutional Compliance Check

Before submitting PR, verify:

- [ ] No `any` types (Principle 4)
- [ ] ESLint passes (Principle 7)
- [ ] Components < 250 lines (Principle 2)
- [ ] Mobile-responsive (Principle 5)
- [ ] Lighthouse 90+ (Principle 6)
- [ ] WCAG AA accessible (Principle 8)
- [ ] Semantic HTML (Principle 8)
- [ ] User-friendly (Principle 1)

## Maintenance

### Regular Reviews

**Monthly**:

- Review constitution relevance
- Update quick reference if patterns change
- Archive outdated plans/specs

**Quarterly**:

- Constitutional amendment review
- Template effectiveness evaluation
- Principle compliance audit

**As Needed**:

- Add new command templates
- Update examples in templates
- Refine checklists based on learnings

### Template Updates

When updating templates:

1. Update the template file
2. Document changes in template
3. Update this README if structure changes
4. Notify team of template updates
5. Update any active plans/specs using old format

## FAQ

**Q: Do I need to use these templates for every feature?**  
A: Yes, for any non-trivial feature (3+ components or > 1 day work). Simple bug fixes or minor tweaks don't require formal planning.

**Q: What if a principle conflicts with another?**  
A: Use the priority order in the constitution. User Experience First (Principle 1) takes precedence.

**Q: Can I propose changes to the constitution?**  
A: Yes! Follow the amendment process in `templates/commands/constitution.md`. Changes must be justified and reviewed.

**Q: Where do completed plans/specs go?**  
A: They remain in `plans/` and `specs/` directories as historical records. Update status to "Complete" or "Archived".

**Q: How do I know which principles apply to my feature?**  
A: Review the constitution alignment checklist in the plan template. Most features touch multiple principles.

## Support

- **Constitution**: `.specify/memory/constitution.md`
- **Quick Guide**: `.specify/QUICKSTART.md`
- **Project README**: `../README.md`

---

**Remember**: This governance framework exists to ensure we build a high-quality, maintainable Travel & Tours platform. Use it as a guide, not a burden. When in doubt, prioritize user experience and code quality.

**Current Version**: 1.0.0  
**Last Updated**: 2025-10-18
