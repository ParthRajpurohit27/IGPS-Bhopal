const CACHE_NAME = 'igps-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/igps.css',
  '/igps.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
            console.log("Caching failed", err);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
