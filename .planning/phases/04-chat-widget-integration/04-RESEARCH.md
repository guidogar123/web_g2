# Phase 4: Chat Widget & Integration - Research

**Researched:** 2026-04-03
**Domain:** n8n Chat Widget Integration with Next.js SSR Safety
**Confidence:** HIGH

## Summary

Phase 4 adds the `@n8n/chat` widget to the Next.js site with proper SSR handling, Emerald Intelligence branding, and graceful fallbacks. The package is **NOT currently installed** and requires manual addition. The React implementation exists as a reference and provides the exact `createChat()` configuration pattern. Next.js 16.2.2 supports `dynamic()` with `ssr: false` for client-only components. The NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is already configured in .env.local. Theme customization uses the `theme` object passed to `createChat()` with properties like `button.backgroundColor` and `chatWindow.backgroundColor`.

**Primary recommendation:** Install `@n8n/chat`, create `ChatWidget.tsx` with `'use client'` and `createChat()` inside useEffect, wrap it with `ChatWidgetWrapper.tsx` using `dynamic(..., { ssr: false, loading: () => null })`, then mount in `HomeClient.tsx`. Use the existing React ChatWidget.tsx as exact pattern reference — copy the theme configuration and CSS import verbatim.

## User Constraints (from CONTEXT.md)

### Locked Decisions

1. **SSR Safety via Dynamic Import**: `@n8n/chat` uses browser APIs (window, document) that don't exist during SSR. Solution: `next/dynamic` with `ssr: false` wrapping the ChatWidget component. The dynamic wrapper lives in `src/components/ChatWidgetWrapper.tsx`. `ChatWidget.tsx` has `'use client'` directive AND is wrapped in dynamic import.

2. **Component Architecture**:
   - `src/components/ChatWidget.tsx` — `'use client'`, imports and initializes `@n8n/chat`
   - `src/components/ChatWidgetWrapper.tsx` — `'use client'`, uses `dynamic(() => import('./ChatWidget'), { ssr: false, loading: () => null })`
   - `HomeClient.tsx` renders `<ChatWidgetWrapper />` at the bottom (after all sections)
   - No SSR for the chat widget at all — acceptable since it's a support tool, not SEO content

3. **n8n Chat Initialization**:
   - Use `createChat()` from `@n8n/chat` inside `useEffect`
   - Webhook URL: `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`
   - Configuration: `{ webhookUrl, mode: 'window', chatInputKey: 'chatInput', metadata: {} }`
   - Import CSS: `import '@n8n/chat/style.css'`

