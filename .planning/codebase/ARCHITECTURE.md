# Architecture

**Analysis Date:** 2026-06-19

## Overview

G2 Intelligence website is a **Next.js 16 App Router** application built as a public-facing landing site for a Colombian AI consulting company. The site combines **static generation** for SEO-optimized city pages with **client-side interactivity** for the home page experience.

```
User → Vercel CDN → Next.js 16 (standalone) → Static Pages (SSG) + API Routes (serverless)
```

## Route Structure

| Route | Type | Rendering | Purpose |
|---|---|---|---|
| `/` | Page | ISR (3600s) | Main landing page with sections |
| `/[ciudad]` | Page | Static (force-static) | Per-city SEO landing pages (15 cities) |
| `/productos/nexo_crm` | Page | Static | Product landing: Nexo CRM |
| `/politica-privacidad` | Page | Static | Privacy policy (Ley 1581/2012) |
| `/api/webhook/n8n/contact` | API Route | Serverless | Form → n8n proxy |
| `/api/webhook/n8n/schedule` | API Route | Serverless | Scheduling → n8n proxy |
| `/sitemap.xml` | Route Handler | Generated | Dynamic sitemap (16 URLs) |
| `/robots.txt` | Route Handler | Generated | Crawl directives |

## Dual-Page Strategy

### Home Page (`/`)
- Server component shell → delegates to `HomeClient.tsx` (client component)
- ISR with 3600s revalidation — content regenerated hourly
- Composes 6 section components + chat widget + schedule modal
- Sections: Hero → Servicios → Nosotros → Equipo → Contacto → Footer

### City Pages (`/[ciudad]/`)
- Fully server-rendered static pages
- `force-static` + `dynamicParams = false` — all pages generated at build time
- `generateStaticParams` reads from 15-city `CITIES` array
- Each page has inline HTML (no shared section components) — independent per city
- JSON-LD structured data per city (localized LocalBusiness schema)
- Geo metadata per city (region, lat/lon, placename)

## Component Architecture

```
layout.tsx (server)
├── JSON-LD structured data (LocalBusiness + Services)
├── Sonner Toaster (notifications)
├── Inter + Roboto Mono fonts
│
├── / (home)
│   └── page.tsx (server, ISR)
│       └── HomeClient.tsx ('use client')
│           ├── Navigation.tsx ('use client') — Sticky nav with scroll detection
│           ├── Hero.tsx ('use client') — Canvas particles, stats, CTAs
│           │   └── HeroCanvas.tsx ('use client') — Particle system canvas
│           ├── Servicios.tsx — Services grid
│           ├── Nosotros.tsx — About section
│           ├── Equipo.tsx — Team section
│           ├── Contacto.tsx ('use client') — Contact form + info
│           │   └── UI: Input, Textarea, Label, Button (shadcn/ui)
│           ├── Footer.tsx
│           ├── ScheduleModal.tsx ('use client') — Dialog with date/time picker
│           │   └── UI: Dialog, Button, Input, Label (shadcn/ui)
│           └── ChatWidgetWrapper.tsx ('use client')
│               └── ChatWidget.tsx ('use client') — @n8n/chat init
│
├── /[ciudad] (static)
│   └── page.tsx (server, force-static) — Self-contained HTML per city
│
├── /productos/nexo_crm (static)
│   └── page.tsx (server) — Product landing page
│
└── /politica-privacidad (static)
    └── page.tsx (server) — Privacy policy
```

## Data Flow

### Form Submissions
```
Client Form → Zod validation (client) → fetch POST /api/webhook/n8n/*
  → Server: Zod validation (server) → Rate limit check → n8n webhook proxy
  → Response back to client
```

- **D-locked payloads**: Only validated fields are forwarded — no extra fields pass through
- **Dual validation**: Zod schemas run on both client (instant feedback) and server (security)
- **Rate limiting**: In-memory Map, 3 req / 5 min per IP

### Chat Widget
```
Client Browser → @n8n/chat → NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL (direct to n8n)
```

## Static Generation Approach

- **Sitemap**: Generated from `CITIES` array (1 home + 15 city URLs)
- **Robots.txt**: Full crawl, references sitemap.xml
- **City pages**: Pre-built at deploy time; 404 for unlisted slugs
- **Home page**: ISR — stale-while-revalidate with 1-hour cache
- **Product pages**: Fully static (single pages)
- **Metadata**: Every page has explicit `generateMetadata` with title, description, OG, geo tags

## SEO Architecture

- **Global metadata** in root layout (`layout.tsx`):
  - Default title template: `%s | G2 Intelligence`
  - Keywords targeting Colombian AI/local SEO phrases
  - Open Graph, Twitter Cards, Facebook app ID
  - JSON-LD: LocalBusiness + Services schema
- **Per-route metadata** via `generateMetadata`:
  - City pages: localized title/description/geo/alternates
  - Product pages: product-specific meta
- **Geo targeting**: `geo.region`, `geo.placename`, `ICBM` on city pages

## Deployment Architecture

- **Output**: `standalone` mode for Vercel
- **Domain**: `g2intelligence.co` (canonical)
- **Redirect**: `www.g2intelligence.co/*` → permanent 308 to naked domain
- **No CI/CD config** in repository (assumes Vercel auto-deploy from git)

## Key Architectural Decisions

1. **In-memory rate limiter vs DB** — Chose simplicity over scalability. Acceptable for low-traffic landing page.
2. **Static city pages** — Maximum SEO performance. Trade-off: requires rebuild to add/edit cities.
3. **Client component orchestrator** — `HomeClient.tsx` as single `'use client'` wrapper limits server/client boundary to one place.
4. **Inline city page HTML** — City pages don't reuse section components, favoring independence over DRY.
5. **n8n proxy pattern** — Server-side proxy keeps n8n endpoint private and allows rate limiting + validation middleware.
