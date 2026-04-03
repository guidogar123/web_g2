---
phase: 01-foundation-technical-setup
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - sitio-g2-nextjs/package.json
  - sitio-g2-nextjs/tsconfig.json
  - sitio-g2-nextjs/next.config.ts
  - sitio-g2-nextjs/.env.local
  - sitio-g2-nextjs/.env.local.example
  - sitio-g2-nextjs/.gitignore
  - sitio-g2-nextjs/src/app/globals.css
  - sitio-g2-nextjs/src/app/layout.tsx
  - sitio-g2-nextjs/src/app/page.tsx
  - sitio-g2-nextjs/src/lib/utils.ts
  - sitio-g2-nextjs/src/components/Navigation.tsx
  - sitio-g2-nextjs/src/components/ScheduleModal.tsx
  - sitio-g2-nextjs/src/components/sections/Hero.tsx
  - sitio-g2-nextjs/src/components/sections/HeroCanvas.tsx
  - sitio-g2-nextjs/src/components/sections/Servicios.tsx
  - sitio-g2-nextjs/src/components/sections/Nosotros.tsx
  - sitio-g2-nextjs/src/components/sections/Equipo.tsx
  - sitio-g2-nextjs/src/components/sections/Contacto.tsx
  - sitio-g2-nextjs/src/components/sections/Footer.tsx
autonomous: false
requirements:
  - MIGR-01
  - MIGR-02
  - MIGR-03
  - UI-01
  - UI-02
  - UI-03
  - PERF-04
  # PERF-03 (next/image for images) is deferred: Phase 1 sections are text/icon-only, no images to optimize yet

must_haves:
  truths:
    - "User loads localhost:3000 and all 6 sections are visible: Hero, Servicios, Nosotros, Equipo, Contacto, Footer"
    - "npm run build exits code 0 with zero TypeScript errors and zero async-params warnings"
    - "grep -r 'n8n-n8n.ektnbd' sitio-g2-nextjs/src returns empty (no hardcoded webhook URLs)"
    - "layout.tsx has no 'use client' directive (server-first root preserved)"
    - "Fonts Inter and Roboto Mono load via next/font (no external stylesheet requests for fonts)"
    - "LocalBusiness JSON-LD with areaServed Cali/Jamundi/Palmira/Yumbo is present in page source"
    - ".env.local is listed in .gitignore and does not appear in git status"
  artifacts:
    - path: "sitio-g2-nextjs/src/app/layout.tsx"
      provides: "Root layout with next/font, LocalBusiness JSON-LD, Toaster"
      exports: ["default RootLayout"]
    - path: "sitio-g2-nextjs/src/app/page.tsx"
      provides: "Home page assembling all 6 section components"
      exports: ["default Home"]
    - path: "sitio-g2-nextjs/src/components/Navigation.tsx"
      provides: "Sticky nav with scroll state and anchor links"
      contains: "'use client'"
    - path: "sitio-g2-nextjs/src/components/ScheduleModal.tsx"
      provides: "Schedule modal using process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL"
      contains: "'use client'"
    - path: "sitio-g2-nextjs/src/components/sections/Hero.tsx"
      provides: "Hero section with headline, stats, CTAs"
    - path: "sitio-g2-nextjs/src/components/sections/HeroCanvas.tsx"
      provides: "Canvas particle animation (client component)"
      contains: "'use client'"
    - path: "sitio-g2-nextjs/src/components/sections/Servicios.tsx"
      provides: "6 service cards grid"
    - path: "sitio-g2-nextjs/src/components/sections/Nosotros.tsx"
      provides: "About section with values grid"
    - path: "sitio-g2-nextjs/src/components/sections/Equipo.tsx"
      provides: "Team carousel (embla)"
      contains: "'use client'"
    - path: "sitio-g2-nextjs/src/components/sections/Contacto.tsx"
      provides: "Contact section with stub form and contact info"
    - path: "sitio-g2-nextjs/src/components/sections/Footer.tsx"
      provides: "Footer with links, social icons, copyright"
    - path: "sitio-g2-nextjs/.env.local.example"
      provides: "Committed env var template with empty values"
    - path: "sitio-g2-nextjs/.env.local"
      provides: "Local secrets (gitignored)"
  key_links:
    - from: "sitio-g2-nextjs/src/app/page.tsx"
      to: "all 6 section components"
      via: "direct imports from src/components/sections/"
    - from: "sitio-g2-nextjs/src/components/ScheduleModal.tsx"
      to: "n8n webhook"
      via: "process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL"
      pattern: "process\\.env\\.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL"
    - from: "sitio-g2-nextjs/src/app/layout.tsx"
      to: "Inter + Roboto Mono fonts"
      via: "next/font/google variable injection"
      pattern: "from 'next/font/google'"
    - from: "sitio-g2-nextjs/src/app/layout.tsx"
      to: "LocalBusiness schema"
      via: "script type=application/ld+json"
      pattern: "application/ld\\+json"
---

<objective>
Create a fresh Next.js 15 App Router project at `sitio-g2-nextjs/` containing all 6 content sections (Hero, Servicios, Nosotros, Equipo, Contacto, Footer), Navigation, and ScheduleModal. Environment variables secure webhook URLs. Fonts load via next/font. `npm run build` succeeds with zero warnings and no hardcoded URLs.

Purpose: Establish the technical foundation that every subsequent phase (SEO, forms, chat, performance) builds on. Getting the architecture right here (Server vs. Client component split, env var discipline, build cleanliness) prevents cascading rework.

Output: A buildable Next.js 15 project at `C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/` that renders all 6 sections at localhost:3000 and produces a clean `npm run build`.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/01-foundation-technical-setup/01-CONTEXT.md
@.planning/phases/01-foundation-technical-setup/01-UI-SPEC.md
@.planning/phases/01-foundation-technical-setup/01-RESEARCH.md

Existing React source to mine for content (DO NOT copy components — text content only):
- C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/sections/
- C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx
- C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/sections/Navigation.tsx
</context>

