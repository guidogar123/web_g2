# G2 Intelligence — Project State

**Project:** G2 Intelligence Website Rebuild (React SPA → Next.js 15)
**Status:** Ready for Phase 1 Planning
**Last Updated:** 2026-04-03

---

## Project Reference

**Core Value:**
Que cuando una empresa del Valle del Cauca busque "inteligencia artificial para ventas" o "automatización de procesos Cali", G2 Intelligence aparezca primero.

**Current Focus:**
Transforming React SPA (Vite) into Next.js 15 App Router site optimized for local Colombian SEO and lead capture.

**Key Numbers:**
- 28 v1 requirements
- 5 phases (COARSE granularity)
- Target: LCP < 2.5s, CLS < 0.1, Core Web Vitals green
- Service area: Cali, Jamundí, Palmira, Yumbo, Valle del Cauca, Colombia
- Contact: hola@g2intelligence.co / +57 350 243 9698

---

## Current Position

**Phase:** 1 (Foundation & Technical Setup)
**Status:** Roadmap complete, awaiting planning and execution

**Progress Bar:**
```
[====-----] Phase 1: 0% (0/? plans complete)
```

**Last Milestone:** Roadmap created (2026-04-03)
**Next Milestone:** Phase 1 completion (TBD)

---

## Phase Overview

### Phase 1: Foundation & Technical Setup [IN PROGRESS]
**Goal:** Establish Next.js 15 App Router with all sections migrated, env vars secured, pitfalls prevented

**Requirements:** 8 mapped (MIGR-01, MIGR-02, MIGR-03, UI-01, UI-02, UI-03, PERF-03, PERF-04)
**Success Criteria:** 8 observable behaviors
**Key Success:**
- `npm run build` succeeds, <100KB gzip, zero async params warnings
- All 6 content sections visible and styled
- No webhook URLs in code/build output
- LocalBusiness schema visible in Rich Results Test

**Blockers:** None
**Dependencies:** None

---

### Phase 2: Local SEO & Metadata Optimization [PLANNED]
**Goal:** Geo-target metadata, add structured data, rank for local searches

**Requirements:** 8 mapped (SEO-01 through SEO-07, UI-04)
**Success Criteria:** 6 observable behaviors
**Key Success:**
- Unique titles/descriptions with city names
- Google Search Console confirms Colombia geo-targeting
- Service schemas show correct provider

**Blockers:** Awaits Phase 1 completion
**Dependencies:** Phase 1

---

### Phase 3: Forms & Integration [PLANNED]
**Goal:** Fix contact form (currently simulated), validate inputs, secure API routes

**Requirements:** 6 mapped (FORM-01 through FORM-06)
**Success Criteria:** 6 observable behaviors
**Key Success:**
- Form data reaches n8n inbox within 2 seconds
- Specific error messages displayed
- Rate limiting prevents spam (429 after 3 requests/5min)

**Blockers:** Awaits Phase 1 API route patterns
**Dependencies:** Phase 1 (can run parallel with Phase 2)

---

### Phase 4: Chat Widget & Integration [PLANNED]
**Goal:** Load @n8n/chat without SSR errors, apply Emerald Intelligence theme

