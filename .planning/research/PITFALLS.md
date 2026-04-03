# Domain Pitfalls: Next.js Migration + Local SEO (Colombia B2B)

**Domain:** Next.js App Router migration from React SPA + local SEO implementation for Colombian service business (B2B)
**Researched:** 2026-04-03
**Confidence:** HIGH (official docs + community patterns verified)

---

## Critical Pitfalls

### Pitfall 1: Forgetting to Await Async Params in Dynamic Routes

**What goes wrong:**
Route parameters return `undefined` in layout/page components. Dynamic routes like `/servicios/[slug]` fail to render content. The browser shows empty sections because the parameter wasn't extracted correctly.

**Why it happens:**
Next.js 15 changed `params` from a synchronous object to a `Promise`. Developers migrating from older versions or forgetting this breaking change use `params.slug` directly instead of `await params` or `use(params)`. The code compiles without errors but silently fails at runtime.

**How to avoid:**
1. **Always await in Server Components:** `const { slug } = await params;`
2. **Use `use()` in Client Components:** Import `use` from React: `const { slug } = use(params);`
3. **Add TypeScript for safety:** Type params as `Promise<{slug: string}>` to catch synchronous access at compile time
4. **Test dynamic routes in development** — access `/servicios/inteligencia-artificial` and verify content renders

