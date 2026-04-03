---
phase: 02-local-seo-metadata-optimization
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - sitio-g2-nextjs/src/app/layout.tsx
  - sitio-g2-nextjs/src/app/page.tsx
  - sitio-g2-nextjs/src/app/sitemap.ts
  - sitio-g2-nextjs/src/app/robots.ts
  - sitio-g2-nextjs/src/app/opengraph-image.tsx
autonomous: true
requirements:
  - SEO-01
  - SEO-02
  - SEO-03
  - SEO-04
  - SEO-05
  - SEO-06
  - SEO-07
  - UI-04

must_haves:
  truths:
    - "Browser DevTools <head> shows a unique <title> containing city names (Cali, Valle del Cauca) and a <meta name='description'> between 140-160 chars"
    - "HTML source contains a LocalBusiness JSON-LD block with areaServed listing Cali, Jamundí, Palmira, Yumbo, Valle del Cauca"
    - "HTML source contains a Service JSON-LD block (ItemList) with all 6 services, each with name, description, and provider referencing G2 Intelligence"
    - "GET /sitemap.xml returns valid XML listing https://g2intelligence.co"
    - "GET /robots.txt returns Allow: / and points to sitemap.xml URL"
    - "HTML source contains og:title, og:description, og:image, twitter:card, twitter:title tags in <head>"
    - "GET /opengraph-image returns a 1200x630 PNG image with Emerald Intelligence branding"
    - "<html> tag has lang='es-CO' attribute"
    - "grep CO-VAC finds geo.region meta tag in page source"
    - "No file in sitio-g2-nextjs/src/app/ that exports metadata contains 'use client'"
  artifacts:
    - path: "sitio-g2-nextjs/src/app/layout.tsx"
      provides: "Root layout with metadata defaults, enhanced LocalBusiness + Service JSON-LD, lang=es-CO"
      contains: "metadataBase, openGraph, twitter, other, geo.region CO-VAC, lang=\"es-CO\", servicesSchema"
    - path: "sitio-g2-nextjs/src/app/page.tsx"
      provides: "Homepage with generateMetadata override for geo-targeted SEO"
      exports: ["generateMetadata", "default"]
    - path: "sitio-g2-nextjs/src/app/sitemap.ts"
      provides: "MetadataRoute.Sitemap returning homepage entry"
      exports: ["default"]
    - path: "sitio-g2-nextjs/src/app/robots.ts"
      provides: "MetadataRoute.Robots allowing all, pointing to sitemap"
      exports: ["default"]
    - path: "sitio-g2-nextjs/src/app/opengraph-image.tsx"
      provides: "1200x630 ImageResponse with void black background + emerald branding"
      exports: ["alt", "size", "contentType", "default"]
  key_links:
    - from: "layout.tsx metadata openGraph.images"
      to: "/opengraph-image route"
      via: "metadataBase resolution — Next.js resolves relative /opengraph-image path to absolute URL"
      pattern: "metadataBase.*g2intelligence"
    - from: "sitemap.ts"
      to: "/sitemap.xml response"
      via: "Next.js App Router auto-serves sitemap.ts at /sitemap.xml"
      pattern: "MetadataRoute.Sitemap"
    - from: "robots.ts sitemap field"
      to: "https://g2intelligence.co/sitemap.xml"
      via: "Next.js App Router auto-serves robots.ts at /robots.txt"
      pattern: "MetadataRoute.Robots"
---

<objective>
Implement the complete local SEO and metadata infrastructure for g2intelligence.co: geo-targeted page titles and meta descriptions, enhanced LocalBusiness schema, six Service schemas, auto-generated sitemap.xml and robots.txt, Open Graph + Twitter Card tags, and a branded 1200x630 OG image.

Purpose: Google re-crawl timelines are weeks long. Every day the site lacks correct geo-targeted metadata, structured data, and social preview tags is a delay to local search ranking for "inteligencia artificial para ventas Cali" and related queries. This phase locks in all technical SEO signals before launch.

Output: Five files modified or created in sitio-g2-nextjs/src/app/ that collectively satisfy requirements SEO-01 through SEO-07 and UI-04.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md

