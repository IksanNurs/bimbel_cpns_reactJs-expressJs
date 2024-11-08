// // File: service-worker.js

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open('my-cache').then(function(cache) {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/favicon.ico',
//         '/manifest.json',
//         '/plugin/**',
//         '/js/*',
//         '/logo192.png',
//         '/logo512.png',
//         // tambahkan file lain yang ingin di-cache
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     })
//   );
// });