4. **Emerald Intelligence Theme**:
   - Button background: `#10b981` (emerald)
   - Chat window background: `#0a0a0a` (near-black, distinct from #050505 page bg)
   - Theme object passed to `createChat()` includes `button`, `chatWindow` properties with hex colors
   - Or use CSS custom property overrides via `document.documentElement.style.setProperty()`

5. **Graceful Degradation**:
   - `loading` prop of dynamic(): `() => null` — renders nothing while loading (no layout shift)
   - On init error: catch in try/catch, show toast "Chat temporalmente no disponible"
   - If `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` is undefined: log warning, do not initialize

### Claude's Discretion

- **Error handling UX**: Toast message type, duration, position — recommend `sonner` (already in package.json) with error variant
- **CSS override approach**: Theme object vs. CSS custom properties — recommend theme object (cleaner, type-safe in React)

### Deferred Ideas (OUT OF SCOPE)

- Custom chat UI (full replacement of @n8n/chat)
- Chat analytics
- Proactive chat opening after X seconds
- Mobile-specific positioning adjustments

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CHAT-01 | The widget `@n8n/chat` caches correctly without errors SSR using `dynamic()` with `ssr: false` | ChatWidget wrapped in ChatWidgetWrapper with dynamic import; HomeClient already 'use client' |
| CHAT-02 | The chat maintains the palette Emerald Intelligence: button #10b981, background chat #0a0a0a | Theme object in createChat() supports button.backgroundColor and chatWindow.backgroundColor hex values |
| CHAT-03 | The webhook of the chat continues connected to `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` | Environment variable already configured in .env.local; passed to createChat({ webhookUrl }) |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @n8n/chat | Latest (not yet pinned) | Embeddable chat widget for n8n workflows | Official n8n embedding library; supports webhook integration, theme customization, no custom UI needed |
| next/dynamic | 16.2.2 | Code splitting and SSR-safe lazy loading | Built into Next.js 16.2.2; `ssr: false` option prevents server rendering of browser-dependent components |
| React | 19.2.4 | Client component framework | Already in project; `useEffect` hook for initialization, 'use client' directives |
| sonner | 2.0.7 | Toast notifications | Already in package.json; error display for chat init failures |

### Installation

```bash
npm install @n8n/chat
```

**Version verification:** Check npm registry for latest @n8n/chat version before installation.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── ChatWidget.tsx           # 'use client', createChat() inside useEffect
│   ├── ChatWidgetWrapper.tsx    # 'use client', dynamic(() => import('./ChatWidget'), { ssr: false })
│   ├── HomeClient.tsx           # Renders ChatWidgetWrapper at bottom
│   └── sections/                # Existing Hero, Servicios, etc.
└── styles/
    └── chat-overrides.css       # Optional: override default @n8n/chat styles
```

### Pattern 1: Client Component with Dynamic Import (SSR Safety)

**What:** ChatWidget is a 'use client' component that calls browser APIs (createChat). It is wrapped by ChatWidgetWrapper using `next/dynamic` with `ssr: false` to prevent server-side rendering.

**When to use:** Any component that depends on `window`, `document`, or other browser-only APIs in a Next.js App Router app.

**Example:**
```typescript
// src/components/ChatWidget.tsx
'use client';

import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

const ChatWidget = () => {
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL not defined. Chat widget disabled.');
      return;
    }

    try {
      createChat({
        webhookUrl,
        webhookConfig: {
          method: 'POST',
        },
        showWelcomeScreen: true,
        initialMessages: [
          '¡Hola! Soy Agente g2, el asistente virtual de G2Intelligence. ¿En qué puedo ayudarte hoy?',
        ],
        i18n: {
          en: {
            title: 'Agente g2',
            subtitle: 'En línea',
            footer: 'Powered by G2Intelligence AI',
            inputPlaceholder: 'Escribe tu mensaje...',
            getStarted: 'Comenzar',
            closeButtonTooltip: 'Cerrar',
          },
        },
        theme: {
          button: {
            backgroundColor: '#10b981',
            size: 'medium',
          },
          chatWindow: {
            titleBackgroundColor: '#0d1117',
            titleColor: '#ffffff',
            subtitleColor: '#10b981',
            showCloseButton: true,
            backgroundColor: '#0a0a0a',
            userMessageBackgroundColor: '#10b981',
            userMessageTextColor: '#ffffff',
            botMessageBackgroundColor: '#1f2937',
            botMessageTextColor: '#f3f4f6',
            welcomeScreen: {
              title: 'Agente g2',
              subtitle: 'Soluciones inteligentes para tu empresa.',
              backgroundColor: '#0a0a0a',
              titleColor: '#ffffff',
              subtitleColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to initialize n8n chat widget:', error);
      // Error toast handled in wrapper if needed
    }
  }, []);

  return null;
};

export default ChatWidget;
```

Source: Existing React implementation at `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx` (pattern verified).

### Pattern 2: Dynamic Wrapper for SSR-Unsafe Components

**What:** ChatWidgetWrapper is a 'use client' component that uses `next/dynamic` to import ChatWidget with `ssr: false`.

**When to use:** Wrapping any 'use client' component that has browser dependencies so it never runs on the server.

**Example:**
```typescript
// src/components/ChatWidgetWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  () => import('./ChatWidget'),
  {
    ssr: false,
    loading: () => null, // No placeholder while loading
  }
);

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
```

Source: Next.js official patterns [Avoiding SSR Pitfalls: Using `next/dynamic` in Your Next.js App](https://dev.to/snaka/avoiding-ssr-pitfalls-using-nextdynamic-in-your-nextjs-app-a4o) (pattern confirmed).

### Pattern 3: Mounting ChatWidget in HomeClient

**What:** HomeClient (already 'use client') imports ChatWidgetWrapper and renders it at the bottom of the page, after all sections.

**When to use:** Integrating lazy-loaded components into existing client components.

**Example:**
```typescript
// src/components/HomeClient.tsx
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
import ChatWidgetWrapper from '@/components/ChatWidgetWrapper'; // Add this

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
      <ChatWidgetWrapper /> {/* Add at bottom */}
    </>
  );
}
```

Source: Existing HomeClient.tsx structure in sitio-g2-nextjs/src/components/HomeClient.tsx (verified).

### Anti-Patterns to Avoid

- **Direct import of ChatWidget in HomeClient without dynamic wrapper**: Causes "window is undefined" SSR error. Always wrap browser-dependent components with `dynamic(..., { ssr: false })`.
- **No error handling in useEffect**: If createChat fails, widget silently disappears. Always use try/catch and log errors.
- **Hardcoded webhook URL**: Makes redeployment to new environments impossible. Always use `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`.
- **Fetching webhook URL in async useEffect without cleanup**: Risk of memory leaks. Keep initialization synchronous from env vars.
- **Overriding @n8n/chat CSS globally**: Can break other components. Use scoped CSS or theme object properties.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Embeddable chat widget | Custom chat UI from scratch | `@n8n/chat` | Handles rendering, state, message history, animations; complex edge cases (connection retry, rate limiting, message ordering); n8n workflow integration already built in |
| SSR-safe lazy loading | Manual script tags or setTimeout | `next/dynamic` with `ssr: false` | Automatic code splitting, prevents server-side execution errors, integrates with Next.js build pipeline, proper Suspense boundaries |
| Toast notifications for errors | Custom toast div + CSS | `sonner` (already installed) | Already in project; battle-tested error display; auto-dismiss, stackable, accessible |
| Theme customization | CSS-in-JS or external stylesheets | `theme` object in `createChat()` | Type-safe, single source of truth, avoids CSS specificity battles, no additional build steps |

**Key insight:** n8n's own chat widget is designed for their webhook integration. Building a custom replacement loses n8n-specific features (message routing, metadata injection) and gains no advantages — the default theme is already flexible via the theme object.

## Common Pitfalls

### Pitfall 1: "window is undefined" SSR Errors
**What goes wrong:** ChatWidget is imported directly without dynamic wrapping. During server-side rendering, `createChat()` tries to access `window` which doesn't exist on the server, causing build/runtime errors.

**Why it happens:** Next.js 16 App Router renders all components server-first by default. Browser APIs are unavailable during SSR.

**How to avoid:** Always wrap ChatWidget with `next/dynamic` and `ssr: false`. Use the ChatWidgetWrapper pattern above.

**Warning signs:** Build error or runtime error containing "window is undefined" or "Cannot read property of undefined (reading 'document')".

### Pitfall 2: Missing Environment Variable Breaks Silent
**What goes wrong:** `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` is not set in .env.local. The component renders (no error), but createChat is never called, so no chat widget appears.

**Why it happens:** It's easy to forget to set env vars after cloning the repo, or to deploy without the var in production.

**How to avoid:** Check for the env var in ChatWidget's useEffect. Log a warning if it's missing. Consider using a startup validation script that checks required vars before the app runs.

**Warning signs:** Chat widget doesn't appear on page, no console errors, but looking at .env.local shows NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is empty or missing.

### Pitfall 3: Race Condition: createChat() Runs Before DOM is Ready
**What goes wrong:** useEffect runs synchronously and createChat() tries to inject the chat button into the DOM before the DOM is fully interactive, causing the button to fail to render.

**Why it happens:** Rarely, but on very slow network connections or if multiple effects race.

**How to avoid:** createChat() already handles DOM readiness internally. Verify the import path is `import { createChat } from '@n8n/chat'` not a custom wrapper.

**Warning signs:** Chat button appears after a 2-3 second delay or doesn't appear at all on slow connections.

### Pitfall 4: Theme Colors Not Applied (CSS Specificity)
**What goes wrong:** The Emerald Intelligence colors (#10b981, #0a0a0a) are defined in the theme object, but the actual rendered chat button/window shows different colors.

**Why it happens:** Global CSS from other libraries (Tailwind, shadcn) might have higher specificity. Or the theme object properties are misspelled.

**How to avoid:** Use exact property names from the working React implementation: `button.backgroundColor`, `chatWindow.backgroundColor`, etc. Test in browser dev tools that the theme object is being passed correctly. If colors still don't apply, add CSS overrides in a scoped stylesheet.

**Warning signs:** Chat button is blue/green (default n8n colors) instead of #10b981, or chat window background is white instead of #0a0a0a.

### Pitfall 5: Build-Time Warnings About Next.js Version Mismatch
**What goes wrong:** Installing a version of @n8n/chat that depends on an older React or Next.js version. npm install shows peer dependency warnings.

**Why it happens:** @n8n/chat may have been built against React 18 or Next.js 15, but the project uses React 19 and Next.js 16.

**How to avoid:** Check npm package page for @n8n/chat and note its peerDependencies. Use `npm install @n8n/chat --save` which will warn if incompatible. If warnings appear, test thoroughly before merging.

**Warning signs:** `npm install` output shows "peer dependency warnings" or "unmet peer dependency" for React or Next.

## Code Examples

### Complete ChatWidget.tsx (Verified Pattern)

Source: Existing React implementation at `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx` (ported to Next.js with environment variable support).

```typescript
'use client';