<!-- IMPORTANT: Read sitio-g2-nextjs/AGENTS.md before writing any code.
     It warns that this Next.js version has breaking changes vs training data.
     Check node_modules/next/dist/docs/ for the relevant APIs before implementation. -->
</context>

<interfaces>
<!-- Current state of sitio-g2-nextjs/src/app/layout.tsx (Phase 1 baseline).
     Executor must enhance this file — do not rewrite from scratch. -->

```typescript
// sitio-g2-nextjs/src/app/layout.tsx — CURRENT STATE (Phase 1 output)
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'G2 Intelligence — Inteligencia Artificial para Empresas en Cali y Valle del Cauca',
  description:
    'G2 Intelligence ayuda a empresas colombianas a adoptar IA agentica, optimizar procesos y multiplicar ventas. Servicios en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'G2 Intelligence',
  description: 'Empresa de inteligencia artificial y automatización de procesos para empresas colombianas',
  url: 'https://g2intelligence.co',
  telephone: '+573502439698',
  email: 'hola@g2intelligence.co',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressRegion: 'Valle del Cauca',
  },
  areaServed: ['Cali', 'Jamundí', 'Palmira', 'Yumbo', 'Valle del Cauca', 'Colombia'],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61552402294706',
    'https://x.com/g2intelligen_co',
    'https://www.instagram.com/g2intelligence_co/',
    'https://www.tiktok.com/@g2intelligence_co',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
```

<!-- Current state of sitio-g2-nextjs/src/app/page.tsx (Phase 1 baseline).
     Executor adds generateMetadata export — the default export is unchanged. -->

```typescript
// sitio-g2-nextjs/src/app/page.tsx — CURRENT STATE (Phase 1 output)
import HomeClient from '@/components/HomeClient';

export default function Home() {
  return <HomeClient />;
}
```

<!-- Service names and descriptions (from CONTEXT.md) for JSON-LD Service schema -->
// 6 services for Schema.org ItemList:
// 1. Infraestructura de IA — Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real.
// 2. Optimización de Procesos — Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa.
// 3. Aumento de Ventas con IA — Integramos herramientas de IA en tu ciclo de ventas para identificar oportunidades, personalizar propuestas y cerrar más negocios.
// 4. Consultoría Estratégica en IA — Guiamos a tu empresa en la adopción de IA: diagnóstico, hoja de ruta, selección de herramientas y gestión del cambio organizacional.
// 5. Análisis de Datos con IA — Convertimos tus datos en decisiones con dashboards inteligentes, modelos predictivos y análisis automatizados.
// 6. Integración de Sistemas con IA — Conectamos tus herramientas existentes con capacidades de IA para flujos de trabajo unificados y sin fricciones.
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Enhance layout.tsx — metadata defaults, geo tags, enhanced JSON-LD schemas</name>
  <files>sitio-g2-nextjs/src/app/layout.tsx</files>
  <action>
Read sitio-g2-nextjs/AGENTS.md first, then check node_modules/next/dist/docs/ for the metadata API docs relevant to this Next.js version before writing any code.

Rewrite the `export const metadata: Metadata` object (keeping all existing imports and the rest of the file intact) to include:

1. `metadataBase: new URL('https://g2intelligence.co')`
2. `title: { default: 'G2 Intelligence — IA para Empresas en Cali', template: '%s | G2 Intelligence' }`
3. `description`: geo-targeted, 140-160 chars — "G2 Intelligence ayuda a empresas de Cali, Jamundí, Palmira, Yumbo y Valle del Cauca a adoptar IA, automatizar procesos y multiplicar ventas con agentes inteligentes." (count chars, adjust if needed)
4. `keywords: ['inteligencia artificial para ventas Cali', 'automatización de procesos Cali Colombia', 'agentes inteligentes Valle del Cauca', 'consultoría IA empresas colombianas', 'IA para negocios Cali', 'G2 Intelligence']`
5. `openGraph`: type 'website', locale 'es_CO', siteName 'G2 Intelligence', url 'https://g2intelligence.co', title 'G2 Intelligence — IA que Transforma Empresas en Cali', description (same as meta description but may be shorter), images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'G2 Intelligence — IA para Empresas en Cali, Colombia' }]
6. `twitter`: card 'summary_large_image', title 'G2 Intelligence — IA para Empresas en Cali' (max 70 chars), description (max 200 chars), images: ['/opengraph-image']
7. `other`: { 'geo.region': 'CO-VAC', 'geo.placename': 'Cali, Colombia', 'ICBM': '3.4516,-76.5320' }
8. `alternates`: { canonical: 'https://g2intelligence.co' }

