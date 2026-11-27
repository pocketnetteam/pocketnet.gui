# ACME bootstrap only (no TLS site yet). Placeholders: __DOMAIN__ __ACME_ROOT__
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
        return 503;
    }
}
