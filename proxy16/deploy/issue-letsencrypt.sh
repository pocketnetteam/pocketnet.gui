#!/usr/bin/env bash
# Issue/renew Let's Encrypt cert via nginx webroot and install into /opt/proxy/cert.
# Usage: DOMAIN=4.pocketnet.app EMAIL=ops@example.com ./issue-letsencrypt.sh
set -euo pipefail

DOMAIN="${DOMAIN:?DOMAIN is required (e.g. 4.pocketnet.app)}"
EMAIL="${EMAIL:-admin@${DOMAIN}}"
CERT_DIR="${PROXY_CERT_DIR:-/opt/proxy/cert}"
ACME_ROOT="${ACME_ROOT:-/var/www/acme}"
LIVE="/etc/letsencrypt/live/${DOMAIN}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$CERT_DIR" "$ACME_ROOT/.well-known/acme-challenge"

if [[ -x "${SCRIPT_DIR}/ensure-nginx.sh" ]]; then
  export DOMAIN ACME_ROOT
  "${SCRIPT_DIR}/ensure-nginx.sh"
else
  echo "ensure-nginx.sh missing — cannot use webroot challenge" >&2
  exit 127
fi

if ! command -v certbot >/dev/null 2>&1; then
  echo "Installing certbot..."
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq certbot
fi

certbot certonly \
  --webroot \
  -w "$ACME_ROOT" \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --preferred-challenges http \
  -d "$DOMAIN" \
  --keep-until-expiring \
  --expand

install -m 644 "${LIVE}/fullchain.pem" "${CERT_DIR}/cert.pem"
install -m 600 "${LIVE}/privkey.pem" "${CERT_DIR}/key.pem"

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
if command -v docker >/dev/null 2>&1 && docker ps --format '{{.Names}}' | grep -qx pocketnet-proxy; then
  docker restart pocketnet-proxy || true
fi
if command -v nginx >/dev/null 2>&1; then
  nginx -t && (systemctl reload nginx 2>/dev/null || nginx -s reload) || true
fi
EOF
chmod +x "${HOOK_DIR}/proxy16-cert.sh"

echo "Installed LE cert for ${DOMAIN} into ${CERT_DIR}"
openssl x509 -in "${CERT_DIR}/cert.pem" -noout -subject -issuer -dates -ext subjectAltName
