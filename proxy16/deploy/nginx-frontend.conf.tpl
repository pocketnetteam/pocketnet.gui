# Bastyon static mirror. Placeholders: __DOMAIN__ __FRONTEND_ROOT__ __CERT_DIR__ __ACME_ROOT__
# Assets use ?v= cache-busting → long cache is safe. HTML must revalidate.
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name __DOMAIN__;

    location ^~ /.well-known/acme-challenge/ {
        root __ACME_ROOT__;
        default_type "text/plain";
        allow all;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    http2 on;
    server_name __DOMAIN__;

    ssl_certificate     __CERT_DIR__/cert.pem;
    ssl_certificate_key __CERT_DIR__/key.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;

    root __FRONTEND_ROOT__;
    index index.html;

    # Cheap stat()/open() caching for busy mirrors
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

    # HTML / SPA routes: always revalidate (meta no-cache is not enough)
    location = /index.html {
        add_header Cache-Control "no-cache, must-revalidate" always;
        add_header Pragma "no-cache" always;
    }

    location / {
        add_header Cache-Control "no-cache, must-revalidate" always;
        try_files $uri $uri/ /index.html;
    }

    # Versioned static (?v=…): long cache, no access log noise
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
}
