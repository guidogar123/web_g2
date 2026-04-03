# Phase 4: Chat Widget & Integration - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Add the `@n8n/chat` widget to `sitio-g2-nextjs/` with Next.js SSR safety (`dynamic()` with `ssr: false`), Emerald Intelligence theme (button #10b981, chat background #0a0a0a), and graceful degradation if the library fails to load. Phase ends when the page loads without "window is undefined" SSR errors, the chat widget appears within 2 seconds, and theme colors match the brand.

</domain>

<decisions>
## Implementation Decisions

### SSR Safety — The Core Problem
- `@n8n/chat` uses browser APIs (window, document) that don't exist during SSR
- Solution: `next/dynamic` with `ssr: false` wrapping the ChatWidget component
- `ChatWidget.tsx` has `'use client'` directive AND is wrapped in dynamic import
- The dynamic wrapper lives in `src/components/ChatWidgetWrapper.tsx` (or inline in page)
- `HomeClient.tsx` (already 'use client') can import ChatWidget directly — but dynamic import is still needed to prevent SSR execution

### Component Architecture
- `src/components/ChatWidget.tsx` — `'use client'`, imports and initializes `@n8n/chat`
- `src/components/ChatWidgetWrapper.tsx` — `'use client'`, uses `dynamic(() => import('./ChatWidget'), { ssr: false, loading: () => null })`
- `HomeClient.tsx` renders `<ChatWidgetWrapper />` at the bottom (after all sections)
- No SSR for the chat widget at all — acceptable since it's a support tool, not SEO content

### n8n Chat Initialization
- Use `createChat()` from `@n8n/chat` inside `useEffect`
- Webhook URL: `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`
- Configuration: `{ webhookUrl, mode: 'window', chatInputKey: 'chatInput', metadata: {} }`
- Import CSS: `import '@n8n/chat/style.css'`

### Emerald Intelligence Theme
- Override CSS variables after mount to apply brand colors
- Button background: `#10b981` (emerald)
- Chat window background: `#0a0a0a` (near-black, distinct from #050505 page bg)
- Use CSS custom property overrides via `document.documentElement.style.setProperty()`
- Or use `<style>` tag injected via `useEffect`

### Graceful Degradation
- `loading` prop of dynamic(): `() => null` — renders nothing while loading (no layout shift)
- On init error: catch in try/catch, show toast "Chat temporalmente no disponible"
- If `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` is undefined: log warning, do not initialize

### Performance
- Chat widget loads AFTER page content (dynamic import deferred)
- No preloading of `@n8n/chat` — avoids delaying LCP
- LCP baseline from Phase 1 must be preserved

</decisions>

<code_context>
## Existing Code Insights

### Current ChatWidget (React source — NOT yet migrated)
- Original at: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx`
- Uses `@n8n/chat` createChat() inside useEffect
- Has hardcoded webhook URL (already replaced by env var in ScheduleModal)

### HomeClient.tsx
- `sitio-g2-nextjs/src/components/HomeClient.tsx`
- Has `'use client'` directive
- Currently renders all 6 sections + Navigation + ScheduleModal
- ChatWidgetWrapper should be added here at the bottom

### Environment Variable
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` — already in .env.local from Phase 1
- Value: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`

### @n8n/chat Package
- May not be installed yet — check package.json
- `npm install @n8n/chat` if missing
- Requires CSS import for default styles (then override with brand colors)

</code_context>

<specifics>
## Specific Ideas

- CSS variable overrides for n8n chat theme:
  ```css
  --chat--color-primary: #10b981;
  --chat--color-primary-shade-50: #0d9268;
  --chat--color-secondary: #0a0a0a;
  --chat--window--background-color: #0a0a0a;
  --chat--color-font: #ffffff;
  ```
- Use `document.documentElement.style.setProperty()` in useEffect after createChat()
- Or inject `<style>` tag into `<head>` to override n8n default styles globally

</specifics>

<deferred>
## Deferred Ideas

- Custom chat UI (full replacement of @n8n/chat) — not needed, brand theme via CSS vars is sufficient
- Chat analytics — out of scope v1
- Proactive chat opening after X seconds — out of scope v1
- Mobile-specific positioning adjustments — Phase 5 / performance review
</deferred>
