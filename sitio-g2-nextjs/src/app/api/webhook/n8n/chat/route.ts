import { fetchWithTimeout } from '@/lib/utils';

const N8N_TIMEOUT_MS = 30_000;

/**
 * Proxy SSE para el chat widget (@n8n/chat).
 *
 * El navegador se conecta a esta API route en lugar de llamar directamente
 * al webhook de n8n. La URL real del webhook se mantiene server-only (N8N_WEBHOOK_URL).
 *
 * GET  → reenvía query params a n8n y streamea la respuesta SSE
 * POST → reenvía el body a n8n y devuelve la respuesta JSON
 */
export async function GET(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { error: 'Chat no configurado — N8N_WEBHOOK_URL no definida' },
      { status: 503 },
    );
  }

  try {
    // Reenviar query params (sessionId, action, etc.)
    const url = new URL(request.url);
    const params = url.searchParams;
    const targetUrl = `${webhookUrl}?${params.toString()}`;

    const n8nResponse = await fetchWithTimeout(
      targetUrl,
      { headers: { Accept: 'text/event-stream' } },
      N8N_TIMEOUT_MS,
    );

    // Reenviar la respuesta SSE al cliente
    return new Response(n8nResponse.body, {
      status: n8nResponse.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[chat-proxy] GET error:', error);
    return Response.json(
      { error: 'Error de conexión con el chat.' },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json(
      { error: 'Chat no configurado — N8N_WEBHOOK_URL no definida' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();

    const n8nResponse = await fetchWithTimeout(
      webhookUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      N8N_TIMEOUT_MS,
    );

    const responseData = await n8nResponse.json().catch(() => ({}));

    return Response.json(responseData, {
      status: n8nResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[chat-proxy] POST error:', error);
    return Response.json(
      { error: 'Error al enviar mensaje.' },
      { status: 502 },
    );
  }
}
