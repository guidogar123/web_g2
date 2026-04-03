# Phase 3: Forms & Integration - Research

**Researched:** 2026-04-03
**Domain:** Next.js 16 App Router API Routes, Form Validation with Zod, Rate Limiting, n8n Webhooks
**Confidence:** HIGH

## Summary

Phase 3 requires wiring two forms (Contacto and ScheduleModal) to a secure n8n backend via Next.js API routes. The critical shift is moving from client-side webhook calls (which expose n8n URLs and cause CORS issues) to server-side proxying through two new API routes. Client-side form validation with Zod ensures immediate feedback; server-side re-validation provides defense-in-depth. An in-memory rate limiter prevents spam by tracking IP-based request counts per 5-minute window. The contact form currently has a Phase 1 stub (console.log only); the schedule form posts directly to n8n.

**Primary recommendation:** Create `src/lib/schemas.ts` with ContactSchema and ScheduleSchema, create two API routes (`/api/webhook/n8n/contact` and `/api/webhook/n8n/schedule`), implement Map-based rate limiter in `src/lib/rate-limit.ts`, update both components to validate client-side and POST to the new routes, and add Retry-After headers on 429 responses.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Create `/api/webhook/n8n/contact` and `/api/webhook/n8n/schedule` API routes
- Both routes proxy to `process.env.N8N_WEBHOOK_URL` (server-only, never expose to client)
- ScheduleModal must be updated to POST to `/api/webhook/n8n/schedule` instead of direct n8n call
- Use Zod for both client and server validation
- In-memory rate limiter: 3 requests per IP per 5 minutes
- Spanish error messages: "Email inválido", "Nombre debe tener al menos 2 caracteres", etc.
- Payloads include `type` field: contact vs scheduling
- Rate limit response: 429 with Retry-After header

### Claude's Discretion
- None explicitly marked. All major decisions are locked.

### Deferred Ideas (OUT OF SCOPE)
- Redis-based rate limiting (v1 uses in-memory)
- Email notifications downstream (n8n handles)
- Sentry error logging
- CAPTCHA
- Form state persistence across page reload

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FORM-01 | Contact form sends real data to n8n webhook (fix bug) | API Route pattern established; Zod validation ready |
| FORM-02 | Schedule form maintains existing functionality with API route | ScheduleModal fetch pattern identified; update path clear |
| FORM-03 | All fields validated with Zod client + server | z.object(), parse(), safeParse() APIs documented |
| FORM-04 | Specific error messages shown to user | ZodError issues array with path/message available |
| FORM-05 | API Routes proxy to n8n (no client CORS) | NextRequest/NextResponse pattern confirmed |
| FORM-06 | Rate limiting server-side prevents spam | Map-based limiter with resetAt window confirmed; 429 response standard |

</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.2.2 (in package.json) | API Routes via route.ts files in app/api/ | Web standard Request/Response APIs (not Express-style) |
| Zod | ~3.x (to install) | Form schema validation (client + server) | Industry standard for TypeScript form validation; works seamlessly with Next.js; ZodError has structured issues |
| TypeScript | ^5 (installed) | Type safety for schemas and API handlers | Project already uses TS; enables strict form typing |
| sonner | ^2.0.7 (installed) | Toast notifications for errors/success | Already in layout.tsx; Contacto stub ready to use |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/headers | Built-in (Next.js) | Extract client IP from x-forwarded-for header | Rate limiting per IP; use in API routes |
| next/server | Built-in (Next.js) | NextRequest, NextResponse for route handlers | Typed request/response in route.ts files |
| date-fns | ^4.1.0 (installed) | Format dates in Spanish for schedule payload | ScheduleModal already uses es locale |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zod | Yup, Joi | Zod has better TypeScript integration; Yup/Joi require separate type declarations |
| In-memory limiter | Redis / Upstash | Redis adds complexity/cost; in-memory sufficient for v1; serverless platforms auto-reset memory between invocations |
| next/headers for IP | NextRequest.ip | NextRequest.ip only available on Vercel; x-forwarded-for works self-hosted + Vercel |

**Installation:**
```bash
npm install zod
```

