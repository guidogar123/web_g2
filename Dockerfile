# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Build args for Next.js public env vars (embedded at build time)
ARG NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL
ENV NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=$NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL

COPY sitio-g2-nextjs/package*.json ./
RUN npm ci

COPY sitio-g2-nextjs/ .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
