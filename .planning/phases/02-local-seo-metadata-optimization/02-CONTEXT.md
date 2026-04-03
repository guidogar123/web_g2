# Phase 2: Local SEO & Metadata Optimization - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Add geo-targeted metadata, structured data (LocalBusiness + Service schemas), sitemap.xml, robots.txt, Open Graph/Twitter Card tags, and an Emerald Intelligence OG image to the Next.js project at `sitio-g2-nextjs/`. Phase ends when each page has unique `<title>` and `<meta description>` with city names, Service schemas pass Rich Results Test, sitemap.xml lists all routes, and social media link previews show the correct OG image.

</domain>

<decisions>
## Implementation Decisions

### Metadata Strategy
- Use Next.js 15 `generateMetadata()` in `app/layout.tsx` for site-wide defaults
- Override per-page in `app/page.tsx` with home-specific geo-targeted metadata
- Primary keywords: "inteligencia artificial para ventas", "automatización Cali", "agentes inteligentes"
- Geo keywords: Cali, Jamundí, Palmira, Yumbo, Valle del Cauca, Colombia
- Title format: "G2 Intelligence — [Page Topic] | IA para Empresas en Cali"
- Meta description: 140-160 chars, includes city name + primary keyword + CTA

### Structured Data
- LocalBusiness schema already in layout.tsx (from Phase 1) — enhance with additional fields
- Add Service schema JSON-LD for each of the 6 services (array of Service objects)
- Place all JSON-LD in layout.tsx `<head>` via `<script type="application/ld+json">`
- Schema.org types: LocalBusiness, Service, Organization

### Sitemap & Robots
- Use Next.js built-in `app/sitemap.ts` (returns `MetadataRoute.Sitemap`)
- Use Next.js built-in `app/robots.ts` (returns `MetadataRoute.Robots`)
- Sitemap lists: `/` (homepage), and any future pages
- robots.txt: allow all (`User-agent: *, Allow: /`), with Sitemap pointer

### Open Graph & Twitter Cards
- OG image: 1200×630px static image at `/public/og-image.png`
- Emerald Intelligence branding: void black background (#050505), emerald text (#10b981)
- OG image contains: G2 Intelligence logo/wordmark + tagline + brand colors
- Use Next.js `app/opengraph-image.tsx` (Next.js auto-generates OG image via @vercel/og)
- Twitter Card: summary_large_image type

### OG Image Generation
- Use Next.js built-in `opengraph-image.tsx` with `ImageResponse` from `next/og`
- Renders brand identity in JSX — no external tool needed
- Size: 1200×630, background: #050505, accent: #10b981
- Content: "G2 Intelligence" heading + "Transformamos Empresas con Inteligencia Artificial" + "Cali, Colombia"

### Claude's Discretion
- Exact keyword placement in titles/descriptions (natural language, not keyword-stuffed)
- Additional LocalBusiness fields (priceRange, openingHours, etc. if appropriate)
- Service schema detail level
- Whether to use a single JSON-LD block or multiple

</decisions>

<code_context>
## Existing Code Insights

### Phase 1 Deliverables (available to use)
- `sitio-g2-nextjs/src/app/layout.tsx` — has LocalBusiness schema (basic), next/font, Toaster
- `sitio-g2-nextjs/src/app/page.tsx` / `HomeClient.tsx` — home page with 6 sections
- `sitio-g2-nextjs/src/components/sections/Servicios.tsx` — has 6 service names/descriptions
- Colors: --color-emerald #10b981, --color-void #050505, --color-slate #0d1117

### Target Keywords (primary)
- "inteligencia artificial para ventas Cali"
- "automatización de procesos Cali Colombia"
- "agentes inteligentes Valle del Cauca"
- "consultoría IA empresas colombianas"
- "IA para negocios Cali"

### Service Names (for Service schemas)
1. Infraestructura de IA
2. Optimización de Procesos
3. Aumento de Ventas con IA
4. Consultoría Estratégica en IA
5. Análisis de Datos con IA
6. Integración de Sistemas con IA

### Business Info
- Name: G2 Intelligence
- Email: hola@g2intelligence.co
- Phone: +57 350 243 9698
- Address: Cali, Valle del Cauca, Colombia
- URL: https://g2intelligence.co
- areaServed: ["Cali", "Jamundí", "Palmira", "Yumbo", "Valle del Cauca", "Colombia"]

</code_context>

<specifics>
## Specific Ideas

- Use Colombian Spanish in all metadata (es-CO locale)
- `<html lang="es-CO">` in layout.tsx
- Canonical URL set to https://g2intelligence.co
- OG image text: "G2 Intelligence" (large) + "IA que Transforma Empresas en Colombia" + brand emerald color
- Service schemas should reference `provider: { @type: Organization, name: G2 Intelligence, url: https://g2intelligence.co }`
- Add `geo.region` meta tag: `CO-VAC` (Valle del Cauca IANA code)
- Add `geo.placename` meta tag: `Cali, Colombia`
- Add `ICBM` meta tag (lat/long for Cali: 3.4516, -76.5320)

</specifics>

<deferred>
## Deferred Ideas

- Individual service page metadata (`/servicios/[slug]`) — v2 scope
- Blog post metadata — out of scope v1
- Google Search Console verification meta tag — Phase 5 / post-deploy
- hreflang tags — only needed if multi-language (not in v1)
- Google Analytics / Tag Manager — out of scope v1
</deferred>
