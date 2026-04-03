# Phase 5: Performance & Launch Validation - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 100ms), add next/image for any remaining non-optimized images, deploy to Vercel with correct environment variables, and validate all features end-to-end. Phase ends when the site is live at g2intelligence.co (or a Vercel preview URL), PageSpeed Insights shows green Core Web Vitals, and a Lighthouse audit scores 90+ across all categories.

</domain>

<decisions>
## Implementation Decisions

### Performance Optimizations
- Add `next/image` for any images used in components (team photos, service icons if any)
- Ensure all `<img>` tags are replaced with `<Image>` from `next/image`
- Add `priority` prop to Hero's primary image/content (LCP element)
- Review font loading — Inter and Roboto Mono already via next/font (FOUT prevented from Phase 1)
- Check for layout shift sources: fixed dimensions on all images, font display: swap already set

### Vercel Deployment
- Deploy to Vercel using `vercel --prod` CLI or GitHub integration
- Set environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`
  - `N8N_WEBHOOK_URL`
- Domain: g2intelligence.co — DNS CNAME/A record pointing to Vercel
- SSL: auto-provisioned by Vercel
- Note: DNS change is a HUMAN ACTION (user must configure domain registrar)

### End-to-End Validation
- Test contact form submission → verify n8n receives data
- Test schedule modal → verify n8n receives scheduling data
- Test chat widget → verify connection to n8n
- Test all 6 sections render correctly in browser

### What Can Be Done Automatically vs. Manually
- **Automatic:** next/image additions, build optimization, `vercel deploy`
- **Manual (human):** DNS configuration, Vercel env var setup, PageSpeed Insights check
- **The plan should produce a Vercel preview URL** that can be validated before DNS cutover

### Bundle Analysis
- Run `ANALYZE=true npm run build` if `@next/bundle-analyzer` is available
- Or check `npm run build` output's "First Load JS" numbers
- Target: shared JS < 150KB (Phase 1 plan adjusted target from 100KB to realistic)

### PERF-03 Image Optimization
- Phase 1 sections are mostly icon/text based (lucide icons, no raster images)
- Check each section file for any `<img>` tags that should be `<Image>`
- Team section (Equipo.tsx): if team member photos exist as raster images, convert to next/image
- If no raster images exist yet, PERF-03 is satisfied by architecture (next/image ready to use)

</decisions>

<code_context>
## Existing Code Insights

### Current Site State (after Phases 1-4)
- Next.js 16.2.2, TypeScript, Tailwind v4, shadcn/ui (nova preset)
- All 6 sections: Hero, Servicios, Nosotros, Equipo, Contacto, Footer
- Phase 2: geo metadata, Service schemas, sitemap.xml, robots.txt, OG image
- Phase 3: contact form → n8n API route, schedule form → n8n API route, Zod, rate limiting
- Phase 4: @n8n/chat widget with SSR safety, Emerald theme
- Build: clean, 7 routes (2 dynamic API routes + 5 static)

### Environment Variables Required for Vercel
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
- `N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`

### Vercel Setup
- Project: new Vercel project linked to this GitHub repo
- Root directory: `sitio-g2-nextjs` (not the repo root)
- Framework: Next.js (auto-detected)
- Build command: `npm run build` (default)
- Output: `.next` (default)

</code_context>

<specifics>
## Specific Ideas

- Run `npm run build` and check First Load JS numbers in the output
- Add `export const revalidate = 3600` to page.tsx for hourly revalidation (ISR)
- Check for `<img>` vs `<Image>` in all section files
- Vercel CLI: `npx vercel --cwd sitio-g2-nextjs` for deployment
- After deploy: run `curl -I https://[preview-url]` to check HTTP headers
- Human actions needed: DNS change, Vercel env vars, Google Search Console submission

</specifics>

<deferred>
## Deferred Ideas

- A/B testing — out of scope v1
- Edge functions — not needed for this site
- Redis caching — in-memory rate limiting sufficient for v1
- Advanced image optimization (AVIF specific) — WebP default from next/image is sufficient
- Custom 404 page design — default is acceptable for v1
</deferred>
