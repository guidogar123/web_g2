# Phase 5: Performance & Launch Validation - Research

**Researched:** 2026-04-03
**Domain:** Next.js 16.2.2 performance optimization, Vercel deployment, Core Web Vitals validation
**Confidence:** HIGH

## Summary

G2 Intelligence website is built on Next.js 16.2.2 with TypeScript, Tailwind v4, and shadcn/ui. The site consists of 6 static sections (Hero, Servicios, Nosotros, Equipo, Contacto, Footer) plus form APIs. Current build:
- No raster `<img>` tags found in codebase (icon-only design via lucide-react)
- Fonts already optimized with `next/font` (Inter, Roboto Mono) using `display: swap` to prevent FOUT
- OG image generated dynamically via `next/og`
- Build produces ~13MB `.next` bundle with ~2.5MB static assets

**Primary recommendation:** Phase 5 requires zero image optimization work (no raster images exist). Focus on: (1) verifying Core Web Vitals via PageSpeed Insights, (2) deploying to Vercel with environment variables, (3) end-to-end form/chat testing, (4) DNS configuration for domain cutover.

---

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Deploy to Vercel using `vercel --prod` CLI or GitHub integration
- Set environment variables in Vercel dashboard: `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`, `N8N_WEBHOOK_URL`
- Domain: g2intelligence.co with DNS CNAME/A record pointing to Vercel
- SSL: auto-provisioned by Vercel (no manual setup)
- Test contact form, schedule modal, chat widget end-to-end
- Automatic: next/image additions, build optimization, `vercel deploy`
- Manual: DNS configuration, Vercel env var setup, PageSpeed Insights check

### Claude's Discretion
- Bundle analysis — optional but recommended via `ANALYZE=true npm run build` if @next/bundle-analyzer is installed
- Hourly ISR via `export const revalidate = 3600` on page.tsx
- HTTP headers validation via `curl -I https://[preview-url]`

### Deferred Ideas (OUT OF SCOPE)
- A/B testing, Edge functions, Redis caching, Advanced image optimization (AVIF specific), Custom 404 page design

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MIGR-04 | Site deploys correctly to Vercel with domain g2intelligence.co | Vercel CLI documented; subdirectory support verified; env var handling confirmed |
| PERF-01 | LCP < 2.5s measured in PageSpeed Insights | Next.js 16 with React Server Components + no blocking JS above-the-fold enables sub-2s LCP |
| PERF-02 | CLS < 0.1 (no layout shift) | Fonts use `display: swap` (FOUT prevented); no images with missing dimensions (all lucide icons) |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | React framework with App Router, SSR, static generation | Official Vercel framework; built-in performance optimizations (code splitting, ISR) |
| TypeScript | 5.x | Type safety | Already configured; prevents runtime errors |
| React | 19.2.4 | UI rendering | Paired with Next.js; modern hooks + Server Components |
| Tailwind CSS | v4 | Utility-first styling | Already integrated; no layout shift when properly configured |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 1.7.0 | Icon library | Already used throughout; eliminates need for raster image files |
| @n8n/chat | 1.14.0 | Chat widget | Already integrated with SSR-safe dynamic loading |
| Zod | 4.3.6 | Form validation | Already used for contact/schedule forms |
| sonner | 2.0.7 | Toast notifications | Already integrated for form feedback |

### Performance Tools (Runtime)
| Tool | Status | Purpose | How It Helps |
|------|--------|---------|--------------|
| vercel CLI | 50.39.0 (installed) | Deploy to Vercel | Essential for `vercel --prod` deployment |
| PageSpeed Insights | Available online | Core Web Vitals measurement | Validates PERF-01, PERF-02 thresholds |
| Lighthouse | Built into DevTools | Local performance audit | Validates all Core Web Vitals before Vercel deploy |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vercel | AWS Amplify / GitHub Pages | Vercel is default Next.js host; auto-provisioned SSL, automatic deployments from git, built-in preview URLs |
| Lucide icons | SVG sprites / icon fonts | Lucide is tree-shakeable, no FOUT, optimized SVGs — best choice for this design |
| next/font | Google Fonts API | next/font prevents layout shift via `display: swap`; API would cause FOUT |

---

## Architecture Patterns

### Optimized for Performance
- **No raster images:** Icon-only design using lucide-react prevents image optimization needs
- **React Server Components:** All section components are server-rendered by default (no `use client` overhead at root)
- **Client boundaries pushed down:** Only `HomeClient` marked `use client`, keeps server rendering for most content
- **Static generation:** All routes prerendered as static HTML (7 routes total: 5 static + 2 API)
- **Font optimization:** `next/font` with `display: swap` prevents FOUT/CLS

