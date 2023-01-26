importScripts('./js/transports2/fetch/receiver.js');
importScripts('./js/broadcaster.js');

const swBroadcaster = new Broadcaster('ServiceWorker');

const swArgs = new URL(location).searchParams;

const isElectron = (swArgs.get('platform') === 'electron');

let nodeFetch = (...args) => fetch(...args);

if (isElectron) {
  nodeFetch = FetchReceiver.init('ExtendedFetch');
}

function onFetch(event) {
  const { request } = event;

  const isHttps = request.url.startsWith('https://');
  const isHttp = request.url.startsWith('http://');

  const isProtocolSupported = (isHttps || isHttp);

  if (!isProtocolSupported) {
    return;
  }

  async function getCache(cache) {
    return await cache.match(request);
  }

  async function putCache(cache, response) {
    const responseClone = await response.clone();
    const responseBuffer = await responseClone.arrayBuffer();

    const isOpaque = (response.type === 'opaque');
    const isBodyEmpty = (responseBuffer.length === 0);

    if (isOpaque || isBodyEmpty) {
      return;
    }

    cache.put(request, response);
  }

  async function torAnswer() {
    if (!nodeFetch) {
      return;
    }

    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (isTorRequest) {
      return await nodeFetch(request)
        .then((response) => {
          const hasTorHeader = response.headers.get('#bastyon-tor-used');

          if (hasTorHeader) {
            swBroadcaster.send('tor-stats', 'success');
          }

          return response;
        })
        .catch((err) => {
          swBroadcaster.send('tor-stats', 'failed');

          return err;
        });
    }
  }

  const handle = (cacheName) => new Promise(async (resolve, reject) => {
    let cache;

    if (cacheName) {
      cache = await caches.open(cacheName);

      console.log('Try to get cache for', request.url);
      const cacheResponse = await getCache(cache)
      if (cacheResponse) {
        console.log('Using cache for', request.url);
        resolve(cacheResponse);
        return;
      }
    }

    if (isElectron) {
      console.log('Try to get TOR answer for', request.url);
      const torResponse = await torAnswer();
      if (torResponse) {
        console.log('Using TOR for', request.url);
        resolve(torResponse.clone());

        if (cacheName) {
          putCache(cache, torResponse);
        }

        return;
      }
    }

    console.log('Try to get fetch answer for', request.url);
    const fetchResponse = await fetch(request);

    if (fetchResponse) {
      console.log('Using NORMAL fetch for', request.url);
      resolve(fetchResponse.clone());

      if (cacheName) {
        putCache(cache, fetchResponse);
      }

      return;
    }

    reject(Error('SERVICE_WORKER_NO_DATA'));
  });

  console.log('GOING WITH', request.url, request);

  switch (request.destination) {
    case 'image':
      event.respondWith(handle('image-cache'));
      break;

    case 'style':
    case 'script':
    case 'worker':
      event.respondWith(handle('cache[__VAR__.domain-__VAR__.packageVersion]'));
      break;

    default: event.respondWith(handle()); break;
  }
}

async function onInstall(event) {
  console.log('Service Worker was successfully installed');
  self.skipWaiting();
}

async function onActivate(event) {
  console.log('Service Worker was successfully activated');
  self.clients.claim();
}

self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('install', event => onInstall(event));
self.addEventListener('fetch', event => onFetch(event));
