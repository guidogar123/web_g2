# Architecture: Next.js 15 App Router for G2 Intelligence Corporate Site

**Project:** G2 Intelligence Corporate Website Migration (React SPA → Next.js 15)
**Researched:** 2026-04-03
**Architecture Mode:** Server-first with client islands
**Target:** SSR/SSG hybrid for SEO + marketing site performance

---

## Recommended Architecture Overview

The Next.js 15 App Router architecture for this migration prioritizes:

1. **Server Components by default** for static content (Hero, Services, About, Team sections)
2. **Client Components as isolated islands** for interactivity (ScheduleModal, ContactForm, ChatWidget)
3. **API Route Handlers** for webhook forwarding (security layer between client and n8n)
4. **Static Generation + ISR** for SEO (cached pages with on-demand revalidation)

This "server-first with client islands" pattern reduces JavaScript shipped to the browser, improves Core Web Vitals, and maintains the existing functional behavior while gaining full SEO benefits.

---

## Directory Structure

```
app/
├── layout.tsx                          # Root layout (HTML, body, metadata, fonts)
├── page.tsx                            # Home page (sections composed here)
├── globals.css                         # Global styles, Tailwind config
├── (marketing)/                        # Route group: all pages under domain
│   └── layout.tsx                      # Shared marketing layout (nav, footer wrapper)
├── api/
│   ├── webhook/
│   │   ├── n8n/
│   │   │   ├── schedule/
│   │   │   │   └── route.ts           # POST /api/webhook/n8n/schedule → forward to n8n
│   │   │   ├── contact/
│   │   │   │   └── route.ts           # POST /api/webhook/n8n/contact → forward to n8n
│   │   │   └── chat/
│   │   │       └── route.ts           # POST /api/webhook/n8n/chat (optional, see strategy below)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx                   # Server Component (static content + canvas)
│   │   ├── Services.tsx               # Server Component (static cards)
│   │   ├── About.tsx                  # Server Component (static text/image)
│   │   ├── Team.tsx                   # Server Component (static team info)
│   │   ├── Contact.tsx                # Server Component (wrapper for contact form)
│   │   └── Footer.tsx                 # Server Component (static links/info)
│   ├── forms/
│   │   ├── ScheduleForm.tsx           # Client Component with 'use client'
│   │   ├── ContactForm.tsx            # Client Component with 'use client'
│   │   └── FormState.tsx              # Client Component (shared form logic)
│   ├── chat/
│   │   └── ChatWidget.tsx             # Client Component, dynamic import, ssr: false
│   ├── ui/                            # Reusable Radix UI wrapped components
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Input.tsx
│   │   ├── Calendar.tsx
│   │   ├── Select.tsx
│   │   └── ... (40+ existing components)
│   └── Navigation.tsx                 # Client Component (scroll state, mobile menu)
├── lib/
│   ├── utils.ts                       # cn() utility for Tailwind merging
│   ├── n8n-webhook.ts                 # Helper: POST to n8n webhook URL
│   ├── validate-forms.ts              # Validation schemas for forms
│   └── constants.ts                   # Rate limiting, webhook URLs (from env vars)
├── hooks/
│   ├── use-mobile.ts                  # Responsive breakpoint detection
│   ├── use-toast.ts                   # Toast notification state
│   └── use-form-rate-limit.ts         # Rate limiting state management
├── public/
│   ├── images/                        # Brand assets (fonts, social kit)
│   ├── fonts/                         # Self-hosted fonts (Inter, Roboto Mono)
│   └── icons/                         # SVG icons (Lucide)
└── .env.local                         # Webhook URLs, API secrets (not in git)
```

### Key Decisions

**Why `(marketing)/` route group?**
- Organizes all pages under a route group without adding `/marketing/` to URLs
- Allows shared marketing layout (navigation, footer structure)
- Future-proofs for adding `/docs/`, `/blog/`, etc. in separate route groups

**Why separate `api/webhook/` folder structure?**
- Clear API surface for each webhook handler
- Security: API routes validate and sanitize inputs before forwarding to n8n
- Monitoring: Each endpoint can be instrumented independently

**Why `lib/n8n-webhook.ts` helper?**
- Centralized webhook URL management (from environment variables)
- Reusable across form components and API routes
- Easier to test and mock

