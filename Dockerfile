FROM node:20-alpine AS builder

WORKDIR /app

COPY sitio-g2-nextjs/package*.json ./
RUN npm ci

COPY sitio-g2-nextjs/ ./

ARG N8N_WEBHOOK_URL
ARG NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL
ENV N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL
ENV NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=$NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ARG N8N_WEBHOOK_URL
ENV N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL

EXPOSE 3000

CMD ["node", "server.js"]
