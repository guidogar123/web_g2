# Technology Stack

**Project:** G2 Intelligence — Next.js Website Rebuild
**Researched:** 2026-04-03
**Confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x | Full-stack framework with SSR/SSG for SEO-critical marketing site | App Router is the modern standard in 2025 for new projects. Provides native server-side rendering out of the box for search engine crawlability. Superior to Pages Router for marketing sites requiring fine-grained control over rendering strategy. |
| React | 19.x | UI library for components | Latest version, compatible with Next.js 15. Required for @n8n/chat widget and shadcn/ui compatibility. |
| TypeScript | 5.x | Type safety across codebase | Prevents runtime errors, improves IDE support. Essential for team collaboration and long-term maintainability. |
| Tailwind CSS | 3.x | Utility-first CSS framework | Already in existing codebase. Matches project's minimalist Emerald Intelligence design system. |

### UI Components & Design

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | latest | Pre-built, customizable component library | Already integrated in existing codebase. Pairs perfectly with Tailwind CSS. Provides accessible, themeable components without vendor lock-in (copy-paste components to your repo). |
| Stitch MCP | current | Design system generation tool | User explicitly selected for design screen generation. Works with Tailwind + React components. |

### SEO & Metadata

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | 15.x | Built-in SEO metadata management | Native to App Router—no external dependencies needed. Replaces deprecated next-seo. Generates `<title>`, `<meta>` tags, Open Graph, and Twitter Card metadata server-side before client hydration. Recommended over next-seo for 2025 projects. |
| next-seo | 6.4.x (optional) | Structured data generation helper | Only if raw metadata API feels verbose. Provides JSON-LD generators for LocalBusiness, Organization, FAQSchema. Can coexist with Metadata API for structured data only. Recommend: use Metadata API for basic SEO, add next-seo only if LocalBusiness/geo-targeting becomes complex. |
| schema-org (JSON-LD) | inline | Structured data for local SEO | Embed LocalBusiness, Organization, Service schemas in layout.tsx `<script>` tags. Critical for local SEO in Vale del Cauca region. Google uses this for knowledge panels, maps, rich snippets. |

### Image Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | 15.x (built-in) | Automatic image optimization | Serves WebP/AVIF formats (25–70% file size reduction). Lazy loading, blur-up placeholders. Prevents layout shift. Critical for Core Web Vitals (LCP < 2.5s target). No external package needed. |

### Browser-Based Widgets (Client-Side)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @n8n/chat | 0.2.x+ | n8n chat widget | Embeddable chat widget for n8n workflows. Uses browser APIs (fetch, DOM). Must wrap in `"use client"` boundary in Next.js—dynamic import with `ssr: false` to prevent hydration mismatch. See **Integration Strategy** below. |

### Environment & Secrets

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| dotenv | built-in (Next.js) | Load .env.local variables | Next.js has native .env support. No extra package required. |

### Database / Backend Integrations

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| n8n webhooks | (external SaaS) | Backend workflow automation | Existing integration. Preserves chat, scheduling, contact form workflows. Keep webhook URLs in .env.local (not hardcoded). |

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Deployment platform | Zero-config deployment, tight Next.js integration, global CDN, free tier generous, built-in edge functions. Best for Next.js projects. Excellent DNS routing for .co domains via Vercel Domains or external registrar. |

## Architecture Decisions

### Rendering Strategy

**Landing page (page.tsx):** `generateStaticParams()` with ISR (Incremental Static Regeneration)
- Reason: Homepage content is static (services, team, etc.). ISR ensures fast loads and SEO benefits while allowing on-demand revalidation if needed.
- Revalidate: 3600 seconds (1 hour) or on-demand via webhook.

**Dynamic pages** (e.g., `/[service]` or locale pages): SSR if content varies, SSG if predictable
- Reason: G2 Intelligence has fixed set of 6 sections (Hero, Services, Nosotros, Equipo, Contacto, Footer). No dynamic content. Use SSG with ISR.

**API routes** (for form submissions): Route Handlers in App Router
- Location: `app/api/webhooks/[...]/route.ts`
- Reason: Handle POST from contact form → forward to n8n webhook. Never expose n8n URL to client; use Route Handler as proxy.

### @n8n/Chat Integration Strategy

**Challenge:** @n8n/chat uses browser APIs (fetch, DOM). Next.js server components can't execute browser code.

**Solution:**

```typescript
// app/components/ChatWidget.tsx
"use client";

import dynamic from "next/dynamic";

const N8nChat = dynamic(
  () => import("@n8n/chat").then((mod) => mod.createChat),
  { ssr: false, loading: () => <div>Loading chat...</div> }
);

export function ChatWidget() {
  return (
    <div id="n8n-chat-container">
      <N8nChat({
        webhook: process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK,
      })}
    </div>
  );
}
```

**Key points:**
- Mark component with `"use client"` directive.
- Use `dynamic()` with `ssr: false` to exclude from server rendering.
- Expose webhook URL via `NEXT_PUBLIC_N8N_CHAT_WEBHOOK` (safe for browser).
- Lazy-load widget to avoid blocking initial page render.

### Environment Variables

