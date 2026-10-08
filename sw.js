// Offline cache: serve cached copy, refresh in background. Only same-origin GETs.
var V="london-1918400a86";
var FILES=["./", "./app-icon-180.png", "./app-icon-192.png", "./app-icon-32.png", "./app-icon-512.png", "./favicon.ico", "./img/mon_a.jpg", "./img/mon_b.jpg", "./img/mon_overview.jpg", "./img/mon_tube.jpg", "./img/tue_morning.jpg", "./img/tue_overview.jpg", "./img/tue_west.jpg", "./img/wed_overview.jpg", "./index.html", "./manifest.webmanifest"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
  var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit});
  return hit||net;})}))});
