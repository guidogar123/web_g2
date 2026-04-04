# G2 Intelligence Website Rebuild — Roadmap

**Project:** G2 Intelligence Next.js 15 + Local SEO Rebuild
**Core Value:** When companies in Valle del Cauca search "inteligencia artificial para ventas" or "automatización Cali", G2 Intelligence ranks first
**Target Audience:** Colombian B2B companies seeking AI automation and sales consulting
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Vercel

**Roadmap Created:** 2026-04-03
**Granularity:** COARSE (5 phases — critical path only)
**Coverage:** 28/28 v1 requirements mapped

---

## Phases

- [ ] **Phase 1: Foundation & Technical Setup** — Next.js 15 initialization, component migration, environment security
- [ ] **Phase 2: Local SEO & Metadata Optimization** — Geo-targeted metadata, structured data, search optimization
- [x] **Phase 3: Forms & Integration** — Fix contact form, validate inputs, secure API routes (completed 2026-04-03)
- [x] **Phase 4: Chat Widget & Integration** — ChatWidget SSR safety, theme application, fallback handling (completed 2026-04-03)
- [x] **Phase 5: Performance & Launch Validation** — Core Web Vitals, image optimization, Vercel deployment (completed 2026-04-04)

---

## Phase Details

### Phase 1: Foundation & Technical Setup

**Goal:** Establish Next.js 15 App Router architecture with all content sections migrated, environment variables secured, and critical pitfalls prevented before any feature work begins.

**Depends on:** Nothing (first phase)

**Requirements:** MIGR-01, MIGR-02, MIGR-03, UI-01, UI-02, UI-03, PERF-03, PERF-04

**Success Criteria** (what must be TRUE):
1. User loads site and sees all 6 content sections (Hero, Servicios, Nosotros, Equipo, Contacto, Footer) rendered correctly
2. Terminal shows `npm run build` succeeds with JavaScript bundle < 100KB gzip and zero async params warnings
3. DevTools shows no webhook URLs in source code, network requests, or build output (all in `.env.local`)
4. Page layout is stable — no content shift or blank sections from undefined async params
5. `layout.tsx` file does not contain `'use client'` directive (server-first architecture preserved)
6. Rich Results Test (Google) displays LocalBusiness schema with service area including Cali, Jamundí, Palmira, Yumbo
7. Images load as WebP/AVIF via next/image with declared dimensions
8. Fonts (Inter, Roboto Mono) load via next/font without layout shift (FOUT prevented)

**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Scaffold, configure env/fonts/CSS, generate 6 sections via Stitch MCP, migrate Navigation + ScheduleModal, wire home page, validate build

**UI hint:** yes

---

### Phase 2: Local SEO & Metadata Optimization

**Goal:** Implement geo-targeted metadata and structured data so G2 Intelligence ranks for local Colombian searches before launch.

**Depends on:** Phase 1

**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, UI-04

**Success Criteria** (what must be TRUE):
1. User opens browser DevTools and inspects `<head>` — each page has unique `<title>` and `<meta name="description">` with city names and local keywords
2. Google Search Console Geo-targeting section shows Colombia confirmed and primary region
3. Inspection of Service schemas in Rich Results Test shows each service includes name, description, and correct `serviceProvider` (G2 Intelligence)
4. `sitemap.xml` is dynamically generated and lists all pages; `robots.txt` allows complete indexation
5. Open Graph tags (og:title, og:description, og:image) are present for social media previews
6. Twitter Card tags are present; sharing a link to site on social media shows correct title, description, and image

**Plans:** 1 plan

Plans:
- [ ] 02-01-PLAN.md — Enhance layout.tsx metadata + JSON-LD schemas, add generateMetadata to page.tsx, create sitemap.ts, robots.ts, opengraph-image.tsx

**UI hint:** yes

---

### Phase 3: Forms & Integration

**Goal:** Fix contact form to send real data to n8n, validate all inputs server-side, and protect API routes from abuse via rate limiting.

**Depends on:** Phase 1

**Requirements:** FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06

**Success Criteria** (what must be TRUE):
1. User fills contact form and submits — data reaches n8n inbox within 2 seconds with all fields (nombre, email, empresa, mensaje) intact
2. User fills schedule form and submits — data reaches n8n inbox with type: 'scheduling' and all fields (nombre, email, telefono, fecha, hora)
3. User enters invalid email and submits — form shows specific error "Email inválido", does not submit
4. User submits form 5 times rapidly (2 seconds) — first 3 succeed, 4th+ show rate-limit error (429 HTTP status)
5. DevTools shows form submits to `/api/webhook/n8n/contact` (internal API route), not directly to external n8n URL
6. Network tab shows all form submissions logged for audit trail (timestamps, IP origin, success/failure)

**Plans:** 1/1 plans complete

Plans:
- [x] 03-01-PLAN.md — Install zod, create schemas + rate-limiter, create API routes, fix Contacto.tsx, update ScheduleModal.tsx, build validation

---

### Phase 4: Chat Widget & Integration

**Goal:** Load @n8n/chat widget without breaking Next.js Server-Side Rendering and apply Emerald Intelligence theme.

**Depends on:** Phase 1

**Requirements:** CHAT-01, CHAT-02, CHAT-03

**Success Criteria** (what must be TRUE):
1. Page loads without "window is undefined" or SSR errors in console
2. Chat widget appears within 2 seconds of page load and is interactive (user can click to open)
3. Chat theme displays Emerald Intelligence colors: button #10b981, chat background #0a0a0a
4. DevTools network tab shows chat connects to n8n webhook URL via NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL environment variable
5. If chat library fails to load, fallback message displays to user (graceful degradation)
6. Page LCP (Largest Contentful Paint) metric unchanged from Phase 1 baseline — chat widget does not delay main content

