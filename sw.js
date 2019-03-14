// Define the Caches
var staticCacheName = 'mws-static-v';
// Set Get Random number for Cache ID
 const randomNumberBetween0and19999 = Math.floor(Math.random() * 20000);
 var cache_id = randomNumberBetween0and19999;
 staticCacheName += cache_id;

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      '/',
      '/index.html',
      '/restaurant.html',
      '/css/styles.css',
      '/js/dbhelper.js',
      '/js/main.js',
      '/js/register.js',
      '/js/restaurant_info.js',
      '/img/*',
      'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
    ])
    .catch(error => {
        console.log(error);
    });
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        if (response !== undefined) return response;
        else {
          return fetch(event.request).then(function(response) {
                let responseClone = response.clone();
                caches.open(staticCacheName).then(function (cache) {
                  cache.put(event.request, responseClone);
                });
                return response;
          });
        }
      }) // end of promise for cache match
  ); // end of respond with
});