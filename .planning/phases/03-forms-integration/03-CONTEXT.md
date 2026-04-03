# Phase 3: Forms & Integration - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix the contact form bug (currently simulates submission with setTimeout), wire both contact form and schedule form to n8n webhook via Next.js API routes, add Zod validation (client + server), show specific error messages, and implement rate limiting. Phase ends when form data reaches n8n inbox within 2 seconds, invalid emails are blocked with "Email inválido", and 4th rapid submission returns 429.

</domain>

<decisions>
## Implementation Decisions

### API Route Architecture
- Create `/api/webhook/n8n/contact` — POST route for contact form
- Create `/api/webhook/n8n/schedule` — POST route for schedule form
- Both proxy to `process.env.N8N_WEBHOOK_URL` (server-only, never exposed to client)
- ScheduleModal currently posts directly to n8n — move to use `/api/webhook/n8n/schedule` instead
- This prevents CORS issues and enables rate limiting on the server

### Validation with Zod
- Install `zod` package
- Create `src/lib/schemas.ts` with ContactSchema and ScheduleSchema
- Client-side: validate before submit (show inline errors immediately)
- Server-side: re-validate in API route (defense in depth)
- Contact schema: nombre (min 2), email (valid email), empresa (optional), mensaje (min 10)
- Schedule schema: nombre (min 2), email (valid email), telefono (min 7 digits), fecha, hora

### Error Messages (Spanish)
- Invalid email: "Email inválido"
- Name too short: "Nombre debe tener al menos 2 caracteres"
- Message too short: "Mensaje debe tener al menos 10 caracteres"
- Rate limit: "Demasiados intentos. Intenta de nuevo en unos minutos."
- Network error: "Error de conexión. Intenta de nuevo."
- n8n error: "Error al enviar. Intenta de nuevo."

### Rate Limiting
- In-memory rate limiter (no Redis needed for v1)
- Use `src/lib/rate-limit.ts` with Map<IP, {count, resetAt}>
- Limit: 3 requests per IP per 5 minutes
- Returns 429 with Retry-After header on exceeded
- Apply to both `/api/webhook/n8n/contact` and `/api/webhook/n8n/schedule`

### n8n Webhook Payloads
- Contact: `{ type: 'contact', nombre, email, empresa, mensaje, timestamp }`
- Schedule: `{ type: 'scheduling', nombre, email, telefono, fecha, hora, timestamp }`
- Both via POST to N8N_WEBHOOK_URL

### Logging (Audit Trail)
- Server-side `console.log` with: type, timestamp, IP, success/failure
- No PII in logs (hash or omit email in logs — log only domain)
- Sufficient for audit trail requirement (FORM-06)

### ScheduleModal Update
- Currently posts directly to hardcoded n8n URL (Phase 1 migrated to env var)
- Update to POST to `/api/webhook/n8n/schedule` instead
- Add Zod client validation before submit
- Preserve existing UI and form fields

### Contacto Section Update
- Currently has stub handleSubmit (console.log only — Phase 1 stub)
- Replace handleSubmit with real POST to `/api/webhook/n8n/contact`
- Add Zod client validation
- Show success/error states with sonner toast

</decisions>

<code_context>
## Existing Code Insights

### Critical Bug Location
- `sitio-g2-nextjs/src/components/sections/Contacto.tsx` — handleSubmit is Phase 1 stub
- Form fields: nombre, email, empresa, mensaje
- Has `'use client'` directive (correct, has form state)
- Uses sonner for toasts (Toaster already in layout.tsx)

### ScheduleModal Location
- `sitio-g2-nextjs/src/components/ScheduleModal.tsx`
- Currently posts to `process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`
- Fields: nombre, email, telefono, fecha, hora
- Has `'use client'` directive

### n8n Webhook
- URL: `process.env.N8N_WEBHOOK_URL` (server-only)
- Same endpoint for both contact and schedule (differentiated by `type` field)
- Already proven working for scheduling

### Environment Variables
- `N8N_WEBHOOK_URL` — server-only (already in .env.local from Phase 1)
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` — client-visible (for chat widget only)

</code_context>

<specifics>
## Specific Ideas

- Use `next/headers` to get client IP from `x-forwarded-for` header for rate limiting
- Rate limiter: `new Map<string, { count: number; resetAt: number }>()` as module-level singleton
- For audit logging: `console.log('[form]', { type, ip_domain, timestamp, success })`
- On success: show sonner toast "¡Mensaje enviado! Te contactaremos pronto."
- On 429: show sonner toast "Demasiados intentos. Espera unos minutos."
- ScheduleModal success already shows toast — preserve behavior

</specifics>

<deferred>
## Deferred Ideas

- Redis-based rate limiting — in-memory sufficient for v1
- Email notifications on form submit — n8n handles downstream notifications
- Sentry error logging — out of scope v1
- CAPTCHA — rate limiting sufficient for v1
- Form state persistence across page reload — not needed
</deferred>