**Safe for browser (use NEXT_PUBLIC_ prefix):**
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK` — Chat widget webhook

**Secrets (no prefix, server-only):**
- `N8N_CONTACT_WEBHOOK` — Contact form endpoint (kept secret)
- `N8N_SCHEDULING_WEBHOOK` — Scheduling endpoint (kept secret)

**.env.local example:**
```
# Public (browser-safe)
NEXT_PUBLIC_N8N_CHAT_WEBHOOK=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat

# Secrets (server-only via Route Handlers)
N8N_CONTACT_WEBHOOK=https://n8n-n8n.ektnbd.easypanel.host/webhook/[contact-id]/contact
N8N_SCHEDULING_WEBHOOK=https://n8n-n8n.ektnbd.easypanel.host/webhook/[scheduling-id]/scheduling
```

**.gitignore:**
```
.env.local
.env*.local
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Routing | App Router | Pages Router | Pages Router is stable but legacy. App Router is the standard for new projects in 2025. Vercel recommends migration path. No reason to use Pages Router for new projects. |
| SEO Metadata | Metadata API | next-seo | next-seo adds a dependency. Metadata API is built-in, simpler, and recommended for App Router. next-seo exists for Pages Router legacy code. |
| Deployment | Vercel | Self-hosted (VPS) | Vercel: zero-config, free tier, global CDN, seamless Next.js support. Self-hosted (DigitalOcean, Linode): $5–20/mo, requires DevOps knowledge, no built-in CDN. For a marketing site with tight deadline, Vercel wins. Revisit self-hosted only if costs exceed $500/mo. |
| Deployment | Vercel | Cloudflare Pages | Cloudflare Pages is cheaper ($0 tier available) and works with Next.js, but has limitations on serverless functions and edge runtime compared to Vercel's edge network. Choose Vercel unless bandwidth costs become critical. |
| Image Format | WebP/AVIF | PNG/JPEG | Next.js next/image automatically serves modern formats. No reason to manually optimize. Let next/image handle it. |

## Installation

### Core Setup

```bash
# Create Next.js 15 project with App Router
npx create-next-app@latest g2-intelligence \
  --typescript \
  --tailwind \
  --app \
  --no-eslint

cd g2-intelligence

# Install shadcn/ui (already scaffolded, but ensure latest)
npx shadcn-ui@latest init

# Install @n8n/chat widget
npm install @n8n/chat

# (Optional) Install next-seo if LocalBusiness schema becomes verbose
npm install next-seo
```

### Dev Dependencies

```bash
# TypeScript and type definitions
npm install -D typescript @types/node @types/react @types/react-dom

# Tailwind CSS (usually scaffolded by create-next-app)
npm install -D tailwindcss postcss autoprefixer

# Testing (optional, not required for v1)
# npm install -D vitest @testing-library/react
```

### Existing Codebase Migration

The current React + Vite codebase must be **migrated, not ported**:

1. **Copy component source code:** `Kimi_Agent_Diseño web G2Intelligence/app/components/` → `app/components/` (no changes to React code itself)
2. **Adapt Tailwind config:** Verify Tailwind 3 colors match Emerald Intelligence palette in `tailwind.config.ts`
3. **Wrap n8n chat:** Move chat widget to `app/components/ChatWidget.tsx` with `"use client"` + `dynamic()` as shown above
4. **Convert form handlers:** Move form submission logic to `app/api/webhooks/contact/route.ts` (Route Handler)
5. **Add Metadata API:** Create layout metadata in `app/layout.tsx` and page-specific metadata in each page

## Versions & Compatibility

| Library | Version | Node | Notes |
|---------|---------|------|-------|
| Next.js | 15.0.3+ | 20.x+ | Latest as of 2026. App Router stable. |
| React | 19.x | 20.x+ | Latest. Full compatibility with Next.js 15. |
| TypeScript | 5.4+ | — | No special requirements. |
| Tailwind CSS | 3.4+ | — | Already in use. No breaking changes in v3. |
| @n8n/chat | 0.2.0+ | — | Check npm for latest. May release v1.0 in 2026. |
| Node.js (runtime) | 20.x LTS or 22.x current | — | Recommended for production. Vercel uses current LTS. |

## Sources

- [Next.js Rendering: Static vs Dynamic](https://nextjs.org/docs/app/building-your-application/rendering)
- [App Router vs Pages Router: DEV Community](https://dev.to/shyam0118/app-router-vs-pages-router-in-nextjs-a-deep-practical-guide-341g)
- [Next.js 15 SEO Checklist 2025](https://dev.to/vrushikvisavadiya/nextjs-15-seo-checklist-for-developers-in-2025-with-code-examples-57i1)
- [Next.js Metadata API vs next-seo](https://github.com/vercel/next.js/discussions/51392)
- [Metadata API documentation](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [@n8n/chat on npm](https://www.npmjs.com/package/@n8n/chat)
- [Next.js Environment Variables Best Practices](https://nextjs.org/docs/pages/guides/environment-variables)
- [Vercel vs Self-Hosted Deployment 2025](https://dev.to/rbobr/self-hosting-nextjs-what-you-gain-and-lose-vs-vercel-4g8c)
- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [Local SEO with LocalBusiness Schema](https://dev.to/shashwat_maurya_90d413406/how-i-built-a-local-seo-optimised-nextjs-website-that-ranked-on-google-in-45-days-4kbb)
- [LocalBusinessJsonLd with next-seo](https://www.npmjs.com/package/next-seo)