**Warning signs:**
- Parameter variables are `undefined` when logged or rendered
- `typeof params.slug` is `"object"` (because it's a Promise, not a string)
- Next.js build passes but page is blank in browser
- Network tab shows page loads but content is missing

**Phase to address:**
Phase 1 (Next.js setup) — must be caught during initial migration testing, not after deploy

---

### Pitfall 2: Overusing 'use client' and Breaking Server Component Boundaries

**What goes wrong:**
Performance degrades catastrophically. The entire app is hydrated as Client Components, defeating Next.js's streaming benefits. LCP (Largest Contentful Paint) increases from 1.2s to 3.5s+. JavaScript bundle balloons. Interactive elements like scheduling modal cause the whole page layout to re-render.

**Why it happens:**
Developers new to Server Components mark everything as `'use client'` because they're familiar with React SPA patterns. Or they import a client library (like `@n8n/chat`) in a layout, forcing that entire subtree to be client-side. The result: no SSR benefit, no streaming, no size reduction.

**How to avoid:**
1. **Keep `'use client'` at the leaf level** — apply to individual interactive components (buttons, forms, modals), not containers or layouts
2. **Design component tree intentionally:**
   - Layout/page → Server Component (SSR'd, no JS shipped)
   - ScheduleModal → Client Component (only this hydrates)
   - Nested under layout, so layout stays server-rendered
3. **Wrap third-party widgets in their own Client boundary:**
   ```typescript
   // app/layout.tsx (Server)
   import ChatWidget from '@/components/ChatWidget';

   // app/components/ChatWidget.tsx (Client)
   'use client';
   import { N8nChat } from '@n8n/chat';
   ```
4. **Verify with Next.js build output** — run `npm run build` and check terminal for tree-shaking stats

**Warning signs:**
- Build size warning: "client bundle > 100KB" for a mostly-static site
- Every page change causes full app re-render (watch for layout flicker)
- LCP metric degrades after migration
- `console.log()` in layout.tsx doesn't appear in terminal (means it's client-rendered)

**Phase to address:**
Phase 1 (architecture decisions) — decide boundary strategy before building, not after

---

### Pitfall 3: Contact Form Sends to Client-Side Webhook Without CORS/Error Handling

**What goes wrong:**
Form submissions sometimes work, sometimes fail silently. Users see "Enviado" confirmation but data never reaches n8n. CORS errors prevent delivery on some browsers/networks. No error message explains why. Leads are lost without anyone noticing.

**Why it happens:**
The current SPA implementation (ScheduleModal.tsx) makes direct fetch() to n8n webhook from browser. If CORS headers aren't properly configured on the n8n endpoint, or if the network is slow/unreliable, the request fails. The error toast says "Error al agendar" but doesn't explain why (CORS? timeout? invalid data?). The form appears to succeed even if it failed.

**How to avoid:**
1. **Use a Next.js API Route as a proxy** (not direct client→n8n calls):
   ```typescript
   // app/api/contact/route.ts (Server)
   export async function POST(request: Request) {
     const body = await request.json();

     // Validate input
     if (!body.email || !body.nombre) {
       return Response.json({ error: 'Missing fields' }, { status: 400 });
     }

     // Call n8n internally (server-to-server, no CORS)
     const response = await fetch(process.env.N8N_WEBHOOK_URL, {
       method: 'POST',
       body: JSON.stringify({ ...body, type: 'contact' }),
       signal: AbortSignal.timeout(5000), // Prevent hanging requests
     });

     if (!response.ok) {
       return Response.json({ error: 'Webhook failed' }, { status: 502 });
     }

     return Response.json({ success: true });
   }
   ```
2. **Make the form call your API route from client:** `POST /api/contact` instead of calling n8n directly
3. **Return specific error messages** so users know what failed (timeout, validation, server error)
4. **Implement retries** for transient failures (network hiccup, temporary n8n downtime)
5. **Log all submissions** server-side so you can audit which ones succeeded/failed

**Warning signs:**
- CORS errors in browser console when testing from localhost
- Form submissions succeed in UI but no data in n8n inbox
- "No error, but no data" (silent failures)
- Forms work on desktop but fail on mobile (network conditions)
- n8n webhook sometimes returns 429 (rate limit) but frontend doesn't retry

**Phase to address:**
Phase 2 (contact form integration) — implement proxy pattern before going live; prevents lost leads post-launch

---

### Pitfall 4: Missing or Incorrect Metadata on Service Pages (Geo-Targeting Failure)

**What goes wrong:**
Service pages rank for national keywords instead of local ones. When someone searches "inteligencia artificial Cali" or "automatización de procesos Jamundí", the site doesn't appear. Google shows generic competitors instead. SEO traffic never materializes.

**Why it happens:**
The new Next.js site has metadata for the homepage but service pages (`/servicios/inteligencia-artificial`, `/servicios/automatizacion`) lack city-specific titles and descriptions. The generateMetadata function isn't implemented or returns generic text. No geo-signals (locality, region, JSON-LD LocalBusiness) in schema markup.

**How to avoid:**
1. **Create geo-specific metadata for each service page:**
   ```typescript
   // app/servicios/[slug]/page.tsx
   export async function generateMetadata(
     { params }: { params: Promise<{slug: string}> }
   ): Promise<Metadata> {
     const { slug } = await params;
     const service = getService(slug);

     return {
       title: `${service.name} en Cali, Jamundí, Palmira | G2 Intelligence`,
       description: `Servicio de ${service.name} en el Valle del Cauca. Especialistas IA para ventas en Cali. Consultoría digital. +57 350 243 9698`,
       openGraph: {
         title: `${service.name} | G2 Intelligence Cali`,
         description: `Transformamos procesos de ventas con IA. Especialistas en Colombia.`,
         images: [{ url: service.image, width: 1200, height: 630 }],
       },
     };
   }
   ```
2. **Add JSON-LD LocalBusiness to layout:**
   ```typescript
   // Include in layout or schema component:
   const schema = {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "G2 Intelligence",
     "areaServed": [
       { "@type": "City", "name": "Cali" },
       { "@type": "City", "name": "Jamundí" },
       { "@type": "City", "name": "Palmira" },
       { "@type": "AdministrativeArea", "name": "Valle del Cauca" }
     ],
     "telephone": "+57 350 243 9698",
     "email": "hola@g2intelligence.co",
   };
   ```
3. **Include city names in H1, H2, service descriptions** (naturally, not keyword-stuffed)
4. **Verify with Google Search Console** — use "Geo-targeting" section to confirm Colombia/Valle setting

**Warning signs:**
- Google Search Console shows impressions for national keywords but no local ones
- Service page title in browser tab is generic ("Service Page" instead of "IA para Ventas Cali")
- Rich results preview in GSC shows no LocalBusiness schema
- Competitors with worse content rank above you for local searches

**Phase to address:**
Phase 1 (SEO setup) — metadata must be correct at launch; fixing later requires re-crawl

---

### Pitfall 5: Mixing Synchronous Page Routes with Dynamic Segments (Build Errors)

**What goes wrong:**
`npm run build` fails. Next.js throws error: "params is a Promise and must be awaited" or similar. The site won't deploy. Local development works but production build breaks.

**Why it happens:**
Dynamic segments in App Router require async/await or `use()`. If a page component tries to synchronously access `params.slug` or uses `Object.keys(params)` to enumerate, the build detects this violation and fails. This is especially common when converting page.tsx files from Pages Router (which had synchronous params).

**How to avoid:**
1. **Mark page components as async if accessing params:**
   ```typescript
   // ✓ Correct
   export default async function ServicePage(
     { params }: { params: Promise<{slug: string}> }
   ) {
     const { slug } = await params;
     return <div>{slug}</div>;
   }
   ```
2. **Never enumerate params:**
   ```typescript
   // ✗ Wrong
   const keys = Object.keys(params); // This will fail build
   ```
3. **Test build locally before deploying:**
   ```bash
   npm run build
   npm run start
   curl http://localhost:3000/servicios/inteligencia-artificial
   ```

**Warning signs:**
- Local `next dev` works but `next build` fails
- Error message mentions "synchronous params" or "Promise"
- Build succeeds but deployment fails (build step works, runtime fails)

**Phase to address:**
Phase 1 (setup) — catch during initial build configuration, not later

---

### Pitfall 6: Client-Side Rate Limiting on Scheduling (Security Bypass)

**What goes wrong:**
The current ScheduleModal uses browser localStorage for rate-limiting (`g2_schedule_cooldown`). Attackers or impatient users clear localStorage or use DevTools and spam the webhook. n8n receives 50+ duplicate scheduling requests from one IP in seconds. The form appears throttled to honest users but isn't actually protected.

**Why it happens:**
Rate-limiting stored only on the browser is advisory (UX only), not enforcement. Any client-side limit can be trivially bypassed. The developer assumes browser controls prevent abuse, but they don't.

**How to avoid:**
1. **Implement server-side rate-limiting on the API route:**
   ```typescript
   // app/api/schedule/route.ts
   const rateLimits = new Map<string, number[]>();

   export async function POST(request: Request) {
     const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
     const now = Date.now();
     const fiveMinutesAgo = now - 5 * 60 * 1000;

     // Get request timestamps for this IP in last 5 mins
     const timestamps = rateLimits.get(clientIP) || [];
     const recentRequests = timestamps.filter(t => t > fiveMinutesAgo);

     if (recentRequests.length >= 3) { // Max 3 per 5 mins
       return Response.json({ error: 'Too many requests' }, { status: 429 });
     }

     recentRequests.push(now);
     rateLimits.set(clientIP, recentRequests);

     // Process scheduling...
   }
   ```
2. **Use client-side limiting for UX only** (disable button, show cooldown timer)
3. **Store session state on backend** (Redis, Upstash, or database) for persistence across devices
4. **Monitor for abuse** — log rapid requests and alert on suspicious patterns

**Warning signs:**
- n8n webhook shows bursts of identical scheduling requests from same email/phone
- Single form submission appears in webhook 5+ times
- Requests all within sub-second intervals
- Same user can bypass "cooldown" by opening form in incognito/different browser

**Phase to address:**
Phase 2 (form integration) — implement before handling production traffic

---

### Pitfall 7: Hardcoded Webhook URLs Exposed in Build Output / Git History

**What goes wrong:**
The n8n webhook URL (which acts as an API key) is visible in:
1. Browser DevTools (client bundle)
2. Git history forever (even if deleted later)
3. Build artifacts and logs

Anyone with access to the source code or build output can call the webhook directly, spam it, or trigger unintended workflows. The URL is a shared secret that should be environment-protected.

**Why it happens:**
The current code has the URL hardcoded in ScheduleModal.tsx and ChatWidget.tsx. It's a quick way to make it work locally, but it exposes the credential. Moving URLs to `.env.local` seems like "extra work" in the moment but is necessary for any serious deployment.

**How to avoid:**
1. **Move all URLs to environment variables** (never in source code):
   ```typescript
   // .env.local (development)
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
   ```
2. **In production, set at deploy time** (Vercel env var, Docker secret, etc.)
3. **Access via `process.env` at server runtime:**
   ```typescript
   // app/api/schedule/route.ts
   const webhookUrl = process.env.N8N_WEBHOOK_URL;
   if (!webhookUrl) throw new Error('N8N_WEBHOOK_URL not set');
   ```
4. **Never expose webhook URL in client JavaScript** — use API route proxy instead
5. **Rotate webhook URL if accidentally exposed** — re-generate in n8n UI
6. **Add .env.local to .gitignore** — prevent accidental commits

**Warning signs:**
- `grep -r "n8n-n8n.ektnbd" .` finds the URL in source files
- `git log --all --source -- "*" | grep webhook` shows URL in commit history
- Browser DevTools Network tab shows POST to n8n with full URL in query/body
- Team members can see webhook URL without backend access

**Phase to address:**
Phase 0 (setup) or Phase 1 (before deployment) — must be fixed before any external testing

---

### Pitfall 8: Dynamic Metadata Calling Slow External APIs During Build

**What goes wrong:**
The `npm run build` process hangs or times out. generateMetadata tries to fetch service details from an external CMS/database for every service page. If the API is slow or down, the build stalls. Large sites with 100+ pages become unbuildable.

**Why it happens:**
generateMetadata can call APIs, but if those APIs are slow (2+ seconds per call), and you have 10 service pages, the build takes 20+ seconds just for metadata. If the API is flaky, one slow response blocks the entire build.

**How to avoid:**
1. **Cache metadata generation** — store results locally or in Redis:
   ```typescript
   // app/servicios/[slug]/page.tsx
   const serviceCache = new Map<string, any>();

   function getService(slug: string) {
     if (serviceCache.has(slug)) return serviceCache.get(slug);

     const service = fetchServiceFromDB(slug); // Make this fast
     serviceCache.set(slug, service);
     return service;
   }
   ```
2. **Use ISR (Incremental Static Regeneration)** for dynamic pages:
   ```typescript
   export const revalidate = 3600; // Revalidate every hour
   ```
3. **Pre-generate critical pages** at build time, defer others:
   ```typescript
   export async function generateStaticParams() {
     // Only pre-generate top 5 services
     return [
       { slug: 'inteligencia-artificial' },
       { slug: 'automatizacion' },
     ];
   }
   ```
4. **Set a timeout on metadata API calls:**
   ```typescript
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), 3000);

   const service = await fetch(url, { signal: controller.signal });
   clearTimeout(timeout);
   ```

**Warning signs:**
- `npm run build` takes >30 seconds for a simple site
- Build hangs indefinitely if external API is down
- `next dev` is fast but `next build` is slow (metadata caching issue)
- Build succeeds locally but times out in CI/CD (Vercel, GitHub Actions)

**Phase to address:**
Phase 2 (content integration) — optimize before scaling beyond 5-10 pages

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode webhook URL in client | Works immediately, no env setup | URL exposed, can't rotate, exposed in git | NEVER — fix in Phase 0 |
| Client-side form rate-limiting only | No backend work required | Easily bypassed, no real protection | Only for UX feedback; add server-side rate-limiting in Phase 2 |
| Skip metadata for "less important" pages | Faster initial build, less code | Those pages never rank, miss leads | NEVER for service pages; acceptable only for internal/admin pages |
| Use Pages Router instead of App Router | Familiar patterns, quicker migration | No SSR benefit, no streaming, defeats migration purpose | NEVER — commit to App Router from start |
| Generic metadata template | Fast to implement | Loses 40% of SEO potential, all pages look identical in search results | Only for Phase 0 MVP; fix in Phase 1 |
| Skip Zod/validation on form input | Fewer dependencies, smaller code | Garbage data to n8n, broken submissions, painful debugging | NEVER — add validation in Phase 1 |
| Fetch data in Client Component | Avoids async/await complexity | Causes hydration mismatch, layout shift, slower perceived speed | NEVER — use Server Components or explicit loading states |

---

## Integration Gotchas

Common mistakes when connecting Next.js to n8n webhooks and third-party services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| n8n webhook (contact form) | Direct fetch from client component | Proxy through Next.js API route; server-to-server calls don't have CORS |
| @n8n/chat widget | Import in layout.tsx, forces entire app to be client-rendered | Wrap widget in separate Client Component boundary; layout stays server-rendered |
| N8N_WEBHOOK_URL | Hardcoded in source or committed to git | Store in .env.local (dev) and environment variables (prod); never expose in client code |
| Form data to webhook | Send raw FormData object | Validate with Zod first; transform to clean JSON; map field names to webhook schema |
| Webhook timeouts | No timeout on fetch, request hangs forever | Always use AbortSignal.timeout(5000) to prevent hanging requests |
| Error responses from webhook | Assume success if response.ok, ignore error details | Check response.status; parse JSON error message; return to client so they know what failed |
| Rapid form submissions | Trust client-side disable button | Implement server-side rate-limiting by IP/email; localStorage limits are UX only |
| Metadata for dynamic pages | Call external API synchronously in generateMetadata | Use ISR (revalidate: 3600); cache results; use generateStaticParams for critical pages |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Single n8n webhook for all events | Works for testing, scales with load | Separate webhook endpoints for chat/scheduling; add n8n queue nodes | >50 scheduling requests/day or >10 chat messages/hour |
| Fetch all services in getService() every time | Works initially, seems fine | Cache service list at build time or in Redis; use ISR for freshness | >20 services or >100 daily page views |
| In-memory rate-limit map (new Map()) | Works during dev | Use persistent storage (Redis, database); in-memory data lost on server restart | Multiple instances or auto-scaling (Vercel Functions restart) |
| Sync database query in generateMetadata | OK for 5 pages | Use caching layer; ISR; pre-generate critical pages; lazy-load secondary pages | Build time >1 minute or database query >500ms |
| Browser localStorage for session state | Works for one device | Implement backend session storage; Firebase Realtime, Supabase, or Upstash | Users switch devices or clear browser data |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Webhook URL exposed in client code | Attacker calls webhook directly; spams n8n; triggers workflows without consent | Move to API route proxy; store URL in .env only; use HTTPS only |
| Form data sent unvalidated | Malformed data; injection attacks; database corruption if data piped directly | Validate on client (UX) + server (security) with Zod; sanitize strings |
| No rate-limiting on webhook | Spam attack; webhook quota exhausted; service becomes slow for legitimate users | Server-side rate-limiting by IP; Redis-backed counter; email verification for scheduling |
| Session data in URL params | Sensitive info visible in browser history, referer logs, URLs shared in chat | Use POST requests; store sensitive data server-side; use HTTP-only cookies if applicable |
| No verification of webhook origin | Attacker forges webhook requests; fake scheduling submissions; wasted n8n processing | Verify webhook signature (n8n can add X-N8N-Signature header); secret key in .env |
| Metadata tags without escaping | XSS if dynamic content inserted into title/description | Use Next.js Metadata API (auto-escaped); test with special chars: <, >, &, " |

---

## UX Pitfalls

Common user experience mistakes in this domain (Next.js + local SEO).

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Error message is generic: "Error al agendar. Intenta de nuevo." | User doesn't know what failed (validation? network? server down?); abandons form | Return specific errors: "Email inválido", "Horario no disponible", "Fallo en servidor. Reintentando..." |
| Form disables button but no loading indicator | User thinks form is frozen; clicks multiple times; doesn't know submission is pending | Show spinner, disable button, disable form inputs, show "Enviando..." message |
| No fallback when metadata is missing | Sharing a service link on WhatsApp/Facebook shows no preview; looks unprofessional | Always generate metadata; use defaults (site name, logo) if dynamic data is missing; test with Link Preview Debugger |
| Scheduling shows unavailable times as disabled but no reason | User is frustrated; doesn't know if they need to book earlier or if slots are actually sold out | Show reason on hover: "Horarios 6am-8pm, lunes-viernes" or "2 días de anticipación mínimo" |
| Service page loads empty then content appears later | CLS (Cumulative Layout Shift); user sees page jump; affects SEO score | Use Suspense with skeleton loaders; pre-allocate space for dynamic content; use ISR to pre-render critical pages |
| All pages show same title in search results | Search results look identical/generic; no one clicks because description is boring | Unique, geo-specific titles per page: "IA para Ventas en Cali" vs. "Automatización de Procesos Jamundí" |
| Chat widget loads after 3 seconds of page idle time | User doesn't notice it exists; chat usefulness is lost if user has already scrolled past | Load chat widget as high-priority; prioritize it in Next.js script strategy (beforeInteractive if lightweight) |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces. Verify during Phase handoff.

- [ ] **Next.js Build:** Build runs locally with `npm run build` and `npm run start` works. Verify on a fresh clone.
- [ ] **Metadata on Service Pages:** Each service page has unique title, description, OG image. Use Google's Rich Results Test or SEO extension to verify.
- [ ] **Webhook URL in Environment:** `process.env.N8N_WEBHOOK_URL` is set and not hardcoded. Verify with `npm run build` logs.
- [ ] **Contact Form Works:** Submit form, verify data appears in n8n inbox. Check for success/error handling.
- [ ] **Async Params Await:** All dynamic routes await params or use `use()`. Verify with `npm run build` — no warnings about synchronous access.
- [ ] **Rate-Limiting on Server:** Rapid-click test (submit form 5 times in 2 seconds) — should block after 3rd attempt. Verify with n8n webhook logs.
- [ ] **CORS Testing:** Submit form from Postman/curl and from browser to confirm API route handles CORS correctly.
- [ ] **Error Messages Shown:** Break webhook URL and test form — user should see specific error, not generic "try again."
- [ ] **'use client' Boundaries Correct:** Verify layout.tsx is NOT marked 'use client'. Check bundle size: should be <100KB JS for this site.
- [ ] **LocalBusiness Schema Renders:** View page source and search for `"@type": "LocalBusiness"` with correct cities.
- [ ] **Form Validation Works:** Submit with blank email — should show error. Submit with invalid phone — should error before webhook call.
- [ ] **Dynamic Routes Pre-Generated:** List all dynamic routes and verify they're generated at build time (or ISR if needed).

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Built entire app as Client Components | HIGH (2-4 hours) | Identify which components are interactive; mark only those with 'use client'; move page/layout to Server Component; rebuild and test |
| Webhook URL exposed in git history | MEDIUM (1-2 hours) | Rotate webhook URL in n8n; remove from code; add .env.local to .gitignore; force-push (if private repo) or accept exposure (if public) |
| Form submissions silently failing | MEDIUM (2-3 hours) | Add logging to API route; verify CORS headers; test webhook directly with curl; compare old/new submissions |
| Metadata missing on pages after deploy | LOW (30 mins) | Verify generateMetadata is exported; check that params are awaited; use Google Search Console to re-request indexing |
| Params are undefined in dynamic routes | LOW (15 mins) | Add `await` before accessing params; test with specific slug; clear .next cache and rebuild |
| Build hangs during metadata generation | MEDIUM (1-2 hours) | Add timeout to API calls; implement ISR for dynamic pages; pre-generate critical pages only |
| Rate-limiting bypassed (spam in webhook) | MEDIUM (1-2 hours) | Implement server-side rate-limiting; rotate webhook if spammed; add CAPTCHA or email verification |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Async params not awaited | Phase 1 (Setup) | `npm run build` passes without "synchronous params" errors; all dynamic routes render content |
| 'use client' boundary mistakes | Phase 1 (Setup) | Bundle size <100KB; LCP <2.5s; layout.tsx is NOT client-rendered (check build output) |
| Webhook URL hardcoded | Phase 0 or Phase 1 | `.env.local` is used; no webhook URL in source code; verify with `grep -r "n8n-n8n" .` |
| CORS/webhook error handling | Phase 2 (Contact Form) | Submit form and break webhook URL; user sees specific error; verify n8n receives no data |
| Contact form silent failure | Phase 2 (Contact Form) | Test direct webhook call with curl; test form submission; confirm in n8n inbox; error logging active |
| Metadata missing on service pages | Phase 1 (SEO Setup) | Each page has unique metadata; Google Rich Results Test shows LocalBusiness schema; pages appear in GSC |
| Client-side rate-limiting only | Phase 2 (Form Integration) | Rapid-click test fails (3rd request returns 429); localStorage can be cleared without bypassing limits |
| Dynamic metadata calls slow APIs | Phase 2 (Content Integration) | Build time <1 minute; ISR is configured; critical pages pre-generated; slow pages use fallback metadata |

---

## Sources

- [Next.js 15 App Router Migration Guide](https://nextjs.org/docs/app/guides/migrating/app-router-migration)
- [Next.js Async Params Breaking Change](https://nextjs.org/docs/messages/sync-dynamic-apis)
- [Next.js Metadata API Official Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Server vs Client Components Best Practices](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [CORS in Next.js — LogRocket Guide](https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/)
- [React Server Components Performance Pitfalls](https://blog.logrocket.com/react-server-components-performance-mistakes)
- [Local SEO for Latin America 2026 — Bluethings](https://www.bluethings.co/blog/seo-in-latin-america-complete-guide)
- [Colombia SEO Market Insights — Ranktracker](https://www.ranktracker.com/blog/a-complete-guide-for-doing-seo-in-latin-america/)
- [n8n Webhook Error Handling Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/)
- [n8n Best Practices for Automation](https://contabo.com/blog/10-n8n-best-practices-for-reliable-workflow-automation/)
- [G2 Intelligence CONCERNS.md — Local codebase audit](../codebase/CONCERNS.md)
- [G2 Intelligence PROJECT.md — Project context](../PROJECT.md)

---

*Pitfalls research for: Next.js + Local SEO migration (Colombia B2B service business)*
*Researched: 2026-04-03*
