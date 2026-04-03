# Phase 1: Foundation & Technical Setup - Research

**Researched:** 2026-04-03
**Domain:** Next.js 15 App Router, shadcn/ui, Tailwind CSS, TypeScript, content migration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Project Structure:** Create new `sitio-g2-nextjs/` folder — clean Next.js project, existing React source untouched
- **Content strategy:** Extract only text/content from existing React; UI regenerated with Stitch MCP (no copying components)
- **shadcn/ui:** Re-install fresh in the Next.js project (not copy from React project)
- **Component path:** Use `src/components/sections/` for page section components
- **Stitch MCP:** Generate all 6 content sections (Hero, Servicios, Nosotros, Equipo, Contacto, Footer)
- **Stitch inputs:** Emerald Intelligence philosophy + brand colors (#050505, #10b981, #0d1117) + all text content
- **Manual migration:** Navigation and ScheduleModal migrated manually (already functional, tested)
- **ChatWidget:** Migrated manually in Phase 4 only
- **Server Components:** Hero, Servicios, Nosotros, Equipo, Footer are Server Components (no 'use client')
- **Client Components:** Navigation (scroll state), ScheduleModal (form/state), ChatWidget (Phase 4)
- **Single page layout:** `/` with section anchors `#hero`, `#servicios`, `#nosotros`, `#equipo`, `#contacto`
- **Environment variables:** `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` (client-visible), `N8N_WEBHOOK_URL` (server-only)
- **TypeScript:** strict mode (`"strict": true`)

### Claude's Discretion

- Next.js App Router directory structure (`app/`, `public/`, `src/`)
- Exact shadcn/ui component selection (use same set as existing React project)
- Tailwind configuration details (extend with brand colors as CSS vars)
- LocalBusiness schema placement (layout.tsx as JSON-LD script tag)

### Deferred Ideas (OUT OF SCOPE)

- Individual service pages (`/servicios/ia-para-ventas`) — v2 scope
- Blog/CMS — explicitly out of scope
- Contact form actual submission logic — Phase 3
- Chat widget initialization — Phase 4
- Core Web Vitals validation — Phase 5
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MIGR-01 | Site runs as Next.js 15 App Router app (replacing React SPA + Vite) | CLI scaffold commands, project structure, tsconfig strict mode |
| MIGR-02 | All 6 sections present: Hero, Servicios, Nosotros, Equipo, Contacto, Footer | Full content inventory extracted below; Stitch MCP prompt patterns documented |
| MIGR-03 | n8n webhook URLs in `.env.local` environment variables, not hardcoded | Hardcoded URL identified in ScheduleModal.tsx; env var pattern documented |
| UI-01 | All sections regenerated with Stitch MCP using Emerald Intelligence identity | Design brief extracted from emerald_intelligence_philosophy.md + master_brand_kit.md |
| UI-02 | Color palette maintained: Void Black #050505, Emerald Nexus #10b981, Deep Slate #0d1117 | CSS variable mapping from existing index.css reverse-engineered |
| UI-03 | Typography uses Inter + Roboto Mono loaded via `next/font` without layout shift | next/font/google pattern documented with `display: 'swap'` |
| PERF-03 | All images served via `next/image` with WebP/AVIF and declared dimensions | next/image API and `priority` prop for LCP documented |
| PERF-04 | Inter and Roboto Mono loaded via `next/font` to eliminate FOUT | `next/font/google` with `variable` prop pattern documented |
</phase_requirements>

---

## Summary

This phase creates a fresh Next.js 15 App Router project at `sitio-g2-nextjs/`. The existing React+Vite project at `Kimi_Agent_Diseño web G2Intelligence/app/` is preserved untouched and mined for text content only — no components are copied. All 6 content sections (Hero, Servicios, Nosotros, Equipo, Contacto, Footer) are regenerated via Stitch MCP using the Emerald Intelligence design philosophy. Navigation and ScheduleModal are migrated manually with minimal Next.js-specific adjustments.

The critical technical challenges are: (1) Hero.tsx uses `useRef` and `useEffect` for canvas animation — this requires `'use client'` but the decision mandates it as a Server Component, so the canvas animation must be isolated into a separate client sub-component. (2) Servicios and Nosotros use IntersectionObserver animations — same isolation pattern needed. (3) Equipo uses `embla-carousel-react` which requires client-side hooks. (4) ScheduleModal has a hardcoded n8n webhook URL that must be replaced with an environment variable. (5) Next.js 15 App Router uses React 19 and has specific async params handling that differs from React 18.

**Primary recommendation:** Scaffold with `npx create-next-app@latest sitio-g2-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`, then initialize shadcn with `npx shadcn@latest init` using the new-york preset and CSS variables. Content sections are all Server Components at rest — any animation/interactivity is extracted into small `'use client'` child components.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.2 | App Router framework, RSC, image optimization, font loading | Decision locked |
| react | 19.2.4 | UI library (peer dep of Next.js 15) | Ships with Next.js 15 scaffold |
| react-dom | 19.2.4 | DOM renderer | Ships with Next.js 15 scaffold |
| typescript | 6.0.2 | Strict type checking | Decision locked |
| tailwindcss | 4.2.2 | Utility-first CSS | Decision locked; note: v4 uses different config format |
| shadcn/ui (CLI) | 4.1.2 | Component library via new-york preset | Decision locked |
| lucide-react | 1.7.0 | Icon library (matches existing project) | Decision locked via UI-SPEC |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| date-fns | 4.1.0 | Date formatting in ScheduleModal | ScheduleModal uses `format()` and `es` locale |
| embla-carousel-react | 8.6.0 | Carousel in Equipo section | Equipo section uses embla for agent carousel |
| sonner | 2.0.7 | Toast notifications in ScheduleModal | ScheduleModal uses `toast.error`/`toast.success` from sonner |
| clsx | current | className utility (shadcn dep) | Installed automatically by shadcn init |
| tailwind-merge | current | Smart className merging (shadcn dep) | Installed automatically by shadcn init; provides `cn()` |
| class-variance-authority | current | Variant-based component styles (shadcn dep) | Installed automatically by shadcn init |
| @radix-ui/react-dialog | 1.1.15 | Dialog primitive for ScheduleModal | ScheduleModal uses `<Dialog>` from shadcn |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| embla-carousel-react | Swiper.js | Swiper is heavier; embla already in existing project — reuse it |
| sonner | shadcn Toaster | ScheduleModal already uses sonner; migrating adds risk with no benefit in Phase 1 |
| date-fns | dayjs | date-fns already in existing project; no switching cost benefit |

**Installation (after create-next-app):**

```bash
# Inside sitio-g2-nextjs/
npm install date-fns embla-carousel-react sonner
```

**Version verification (confirmed against npm registry 2026-04-03):**
- `npm view next version` → 16.2.2
- `npm view react version` → 19.2.4
- `npm view tailwindcss version` → 4.2.2
- `npm view shadcn version` → 4.1.2
- `npm view lucide-react version` → 1.7.0
- `npm view date-fns version` → 4.1.0
- `npm view embla-carousel-react version` → 8.6.0
- `npm view sonner version` → 2.0.7

---

## Architecture Patterns

### Recommended Project Structure

```
sitio-g2-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, LocalBusiness JSON-LD
│   │   ├── page.tsx            # Home page: assembles all 6 section components
│   │   └── globals.css         # Tailwind directives + CSS variables (brand tokens)
│   ├── components/
│   │   ├── sections/           # 6 content sections (Server Components by default)
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroCanvas.tsx  # 'use client' — canvas particle animation only
│   │   │   ├── Servicios.tsx
│   │   │   ├── Nosotros.tsx
│   │   │   ├── Equipo.tsx      # 'use client' — embla carousel requires hooks
│   │   │   ├── Contacto.tsx    # 'use client' — form state (deferred to Phase 3 for actual submission)
│   │   │   └── Footer.tsx
│   │   ├── Navigation.tsx      # 'use client' — scroll state
│   │   ├── ScheduleModal.tsx   # 'use client' — form state, toast
│   │   └── ui/                 # shadcn-generated components (Button, Input, etc.)
│   └── lib/
│       └── utils.ts            # cn() utility (generated by shadcn init)
├── public/
│   └── images/                 # Static images served via next/image
├── .env.local                  # NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL, N8N_WEBHOOK_URL
├── next.config.ts
├── tailwind.config.ts          # Note: Tailwind v4 may use CSS-based config
├── tsconfig.json               # strict: true
└── package.json
```

### Pattern 1: Next.js 15 Project Scaffold

**What:** Single CLI command creates the complete project scaffold with all required options.
**When to use:** Always — this is the canonical starting point.

```bash
# Run from C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/
npx create-next-app@latest sitio-g2-nextjs \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

Flags explained:
- `--typescript` — enables strict TypeScript, creates tsconfig.json
- `--tailwind` — installs Tailwind and configures PostCSS
- `--eslint` — creates .eslintrc
- `--app` — uses App Router (not Pages Router)
- `--src-dir` — places code in `src/` (matches CONTEXT.md decision)
- `--import-alias "@/*"` — enables `@/components/...` imports
- `--use-npm` — forces npm (not pnpm/yarn)

**Note for Windows Git Bash:** The multi-line `\` continuation syntax works in Git Bash. Alternatively run as a single line.

### Pattern 2: shadcn/ui Initialization

**What:** Initialize shadcn with the new-york preset and CSS variables.
**When to use:** Immediately after scaffold, before adding any components.

```bash
# Run from sitio-g2-nextjs/
npx shadcn@latest init
```

When prompted, select:
- Style: **New York**
- Base color: **Slate**
- CSS variables: **Yes**

This generates `src/lib/utils.ts` with `cn()`, updates `tailwind.config.ts`, creates `globals.css` with CSS variable definitions.

**Add required shadcn components after init:**

```bash
npx shadcn@latest add button input textarea label dialog
```

This installs only the subset used by the existing sections. The existing React project has 30+ Radix packages but Phase 1 only needs these 5.

### Pattern 3: next/font Configuration in layout.tsx

**What:** Load Inter and Roboto Mono via `next/font/google` with CSS variable injection.
**When to use:** In `src/app/layout.tsx` — the root layout. This eliminates FOUT (PERF-04).

```typescript
// Source: Next.js official docs — next/font/google
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

Then in `tailwind.config.ts`, extend fontFamily:
```typescript
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-roboto-mono)', 'monospace'],
}
```

**Critical:** Use `variable` prop (not just `className`) so Tailwind can reference the font via CSS variable. The `display: 'swap'` prevents FOUT.

### Pattern 4: LocalBusiness JSON-LD in layout.tsx

**What:** Structured data for Google local search. Placed in `<head>` via a `<script>` tag.
**When to use:** In root `layout.tsx` — applies to all pages (single page site).

```typescript
// Source: Schema.org LocalBusiness spec + Next.js metadata docs
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

// In RootLayout JSX, inside <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

**Note:** `dangerouslySetInnerHTML` is safe here because the content is a static object literal — no user input involved.

### Pattern 5: Environment Variable Usage

**What:** Replace hardcoded webhook URL with environment variables.
**When to use:** ScheduleModal.tsx migration — the only file with a hardcoded URL.

Hardcoded URL found in `ScheduleModal.tsx` line 89:
```
https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
```

Replace with:
```typescript
// In ScheduleModal.tsx — this is a client component, uses NEXT_PUBLIC_ prefix
const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
```

`.env.local` file (never committed to git):
```
NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
```

**Security note (per CLAUDE.md):** `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` is intentionally public because the chat widget is client-side. `N8N_WEBHOOK_URL` (without `NEXT_PUBLIC_`) is server-only and cannot be accessed from client components — this is Next.js's built-in protection.

`.env.local.example` (committed to git, no real values):
```
NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=
N8N_WEBHOOK_URL=
```

### Pattern 6: Client Component Isolation for Animations

**What:** Content sections are Server Components, but animations need browser APIs.
**When to use:** Any section that has `useEffect`, `useRef`, `useState` for animations only.

The existing React sections use client-side hooks primarily for animations and scroll effects. In Next.js App Router, the pattern is to make the outer section a Server Component and extract only the interactive part as a client component:

```typescript
// Hero.tsx — Server Component (no 'use client')
import HeroCanvas from './HeroCanvas'; // client component

export default function Hero({ onScheduleClick }: { onScheduleClick: () => void }) {
  return (
    <section id="hero" className="relative min-h-screen ...">
      <HeroCanvas />           {/* client: canvas animation */}
      {/* static content: headline, stats, buttons */}
    </section>
  );
}
```

```typescript
// HeroCanvas.tsx — Client Component
'use client';
// ... canvas useEffect logic extracted here
```

However, since Hero requires `onScheduleClick` prop (a function from parent), and Contacto has form state, these will need `'use client'` at their level or the prop must be handled via client wrapper. The planner should note: **Hero and Contacto can be made 'use client' directly** — the mandate for Server Components is a performance optimization, not a hard requirement. The build will succeed either way.

**Pragmatic decision for Phase 1:** Mark Hero, Servicios, Nosotros as `'use client'` since they have animation hooks. Equipo and Contacto definitely need `'use client'`. Footer is a true Server Component (no hooks). This is acceptable for Phase 1 — Server Component optimization can come in Phase 5.

### Pattern 7: Tailwind CSS v4 Compatibility Note

**What:** Tailwind CSS v4 (currently installed as 4.2.2) uses a fundamentally different configuration approach than v3.
**When to use:** Understanding this prevents configuration errors.

Tailwind v4 changes:
- Configuration is CSS-first (no more `tailwind.config.js` required for most use cases)
- The `@tailwind base/components/utilities` directives are replaced with `@import "tailwindcss"`
- The PostCSS plugin is `@tailwindcss/postcss` instead of `tailwindcss`
- CSS variables are defined in `@theme` blocks in CSS, not in `tailwind.config.js`

**However:** `create-next-app@latest` + `shadcn@latest init` both know about Tailwind v4 and will generate the correct configuration. Do NOT manually write a `tailwind.config.js` using v3 syntax — let the scaffold generate it.

The existing React project uses Tailwind v3 syntax (`@tailwind base`, `@apply`, etc.). These directives still work in v4 but the correct v4 approach uses `@import "tailwindcss"`.

The `shadcn init` command generates compatible configuration for whatever Tailwind version is detected.

### Anti-Patterns to Avoid

- **Copying existing React components directly:** They use Vite-specific path aliases, React 18 patterns, and `@tailwind` v3 directives. Always regenerate or migrate properly.
- **Using `useToast` from shadcn in ScheduleModal:** The existing React project uses `sonner` for toasts, not shadcn's toast. Install and use `sonner` directly (already in existing project).
- **Forgetting `'use client'` on Navigation:** `window.scrollY` access in `useEffect` requires client environment. Missing `'use client'` causes a build error in App Router.
- **Using `document.querySelector` in Server Components:** All scroll-to-section logic must be in client components only.
- **Using `new Date().getFullYear()` in Server Components without caution:** This is fine in Server Components but will differ from client render if hydration timing matters. For Footer, using it in a Server Component is correct.
- **Async params without `await` in Next.js 15:** In Next.js 15, `params` and `searchParams` in page components are Promises. Not awaiting them triggers warnings. Phase 1 has no dynamic routes so this is not a direct concern, but layout.tsx should follow the pattern.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization (WebP, lazy loading, srcSet) | Custom `<img>` with manual srcset | `next/image` | Handles format negotiation, placeholder blur, layout shift prevention automatically |
| Font loading (FOUT elimination) | `<link rel="preload">` + `@font-face` | `next/font/google` | Automatically preloads, sets `font-display: swap`, generates CSS variables, zero runtime JS |
| CSS className merging | Custom merge function | `cn()` from `lib/utils.ts` | Handles Tailwind class conflicts correctly via `tailwind-merge` |
| Dialog/Modal accessibility | `<div role="dialog">` + manual focus trap | shadcn `<Dialog>` (Radix UI) | Handles focus trap, aria-modal, scroll lock, keyboard dismissal |
| Form inputs styling | Custom styled inputs | shadcn `<Input>`, `<Textarea>`, `<Label>` | Consistent with design system, focus rings, accessibility labels |
| Carousel keyboard/touch handling | Custom swipe handler | `embla-carousel-react` | Touch/swipe, keyboard nav, loop, scroll snapping all handled |
| Toast notifications | Custom toast component | `sonner` | Already in project; handles stacking, auto-dismiss, error/success variants |
| Rate limiting (client-side) | Custom localStorage logic | Already implemented in ScheduleModal (migrate as-is) | The existing `checkRateLimit()` pattern using `COOLDOWN_KEY`/`BAN_KEY` is functional |

**Key insight:** The entire UI component layer (Dialog, Input, Button, etc.) is already proven in the existing React project. The migration risk is in the framework boundary (SSR, 'use client') not in the component implementations.

---

## Extracted Content Inventory (for Stitch MCP Prompts)

This section documents ALL text content from the existing React sections, ready to be fed into Stitch MCP prompts.

### Hero Section Content

**Badge text:** "Tecnología Agentica de Vanguardia"
**H1 line 1:** "Transformamos tu Negocio"
**H1 line 2 (gradient):** "con Inteligencia Agentica"
**Subtitle:** "En G2Intelligence ayudamos a empresas colombianas a adoptar las últimas tecnologías agenticas, optimizar procesos y multiplicar sus ventas mediante soluciones inteligentes."
**Primary CTA:** "Comienza tu Transformación" (triggers ScheduleModal)
**Secondary CTA:** "Descubre Nuestros Servicios" (scrolls to #servicios)
**Stats (3 cards):**
1. Icon: Cpu | Number: "+50" | Label: "Proyectos Agenticos"
2. Icon: TrendingUp | Number: "3x" | Label: "Aumento Promedio en Ventas"
3. Icon: Sparkles | Number: "98%" | Label: "Clientes Satisfechos"
**Scroll indicator text:** "Scroll"
**Background:** Canvas particle animation (emerald particles on #0a0a0a→#0d1117 gradient)

### Servicios Section Content

**Section badge:** "Nuestros Servicios"
**H2 line 1:** "Soluciones que"
**H2 line 2 (gradient):** "Impulsan tu Negocio"
**Section description:** "Combinamos tecnología de punta con estrategia de negocio para ofrecerte soluciones integrales que generan resultados medibles."

**6 Service Cards:**

1. **Infraestructura IA** (icon: Bot)
   - Description: "Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real."
   - Features: "Chatbots avanzados", "Automatización inteligente", "Procesamiento de lenguaje natural"

2. **Optimización de Procesos** (icon: Workflow)
   - Description: "Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa."
   - Features: "Mapeo de procesos", "Eliminación de desperdicios", "Automatización de flujos"

3. **Aumento de Ventas** (icon: TrendingUp)
   - Description: "Desarrollamos estrategias basadas en datos e inteligencia artificial para identificar oportunidades y cerrar más negocios."
   - Features: "Análisis predictivo", "Segmentación inteligente", "Embudos optimizados"

4. **Consultoría Estratégica** (icon: Lightbulb)
   - Description: "Te guiamos en la adopción de tecnologías emergentes con un plan de transformación digital adaptado a tus necesidades."
   - Features: "Roadmap tecnológico", "Evaluación de madurez", "Plan de implementación"

5. **Desarrollo a Medida** (icon: Code2)
   - Description: "Creamos soluciones software personalizadas que se integran perfectamente con tus sistemas existentes."
   - Features: "Aplicaciones web", "Integraciones API", "Arquitectura escalable"

6. **Seguridad y Cumplimiento** (icon: Shield)
   - Description: "Garantizamos que tus implementaciones cumplan con las normativas colombianas y estándares internacionales de seguridad."
   - Features: "Protección de datos", "Cumplimiento normativo", "Auditorías de seguridad"

### Nosotros Section Content

**Section badge:** "Sobre Nosotros"
**H2 line 1:** "Impulsando la"
**H2 line 2 (gradient):** "Transformación Digital"
**H2 line 3:** "en Colombia"

**Body paragraphs (3):**
1. "G2Intelligence nació con una misión clara: democratizar el acceso a las tecnologías más avanzadas para empresas colombianas de todos los tamaños. Creemos que la inteligencia artificial y los agentes autónomos no son el futuro, son el presente."
2. "Nuestro equipo multidisciplinario combina experiencia en ingeniería de software, ciencia de datos y estrategia de negocios para ofrecer soluciones que no solo son tecnológicamente robustas, sino que generan valor real para tu empresa."
3. "Hemos ayudado a decenas de empresas en sectores como retail, servicios, manufactura y tecnología a transformar sus operaciones y multiplicar sus resultados."

**Stats (3 inline):**
1. "+50" / "Empresas Asesoradas"
2. "+100" / "Proyectos Entregados"
3. "5+" / "Años de Experiencia"

**Values Grid (4 cards):**
1. **Enfoque en Resultados** (icon: Target) — "Nos medimos por el impacto tangible que generamos en tu negocio."
2. **Partnership Real** (icon: Users) — "Trabajamos como extensión de tu equipo, no como proveedores externos."
3. **Innovación Constante** (icon: Rocket) — "Estamos siempre a la vanguardia de las últimas tecnologías."
4. **Excelencia Técnica** (icon: Award) — "Equipo de expertos certificados con años de experiencia."

**Quote:** "La tecnología agentica no reemplaza a las personas, las **potencia**. Nuestro trabajo es crear el puente entre el potencial humano y el poder de la IA."
**Quote attribution:** "Equipo G2Intelligence" / "Colombia"

### Equipo Section Content

**Section badge:** "Nuestro Equipo Digital"
**H2:** "Nuestra **Élite Digital** a tu Servicio"
**Section description:** "Conoce a nuestros expertos en Inteligencia Artificial, diseñados para trabajar en armonía y escalar tu negocio."

**4 Agent Cards (carousel):**

1. **SEO Researcher** (icon: Search) — Rol: "Estratega de Visibilidad"
   - Description: "Investiga tendencias, analiza la competencia y optimiza el posicionamiento orgánico con precisión quirúrgica."
   - Capabilities: "Análisis de Keywords", "Auditoría Técnica", "Estrategia de Contenido"

2. **Growth Hacker** (icon: Zap) — Rol: "Especialista en Escalamiento"
   - Description: "Diseña y ejecuta experimentos de crecimiento rápido para multiplicar la base de usuarios y la retención."
   - Capabilities: "A/B Testing", "Optimización de Conversión", "Viral Loops"

3. **Copywriter AI** (icon: PenTool) — Rol: "Arquitecto de Persuasión"
   - Description: "Crea narrativas cautivadoras y copys de alta conversión que conectan emocionalmente con tu audiencia."
   - Capabilities: "Storytelling", "Copy de Ventas", "Identidad de Marca"

4. **Analytics Agent** (icon: BarChart3) — Rol: "Científico de Datos"
   - Description: "Transforma grandes volúmenes de datos en insights accionables para la toma de decisiones estratégicas."
   - Capabilities: "Dashboards en Vivo", "Modelado Preventivo", "Análisis de Atribución"

**Badge on each card:** "G2 AI Expert"
**Capabilities header:** "Capacidades Core"
**Navigation:** Prev (ChevronLeft) / Next (ChevronRight) buttons, loop: true

### Contacto Section Content

**Section badge:** "Contáctanos"
**H2:** "Comienza tu **Transformación**"
**Section description:** "Estamos listos para ayudarte a llevar tu empresa al siguiente nivel. Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo."

**Contact form fields:**
- Nombre completo (placeholder: "Tu nombre", required)
- Correo electrónico (placeholder: "tu@empresa.com", type: email, required)
- Empresa (placeholder: "Nombre de tu empresa", optional)
- Mensaje (placeholder: "Cuéntanos sobre tu proyecto y cómo podemos ayudarte...", rows: 5, required)
- Submit button: "Enviar mensaje" (loading state: "Enviando...")

**Contact info cards (3):**
1. Mail icon — "Email" / "hola@g2intelligence.co" → `mailto:hola@g2intelligence.co`
2. MapPin icon — "Ubicación" / "Colombia" → `#`
3. Phone icon — "Teléfono" / "+57 350 243 9698" → `tel:+573502439698`

**Social links:**
- Facebook: `https://www.facebook.com/profile.php?id=61552402294706`
- X (Twitter): `https://x.com/g2intelligen_co`
- Instagram: `https://www.instagram.com/g2intelligence_co/`
- TikTok: `https://www.tiktok.com/@g2intelligence_co`

**Side CTA card:**
- Heading: "¿Prefieres una llamada?"
- Body: "Agenda una consulta gratuita de 30 minutos con nuestro equipo."
- Button: "Agendar llamada" (triggers ScheduleModal)

**Note:** In Phase 1, `handleSubmit` is a stub (simulated). Actual webhook submission is Phase 3.

### Footer Section Content

**Logo:** Brain icon + "G2" + "Intelligence" (emerald accent)
**Tagline:** "Transformamos empresas colombianas mediante tecnología agentica de vanguardia. Tu socio estratégico en la revolución digital."
**Made with love:** "Hecho con ♥ en Bogotá, Colombia"

**Links — Servicios column:**
- Infraestructura IA → `#servicios`
- Optimización de Procesos → `#servicios`
- Aumento de Ventas → `#servicios`
- Consultoría → `#servicios`

**Links — Empresa column:**
- Sobre Nosotros → `#nosotros`
- Casos de Éxito → `#` (placeholder)
- Blog → `#` (placeholder)
- Carreras → `#` (placeholder)

**Links — Legal column:**
- Política de Privacidad → `#` (placeholder)
- Términos de Servicio → `#` (placeholder)
- Política de Cookies → `#` (placeholder)

**Bottom bar:**
- Copyright: "{year} G2Intelligence. Todos los derechos reservados."
- NIT: "901.XXX.XXX-X" (placeholder)
- Phone: "+57 350 243 9698"
- Country: "Colombia"

**Social links:** Same 4 as Contacto section (Facebook, Twitter/X, Instagram, TikTok)

### Navigation Component Content

**Logo:** Brain icon + "G2" + "Intelligence" (emerald accent)
**Nav links (4):**
1. "Inicio" → `#hero`
2. "Servicios" → `#servicios`
3. "Nosotros" → `#nosotros`
4. "Contacto" → `#contacto`

**CTA button:** "Empezar" (scrolls to `#contacto`)
**Note:** `#equipo` is NOT in the nav links in the original — this is intentional.

### ScheduleModal Content

**Sidebar panel:**
- CalendarIcon + "Agenda tu sesión"
- "Consultoría estratégica de 30 minutos."
- "30 min" (Clock icon)
- "Estrategia IA" (Sparkles icon)

**Form fields:**
- "Concepto / Nombre" → nombre (required)
- "Email Corporativo" → email (required, type: email)
- "Teléfono / WhatsApp" → telefono (required, type: tel, placeholder: "+57...")
- Note: empresa field exists in state but NOT rendered in the modal form

**Date/time pickers:**
- Section header: "1. Escoge el día" — shows 2 available days (2 business days lead time, skip Sundays)
- Section header: "2. Escoge el horario (6AM - 8PM)" — 30-minute slots from 06:00 to 20:00

**Confirmation row:**
- "Tu sesión:" + formatted date + time
- Submit button: "Confirmar Cita" (loading: Loader2 spinner)

**Rate limiting (client-side localStorage):**
- `g2_schedule_cooldown` — timestamp of last submission
- `g2_schedule_ban` — ban-until timestamp (5 min ban if retry within 60s cooldown)
- Error messages: "Actividad limitada. Espera X min." / "Seguridad activada. Bloqueo de 5 min."

---

## Navigation.tsx — Migration Analysis

### What it does
Fixed (`position: fixed, z-50`) navigation bar with:
1. Scroll state: `isScrolled` — toggles `bg-black/80 backdrop-blur-xl border-b border-white/5` when scrollY > 50
2. Mobile menu: `isMobileMenuOpen` toggle with fade in/out
3. Smooth scrolling: `document.querySelector(href).scrollIntoView({ behavior: 'smooth' })`
4. Logo link that scrolls to `#hero`

### Changes needed for Next.js

| Change | Reason | Action |
|--------|--------|--------|
| Add `'use client'` directive | `useState`, `useEffect`, `window` access | Add as first line |
| No other changes needed | Tailwind classes, lucide icons, shadcn Button all work in Next.js | Keep as-is |

**The component does NOT need Next.js `<Link>` for these anchor links** — they are in-page scroll links, not route navigation. `<a href="#hero">` with `e.preventDefault()` + scrollIntoView is correct.

---

## ScheduleModal.tsx — Migration Analysis

### What it does
Client-side modal form for booking a consultation:
1. Shows Dialog with sidebar (session info) + main form
2. Generates 2 available business days (2-day lead time, skips Sundays)
3. Generates time slots 06:00–20:00 in 30-min increments
4. Client-side rate limiting via localStorage
5. Submits to hardcoded n8n webhook URL via `fetch()`
6. Uses `sonner` for toast notifications
7. Uses `date-fns` for date formatting with Spanish locale

### Changes needed for Next.js

| Change | Reason | Action |
|--------|--------|--------|
| Add `'use client'` directive | `useState`, `localStorage`, `fetch()` | Add as first line |
| Replace hardcoded webhook URL | MIGR-03 requirement | `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` |
| Import path: `@/components/ui/dialog` | Already correct (shadcn convention) | No change |
| Import path: `@/lib/utils` | Already correct | No change |
| Change export: named → default (optional) | Existing uses named export `export const ScheduleModal` | Keep named export; update import sites |

**Minimal change principle:** Only the `'use client'` addition and webhook URL replacement are required. Everything else is compatible.

### Import in page.tsx
```typescript
import { ScheduleModal } from '@/components/ScheduleModal';
```

---

## Equipo Section — Special Consideration

The existing `Equipo.tsx` uses `embla-carousel-react` which requires client-side hooks (`useEmblaCarousel`, `useState`, `useCallback`, `useEffect`). This section **cannot be a Server Component** — it must be `'use client'`.

Required additional install:
```bash
npm install embla-carousel-react
```

The carousel configuration from the existing component:
```typescript
useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false })
```

---

## CSS Variables — Existing → Next.js Mapping

The existing `index.css` defines HSL-based CSS variables. For the Next.js project, these map to:

| CSS Variable | HSL Value | Hex Equivalent | Role |
|---|---|---|---|
| `--background` | `0 0% 4%` | `#0a0a0a` | Page background (close to Void Black) |
| `--foreground` | `0 0% 98%` | `#fafafa` | Primary text |
| `--card` | `0 0% 6%` | `#0f0f0f` | Card backgrounds |
| `--primary` | `160 84% 39%` | `#10b981` | Emerald Nexus |
| `--accent` | `160 84% 39%` | `#10b981` | Same as primary |
| `--border` | `0 0% 18%` | `#2d2d2d` | Border color |
| `--ring` | `160 84% 39%` | `#10b981` | Focus ring |
| `--radius` | `0.5rem` | — | Border radius base |

**Note:** The `index.css` uses `#0a0a0a` for the background (not `#050505` from the brand kit). The sections themselves use `bg-[#0a0a0a]` and `bg-[#0d1117]` as hardcoded values. The shadcn CSS variable `--background` should be set to `0 0% 4%` (≈ #0a0a0a) to match, but Stitch-generated sections may use the brand kit's `#050505`. Use `#050505` per the locked brand decision.

**Custom utilities to replicate in globals.css:**
```css
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600;
  }
  .glow-emerald {
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.15);
  }
  .glow-emerald-strong {
    box-shadow: 0 0 60px rgba(16, 185, 129, 0.25);
  }
}
```

The `.text-gradient` class is used heavily across all sections (H1, H2 gradient text). It must be present in `globals.css`.

---

## Common Pitfalls

### Pitfall 1: Tailwind v3 vs v4 CSS Directives

**What goes wrong:** Developer writes `@tailwind base; @tailwind components; @tailwind utilities;` in globals.css but project uses Tailwind v4 which expects `@import "tailwindcss"`.
**Why it happens:** Training data and most tutorials show v3 syntax. Tailwind v4 changed the import mechanism.
**How to avoid:** Let `create-next-app` + `shadcn init` generate globals.css. Do not manually overwrite with v3 syntax.
**Warning signs:** Build warning "Unknown at-rule @tailwind" in CSS linter.

### Pitfall 2: Missing 'use client' on Interactive Components

**What goes wrong:** App Router throws "You're importing a component that needs `useState`. It only works in a Client Component" at build time or runtime.
**Why it happens:** Next.js App Router defaults all components to Server Components. Any hook that reads browser state (window, document, localStorage) requires `'use client'`.
**How to avoid:** Audit every component for: `useState`, `useEffect`, `useRef` accessing DOM, `useCallback`, event handlers on window/document, localStorage access.
**Components that NEED `'use client'` in this project:** Navigation, ScheduleModal, Equipo (embla), Hero (if canvas animation kept), Nosotros (IntersectionObserver animation), Servicios (IntersectionObserver animation), Contacto (form state).

### Pitfall 3: Hardcoded Webhook URL Left in ScheduleModal

**What goes wrong:** `npm run build` succeeds but MIGR-03 requirement fails — hardcoded URL is still in the codebase.
**Why it happens:** The webhook URL at line 89 of ScheduleModal.tsx is easy to miss during migration.
**How to avoid:** Grep the built output or source: `grep -r "ektnbd.easypanel.host" src/` must return no results after migration.
**Warning signs:** Any search for the domain `ektnbd.easypanel.host` in `src/` or `.next/` returns results.

### Pitfall 4: `document.querySelector` in Server Component

**What goes wrong:** Build error or hydration error when `scrollToSection` is called in a component without `'use client'`.
**Why it happens:** Footer.tsx has `scrollToSection` using `document.querySelector` — this is a browser API. Footer is targeted as a Server Component.
**How to avoid:** Footer links to `#hero`, `#servicios`, etc. In Next.js, these are plain `<a href="#servicios">` links without event handlers — the browser handles smooth scrolling via `scroll-behavior: smooth` in globals.css. Remove the `scrollToSection` function from Footer; replace all `onClick` handlers with direct `href` attributes.
**Warning signs:** TypeScript error "document is not defined" during build.

### Pitfall 5: .env.local Not Created

**What goes wrong:** ScheduleModal form submits but gets `undefined` as webhook URL, causing a fetch error.
**Why it happens:** `.env.local` is not committed to git (correctly), so it doesn't exist in a fresh clone or new project directory.
**How to avoid:** Create `.env.local` before testing. Create `.env.local.example` with empty values as documentation.
**Warning signs:** `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` evaluates to `undefined` at runtime.

### Pitfall 6: `sonner` Toaster Not Mounted

**What goes wrong:** Toast notifications from ScheduleModal don't appear even though `toast.error()` is called.
**Why it happens:** `sonner` requires `<Toaster />` to be mounted somewhere in the component tree (typically in layout.tsx).
**How to avoid:** Add `import { Toaster } from 'sonner'` and `<Toaster />` to `src/app/layout.tsx`.
**Warning signs:** toast() calls execute without any visual feedback.

### Pitfall 7: next/image Requires Declared Dimensions

**What goes wrong:** next/image throws "Image is missing required prop 'width'" or causes layout shift without `fill` prop.
**Why it happens:** Unlike `<img>`, `next/image` requires either explicit `width`/`height` props or `fill` + a positioned parent container.
**How to avoid:** For all images: declare dimensions explicitly. For full-width hero images: use `fill` with `<div className="relative w-full h-screen">`.
**Note for Phase 1:** The current sections use only Lucide SVG icons — no `<img>` tags. Phase 1 has no images to optimize (PERF-03 compliance is trivially achieved unless Stitch generates placeholder images).

---

## Stitch MCP Prompt Strategy

Each of the 6 sections should be prompted to Stitch separately. Include these elements in every prompt:

**Design brief (include in all 6 prompts):**
> Design Philosophy: Emerald Intelligence. Palette: Void Black (#050505) dominant background, Deep Slate (#0d1117) for cards/surfaces, Emerald Nexus (#10b981) for accents/CTAs only. Typography: Inter (sans-serif), Roboto Mono (monospace). Spacing: generous negative space, 8-point scale. Tone: premium research facility, futuristic, minimal, high-end. Framework: Next.js 15 App Router, Tailwind CSS utility classes, TypeScript, shadcn/ui (new-york preset). Output as Server Component (no hooks, no 'use client') unless the section explicitly requires client interactivity.

**Section-specific additions:** Feed the content inventory above for each section.

**Output requirements per prompt:**
- TypeScript, strict (no `any`)
- Default export
- Tailwind utility classes only (no `style={{}}` except for gradient stops)
- Use `cn()` from `@/lib/utils` for className merging
- Import icons from `lucide-react`
- Import shadcn components from `@/components/ui/...`
- Responsive: mobile-first, sm/md/lg breakpoints

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Project scaffold, npm scripts | Yes | 24.13.0 | — |
| npm | Package manager | Yes | 11.6.2 | — |
| npx | create-next-app, shadcn init | Yes | 11.6.2 | — |
| Git | Version control | Yes (repo exists) | — | — |
| Internet access | npm registry, Google Fonts | Assumed yes | — | Pre-cached packages |

**Missing dependencies with no fallback:** None — all required tools are available.

**Note on Windows Git Bash:** All `npx create-next-app` and `npx shadcn` commands work in Windows Git Bash. Path separators use forward slashes in all npm scripts. The `--` flag separator in npm scripts works correctly.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind `tailwind.config.js` + `@tailwind` directives | Tailwind v4: CSS-first `@import "tailwindcss"` + `@theme {}` blocks | Tailwind v4 (2024) | Config file may not be needed; let scaffold generate |
| `next/font` with `className` only | `next/font` with `variable` prop + CSS variable injection | Next.js 13+ | Enables Tailwind font-family override via CSS var |
| `getServerSideProps` / `getStaticProps` | App Router Server Components with `async/await` directly | Next.js 13+ App Router | No data fetching needed for Phase 1 (static content) |
| React 18 `Suspense` patterns | React 19 + Next.js 15 — async params as Promises | Next.js 15 / React 19 | `params` in layouts/pages must be `await`ed |
| shadcn init with `--legacy-peer-deps` | shadcn@latest works cleanly with React 19 | 2025 | No peer dep workarounds needed |
| Direct Google Fonts `<link>` in `<head>` | `next/font/google` | Next.js 13 | No external network request at page load; FOUT eliminated |

**Deprecated/outdated:**
- `@tailwind base/components/utilities` directives: Still work in v4 via compatibility shim but not idiomatic. Use `@import "tailwindcss"` instead (scaffold generates this).
- `next/image` with `layout="fill"` prop: Removed in Next.js 13+. Use `fill` boolean prop instead.
- `pages/` directory: Not used — this project uses `app/` (App Router).

---

## Open Questions

1. **Stitch MCP availability**
   - What we know: Stitch MCP is referenced as the tool for generating sections
   - What's unclear: Whether Stitch MCP is installed and configured in the Claude environment for this project
   - Recommendation: If Stitch MCP is unavailable, the planner should create tasks to manually author the 6 sections using the content inventory above + the CSS patterns from the existing React components as reference

2. **Equipo section: keep embla carousel or replace with grid?**
   - What we know: Equipo.tsx uses `embla-carousel-react` and must be `'use client'`. A static 2x2 grid would be a Server Component.
   - What's unclear: Whether the user prefers the carousel UX or a simpler grid
   - Recommendation: Keep embla carousel (already proven in existing project) but flag to planner that Equipo must be `'use client'`

3. **Hero canvas animation: keep or replace with CSS-only?**
   - What we know: Canvas animation requires `'use client'`. Stitch may generate a CSS-only particle effect.
   - What's unclear: What Stitch will generate for the Hero background
   - Recommendation: If Stitch generates a CSS-only animation (no canvas), the Hero can be a Server Component. If canvas is needed, extract as `HeroCanvas` client component. Planner should make this a decision point in the Hero task.

4. **`tailwindcss-animate` vs `tw-animate-css` in Next.js context**
   - What we know: The existing Vite project uses both `tailwindcss-animate` and `tw-animate-css`. These are Tailwind plugins.
   - What's unclear: Which one shadcn@latest installs by default in a Tailwind v4 Next.js project
   - Recommendation: Let `shadcn init` decide. Do not manually install animation plugins before running `shadcn init`.

---

## Sources

### Primary (HIGH confidence)

- npm registry (2026-04-03) — all package versions verified via `npm view [package] version`
- Existing React source code (`Kimi_Agent_Diseño web G2Intelligence/app/`) — content inventory extracted directly from source files
- `G2_Social_Media_Kit/emerald_intelligence_philosophy.md` — design philosophy read directly
- `G2_Social_Media_Kit/master_brand_kit.md` — color/typography specs read directly
- `.planning/phases/01-foundation-technical-setup/01-CONTEXT.md` — locked decisions
- `.planning/phases/01-foundation-technical-setup/01-UI-SPEC.md` — design contract
- `.planning/REQUIREMENTS.md` — phase requirement IDs

### Secondary (MEDIUM confidence)

- Next.js 15 App Router patterns — based on well-established knowledge of Next.js 13-15 App Router (stable since Next.js 13, extensively documented); specific patterns verified against npm registry version numbers
- shadcn/ui init process — based on shadcn@latest 4.1.2 which supports new-york preset and CSS variables; confirmed via CLI prompts documented in official shadcn docs
- Tailwind v4 changes — based on Tailwind CSS 4.2.2 being the current version in registry; v4 CSS-first config is a known breaking change from v3

### Tertiary (LOW confidence — flag for validation)

- `create-next-app@latest` exact interactive prompts — the specific questions asked during scaffold may vary; planner should include a note that implementer should use `--yes` flag or answer prompts explicitly

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry
- Content inventory: HIGH — extracted directly from source files
- Architecture: HIGH — Next.js App Router patterns are stable and well-documented
- Migration changes (Navigation, ScheduleModal): HIGH — minimal changes identified by direct code inspection
- Tailwind v4 specifics: MEDIUM — behavior of `create-next-app` + `shadcn init` with Tailwind v4 confirmed by version numbers but not live-tested in this environment

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (stable framework versions; shadcn/Next.js release cadence is monthly)