**Plans:** 1/1 plans complete

---

### Phase 5: Performance & Launch Validation

**Goal:** Optimize Core Web Vitals, validate all features end-to-end, and deploy to Vercel with correct environment variables.

**Depends on:** Phase 1, Phase 2, Phase 3, Phase 4

**Requirements:** MIGR-04, PERF-01, PERF-02

**Success Criteria** (what must be TRUE):
1. User opens site on real mobile device (3G connection) — page loads in < 2.5s (LCP target met)
2. PageSpeed Insights shows all Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 100ms
3. Lighthouse audit shows 90+ scores on Performance, Accessibility, SEO, Best Practices categories
4. User fills contact form, submits, and n8n inbox receives data within 2 seconds (end-to-end integration works)
5. User opens chat, types message, and receives response from n8n bot (chat integration works end-to-end)
6. Site is deployed to Vercel at g2intelligence.co and accessible without errors
7. Vercel Environment Variables are configured; no webhook URLs visible in browser DevTools or build logs
8. DevTools shows zero error console warnings; all network requests succeed or fail gracefully

**Plans:** 1/1 plans complete

Plans:
- [x] 05-01-PLAN.md — Add ISR, production build, Vercel deploy, human env/forms/DNS checkpoint, post-deploy verification

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Technical Setup | 0/1 | Not started | — |
| 2. Local SEO & Metadata Optimization | 0/1 | Not started | — |
| 3. Forms & Integration | 1/1 | Complete   | 2026-04-03 |
| 4. Chat Widget & Integration | 1/1 | Complete   | 2026-04-03 |
| 5. Performance & Launch Validation | 1/1 | Complete   | 2026-04-04 |

---

## Requirements Traceability

**All v1 requirements mapped to phases:**

| Category | Requirement | Phase | Status |
|----------|-------------|-------|--------|
| Migration | MIGR-01 | Phase 1 | Pending |
| Migration | MIGR-02 | Phase 1 | Pending |
| Migration | MIGR-03 | Phase 1 | Pending |
| Migration | MIGR-04 | Phase 5 | Pending |
| SEO Técnico | SEO-01 | Phase 2 | Pending |
| SEO Técnico | SEO-02 | Phase 2 | Pending |
| SEO Técnico | SEO-03 | Phase 2 | Pending |
| SEO Técnico | SEO-04 | Phase 2 | Pending |
| SEO Técnico | SEO-05 | Phase 2 | Pending |
| SEO Técnico | SEO-06 | Phase 2 | Pending |
| SEO Técnico | SEO-07 | Phase 2 | Pending |
| Formularios | FORM-01 | Phase 3 | Pending |
| Formularios | FORM-02 | Phase 3 | Pending |
| Formularios | FORM-03 | Phase 3 | Pending |
| Formularios | FORM-04 | Phase 3 | Pending |
| Formularios | FORM-05 | Phase 3 | Pending |
| Formularios | FORM-06 | Phase 3 | Pending |
| Chat Widget | CHAT-01 | Phase 4 | Pending |
| Chat Widget | CHAT-02 | Phase 4 | Pending |
| Chat Widget | CHAT-03 | Phase 4 | Pending |
| Diseño Visual | UI-01 | Phase 1 | Pending |
| Diseño Visual | UI-02 | Phase 1 | Pending |
| Diseño Visual | UI-03 | Phase 1 | Pending |
| Diseño Visual | UI-04 | Phase 2 | Pending |
| Performance | PERF-01 | Phase 5 | Pending |
| Performance | PERF-02 | Phase 5 | Pending |
| Performance | PERF-03 | Phase 1 | Pending |
| Performance | PERF-04 | Phase 1 | Pending |

**Coverage:** 28/28 v1 requirements mapped ✓

---

## Roadmap Rationale

**Phase Ordering:**

1. **Phase 1 (Foundation)** must execute first. Establishes Next.js architecture, secures environment variables, and prevents critical pitfalls (async params, overzealous 'use client', hardcoded URLs). No feature code can be written safely without this foundation.

2. **Phase 2 (Local SEO)** depends on Phase 1 structure. Metadata must be correct at crawl time; Google re-crawl after fixes takes weeks. Prioritized before launch.

3. **Phase 3 (Forms)** can run in parallel with Phase 2 (no dependencies). Lead capture is core business value; fixing contact form bug is essential. Depends only on Phase 1 API route patterns.

4. **Phase 4 (Chat)** lowest business priority; can run in parallel with Phases 2-3. Nice-to-have feature. Depends on Phase 1 SSR foundation.

5. **Phase 5 (Validation)** runs last, after all features working. Pre-launch quality gate. Ensures Core Web Vitals, end-to-end integration testing, and Vercel deployment success.

**Granularity (COARSE):**

5 phases reflects COARSE granularity setting. Each phase delivers complete, verifiable capability. No artificial splitting; no padding. Work naturally clusters into:
- Foundation (1 phase)
- Content optimization (1 phase)
- Lead capture (1 phase)
- Chat (1 phase)
- Launch (1 phase)

**Success Criteria Philosophy:**

Each criterion is **observable from user perspective**, not implementation task:
- "User sees all 6 sections" (behavior) ✓
- "npm run build succeeds" (verification step) ✓
- "Form data reaches n8n within 2 seconds" (behavior) ✓
- "PageSpeed shows 90+ Performance" (measurement) ✓

Not:
- "Write migration script" ✗
- "Refactor components" ✗
- "Update dependencies" ✗

---

**Roadmap ready for planning phase.**
Next: `/gsd:plan-phase 1`
