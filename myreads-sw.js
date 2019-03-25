let staticCacheName='my-reads-v1';
self.addEventListener('install', function(event) {
  urlToCache=[
    './index.html',
    './static/js/bundle.js',
    './static/js/0.chunk.js',
    './static/js/main.chunk.js',
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
    if(requestUrl.pathname==='https://wizdave97.github.io/my-reads/'){
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
