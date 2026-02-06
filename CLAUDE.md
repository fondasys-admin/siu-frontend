# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

Next.js 16 App Router site for PT Synergis Utama Indonesia (industrial equipment supplier). React 19, TypeScript (strict), Tailwind CSS v4 (CSS-first config in globals.css, no tailwind.config.js). React Compiler enabled. shadcn/ui (New York style) for UI primitives.

### Content Pattern

All page content is JSON-driven. Data lives in `src/data/` — navigation in `global/nav.json`, products in `products/*.json`, page data in `pages/`. Import JSON directly: `import data from '@/data/products/a-series.json'`.

i18n structure supports English (`en`) and Indonesian (`id`) via nav.json. Currently defaults to English.

### Key Directories

- `src/components/layout/` — Header (with nav, mobile drawer, logo), Footer
- `src/components/ui/` — shadcn/ui primitives (button, tabs, drawer, dialog, select, etc.)
- `src/data/` — JSON content and TypeScript data exports
- `src/lib/utils.ts` — `cn()` class merge utility (clsx + tailwind-merge)
- `src/app/products/[slug]/` — Dynamic product routes

### Routing

`/` (home), `/story`, `/brands`, `/products/[slug]`, `/demo/news-carousel`, `/demo/product-grid`

## Conventions

- **Server Components by default** — only add `'use client'` for interactivity/hooks
- **Desktop-first breakpoints** — default styles are desktop (1024px+), use `max-lg:`, `md:`, `sm:` for responsive
- **File naming**: kebab-case files, PascalCase components in code
- **Function declarations** over arrow functions for components
- **Event handlers**: prefix with `handle` (handleClick, handleSubmit)
- **Path alias**: `@/*` → `./src/*`
- **Tailwind only** — no component CSS files, use utility classes
- **React Compiler** — avoid manual memoization (useMemo/useCallback)
- **Icons**: lucide-react (primary), react-icons (supplementary)

## Theme

- Primary color: `#ff5b00` (orange)
- Dark color: `#3c4043`
- CSS variables in globals.css using oklch color space
- Fonts: Roboto (400/500/700) + Roboto Mono via next/font/google
