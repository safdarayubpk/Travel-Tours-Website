# Travel & Tours Website

A modern, clean Travel & Tours demonstration website built with Next.js 15, React 19, and TypeScript. This project showcases international tours with filtering, detailed tour pages, and a contact form. Built following strict architectural principles defined in the project constitution.

## ✨ Live Demo Features

- 🏠 **Home Page** - Hero section with 6 featured tours
- 🗺️ **Tours Listing** - Browse all 15 tours with filters (region, price, duration)
- 📄 **Tour Details** - Individual pages for each tour with image galleries
- 📧 **Contact Form** - Server Action-powered form with validation and email delivery via Resend

## 🌍 Available Tours

- **Europe** (4 tours): Paris, Italy, Greece, London
- **Asia** (4 tours): Tokyo, Bali, Thailand, Dubai
- **Americas** (4 tours): New York, Machu Picchu, Cancun, Canadian Rockies
- **Africa** (3 tours): Kenya Safari, Morocco, South Africa

## 🏛️ Project Governance

This project is governed by a constitution that defines 8 core principles guiding all development:

1. **User Experience First** - Prioritizing intuitive, fast, and accessible interfaces
2. **Component Modularity** - Reusable, single-responsibility components
3. **Next.js App Router Best Practices** - Following official conventions and patterns
4. **Type Safety** - Strict TypeScript with no `any` types
5. **Responsive & Mobile-First Design** - Supporting all device sizes from 320px+
6. **Performance Optimization** - Lighthouse score 90+, < 2s load times
7. **Code Quality & Standards** - Consistent formatting and linting
8. **SEO & Accessibility** - WCAG AA compliance and search optimization

📖 Read the full constitution: [`.specify/memory/constitution.md`](.specify/memory/constitution.md)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables (required for contact form)
cp .env.example .env.local
# Edit .env.local and add your Resend API key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

The contact form requires a Resend API key for email delivery:

```bash
# Required for contact form email delivery
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

**Setup Steps**:

1. Sign up at [Resend](https://resend.com) (free tier: 100 emails/day)
2. Create an API key at [https://resend.com/api-keys](https://resend.com/api-keys)
3. Copy `.env.example` to `.env.local`
4. Add your API key to `.env.local`
5. Restart the development server

See [`.env.example`](.env.example) for detailed configuration instructions.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📁 Project Structure

```
travel_tours/
├── app/                      # Next.js App Router pages and layouts
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── api/                 # API routes
├── components/              # React components
│   └── ui/                  # Shared UI components (buttons, cards, etc.)
├── lib/                     # Utility functions and shared code
├── public/                  # Static assets
├── .specify/                # Project governance and templates
│   ├── memory/
│   │   └── constitution.md  # Project constitution (v1.0.0)
│   ├── templates/           # Feature planning templates
│   │   ├── plan-template.md
│   │   ├── spec-template.md
│   │   ├── tasks-template.md
│   │   └── commands/        # Command templates
│   ├── plans/               # Feature plans
│   └── specs/               # Technical specifications
└── package.json
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.14
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Email**: Resend API for contact form delivery
- **Linting**: ESLint 9 with Next.js config

## 📋 Development Workflow

### Planning a New Feature

1. Create a feature plan using `.specify/templates/plan-template.md`
2. Review against all 8 constitutional principles
3. Get plan approved
4. Create detailed spec using `.specify/templates/spec-template.md`
5. Implement following Next.js best practices
6. Test (unit, integration, E2E, accessibility, performance)
7. Code review for constitutional compliance
8. Deploy

### Constitutional Compliance

All pull requests must:

- Reference relevant constitutional principles
- Pass ESLint without errors
- Include TypeScript types (no `any`)
- Meet performance targets (Lighthouse 90+)
- Pass accessibility checks (WCAG AA)
- Include responsive design (mobile-first)
- Have proper documentation

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)
- Ensure 4.5:1 color contrast ratio
- Touch targets minimum 44x44px

## ♿ Accessibility

- WCAG 2.1 Level AA compliance required
- Semantic HTML elements
- Keyboard navigation support
- Screen reader compatible
- ARIA labels where appropriate
- Alt text on all images

## ⚡ Performance Standards

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Performance Score 90+
- Page load time < 2s on 3G
- Optimized images using next/image
- Code splitting and dynamic imports

## 🔍 SEO

- Unique meta titles and descriptions
- Open Graph tags
- Structured data (JSON-LD)
- Semantic HTML
- Mobile-friendly
- Fast Core Web Vitals

## 🧪 Testing

### Automated Testing

```bash
# Run automated page tests (24 tests)
./test-pages.sh

# Quick accessibility check (6 checks)
./check-accessibility.sh

# Lighthouse performance audit (all pages)
./run-lighthouse.sh

# Linting
npm run lint

# TypeScript check
npx tsc --noEmit
```

### Manual Testing

```bash
# Open comprehensive testing guide
code TESTING_CHECKLIST.md

# Open responsive testing guide
code RESPONSIVE_TESTING_GUIDE.md

# View testing summary
code PHASE2_TESTING_SUMMARY.md
```

**Test Coverage**:

- ✅ 24 automated page load tests
- ✅ 6 automated accessibility checks
- ✅ 56 manual test cases documented
- ✅ Responsive testing guide (8 devices)
- ✅ Cross-browser testing checklist

**Current Test Results**:

- ✅ All 24 automated tests: **PASSED**
- ✅ Accessibility checks: **PASSED**
- ✅ ESLint: **0 errors**
- ✅ TypeScript: **0 errors**

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial
- [Next.js GitHub](https://github.com/vercel/next.js)

### Project Resources

- [Constitution](.specify/memory/constitution.md) - Project principles and governance
- [Plan Template](.specify/templates/plan-template.md) - Feature planning
- [Spec Template](.specify/templates/spec-template.md) - Technical specifications

## 🚢 Deployment

The easiest deployment option is [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other options.

## 📄 License

Private project - All rights reserved

## 🤝 Contributing

All contributions must adhere to the project constitution. Please:

1. Read the constitution (`.specify/memory/constitution.md`)
2. Create a feature plan following the template
3. Get plan approved
4. Follow Next.js and TypeScript best practices
5. Ensure all tests pass
6. Submit PR with constitutional principle references

---

**Current Version**: 0.1.0  
**Constitution Version**: 1.0.0  
**Last Updated**: 2025-10-18
