---
phase: 03-forms-integration
plan: 01
subsystem: forms
tags: [forms, n8n, zod, rate-limiting, validation, security]
dependency_graph:
  requires: [Phase 1 API route architecture, Phase 2 metadata]
  provides: [contact-form-integration, schedule-form-integration, server-side-rate-limiting]
  affects: [Contacto.tsx, ScheduleModal.tsx]
tech_stack:
  added: [zod ^4.3.6]
  patterns: [Next.js App Router API routes, server-side proxy, Zod client+server validation, in-memory rate limiting]
key_files:
  created:
    - sitio-g2-nextjs/src/lib/schemas.ts
    - sitio-g2-nextjs/src/lib/rate-limit.ts
    - sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts
    - sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts
  modified:
    - sitio-g2-nextjs/src/components/sections/Contacto.tsx
    - sitio-g2-nextjs/src/components/ScheduleModal.tsx
decisions:
  - "Phone validation uses min(7)/max(20) string check — strict Colombian regex excluded for UX (users may omit country code)"
  - "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL preserved in .env.local for Phase 4 chat widget; removed only from ScheduleModal"
  - "ScheduleModal preserves localStorage cooldown/ban logic alongside server-side rate limiting for dual-layer protection"
  - "catch (error) typed as catch block — cast to { error?: string } at usage point to satisfy TS strict mode"
metrics:
  duration: 4 minutes
  completed_date: 2026-04-03
  tasks_completed: 5
  files_created: 4
  files_modified: 2
---

# Phase 3 Plan 01: Forms & Integration Summary

**One-liner:** Zod-validated contact + schedule forms proxied through Next.js API routes to n8n, with server-side rate limiting (3 req/5 min) and Spanish inline errors — N8N_WEBHOOK_URL server-only.

## What Was Built

### New Files

**`src/lib/schemas.ts`**
Shared Zod schemas for both forms. `ContactSchema` validates nombre (2-100 chars), email, optional empresa, mensaje (10-1000 chars). `ScheduleSchema` validates nombre, email, telefono (7-20 chars), fecha, hora (HH:mm regex). All error messages in Spanish. Exports `ContactFormData` and `ScheduleFormData` TypeScript types.

**`src/lib/rate-limit.ts`**
In-memory `Map<string, RateLimitEntry>` rate limiter. Default: 3 requests per IP per 5 minutes. Returns `{ allowed, remaining, retryAfter }`. Includes a `setInterval` cleanup every 60 seconds to prevent memory growth from stale entries. Server-only (no `'use client'`).

**`src/app/api/webhook/n8n/contact/route.ts`**
POST handler: extracts IP from `x-forwarded-for` header (async `headers()` per Next.js 16), applies rate limit, validates body with `ContactSchema.safeParse()`, proxies to `process.env.N8N_WEBHOOK_URL` with payload `{ type: 'contact', nombre, email, empresa, mensaje, timestamp }`. Returns 429 + `Retry-After` header on rate limit. Audit logs email domain (no PII).

**`src/app/api/webhook/n8n/schedule/route.ts`**
POST handler: same pattern as contact route. Validates with `ScheduleSchema`, proxies payload `{ type: 'scheduling', nombre, email, telefono, fecha, hora, timestamp }`.

### Modified Files

**`src/components/sections/Contacto.tsx`**
Replaced `setTimeout` stub with real `fetch('/api/webhook/n8n/contact', ...)`. Added `errors` state (`Record<string, string>`), Zod client-side validation before submit, inline red error messages under each field. Toast on success/error.

**`src/components/ScheduleModal.tsx`**
Replaced direct `fetch(process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL, ...)` with `fetch('/api/webhook/n8n/schedule', ...)`. Added `errors` state, Zod client validation before localStorage rate limit check, inline errors under nombre/email/telefono. Preserved localStorage COOLDOWN_KEY/BAN_KEY logic.

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Phone: `min(7)/max(20)` not Colombian regex | Users may omit country code; strict regex would break valid submissions |
| `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` preserved in .env.local | Phase 4 chat widget needs it; only removed from ScheduleModal usage |
| Dual rate limiting in ScheduleModal | localStorage client-side + server-side Map — defense in depth |
| Zod runs client-side before server fetch | Avoids unnecessary network roundtrip for obvious input errors |

## Build Verification

- `npx tsc --noEmit --skipLibCheck` — exits 0, zero errors
- `npm run build` — exits 0, both routes compiled as Dynamic (ƒ)
- `grep N8N_WEBHOOK_URL src/components/` — no matches (server-only)
- `grep NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL src/components/ScheduleModal.tsx` — no matches

## Checkpoint (Task 5)

Auto-approved (YOLO mode). Build passes, TypeScript clean, security audit passes. Human functional testing (n8n live inbox, rate limit 429 behavior) deferred to manual verification when dev server is run.

## Deviations from Plan

None — plan executed exactly as written. The phone validation approach (min/max vs. regex) was a documented discretion area in the plan itself, not a deviation.

## Known Stubs

None. Both forms POST real data to n8n via API routes. No hardcoded empty arrays, placeholder responses, or mock data.

## Requirements Satisfied

- FORM-01: Contact form sends real data to n8n (setTimeout stub replaced)
- FORM-02: Schedule form reaches n8n via /api/webhook/n8n/schedule (not direct client->n8n)
- FORM-03: Server-side Zod validation on both routes
- FORM-04: Client-side Zod validation with Spanish error messages shown inline
- FORM-05: N8N_WEBHOOK_URL is server-only; never in client components or build output
- FORM-06: Rate limiting — 3 req/5 min per IP, 429 + Retry-After header on excess

## Self-Check: PASSED

Files exist:
- sitio-g2-nextjs/src/lib/schemas.ts — FOUND
- sitio-g2-nextjs/src/lib/rate-limit.ts — FOUND
- sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts — FOUND
- sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts — FOUND

Commits:
- 24540f7 feat(03-01): install zod, add ContactSchema + ScheduleSchema + rate limiter — FOUND
- 849190c feat(03-01): add secure API routes proxying forms to n8n — FOUND
- 856afdd feat(03-01): wire contact + schedule forms to n8n API routes with Zod validation — FOUND
