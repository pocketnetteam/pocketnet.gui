#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOR="$ROOT/tor/macos"
OUT="$TOR/universal"

echo "Merging Tor binaries..."

rm -rf "$OUT"
mkdir -p "$OUT/pluggable_transports"

merge() {
  local rel="$1"
  echo " → $rel"
  lipo -create \
    "$TOR/x86_64/$rel" \
    "$TOR/aarch64/$rel" \
    -output "$OUT/$rel"
}

merge tor
merge libevent-2.1.7.dylib

for pt in conjure-client lyrebird snowflake-client; do
  merge "pluggable_transports/$pt"
done

echo "Merging Tor successfully"
lipo -info "$OUT/tor"

