# Coding Conventions

**Analysis Date:** 2026-06-19

## TypeScript Configuration

- **Strict mode** enabled (`tsconfig.json`: `strict: true`)
- **Target:** ES2017
- **Module resolution:** `bundler`
- **Path alias:** `@/*` maps to `./src/*`
- **JSX:** `react-jsx` (automatic JSX transform)
- **No unchecked index access** — no `noUncheckedIndexedAccess` observed
- **Incremental builds** enabled

## Naming Conventions

| Pattern | Convention | Examples |
|---|---|---|
| Files (components) | PascalCase | `HomeClient.tsx`, `ChatWidget.tsx` |
| Files (pages) | kebab-case for dirs | `[ciudad]/`, `politica-privacidad/` |
| Files (lib/utils) | kebab-case | `rate-limit.ts`, `schemas.ts` |
| Components | PascalCase, default export | `export default function Hero()` |
| Interfaces/Types | PascalCase | `CityData`, `FormData`, `RateLimitEntry` |
| Functions | camelCase | `checkRateLimit`, `scrollToSection`, `cn` |
| Constants | UPPER_SNAKE_CASE | `COOLDOWN_KEY`, `BAN_KEY`, `CITIES` |
| CSS classes | Tailwind utility classes | No custom CSS class names |

## React Conventions

### Server vs Client Components
- **Server components by default** — Only add `'use client'` when needed
- **Explicit client boundary**: `'use client'` directive on every client file
- **Client boundary minimized**: `HomeClient.tsx` is the single client orchestrator
- **Server components** handle metadata, data fetching, static generation
- **City pages** are fully server-rendered (no `'use client'`)

### Component Patterns
- **Default exports** consistently used (not named exports)
- **Props interfaces** defined locally in component file (or imported from types)
- **Composition** over inheritance — sections composed in orchestrator
- **Dynamic imports** for heavy client components: `dynamic(() => import('./ChatWidget'), { ssr: false })`
- **useState** for local UI state (forms, modals, mobile menu)
- **useEffect** for side effects (scroll detection, canvas init, widget init)
- **useRef** for DOM references (canvas element)

### Form Patterns (FORM-* convention referenced in code comments)
- **FORM-01, FORM-02**: D-locked payload shapes for contact/scheduling
- **FORM-03**: Dual validation — client-side Zod + server-side Zod
- **FORM-04**: User-friendly error messages via toast + inline field errors
- **FORM-05**: API route proxy pattern — never POST directly to n8n from client
- **FORM-06**: Rate limiting + audit logging (no PII stored)

## Styling Conventions

### Tailwind CSS v4
- **CSS-first** configuration via `@import "tailwindcss"` (not JS config)
- **OKLCH color tokens** defined in `globals.css` `:root`
- **Dark theme by default** — site is always dark (`#050505` background)
- **`@theme inline`** block for custom design tokens (colors, radius, fonts)
- **`@layer base`** for global element styles
- **`@custom-variant dark`** for dark mode variant

### shadcn/ui (Radix Nova style)
- **`components.json`**: `style: "radix-nova"`, `rsc: true`
- **`cn()` utility** from `@/lib/utils.ts` for class merging
- **`class-variance-authority`** for component variant APIs
- **All UI primitives** in `@/components/ui/` directory
- **`radix-ui: ^1.4.3`** as monolithic Radix package

### Design Tokens
- **Emerald brand**: `#10b981` / `oklch(0.64 0.157 162)` — primary, accent, ring
- **Background**: `#050505` / `oklch(0.02 0 0)` — void black
- **Cards/Surfaces**: `#0d1117` / `oklch(0.09 0.008 264)` — deep slate
- **Borders**: `white/5` to `white/10` opacity
- **Border radius**: `0.625rem` base with scale multipliers

## File Organization

- **Components** by domain: `sections/` (page sections), `ui/` (primitives), root (widgets/orchestrators)
- **Pages** by route structure in `app/` directory
- **Shared logic** in `lib/`
- **UI primitives** isolated in `ui/` — easily swappable via shadcn/ui
- **Each component** is a single file with default export

## Import Patterns

- **`@/` alias** for all internal imports: `@/components/ui/button`, `@/lib/schemas`
- **Type imports** use `import type { ... }` syntax
- **Lucide icons** imported individually: `import { Mail, Phone } from 'lucide-react'`
- **CSS imports**: `import './globals.css'` in layout, `import '@n8n/chat/style.css'` in ChatWidget

## Edge Cases & Gotchas

1. **`headers()` is async in Next.js 16** — Must `await headers()` in API routes (documented in code comments)
2. **Next.js 16 has breaking changes** — `AGENTS.md` warns agents to check `node_modules/next/dist/docs/`
3. **`setInterval` guard** — Rate limiter cleanup checks `typeof setInterval !== 'undefined'` for SSR safety
4. **City pages inline HTML** — Don't use shared section components; each city page is self-contained
5. **Server-only env vars** — `N8N_WEBHOOK_URL` is never prefixed with `NEXT_PUBLIC_` to keep it server-only

## Code Comments Style

- **Section headers** using `{/* Hero */}`, `{/* Services */}` style for JSX organization
- **Reference conventions** inline: `(per FORM-03, FORM-04)`, `(per FORM-05)`
- **Implementation notes** for intentional decisions: `// Extract client IP for rate limiting (per FORM-06)`
- **Minimal inline comments** — code is generally self-documenting
