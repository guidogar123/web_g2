import { headers } from 'next/headers';
import { ContactSchema } from '@/lib/schemas';
import { checkRateLimit } from '@/lib/rate-limit';
import { fetchWithTimeout } from '@/lib/utils';

const N8N_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  try {
    // Extract client IP for rate limiting (per FORM-06)
    // headers() is async in Next.js 16 — must await
    const headersList = await headers();
    const xForwardedFor = headersList.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Rate limit: 3 requests per IP per 5 minutes (per FORM-06)
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

    // Parse and validate request body (per FORM-03 server-side validation)
    const body = await request.json();
    const validation = ContactSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        { error: validation.error.issues[0]?.message ?? 'Datos inválidos' },
        { status: 400 },
      );
    }

    // Webhook URL is server-only — never exposed to client (CLAUDE.md security-first)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[form] N8N_WEBHOOK_URL not configured');
      return Response.json(
        { error: 'Error de configuración del servidor.' },
        { status: 500 },
      );
    }

    // Build payload (per FORM-01 D-locked payload shape)
    const payload = {
      type: 'contact' as const,
      nombre: validation.data.nombre,
      email: validation.data.email,
      empresa: validation.data.empresa ?? '',
      mensaje: validation.data.mensaje,
      timestamp: new Date().toISOString(),
    };

    // Proxy to n8n server-side (per FORM-05) con timeout de 10s
    const n8nResponse = await fetchWithTimeout(
      webhookUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
      N8N_TIMEOUT_MS,
    );

    if (!n8nResponse.ok) {
      console.error(`[form] n8n responded ${n8nResponse.status}`);
      return Response.json(
        { error: 'Error al enviar. Intenta de nuevo.' },
        { status: 500 },
      );
    }

    // Audit log — no PII stored (per FORM-06)
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
    // Error de timeout (AbortError) o de red
    const message =
      error instanceof DOMException && error.name === 'AbortError'
        ? 'El servidor tardó demasiado en responder. Intenta de nuevo.'
        : 'Error de servidor.';
    console.error('[form] error:', error);
    return Response.json({ error: message }, { status: 500 });
  }
}
