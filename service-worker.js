const CACHE_NAME = 'calculadora-cache-v1';
const urlsToCache = [
  '/',                // index.html
  '/index.html',      // página principal
  '/style.css',       // tu CSS (si existe)
  '/script.js',       // tu JS (si existe)
  '/icon-192.png',    // icono 192
  '/icon-512.png'     // icono 512
];

// Instalación del Service Worker y cache de archivos
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación del Service Worker (limpia caches viejos si cambias versión)
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Intercepta peticiones y sirve desde cache si existe
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
