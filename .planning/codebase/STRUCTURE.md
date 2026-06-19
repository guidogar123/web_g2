# Project Structure

**Analysis Date:** 2026-06-19

```
sitio-g2-nextjs/
├── src/
│   ├── app/                          # Next.js App Router pages & API
│   │   ├── layout.tsx                # Root layout: fonts, JSON-LD, Toaster, metadata
│   │   ├── page.tsx                  # Home page (ISR, server → HomeClient)
│   │   ├── globals.css               # Tailwind v4 config, OKLCH tokens, shadcn/ui
│   │   ├── sitemap.ts                # Dynamic sitemap: 1 home + 15 cities
│   │   ├── robots.ts                 # Robots.txt config
│   │   │
│   │   ├── [ciudad]/                 # Dynamic city SEO pages
│   │   │   ├── page.tsx              # City landing (force-static, 15 cities)
│   │   │   └── cities.ts             # City data: slug, name, dept, geo coords
│   │   │
│   │   ├── productos/
│   │   │   └── nexo_crm/
│   │   │       └── page.tsx          # Nexo CRM product landing (517 lines)
│   │   │
│   │   ├── politica-privacidad/
│   │   │   └── page.tsx              # Privacy policy (344 lines)
│   │   │
│   │   └── api/
│   │       └── webhook/
│   │           └── n8n/
│   │               ├── contact/
│   │               │   └── route.ts  # Contact form → n8n proxy (85 lines)
│   │               └── schedule/
│   │                   └── route.ts  # Schedule form → n8n proxy (86 lines)
│   │
│   ├── components/
│   │   ├── HomeClient.tsx            # Home page orchestrator ('use client')
│   │   ├── Navigation.tsx            # Sticky nav with scroll + mobile menu
│   │   ├── ChatWidget.tsx            # @n8n/chat initialization
│   │   ├── ChatWidgetWrapper.tsx      # Dynamic import wrapper (ssr: false)
│   │   ├── ScheduleModal.tsx         # Scheduling dialog with date/time picker
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Hero with stats, CTAs, particle canvas
│   │   │   ├── HeroCanvas.tsx        # Particle animation system ('use client')
│   │   │   ├── Servicios.tsx         # Services section
│   │   │   ├── Nosotros.tsx          # About/company section
│   │   │   ├── Equipo.tsx            # Team section
│   │   │   ├── Contacto.tsx          # Contact form + info + social links
│   │   │   └── Footer.tsx            # Site footer
│   │   │
│   │   └── ui/                       # shadcn/ui primitives (Radix Nova style)
│   │       ├── button.tsx            # Button with variants
│   │       ├── dialog.tsx            # Modal dialog (Radix)
│   │       ├── input.tsx             # Text input
│   │       ├── label.tsx             # Form label
│   │       └── textarea.tsx          # Textarea input
│   │
│   └── lib/
│       ├── schemas.ts                # Zod schemas: ContactSchema, ScheduleSchema
│       ├── rate-limit.ts             # In-memory rate limiter (Map-based)
│       └── utils.ts                  # cn() utility (clsx + tailwind-merge)
│
├── public/                           # Static assets directory
│   └── (opengraph-image.png, etc.)
│
├── .env.local                        # Local env vars (git-ignored)
├── .env.local.example                # Env var template
├── .gitignore
├── AGENTS.md                         # Next.js version warning for AI agents
├── CLAUDE.md                         # Points to AGENTS.md
├── README.md
├── components.json                   # shadcn/ui configuration
├── eslint.config.mjs                 # ESLint flat config (next/core-web-vitals + TS)
├── next.config.ts                    # Next.js config: standalone output, www redirect
├── next-env.d.ts                     # Next.js TypeScript declarations
├── package.json
├── package-lock.json
├── postcss.config.mjs                # PostCSS config (Tailwind)
├── tsconfig.json                     # TypeScript strict mode config
├── tsconfig.tsbuildinfo              # TypeScript incremental build info
│
├── node_modules/                     # Dependencies (git-ignored)
├── .next/                            # Next.js build output (git-ignored)
└── .vercel/                          # Vercel deployment config (git-ignored)

═══ Root-level sibling directories ═══

├── sitio-g2/                         # Legacy Vite + React SPA (old version)
│   ├── assets/                       # Old static assets
│   └── index.html                    # Old SPA entry point
│
├── G2_Social_Media_Kit/              # Brand assets
├── Kimi_Agent_Diseño web G2Intelligence/  # External agent design files

═══ Project management ═══

.planning/                            # GSD project management
└── codebase/                         # This codebase map
```

## File Size Summary

| Category | Files | Notes |
|---|---|---|
| Pages (app/) | 6 | Home, city, producto, privacidad |
| API Routes | 2 | contact, schedule webhook proxies |
| Components | 15 | 7 sections, 5 UI primitives, 3 widgets |
| Lib modules | 3 | schemas, rate-limit, utils |
| Config files | 8 | next.config, tsconfig, eslint, postcss, components.json, etc. |
| **Total source** | ~34 files | Excluding node_modules, .next, .vercel |
