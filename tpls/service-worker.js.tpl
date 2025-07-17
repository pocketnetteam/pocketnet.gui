importScripts('./js/transports2/fetch/receiver.js');
importScripts('./js/broadcaster.js');

const swBroadcaster = new Broadcaster('ServiceWorker');

const swArgs = new URL(location).searchParams;

const isElectron = (swArgs.get('platform') === 'electron');
const isCordova = (swArgs.get('platform') === 'cordova');


let nodeFetch = (...args) => fetch(...args);

const networkTotalStats = {
  totalTorBytes: 0,
  torSuccessCount: 0,
  directSuccessCount: 0,
  torFailCount: 0,
  directFailCount: 0,
  torBytes: 0,
  directBytes: 0,
};

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

  async function torAnswerCordova() {

    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (isTorRequest) {

      const proxyURL = `http://localhost:8181/${encodeURIComponent(request.url)}`;

      const init = {
            method: request.method,
            headers: request.headers,
            redirect: request.redirect,
            credentials: "omit",
            mode: "cors",
      };

      if (request.method !== "GET" && request.method !== "HEAD") {
        try {
            init.body = await request.clone().arrayBuffer();
        } catch (err) {
        }
      }

      const fetchResponse = await fetch(proxyURL, init);

      const responseClone = fetchResponse.clone();

      const responseBuffer = await responseClone.arrayBuffer();

      networkTotalStats.torSuccessCount++;
      networkTotalStats.totalTorBytes += responseBuffer.byteLength;

      swBroadcaster.send('network-stats', {
        status: 'success',
        url: request.url,
        torUsed: true,
        bytesLength: responseBuffer.byteLength,
        totalStats: networkTotalStats,
      });

      return fetchResponse;

    }
    else{

    }
    
  }

  async function torAnswer() {
    if (!nodeFetch) {
      return;
    }

    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (isTorRequest) {
      return await nodeFetch(request)
        .then(async (response) => {
          const proxyTransportHeader = response.headers.get('#bastyon-proxy-transport');


          const hasUsedTor = (proxyTransportHeader === 'tor');

          const responseClone = response.clone();
          const responseBuffer = await responseClone.arrayBuffer();

          if (hasUsedTor) {
            networkTotalStats.torSuccessCount++;
            networkTotalStats.totalTorBytes += responseBuffer.byteLength;
          } else {
            networkTotalStats.directSuccessCount++;
            networkTotalStats.directBytes += responseBuffer.byteLength;
          }

          swBroadcaster.send('network-stats', {
            status: 'success',
            url: request.url,
            torUsed: hasUsedTor,
            bytesLength: responseBuffer.byteLength,
            totalStats: networkTotalStats,
          });

          return response;
        })
        .catch((err) => {
          networkTotalStats.torFailCount++;

          swBroadcaster.send('network-stats', {
            status: 'failed',
            reason: err,
            url: request.url,
            torUsed: true,
            totalStats: networkTotalStats,
          });

          throw err;
        });
    }
  }

  const handle = (cacheName) => new Promise(async (resolve, reject) => {
    let cache;

    if (cacheName) {
      cache = await caches.open(cacheName);

      const cacheResponse = await getCache(cache);

      if (cacheResponse) {
        resolve(cacheResponse);
        return;
      }
    }

    if (isElectron) {
      try {
        const torResponse = await torAnswer();

        if (torResponse) {
          resolve(torResponse.clone());

          if (cacheName) {
            putCache(cache, torResponse);
          }

          return;
        }
      } catch(err) {
        reject(err);
      }
    }

    if(isCordova && request.url.indexOf("https://localhost")  == -1){
      try {
        const torResponseCordova = await torAnswerCordova();

        if (torResponseCordova) {
          resolve(torResponseCordova.clone());

          if (cacheName) {
            putCache(cache, torResponseCordova);
          }

          return;
        }
      } catch(err) {
        reject(err);
      }
    }

    try {
      const fetchResponse = await fetch(request);

      if (fetchResponse) {
        const responseClone = fetchResponse.clone();
        const responseBuffer = await responseClone.arrayBuffer();

        networkTotalStats.directSuccessCount++;
        networkTotalStats.directBytes += responseBuffer.byteLength;

        swBroadcaster.send('network-stats', {
          status: 'success',
          url: request.url,
          bytesLength: responseBuffer.byteLength,
          totalStats: networkTotalStats,
        });

        resolve(fetchResponse.clone());

        if (cacheName) {
          putCache(cache, fetchResponse);
        }
      }
    } catch (err) {
      networkTotalStats.directFailCount++;

      swBroadcaster.send('network-stats', {
        status: 'failed',
        reason: err,
        url: request.url,
        totalStats: networkTotalStats,
      });

      reject(err);
    }
  });

  

  switch (request.destination) {
    case 'image':
      event.respondWith(handle('image-cache'));
      break;

    case 'style':
    case 'script':
    case 'worker':

      if(isCordova && request.url.indexOf("https://localhost")  > -1){
        event.respondWith(handle());
      }
      else{
        event.respondWith(handle('cache[__VAR__.domain-__VAR__.packageVersion]'));
      }

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
