#!/usr/bin/env bash
# One-shot frontend mirror bring-up on a proxy host.
#
# Usage (on the VPS):
#   /opt/proxy/frontend-up.sh
#   /opt/proxy/frontend-up.sh 7.pocketnet.app
#
# Defaults:
#   DOMAIN       = $1, or $DOMAIN, or CN from /opt/proxy/cert/cert.pem
#   FRONTEND_URL = GitHub Release frontend-mirror asset (override with env)
#   Falls back to /opt/proxy/bastyon-frontend.tar.gz if download fails / offline
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "${SCRIPT_DIR}/frontend-pull-up.sh" "$@"
