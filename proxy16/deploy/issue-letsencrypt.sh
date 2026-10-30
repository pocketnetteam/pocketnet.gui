#!/usr/bin/env bash
# Issue/renew Let's Encrypt cert and install into /opt/proxy/cert for proxy16.
# Usage: DOMAIN=4.pocketnet.app EMAIL=ops@example.com ./issue-letsencrypt.sh
set -euo pipefail

DOMAIN="${DOMAIN:?DOMAIN is required (e.g. 4.pocketnet.app)}"
EMAIL="${EMAIL:-admin@${DOMAIN}}"
CERT_DIR="${PROXY_CERT_DIR:-/opt/proxy/cert}"
LIVE="/etc/letsencrypt/live/${DOMAIN}"

mkdir -p "$CERT_DIR"

# Standalone needs free :80 (stop anything bound to 80 briefly)
if command -v docker >/dev/null 2>&1; then
  if docker ps --format '{{.Names}}' | grep -qx pocketnet-proxy; then
    echo "Stopping pocketnet-proxy for certbot standalone..."
    docker stop pocketnet-proxy || true
  fi
fi

certbot certonly \
  --standalone \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --preferred-challenges http \
  -d "$DOMAIN" \
  --keep-until-expiring \
  --expand

install -m 644 "${LIVE}/fullchain.pem" "${CERT_DIR}/cert.pem"
install -m 600 "${LIVE}/privkey.pem" "${CERT_DIR}/key.pem"

# Deploy hook for renewals
HOOK_DIR=/etc/letsencrypt/renewal-hooks/deploy
mkdir -p "$HOOK_DIR"
cat > "${HOOK_DIR}/proxy16-cert.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
DOMAIN="${DOMAIN}"
CERT_DIR="${CERT_DIR}"
LIVE="/etc/letsencrypt/live/\${DOMAIN}"
install -m 644 "\${LIVE}/fullchain.pem" "\${CERT_DIR}/cert.pem"
install -m 600 "\${LIVE}/privkey.pem" "\${CERT_DIR}/key.pem"
if docker ps --format '{{.Names}}' | grep -qx pocketnet-proxy; then
  docker restart pocketnet-proxy || true
fi
EOF
chmod +x "${HOOK_DIR}/proxy16-cert.sh"

echo "Installed LE cert for ${DOMAIN} into ${CERT_DIR}"
openssl x509 -in "${CERT_DIR}/cert.pem" -noout -subject -issuer -dates -ext subjectAltName
