#!/usr/bin/env bash
# Run on the VPS. Expects env from caller (Actions SSH):
#   PROXY_IMAGE, BOOTSTRAP_ADMIN, BOOTSTRAP_DOMAIN
set -euo pipefail

IMAGE="${PROXY_IMAGE:?PROXY_IMAGE is required}"
ADMIN="${BOOTSTRAP_ADMIN:?BOOTSTRAP_ADMIN is required}"
DOMAIN="${BOOTSTRAP_DOMAIN:?BOOTSTRAP_DOMAIN is required}"
NAME="${PROXY_CONTAINER_NAME:-pocketnet-proxy}"
DATA_DIR="${PROXY_DATA_DIR:-/opt/proxy/data}"
CERT_DIR="${PROXY_CERT_DIR:-/opt/proxy/cert}"

mkdir -p "$DATA_DIR" "$CERT_DIR"

if [[ ! -f "${CERT_DIR}/cert.pem" || ! -f "${CERT_DIR}/key.pem" ]]; then
  echo "WARNING: ${CERT_DIR}/cert.pem or key.pem missing — bootstrap will skip SSL until certs exist"
fi

docker pull "$IMAGE"

if docker ps -a --format '{{.Names}}' | grep -qx "$NAME"; then
  docker stop "$NAME" || true
  docker rm "$NAME" || true
fi

docker run --rm \
  --entrypoint node \
  -v "${DATA_DIR}:/usr/src/app/data" \
  -v "${CERT_DIR}:/usr/src/app/cert" \
  -e BOOTSTRAP_ADMIN="$ADMIN" \
  -e BOOTSTRAP_DOMAIN="$DOMAIN" \
  "$IMAGE" \
  deploy/bootstrap-settings.js --cli

docker run -d \
  --name "$NAME" \
  --restart unless-stopped \
  -p 8899:8899 \
  -p 8099:8099 \
  -v "${DATA_DIR}:/usr/src/app/data" \
  -v "${CERT_DIR}:/usr/src/app/cert" \
  -e NODE_ENV=production \
  "$IMAGE"

echo "Proxy container ${NAME} is up with ${IMAGE} domain=${DOMAIN}"
