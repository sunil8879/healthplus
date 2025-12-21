const CACHE_NAME = 'healthplus-v2'; // Changed version to force update
const STATIC_ASSETS = [
  './',
  './index.html',
  './mainextra.html',       // <--- YOU MUST ADD THIS LINE
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // Add your video/audio files here if you want them offline too
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
          return networkResponse;
      });
    })
  );
});