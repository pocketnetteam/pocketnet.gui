importScripts('/js/vendor/workbox-v6.1.5/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/js/vendor/workbox-v6.1.5/',
  debug: false
});

const { strategies, core, routing, cacheableResponse, expiration } = workbox;

self.skipWaiting();
core.clientsClaim();

core.setCacheNameDetails({
  prefix: '__VAR__.domain',
  suffix: 'v__PACKAGE-VERSION__'
});


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