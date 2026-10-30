#!/usr/bin/env bash
# Install and start Docker Engine if missing (Ubuntu/Debian apt).
set -euo pipefail

if command -v docker >/dev/null 2>&1; then
  if command -v systemctl >/dev/null 2>&1; then
    systemctl is-active --quiet docker || systemctl start docker || true
  fi
  docker version >/dev/null
  exit 0
fi

echo "Installing docker.io..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq docker.io
systemctl enable --now docker
docker version >/dev/null
echo "Docker installed"
