# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# NEXT_PUBLIC vars are embedded in the client bundle at build time
ENV NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat

COPY sitio-g2-nextjs/package*.json ./
RUN npm ci

COPY sitio-g2-nextjs/ .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
# Server-only webhook URL (set also in EasyPanel env vars for runtime)
ENV N8N_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