Change `<html lang="es"` to `<html lang="es-CO"` in the JSX return.

Enhance the existing `localBusinessSchema` object (do NOT replace it, extend it) to add:
- `priceRange: '$$'`
- `knowsAbout: ['Inteligencia Artificial', 'Automatización de Procesos', 'Agentes Inteligentes', 'Análisis de Datos', 'Consultoría Empresarial']`
- Change `areaServed` from a flat string array to an array of typed objects: `[{ '@type': 'City', name: 'Cali' }, { '@type': 'City', name: 'Jamundí' }, { '@type': 'City', name: 'Palmira' }, { '@type': 'City', name: 'Yumbo' }, { '@type': 'AdministrativeArea', name: 'Valle del Cauca' }, { '@type': 'Country', name: 'Colombia' }]`
- Add `addressLocality: 'Cali'` to the existing `address` object

Add a new `servicesSchema` const below `localBusinessSchema`:

```typescript
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Infraestructura de IA',
      description: 'Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Optimización de Procesos',
      description: 'Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Aumento de Ventas con IA',
      description: 'Integramos herramientas de IA en tu ciclo de ventas para identificar oportunidades, personalizar propuestas y cerrar más negocios.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Consultoría Estratégica en IA',
      description: 'Guiamos a tu empresa en la adopción de IA: diagnóstico, hoja de ruta, selección de herramientas y gestión del cambio organizacional.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 5,
      name: 'Análisis de Datos con IA',
      description: 'Convertimos tus datos en decisiones con dashboards inteligentes, modelos predictivos y análisis automatizados.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 6,
      name: 'Integración de Sistemas con IA',
      description: 'Conectamos tus herramientas existentes con capacidades de IA para flujos de trabajo unificados y sin fricciones.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
  ],
};
```

Add a second `<script type="application/ld+json">` block in `<head>` for `servicesSchema`, directly below the existing `localBusinessSchema` script tag.

DO NOT add `'use client'` to this file. It must remain a Server Component.
DO NOT modify font imports, Toaster, or body className.
  </action>
  <verify>
    <automated>cd C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
- layout.tsx TypeScript-compiles without errors
- `<html lang="es-CO">` in the JSX return
- `metadata` export includes metadataBase, openGraph, twitter, other with geo.region CO-VAC
- Two JSON-LD script blocks in `<head>`: one for LocalBusiness (enhanced), one for servicesSchema ItemList with 6 Service entries
- No `'use client'` directive present
  </done>
</task>

<task type="auto">
  <name>Task 2: Add generateMetadata to page.tsx and create sitemap.ts + robots.ts</name>
  <files>
    sitio-g2-nextjs/src/app/page.tsx
    sitio-g2-nextjs/src/app/sitemap.ts
    sitio-g2-nextjs/src/app/robots.ts
  </files>
  <action>
Read sitio-g2-nextjs/AGENTS.md first, then check node_modules/next/dist/docs/ for the sitemap and robots API docs relevant to this Next.js version before writing any code.

**page.tsx** — add `generateMetadata` export above the existing `Home` default export. Keep the default export unchanged:

```typescript
import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'G2 Intelligence — Inteligencia Artificial para Ventas y Automatización en Cali',
    description:
      'Transforma tu empresa con IA agentica. G2 Intelligence ofrece automatización de procesos, agentes inteligentes y consultoría en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
    openGraph: {
      title: 'G2 Intelligence — IA que Transforma Empresas en Cali',
      description:
        'Aumenta ventas y eficiencia con inteligencia artificial. Servicio para empresas en Cali y Valle del Cauca.',
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
```

