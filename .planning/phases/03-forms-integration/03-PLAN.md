---
phase: 03-forms-integration
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - sitio-g2-nextjs/package.json
  - sitio-g2-nextjs/src/lib/schemas.ts
  - sitio-g2-nextjs/src/lib/rate-limit.ts
  - sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts
  - sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts
  - sitio-g2-nextjs/src/components/sections/Contacto.tsx
  - sitio-g2-nextjs/src/components/ScheduleModal.tsx
autonomous: false
requirements:
  - FORM-01
  - FORM-02
  - FORM-03
  - FORM-04
  - FORM-05
  - FORM-06

must_haves:
  truths:
    - "Contact form submits real data to n8n within 2 seconds (no setTimeout stub)"
    - "Schedule form reaches n8n via /api/webhook/n8n/schedule (not direct client→n8n)"
    - "Invalid email blocks submission and shows 'Email inválido' to the user"
    - "4th request within 5 minutes returns HTTP 429 with Retry-After header"
    - "N8N_WEBHOOK_URL never appears in browser DevTools source or network tab"
    - "npm run build exits 0 after all changes"
  artifacts:
    - path: "sitio-g2-nextjs/src/lib/schemas.ts"
      provides: "ContactSchema + ScheduleSchema with Spanish error messages"
      exports: ["ContactSchema", "ScheduleSchema", "ContactFormData", "ScheduleFormData"]
    - path: "sitio-g2-nextjs/src/lib/rate-limit.ts"
      provides: "Map-based rate limiter, 3 req / 5 min per IP"
      exports: ["checkRateLimit"]
    - path: "sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts"
      provides: "POST /api/webhook/n8n/contact — validates, rate-limits, proxies to n8n"
      exports: ["POST"]
    - path: "sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts"
      provides: "POST /api/webhook/n8n/schedule — validates, rate-limits, proxies to n8n"
      exports: ["POST"]
    - path: "sitio-g2-nextjs/src/components/sections/Contacto.tsx"
      provides: "Contact form with Zod client validation and real POST to /api/webhook/n8n/contact"
    - path: "sitio-g2-nextjs/src/components/ScheduleModal.tsx"
      provides: "Schedule form with Zod client validation and POST to /api/webhook/n8n/schedule"
  key_links:
    - from: "Contacto.tsx handleSubmit"
      to: "/api/webhook/n8n/contact"
      via: "fetch POST with JSON body"
      pattern: "fetch.*api/webhook/n8n/contact"
    - from: "ScheduleModal.tsx handleSubmit"
      to: "/api/webhook/n8n/schedule"
      via: "fetch POST with JSON body"
      pattern: "fetch.*api/webhook/n8n/schedule"
    - from: "contact/route.ts"
      to: "process.env.N8N_WEBHOOK_URL"
      via: "server-side fetch"
      pattern: "N8N_WEBHOOK_URL"
    - from: "schedule/route.ts"
      to: "process.env.N8N_WEBHOOK_URL"
      via: "server-side fetch"
      pattern: "N8N_WEBHOOK_URL"
---

<objective>
Fix the Phase 1 stub in Contacto.tsx, wire both forms to n8n through secure server-side API routes, add Zod validation on client and server, implement in-memory rate limiting, and display specific Spanish error messages.

Purpose: Contacts submitted through the site must actually reach the n8n inbox. The current contact form discards all data (setTimeout stub). The schedule form posts directly from the browser, exposing the webhook URL and bypassing server controls.

Output:
- Two new API routes that proxy form data to n8n
- Two Zod schemas (shared client + server)
- In-memory rate limiter (3 req / 5 min per IP)
- Contacto.tsx with real submission logic
- ScheduleModal.tsx updated to POST to /api/webhook/n8n/schedule
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/03-forms-integration/03-CONTEXT.md
@.planning/phases/03-forms-integration/03-RESEARCH.md

<!-- CRITICAL: Read this before writing any Next.js code -->
@sitio-g2-nextjs/node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md

