# Research Summary: G2 Intelligence Website Rebuild

**Project:** G2 Intelligence — Next.js Website Rebuild + Local SEO Optimization
**Domain:** B2B SaaS/Consulting with Local SEO Focus (Colombian Market)
**Researched:** 2026-04-03
**Confidence:** HIGH

## Executive Summary

G2 Intelligence is rebuilding their website from a React SPA (Vite) to a Next.js 15 App Router site to achieve technical SEO excellence and local search visibility in Cali, Valle del Cauca, Colombia. The target audience is Colombian companies searching for AI automation and sales consulting services.

The recommended approach combines Next.js's server-side rendering and static generation with a server-first architecture using isolated client components for interactivity. This minimizes JavaScript bundle size (~50KB client JS target), ensures Core Web Vitals compliance (LCP < 2.5s), and enables proper structured data (LocalBusiness, Organization, Service schemas) for local ranking. n8n webhook integrations (chat, scheduling, contact forms) are proxied through API Routes for security and reliability.

The primary risk is migration complexity: overstuffing client components, failing to await async params in dynamic routes, and exposing webhook URLs in code. Prevention requires disciplined component boundaries, TypeScript typing of async params, and strict environment variable management. Secondary risks include broken form submissions (missing error handling) and missing geo-targeted metadata (service pages won't rank locally without city-specific titles and descriptions).

## Key Findings

### Recommended Stack

The technology stack is proven, heavily documented, and well-suited for this use case:

**Core technologies:**
- **Next.js 15 with App Router** — Server-first framework for SSR/SSG, automatic code splitting, Metadata API (native SEO), zero-config deployment to Vercel. App Router is the 2025+ standard; Pages Router is legacy. Enables streaming and async component patterns for minimal client JS.
- **React 19** — Latest compatible with Next.js 15. Used for both Server Components (no JS shipped) and Client Components (minimal islands). Full TypeScript support.
- **TypeScript 5.x** — Type safety prevents async params (Promise vs. string) bugs and catches webhook URL hardcoding issues at compile time.
- **Tailwind CSS 3.x + shadcn/ui** — Already in existing codebase. Utility-first framework matches Emerald Intelligence design system. Accessible, pre-built components without vendor lock-in.
- **Next.js Metadata API** — Built-in SEO metadata (replaces deprecated next-seo). Generates `<title>`, `<meta>`, Open Graph, Twitter Cards server-side. No external dependency.
- **next/image** — Automatic WebP/AVIF optimization, lazy loading, blur-up placeholders. Critical for Core Web Vitals (LCP < 2.5s target).
- **@n8n/chat v0.2.x+** — Embeddable chat widget. Requires `dynamic()` import with `ssr: false` to avoid "window is undefined" SSR errors.
- **Vercel** — Deployment platform. Zero-config Next.js integration, global CDN, edge functions, generous free tier. Best-in-class for next.js projects.

**Environment & Secrets:**
- `.env.local` (development) and Vercel Environment Variables (production) for all webhook URLs and secrets. Never expose `N8N_WEBHOOK_URL` in client code or git history.

### Expected Features

Research identified 29 table stakes and 9 differentiators for B2B AI consulting in Colombia.

**Must have (table stakes — without these, won't rank or convert):**
- Google Business Profile setup with verified ownership and location categories
- Mobile-first responsive design (60%+ traffic from mobile in Colombia)
- Core Web Vitals compliance (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Organization + LocalBusiness + Service schemas (JSON-LD) for local search visibility
- NAP consistency (exact Name, Address, Phone matches across all web listings)
- Technical SEO: sitemap.xml, robots.txt, proper crawl paths, meta tags
- Fixed contact form connecting to n8n webhook (currently broken, uses setTimeout simulation)
- Working service scheduling (ScheduleModal exists, needs webhook validation)
- Chat bot for 24/7 inquiries (@n8n/chat widget exists)
- HTTPS + security headers (Google penalizes HTTP)
- Spanish language metadata (`lang="es-CO"`)

**Should have (competitive differentiators — help conversion and ranking):**
- Service area map showing coverage (Cali, Jamundí, Palmira, Yumbo, Valle del Cauca)
- 2-3 anonymized case studies with quantified results (25-30% better conversion than testimonials alone)
- FAQ section addressing Colombia-specific concerns (payment methods, compliance, delivery timelines)
- Team bios highlighting Colombian market expertise
- Video testimonials from Colombian clients (out of v1 scope per PROJECT.md)
- WhatsApp integration for instant contact (Phase 2 candidate)
- Transparent pricing info (optional, builds trust with Colombian buyers)
- AggregateRating schema pulling from Google reviews

**Defer to Phase 2+:**
- Blog / CMS / dynamic content (requires content strategy, SEO wins are slow, out of v1 scope)
- Multi-language (EN/ES) — audience is 100% Colombian Spanish speakers; dilutes SEO signals
- Live chat separate from chatbot (current chatbot sufficient)
- E-commerce / online payments (model is B2B consulting, not SaaS)

### Architecture Approach

The architecture follows a "server-first with client islands" pattern. By default, all content sections (Hero, Services, About, Team, Contact, Footer) are Server Components rendered at build time (ISR, Incremental Static Regeneration). Interactive elements (ScheduleForm, ContactForm, ChatWidget) are isolated Client Components that hydrate only when needed. This approach keeps the JavaScript bundle under 100KB gzip, enables fast TTFB (~50ms from ISR cache), and ensures metadata is rendered server-side for SEO.

**Major components and data flows:**
1. **Root Layout & Metadata** (Server) — HTML structure, font preloading, global styles, root metadata. No `'use client'` directive. ISR revalidates every 3600s (1 hour).
2. **Static Content Sections** (Server Components) — Hero, Services, About, Team, Contact, Footer. Render at build time, zero client JS.
3. **Interactive Forms** (Client Components) — ScheduleForm, ContactForm. Hydrate on client, submit to `/api/webhook/n8n/*` API Routes (not directly to n8n).
4. **ChatWidget** (Client Component with dynamic import) — Wrapped in `ChatWidgetLoader` Server Component, loaded with `ssr: false` to prevent SSR errors. @n8n/chat connects directly to n8n (acceptable for streaming chat, unlike forms).
5. **API Route Handlers** (Server-side security layer) — `/api/webhook/n8n/contact/`, `/api/webhook/n8n/schedule/`. Validate input, sanitize, forward to n8n URL (kept secret in env vars), return structured responses to client. No CORS issues, no exposed credentials.
6. **Structured Data** (in layout or page) — LocalBusiness JSON-LD with `areaServed: [Cali, Jamundí, Palmira, Yumbo, Valle del Cauca]`, Organization schema, Service schemas (one per service offering). Inline `<script type="application/ld+json">` tags.

**Anti-patterns to avoid:**
- Mark everything `'use client'` — loses all SSR benefits, balloons JS bundle, degrades LCP
- Hardcode n8n URLs in source code or git history — expose credentials, can't rotate safely
- Direct form submissions from client to n8n (no proxy) — CORS issues, no error handling, no rate-limiting, no audit trail
- Synchronous access to `params` in dynamic routes — causes undefined values, build passes but runtime fails

### Critical Pitfalls

Research identified 8 critical pitfalls specific to this migration and domain. Top 5 to prevent:

1. **Async Params Not Awaited in Dynamic Routes** — Dynamic routes return undefined params, pages render blank. Prevention: Always `await params` in Server Components or `use(params)` in Client Components. Test `npm run build` and verify dynamic routes render. Type params as `Promise<{slug: string}>`. Phase: Catch in Phase 1 setup.

2. **Overusing 'use client' Boundary** — Entire app becomes client-rendered, defeating Next.js benefits. LCP increases from 1.2s to 3.5s+, JS bundle balloons. Prevention: Apply `'use client'` only to leaf-level components (forms, buttons, modals), not layouts. Verify layout.tsx is NOT marked `'use client'`. Check bundle size: <100KB gzip. Phase: Decide strategy in Phase 1.

3. **Contact Form Silent Failure** — Current implementation uses setTimeout simulation. Form shows "Enviado" but discards data. Prevention: Use API Route proxy pattern. Validate input server-side. Return specific error messages. Log all submissions. Test form submission and verify data reaches n8n. Phase: Fix in Phase 2.

4. **Missing Geo-Targeted Metadata** — Service pages don't rank for local searches. Prevention: Implement `generateMetadata()` per service page. Include city names in title and description. Nest Service schemas under LocalBusiness with `areaServed` listing all cities. Verify in Rich Results Test. Phase: Implement in Phase 1 (critical for launch).

5. **Webhook URL Exposure** — n8n URL visible in browser, committed to git, exposed in build. Acts as API key. Prevention: Move to `.env.local` (dev) and Vercel vars (prod). Never hardcode. Use API routes to hide. Verify no webhook URL in build output. Rotate if exposed. Phase: Fix before external testing.

## Implications for Roadmap

Based on integrated findings from all research documents, the roadmap should follow this phase structure:

### Phase 1: Foundation & Technical Setup
**Rationale:** Establishes Next.js 15 App Router architecture and prevents critical pitfalls before any content work begins. Static generation enables SEO. Proper environment setup prevents credential exposure.

**Delivers:**
- Next.js 15 project initialized with App Router, TypeScript, Tailwind CSS + shadcn/ui
- Root layout with Metadata API setup, font preloading, global styles
- All 6 content sections migrated from React SPA as Server Components (Hero, Services, About, Team, Contact, Footer)
- Proper directory structure: `/app/components/sections/`, `/app/api/webhook/n8n/`, `/app/lib/`
- Environment variables configured: `.env.local` with all webhook URLs, `.gitignore` excludes `.env.*`
- Dynamic sitemap.xml and robots.txt deployed

**Features from FEATURES.md:**
- Mobile-first responsive design (migrated from existing)
- HTTPS + security headers
- Favicon + Open Graph tags
- Sitemap.xml (dynamic from Next.js) + robots.txt
- Spanish language meta tags (`lang="es-CO"`)
- Organization + LocalBusiness + Service schemas (JSON-LD) implemented and validated

**Success criteria:**
- `npm run build` succeeds, <100KB gzip JS bundle, zero "synchronous params" warnings
- Pages render without blank content from undefined params
- layout.tsx is NOT marked `'use client'`
- No webhook URLs in source code or build output
- Rich Results Test shows LocalBusiness schema with correct cities

---

### Phase 2: Local SEO & Metadata Optimization
**Rationale:** Geo-targeting and unique metadata are prerequisites for local search ranking. Must be implemented before launch; fixing later requires re-crawl. Depends on Phase 1 foundation.

**Delivers:**
- Unique, geo-specific metadata for each service page using `generateMetadata()`
- LocalBusiness JSON-LD with `areaServed: [Cali, Jamundí, Palmira, Yumbo, Valle del Cauca]`
- H1, H2, meta descriptions optimized for Colombian keywords
- Alt text on all images with keyword + description
- Dynamic sitemap.xml and robots.txt validated

**Success criteria:**
- Each service page has unique `<title>` with city name
- Meta description includes `areaServed` cities and CTA
- Search Console Geo-targeting section shows Colombia confirmed
- `npm run build` completes <1 minute (no slow metadata generation)

---

### Phase 3: Form Integration & Interactivity
**Rationale:** Forms are critical for lead capture. Contact form is currently broken. Both depend on API Route security layer from Phase 1. Can run in parallel with Phase 2.

**Delivers:**
- Fixed ContactForm component connected to `/api/webhook/n8n/contact` API Route
- ScheduleForm with proper validation and error handling
- Both forms POST to API routes (not directly to n8n)
- API routes validate input, sanitize, forward to n8n, return structured responses
- Server-side rate-limiting on API routes (max 3 requests per IP per 5 minutes)
- Specific error messages ("Email inválido", "Campo requerido", "Webhook timeout")
- Form submission logging for audit trail

**Success criteria:**
- Submit contact form with test data, verify in n8n inbox within 2 seconds
- Submit schedule form with test data, verify in n8n inbox
- Break webhook URL, submit form, user sees specific error
- Rapid-click test: submit form 5 times in 2 seconds, 3rd+ requests return 429 status
- Error logs available for audit

---

### Phase 4: ChatWidget & Advanced Integrations
**Rationale:** Chat is nice-to-have; forms are critical path. Depends on Phase 1. Can run in parallel with Phases 2-3.

**Delivers:**
- ChatWidget properly wrapped with dynamic import, `ssr: false` to prevent SSR errors
- @n8n/chat loaded as high-priority
- Chat initialized with Emerald Intelligence theme
- Fallback message if @n8n/chat library fails to load

**Success criteria:**
- Page loads without "window is undefined" errors
- Chat widget visible and functional within 2 seconds of page load
- LCP unaffected by chat widget

---

### Phase 5: Performance & Launch Validation
**Rationale:** Final optimization and validation before production. Depends on all prior phases complete.

**Delivers:**
- Core Web Vitals optimization: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Image optimization: all images in next/image format, lazy-loaded except hero
- Font optimization: self-hosted via next/font, preloaded, display: swap
- Code splitting validated: JS bundle <100KB gzip
- Lighthouse audit: 90+ scores on Performance, Accessibility, SEO
- Production deployment to Vercel with environment variables set

**Success criteria:**
- PageSpeed Insights: Core Web Vitals all green, 90+ Performance score
- Lighthouse: 90+ across all categories
- Real-world testing: form submissions work end-to-end, chat responsive, pages load <2.5s
- n8n inbox shows all test submissions logged
- No error console warnings in DevTools
- Deployment to Vercel succeeds, environment variables correctly set

---

### Phase Ordering Rationale

1. **Phase 1 (Foundation) first** — Establishes Next.js architecture, prevents critical pitfalls. No code can be written safely before this.
2. **Phase 2 (SEO) before launch** — Metadata must be correct at crawl time; re-crawl takes weeks. Depends on Phase 1 structure.
3. **Phase 3 (Forms)** — Lead capture is core business value. Contact form bug blocks this. Can run in parallel with Phase 2.
4. **Phase 4 (Chat)** — Nice-to-have; lower priority. Can run in parallel with Phases 2-3.
5. **Phase 5 (Validation)** — Last, after all features working. Pre-launch quality gate.

This ordering respects both technical dependencies and business priorities.

---

### Research Flags

**Phases likely needing deeper research during planning:**

- **Phase 2 (Local SEO):** Colombian SEO market specifics were researched but should be validated with Google Search Console signals and competitor analysis during implementation. Consider whether additional local keywords beyond Cali/Valle are needed.
- **Phase 3 (Form Integration):** n8n webhook schema and rate-limiting behavior should be verified in production environment. Test webhook response times and timeout handling during implementation.

**Phases with standard patterns (no additional research needed):**

- **Phase 1 (Foundation):** Next.js 15 App Router is well-documented, battle-tested, and patterns are standard across 2025+ new projects.
- **Phase 4 (Chat):** @n8n/chat dynamic import pattern is documented and common in Next.js.
- **Phase 5 (Validation):** Core Web Vitals optimization follows documented best practices.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js 15, React 19, TypeScript 5.x are official 2025+ standard. Metadata API verified via Next.js official docs. All versions pinned to current LTS. |
| Features | HIGH | Researched against official Google Search Central docs, B2B consulting benchmark data (2025), and Colombian SEO market sources. Must-haves verified; differentiators validated. |
| Architecture | HIGH | Next.js 15 App Router patterns verified across official docs, recent 2026 blog posts, and community consensus. Server/Client component boundary strategy tested and proven. Anti-patterns documented with recovery strategies. |
| Pitfalls | HIGH | All 8 critical pitfalls sourced from official Next.js migration guide, community error patterns, and domain-specific issues. Prevention strategies include code examples and verification steps. |
| **Overall** | **HIGH** | All four research areas converge on clear recommendations. Stack is battle-tested, features align with B2B consulting benchmarks, architecture is standard 2026 pattern, pitfalls have known solutions. Project constraints are all compatible with recommended approach. |

### Gaps to Address

1. **n8n Webhook Schema Verification:** Research assumes webhook expects `{ type, nombre, email, ...}` structure based on PROJECT.md context. During Phase 3 implementation, verify actual webhook payload schema with n8n admin panel.

2. **Emerald Intelligence Design System Constraints:** Research focused on technical implementation. During Phase 1, verify that next/font (Inter, Roboto Mono) and Tailwind color palette fully match brand identity.

3. **Colombian Market Keywords (Phase 2 detail):** FEATURES.md lists general Colombian keywords. During Phase 2, conduct keyword research using Google Search Console to identify actual user search behavior in target region.

4. **Production Deployment Details:** Stack.md recommends Vercel; research didn't detail domain/DNS setup for g2intelligence.co (.co domain routing, SSL certificate). During Phase 5, coordinate with domain registrar.

5. **Google Business Profile Setup:** FEATURES.md requires GBP ownership verification, but this is external to code. Document GBP setup process separately during Phase 1.

## Sources

### Primary (HIGH confidence)

- **STACK.md:** Official Next.js 15 docs, React 19 compatibility, Vercel deployment guide. Metadata API vs. next-seo comparison from official Next.js discussions. Version compatibility verified with npm registry.
- **FEATURES.md:** Google Search Central (official docs on LocalBusiness schema, Core Web Vitals, structured data). B2B consulting benchmarks from Trajectory Web Design 2025 guide. Colombian market insights from RankTracker and MacSources SEO guides.
- **ARCHITECTURE.md:** Next.js 15 App Router official docs and 2026 community guides. Server/Client Components patterns verified against official migration guide. Dynamic import patterns documented in Next.js lazy-loading guide.
- **PITFALLS.md:** Next.js 15 migration guide (official), async params breaking change documentation. Community error patterns from LogRocket and n8n webhook best practices. Local SEO pitfalls from Colombian market research.

### Secondary (MEDIUM confidence)

- B2B consulting website design best practices (Grazitti, Directive Consulting 2025 guides) — patterns align with research but not project-specific.
- Case study ROI data (Consulting Success) — benchmarks for conversion rate optimization baseline.
- Schema.org documentation (Localo, DigiCob guides) — LocalBusiness schema structure validated but not all edge cases tested.

### Tertiary (LOW confidence)

- Specific n8n webhook schema assumptions — based on PROJECT.md context but not verified against live webhook.
- Emerald Intelligence brand system constraints — researched from brand kit mentions but full Stitch MCP output not yet generated.
- Colombian payment method preferences — researched but no hard data; based on regional generalizations.

---

*Research completed: 2026-04-03*
*All 4 research documents synthesized: STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md*
*Ready for roadmap creation: YES*