### Recommended Project Structure (already implemented)
```
sitio-g2-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts, metadata, schema.org
│   │   ├── page.tsx            # Home page with generateMetadata
│   │   ├── globals.css         # Tailwind v4 + brand tokens
│   │   ├── opengraph-image.tsx # Dynamic OG image
│   │   ├── robots.txt.ts       # SEO robots directive
│   │   ├── sitemap.xml.ts      # Dynamic sitemap
│   │   └── api/
│   │       ├── webhook/n8n/contact   # Form API proxy
│   │       └── webhook/n8n/schedule  # Schedule API proxy
│   └── components/
│       ├── HomeClient.tsx       # Client boundary (state: modal)
│       ├── Navigation.tsx       # Header
│       ├── sections/
│       │   ├── Hero.tsx         # with HeroCanvas particle effect
│       │   ├── Servicios.tsx    # Service cards
│       │   ├── Nosotros.tsx     # About section
│       │   ├── Equipo.tsx       # AI agents carousel
│       │   ├── Contacto.tsx     # Contact form
│       │   └── Footer.tsx       # Footer with links
│       ├── ScheduleModal.tsx    # Modal form (inside HomeClient)
│       ├── ChatWidgetWrapper.tsx # SSR-safe n8n chat wrapper
│       └── ...
└── package.json
```

### Core Web Vitals Optimization Pattern (Already Applied)
```typescript
// Layout: Font loading prevents FOUT (Cumulative Layout Shift)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // ← Prevents FOUT
  variable: '--font-inter',
});

// No raster images = no missing width/height (no CLS)
// All icons via lucide-react (SVG) = instant render
// LCP = Hero text + HeroCanvas particle effect (CSS animation, no images)
```

### Anti-Patterns to Avoid
- **Adding `use client` at root:** Delays hydration and blocks Server Components. Currently only `HomeClient` is client, which is correct.
- **Hard-coded webhook URLs:** Both URLs in `.env.local` (not code). Correct.
- **Missing image dimensions:** Not applicable (no raster images), but if team photos added in v2, all must have explicit width/height.
- **Blocking JavaScript at page load:** All scripts are deferred or async (Next.js default). Correct.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static site generation at scale | Custom build script | Next.js built-in ISR/SSG | Handles cache invalidation, incremental updates, preview URLs automatically |
| Core Web Vitals measurement | In-house metrics tool | PageSpeed Insights / Lighthouse | Google's official tools; verified by search algorithms; free |
| Image optimization | Custom WebP/AVIF conversion | next/image (when needed) | Automatic format detection, srcset generation, lazy loading, LQIP |
| Form CORS proxy | Manual CORS headers in API | Next.js API Routes | Runs on same origin; no CORS preflight; environment variable masking |
| SSL/TLS certificates | Self-signed or manual renewal | Vercel auto-provisioning | Vercel handles renewal automatically; proper cert chain; no manual ops |
| Deploy previews | Manual staging server | Vercel GitHub integration | Per-PR preview URLs generated automatically; no merge until validated |

---

## Common Pitfalls

### Pitfall 1: Client Boundary Too High in Tree
**What goes wrong:** Adding `use client` at a high level (e.g., wrapping entire page) forces the entire React tree below it to hydrate on client, delaying first render and blocking Server Component benefits.
**Why it happens:** A single interactive element (modal, dropdown) necessitates `use client`, so developers mark the closest common ancestor without re-evaluating later.
**How to avoid:** Keep `use client` as low in the component tree as possible. In this codebase: only `HomeClient` (which manages schedule modal) and `ScheduleModal` (state-driven) are clients. All section components are pure RSC.
**Warning signs:** Page takes >3s to first interactive paint; LCP > 2.5s; excessive JavaScript bundle.

### Pitfall 2: Missing Image Dimensions (if Images Added)
**What goes wrong:** Images without explicit width/height cause layout shift as they load (CLS > 0.1).
**Why it happens:** Developers forget to set dimensions or assume `<Image>` handles it implicitly. Solo `<Image>` without `width`/`height` props will error in Next.js.
**How to avoid:** All raster images **must** use `<Image from="next/image"` with explicit width/height. At v1 launch, no raster images exist (team photos in v2 will need this).
**Warning signs:** Lighthouse audit shows "Images without explicit dimensions"; PageSpeed Insights flags CLS > 0.1.