<interfaces>
<!-- Key contracts the executor must implement. Read and follow exactly. -->

Design system (from UI-SPEC.md):
- Background: #050505 (Void Black) — 60% dominant
- Cards/surfaces: #0d1117 (Deep Slate) — 30% secondary
- Accent/CTA: #10b981 (Emerald Nexus) — 10% only
- CSS vars: --primary: #10b981, --background: #050505, --card: #0d1117, --foreground: #ffffff
- Font: Inter (body/headings, 400/600 weights), Roboto Mono (technical text)
- Spacing: 8-point scale, sections breathe with lg (24px) / xl (32px) padding
- shadcn preset: new-york, baseColor: slate, CSS variables: yes

Component 'use client' requirements (CRITICAL — build errors if missed):
- Navigation.tsx: YES (useState, useEffect, window.scrollY)
- ScheduleModal.tsx: YES (useState, fetch, localStorage, date manipulation)
- HeroCanvas.tsx: YES (useRef, useEffect, canvas APIs)
- Equipo.tsx: YES (embla-carousel-react requires hooks)
- Contacto.tsx: YES (form state for stub submit handler)
- Hero.tsx: NO (imports HeroCanvas, otherwise static)
- Servicios.tsx: NO (static server component)
- Nosotros.tsx: NO (static server component)
- Footer.tsx: NO (pure server component)
- layout.tsx: NO (never add 'use client' to root layout)
- page.tsx: NO (server component assembling all sections)

Environment variables:
- NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL: client-visible (chat widget, ScheduleModal fetch)
- N8N_WEBHOOK_URL: server-only (API routes in Phase 3)

Tailwind v4 note: create-next-app@latest generates correct v4 config. Do NOT write tailwind.config.js manually using v3 syntax. Let the scaffold generate it, then extend with brand CSS variables in globals.css using @theme block.
</interfaces>

<tasks>

<!-- ============================================================ -->
<!-- TASK 1: Scaffold Next.js 15 project and configure foundation -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 1: Scaffold Next.js 15 project, install deps, configure env vars and CSS</name>

  <files>
    sitio-g2-nextjs/package.json
    sitio-g2-nextjs/tsconfig.json
    sitio-g2-nextjs/next.config.ts
    sitio-g2-nextjs/.env.local
    sitio-g2-nextjs/.env.local.example
    sitio-g2-nextjs/.gitignore
    sitio-g2-nextjs/src/app/globals.css
    sitio-g2-nextjs/src/lib/utils.ts
    sitio-g2-nextjs/src/components/ui/ (generated by shadcn)
  </files>

  <action>
Run all commands from the project root `C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/`. Use Git Bash syntax throughout.

**Step 1.1 — Scaffold Next.js 15:**

```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2"
npx create-next-app@latest sitio-g2-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

The `--yes` flag accepts all defaults. If the CLI still prompts, choose: TypeScript=Yes, ESLint=Yes, Tailwind=Yes, src/ directory=Yes, App Router=Yes, import alias=@/*.

**Step 1.2 — Install supporting dependencies:**

```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
npm install date-fns embla-carousel-react sonner
```

**Step 1.3 — Initialize shadcn/ui:**

```bash
npx shadcn@latest init --yes
```

When prompted (if --yes does not fully suppress): Style=New York, Base color=Slate, CSS variables=Yes.

Then add the required shadcn components:

```bash
npx shadcn@latest add button input textarea label dialog --yes
```

**Step 1.4 — Create `.env.local` (gitignored, never committed):**

Create file `sitio-g2-nextjs/.env.local` with this exact content:

```
NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
```

Create file `sitio-g2-nextjs/.env.local.example` (committed to git, template only):

```
# Copy this file to .env.local and fill in real values
# NEXT_PUBLIC_ prefix = accessible in browser (client components)
# Without prefix = server-only (API routes only)
NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=
N8N_WEBHOOK_URL=
```

**Step 1.5 — Verify `.gitignore` contains `.env.local`:**

Open `sitio-g2-nextjs/.gitignore`. If `.env.local` is not listed, append it. The create-next-app scaffold typically includes it already — confirm before adding.

**Step 1.6 — Extend globals.css with Emerald Intelligence brand tokens:**

After shadcn init creates `src/app/globals.css`, open it and ADD the following CSS variable overrides inside the `:root` block (or after the existing shadcn variables). Do NOT replace what shadcn generated — append/extend:

```css
/* Emerald Intelligence brand token overrides */
:root {
  --background: 0 0% 2%;           /* #050505 Void Black */
  --foreground: 0 0% 100%;         /* #ffffff white text */
  --card: 216 19% 8%;              /* #0d1117 Deep Slate */
  --card-foreground: 0 0% 100%;
  --primary: 160 84% 39%;          /* #10b981 Emerald Nexus */
  --primary-foreground: 0 0% 100%;
  --accent: 160 84% 39%;           /* #10b981 same as primary */
  --accent-foreground: 0 0% 100%;
  --muted: 216 19% 11%;
  --muted-foreground: 0 0% 64%;
  --border: 216 19% 14%;
  --input: 216 19% 11%;
  --ring: 160 84% 39%;
}
```

Note: shadcn uses HSL space for CSS variables (not hex). The values above are conversions of the brand hex colors to HSL.

Also ensure the body background defaults to the Void Black. Add after the :root block if not already set by shadcn:

```css
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

**Step 1.7 — Verify tsconfig.json has strict mode:**

