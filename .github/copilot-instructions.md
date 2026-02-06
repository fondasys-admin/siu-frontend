# Great Dynamic Web Frontend - Copilot Instructions

## Project Overview
Industrial equipment supplier website for PT Great Dynamic Indonesia. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Content is JSON-driven with i18n support (English/Indonesian).

## Architecture & Data Flow

### Content Management Pattern
- **All page content** lives in `/src/data/{locale}/*.json` files
- Each page has its own JSON file: `home-data.json`, `story-data.json`, `service-data.json`, `contact-data.json`
- Navigation structure in `/src/data/nav.json`
- Import JSON directly via `import data from '@/data/en/home-data.json'` (TypeScript resolves JSON automatically via `resolveJsonModule`)
- i18n structure: `/src/data/en/` for English, `/src/data/id/` for Indonesian (to be implemented)

### Page Structure Pattern
Every page follows this template:
```typescript
import data from '@/data/en/page-name-data.json'

export default function Page() {
  return (
    <>
      <HeroSection data={data.hero} />
      <SectionComponent data={data.sectionName} />
      {/* More sections */}
    </>
  )
}
```

### Design System Decisions

**Breakpoint Strategy**: Desktop-first with mobile breakpoints
- Default styles = desktop (1024px+)
- Use `lg:` prefix for desktop styles
- Use `max-lg:`, `md:`, `sm:` for responsive adjustments
- Rationale: Target audience is B2B industrial companies viewing on desktops

**Tailwind CSS v4 (CSS-first Configuration)**
- No `tailwind.config.js` - configuration via CSS `@theme inline` blocks in `globals.css`
- CSS variables defined in `:root` for theming: `--background`, `--foreground`
- Import Tailwind via `@import "tailwindcss"` at top of CSS
- Dark mode via `prefers-color-scheme` media query

**Component Library & Design System**
- Use **shadcn/ui** for building reusable UI components
- Componentize common design patterns (buttons, cards, forms, dialogs, etc.)
- Components live in `/src/components/ui/` following shadcn conventions
- Prefer composition over custom implementations for common UI patterns
- Rationale: Ensures consistency, accessibility, and maintainability across the application

**Fonts**: Roborto loaded via `next/font/google`

## Technology Stack

### Core Dependencies
- **Next.js 16.1.1** with React 19.2.3
- **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`)
- **TypeScript** with strict mode
- **Tailwind CSS v4** via `@tailwindcss/postcss`

### Conventions
- **File naming**: kebab-case (`product-partners.tsx`, not `ProductPartners.tsx`)
- **Component naming**: PascalCase in code (`function ProductPartners() {}`)
- **Path alias**: `@/*` maps to `./src/*`
- **Event handlers**: Prefix with `handle` (`handleClick`, `handleSubmit`)
- **Function style**: Use `function` declarations over `const` arrow functions

### Component Organization
```
src/
├── components/
│   ├── layout/           # Header, Footer, Navigation
│   ├── ui/               # Shared UI primitives (Button, Card, Input)
│   ├── sections/         # Page-specific sections (HeroSection, FeaturesSection)
│   └── home/             # Home page components
├── lib/
│   ├── utils.ts          # cn() utility, helpers
│   └── data.ts           # Data loading utilities
├── types/
│   └── data.ts           # TypeScript types for JSON structures
└── app/
    ├── page.tsx          # Home page
    ├── about/page.tsx    # About page
    ├── partners/page.tsx # Partners page
    ├── contact/page.tsx  # Contact page
    └── api/contact/route.ts  # Contact form API
```

## Key Patterns

### Server Components by Default
All components are Server Components unless client interactivity is needed. Use `'use client'` directive for:
- Form inputs with state
- Interactive carousels/animations
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)

### Image Placeholders
Use `https://placehold.co/{width}x{height}` for all images until real assets are provided.

### Infinite Carousel Pattern
Client logos carousel auto-scrolls infinitely using CSS animations:
```typescript
'use client'
// Duplicate items for seamless loop
// Use CSS keyframe animation with transform: translateX()
```

### Statistics Display
Reusable pattern across multiple pages (home, about, partners):
```typescript
<StatisticsGrid data={[
  { value: "10,000+", label: "Products in Stock" },
  { value: "98%", label: "Customer Satisfaction" }
]} />
```

## Development Workflow

### Commands
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server

### Adding New Pages
1. Create JSON data file in `/src/data/en/page-name-data.json`
2. Define TypeScript types in `/src/types/data.ts`
3. Create page in `/src/app/page-name/page.tsx`
4. Build section components in `/src/components/sections/`
5. Add route to navigation in `/src/data/nav.json`

### Contact Form Flow
1. Client form in `contact/page.tsx` submits to `/api/contact`
2. Server Action in `/api/contact/route.ts` handles validation
3. Form fields defined in `contact-data.json` with validation rules
4. Success/error messages from JSON data

## Critical Details

- **No CSS files for components** - Use Tailwind utility classes only
- **Accessibility**: Include `aria-label`, `tabIndex`, keyboard event handlers
- **Icons**: Use Lucide React (`lucide-react` package)
- **Type safety**: All JSON data structures must have TypeScript types
- **Mobile-first classes avoided**: Start with desktop, add mobile overrides
- **React Compiler**: Avoid manual memoization - compiler handles it

## Example: Creating a New Section Component

```typescript
// src/types/data.ts
export interface FeatureItem {
  id: string
  icon: string
  title: string
  description: string
}

// src/components/sections/features-section.tsx
import { FeatureItem } from '@/types/data'
import { Icon } from '@/components/ui/icon'

interface FeaturesSectionProps {
  data: {
    title: string
    items: FeatureItem[]
  }
}

export function FeaturesSection({ data }: FeaturesSectionProps) {
  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16">{data.title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data.items.map((item) => (
          <div key={item.id} className="p-6 rounded-lg bg-gray-50">
            <Icon name={item.icon} className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

*Last updated: 2026-01-14*
