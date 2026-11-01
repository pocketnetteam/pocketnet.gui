'use strict';

module.exports = {
    LOOPBACK_ADDRESS: '127.0.0.1',
    MAX_PORT_NUMBER: 65535,
    NUMBER_REGEX: /^\d+$/,
    ONIONOO_SITE_ADDRESS: 'https://onionoo.torproject.org/',
    TOR_BRIDGES_ADDRESS: 'https://bridges.torproject.org/',
    TOR_PROJECT_WEBSITE: 'www.torproject.org',
    GOOGLE_WEBSITE: 'www.google.com',
    CLOUDFLARE_WEBSITE: 'www.cloudflare.com',
    QUAD9_WEBSITE: 'quad9.net',
    URL_REGEX: String.raw`(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`,
    HOST_NAME_REGEX: String.raw`[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`,
    SNI_HOST_NAME_REGEX: /^(?=.{1,253}$)(?!(?:.*\.)?local$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9](?:[A-Za-z0-9-]{0,57}[A-Za-z0-9])?)$/i,
    IPv4_REGEX: String.raw`[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}`,
    IPv6_REGEX: String.raw`(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))`,
    CHROME_BROWSER_USER_AGENT: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36'
};