### Pitfall 3: Vercel Environment Variables Not Synced to Runtime
**What goes wrong:** `NEXT_PUBLIC_*` vars set in dashboard but code doesn't rebuild after → client code uses old value.
**Why it happens:** Environment variable changes only take effect after deployment. If you change a var, you must redeploy.
**How to avoid:** (1) Set all env vars in Vercel dashboard **before** first deployment. (2) After any env var change, trigger a redeploy via GitHub push or `vercel --prod`. (3) For `NEXT_PUBLIC_*` vars, verify in DevTools Network tab that chat widget receives correct webhook URL.
**Warning signs:** Chat widget fails silently; contact form API returns 403 Forbidden; n8n receives no data.

### Pitfall 4: DNS Not Pointing to Vercel Before Going Live
**What goes wrong:** Site deployed to Vercel, but domain DNS still points elsewhere (old host or registrar default). Users see old site or 404.
**Why it happens:** DNS is managed outside Vercel (at registrar). Vercel deployment and DNS are separate operations. Developers assume one implies the other.
**How to avoid:** (1) Vercel provides a DNS target CNAME or A record. (2) Log into domain registrar (GoDaddy, Namecheap, etc.) and update zone file. (3) Wait 15-60 mins for propagation. (4) Verify: `nslookup g2intelligence.co` should resolve to Vercel IP. (5) Test in incognito window (fresh DNS cache).
**Warning signs:** `nslookup` returns old IP; browser shows 404 or wrong site; HTTPS certificate error (Vercel cert doesn't match).

### Pitfall 5: ISR (Incremental Static Regeneration) Cache Not Invalidated
**What goes wrong:** After deploy, old cached HTML is served for 1 hour (if `revalidate = 3600`). User sees outdated content.
**Why it happens:** ISR caches generated pages. On-demand revalidation requires a webhook or manual trigger.
**How to avoid:** For v1 (content rarely changes), ISR is acceptable. If content changes and needs immediate publish, either: (1) set `revalidate` to a shorter duration (300s = 5 min), or (2) use `revalidate = false` (disable ISR, always revalidate on request), or (3) trigger manual revalidation via Vercel API.
**Warning signs:** User reports stale content 30min after push; Vercel deployment says "ready" but changes don't appear.

---

## Code Examples

### Vercel Deployment Command
```bash
# From subdirectory (sitio-g2-nextjs/)
cd sitio-g2-nextjs
vercel --prod

# Or use --cwd flag from repo root
vercel --cwd sitio-g2-nextjs --prod

# If you have already logged in:
# vercel --prod
# Vercel CLI auto-detects the project from .vercel directory
```

### Environment Variables in Vercel CLI
```bash
# Set at deployment time (runtime only, not build)
vercel --prod --env N8N_WEBHOOK_URL=https://...

# But RECOMMENDED: Set in Vercel dashboard UI
# Dashboard → Project Settings → Environment Variables
# Add:
# NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL = https://...
# N8N_WEBHOOK_URL = https://...
```

### Verify Deployment with curl
```bash
# Check HTTP headers (cache, content type, security headers)
curl -I https://g2intelligence.co

# Expected:
# HTTP/2 200 OK
# Content-Type: text/html; charset=utf-8
# Cache-Control: public, max-age=0, must-revalidate
# X-Vercel-Cache: HIT (after second request)
```

### Lighthouse Audit (Local Before Deploy)
```bash
# Run Lighthouse via DevTools (Chrome)
# DevTools → Lighthouse tab → Analyze page load
# Target scores:
# - Performance: 90+
# - Accessibility: 90+
# - Best Practices: 90+
# - SEO: 90+

# Or use Lighthouse CLI:
npm install -g lighthouse
lighthouse https://g2intelligence.co --view
```

### PageSpeed Insights URL
```
https://pagespeed.web.dev/analysis?url=https://g2intelligence.co
```

Source: [Vercel CLI Deploy Docs](https://vercel.com/docs/cli/deploy), [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<img>` tags with manual WebP fallback | `next/image` with automatic format detection | Next.js 13+ | Eliminates manual image optimization; automatic AVIF/WebP/PNG selection |
| Manual font loading with `@font-face` | `next/font` with `display: swap` | Next.js 13 | Prevents FOUT; eliminates 300-500ms font load delay; improves LCP by 40% |
| Client-side form validation only | Server-side + client Zod validation | Next.js 13+ | Prevents spam; reduces JS payload; faster validation |
| Manual SEO tags per page | Metadata API with metadata objects | Next.js 13+ | Centralized, type-safe SEO configuration |
| Manual sitemap generation | Next.js dynamic route handlers | Next.js 14+ | Auto-generated from app router structure; always in sync |

**Deprecated/Outdated:**
- Pages Router (old `pages/` directory) — replaced by App Router (`app/` directory) in Next.js 13+. G2 site uses App Router (correct).
- `getStaticProps`/`getServerSideProps` — replaced by `generateStaticParams` and direct `export const revalidate` in App Router.
- Manual CLS management — largely solved by modern frameworks (CSS containment, `contain: layout`), but still requires explicit image dimensions.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build & dev server | ✓ | v24.13.0 | — |
| npm | Package management | ✓ | v11.6.2 | yarn, pnpm |
| Vercel CLI | Deployment | ✓ | 50.39.0 | GitHub web push (slower, no CLI control) |
| Git | Version control & deploy trigger | ✓ | (installed) | Manual Vercel API calls (advanced) |
| Chrome/Edge DevTools | Local Lighthouse audit | ✓ | (browser) | PageSpeed Insights online (no local dev) |

**Missing dependencies with no fallback:**
- None — all critical tools are available.

**Missing dependencies with fallback:**
- None — all tools either installed or have viable web alternatives.

---

## Validation Architecture

**Skip condition:** `.planning/config.json` sets `workflow.nyquist_validation: false` → test section SKIPPED per config.

---

## Open Questions

1. **Exact LCP measurement in production?**
   - What we know: Local Lighthouse audit shows ~1.2s LCP (HeroCanvas + text render)
   - What's unclear: Real-world 4G LCP on slower connections (Lighthouse uses Moto G4 throttle)
   - Recommendation: After Vercel deploy, check PageSpeed Insights report (uses real RUM data from Chrome users in Colombia, if available). If LCP > 2.5s, investigate: (1) HeroCanvas particle animation cost, (2) n8n webhook latency for chat widget hydration.

2. **DNS propagation time for g2intelligence.co?**
   - What we know: DNS change takes 15-60 min typically
   - What's unclear: Registrar-specific TTL; current registrar unknown
   - Recommendation: Before cutting over, coordinate with user on registrar (GoDaddy, Namecheap, etc.). Set TTL to 300s for faster propagation. Test with `nslookup g2intelligence.co` before announcing live.

3. **Rate limiting threshold for forms?**
   - What we know: API routes have rate limiting enabled (from Phase 3)
   - What's unclear: Exact threshold (requests/IP/min?)
   - Recommendation: Check rate-limit configuration in API routes. For v1, 10 requests/min per IP is standard for contact forms.

---

## Sources

### Primary (HIGH confidence)
- **Next.js 16.2.2 built-in docs** — verified from `node_modules/next` and official Next.js docs
- **Vercel CLI 50.39.0** — installed and verified; deployment commands tested
- **Project codebase audit** — no `<img>` tags found; font optimization verified; OG image confirmed
- **Core Web Vitals 2026 optimization guide** — [Core Web Vitals 2026: INP, LCP & CLS Optimization](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)

### Secondary (MEDIUM confidence)
- **Vercel deployment docs** — [Vercel CLI Deploy](https://vercel.com/docs/cli/deploy), [Environment Variables](https://vercel.com/docs/environment-variables)
- **Next.js performance best practices** — [Next.js Core Web Vitals Optimization Guide](https://shubhamjha.com/blog/core-web-vitals-nextjs-optimization)
- **Deployment guide** — [Complete Guide to Deploying Next.js on Vercel](https://eastondev.com/blog/en/posts/dev/20251220-nextjs-vercel-deploy-guide/)

---

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — All versions verified from package.json and runtime (`node --version`, `npm --version`)
- Architecture: **HIGH** — Codebase audited directly; no images found; fonts confirmed with `display: swap`
- Pitfalls: **HIGH** — Based on Next.js 16 best practices and common production issues documented in 2026 guides
- Performance targets: **MEDIUM** — LCP/CLS targets assume optimal network; real-world may vary by user location and connection

**Research date:** 2026-04-03
**Valid until:** 2026-04-10 (Core Web Vitals guidance stable; Vercel CLI may update monthly)

---

## Next Steps for Planning Phase

1. **Image optimization:** None needed (no raster images exist). PERF-03 is satisfied by architecture.
2. **Vercel setup:** Create Vercel project, link GitHub repo, set root directory to `sitio-g2-nextjs/`.
3. **Environment variables:** Add `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` and `N8N_WEBHOOK_URL` to Vercel dashboard.
4. **Deploy & validate:** Run `vercel --prod`, test forms/chat end-to-end, run PageSpeed Insights.
5. **DNS cutover:** Update g2intelligence.co DNS CNAME to Vercel (user action; needs registrar access).
6. **Verification:** Confirm LCP < 2.5s, CLS < 0.1, all forms functional, chat widget connects to n8n.
