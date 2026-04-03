---
phase: 04-chat-widget-integration
plan: 01
subsystem: ui
tags: [n8n, chat-widget, next-dynamic, ssr, react, typescript]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js 15 App Router project structure, HomeClient.tsx component, env var patterns
  - phase: 03-forms-integration
    provides: NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL set in .env.local
provides:
  - SSR-safe @n8n/chat widget mounted on homepage via dynamic(ssr:false)
  - Emerald Intelligence theme (button #10b981, chat bg #0a0a0a)
  - Graceful degradation when NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is absent
affects: [05-performance-launch-validation]

# Tech tracking
tech-stack:
  added: ["@n8n/chat ^1.14.0"]
  patterns:
    - "dynamic(ssr:false) wrapper pattern for browser-only third-party widgets"
    - "Graceful degradation via env-var guard in useEffect before createChat()"

key-files:
  created:
    - sitio-g2-nextjs/src/components/ChatWidget.tsx
    - sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx
  modified:
    - sitio-g2-nextjs/src/components/HomeClient.tsx
    - sitio-g2-nextjs/package.json
    - sitio-g2-nextjs/package-lock.json

key-decisions:
  - "ChatWidgetWrapper uses 'use client' + dynamic(ssr:false): required because @n8n/chat accesses window/document which don't exist during SSR"
  - "ChatWidget.tsx reads NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL in useEffect (not module scope): ensures env var check happens after hydration"
  - "next/dynamic API in Next.js 16.2.2 is identical to 13-15 syntax: dynamic(() => import(...), { ssr: false }) confirmed via node_modules/next/dist/docs"
  - "@n8n/chat v1.14.0 installed with zero peer dependency warnings (React 19 + Next.js 16.2.2 compatible)"

patterns-established:
  - "SSR-safe pattern: always wrap browser-only widgets in a 'use client' dynamic(ssr:false) shim component"
  - "Env-var guard pattern: check NEXT_PUBLIC_ var in useEffect, warn+return if missing — no crash on missing config"

requirements-completed: [CHAT-01, CHAT-02, CHAT-03]

# Metrics
duration: 12min
completed: 2026-04-03
---

# Phase 4: Chat Widget & Integration Summary

**@n8n/chat v1.14.0 wired into Next.js homepage via SSR-safe dynamic(ssr:false) wrapper with Emerald Intelligence theme (#10b981 button, #0a0a0a dark chat window) and graceful degradation**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-03T23:45:06Z
- **Completed:** 2026-04-03T23:57:00Z
- **Tasks:** 2 auto-tasks + 1 checkpoint (auto-approved, YOLO mode)
- **Files modified:** 5

## Accomplishments

- Installed @n8n/chat v1.14.0 — clean install, no peer dependency warnings with React 19 + Next.js 16.2.2
- Created ChatWidget.tsx with full Emerald Intelligence theme config, Agente g2 branding, and graceful degradation when env var is absent
- Created ChatWidgetWrapper.tsx with `dynamic(ssr:false)` to prevent "window is undefined" SSR errors — confirmed via Next.js 16.2.2 lazy-loading docs
- Updated HomeClient.tsx to mount `<ChatWidgetWrapper />` as last child in the page fragment
- npm run build exits 0, TypeScript clean, no SSR errors, all 9 static pages generated

## Task Commits

Each task was committed atomically:

1. **Task 1: Install @n8n/chat** - `f491cc4` (chore)
2. **Task 2: Create ChatWidget.tsx, ChatWidgetWrapper.tsx, update HomeClient.tsx** - `e4594f0` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `sitio-g2-nextjs/src/components/ChatWidget.tsx` — 'use client', createChat() with Emerald theme, env-var guard, graceful degradation
- `sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx` — 'use client', dynamic(ssr:false) SSR safety shim
- `sitio-g2-nextjs/src/components/HomeClient.tsx` — Added ChatWidgetWrapper import and JSX mount after ScheduleModal
- `sitio-g2-nextjs/package.json` — Added @n8n/chat ^1.14.0 to dependencies
- `sitio-g2-nextjs/package-lock.json` — Lock file updated (30 packages added)

## Decisions Made

- Used `dynamic(ssr:false)` inside a `'use client'` wrapper (not inside a Server Component) — confirmed correct per Next.js 16.2.2 docs: ssr:false only works in Client Components
- next/dynamic API is identical in Next.js 16.2.2 to prior versions: `dynamic(() => import('./ChatWidget'), { ssr: false, loading: () => null })` — no breaking changes
- Webhook URL exclusively via `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` — never hardcoded — satisfies Security First rule from CLAUDE.md
- @n8n/chat v1.14.0 installed without `--legacy-peer-deps` — clean install on React 19 + Next.js 16.2.2

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None. @n8n/chat installed cleanly with no peer dependency conflicts. The `next/dynamic` API in Next.js 16.2.2 is identical to the documented 13-15 syntax — no adaptation required.

## Known Stubs

None — ChatWidget connects directly to the live n8n webhook URL via NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL. No placeholder data.

## User Setup Required

The chat widget requires `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` to be set:
- Already present in `sitio-g2-nextjs/.env.local` (set in Phase 3)
- For Vercel production: add `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` as an environment variable in the Vercel dashboard
- If absent: widget silently disabled, page loads normally, console shows `[ChatWidget] NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL not set — chat disabled`

## Next Phase Readiness

Phase 5 (Performance & Launch Validation) can now proceed:
- All 4 feature phases complete: Foundation, SEO, Forms, Chat
- npm run build clean, no TypeScript errors
- Chat widget SSR-safe — will not cause Vercel SSR errors on deployment
- Concern: n8n chat CSS (`@n8n/chat/style.css`) injects global styles — verify no CLS impact in Phase 5 Lighthouse run

---
*Phase: 04-chat-widget-integration*
*Completed: 2026-04-03*