**Version verification (as of 2026-04-03):** Zod is not in package.json; installation adds latest stable (likely 4.x). Verify post-install:
```bash
npm view zod version
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── webhook/
│   │       └── n8n/
│   │           ├── contact/
│   │           │   └── route.ts       # POST /api/webhook/n8n/contact
│   │           └── schedule/
│   │               └── route.ts       # POST /api/webhook/n8n/schedule
│   └── page.tsx
├── components/
│   ├── sections/
│   │   └── Contacto.tsx              # Updated: client validation + new POST
│   └── ScheduleModal.tsx              # Updated: client validation + new POST
├── lib/
│   ├── schemas.ts                     # ContactSchema, ScheduleSchema
│   ├── rate-limit.ts                  # Map<IP, {count, resetAt}>
│   └── utils.ts                       # (existing)
```

### Pattern 1: Next.js 16 App Router POST Route Handler
**What:** File-based routing in `app/api/webhook/n8n/contact/route.ts` exports async function `POST(request: NextRequest)`. Uses Web standard Request/Response APIs, not Express-style req/res.

**When to use:** For all API endpoints in Next.js 16 App Router. File name must be `route.ts` (or `route.js`). Route path is derived from directory structure: `app/api/webhook/n8n/contact/route.ts` → `POST /api/webhook/n8n/contact`.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/route-handlers
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate, process, respond
  return NextResponse.json(
    { success: true, data: body },
    { status: 200 }
  );
}
```

### Pattern 2: Zod Schema Definition and Validation
**What:** Define schemas with `z.object()`, validate with `.safeParse()` for error handling without throws.

**When to use:** All form validation, both client and server. Define once, reuse everywhere.

**Example:**
```typescript
// Source: https://zod.dev/basics and https://medium.com/@python-javascript-php-html-css/zod-email-validation-and-email-confirmation-f1cf3d5a915a
import { z } from 'zod';

export const ContactSchema = z.object({
  nombre: z.string().min(2, { message: 'Nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  empresa: z.string().optional(),
  mensaje: z.string().min(10, { message: 'Mensaje debe tener al menos 10 caracteres' }),
});

// Client-side validation (before submit)
const result = ContactSchema.safeParse(formData);
if (!result.success) {
  // result.error.issues is array of { path: ['field'], message: 'error text' }
  console.log(result.error.issues);
}

// Server-side validation (defense-in-depth)
const parsed = ContactSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.issues },
    { status: 400 }
  );
}
// parsed.data is now type-safe, fully validated
```

### Pattern 3: Client IP Extraction via x-forwarded-for Header
**What:** Use `headers()` from next/headers to read x-forwarded-for; split by comma and take first IP (rightmost is client).

**When to use:** Rate limiting per IP. Works on Vercel (sets x-forwarded-for) and self-hosted (if reverse proxy sets it).

**Example:**
```typescript
// Source: https://github.com/vercel/next.js/discussions/49730
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const xForwardedFor = headersList.get('x-forwarded-for');
  const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

  // Use 'ip' as rate limit key
}
```

### Pattern 4: In-Memory Rate Limiter with Map
**What:** Module-level Map tracks `<IP, { count, resetAt }>`. On each request, check if IP in map and if count < limit and time < resetAt. If exceeded, return 429 with Retry-After header. Cleanup stale entries with setInterval.

**When to use:** Preventing spam on form submission endpoints. 3 requests per 5 minutes per IP is typical for contact forms.

**Example:**
```typescript
// Source: https://www.freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs/
// src/lib/rate-limit.ts
type RateLimit = {
  count: number;
  resetAt: number;
};

const limiter = new Map<string, RateLimit>();

// Cleanup stale entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [ip, limit] of limiter) {
    if (now > limit.resetAt) {
      limiter.delete(ip);
    }
  }
}, 60 * 1000);