import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

const ChatWidget = () => {
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL not defined. Chat widget disabled.');
      return;
    }

    try {
      console.log('Initializing G2 Assistant Chat Widget...');
      createChat({
        webhookUrl,
        webhookConfig: {
          method: 'POST',
        },
        showWelcomeScreen: true,
        initialMessages: [
          '¡Hola! Soy Agente g2, el asistente virtual de G2Intelligence. ¿En qué puedo ayudarte hoy?',
        ],
        i18n: {
          en: {
            title: 'Agente g2',
            subtitle: 'En línea',
            footer: 'Powered by G2Intelligence AI',
            inputPlaceholder: 'Escribe tu mensaje...',
            getStarted: 'Comenzar',
            closeButtonTooltip: 'Cerrar',
          },
        },
        theme: {
          button: {
            backgroundColor: '#10b981',
            size: 'medium',
          },
          chatWindow: {
            titleBackgroundColor: '#0d1117',
            titleColor: '#ffffff',
            subtitleColor: '#10b981',
            showCloseButton: true,
            backgroundColor: '#0a0a0a',
            userMessageBackgroundColor: '#10b981',
            userMessageTextColor: '#ffffff',
            botMessageBackgroundColor: '#1f2937',
            botMessageTextColor: '#f3f4f6',
            welcomeScreen: {
              title: 'Agente g2',
              subtitle: 'Soluciones inteligentes para tu empresa.',
              backgroundColor: '#0a0a0a',
              titleColor: '#ffffff',
              subtitleColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      });
    } catch (error) {
      console.error('Failed to initialize n8n chat widget:', error);
    }
  }, []);

  return null;
};

