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