---

## Server vs Client Component Strategy

### Server Components (Default for All Static Content)

**Files marked as Server Components:**
- `app/page.tsx` (home page)
- `app/components/sections/*.tsx` (Hero, Services, About, Team, Contact, Footer)
- `app/layout.tsx` (root)
- `app/(marketing)/layout.tsx` (marketing wrapper)

**What they do:**
- Render once on server (build time or request time)
- Ship zero JavaScript to browser
- Can access environment variables, database, APIs directly
- Cannot use `useState`, `useEffect`, event handlers, or browser APIs

**Responsibilities:**
```typescript
// app/components/sections/Services.tsx (Server Component)
export default function Services() {
  // Can fetch data here if needed (ISR)
  const services = [
    { id: 1, title: 'Agentes IA', description: '...' },
    // ...
  ];

  return (
    <section className="services">
      {services.map(service => (
        <div key={service.id} className="service-card">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          {/* Interactive buttons use <ScheduleButton client component below> */}
          <ScheduleButton />
        </div>
      ))}
    </section>
  );
}
```

### Client Components (Isolated Interactive Islands)

**Files marked with 'use client':**
- `app/components/forms/ScheduleForm.tsx`
- `app/components/forms/ContactForm.tsx`
- `app/components/Navigation.tsx`
- `app/components/chat/ChatWidget.tsx`

**What they do:**
- Hydrate on client and handle interactivity
- Can use `useState`, `useEffect`, event handlers, browser APIs
- Imported into Server Components as props/children
- Minimal bundle size (keep focused, avoid large dependencies inside)

**Example: ScheduleForm (Client Component)**
```typescript
// app/components/forms/ScheduleForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calendar } from '@/components/ui/Calendar';
import { useToast } from '@/hooks/use-toast';

export function ScheduleForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // POST to our API route (NOT directly to n8n)
      const response = await fetch('/api/webhook/n8n/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ /* form data */ }),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Cita agendada exitosamente');
      onSuccess();
    } catch (error) {
      toast.error('Error al agendar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Component Composition Pattern

Server Component composes and imports Client Components:

```typescript
// app/components/sections/Contact.tsx (Server Component)
import { ContactForm } from '@/components/forms/ContactForm';

export default function Contact() {
  return (
    <section id="contacto" className="contact-section">
      <h2>Contacta con Nosotros</h2>
      <p>Cuéntanos sobre tu proyecto...</p>

      {/* Client Component imported and composed here */}
      <ContactForm />
    </section>
  );
}
```

**Rule:** Server Component can import Client Component. Client Component cannot import Server Component (except as children/props).

---

## Handling Client-Only Libraries: @n8n/chat Widget

### The Problem

`@n8n/chat` relies on browser APIs (`window`, `document`, DOM methods). During server-side rendering, these don't exist → "window is undefined" error.

### The Solution: Dynamic Import with `ssr: false`

Create a wrapper component that dynamically imports the chat widget only on the client:

**File: `app/components/chat/ChatWidgetLoader.tsx`** (Server Component)
```typescript
import dynamic from 'next/dynamic';

// Load ChatWidget only on client, skip SSR
const ChatWidget = dynamic(
  () => import('./ChatWidget').then(mod => mod.ChatWidget),
  { ssr: false, loading: () => null } // Show nothing during SSR
);

export function ChatWidgetLoader() {
  return <ChatWidget />;
}
```

**File: `app/components/chat/ChatWidget.tsx`** (Client Component)
```typescript
'use client';

import { useEffect, useRef } from 'react';
import { createChat } from '@n8n/chat';

