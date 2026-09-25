const CACHE='barameel-run-new-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./screen02.html','./screen03.html','./screen04.html','./screen05.html','./screen06.html','./app.js','./styles.css','./audio/reward-levelup.mp3'])))});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
