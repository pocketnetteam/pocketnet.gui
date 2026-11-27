# Drop-in cache rules for any host that serves Bastyon dist/frontend
# (proxy mirrors, PeerTube client override, plain nginx vhost).
# Include inside the HTTPS server{} that has `root` pointing at the frontend.
#
#   include /opt/proxy/nginx-static-cache.inc;
#
# Requires assets to use ?v= (production minimize). HTML stays no-cache.

open_file_cache max=5000 inactive=60s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;

gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_vary on;
gzip_proxied any;
gzip_types
    text/plain
    text/css
    text/javascript
    application/javascript
    application/json
    application/manifest+json
    application/xml
    image/svg+xml
    font/woff
    font/woff2
    application/font-woff
    application/font-woff2;

location = /index.html {
    add_header Cache-Control "no-cache, must-revalidate" always;
    add_header Pragma "no-cache" always;
}

location / {
    add_header Cache-Control "no-cache, must-revalidate" always;
    try_files $uri $uri/ /index.html;
}

location ~* \.(?:js|mjs|css|map)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
    try_files $uri =404;
}

location ~* \.(?:png|jpe?g|gif|ico|svg|webp|avif|woff2?|ttf|eot|mp3|wav|ogg|mp4|webm)$ {
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
    try_files $uri =404;
}

location = /manifest.json {
    add_header Cache-Control "no-cache, must-revalidate" always;
    try_files $uri =404;
}

location = /service-worker.js {
    add_header Cache-Control "no-cache, must-revalidate" always;
    try_files $uri =404;
}

location = /js/pwa-service-worker.js {
    add_header Cache-Control "no-cache, must-revalidate" always;
    try_files $uri =404;
}
