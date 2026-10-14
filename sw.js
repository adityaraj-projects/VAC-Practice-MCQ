/**
 * Flask VAC 227862 Examination Prep System
 * Progressive Web Application (PWA) Service Worker
 * Full Offline First & Stale-While-Revalidate Engine
 */

const CACHE_VERSION = 'flask-vac-v2.5';
const CACHE_NAME = `flask-vac-mcq-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './data/unit1.js',
  './data/unit2.js',
  './data/unit3.js',
  './data/unit4.js',
  './data/unit5.js',
  './data/unit6.js',
  './data/unit7.js',
  './data/notes.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png'
];

// 1. Installation: Pre-cache all essential application assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching all Flask VAC offline assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 2. Activation: Clean up any outdated cache versions and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing deprecated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker claimed all clients for offline readiness.');
      return self.clients.claim();
    })
  );
});

// 3. Fetch: Cache-First with Network Fallback & Background Revalidation
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Normalize navigation requests (e.g., / or /index.html)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match('./index.html').then((cached) => cached || caches.match('/index.html'));
        })
    );
    return;
  }

  // Static Asset Request handling: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Network failed (offline)
        return cachedResponse;
      });

      // Return cached response instantly if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