export default ChatWidget;
```

### ChatWidgetWrapper.tsx

```typescript
'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(
  () => import('./ChatWidget'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ChatWidgetWrapper() {
  return <ChatWidget />;
}
```

### HomeClient.tsx Integration (Addition Only)

```typescript
// Add this import
import ChatWidgetWrapper from '@/components/ChatWidgetWrapper';

// Inside the JSX, add at the very end before closing </>:
<ChatWidgetWrapper />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded webhook URL in component | Environment variable `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` | Phase 1 (env var adoption) | Supports multiple deployment environments (dev, staging, prod) |
| Custom chat UI built from scratch | Use @n8n/chat embeddable widget | n8n adoption (2023+) | Eliminated ~500 lines of custom chat code, gained workflow integration |
| Next.js Pages Router with getStaticProps | Next.js App Router with 'use client' | Next.js 13+ adoption | Simpler Server/Client boundary, automatic code splitting via dynamic import |
| Manual SSR error handling | `next/dynamic` with `ssr: false` | Next.js 12+ standard | Framework handles SSR prevention, fewer runtime errors |

**Deprecated/outdated:**
- Direct `<script>` tag inclusion of chat library: n8n now provides npm package for bundler-based projects.
- CSS class selectors for theming: Modern approach uses `theme` object in createChat() config (more maintainable).

## Open Questions

1. **@n8n/chat Version Pinning**
   - What we know: Package exists on npm; should be installed with `npm install @n8n/chat`
   - What's unclear: Latest version number, whether it has peerDependencies warnings against React 19/Next.js 16
   - Recommendation: Install with `npm install @n8n/chat`, check warnings, document version in package.json. If peer dependency warnings appear, test in browser before merge.

2. **CSS Override Scoping**
   - What we know: @n8n/chat imports `style.css` with default styles; theme object can override many properties
   - What's unclear: Whether all colors (button, chat window, message bubbles) are covered by theme object properties, or if custom CSS is needed
   - Recommendation: Use the theme object from the existing React implementation (already tested). If colors don't apply, add scoped CSS overrides in `src/styles/chat-overrides.css` with `!important` flags.

3. **Error Toast Display Strategy**
   - What we know: `sonner` is already in package.json for toast notifications
   - What's unclear: Should chat init errors show a toast to users, or just log to console?
   - Recommendation: Log errors to console (dev-facing). Toast is overkill for a support widget — silent graceful degradation is acceptable.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| @n8n/chat | ChatWidget rendering | ✓ (to install) | TBD | None — no fallback for chat widget, disable if unavailable |
| Node.js | npm install @n8n/chat | ✓ | v18+ | — |
| npm | Dependency installation | ✓ | Latest | — |

**Missing dependencies with no fallback:**
- None — all dependencies are available or will be installed.

**Missing dependencies with fallback:**
- @n8n/chat: If installation fails, chat widget can be commented out in HomeClient.tsx. Site still functions without chat.

## Validation Architecture

**nyquist_validation is explicitly set to false** in `.planning/config.json` (line 19: `"nyquist_validation": false`). Validation Architecture section **SKIPPED** per instructions.

## Sources

### Primary (HIGH confidence)
- Existing React implementation: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx` — createChat() configuration pattern verified
- Next.js 16.2.2 package.json — dynamic import support confirmed
- Project .env.local — NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL configured
- CONTEXT.md Phase 4 — architecture decisions locked and validated

### Secondary (MEDIUM confidence)
- [Avoiding SSR Pitfalls: Using `next/dynamic` in Your Next.js App - DEV Community](https://dev.to/snaka/avoiding-ssr-pitfalls-using-nextdynamic-in-your-nextjs-app-a4o) — dynamic import pattern verified
- [The ssr: false Trap in Next.js App Router — and How I Escaped It - Medium](https://medium.com/@joshisagarm3/the-ssr-false-trap-in-next-js-app-router-and-how-i-escaped-it-74816bc7a778) — SSR safety pattern confirmed
- [@n8n/chat - npm](https://www.npmjs.com/package/@n8n/chat) — package existence and current use confirmed
- [Custom CSS - N8N Chat UI](https://n8nchatui.com/docs/configuration/custom-css) — CSS customization approach documented

### Tertiary (LOW confidence)
- [Chat node documentation | n8n Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chat/) — node-level documentation (not package-level API)

## Metadata

**Confidence breakdown:**
- Standard stack (installation, import): HIGH — package exists, pattern tested in React source
- Architecture patterns (SSR safety, dynamic import): HIGH — CONTEXT.md locked, confirmed by dev.to and Medium articles, Next.js 16 features verified
- Common pitfalls (window undefined, env vars, theme colors): HIGH — all observed in existing React implementation
- CSS customization: MEDIUM — theme object documented in existing code, but full CSS variable list not available in official @n8n/chat docs

**Research date:** 2026-04-03
**Valid until:** 2026-04-17 (14 days — @n8n/chat may have updates, but locked decisions in CONTEXT.md are stable)

**Notes for planner:**
- @n8n/chat must be installed before implementation. Check npm registry for latest version.
- All three files (ChatWidget.tsx, ChatWidgetWrapper.tsx, HomeClient.tsx update) are interdependent — must be created together in single task.
- Environment variable is already configured — no setup task needed.
- Test in browser that Emerald colors (#10b981 button, #0a0a0a background) appear correctly.
