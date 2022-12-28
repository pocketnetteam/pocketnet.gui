// importScripts('./js/vendor/workbox-v6.1.5/workbox-sw.js');
importScripts('./js/transports2/fetch/receiver.js');
importScripts('./js/broadcaster.js');

let isEnabled = false;
let nodeFetch = (...args) => fetch(...args);

const swBroadcaster = new Broadcaster('ServiceWorker');

swBroadcaster.once('extended-fetch', async () => {
  nodeFetch = FetchReceiver.init('ExtendedFetch');
  isEnabled = true;
});

/*workbox.setConfig({
  modulePathPrefix: './js/vendor/workbox-v6.1.5/',
  debug: false
});*/

// const { strategies, core, routing, cacheableResponse, expiration } = workbox;

/*core.clientsClaim();*/

/*core.setCacheNameDetails({
  prefix: '__VAR__.domain',
  suffix: 'v__PACKAGE-VERSION__'
});*/

/*class TorWithFirstCacheStrategy extends strategies.CacheFirst {
  initFetchAndCachePut = (uInstance) => {
    const otherFetch = async function (t) {
      const {event: s} = uInstance;
      let r = l(t);
      if ("navigate" === r.mode && s instanceof FetchEvent && s.preloadResponse) {
        const t = await s.preloadResponse;
        if (t) return t
      }
      const a = uInstance.hasCallback("fetchDidFail") ? r.clone() : null;
      try {
        for (const t of uInstance.iterateCallbacks("requestWillFetch")) r = await t({request: r.clone(), event: s})
      } catch (t) {
        throw new e.WorkboxError("plugin-error-request-will-fetch", {thrownError: t})
      }
      const i = r.clone();
      try {
        let t;
        t = await nodeFetch(r, "navigate" === r.mode ? void 0 : uInstance.ht.fetchOptions);
        for (const e of uInstance.iterateCallbacks("fetchDidSucceed")) t = await e({
          event: s,
          request: i,
          response: t
        });
        return t
      } catch (t) {
        throw a && await uInstance.runCallbacks("fetchDidFail", {
          error: t,
          event: s,
          originalRequest: a.clone(),
          request: i.clone()
        }), t
      }
    };

    return async function(t) {
      let e;

      if (t.useTor) {
        e = await otherFetch(t);
      } else {
        e = await uInstance.fetch(t);
      }

      const s = e.clone();

      return uInstance.waitUntil(uInstance.cachePut(t, s)), e;
    }
  };

  async _handle(request, handler) {
    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    handler.fetchAndCachePut = this.initFetchAndCachePut(handler);

    if (isTorRequest) {
      handler.useTor = true;

      const preparedRequest = new Request(request);
      preparedRequest.headers.delete('X-Use-Tor');

      return await nodeFetch(preparedRequest);
    }

    return super._handle(request, handler);
  }
}*/

/*const proxyPlugin = {
  handlerWillStart: async ({ request }) => {
    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (isTorRequest) {
      const preparedRequest = new Request(request);
      preparedRequest.headers.set('X-Use-Tor', 'true');

      return preparedRequest;
    }

    return request;
  },

  fetchDidSucceed: async ({ request }) => {
    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (!isTorRequest) {
      swBroadcaster.invoke('ReportAccessSuccess', request.url);
    }

    return request;
  },

  fetchDidFail: async ({ request }) => {
    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (!isTorRequest) {
      swBroadcaster.invoke('ReportAccessProblem', request.url);
    }

    return request;
  },

  handlerDidError: async ({ request }) => {
    const isTorRequest = await swBroadcaster.invoke('AltTransportActive', request.url);

    if (!isTorRequest) {
      swBroadcaster.invoke('ReportAccessProblem', request.url);
    }

    return request;
  },
};*/

/*routing.registerRoute(
    ({ request }) => request.destination === '',
    new TorWithFirstCacheStrategy({ plugins: [ proxyPlugin ] })
);*/

// Cache CSS, JS, and Web Worker requests with a Network First strategy
/*routing.registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) => {

    return (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker'
      ) &&
      request.url.startsWith('file://')
  },
    new TorWithFirstCacheStrategy({
      cacheName: 'cache' + '__VAR__.domain' + 'v__PACKAGE-VERSION__',
      plugins: [
        new cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
);*/

/*routing.registerRoute(
  ({request}) => request.destination === 'image',
  new TorWithFirstCacheStrategy({
    cacheName: 'image-cache',
    plugins: [
      proxyPlugin,
      new expiration.ExpirationPlugin({
        maxAgeSeconds: 124 * 60 * 60,
        maxEntries: 500,
      }),
    ],
  })
);*/

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.url.startsWith('file://')) {
    return;
  }

  async function cacheAnswer(cache) {
    return await cache.match(request);
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
      const cacheResponse = await cacheAnswer(cache)
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
        cache.put(request, torResponse);
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
        cache.put(request, fetchResponse);
      }

      return;
    }

    reject(Error('SERVICE_WORKER_NO_DATA'));
  });

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

// The activate handler takes care of cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(onActivate());
});

self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