Verify the description is 140-160 chars; adjust wording if needed while keeping all city names present.
DO NOT add `'use client'` to page.tsx.

**sitemap.ts** — create new file at sitio-g2-nextjs/src/app/sitemap.ts:

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://g2intelligence.co',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
```

Check the Next.js docs in node_modules/next/dist/docs/ to confirm the exact import path and function signature for MetadataRoute.Sitemap in this version — the API may differ from training data.

**robots.ts** — create new file at sitio-g2-nextjs/src/app/robots.ts:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://g2intelligence.co/sitemap.xml',
  };
}
```

Neither sitemap.ts nor robots.ts should contain `'use client'`.
  </action>
  <verify>
    <automated>cd C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
- page.tsx exports both `generateMetadata` and the unchanged `Home` default; no `'use client'`
- sitio-g2-nextjs/src/app/sitemap.ts exists and TypeScript-compiles
- sitio-g2-nextjs/src/app/robots.ts exists and TypeScript-compiles
- Neither new file contains `'use client'`
  </done>
</task>

<task type="auto">
  <name>Task 3: Create opengraph-image.tsx with Emerald Intelligence branding</name>
  <files>sitio-g2-nextjs/src/app/opengraph-image.tsx</files>
  <action>
Read sitio-g2-nextjs/AGENTS.md first, then check node_modules/next/dist/docs/ for the opengraph-image / ImageResponse API docs relevant to this Next.js version before writing any code. Confirm the import path for ImageResponse (it may be `next/og` or a different path in this version).

Create sitio-g2-nextjs/src/app/opengraph-image.tsx. This file uses ImageResponse to generate a 1200x630 PNG. ImageResponse uses Satori under the hood: ONLY flexbox layout works (no CSS grid, no absolute position on child elements except simple overlay tricks). All style values must be inline style objects, not Tailwind classes.

```typescript
import { ImageResponse } from 'next/og';

export const alt = 'G2 Intelligence — IA para Empresas en Cali, Colombia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Emerald top accent bar — use a sibling div inside a flex column, not absolute */}
        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#10b981',
            marginBottom: '48px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '72px',
              fontWeight: '700',
              color: '#10b981',
              margin: '0 0 16px 0',
              letterSpacing: '-1px',
            }}
          >
            G2 Intelligence
          </p>

          <p
            style={{
              fontSize: '34px',
              fontWeight: '400',
              color: '#ffffff',
              margin: '0 0 32px 0',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.3',
            }}
          >
            IA que Transforma Empresas en Colombia
          </p>

          <p
            style={{
              fontSize: '22px',
              color: '#6b7280',
              margin: '0',
            }}
          >
            Cali — Valle del Cauca
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

DO NOT add `'use client'` to this file.
DO NOT use CSS grid or Tailwind classes inside ImageResponse JSX.
If node_modules/next/dist/docs/ shows a different API for ImageResponse options in this version, adapt accordingly.
  </action>
  <verify>
    <automated>cd C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs && npx tsc --noEmit 2>&1 | head -20 && npm run build 2>&1 | tail -20</automated>
  </verify>
  <done>
- opengraph-image.tsx exists and TypeScript-compiles
- `npm run build` succeeds (exit 0) — confirms Next.js can parse and process the ImageResponse file
- File exports alt, size, contentType, and a default async function
- No `'use client'` directive present
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
Complete SEO metadata infrastructure across 5 files:
- layout.tsx: metadata defaults (geo tags, OG, Twitter), lang=es-CO, enhanced LocalBusiness schema + 6 Service schemas
- page.tsx: generateMetadata override with homepage-specific geo-targeted title/description
- sitemap.ts: MetadataRoute.Sitemap serving /sitemap.xml
- robots.ts: MetadataRoute.Robots serving /robots.txt
- opengraph-image.tsx: 1200x630 Emerald Intelligence branded image
  </what-built>
  <how-to-verify>
Run `npm run dev` in sitio-g2-nextjs/ and verify each check:

1. Open http://localhost:3000 in browser. Open DevTools > Elements > `<head>`. Confirm:
   - `<html lang="es-CO">` (not "es")
   - `<title>` contains "Cali" or "Valle del Cauca"
   - `<meta name="description">` content is 140-160 chars and includes at least two city names
   - `<meta name="geo.region" content="CO-VAC">` is present
   - `<meta property="og:title">` is present
   - `<meta name="twitter:card" content="summary_large_image">` is present

2. Run in terminal:
   ```
   curl -s http://localhost:3000/sitemap.xml
   ```
   Expected: valid XML containing `<loc>https://g2intelligence.co</loc>`

