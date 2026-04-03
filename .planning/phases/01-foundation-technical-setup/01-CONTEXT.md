# Phase 1: Foundation & Technical Setup - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a new Next.js 15 App Router project at `sitio-g2-nextjs/` with all 6 content sections migrated/generated, webhook URLs in environment variables, fonts via next/font, images via next/image, and strict TypeScript. The phase ends when `npm run build` succeeds with <100KB gzip, zero async params warnings, and no hardcoded webhook URLs in the codebase.

</domain>

<decisions>
## Implementation Decisions

### Project Structure
- Create new `sitio-g2-nextjs/` folder — clean Next.js project, existing React source untouched
- Extract only text/content from existing React; UI regenerated with Stitch MCP (no copying components)
- Re-install `shadcn/ui` fresh in the Next.js project (not copy from React project)
- Use `src/components/sections/` for page section components (consistent with shadcn/Next.js conventions)

### Stitch MCP Strategy
- Use Stitch MCP to generate all 6 content sections: Hero, Servicios, Nosotros, Equipo, Contacto, Footer
- Provide Stitch with: Emerald Intelligence philosophy + brand colors (#050505, #10b981, #0d1117) + all text content from each section
- Navigation and ScheduleModal are migrated manually from React (already functional, tested)
- ChatWidget is migrated manually (handled in Phase 4)
- Stitch outputs React + TypeScript components with Tailwind (compatible with Next.js directly)

### Component Architecture
- Server Components for all content sections (Hero, Servicios, Nosotros, Equipo, Footer)
- `'use client'` only on: Navigation (scroll state), ScheduleModal (form/state), ChatWidget (n8n, Phase 4)
- Single page `/` with section anchors (`#hero`, `#servicios`, `#nosotros`, `#equipo`, `#contacto`)
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` for chat widget (client-visible acceptable)
- `N8N_WEBHOOK_URL` server-only for API routes (forms — Phase 3)
- TypeScript strict mode maintained (`"strict": true`)

### Claude's Discretion
- Next.js App Router directory structure (`app/`, `public/`, `src/`)
- Exact shadcn/ui component selection (use same set as existing React project)
- Tailwind configuration details (extend with brand colors as CSS vars)
- LocalBusiness schema placement (layout.tsx as JSON-LD script tag)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Text content from: `Hero.tsx` (heading, subtitle, stats), `Servicios.tsx` (6 service names/descriptions/features), `Nosotros.tsx`, `Equipo.tsx`, `Contacto.tsx` (contact info, social links), `Footer.tsx`
- Navigation links: `#hero`, `#servicios`, `#nosotros`, `#equipo`, `#contacto` — preserve same anchors
- ScheduleModal.tsx — migrate as-is with 'use client', minimal changes for Next.js
- Contact info: `hola@g2intelligence.co`, `+57 350 243 9698`
- Social links: Facebook, Twitter/X, Instagram, TikTok (see Contacto.tsx)
- Stats: +50 Proyectos Agenticos, 3x Aumento en Ventas, 98% Clientes Satisfechos

### Established Patterns
- Tailwind utility-first styling — all styles via className
- PascalCase for section components (Hero, Servicios, etc.)
- `cn()` utility from `lib/utils.ts` for className merging
- 2-space indentation, semicolons, strict TypeScript
- Default exports for components, named for utilities
- No barrel files — direct imports

### Integration Points
- n8n webhook URL (currently hardcoded): `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
- This becomes `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` and `process.env.N8N_WEBHOOK_URL`
- `@n8n/chat` package — needs `dynamic(() => import(...), { ssr: false })` in Next.js

</code_context>

<specifics>
## Specific Ideas

- LocalBusiness schema in `app/layout.tsx` as `<script type="application/ld+json">` in `<head>`
- areaServed: ["Cali", "Jamundí", "Palmira", "Yumbo", "Valle del Cauca", "Colombia"]
- Emerald Intelligence design philosophy from `G2_Social_Media_Kit/emerald_intelligence_philosophy.md` should be fed to Stitch as design brief
- Canvas particle animation from Hero.tsx can be ported as 'use client' component if desired, or Stitch generates a new hero animation

</specifics>

<deferred>
## Deferred Ideas

- Individual service pages (`/servicios/ia-para-ventas`) — v2 scope per REQUIREMENTS.md
- Blog/CMS — explicitly out of scope
- Contact form actual submission logic — Phase 3
- Chat widget initialization — Phase 4
- Core Web Vitals validation — Phase 5
</deferred>
