self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.registration.unregister()
    .then(() => self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass all requests to network completely unaffected to kill the ERR_FAILED loop.
});