**Requirements:** 3 mapped (CHAT-01, CHAT-02, CHAT-03)
**Success Criteria:** 6 observable behaviors
**Key Success:**
- Widget loads without "window is undefined" errors
- Appears within 2 seconds
- Theme colors match brand (#10b981 emerald, #0a0a0a chat bg)

**Blockers:** None
**Dependencies:** Phase 1 (can run parallel with Phases 2-3)

---

### Phase 5: Performance & Launch Validation [PLANNED]
**Goal:** Optimize Core Web Vitals, validate end-to-end, deploy to Vercel

**Requirements:** 3 mapped (MIGR-04, PERF-01, PERF-02)
**Success Criteria:** 8 observable behaviors
**Key Success:**
- PageSpeed Insights all green (LCP < 2.5s, CLS < 0.1, INP < 100ms)
- Lighthouse 90+ across all categories
- Deployed to g2intelligence.co with environment variables secure

**Blockers:** Awaits all prior phases
**Dependencies:** Phase 1, 2, 3, 4

---

## Architecture Context

**Stack:** Next.js 15 (App Router), React 19, TypeScript 5.x, Tailwind CSS 3.x, shadcn/ui
**Deployment:** Vercel (zero-config Next.js integration)
**Key Integrations:** n8n webhook (chat, scheduling, contact form)
**Auth:** None (B2B consulting, no user accounts)
**Database:** None (static site + n8n backend)

**Key Files:**
- Existing source: `Kimi_Agent_Diseño web G2Intelligence/app/` (React + Vite)
- Current build: `sitio-g2/` (static HTML, currently deployed)
- Brand kit: `G2_Social_Media_Kit/master_brand_kit.md`

**Design Tool:** Stitch MCP (used for Phase 1 UI regeneration)

---

## Known Issues & Constraints

### Critical (Must Fix in This Roadmap)

**Bug: Contact Form Simulation (Contacto.tsx:70-72)**
```javascript
// Current behavior: shows "Enviado" but discards all data
await new Promise((resolve) => setTimeout(resolve, 1500));
```
**Fix:** FORM-01 in Phase 3 — connect to n8n webhook via API route
**Impact:** Lead loss; customers think message sent but it's not

**Hardcoded Webhook URLs**
**Current:** n8n URLs visible in source code
**Fix:** MIGR-03 in Phase 1 — move all to `.env.local` and Vercel env vars
**Impact:** Security risk; URLs act as API keys; visible in git history if not careful

### Secondary (Known, Not Blocking v1)

**Async Params in Dynamic Routes**
**Risk:** Returning undefined params → blank pages
**Prevention:** Phase 1 TypeScript typing + build validation
**Test:** `npm run build` must succeed

**Overuse of 'use client'**
**Risk:** Entire app becomes client-rendered, JS bundle balloons, LCP degraded
**Prevention:** Phase 1 architecture decision — only leaf components marked 'use client'
**Validate:** `layout.tsx` must NOT have `'use client'`

---

## Performance Baselines

**Target Core Web Vitals (Phase 5 success criteria):**
- LCP (Largest Contentful Paint): < 2.5s (current unknown, Phase 1 establishes baseline)
- CLS (Cumulative Layout Shift): < 0.1 (font loading via next/font, fixed dimensions)
- INP (Interaction to Next Paint): < 100ms (minimal client JS)

**JavaScript Bundle Target:** < 100KB gzip (Phase 1 validation)

**Lighthouse Target:** 90+ across Performance, Accessibility, SEO, Best Practices

---

## Decisions Made

| Decision | Rationale | Status |
|----------|-----------|--------|
| Next.js 15 App Router (not Pages Router) | SSR/SSG required for SEO; App Router is 2025+ standard | ✓ Locked in PROJECT.md |
| Stitch MCP for UI design | User explicit choice; regenerates screens with brand identity | ✓ Locked in PROJECT.md |
| Same n8n webhook for all forms | Already proven for chat/scheduling; avoid new infrastructure | ✓ Confirmed in REQUIREMENTS.md |
| No blog/CMS in v1 | Reduce scope; SEO via service descriptions sufficient | ✓ Out of Scope in PROJECT.md |
| Server-first architecture (Client Components only for forms/chat) | Minimizes JS, maximizes SSR benefits, enables async metadata | ✓ Roadmap enforced |
| Vercel deployment | Zero-config, best-in-class Next.js support, generous free tier | ✓ CONSTRAINTS in PROJECT.md |

---

## Accumulated Context

### Setup Assumptions
- Existing React SPA source lives at `Kimi_Agent_Diseño web G2Intelligence/app/`
- Emerald Intelligence color palette locked: #050505 (void black), #10b981 (emerald), #0d1117 (deep slate)
- n8n webhook endpoint: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
- Webhook expects payloads: `{ type: 'contact'|'scheduling'|'chat', ... fields ... }`
- Fonts: Inter (sans-serif), Roboto Mono (monospace) via next/font (no FOUT)
- Icons/Images: From existing SPA where possible; Stitch MCP for new screens

### SEO Context
- Target geo: Cali, Jamundí, Palmira, Yumbo, Valle del Cauca, Colombia
- Primary keywords: "inteligencia artificial para ventas", "automatización Cali", "agentes inteligentes"
- Competitor landscape: General tech consultancies without AI specialization (low local authority)
- CMS: None in v1 (static content only)

### Webhook Integration Context
- Chat widget: Uses `@n8n/chat` library, connects directly to n8n (acceptable for streaming)
- Forms: POST to Next.js API routes (not direct to n8n, prevents CORS + enables rate limiting)
- Rate limiting: Server-side, max 3 requests per IP per 5 minutes (Phase 3)
- Logging: All submissions logged for audit trail (n8n input + client-side logs)

### Brand/Design Context
- Logo: Emerald Intelligence wordmark (exists, no redesign)
- 6 content sections: Hero, Servicios, Nosotros, Equipo, Contacto, Footer (all must be present)
- Chat widget theme: Button #10b981, chat background #0a0a0a (dark mode, emerald accents)
- Visual tone: Futurista, minimalista, premium — "high-end research facility" aesthetic

---

## Open Questions

**For Phase 1 Planning:**
1. Should we use `next/image` for all images or keep some as `<img>` placeholders until Stitch MCP generates assets?
2. Which existing React components can be reused vs. need full redesign with Stitch MCP?
3. Where does `/public` directory sit? Should brand assets (logo, OG image) already exist, or will Stitch generate them?

**For Phase 2 Planning:**
1. Should each service get its own `/servicios/[slug]` page or remain section-based on homepage? (v2 scope?)
2. Which Colombian keywords should `generateMetadata()` target? Need keyword research output.

**For Phase 3 Planning:**
1. Exact n8n webhook schema for contact form — is it exactly `{ type: 'contact', nombre, email, empresa, mensaje }` or different field names?
2. Should error logs be sent to Sentry or stored locally?

**For Phase 5 Planning:**
1. g2intelligence.co domain — is it already pointing to current `sitio-g2/`? When should we point DNS to Vercel?
2. SSL certificate — does Vercel auto-provision or do we need manual setup?

---

## Session Continuity

**What This Session Did:**
- Analyzed 28 v1 requirements already mapped to 5 phases
- Validated 100% requirement coverage
- Derived 2-8 observable success criteria per phase
- Created ROADMAP.md with phase details, traceability, and sequencing rationale
- Created STATE.md (this document) for project memory
- Locked phase structure: Foundation → SEO → Forms → Chat → Validation

**Handoff to Phase 1 Planning:**
- ROADMAP.md ready for `/gsd:plan-phase 1`
- Phase 1 dependencies clear: Foundation (no dependencies)
- Phase 1 scope: 8 requirements, 8 success criteria
- Success gates: `npm run build` < 100KB, zero async params, no hardcoded URLs, LocalBusiness schema valid

**If Session Lost:**
- Read `.planning/ROADMAP.md` for phase goals and requirements
- Read `.planning/PROJECT.md` for core value and constraints
- Read `.planning/REQUIREMENTS.md` for v1 scope
- Roadmap is source of truth for phase sequencing and success criteria

---

*Project state initialized: 2026-04-03*
*Roadmap mode: YOLO (auto-approve execution)*
*Config granularity: COARSE (5 phases)*