<interfaces>
<!-- Key contracts the executor needs. No codebase exploration required. -->

From sitio-g2-nextjs/src/components/sections/Contacto.tsx (current state):
```typescript
// Phase 1 stub — handleSubmit only does console.log + setTimeout
// Form fields: nombre (string), email (string), empresa (string), mensaje (string)
// Uses sonner (toast) — already imported from 'sonner' in layout
// Has 'use client' directive
// Props: { onScheduleClick: () => void }
// State: formData: FormData, loading: boolean
// NO errors state exists yet — must add Record<string, string>
```

From sitio-g2-nextjs/src/components/ScheduleModal.tsx (current state):
```typescript
// Currently posts directly to process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL
// Form fields: nombre, email, telefono (+ empresa in state but NOT in schema)
// Date/time: date (Date), selectedTime (string HH:mm)
// Has client-side rate limit via localStorage (COOLDOWN_KEY, BAN_KEY) — PRESERVE this UI behavior
// Has 'use client' directive
// Imports: toast from 'sonner', format from 'date-fns', es from 'date-fns/locale'
// The fetch call on line 96 must be replaced to target /api/webhook/n8n/schedule
// Zod client validation added before submit — add errors state
```

From sitio-g2-nextjs/package.json:
```json
// zod is NOT installed — Task 1 must run npm install zod first
// Next.js version: 16.2.2
// sonner: ^2.0.7 (installed)
// date-fns: ^4.1.0 (installed)
```

Next.js 16 route handler signature (from official docs in node_modules):
```typescript
// Correct POST handler signature — use Request, not NextRequest (both work but Request is the web standard):
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ success: true }, { status: 200 });
}

// headers() is async in Next.js 16 — MUST await it:
import { headers } from 'next/headers';
const headersList = await headers();
const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install zod, create schemas.ts and rate-limit.ts</name>
  <files>
    sitio-g2-nextjs/package.json,
    sitio-g2-nextjs/src/lib/schemas.ts,
    sitio-g2-nextjs/src/lib/rate-limit.ts
  </files>
  <action>
Run in sitio-g2-nextjs/:
```
npm install zod
```

Create sitio-g2-nextjs/src/lib/schemas.ts:

```typescript
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
    .min(7, { message: 'Teléfono debe tener al menos 7 dígitos' })
    .max(20, { message: 'Teléfono inválido' }),
  fecha: z.string().min(1, { message: 'Fecha requerida' }),
  hora: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Hora debe ser en formato HH:mm' }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
export type ScheduleFormData = z.infer<typeof ScheduleSchema>;
```

Note on telefono: Use min(7)/max(20) instead of the Colombia-only regex from RESEARCH.md. The existing ScheduleModal accepts "+57..." as placeholder but the field is free-text — a strict Colombian regex would break submissions from users who omit the country code. The CONTEXT.md does not lock a specific regex; this is Claude's discretion (the discretion area for phone validation).

Create sitio-g2-nextjs/src/lib/rate-limit.ts:

```typescript
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const limiter = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 60 seconds to prevent memory growth
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of limiter) {
      if (now > entry.resetAt) {
        limiter.delete(ip);
      }
    }
  }, 60 * 1000);
}

