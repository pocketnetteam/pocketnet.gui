importScripts('./js/transports2/fetch/receiver.js');
importScripts('./js/broadcaster.js');

let isEnabled = false;
let nodeFetch = (...args) => fetch(...args);

const swBroadcaster = new Broadcaster('ServiceWorker');

swBroadcaster.once('extended-fetch', async () => {
  nodeFetch = FetchReceiver.init('ExtendedFetch');
  isEnabled = true;
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.startsWith('file://')) {
    return;
  }

  async function getCache(cache) {
    return await cache.match(request);
  }

  function putCache(cache, response) {
    if (response.type === 'opaque') {
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
      return await nodeFetch(request);
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

    console.log('Try to get fetch answer for', request.url);
    const fetchResponse = await fetch(request)
        .catch(() => {
          swBroadcaster.invoke('ReportAccessProblem', request.url);
        });

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
});

async function onInstall(event) {
  console.log('Service Worker was successfully installed');
  self.skipWaiting();
}

async function onActivate(event) {
  console.log('Service Worker was successfully activated');
}

self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('install', event => event.waitUntil(onInstall(event)));