3. Run in terminal:
   ```
   curl -s http://localhost:3000/robots.txt
   ```
   Expected: contains `Allow: /` and `Sitemap: https://g2intelligence.co/sitemap.xml`

4. Open http://localhost:3000/opengraph-image in browser.
   Expected: 1200x630 image with black background, "G2 Intelligence" text in emerald (#10b981), subtitle in white.

5. View page source (Ctrl+U). Search for "ItemList".
   Expected: finds a JSON-LD block containing all 6 service names (Infraestructura de IA, Optimización de Procesos, etc.)

6. Search page source for "CO-VAC".
   Expected: finds `"geo.region"` meta tag with value "CO-VAC"
  </how-to-verify>
  <resume-signal>Type "approved" if all 6 checks pass. Describe any failures in detail so they can be fixed.</resume-signal>
</task>

</tasks>

<verification>
All automated verification commands produce exit code 0:

```bash
# TypeScript compilation clean
cd C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs
npx tsc --noEmit

# Production build succeeds
npm run build

# No 'use client' on server metadata files
grep -r "'use client'" src/app/layout.tsx src/app/page.tsx src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx
# Expected: no output (none found)

# geo.region tag present in source
grep -r "CO-VAC" src/
# Expected: at least one match in layout.tsx

# All 6 service names present in layout.tsx
grep -c "Infraestructura de IA\|Optimización de Procesos\|Aumento de Ventas\|Consultoría Estratégica\|Análisis de Datos\|Integración de Sistemas" src/app/layout.tsx
# Expected: 6
```
</verification>

<success_criteria>
Phase 2 is complete when ALL of the following are true:

1. `npx tsc --noEmit` exits 0 (no TypeScript errors)
2. `npm run build` exits 0 (production build succeeds)
3. `<html lang="es-CO">` in layout.tsx JSX (per SEO-01, locked decision in CONTEXT.md)
4. `metadata` export in layout.tsx includes `metadataBase`, `openGraph`, `twitter`, and `other` with `geo.region: 'CO-VAC'` (per SEO-01, SEO-06, SEO-07)
5. LocalBusiness JSON-LD has typed `areaServed` objects including Cali, Jamundí, Palmira, Yumbo (per SEO-02)
6. `servicesSchema` ItemList has exactly 6 Service entries, each with name, description, and provider referencing G2 Intelligence (per SEO-03)
7. `sitio-g2-nextjs/src/app/sitemap.ts` exists and returns `https://g2intelligence.co` entry (per SEO-04)
8. `sitio-g2-nextjs/src/app/robots.ts` exists, allows all, points to sitemap URL (per SEO-05)
9. `sitio-g2-nextjs/src/app/opengraph-image.tsx` exists and renders 1200x630 with Emerald Intelligence branding: #050505 background, #10b981 accent (per UI-04)
10. `page.tsx` exports `generateMetadata` with homepage-specific title including "Cali" + description including Cali, Jamundí, Palmira, Yumbo (per SEO-01)
11. Human checkpoint approved — all 6 manual checks passed
</success_criteria>

<output>
After completion, create `.planning/phases/02-local-seo-metadata-optimization/02-01-SUMMARY.md` with:
- What was implemented (specific fields added, schemas created)
- Key decisions made at Claude's discretion (exact keyword phrasing, description char counts, service description text)
- Actual files modified and their final state (exports, key fields)
- Any deviations from the plan and why
- Build/TypeScript verification results
</output>