export function checkRateLimit(
  ip: string,
  maxRequests = 3,
  windowMs = 5 * 60 * 1000,
): { allowed: boolean; remaining: number; retryAfter: number | null } {
  const now = Date.now();
  const entry = limiter.get(ip);

  if (!entry || now > entry.resetAt) {
    limiter.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }

  if (entry.count < maxRequests) {
    entry.count++;
    return { allowed: true, remaining: maxRequests - entry.count, retryAfter: null };
  }

  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: false, remaining: 0, retryAfter };
}
```
  </action>
  <verify>
node -e "const { ContactSchema } = require('./sitio-g2-nextjs/src/lib/schemas.ts')" 2>&1 || cd sitio-g2-nextjs && npx tsc --noEmit --skipLibCheck 2>&1 | head -20
  </verify>
  <done>
- package.json has zod in dependencies
- src/lib/schemas.ts exports ContactSchema, ScheduleSchema, ContactFormData, ScheduleFormData
- src/lib/rate-limit.ts exports checkRateLimit
- TypeScript sees no type errors in these two files
  </done>
</task>

<task type="auto">
  <name>Task 2: Create both API route handlers</name>
  <files>
    sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts,
    sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts
  </files>
  <action>
Create the directory structure:
```
sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts
sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts
```

Create sitio-g2-nextjs/src/app/api/webhook/n8n/contact/route.ts (per FORM-05, FORM-06, D-locked API route architecture):

```typescript
import { headers } from 'next/headers';
import { ContactSchema } from '@/lib/schemas';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Extract client IP for rate limiting (per FORM-06)
    const headersList = await headers(); // headers() is async in Next.js 16
    const xForwardedFor = headersList.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Rate limit: 3 requests per IP per 5 minutes (per FORM-06, D-locked)
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return Response.json(
        { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
        {
          status: 429,
          headers: { 'Retry-After': rateLimit.retryAfter?.toString() ?? '300' },
        },
      );
    }

    // Parse and validate (per FORM-03 server-side validation)
    const body = await request.json();
    const validation = ContactSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { error: validation.error.issues[0]?.message ?? 'Datos inválidos' },
        { status: 400 },
      );
    }

    // Check server env var — never expose to client (security-first per CLAUDE.md)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[form] N8N_WEBHOOK_URL not configured');
      return Response.json(
        { error: 'Error de configuración del servidor.' },
        { status: 500 },
      );
    }

    // Build payload (per FORM-01, D-locked payload shape)
    const payload = {
      type: 'contact' as const,
      nombre: validation.data.nombre,
      email: validation.data.email,
      empresa: validation.data.empresa ?? '',
      mensaje: validation.data.mensaje,
      timestamp: new Date().toISOString(),
    };

    // Proxy to n8n (per FORM-05)
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error(`[form] n8n responded ${n8nResponse.status}`);
      return Response.json(
        { error: 'Error al enviar. Intenta de nuevo.' },
        { status: 500 },
      );
    }

    // Audit log — no PII (per FORM-06, CONTEXT.md logging spec)
    const emailDomain = validation.data.email.split('@')[1] ?? 'unknown';
    console.log('[form]', {
      type: 'contact',
      timestamp: new Date().toISOString(),
      ip_domain: ip,
      email_domain: emailDomain,
      success: true,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[form] unexpected error:', error);
    return Response.json({ error: 'Error de servidor.' }, { status: 500 });
  }
}
```

Create sitio-g2-nextjs/src/app/api/webhook/n8n/schedule/route.ts (per FORM-02, FORM-05, FORM-06, D-locked payload shape):

```typescript
import { headers } from 'next/headers';
import { ScheduleSchema } from '@/lib/schemas';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Extract client IP for rate limiting (per FORM-06)
    const headersList = await headers(); // headers() is async in Next.js 16
    const xForwardedFor = headersList.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Rate limit: 3 requests per IP per 5 minutes (per FORM-06, D-locked)
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return Response.json(
        { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
        {
          status: 429,
          headers: { 'Retry-After': rateLimit.retryAfter?.toString() ?? '300' },
        },
      );
    }

    // Parse and validate (per FORM-03 server-side validation)
    const body = await request.json();
    const validation = ScheduleSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { error: validation.error.issues[0]?.message ?? 'Datos inválidos' },
        { status: 400 },
      );
    }

    // Check server env var — never expose to client (security-first per CLAUDE.md)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[form] N8N_WEBHOOK_URL not configured');
      return Response.json(
        { error: 'Error de configuración del servidor.' },
        { status: 500 },
      );
    }

    // Build payload (per FORM-02, D-locked payload shape)
    const payload = {
      type: 'scheduling' as const,
      nombre: validation.data.nombre,
      email: validation.data.email,
      telefono: validation.data.telefono,
      fecha: validation.data.fecha,
      hora: validation.data.hora,
      timestamp: new Date().toISOString(),
    };

    // Proxy to n8n (per FORM-05)
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error(`[form] n8n responded ${n8nResponse.status}`);
      return Response.json(
        { error: 'Error al agendar. Intenta de nuevo.' },
        { status: 500 },
      );
    }

    // Audit log — no PII (per FORM-06, CONTEXT.md logging spec)
    const emailDomain = validation.data.email.split('@')[1] ?? 'unknown';
    console.log('[form]', {
      type: 'scheduling',
      timestamp: new Date().toISOString(),
      ip_domain: ip,
      email_domain: emailDomain,
      success: true,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[form] unexpected error:', error);
    return Response.json({ error: 'Error de servidor.' }, { status: 500 });
  }
}
```
  </action>
  <verify>
cd sitio-g2-nextjs && npx tsc --noEmit --skipLibCheck 2>&1 | grep -E "error TS|contact/route|schedule/route" | head -20
  </verify>
  <done>
- src/app/api/webhook/n8n/contact/route.ts exists and exports POST
- src/app/api/webhook/n8n/schedule/route.ts exists and exports POST
- Both import from @/lib/schemas and @/lib/rate-limit without TypeScript errors
- Neither file references NEXT_PUBLIC_ or any client-visible env var
- Both return 429 + Retry-After when rate limit exceeded
  </done>
</task>

<task type="auto">
  <name>Task 3: Fix Contacto.tsx and update ScheduleModal.tsx</name>
  <files>
    sitio-g2-nextjs/src/components/sections/Contacto.tsx,
    sitio-g2-nextjs/src/components/ScheduleModal.tsx
  </files>
  <action>
Replace sitio-g2-nextjs/src/components/sections/Contacto.tsx.

Keep all existing JSX (layout, labels, inputs, button, contact info cards, social links, schedule CTA) unchanged. Only replace the handleSubmit logic and add imports + errors state (per FORM-01, FORM-03, FORM-04).

Changes to make:
1. Add import: `import { toast } from 'sonner';`
2. Add import: `import { ContactSchema } from '@/lib/schemas';`
3. Add errors state: `const [errors, setErrors] = useState<Record<string, string>>({});`
4. Replace handleSubmit (lines 58-66) with real implementation
5. Add inline error display under each input that has a corresponding error

New handleSubmit:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Client-side validation (per FORM-03, FORM-04)
  const validation = ContactSchema.safeParse(formData);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    // POST to API route — never direct to n8n (per FORM-05)
    const response = await fetch('/api/webhook/n8n/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.data),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      if (response.status === 429) {
        toast.error('Demasiados intentos. Intenta de nuevo en unos minutos.');
      } else {
        toast.error(data.error ?? 'Error al enviar. Intenta de nuevo.');
      }
      return;
    }

    toast.success('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({ nombre: '', email: '', empresa: '', mensaje: '' });
  } catch {
    toast.error('Error de conexión. Intenta de nuevo.');
  } finally {
    setLoading(false);
  }
};
```

