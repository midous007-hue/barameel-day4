const CACHE="barameel-run-fixed-01-06-v20";
const SHELL=["./","./index.html","./screen02.html","./screen03.html","./screen04.html","./screen05.html","./screen06.html","./app.js","./styles.css","./sw.js","./assets/screen01-start.png","./assets/screen05-scanner.png","./assets/screen06-puzzle.png","./audio/reward-levelup.mp3"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("barameel-run-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));});
