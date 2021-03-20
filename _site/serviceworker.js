const preCachedResources = [
  '/',
  'en/', 
  '/assets/main-07a5a32c1a26652d2bb0e43b4c7ade37f20599a76cae3c1e871d3af53cff80b2.css',
  '/assets/main-f8c201d2721dcb6d1d4f6acb0ebd2b2c192757ed29271f519513e4417e347611.js'
];

const CACHE_NAME = 'elixirschool-v1';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME)
  .then(cache => cache.addAll(preCachedResources))
  .catch(error => console.log('Service worker installation has failed', error)));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