Add inline error display after each Input/Textarea. Example pattern for each field:
```tsx
{errors.nombre && (
  <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
)}
```
Apply this pattern for nombre, email, empresa, mensaje.

---

Update sitio-g2-nextjs/src/components/ScheduleModal.tsx.

Keep all existing JSX, date/time picker logic, localStorage cooldown logic (COOLDOWN_KEY / BAN_KEY — preserve per FORM-02), and toast messages for success/error.

Changes to make:
1. Add import: `import { ScheduleSchema } from '@/lib/schemas';`
2. Add errors state: `const [errors, setErrors] = useState<Record<string, string>>({});`
3. Replace the fetch block inside handleSubmit (lines 91-121) — change target URL from NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL to /api/webhook/n8n/schedule
4. Add Zod client validation before the localStorage checkRateLimit call
5. Add inline error display under nombre, email, telefono inputs

The new handleSubmit body (preserving existing structure):
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Client-side Zod validation (per FORM-03, FORM-04) — before localStorage rate limit check
  const validation = ScheduleSchema.safeParse({
    nombre: formData.nombre,
    email: formData.email,
    telefono: formData.telefono,
    fecha: date ? date.toISOString() : '',
    hora: selectedTime,
  });
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return;
  }
  setErrors({});

  // Preserve existing localStorage rate limit check
  if (!checkRateLimit()) return;
  if (!date) return toast.error('Selecciona un día.');

  setLoading(true);
  try {
    // POST to API route — never direct to n8n (per FORM-05)
    const response = await fetch('/api/webhook/n8n/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: validation.data.nombre,
        email: validation.data.email,
        telefono: validation.data.telefono,
        fecha: format(date, "PPP", { locale: es }),
        hora: selectedTime,
      }),
    });

    if (response.ok) {
      toast.success('¡Agendado exitosamente!');
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      onClose();
    } else {
      const data = await response.json().catch(() => ({}));
      if (response.status === 429) {
        toast.error('Demasiados intentos. Espera unos minutos.');
      } else {
        throw new Error(data.error ?? 'server error');
      }
    }
  } catch (error) {
    toast.error('Error al agendar. Intenta de nuevo.');
  } finally {
    setLoading(false);
  }
};
```

Important: Remove the old `const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` and its guard `if (!webhookUrl) throw ...` — they are replaced by the API route. The NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL variable is preserved for the chat widget (Phase 4, CHAT-03); just remove its use from ScheduleModal.

Add inline error display under nombre, email, telefono inputs using the same pattern as Contacto.tsx.
  </action>
  <verify>
cd sitio-g2-nextjs && npx tsc --noEmit --skipLibCheck 2>&1 | grep -E "error TS|Contacto|ScheduleModal" | head -20
  </verify>
  <done>
- Contacto.tsx has no setTimeout stub; handleSubmit POSTs to /api/webhook/n8n/contact
- Contacto.tsx shows inline field errors from Zod
- ScheduleModal.tsx POSTs to /api/webhook/n8n/schedule (not NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL)
- ScheduleModal.tsx preserves localStorage cooldown, date/time picker, and existing UI
- Both components show Spanish error messages matching CONTEXT.md spec
- No TypeScript compilation errors in either component
  </done>
</task>

<task type="auto">
  <name>Task 4: TypeScript check and build validation</name>
  <files></files>
  <action>
Run in sitio-g2-nextjs/:

Step 1 — Full TypeScript check:
```bash
cd sitio-g2-nextjs && npx tsc --noEmit --skipLibCheck
```

Fix any type errors before proceeding. Common issues to watch for:
- `headers()` not awaited (Next.js 16: it IS async, must await)
- Missing return types on POST handler
- Zod infer types not matching formData shape

Step 2 — Build:
```bash
cd sitio-g2-nextjs && npm run build
```

If build fails, read the error output carefully. Common causes:
- Import path wrong (@/lib/schemas vs relative)
- Missing directory for new route files
- TypeScript strict mode failures

Step 3 — Security audit (per CLAUDE.md security-first rule):
```bash
grep -r "NEXT_PUBLIC_N8N" sitio-g2-nextjs/src/components/ScheduleModal.tsx
```
This must return no matches. If it does, the old direct fetch was not fully removed.

```bash
grep -r "N8N_WEBHOOK_URL" sitio-g2-nextjs/src/components/
```
This must also return no matches. The webhook URL must only appear in src/app/api/.
  </action>
  <verify>
cd sitio-g2-nextjs && npm run build 2>&1 | tail -10
  </verify>
  <done>
- npm run build exits 0
- No TypeScript errors
- grep confirms N8N_WEBHOOK_URL absent from all component files
- grep confirms NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL absent from ScheduleModal.tsx
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5: Human verification of forms and security</name>
  <what-built>
Both forms are now wired to n8n via secure API routes. Zod validation blocks invalid input client-side with Spanish error messages. Rate limiting returns 429 after 3 submissions per 5 minutes. Build passes.
  </what-built>
  <how-to-verify>
Start dev server: `cd sitio-g2-nextjs && npm run dev`

**Test 1 — Contact form sends real data (FORM-01):**
1. Open http://localhost:3000, scroll to Contacto section
2. Fill: Nombre "Ana López", Email "ana@empresa.com", Mensaje "Hola quiero conocer sus servicios de IA"
3. Click "Enviar mensaje"
4. Expected: Toast "¡Mensaje enviado! Te contactaremos pronto." appears; n8n inbox receives payload with type: 'contact'
5. Open DevTools > Network tab: confirm POST to /api/webhook/n8n/contact (not to n8n directly)

**Test 2 — Inline validation errors (FORM-03, FORM-04):**
1. Submit form with email "esto-no-es-un-email"
2. Expected: Red error text "Email inválido" appears under the email field without a network request
3. Submit with nombre "A" (1 char)
4. Expected: Red error "Nombre debe tener al menos 2 caracteres" under nombre field

**Test 3 — Schedule form (FORM-02):**
1. Click "Agendar llamada" to open ScheduleModal
2. Fill: Nombre "Carlos", Email "carlos@test.com", Teléfono "+573001234567"
3. Select a day and time, click "Confirmar Cita"
4. Expected: Toast "¡Agendado exitosamente!"; modal closes; n8n inbox receives payload with type: 'scheduling'
5. Confirm DevTools shows POST to /api/webhook/n8n/schedule

**Test 4 — Rate limiting (FORM-06):**
1. Submit the contact form 4 times in rapid succession (within 5 seconds)
2. Expected: 4th submission shows toast "Demasiados intentos. Intenta de nuevo en unos minutos."
3. DevTools Network tab: 4th request returns HTTP 429

**Test 5 — Security check (FORM-05):**
1. DevTools > Sources tab: search for "N8N_WEBHOOK_URL"
2. Expected: No matches (the webhook URL must be server-only, invisible to browser)
  </how-to-verify>
  <resume-signal>
Type "approved" when all 5 tests pass, or describe which test failed and what you observed.
  </resume-signal>
  <files></files>
  <action>Human verification step — see how-to-verify instructions above.</action>
  <verify>User types "approved" to resume</verify>
  <done>All 5 manual tests pass; user approves</done>
</task>

</tasks>

<verification>
After checkpoint approval, confirm:

1. `npm run build` exits 0
2. `grep -r "N8N_WEBHOOK_URL" sitio-g2-nextjs/src/components/` returns no matches
3. `grep -r "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL" sitio-g2-nextjs/src/components/ScheduleModal.tsx` returns no matches
4. Both API route files exist: src/app/api/webhook/n8n/contact/route.ts and src/app/api/webhook/n8n/schedule/route.ts
5. Both export async function POST and use server-only env vars
</verification>

<success_criteria>
Phase 3 is complete when ALL of the following are true:

- Form data reaches n8n within 2 seconds of submit (contact and schedule)
- Invalid email shows "Email inválido" without sending a request
- 4th rapid submission returns 429 with Retry-After header
- DevTools Network tab shows POST to /api/webhook/n8n/contact (not to n8n URL)
- No N8N_WEBHOOK_URL visible in browser source or network calls
- npm run build exits 0
- Requirements satisfied: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06
</success_criteria>

<output>
After completion, create .planning/phases/03-forms-integration/03-01-SUMMARY.md with:
- What was built (files created/modified with brief description)
- Key decisions made (including phone regex choice)
- Verification results from checkpoint
- Any deviations from plan (and why)
</output>