export function ChatWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    createChat({
      webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
      webhookBasePath: '/webhook',
      mode: 'window',
      initialMessages: [
        'Hola! Soy el asistente de G2 Intelligence...',
      ],
      theme: {
        primaryColor: '#10b981', // Emerald
        backgroundColor: '#050505', // Void Black
      },
      i18n: {
        es: {
          chatInputPlaceholder: 'Escribe tu mensaje...',
          startNewConversationMessage: 'Iniciar nueva conversación',
        },
      },
    });
  }, []);

  return <div ref={containerRef} />;
}
```

**In root layout or page:**
```typescript
import { ChatWidgetLoader } from '@/components/chat/ChatWidgetLoader';

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* ... */}
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
```

### Why This Works

- `ChatWidgetLoader` is a Server Component (no 'use client')
- It dynamically imports the real Chat Widget with `ssr: false`
- Next.js skips rendering the Chat Widget on the server
- On the client, the Chat Widget hydrates and initializes @n8n/chat
- Zero "window is undefined" errors
- Chat widget only adds ~5-10KB to client JavaScript

---

## API Routes: Webhook Forwarding Strategy

### Do NOT POST Directly from Client to n8n

**Anti-pattern (AVOID):**
```typescript
// BAD: Exposing n8n URL to client
fetch('https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat', {
  method: 'POST',
  body: JSON.stringify(data),
})
```

**Risks:**
- n8n webhook URL exposed in browser network tab (security issue)
- No input validation before reaching n8n
- No rate limiting, spam protection
- Cannot track form submissions server-side
- CORS issues if n8n doesn't allow all origins

### DO Create API Route Handlers

**File: `app/api/webhook/n8n/schedule/route.ts`** (Route Handler)
```typescript
import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    // 1. Validate request
    const body = await request.json();

    if (!body.nombre || !body.email || !body.fecha) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Sanitize inputs
    const sanitized = {
      type: 'scheduling',
      nombre: body.nombre.trim().slice(0, 100),
      email: body.email.trim().toLowerCase(),
      telefono: body.telefono?.trim().slice(0, 20),
      fecha: body.fecha,
      hora: body.hora,
      timestamp: new Date().toISOString(),
    };

    // 3. Forward to n8n (n8n URL is secure, not exposed to client)
    const response = await fetch(`${N8N_WEBHOOK_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized),
    });

    if (!response.ok) {
      console.error(`n8n webhook failed: ${response.status}`);
      return NextResponse.json(
        { error: 'Failed to process scheduling' },
        { status: response.status }
      );
    }

    // 4. Return success to client
    return NextResponse.json(
      { success: true, message: 'Scheduling request received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Schedule webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**File: `app/api/webhook/n8n/contact/route.ts`** (Similar pattern)
```typescript
// Same structure as schedule route
// Validates type: 'contact', nombre, email, empresa, mensaje
// Forwards to n8n with sanitization
```

### Why API Routes Over Direct Client→n8n

| Aspect | Direct Client | API Route |
|--------|---------------|-----------|
| **URL Exposure** | Public (security risk) | Hidden in server |
| **Input Validation** | None | Server-side validation |
| **Spam/Rate Limiting** | Client-side only | Server-side enforcement |
| **Logging/Audit** | No backend record | Full audit trail possible |
| **CORS Issues** | Likely (cross-origin) | Transparent (same-origin) |
| **Secret Management** | Exposed | Secure (env vars) |

**Result:** API routes are the secure, professional pattern for this use case.

---

## Data Flow: Forms to n8n

### Scheduling Flow (from existing ScheduleModal)

```
User clicks "Comienza tu Transformación"
    ↓
ScheduleForm (Client Component) opens in Dialog
    ↓
User fills name, email, date, time
    ↓
Form submits → POST to /api/webhook/n8n/schedule
    ↓
Route Handler validates & sanitizes input
    ↓
Route Handler forwards to n8n webhook (private URL)
    ↓
n8n receives { type: 'scheduling', nombre, email, ... }
    ↓
n8n automation triggers (email, calendar, etc.)
    ↓
Response returned to client
    ↓
Toast notification: "Cita agendada exitosamente"
```

### Contact Form Flow (from existing Contacto section bug)

```
User clicks "Enviar" in Contact form
    ↓
ContactForm (Client Component) submits
    ↓
POST to /api/webhook/n8n/contact with { type: 'contact', nombre, email, empresa, mensaje }
    ↓
Route Handler validates (all fields required, empresa max 100 chars, mensaje max 1000)
    ↓
Route Handler forwards to n8n
    ↓
n8n receives and processes { type: 'contact', ... }
    ↓
n8n sends confirmation email, logs to CRM, etc.
    ↓
Client receives success response
    ↓
Toast: "Mensaje enviado. Te contactaremos pronto."
```

### Chat Widget Flow

```
ChatWidget (Client Component, loaded with dynamic import)
    ↓
User types message in chat window
    ↓
@n8n/chat library sends to n8n webhook
    ↓
n8n processes message, generates AI response
    ↓
Response streamed back to widget
    ↓
User sees response in chat UI
```

**Note:** Chat widget connects directly to n8n (as per existing setup). This is acceptable because:
1. Chat is a multi-turn, streaming interaction (different from form POST)
2. n8n chat endpoint is designed for public client-side access
3. No sensitive user data in chat (just conversation)
4. Rate limiting can be enforced by n8n itself

---

## Static Generation & SEO Strategy

### Pages to Static Generate

All pages should be **statically generated at build time** because content doesn't change frequently:

```typescript
// app/page.tsx
export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'G2 Intelligence - IA para Ventas y Automatización',
  description: 'Agentes inteligentes para transformación digital en el Valle del Cauca.',
  openGraph: {
    title: 'G2 Intelligence',
    description: 'Expertos en IA, automatización y agentes inteligentes',
    images: [{ url: '/og-image.png' }],
    type: 'website',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
```

### ISR (Incremental Static Regeneration)

- `revalidate: 3600` → Page rebuilt every 1 hour
- If content changes more frequently, reduce to `revalidate: 1800` (30 min) or `revalidate: 300` (5 min)
- Provides fast TTFB (time to first byte) ~10-50ms
- Automatic revalidation without manual redeploy

### SEO Metadata

Use Next.js Metadata API:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'G2 Intelligence',
  description: 'Agentes inteligentes para automatización en Cali',
  keywords: 'IA, automatización, agentes inteligentes, Cali, Colombia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'G2 Intelligence',
    siteName: 'G2 Intelligence',
    locale: 'es_CO',
    type: 'website',
  },
};
```

### Structured Data (JSON-LD)

In root layout or page:

```typescript
export default function RootLayout() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'G2 Intelligence',
    description: 'Agentes inteligentes para automatización en Cali',
    url: 'https://g2intelligence.co',
    telephone: '+57 350 243 9698',
    email: 'hola@g2intelligence.co',
    areaServed: ['Cali', 'Jamundí', 'Palmira', 'Yumbo', 'Valle del Cauca', 'Colombia'],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '3.4372', // Cali coordinates
      longitude: '-76.5069',
    },
    sameAs: [
      'https://linkedin.com/company/g2intelligence',
      'https://instagram.com/g2intelligence',
    ],
  };

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Brand Assets: Images & Fonts

### Font Optimization

**Use `next/font` for self-hosting and preloading:**

```typescript
// app/fonts.ts
import { Inter, Roboto_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show fallback while loading
  preload: true,
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});
```

```typescript
// app/layout.tsx
import { inter, robotoMono } from './fonts';

export default function RootLayout() {
  return (
    <html>
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        {/* Font variables available as --font-inter, --font-roboto-mono */}
      </body>
    </html>
  );
}
```

```css
/* app/globals.css */
:root {
  --font-inter: var(--font-inter);
  --font-roboto-mono: var(--font-roboto-mono);
}

body {
  font-family: var(--font-inter);
}

code, pre {
  font-family: var(--font-roboto-mono);
}
```

**Benefits:**
- Fonts self-hosted (no external requests to Google)
- Fonts preloaded and optimized
- Automatic font fallback (`display: swap`)
- Reduces layout shift (CLS)

### Image Optimization

**Use `next/image` for all images:**

```typescript
import Image from 'next/image';

export function Hero() {
  return (
    <section>
      <Image
        src="/images/hero-bg.webp"
        alt="G2 Intelligence hero background"
        width={1920}
        height={1080}
        priority // Load immediately (hero image)
        quality={85}
      />
    </section>
  );
}
```

**Benefits:**
- Automatic format conversion (WebP, AVIF)
- Responsive sizing (srcset generation)
- Lazy loading (except `priority` images)
- Layout shift prevention (width/height required)

### Brand Assets Structure

```
public/
├── images/
│   ├── logo.svg
│   ├── hero-bg.webp          # WebP format (optimized)
│   ├── services/
│   │   ├── service-1.webp
│   │   └── service-2.webp
│   └── team/
│       ├── team-member-1.jpg
│       └── team-member-2.jpg
├── fonts/
│   ├── inter-*.woff2          # Self-hosted (if not using next/font)
│   └── roboto-mono-*.woff2
└── og-image.png               # Open Graph image (1200x630)
```

---

## Component Build Order for Phases

Based on this architecture, the implementation order should prioritize:

### Phase 1: Foundation
1. **Root layout + metadata** (`app/layout.tsx`, `app/page.tsx`)
2. **Static sections** (Hero, Services, About, Team, Contact, Footer as Server Components)
3. **UI component library** (Button, Input, Dialog, Calendar, etc.)
4. **Fonts + styling** (globals.css, Tailwind config)

**Why first:** These establish the visual structure and are rendered on server (zero client JS).

### Phase 2: Interactivity
1. **Navigation** (Client Component with scroll detection)
2. **ScheduleForm + ScheduleButton** (Client Components)
3. **ContactForm** (Client Component, fix bug from Contacto.tsx)
4. **Route handlers** (`/api/webhook/n8n/*`)

**Why second:** Forms and navigation depend on UI library and Server Components.

### Phase 3: Integrations
1. **ChatWidget + ChatWidgetLoader** (Client Component with dynamic import)
2. **n8n webhook forwarding logic** (lib helpers)
3. **Rate limiting** (hooks, constants)

**Why third:** Chat is nice-to-have; forms are core critical path. Integrations tested after forms work.

### Phase 4: SEO + Performance
1. **Metadata API setup** (keywords, OG images, robots.txt)
2. **Structured data** (schema.org LocalBusiness, Service)
3. **Image optimization** (next/image conversion)
4. **Build + deployment testing** (ISR, Core Web Vitals)

**Why fourth:** Do last because it requires working site first. Can iterate after launch.

---

## Key Architecture Decisions

| Decision | Rationale | Tradeoff |
|----------|-----------|----------|
| **Server Components by default** | Reduces client JS, improves Core Web Vitals, enables data fetching | Need explicit 'use client' for interactivity |
| **Client islands (ScheduleForm, ContactForm, Chat)** | Minimal interactivity footprint, fast hydration | Must structure component boundaries carefully |
| **API routes for webhook forwarding** | Secure (URL hidden), input validation, rate limiting server-side | Extra server round-trip (but acceptable for forms) |
| **Dynamic import for @n8n/chat** | Avoids SSR errors, loads only when client ready | Slightly delayed chat widget initialization |
| **Static generation + ISR** | Fast TTFB (~50ms), SEO friendly, scales to millions of visits | Requires explicit revalidation if content changes |
| **next/font and next/image** | Automatic optimization, self-hosting, prevents layout shift | Slightly larger Next.js runtime (~50KB) |
| **Route groups for (marketing)** | Extensible structure (future /docs/, /admin/, etc.) | Adds folder nesting (not mandatory, but organized) |

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: 'use client' at Root Level
**Wrong:**
```typescript
'use client';
export default function RootLayout() { /* ... */ }
```
**Impact:** Entire app becomes Client Component. You lose Server Component benefits. Heavy JS bundle.

**Right:**
```typescript
// No 'use client' at layout level
export default function RootLayout() {
  return (
    <html>
      <body>
        <Navigation /> {/* <-- import Navigation which has 'use client' */}
      </body>
    </html>
  );
}
```

### ❌ Anti-Pattern 2: Passing Server Functions to Client Components
**Wrong:**
```typescript
// app/page.tsx
async function fetchData() { /* server-only */ }

