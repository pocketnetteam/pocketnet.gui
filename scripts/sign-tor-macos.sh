#!/usr/bin/env bash
set -euo pipefail

APP_PATH="$1"
TOR_ROOT="$APP_PATH/Contents/Resources/tor"

if [[ "$(uname)" != "Darwin" ]]; then
    echo "Not macOS, skipping signing"
    exit 0
fi

echo "Detecting signing identity..."
IDENTITY=$(security find-identity -v -p codesigning | grep "Developer ID Application" | head -n 1 | sed -E 's/.*"(.+)"/\1/')

if [ -z "$IDENTITY" ]; then
    echo "No signing identity found"
    exit 1
fi

echo "Searching for Mach-O binaries in $TOR_ROOT..."
mapfile -t BINARIES < <(find "$TOR_ROOT" -type f | while read -r f; do
    if file "$f" | grep -q "Mach-O"; then
        echo "$f"
    fi
done)

if [ ${#BINARIES[@]} -eq 0 ]; then
    echo "No Mach-O binaries found in $TOR_ROOT"
    exit 1
fi

echo "Signing binaries..."
for BIN in "${BINARIES[@]}"; do
    echo "Signing $BIN"
    codesign --force --options runtime --timestamp \
        --sign "$IDENTITY" \
        "$BIN"
done

echo "All Tor and pluggable transport binaries signed successfully"

