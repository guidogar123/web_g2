# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY sitio-g2-nextjs/package*.json ./
RUN npm ci

COPY sitio-g2-nextjs/ .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
# N8N_WEBHOOK_URL debe configurarse como variable de entorno en EasyPanel.
# Usar build args: --build-arg N8N_WEBHOOK_URL=...
# O configurarlo como environment variable en el servicio de EasyPanel.
# Ya no se necesita NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL - el chat usa proxy interno.
ARG N8N_WEBHOOK_URL
ENV N8N_WEBHOOK_URL=${N8N_WEBHOOK_URL}

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80
ENV PORT=80
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
