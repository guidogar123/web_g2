FROM node:20-alpine

WORKDIR /app

COPY sitio-g2-nextjs/package*.json ./

RUN npm ci --only=production

COPY sitio-g2-nextjs/.next ./.next
COPY sitio-g2-nextjs/public ./public

ARG N8N_WEBHOOK_URL
ENV N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
