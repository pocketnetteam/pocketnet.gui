#!/usr/bin/env bash
# Download Bastyon frontend tarball and serve it via nginx on :443.
#
# Easy entry: /opt/proxy/frontend-up.sh [domain]
#
# Env / args:
#   $1 / DOMAIN        server_name (default: CN from cert.pem)
#   FRONTEND_URL       default: GitHub Release frontend-mirror asset
#   FRONTEND_ARCHIVE   local tar.gz (skips download)
#   FRONTEND_DIR       default /opt/proxy/frontend
#   CERT_DIR           default /opt/proxy/cert
#   ACME_ROOT          default /var/www/acme
#   GH_TOKEN           optional Bearer for private GitHub release assets
set -euo pipefail

DEFAULT_FRONTEND_URL="https://github.com/pocketnetteam/pocketnet.gui/releases/download/frontend-mirror/bastyon-frontend.tar.gz"
LOCAL_CACHE="/opt/proxy/bastyon-frontend.tar.gz"

FRONTEND_DIR="${FRONTEND_DIR:-/opt/proxy/frontend}"
CERT_DIR="${PROXY_CERT_DIR:-${CERT_DIR:-/opt/proxy/cert}}"
ACME_ROOT="${ACME_ROOT:-/var/www/acme}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_AVAILABLE="/etc/nginx/sites-available/bastyon-frontend"
SITE_ENABLED="/etc/nginx/sites-enabled/bastyon-frontend"
TMP_ROOT="$(mktemp -d /tmp/bastyon-frontend.XXXXXX)"
ARCHIVE="${TMP_ROOT}/frontend.tar.gz"
STAGE="${TMP_ROOT}/stage"

if [[ -n "${1:-}" ]]; then
  DOMAIN="$1"
fi

if [[ -z "${DOMAIN:-}" && -f "${CERT_DIR}/cert.pem" ]]; then
  DOMAIN="$(openssl x509 -in "${CERT_DIR}/cert.pem" -noout -subject 2>/dev/null \
    | sed -n 's/.*CN *= *\([^,/]*\).*/\1/p' || true)"
fi

if [[ -z "${DOMAIN:-}" ]]; then
  echo "DOMAIN required (pass as arg, set DOMAIN=, or install cert with CN)" >&2
  echo "  example: /opt/proxy/frontend-up.sh 7.pocketnet.app" >&2
  exit 1
fi

FRONTEND_URL="${FRONTEND_URL:-$DEFAULT_FRONTEND_URL}"

cleanup() {
  rm -rf "$TMP_ROOT"
}
trap cleanup EXIT

export DOMAIN ACME_ROOT
if [[ -x "${SCRIPT_DIR}/ensure-nginx.sh" ]]; then
  "${SCRIPT_DIR}/ensure-nginx.sh"
else
  echo "ensure-nginx.sh missing" >&2
  exit 127
fi

fetch_url() {
  local url="$1"
  echo "Downloading frontend from ${url}"
  local args=(-fsSL --retry 3 --retry-delay 2 -o "$ARCHIVE")
  if [[ -n "${GH_TOKEN:-}" ]]; then
    args+=(-H "Authorization: Bearer ${GH_TOKEN}" -H "Accept: application/octet-stream")
  fi
  curl "${args[@]}" "$url"
}

if [[ -n "${FRONTEND_ARCHIVE:-}" ]]; then
  if [[ ! -f "$FRONTEND_ARCHIVE" ]]; then
    echo "FRONTEND_ARCHIVE not found: $FRONTEND_ARCHIVE" >&2
    exit 1
  fi
  echo "Using local archive ${FRONTEND_ARCHIVE}"
  cp -f "$FRONTEND_ARCHIVE" "$ARCHIVE"
elif fetch_url "$FRONTEND_URL"; then
  :
elif [[ -f "$LOCAL_CACHE" ]]; then
  echo "WARNING: download failed — using cached ${LOCAL_CACHE}"
  cp -f "$LOCAL_CACHE" "$ARCHIVE"
else
  echo "Download failed and no cache at ${LOCAL_CACHE}" >&2
  echo "  Publish Release tag frontend-mirror, or copy tar.gz to ${LOCAL_CACHE}" >&2
  exit 1
fi

# Keep a local copy for next offline / failed-download run
cp -f "$ARCHIVE" "$LOCAL_CACHE"
chmod 644 "$LOCAL_CACHE" || true

mkdir -p "$STAGE"
tar xzf "$ARCHIVE" -C "$STAGE"

if [[ ! -f "${STAGE}/index.html" ]]; then
  inner="$(find "$STAGE" -mindepth 1 -maxdepth 1 -type d | head -n 1 || true)"
  if [[ -n "$inner" && -f "${inner}/index.html" ]]; then
    STAGE="$inner"
  else
    echo "Archive missing index.html" >&2
    exit 1
  fi
fi

mkdir -p "$(dirname "$FRONTEND_DIR")"
NEXT="${FRONTEND_DIR}.new.$$"
rm -rf "$NEXT"
mkdir -p "$NEXT"
cp -a "${STAGE}/." "$NEXT/"
rm -rf "${FRONTEND_DIR}.old"
if [[ -d "$FRONTEND_DIR" ]]; then
  mv "$FRONTEND_DIR" "${FRONTEND_DIR}.old"
fi
mv "$NEXT" "$FRONTEND_DIR"
rm -rf "${FRONTEND_DIR}.old"

HAS_CERT=0
if [[ -f "${CERT_DIR}/cert.pem" && -f "${CERT_DIR}/key.pem" ]]; then
  HAS_CERT=1
fi

if [[ "$HAS_CERT" -eq 1 ]]; then
  echo "Writing TLS nginx site for ${DOMAIN}"
  sed \
    -e "s|__DOMAIN__|${DOMAIN}|g" \
    -e "s|__FRONTEND_ROOT__|${FRONTEND_DIR}|g" \
    -e "s|__CERT_DIR__|${CERT_DIR}|g" \
    -e "s|__ACME_ROOT__|${ACME_ROOT}|g" \
    "${SCRIPT_DIR}/nginx-frontend.conf.tpl" > "$SITE_AVAILABLE"
else
  echo "WARNING: ${CERT_DIR}/cert.pem or key.pem missing — ACME-only site until certs exist"
  sed \
    -e "s|__DOMAIN__|${DOMAIN}|g" \
    -e "s|__ACME_ROOT__|${ACME_ROOT}|g" \
    "${SCRIPT_DIR}/nginx-acme-only.conf.tpl" > "$SITE_AVAILABLE"
fi

if [[ -f /etc/nginx/sites-enabled/default ]]; then
  rm -f /etc/nginx/sites-enabled/default
fi
ln -sfn "$SITE_AVAILABLE" "$SITE_ENABLED"

nginx -t
if ! nginx -s reload 2>/dev/null; then
  if command -v systemctl >/dev/null 2>&1; then
    systemctl restart nginx
  else
    nginx
  fi
fi

echo "Frontend up at ${FRONTEND_DIR} domain=${DOMAIN} tls=${HAS_CERT}"
echo "Re-run anytime: /opt/proxy/frontend-up.sh"