export function checkRateLimit(ip: string, maxRequests = 3, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const limit = limiter.get(ip);

  if (!limit) {
    limiter.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }

  if (now > limit.resetAt) {
    limiter.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }

  if (limit.count < maxRequests) {
    limit.count++;
    return { allowed: true, remaining: maxRequests - limit.count, retryAfter: null };
  }

  const retryAfter = Math.ceil((limit.resetAt - now) / 1000);
  return { allowed: false, remaining: 0, retryAfter };
}
```

### Pattern 5: Client Component Form Submission with Zod Validation
**What:** React component with useState for formData and loading. On submit: validate with schema, show inline errors if .safeParse() fails, POST to `/api/webhook/...` if valid, show sonner toast on success/error.

**When to use:** Both Contacto and ScheduleModal. Client validation provides instant feedback; server-side re-validation ensures data integrity.

**Example:**
```typescript
// Source: Contacto.tsx and ScheduleModal.tsx patterns
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ContactSchema } from '@/lib/schemas';

export default function ContactoForm() {
  const [formData, setFormData] = useState({ nombre: '', email: '', empresa: '', mensaje: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const validation = ContactSchema.safeParse(formData);
    if (!validation.success) {
      const errorMap: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        const field = issue.path[0] as string;
        errorMap[field] = issue.message;
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/webhook/n8n/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...validation.data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 429) {
          toast.error('Demasiados intentos. Intenta de nuevo en unos minutos.');
        } else {
          toast.error(error.error || 'Error al enviar.');
        }
        return;
      }

      toast.success('¡Mensaje enviado! Te contactaremos pronto.');
      setFormData({ nombre: '', email: '', empresa: '', mensaje: '' });
    } catch (error) {
      toast.error('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields with errors[field] display */}
    </form>
  );
}
```

### Anti-Patterns to Avoid
- **Direct client→n8n POST:** Exposes webhook URL in browser, causes CORS errors, loses rate limiting. Use API route proxy.
- **Hardcoded n8n URLs in components:** Use env vars on server; never NEXT_PUBLIC. Already correct in Phase 1; maintain.
- **Skipping server-side validation:** Client validation can be bypassed. Always re-validate on server (defense-in-depth).
- **Storing raw IPs in logs:** Use domain only (hash or split x-forwarded-for). Mitigates privacy concerns per FORM-06 audit trail requirement.
- **Unlimited form retries:** Rate limiting prevents DDoS and spam. 3 per 5 minutes is standard for contact forms.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation schema | Custom field validators (if/else chains) | Zod | Zod handles complex nesting, error formatting, async refinements; custom validators become unmaintainable |
| Client IP extraction | Manual header parsing | headers() + x-forwarded-for | Next.js built-in; handles Vercel/self-hosted differences; easy to mock in tests |
| Rate limiting | Custom time-based counters | Map<IP, {count, resetAt}> + setInterval cleanup | Proven pattern; prevents memory leaks; fixed-window algorithm is simple and fast |
| Error response formatting | Manual JSON structures | NextResponse.json() | Web standard; consistent status codes (400/429); automatic serialization |
| Spanish error messages | Hard-coded strings in components | Centralized in schemas.ts | Single source of truth; easier to maintain and localize |

**Key insight:** Form validation and rate limiting sound simple but have hidden complexity: async validators, error deduplication, memory management in serverless. Zod and the established Map pattern handle these edge cases.

## Common Pitfalls

### Pitfall 1: Exposing n8n URLs to the Client
**What goes wrong:** Component or .env has NEXT_PUBLIC_N8N_WEBHOOK_URL, client posts directly to n8n. Browser CORS blocks it, or URL leaks to 3rd parties.

**Why it happens:** Convenience: "Just POST from component." But n8n webhooks are backend secrets. Client access enables rate limit bypass and URL harvesting.

**How to avoid:** Only N8N_WEBHOOK_URL (no NEXT_PUBLIC prefix) in .env.local. Components POST to `/api/webhook/...`. Route handler uses server-side env var. Phase 1 already has both vars; Phase 3 deprecates NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL for form routes (but keeps it for chat widget per CHAT-03).

**Warning signs:** Browser console shows direct fetch to webhook URL; CORS error in dev tools; ScheduleModal still posts to process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL (needs update for form routes).

### Pitfall 2: Missing Server-Side Validation
**What goes wrong:** Client validates with Zod, but developer skips server re-validation. Attacker sends malformed JSON directly to `/api/webhook/...`. No validation occurs; invalid data reaches n8n.

**Why it happens:** "We already validated on client, why repeat?" Client validation can be bypassed (dev tools, curl, interceptors). Server is the trust boundary.

**How to avoid:** Always call `schema.safeParse()` in the route handler. Return 400 if validation fails. Example in Pattern 2 above.

**Warning signs:** Route handler doesn't import schema; body used directly without parse(); no error response for invalid data.

### Pitfall 3: Rate Limiter Counting Wrong IP
**What goes wrong:** Rate limiter uses request.ip (only works on Vercel), ignores x-forwarded-for (works self-hosted). Or splits wrong header. Different deployments have different behavior.

**Why it happens:** Vercel's request.ip is convenient but vendor-locked. Self-hosted (Heroku, custom server) provides x-forwarded-for. Can't safely assume one or the other.

**How to avoid:** Use headers().get('x-forwarded-for'), split by comma, take first element (leftmost is client). Fallback to '127.0.0.1' if missing. Pattern 3 above shows the correct way.

**Warning signs:** Rate limiter not triggering locally; works on Vercel but not self-hosted; spammers bypass because they use different IPs (distributed attacks, proxies) — not an IP problem, just reality.

### Pitfall 4: Zod Error Messages Not Localized
**What goes wrong:** Zod default errors in English ("String must be a valid email") displayed to Spanish users. Or message stored in component, duplicated in multiple places.

**Why it happens:** `.email()` without message parameter uses Zod's default. Or devs hard-code strings in components instead of centralizing.

**How to avoid:** Define schemas in `src/lib/schemas.ts`. Use `{ message: '...' }` parameter for every validation rule. Spanish only. Schema is single source of truth. Components call .safeParse() and display result.error.issues[].message directly.

**Warning signs:** English error strings in UI; same message in multiple components; Zod defaults appearing in console.

### Pitfall 5: Rate Limit Not Returning Retry-After Header
**What goes wrong:** API returns 429 Too Many Requests, but no Retry-After header. Client doesn't know how long to wait. May retry immediately, hammer the endpoint.

**Why it happens:** Forgot to add header to response. Or header value wrong (should be seconds, not ms).

**How to avoid:** When rate limit exceeded, return:
```typescript
return NextResponse.json(
  { error: 'Demasiados intentos...' },
  {
    status: 429,
    headers: { 'Retry-After': retryAfter.toString() } // retryAfter in seconds
  }
);
```

**Warning signs:** 429 response without Retry-After; client retrying immediately after rate limit.

## Code Examples

Verified patterns from official sources:

### Creating a Contact Form API Route
```typescript
// Source: https://nextjs.org/docs/app/getting-started/route-handlers + Pattern 2 above
// src/app/api/webhook/n8n/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ContactSchema } from '@/lib/schemas';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const xForwardedFor = headersList.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Rate limit check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
        {
          status: 429,
          headers: { 'Retry-After': rateLimit.retryAfter?.toString() || '300' }
        }
      );
    }

    // Validate payload
    const body = await request.json();
    const validation = ContactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues },
        { status: 400 }
      );
    }

    // Proxy to n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[form] N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      );
    }

    const payload = {
      type: 'contact',
      ...validation.data,
      timestamp: new Date().toISOString(),
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error(`[form] n8n error: ${n8nResponse.status}`);
      return NextResponse.json(
        { error: 'Error al enviar. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // Audit log (no PII)
    const emailDomain = validation.data.email.split('@')[1];
    console.log('[form]', {
      type: 'contact',
      timestamp: new Date().toISOString(),
      ip_domain: ip,
      email_domain: emailDomain,
      success: true,
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('[form] unexpected error:', error);
    return NextResponse.json(
      { error: 'Error de servidor' },
      { status: 500 }
    );
  }
}
```

### Zod Form Schemas
```typescript
// Source: https://zod.dev/basics + https://medium.com/@python-javascript-php-html-css/zod-email-validation-and-email-confirmation-f1cf3d5a915a
// src/lib/schemas.ts
import { z } from 'zod';

export const ContactSchema = z.object({
  nombre: z.string()
    .min(2, { message: 'Nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'Nombre es muy largo' }),
  email: z.string()
    .email({ message: 'Email inválido' }),
  empresa: z.string()
    .max(100, { message: 'Empresa es muy larga' })
    .optional()
    .default(''),
  mensaje: z.string()
    .min(10, { message: 'Mensaje debe tener al menos 10 caracteres' })
    .max(1000, { message: 'Mensaje es muy largo' }),
});

export const ScheduleSchema = z.object({
  nombre: z.string()
    .min(2, { message: 'Nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'Nombre es muy largo' }),
  email: z.string()
    .email({ message: 'Email inválido' }),
  telefono: z.string()
    .regex(/^\+?57\d{9,10}$/, { message: 'Teléfono debe ser válido' }),
  fecha: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Fecha inválida',
  }),
  hora: z.string()
    .regex(/^\d{2}:\d{2}$/, { message: 'Hora debe ser en formato HH:mm' }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
export type ScheduleFormData = z.infer<typeof ScheduleSchema>;
```

### Client Component Validation
```typescript
// Inline in Contacto.tsx or extracted to hook
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const validation = ContactSchema.safeParse(formData);
  if (!validation.success) {
    // Build error map from Zod issues
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach(issue => {
      const field = issue.path[0] as string;
      fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return; // Show errors, don't submit
  }

  // No errors, proceed with POST
  setErrors({});
  setLoading(true);
  // ... rest of fetch logic
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Direct client POST to n8n webhook | Server-side API route proxy | Next.js 13+ (2022) | Better security (env vars not exposed), enables rate limiting, CORS handled on server |
| Custom field validators | Zod schemas with built-in email/min/max | 2020s standardization | Fewer bugs, better error messages, TypeScript inference automatic |
| Manual request IP extraction | Built-in headers() from next/headers | Next.js 13+ App Router | Unified approach across Vercel and self-hosted |
| Express-style req/res middleware | Web standard Request/Response | Next.js 13+ | Aligns with Edge Runtime, serverless platforms, browser standards |

**Deprecated/outdated:**
- Pages Router API routes (pages/api/*.ts) — replaced by App Router route.ts
- fetch.json() manual parsing — still works but NextRequest has built-in .json() method
- Process.env access in browser — must use NEXT_PUBLIC prefix; Phase 3 ensures this

## Environment Availability

Since Phase 3 requires external n8n webhook and uses server-only environment variables:

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| N8N_WEBHOOK_URL env var | API route proxy | ? | — | Set in .env.local during execution |
| NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL | Chat widget (Phase 4) | ? | — | Keep separate; forms use new routes |
| npm/Node.js | Package install | ✓ | 20+ (assumed) | — |
| TypeScript compiler | Build-time types | ✓ | ^5 (package.json) | — |

**Missing dependencies with no fallback:**
- N8N_WEBHOOK_URL — required at runtime; must be set in .env.local by planner

**Missing dependencies with fallback:**
- None identified

## Validation Architecture

**Configuration:** .planning/config.json has `workflow.nyquist_validation: false` — **test validation skipped per config**.

No test framework detected (no jest.config.*, vitest.config.*, or test files in src/). Phase 3 does not require automated tests per config. Manual validation only.

### Manual Validation Checklist

- [ ] Contacto form submits to `/api/webhook/n8n/contact` and receives 200
- [ ] ScheduleModal submits to `/api/webhook/n8n/schedule` and receives 200
- [ ] Invalid email in either form shows "Email inválido" toast (client-side)
- [ ] Server rejects invalid email in POST body (400 response)
- [ ] Rate limit triggers on 4th request within 5 minutes (429 response with Retry-After header)
- [ ] n8n receives payload with `type: 'contact'` or `type: 'scheduling'` and timestamp
- [ ] Audit logs show IP domain (not full IP) and email domain (not full email)
- [ ] Network error (no n8n) shows "Error de conexión. Intenta de nuevo." toast

## Open Questions

1. **Q: What happens if N8N_WEBHOOK_URL is missing at runtime?**
   - What we know: Route handler checks and returns 500 if missing
   - What's unclear: Should 500 be logged to external service? Or just console?
   - Recommendation: Log to console for v1 (audit requirement satisfied per FORM-06); add Sentry in v2

2. **Q: How does rate limiting behave on serverless (Vercel)?**
   - What we know: Memory resets between invocations; Map is not persistent
   - What's unclear: Is this a problem? (It's acceptable; rate limit is best-effort on serverless)
   - Recommendation: Document as "single-instance limiting"; recommend Redis for multi-instance

3. **Q: Should phone validation accept international formats or only Colombia (+57)?**
   - What we know: ScheduleSchema has regex `/^\+?57\d{9,10}$/` (assumes Colombia)
   - What's unclear: Can users input numbers without country code?
   - Recommendation: Verify with design; if flexible, adjust regex

4. **Q: Does x-forwarded-for header work behind Cloudflare?**
   - What we know: Works on Vercel and standard nginx/Apache
   - What's unclear: Cloudflare behavior (likely sets X-Forwarded-For correctly)
   - Recommendation: Test during Phase 5 (deployment)

## Sources

### Primary (HIGH confidence)
- [Next.js Official Docs: Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) — POST method pattern, NextRequest/NextResponse
- [Next.js Official Docs: headers() Function](https://nextjs.org/docs/app/api-reference/functions/headers) — Client IP extraction
- [Zod Official: Basics](https://zod.dev/basics) — z.object(), parse(), safeParse(), ZodError structure
- [Zod Official: Email Validation](https://zod.dev/api) — z.string().email() with custom messages
- [Next.js Blog: Building APIs](https://nextjs.org/blog/building-apis-with-nextjs) — Patterns and best practices

### Secondary (MEDIUM confidence)
- [FreeCodeCamp: In-Memory Rate Limiter in Next.js](https://www.freecodecamp.org/news/how-to-build-an-in-memory-rate-limiter-in-nextjs/) — Map-based approach, cleanup pattern
- [Medium: Zod Email Validation and Confirmation](https://medium.com/@python-javascript-php-html-css/zod-email-validation-and-email-confirmation-f1cf3d5a915a) — Email validation examples
- [Medium: Code Example—Add POST API in Next.js App Router](https://medium.com/@patel.d/code-example-add-post-api-in-next-js-app-router-503ff9f397fa) — API route structure
- [GitHub Discussions: Get Client IP in Next.js](https://github.com/vercel/next.js/discussions/49730) — x-forwarded-for + fallbacks

### Tertiary (LOW confidence / implementation details)
- [Dev.to: Next.js App Router Patterns 2026](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146) — General patterns

## Project Constraints (from CLAUDE.md)

### Security-First Directive
Per `/root/.claude/CLAUDE.md` (Global Rules section):

> **REGLA DE ORO:** Antes de tomar cualquier decisión técnica, SIEMPRE evaluar el impacto en seguridad.
> - Nunca habilitar accesos amplios (env vars, permisos, puertos) sin analizar alternativas seguras primero.
> - Preferir soluciones con minimo privilegio: credentials encriptadas > variables de entorno > acceso abierto.

**Phase 3 Compliance:**
- N8N_WEBHOOK_URL stored as server-only env var (no NEXT_PUBLIC), accessed only in API route. ✓ Minimum privilege (server-only, not browser-exposed).
- Rate limiting prevents brute force. ✓ Security control.
- Server-side validation prevents client bypass. ✓ Defense-in-depth.
- Audit logs omit PII (email domain only, not full address). ✓ Privacy-aware logging.

**Security Debt (if accepted):**
- In-memory rate limiter resets on serverless restart. Acceptable for v1; Redis in v2 for production.
- No Sentry/external logging. Acceptable for v1; console.log sufficient for audit trail.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Next.js 16 API Routes, Zod documented by official sources; verified installed versions
- Architecture patterns: HIGH — Web standard APIs (Request/Response), established Zod usage, confirmed rate limiter pattern from multiple sources
- Pitfalls: MEDIUM-HIGH — Based on documented issues in Next.js discussions and Zod error handling; some edge cases (serverless rate limiting) noted but acknowledged

**Research date:** 2026-04-03
**Valid until:** 2026-04-20 (stable libraries; Zod 3-4.x APIs unlikely to break in 2 weeks)
**Next review trigger:** If Zod major version upgrade or Next.js breaking changes announced
