const CACHE="barameel-run-alexandria-v24";
const SHELL=[
  "./","./index.html","./screen02.html","./screen03.html","./screen04.html","./screen05.html","./screen06.html",
  "./app.js","./styles.css","./sw.js","./assets/screen01-start.webp","./assets/screen01-start-mobile.webp",
  "./assets/screen05-scanner.webp","./assets/screen06-puzzle.webp","./assets/screen06-puzzle-mobile.webp",
  "./assets/collections/collection01/collection.json"
];
const isStaticAsset=(url)=>/\.(?:webp|png|jpg|jpeg|css|js|json|mp3)$/i.test(url.pathname);
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("barameel-run-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  if(isStaticAsset(u)){
    e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
      if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
      return r;
    }).catch(()=>caches.match(e.request))));
    return;
  }
  e.respondWith(fetch(e.request).then(r=>{
    const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
});
