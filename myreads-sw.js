let staticCacheName='my-reads-v1';
self.addEventListener('install', function(event) {
  urlToCache=[
    './index.html',
    './static/css/main.3856eff4.chunk.css',
    './static/js/2.163dad9c.chunk.js',
    './static/js/main.227dd091.chunk.js',
    'https://fonts.googleapis.com/css?family=ZCOOL+XiaoWei',
    'https://fonts.googleapis.com/css?family=Indie+Flower'
  ];
  event.waitUntil(caches.open(staticCacheName).then(cache=>{
    return cache.addAll(urlToCache)
  }))
});

self.addEventListener('activate',function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promise.all(cacheNames.map(cacheName=>{
            if(cacheName!==staticCacheName && cacheName.startsWith('my-reads')){
              caches.delete(cacheName)
            }
      }))
    })
  )
});

self.addEventListener('fetch',function(event) {
  let requestUrl = new URL(event.request.url);
  
  if(requestUrl.origin===location.origin){
    if(requestUrl.pathname==='/my-reads/'){
      console.log(requestUrl.origin);
      console.log(requestUrl.pathname);
      event.respondWith(
        caches.match('/index.html')
      )
      return
    }
  }
  event.respondWith(
    caches.match(event.request).then(response=>{
      return response || fetch(event.request)
    })
  )
})
