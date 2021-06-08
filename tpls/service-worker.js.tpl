importScripts('/js/vendor/workbox-v6.1.5/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/js/vendor/workbox-v6.1.5/',
  debug: false
});

const { strategies, core, routing, cacheableResponse } = workbox;

self.skipWaiting();
core.clientsClaim();

core.setCacheNameDetails({
  prefix: '__VAR__.domain',
  suffix: 'v__PACKAGE-VERSION__'
});



// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
routing.registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) => {
    return request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker' ||
    request.destination === 'image' ||
    request.mode === 'navigate'},
  // Use a Stale While Revalidate caching strategy
  new strategies.StaleWhileRevalidate({
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);



// The activate handler takes care of cleaning up old caches
self.addEventListener('activate', event => {
  const currentCacheName = core.cacheNames.runtime;
  // Find the old caches if there are any
  caches.keys().then(cacheNames => {
    return cacheNames.filter(cacheName => cacheName != currentCacheName);
  }).then(cachesToDelete => {
    return Promise.all(cachesToDelete.map(cacheToDelete => {
      return caches.delete(cacheToDelete);
    }));
  });
});