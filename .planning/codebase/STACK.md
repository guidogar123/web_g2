# Technology Stack

**Analysis Date:** 2026-06-19

## Languages

**Primary:**
- TypeScript 5.x — All source code including React components, API routes, and build configuration
- CSS3 — Styling with Tailwind CSS v4 and shadcn/ui design tokens

**Secondary:**
- JavaScript — Build configuration files

## Runtime

**Environment:**
- Node.js (inferred from Next.js 16.2.2 requirements)
- npm — Package manager with `package-lock.json`

## Frontend Framework

**Next.js 16.2.2** (App Router)
- Server Components by default (RSC)
- Client components via explicit `'use client'` directive
- ISR (Incremental Static Regeneration) — Home page revalidates every 3600s
- Static generation — City pages use `force-static` + `dynamicParams = false`

**React 19.2.4**
- Server and client component patterns
- `useState` for local state in client components
- `useEffect` for side effects (canvas particles, scroll detection, chat widget init)
- `useRef` for canvas element references

## Styling

**Tailwind CSS v4** (`tailwindcss: ^4`, `@tailwindcss/postcss: ^4`)
- CSS-first configuration via `@import "tailwindcss"` in globals.css
- OKLCH color tokens for brand identity
- Dark theme by default (`#050505` void black background)
- Custom `@theme` block for design tokens

**shadcn/ui** (Radix Nova style)
- `components.json` configured with `style: "radix-nova"`, `rsc: true`
- UI primitives: `button`, `dialog`, `input`, `label`, `textarea`
- Uses `class-variance-authority` + `clsx` + `tailwind-merge` (`cn()` utility)
- `tw-animate-css` for animation utilities

## UI Components & Icons
- **lucide-react** ^1.7.0 — Icon library (Brain, Cpu, TrendingUp, Sparkles, etc.)
- **sonner** ^2.0.7 — Toast notifications for form feedback
- **embla-carousel-react** ^8.6.0 — Carousel component
- **date-fns** ^4.1.0 — Date formatting (used in ScheduleModal with es locale)

## Form Validation
- **Zod** ^4.3.6 — Dual validation (client + server) with `ContactSchema` and `ScheduleSchema`
- Type inference via `z.infer<>` for form data types

## Chat Integration
- **@n8n/chat** ^1.14.0 — Chat widget dynamically imported with `ssr: false`
- Dark mode theme configuration matching brand colors

## Build & Development

**Build Tooling:**
- `next build` — Production build
- `next dev` — Development server
- `next start` — Production server start
- Standalone output mode (`output: "standalone"` in next.config.ts)

**Linting:**
- ESLint ^9 with `eslint-config-next` (core-web-vitals + TypeScript configs)
- `eslint.config.mjs` using new flat config format (`defineConfig` from "eslint/config")

**TypeScript:**
- `strict: true` — Full strict mode enabled
- `target: "ES2017"`
- `moduleResolution: "bundler"`
- Path alias `@/*` → `./src/*`
- JSX: `react-jsx`

## Deployment

**Platform:** Vercel (inferred from `.vercel/` directory)
- Standalone output format
- Custom redirect: `www.g2intelligence.co` → `g2intelligence.co` (permanent 308)

**Environment Variables:**
| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` | Public | n8n chat widget webhook URL |
| `N8N_WEBHOOK_URL` | Server-only | Backend webhook proxy target |
| `FB_APP_ID` | Public | Meta/Facebook integration (in layout metadata) |

## Notable Absences
- No database (all data flows through n8n webhooks)
- No authentication system (fully public website)
- No state management library (props + useState sufficient)
- No testing framework
- No CI/CD configuration in repo
