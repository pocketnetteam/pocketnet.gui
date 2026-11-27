#!/usr/bin/env bash
# Install nginx and ensure ACME webroot + optional bootstrap site on :80.
# Env: DOMAIN (required for writing site), ACME_ROOT (default /var/www/acme)
set -euo pipefail

DOMAIN="${DOMAIN:-}"
ACME_ROOT="${ACME_ROOT:-/var/www/acme}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_AVAILABLE="/etc/nginx/sites-available/bastyon-frontend"
SITE_ENABLED="/etc/nginx/sites-enabled/bastyon-frontend"

export DEBIAN_FRONTEND=noninteractive

if ! command -v nginx >/dev/null 2>&1; then
  echo "Installing nginx..."
  apt-get update -qq
  apt-get install -y -qq nginx
fi

mkdir -p "$ACME_ROOT/.well-known/acme-challenge"
# webroot for certbot is parent of .well-known
# certbot --webroot -w "$ACME_ROOT" looks for $ACME_ROOT/.well-known/acme-challenge/

if [[ -n "$DOMAIN" && ! -f "$SITE_AVAILABLE" ]]; then
  echo "Writing ACME-only nginx site for ${DOMAIN}"
  sed \
    -e "s|__DOMAIN__|${DOMAIN}|g" \
    -e "s|__ACME_ROOT__|${ACME_ROOT}|g" \
    "${SCRIPT_DIR}/nginx-acme-only.conf.tpl" > "$SITE_AVAILABLE"
fi

if [[ -f /etc/nginx/sites-enabled/default ]]; then
  rm -f /etc/nginx/sites-enabled/default
fi

if [[ -f "$SITE_AVAILABLE" ]]; then
  ln -sfn "$SITE_AVAILABLE" "$SITE_ENABLED"
fi

nginx -t
if command -v systemctl >/dev/null 2>&1; then
  systemctl enable nginx >/dev/null 2>&1 || true
fi
if ! nginx -s reload 2>/dev/null; then
  if command -v systemctl >/dev/null 2>&1; then
    systemctl restart nginx
  else
    nginx
  fi
fi

echo "nginx ready (acme_root=${ACME_ROOT})"