export default function Home() {
  return <ClientForm onSubmit={fetchData} />; // ❌ Can't pass async server function
}
```

**Right:**
```typescript
// Use API route instead
// app/api/submit/route.ts
export async function POST(req: NextRequest) {
  // Handle data here
}

// Client component
'use client';
export function ClientForm() {
  const handleSubmit = async (data) => {
    await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) });
  };
}
```

### ❌ Anti-Pattern 3: Exposing Secrets in Client Code
**Wrong:**
```typescript
const N8N_URL = 'https://n8n-n8n.ektnbd.easypanel.host/webhook/...'; // Exposed in browser!
fetch(N8N_URL, { method: 'POST', body: JSON.stringify(data) });
```

**Right:**
```typescript
// .env.local (server-side only)
N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/...

// app/api/webhook/n8n/schedule/route.ts (server-side)
const url = process.env.N8N_WEBHOOK_URL;
```

### ❌ Anti-Pattern 4: Heavy Dependencies in Client Components
**Wrong:**
```typescript
'use client';
import { renderToString } from 'react-dom/server'; // 40KB+ server lib in client!
```

**Right:**
```typescript
// Do server-heavy work in Server Components or API routes
// Client components stay lightweight for hydration
```

---

## Performance Targets

Based on Next.js 15 capabilities and this architecture:

| Metric | Target | How Achieved |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Static generation, optimized images, small JS |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Image dimensions in next/image, font display swap |
| **FID** (First Input Delay) | < 100ms | Minimal client JS, fast hydration |
| **TTFB** (Time to First Byte) | < 100ms | Static generation (ISR) |
| **Total JS Bundle** | < 100KB gzip | Server Components, minimal 'use client' |

**Why achievable:** 89% of Next.js teams hit Core Web Vitals on first deploy (vs. 52% with other frameworks).

---

## Differences from Current React SPA

| Aspect | Current (React + Vite) | Next.js 15 |
|--------|----------------------|-----------|
| **Rendering** | Client-side only (SPA) | Server-side + client (hydration) |
| **SEO** | Manual meta tags | Metadata API (automatic) |
| **Bundle Size** | ~100-150KB React + deps | ~50KB Next.js runtime (smaller) |
| **Data Fetching** | Client useEffect → API | Server Components (built-in) |
| **Static Hosting** | Vite dist/ → CDN | Next.js build → ISR caching |
| **Chat Widget** | Direct import | Dynamic with ssr: false |
| **Form Submission** | Client fetch → n8n | Client fetch → API route → n8n |
| **Code Splitting** | Manual lazy() | Automatic per route |

---

## Summary for Roadmap

This architecture enables:

1. **Fast initial load** (static generation + ISR)
2. **Great SEO** (Server Components, Metadata API, structured data)
3. **Minimal JavaScript** (client islands pattern)
4. **Secure integrations** (API routes hide n8n URL)
5. **Scalability** (ISR caches high traffic)

**Build order:** Foundation → Interactivity → Integrations → SEO/Performance

**Critical for roadmap planning:** Phase 1 (foundation) is dependent on Next.js setup. Phases 2-3 can run in parallel once foundation is ready. Phase 4 (SEO) is the final polish.

---

## Sources

- [Next.js 15 App Router: Complete Guide to Server and Client Components - DEV Community](https://dev.to/devjordan/nextjs-15-app-router-complete-guide-to-server-and-client-components-5h6k)
- [Next.js App Router: The Patterns That Actually Matter in 2026 - DEV Community](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146)
- [Modern Full Stack Application Architecture Using Next.js 15+](https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/)
- [How to lazy load Client Components and libraries - Next.js Docs](https://nextjs.org/docs/app/guides/lazy-loading)
- [How to use client-side only packages with SSR in Gatsby and Next.js - DEV Community](https://dev.to/frontenddeveli/how-to-use-client-side-only-packages-with-ssr-in-nextjs-3pfa)
- [Next.js Server Actions vs API Routes: Don't Build Your App Until You Read This - DEV Community](https://dev.to/myogeshchavan97/nextjs-server-actions-vs-api-routes-dont-build-your-app-until-you-read-this-4kb9)
- [Server Actions vs Route Handlers: When to Use Each in Next.js - MakerKit](https://makerkit.dev/blog/tutorials/server-actions-vs-route-handlers)
- [The Complete Guide to SEO Optimization in Next.js 15 - Medium](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [Next.js SEO Best Practices: Complete 2026 Guide - GlobaLinkz](https://globalinkz.com/blog/next-js-seo-best-practices-complete-2026-guide.html)
- [Mastering Next.js App Router: Best Practices for Structuring Your Application - Medium](https://thiraphat-ps-dev.medium.com/mastering-next-js-app-router-best-practices-for-structuring-your-application-3f8cf0c76580)
- [The Ultimate Guide to Organizing Your Next.js 15 Project Structure - Wisp CMS](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure)
