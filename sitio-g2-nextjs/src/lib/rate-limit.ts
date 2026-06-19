type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const limiter = new Map<string, RateLimitEntry>();

// Cleanup stale entries cada 60s con jitter aleatorio (±15s)
// para evitar thundering herd si múltiples instancias limpian a la vez.
if (typeof setInterval !== 'undefined') {
  const CLEANUP_INTERVAL = 60_000;
  const JITTER = Math.floor(Math.random() * 30_000) - 15_000; // -15s a +15s
  const interval = Math.max(CLEANUP_INTERVAL + JITTER, 30_000);

  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of limiter) {
      if (now > entry.resetAt) {
        limiter.delete(ip);
      }
    }
  }, interval);
}

/**
 * Rate limiter en memoria.
 *
 * ⚠️ Limitación: En entornos serverless con múltiples instancias (Vercel, EasyPanel
 * con auto-scaling), cada instancia tiene su propio Map. Un atacante puede rotar
 * requests a través de diferentes instancias para evadir el límite.
 *
 * Para entornos multi-instancia, considera migrar a un almacén externo compartido
 * como Upstash Redis o Vercel KV.
 */
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
