#!/bin/bash
set -e

# deploy-webg2.sh
# Se ejecuta en el VPS via GitHub Actions después de sincronizar el código.
# Rebuild del contenedor Docker y actualización del servicio Swarm.

PROJECT_DIR="/etc/easypanel/projects/posgresql/web_g2/code"
SERVICE_NAME="posgresql_web_g2"

echo "🚀 Iniciando deploy de web_g2..."

cd "$PROJECT_DIR"

# 1. Build de la imagen Docker con la URL de n8n desde variable de entorno
echo "📦 Construyendo imagen Docker..."
docker compose build \
  --build-arg N8N_WEBHOOK_URL="$N8N_WEBHOOK_URL" \
  --no-cache

# 2. Actualizar el servicio Swarm forzando recreación
echo "🔄 Actualizando servicio Docker Swarm..."
docker service update --force "$SERVICE_NAME"

echo "✅ Deploy completado exitosamente."
