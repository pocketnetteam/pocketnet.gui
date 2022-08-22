importScripts('./js/vendor/workbox-v6.1.5/workbox-sw.js');
importScripts('./js/vendor/firebase-app.js');
importScripts('./js/vendor/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: "1020521924918"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload,
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/itwonders-web-logo.png",
  };

  return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
  );
});

self.addEventListener('notificationclick', function(event) {
  const data = event.notification.data || '';
  event.notification.close();
  console.log(data)

  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow("http://127.0.0.1:8080/userpage?id=notifications&report=notifications");
  }));
});

workbox.setConfig({
  modulePathPrefix: './js/vendor/workbox-v6.1.5/',
  debug: false
});

const { strategies, core, routing, cacheableResponse, expiration } = workbox;

self.skipWaiting();
core.clientsClaim();

core.setCacheNameDetails({
  prefix: '__VAR__.domain',
  suffix: 'v__PACKAGE-VERSION__'
});

const proxyPlugin = {
  requestWillFetch: async ({request, event}) => {
    const client = await self.clients.get(event.clientId);
    try {
      const result = await new Promise((resolve, reject) => {
        const channel = new BroadcastChannel(request.url);
        client.postMessage(request.url)
        channel.onmessage = (event) => {
          resolve(event?.data)
        }
      })

      if (request.url === result) {
        return request;
      }

      return new Request(result, {headers: request.headers});
    }catch (e){
      return request
    }
  },
};

// Cache CSS, JS, and Web Worker requests with a Network First strategy
routing.registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) => {

    return request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'worker'},

    new strategies.CacheFirst({
      cacheName: 'cache' + '__VAR__.domain' + 'v__PACKAGE-VERSION__',
      plugins: [
        new cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
);

routing.registerRoute(
  ({request}) => request.destination === 'image',
  new strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      proxyPlugin,
      new expiration.ExpirationPlugin({
        maxAgeSeconds: 124 * 60 * 60,
        maxEntries: 500,
      }),
    ],
  })
);


// The activate handler takes care of cleaning up old caches
self.addEventListener('activate', event => {
  const currentCacheName = core.cacheNames.runtime;
  // Find the old caches if there are any
  caches.keys().then(cacheNames => {

    console.log('cacheNames', cacheNames, currentCacheName)

    return cacheNames.filter(cacheName => cacheName != currentCacheName && cacheName != 'image-cache');
  }).then(cachesToDelete => {
    return Promise.all(cachesToDelete.map(cacheToDelete => {
      console.log('delete cache', cacheToDelete)
      return caches.delete(cacheToDelete);
    }));
  });
});



self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked: ', event.notification);
  event.notification.close();
  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    // Focus the first client
    if (clientList && clientList.length > 0 && clientList[0].focus)
      clientList[0].focus();
    // Make a redirection
    // if (clients.openWindow)
    //   return clients.openWindow('/');
  }));
});
