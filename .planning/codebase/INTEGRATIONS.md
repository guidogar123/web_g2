# Integrations

**Analysis Date:** 2026-06-19

## n8n Chat Widget

**Purpose:** Client-facing AI chat assistant embedded in the website.

**Implementation:**
- `@n8n/chat` ^1.14.0 npm package
- Two-component pattern for SSR safety:
  1. `ChatWidgetWrapper.tsx` — Client component using `dynamic(() => import('./ChatWidget'), { ssr: false })` to avoid server-side rendering
  2. `ChatWidget.tsx` — Actual widget initializer using `createChat()` from `@n8n/chat`
- Rendered on the Home page via `HomeClient.tsx`
- Graceful degradation: widget is disabled entirely when `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` env var is absent

**Configuration:**
- Mode: `'window'` (floating button + popup chat window)
- Custom dark theme matching brand colors (emerald accent, void black background)
- Spanish i18n with custom welcome messages
- `showWelcomeScreen: true`

**Flow:** Client browser → `@n8n/chat` widget → n8n webhook server (direct connection)

## n8n Webhook Backend

**Purpose:** Server-side proxy for form submissions, keeping n8n endpoint private.

**Architecture:**
- Two API routes acting as proxy to a single server-side n8n webhook:

### `/api/webhook/n8n/contact` (POST)
- Accepts: `{ nombre, email, empresa?, mensaje }`
- Server-side validation via Zod `ContactSchema`
- Rate limited: 3 req / 5 min per IP (in-memory `Map`)
- Forwards validated payload to `N8N_WEBHOOK_URL` with `type: "contact"`

### `/api/webhook/n8n/schedule` (POST)
- Accepts: `{ nombre, email, telefono, fecha, hora }`
- Server-side validation via Zod `ScheduleSchema`
- Rate limited: 3 req / 5 min per IP (in-memory `Map`)
- Forwards validated payload to `N8N_WEBHOOK_URL` with `type: "scheduling"`

**Security:**
- Server-only env var `N8N_WEBHOOK_URL` never exposed to client
- Client-side localStorage rate limit (client-side cooldown/ban) as additional layer
- D-locked payload shapes prevent injection of extra fields
- No PII stored server-side; audit logs only capture email domain + IP prefix

## Vercel Deployment

**Purpose:** Production hosting and delivery.

**Configuration:**
- `output: "standalone"` in next.config.ts
- Custom redirect rule: `www.g2intelligence.co/*` → `g2intelligence.co/*` (permanent 308)
- Custom domain: `g2intelligence.co`

## SEO / Search Engine Integration

**Sitemap:** `src/app/sitemap.ts`
- 16 URLs: homepage (weekly, priority 1.0) + 15 city pages (monthly, priority 0.8)

**Robots.txt:** `src/app/robots.ts`
- Full crawl permission for all user agents
- References `https://g2intelligence.co/sitemap.xml`

**Structured Data (JSON-LD):**
- `LocalBusiness` schema in root layout (name, address, phone, email, area served, social links)
- `ItemList` of 6 services in root layout
- Per-city `LocalBusiness` schema on city pages with local geo data

**Social Media / Open Graph:**
- Facebook: `fb:app_id: A74MnrVggi4x-GZO31bxtCU`
- Twitter/X: `@summary_large_image` cards
- Open Graph: Full metadata on every page with locale `es_CO`
- Geo metadata: `geo.region`, `geo.placename`, `ICBM` per city page

## Social Media Links

Used in Contacto section and layout metadata:
- Facebook: `facebook.com/G2Intelligence`
- X/Twitter: `x.com/g2intelligen_co`
- Instagram: `instagram.com/g2intelligence_co/`
- TikTok: `tiktok.com/@g2intelligence_co`

## External Fonts

- **Inter** — Primary sans-serif font (400, 600 weights)
- **Roboto Mono** — Loaded but currently unused in visible UI (may be intended for code/monospace use)

## Integration Concerns

1. **Rate limiter is in-memory** — In serverless deployments (Vercel), each instance has its own memory. A rotating attacker can bypass the 3-request limit by hitting different instances.
2. **Chat webhook URL is public** — `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` is accessible via browser devtools. Anyone can send messages to the n8n chat endpoint directly.
3. **No webhook response validation** — The n8n proxy routes don't validate the shape/content of n8n's response beyond checking `response.ok`.