Open `sitio-g2-nextjs/tsconfig.json`. The scaffold creates it with `"strict": true` by default. Confirm it is present. If missing, add it inside `"compilerOptions"`.
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && node -e "const p=require('./package.json'); console.log('next:', p.dependencies.next, 'react:', p.dependencies.react)" && echo ".env.local exists:" && test -f .env.local && echo "YES" && echo ".env.local.example exists:" && test -f .env.local.example && echo "YES" && grep -q "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL" .env.local && echo "env var present in .env.local: YES" && grep -q "\.env\.local" .gitignore && echo ".env.local in .gitignore: YES"
    </automated>
  </verify>

  <done>
    - `sitio-g2-nextjs/` directory exists with valid package.json listing next, react, date-fns, embla-carousel-react, sonner
    - `src/lib/utils.ts` exists with `cn()` export (generated by shadcn)
    - `src/components/ui/button.tsx` exists (shadcn component added)
    - `.env.local` contains both webhook env var entries
    - `.env.local.example` committed template with empty values
    - `.env.local` listed in `.gitignore`
    - `tsconfig.json` has `"strict": true` in compilerOptions
    - `globals.css` has Emerald Intelligence HSL color variable overrides
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 2: Configure layout.tsx with fonts, JSON-LD, and Toaster -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 2: Configure root layout with next/font, LocalBusiness JSON-LD, and Toaster</name>

  <files>
    sitio-g2-nextjs/src/app/layout.tsx
  </files>

  <action>
Replace the scaffold-generated `src/app/layout.tsx` with the following. CRITICAL: no `'use client'` on this file.

```typescript
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'G2 Intelligence — Inteligencia Artificial para Empresas en Cali y Valle del Cauca',
  description:
    'G2 Intelligence ayuda a empresas colombianas a adoptar IA agentica, optimizar procesos y multiplicar ventas. Servicios en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'G2 Intelligence',
  description:
    'Empresa de inteligencia artificial y automatización de procesos para empresas colombianas',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

Explanation of key decisions (per CONTEXT.md and RESEARCH.md):
- `Inter` with `weight: ['400', '600']` — exactly 2 weights per UI-SPEC (no others)
- `Roboto_Mono` — referenced by `--font-roboto-mono` CSS variable for monospace text
- `variable` prop on both fonts — allows Tailwind `font-sans` / `font-mono` to consume them via CSS var
- `localBusinessSchema.areaServed` includes all 6 required areas (per REQUIREMENTS.md MIGR locale + plan prompt)
- `<Toaster />` from sonner here so ScheduleModal toasts render from anywhere — sonner not shadcn's toast (per RESEARCH.md)
- `dangerouslySetInnerHTML` is safe: content is a static object literal, no user input (per RESEARCH.md note)
- No `'use client'` — this is the Server Component root (per CONTEXT.md locked decision)
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && grep -c "use client" src/app/layout.tsx || true && echo "use client count above (must be 0)" && grep -q "next/font/google" src/app/layout.tsx && echo "next/font: OK" && grep -q "application/ld+json" src/app/layout.tsx && echo "JSON-LD: OK" && grep -q "Jamundí" src/app/layout.tsx && echo "areaServed Jamundi: OK" && grep -q "Toaster" src/app/layout.tsx && echo "Toaster: OK"
    </automated>
  </verify>

  <done>
    - `layout.tsx` has zero `'use client'` directives
    - `next/font/google` imports Inter and Roboto_Mono with correct weights
    - LocalBusiness JSON-LD script tag present with all 6 areaServed entries
    - `<Toaster />` from sonner imported and rendered
    - TypeScript compiles without errors on this file (`npx tsc --noEmit` passes)
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 3: Generate Hero, Servicios, Nosotros sections via Stitch MCP -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 3: Generate Hero, Servicios, Nosotros sections via Stitch MCP</name>

  <files>
    sitio-g2-nextjs/src/components/sections/Hero.tsx
    sitio-g2-nextjs/src/components/sections/HeroCanvas.tsx
    sitio-g2-nextjs/src/components/sections/Servicios.tsx
    sitio-g2-nextjs/src/components/sections/Nosotros.tsx
  </files>

  <action>
Use the Stitch MCP tool (`mcp__stitch__*`) to generate each section. First create a Stitch project, then generate each screen. All outputs go to `sitio-g2-nextjs/src/components/sections/`.

**Design brief to include in EVERY Stitch call:**

```
Design Philosophy: Emerald Intelligence — void black background, emerald accents, premium research facility aesthetic, futuristic minimalist.
Colors: Background #050505 (Void Black), Cards/surfaces #0d1117 (Deep Slate), Accent/CTA #10b981 (Emerald Nexus).
Typography: Inter (body/headings, 400 Regular and 600 Semibold only), Roboto Mono (code/technical text).
Spacing: 8-point scale (4/8/16/24/32/48/64px), sections breathe with generous padding.
Framework: React + TypeScript + Tailwind CSS utility classes only (no CSS-in-JS, no scoped styles).
Use cn() from '@/lib/utils' for className merging.
Export as default React component. No 'any' types.
Mobile-first responsive design.
```

**Step 3.1 — Create Stitch project:**

Call `mcp__stitch__create_project` with name "g2-intelligence-website".

**Step 3.2 — Generate Hero section:**

Call `mcp__stitch__generate_screen_from_text` with:
- project_id: (from step 3.1)
- screen_name: "Hero"
- description: ```
  Hero section for G2 Intelligence website. Full-viewport height section with id="hero".
  Content:
  - Badge pill: "Tecnología Agentica de Vanguardia"
  - H1 two lines: "Transformamos tu Negocio" / "con Inteligencia Agentica" (second line has emerald gradient)
  - Subtitle: "En G2Intelligence ayudamos a empresas colombianas a adoptar las últimas tecnologías agenticas, optimizar procesos y multiplicar sus ventas mediante soluciones inteligentes."
  - Two buttons: Primary "Comienza tu Transformación" (emerald bg, onClick prop: onScheduleClick), Secondary "Descubre Nuestros Servicios" (outline, scrolls to #servicios)
  - Three stat cards in a row: { icon: Cpu, value: "+50", label: "Proyectos Agenticos" }, { icon: TrendingUp, value: "3x", label: "Aumento Promedio en Ventas" }, { icon: Sparkles, value: "98%", label: "Clientes Satisfechos" }
  - Scroll indicator at bottom: "Scroll" with ChevronDown icon
  - Background: renders a <HeroCanvas /> child component imported from './HeroCanvas' (client component with canvas animation)
  Props: { onScheduleClick: () => void }
  This is a SERVER COMPONENT — no 'use client', no hooks at root level. HeroCanvas is the only client sub-component.
  Use lucide-react for icons (Cpu, TrendingUp, Sparkles, ChevronDown).
  ```

Write the generated Hero component code to `sitio-g2-nextjs/src/components/sections/Hero.tsx`.

**Step 3.3 — Generate HeroCanvas (client component):**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "HeroCanvas"
- description: ```
  Canvas particle animation component for the Hero background.
  MUST start with 'use client' directive (first line of file).
  Uses useRef<HTMLCanvasElement> and useEffect for animation loop.
  Draws ~80 small circular particles on canvas. Particles have:
  - Color: emerald (#10b981) with low opacity (0.3–0.6)
  - Random positions, slow random velocity (vx/vy between -0.3 and 0.3)
  - Radius 1-3px
  - Wrap around edges (toroidal boundary)
  - Connect particles within 150px with emerald lines at low opacity
  Canvas fills parent container absolutely (position: absolute, inset-0, w-full, h-full).
  No props needed. Export as default.
  ```

Write the generated HeroCanvas component to `sitio-g2-nextjs/src/components/sections/HeroCanvas.tsx`.

**Step 3.4 — Generate Servicios section:**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "Servicios"
- description: ```
  Services section for G2 Intelligence. Section id="servicios", dark background #050505.
  Header area:
  - Badge: "Nuestros Servicios"
  - H2: "Soluciones que" / "Impulsan tu Negocio" (second line emerald gradient)
  - Description: "Combinamos tecnología de punta con estrategia de negocio para ofrecerte soluciones integrales que generan resultados medibles."
  Grid: 3 columns on desktop (lg:grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile. 6 service cards.
  Each card has: Deep Slate (#0d1117) background, icon (emerald color), title, description, feature list with checkmarks.
  The 6 services:
  1. title: "Infraestructura IA", icon: Bot, description: "Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real.", features: ["Chatbots avanzados", "Automatización inteligente", "Procesamiento de lenguaje natural"]
  2. title: "Optimización de Procesos", icon: Workflow, description: "Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa.", features: ["Mapeo de procesos", "Eliminación de desperdicios", "Automatización de flujos"]
  3. title: "Aumento de Ventas", icon: TrendingUp, description: "Desarrollamos estrategias basadas en datos e inteligencia artificial para identificar oportunidades y cerrar más negocios.", features: ["Análisis predictivo", "Segmentación inteligente", "Embudos optimizados"]
  4. title: "Consultoría Estratégica", icon: Lightbulb, description: "Te guiamos en la adopción de tecnologías emergentes con un plan de transformación digital adaptado a tus necesidades.", features: ["Roadmap tecnológico", "Evaluación de madurez", "Plan de implementación"]
  5. title: "Desarrollo a Medida", icon: Code2, description: "Creamos soluciones software personalizadas que se integran perfectamente con tus sistemas existentes.", features: ["Aplicaciones web", "Integraciones API", "Arquitectura escalable"]
  6. title: "Seguridad y Cumplimiento", icon: Shield, description: "Garantizamos que tus implementaciones cumplan con las normativas colombianas y estándares internacionales de seguridad.", features: ["Protección de datos", "Cumplimiento normativo", "Auditorías de seguridad"]
  SERVER COMPONENT — no hooks, no 'use client'. Data is static inline.
  Use lucide-react for icons.
  ```

Write to `sitio-g2-nextjs/src/components/sections/Servicios.tsx`.

**Step 3.5 — Generate Nosotros section:**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "Nosotros"
- description: ```
  About section for G2 Intelligence. Section id="nosotros".
  Header:
  - Badge: "Sobre Nosotros"
  - H2 three lines: "Impulsando la" / "Transformación Digital" (emerald gradient) / "en Colombia"
  Body content (3 paragraphs):
  - "G2Intelligence nació con una misión clara: democratizar el acceso a las tecnologías más avanzadas para empresas colombianas de todos los tamaños. Creemos que la inteligencia artificial y los agentes autónomos no son el futuro, son el presente."
  - "Nuestro equipo multidisciplinario combina experiencia en ingeniería de software, ciencia de datos y estrategia de negocios para ofrecer soluciones que no solo son tecnológicamente robustas, sino que generan valor real para tu empresa."
  - "Hemos ayudado a decenas de empresas en sectores como retail, servicios, manufactura y tecnología a transformar sus operaciones y multiplicar sus resultados."
  Stats row (3 inline): ["+50", "Empresas Asesoradas"], ["+100", "Proyectos Entregados"], ["5+", "Años de Experiencia"]
  Values grid (2x2 or 4 columns):
  - { icon: Target, title: "Enfoque en Resultados", desc: "Nos medimos por el impacto tangible que generamos en tu negocio." }
  - { icon: Users, title: "Partnership Real", desc: "Trabajamos como extensión de tu equipo, no como proveedores externos." }
  - { icon: Rocket, title: "Innovación Constante", desc: "Estamos siempre a la vanguardia de las últimas tecnologías." }
  - { icon: Award, title: "Excelencia Técnica", desc: "Equipo de expertos certificados con años de experiencia." }
  Quote block: "La tecnología agentica no reemplaza a las personas, las potencia. Nuestro trabajo es crear el puente entre el potencial humano y el poder de la IA." — "Equipo G2Intelligence / Colombia"
  SERVER COMPONENT — no hooks, static data.
  Use lucide-react: Target, Users, Rocket, Award.
  ```

Write to `sitio-g2-nextjs/src/components/sections/Nosotros.tsx`.

**Post-generation cleanup for Task 3:**
After receiving Stitch output, review each generated file:
1. Ensure `Hero.tsx` does NOT have `'use client'` at top
2. Ensure `HeroCanvas.tsx` HAS `'use client'` as its first line
3. Ensure `Servicios.tsx` and `Nosotros.tsx` do NOT have `'use client'`
4. Fix any import paths — use `@/lib/utils` not relative `../../lib/utils` (the `@/*` alias is configured)
5. If Stitch uses `import Image from 'next/image'` anywhere, keep it; if it uses `<img>`, leave for now (no images in these sections — icons only)
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && echo "Checking 'use client' placement..." && head -1 src/components/sections/HeroCanvas.tsx && grep -c "use client" src/components/sections/Hero.tsx || echo "0" && grep -c "use client" src/components/sections/Servicios.tsx || echo "0" && grep -c "use client" src/components/sections/Nosotros.tsx || echo "0" && echo "Files exist:" && ls src/components/sections/
    </automated>
  </verify>

  <done>
    - `Hero.tsx` exports default Hero component with `onScheduleClick: () => void` prop, imports HeroCanvas, no 'use client'
    - `HeroCanvas.tsx` starts with `'use client'`, uses canvas ref and animation loop
    - `Servicios.tsx` exports default with all 6 service cards, no 'use client'
    - `Nosotros.tsx` exports default with 3 paragraphs, stats, values grid, quote, no 'use client'
    - All files use `@/lib/utils` import alias (not relative paths)
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 4: Generate Equipo, Contacto, Footer sections via Stitch MCP -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 4: Generate Equipo, Contacto, Footer sections via Stitch MCP</name>

  <files>
    sitio-g2-nextjs/src/components/sections/Equipo.tsx
    sitio-g2-nextjs/src/components/sections/Contacto.tsx
    sitio-g2-nextjs/src/components/sections/Footer.tsx
  </files>

  <action>
Continue using the same Stitch project from Task 3. Generate the remaining 3 sections.

**Step 4.1 — Generate Equipo section:**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "Equipo"
- description: ```
  Team section for G2 Intelligence. Section id="equipo". MUST add 'use client' (uses embla-carousel-react hooks).
  Header:
  - Badge: "Nuestro Equipo Digital"
  - H2: "Nuestra Élite Digital a tu Servicio" (Élite Digital in emerald gradient)
  - Description: "Conoce a nuestros expertos en Inteligencia Artificial, diseñados para trabajar en armonía y escalar tu negocio."
  Carousel using embla-carousel-react:
  import useEmblaCarousel from 'embla-carousel-react'
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  Prev/Next navigation buttons using ChevronLeft/ChevronRight from lucide-react.
  4 agent cards in carousel:
  1. { icon: Search, name: "SEO Researcher", role: "Estratega de Visibilidad", description: "Investiga tendencias, analiza la competencia y optimiza el posicionamiento orgánico con precisión quirúrgica.", capabilities: ["Análisis de Keywords", "Auditoría Técnica", "Estrategia de Contenido"] }
  2. { icon: Zap, name: "Growth Hacker", role: "Especialista en Escalamiento", description: "Diseña y ejecuta experimentos de crecimiento rápido para multiplicar la base de usuarios y la retención.", capabilities: ["A/B Testing", "Optimización de Conversión", "Viral Loops"] }
  3. { icon: PenTool, name: "Copywriter AI", role: "Arquitecto de Persuasión", description: "Crea narrativas cautivadoras y copys de alta conversión que conectan emocionalmente con tu audiencia.", capabilities: ["Storytelling", "Copy de Ventas", "Identidad de Marca"] }
  4. { icon: BarChart3, name: "Analytics Agent", role: "Científico de Datos", description: "Transforma grandes volúmenes de datos en insights accionables para la toma de decisiones estratégicas.", capabilities: ["Dashboards en Vivo", "Modelado Preventivo", "Análisis de Atribución"] }
  Each card: Deep Slate (#0d1117) bg, emerald icon, badge "G2 AI Expert", "Capacidades Core" heading.
  MUST have 'use client' as first line (embla requires browser hooks).
  Use lucide-react: Search, Zap, PenTool, BarChart3, ChevronLeft, ChevronRight.
  ```

Write to `sitio-g2-nextjs/src/components/sections/Equipo.tsx`.

**Step 4.2 — Generate Contacto section:**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "Contacto"
- description: ```
  Contact section for G2 Intelligence. Section id="contacto". MUST add 'use client' (form state).
  Header:
  - Badge: "Contáctanos"
  - H2: "Comienza tu Transformación" ("Transformación" in emerald gradient)
  - Description: "Estamos listos para ayudarte a llevar tu empresa al siguiente nivel. Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo."
  Two-column layout (stacked on mobile, side-by-side on lg):
  LEFT — Contact form (useState for fields, stub handleSubmit that logs to console in Phase 1):
  - Field: Nombre completo (placeholder: "Tu nombre", required)
  - Field: Correo electrónico (type: email, placeholder: "tu@empresa.com", required)
  - Field: Empresa (placeholder: "Nombre de tu empresa", optional)
  - Field: Mensaje (textarea, placeholder: "Cuéntanos sobre tu proyecto y cómo podemos ayudarte...", rows: 5, required)
  - Submit button: "Enviar mensaje" (emerald bg) with loading state text "Enviando..."
  Use shadcn Input, Textarea, Label from '@/components/ui/*'.
  RIGHT — Contact info cards and CTA:
  - Contact card 1: Mail icon, "Email", "hola@g2intelligence.co", href="mailto:hola@g2intelligence.co"
  - Contact card 2: MapPin icon, "Ubicación", "Colombia", href="#"
  - Contact card 3: Phone icon, "Teléfono", "+57 350 243 9698", href="tel:+573502439698"
  - Social links row: Facebook, Twitter/X, Instagram, TikTok with their URLs
  - CTA card (Deep Slate bg): heading "¿Prefieres una llamada?", body "Agenda una consulta gratuita de 30 minutos con nuestro equipo.", button "Agendar llamada" (onClick prop: onScheduleClick)
  Props: { onScheduleClick: () => void }
  MUST have 'use client' as first line.
  Use lucide-react: Mail, MapPin, Phone, Facebook, Twitter, Instagram (use ExternalLink for TikTok or similar).
  NOTE: handleSubmit is a STUB in Phase 1 — just console.log the form data, do NOT call any webhook.
  ```

Write to `sitio-g2-nextjs/src/components/sections/Contacto.tsx`.

**After writing Contacto.tsx, verify and enforce `'use client'`:**
```bash
head -1 "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/src/components/sections/Contacto.tsx"
```
If the output is NOT `'use client'`, add it manually as the very first line before all imports.
This is required because the form uses `useState` hooks, which only work in Client Components.

**IMPORTANT: Phase 1 form is intentionally UI-only (stub for Phase 3)**
- The form captures all fields: nombre, email, empresa, mensaje
- `handleSubmit` logs form data to console only — does NOT call any webhook
- Real webhook integration (FORM-01) is Phase 3 scope
- Fields and structure are correct so Phase 3 just adds the API call

**Step 4.3 — Generate Footer section:**

Call `mcp__stitch__generate_screen_from_text` with:
- screen_name: "Footer"
- description: ```
  Footer for G2 Intelligence. Element: <footer>. SERVER COMPONENT — no 'use client', no hooks.
  Logo row: Brain icon (lucide) + "G2" text + "Intelligence" in emerald (#10b981).
  Tagline: "Transformamos empresas colombianas mediante tecnología agentica de vanguardia. Tu socio estratégico en la revolución digital."
  Four columns of links:
  1. "Servicios": Infraestructura IA (#servicios), Optimización de Procesos (#servicios), Aumento de Ventas (#servicios), Consultoría (#servicios)
  2. "Empresa": Sobre Nosotros (#nosotros), Casos de Éxito (#), Blog (#), Carreras (#)
  3. "Legal": Política de Privacidad (#), Términos de Servicio (#), Política de Cookies (#)
  Social row: Facebook, Twitter/X, Instagram, TikTok links (same URLs as Contacto).
  Bottom bar:
  - Left: "© {currentYear} G2Intelligence. Todos los derechos reservados."  — use new Date().getFullYear()
  - Right: NIT: 901.XXX.XXX-X | +57 350 243 9698 | Colombia
  "Made with love" line: "Hecho con ♥ en Bogotá, Colombia"
  Background: #050505, top border subtle (#0d1117 or white/5).
  SERVER COMPONENT — no 'use client'. new Date().getFullYear() is fine in Server Components.
  Use lucide-react: Brain, and any appropriate social/external icons.
  ```

Write to `sitio-g2-nextjs/src/components/sections/Footer.tsx`.

**Post-generation cleanup for Task 4:**
1. `Equipo.tsx` — confirm `'use client'` is first line. Confirm embla import: `import useEmblaCarousel from 'embla-carousel-react'`
2. `Contacto.tsx` — confirm `'use client'` is first line. Confirm form handleSubmit is a stub (no fetch calls). Confirm shadcn imports use `@/components/ui/input` etc.
3. `Footer.tsx` — confirm NO `'use client'`. Confirm `new Date().getFullYear()` is used (not hardcoded year).
4. All files: fix any import paths to use `@/` alias.
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && echo "--- Equipo 'use client' check (must show 'use client'):" && head -1 src/components/sections/Equipo.tsx && echo "--- Contacto 'use client' check (must show 'use client'):" && head -1 src/components/sections/Contacto.tsx && echo "--- Footer 'use client' check (must show 0):" && grep -c "use client" src/components/sections/Footer.tsx || echo "0" && echo "--- No hardcoded webhook URLs:" && grep -r "n8n-n8n.ektnbd" src/ || echo "CLEAN"
    </automated>
  </verify>

  <done>
    - `Equipo.tsx` starts with `'use client'`, uses embla-carousel-react
    - `Contacto.tsx` starts with `'use client'`, has stub handleSubmit (no real webhook call), accepts onScheduleClick prop
    - `Footer.tsx` has no `'use client'`, uses `new Date().getFullYear()`
    - No file in `src/` contains the hardcoded n8n URL
    - All 6 section files exist in `src/components/sections/`
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 5: Migrate Navigation and ScheduleModal from React source -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 5: Migrate Navigation and ScheduleModal with Next.js adjustments</name>

  <files>
    sitio-g2-nextjs/src/components/Navigation.tsx
    sitio-g2-nextjs/src/components/ScheduleModal.tsx
  </files>

  <action>
These two components are migrated (not regenerated) from the existing React source. The source files are at:
- `C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/sections/Navigation.tsx`
- `C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx`

Read each source file, then create the migrated versions with the minimal changes documented below.

**Navigation.tsx migration:**

Read source file. Copy to `sitio-g2-nextjs/src/components/Navigation.tsx` with these changes:
1. Add `'use client';` as the very first line (before any imports). Required because it uses useState, useEffect, window.scrollY.
2. Fix import paths: change any `@/components/ui/...` imports to use the same alias pattern (shadcn generates into `src/components/ui/` in Next.js too, so `@/components/ui/button` should work).
3. Remove any Vite-specific imports if present (e.g., `import.meta.env`). There are none expected in Navigation.
4. The anchor links (`<a href="#hero">`) with `e.preventDefault()` + `element.scrollIntoView()` are CORRECT — do NOT convert to Next.js `<Link>`. These are same-page scroll links, not route navigation.
5. No other changes. The Tailwind classes, lucide icons, and shadcn Button component all work identically in Next.js.

**ScheduleModal.tsx migration:**

Read source file. Copy to `sitio-g2-nextjs/src/components/ScheduleModal.tsx` with these changes:
1. Confirm `'use client';` is the first line. Add it if missing.
2. CRITICAL — replace the hardcoded webhook URL. Find the line containing `n8n-n8n.ektnbd.easypanel.host` and replace it with:
   ```typescript
   const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
   if (!webhookUrl) {
     throw new Error('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is not configured');
   }
   ```
   Then use `webhookUrl` in the fetch call instead of the hardcoded string.
3. Fix import paths: update any `@/components/ui/...` imports (should work as-is since same alias).
4. Keep `date-fns` imports exactly as they are — `date-fns` is already installed.
5. Keep `sonner` toast imports exactly as they are — sonner is installed.
6. Keep `@radix-ui/react-dialog` imports — shadcn `dialog` component is installed.
7. The rate limiting logic (localStorage keys `g2_schedule_cooldown`, `g2_schedule_ban`) is fine — keep as-is.
8. Props interface: the existing component likely accepts `isOpen: boolean` and `onClose: () => void`. Keep that interface unchanged.

**Verify no hardcoded URL remains:**

After writing both files, run:
```bash
grep -r "n8n-n8n.ektnbd" "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/src/"
```
This must return empty. If not, the migration is incomplete.
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && echo "--- Navigation 'use client' (must show 'use client'):" && head -1 src/components/Navigation.tsx && echo "--- ScheduleModal 'use client' (must show 'use client'):" && head -1 src/components/ScheduleModal.tsx && echo "--- Hardcoded URL scan (must be empty):" && grep -r "n8n-n8n.ektnbd" src/ || echo "CLEAN" && echo "--- NEXT_PUBLIC env var in ScheduleModal:" && grep "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL" src/components/ScheduleModal.tsx
    </automated>
  </verify>

  <done>
    - `Navigation.tsx` starts with `'use client'`, retains anchor scroll logic unchanged
    - `ScheduleModal.tsx` starts with `'use client'`, uses `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` instead of hardcoded URL
    - `grep -r "n8n-n8n.ektnbd" sitio-g2-nextjs/src/` returns empty
    - Both components compile without TypeScript errors
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 6: Wire page.tsx and run build validation -->
<!-- ============================================================ -->

<task type="auto">
  <name>Task 6: Wire home page and validate clean build</name>

  <files>
    sitio-g2-nextjs/src/app/page.tsx
  </files>

  <action>
Create `src/app/page.tsx` to assemble all sections into the single-page layout. Then run the build and fix any errors.

**Step 6.1 — Write page.tsx:**

Replace the scaffold-generated `src/app/page.tsx` with:

```typescript
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Servicios from '@/components/sections/Servicios';
import Nosotros from '@/components/sections/Nosotros';
import Equipo from '@/components/sections/Equipo';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/sections/Footer';
import ScheduleModal from '@/components/ScheduleModal';

// ScheduleModal open state must live in a client component.
// page.tsx is a Server Component, so delegate open state to a client wrapper.
import HomeClient from '@/components/HomeClient';

export default function Home() {
  return (
    <HomeClient />
  );
}
```

Wait — page.tsx as a Server Component cannot hold useState for the modal. Create a thin client wrapper instead:

Create `sitio-g2-nextjs/src/components/HomeClient.tsx`:

```typescript
'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Servicios from '@/components/sections/Servicios';
import Nosotros from '@/components/sections/Nosotros';
import Equipo from '@/components/sections/Equipo';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/sections/Footer';
import ScheduleModal from '@/components/ScheduleModal';

export default function HomeClient() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <Navigation />
      <main>
        <Hero onScheduleClick={() => setIsScheduleOpen(true)} />
        <Servicios />
        <Nosotros />
        <Equipo />
        <Contacto onScheduleClick={() => setIsScheduleOpen(true)} />
      </main>
      <Footer />
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </>
  );
}
```

Then write `src/app/page.tsx` simply as:

```typescript
import HomeClient from '@/components/HomeClient';

export default function Home() {
  return <HomeClient />;
}
```

Note: page.tsx delegates everything to HomeClient (client component). This is acceptable for Phase 1. Phase 5 can optimize by pushing the modal state down if Server Component benefits become important for LCP.

**Step 6.2 — Run TypeScript check:**

```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
npx tsc --noEmit
```

Fix ALL TypeScript errors before proceeding to build. Common issues to watch for:
- Missing props on components (e.g., if Stitch-generated Hero does not accept `onScheduleClick`)
- `any` types introduced by Stitch — replace with proper types
- ScheduleModal props mismatch (`isOpen`/`onClose` vs whatever the migrated source uses — check and align)
- Embla carousel type issues — the `emblaApi` return may need type assertion

**Step 6.3 — Run production build:**

```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
npm run build 2>&1
```

Examine build output carefully. Fix any issues:

- **"async params" warnings** — These occur in Next.js 15 when `params` or `searchParams` props are not awaited. Phase 1 has no dynamic routes so this should not appear. If it does, check layout.tsx signature — ensure it matches `{ children: React.ReactNode }` exactly.
- **Missing module errors** — Run `npm install` for any missing package.
- **"'use client' in Server Component" errors** — Check that no Server Component imports directly from a `'use client'` module in a way that breaks the boundary. (Server Components CAN import Client Components — this is fine and expected.)
- **Import errors** — Ensure all `@/` alias imports resolve. The `tsconfig.json` `paths` and `next.config.ts` must align.
- **Sonner `<Toaster>` export** — sonner v2 exports `Toaster` as named export. If build errors on this, check: `import { Toaster } from 'sonner'`.

Build success = exit code 0, no errors in output.

**Step 6.4 — Verify bundle size (informational, not a blocker for this task):**

```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
du -sh .next/static/chunks/
```

Note the size. The <100KB gzip target is validated in the human-verify checkpoint (Task 7). Phase 1 with static content should be well under this.

**Step 6.5 — Final hardcoded URL scan:**

```bash
grep -r "n8n-n8n.ektnbd" "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/src/"
```

Must return empty. If not, trace and fix before proceeding.
  </action>

  <verify>
    <automated>
      cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs" && npm run build 2>&1 | tail -20 && echo "---BUILD EXIT CODE: $?"
    </automated>
  </verify>

  <done>
    - `src/app/page.tsx` renders `<HomeClient />`
    - `src/components/HomeClient.tsx` assembles Navigation + all 6 sections + ScheduleModal with isScheduleOpen state
    - `npm run build` exits code 0 (no errors)
    - Build output contains zero "async params" warnings
    - Build output contains zero TypeScript errors
    - `.next/` directory exists after build
  </done>
</task>

<!-- ============================================================ -->
<!-- TASK 7: Human verification checkpoint -->
<!-- ============================================================ -->

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Complete Next.js 15 project at sitio-g2-nextjs/ with:
    - All 6 sections generated via Stitch MCP (Hero, Servicios, Nosotros, Equipo, Contacto, Footer)
    - Navigation and ScheduleModal migrated from existing React source
    - next/font loading Inter and Roboto Mono
    - LocalBusiness JSON-LD in layout.tsx
    - Environment variables in .env.local (webhook URL removed from source)
    - Clean npm run build (exit code 0)
  </what-built>

  <how-to-verify>
Start the dev server and run these checks in order:

**1. Start dev server:**
```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
npm run dev
```
Open http://localhost:3000 in your browser.

**2. Visual section check (all 6 must be visible on scroll):**
- [ ] Hero section: headline "Transformamos tu Negocio", 3 stat cards, "Comienza tu Transformación" button, canvas particles visible in background
- [ ] Servicios section: 6 service cards in grid layout
- [ ] Nosotros section: 3 paragraphs, stats row, 4 values cards, quote
- [ ] Equipo section: carousel with 4 agent cards, prev/next buttons work
- [ ] Contacto section: contact form (4 fields + submit button), 3 contact info cards, social links
- [ ] Footer: logo, 3 link columns, social icons, copyright year

**3. Navigation check:**
- [ ] Sticky nav visible at top
- [ ] Clicking nav links (Inicio, Servicios, Nosotros, Contacto) smoothly scrolls to correct sections
- [ ] "Empezar" CTA button scrolls to #contacto

**4. ScheduleModal check:**
- [ ] Click "Comienza tu Transformación" in Hero — modal opens
- [ ] Click "Agendar llamada" in Contacto — modal opens
- [ ] Modal shows date/time picker and form fields
- [ ] Closing modal works (X button or clicking outside)

**5. Security check — no hardcoded webhook URL:**
```bash
grep -r "n8n-n8n.ektnbd" "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/src/"
```
Must return empty.

**6. .env.local gitignored:**
```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
git status --short | grep ".env.local"
```
Must show `?? .env.local` (untracked) or nothing. Must NOT show as a tracked file.

**7. LocalBusiness JSON-LD in page source:**
In browser DevTools → Elements → search for "LocalBusiness" in the HTML source.
Must find a `<script type="application/ld+json">` tag with "G2 Intelligence" and "Jamundí" in the areaServed array.

**8. Font loading check:**
In browser DevTools → Network → filter by "Font".
Must see Inter and Roboto Mono loaded from next server (/_next/static/media/...), NOT from fonts.googleapis.com.

**9. Build bundle size:**
```bash
cd "C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs"
du -sh .next/
```
Note the total size. The gzip-compressed JavaScript should be well under 100KB (the full .next/ folder may be larger — that's ok; check the `First Load JS` size reported during `npm run build` output instead).

In the build output (`npm run build`), look for the route "/" row. The "First Load JS" column should show a reasonable size. For a static content site with shadcn components, expect 100-200KB total (includes React runtime). Pure content JS should be <100KB gzip.
  </how-to-verify>

  <resume-signal>
Type "approved" if all checks pass. Or describe what's broken (e.g., "Equipo carousel not working", "modal won't open") and Claude will fix it before re-verifying.
  </resume-signal>
</task>

</tasks>

<verification>
Phase 1 is complete when ALL of the following are true:

1. `npm run build` from `sitio-g2-nextjs/` exits code 0 with zero TypeScript errors and zero async-params warnings.

2. All 6 sections visible at localhost:3000 on scroll: Hero, Servicios, Nosotros, Equipo, Contacto, Footer.

3. Hardcoded URL scan returns empty:
   ```bash
   grep -r "n8n-n8n.ektnbd" sitio-g2-nextjs/src/
   ```

4. `.env.local` is gitignored:
   ```bash
   git -C sitio-g2-nextjs check-ignore -v .env.local
   ```
   Must output a match (file is ignored).

5. LocalBusiness JSON-LD present in page HTML with all 6 areaServed values including "Jamundí".

6. Fonts loading from Next.js static server, not googleapis.com (verified in DevTools Network tab).

7. `layout.tsx` has zero `'use client'` directives:
   ```bash
   grep "use client" sitio-g2-nextjs/src/app/layout.tsx
   ```
   Must return empty.

8. `ScheduleModal.tsx` uses env var, not hardcoded URL:
   ```bash
   grep "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL" sitio-g2-nextjs/src/components/ScheduleModal.tsx
   ```
   Must return a match.
</verification>

<success_criteria>
Phase 1 succeeds when:
- A developer can clone the repo, run `cp .env.local.example .env.local`, fill in the webhook URL, and `npm run dev` renders all 6 sections at localhost:3000
- `npm run build` produces a clean build with no errors or async-params warnings
- No webhook URL is discoverable by grepping the source code
- Google's Rich Results Test (https://search.google.com/test/rich-results) shows LocalBusiness schema with areaServed including Cali, Jamundí, Palmira, Yumbo
- All subsequent phases (SEO, forms, chat, performance) can build on this foundation without rework
</success_criteria>

<output>
After human-verify checkpoint passes, create:
`.planning/phases/01-foundation-technical-setup/01-SUMMARY.md`

Include:
- What was built (project path, stack versions)
- Component architecture decisions made (which got 'use client' and why)
- Stitch MCP output quality notes (any components that needed significant post-generation fixes)
- Files created (full list)
- Any deviations from the plan and why
- Open items or technical debt for later phases
</output>
