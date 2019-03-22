// Define the Caches
var staticCacheName = 'SW_v.';
// Set Get Random number for Cache ID
 var randomNumberBetween0and19999 = Math.floor(Math.random() * 20000);
 var cache_id = randomNumberBetween0and19999;
 staticCacheName += cache_id;

 self.addEventListener('install', () =>
  console.log('SW installed'));


// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('SW activated');
  // Remove unwanted cashes
  e.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cache => {
                  if (cache !== staticCacheName) {
                      console.log('SW Clearing old cashe');
                      return caches.delete(cache)
                  }
              })
          )
      })
  )
});

self.addEventListener('fetch',
function(event)
{
  event.respondWith
  (
    caches.match(event.request).then(
      function(response) {
        if (response !== undefined) return response;
        else {
          return fetch(event.request).then(
              function (response)
              {
                let responseClone = response.clone();
                caches.open(staticCacheName).then(
                  function(cache)
                  {
                    cache.put(event.request, responseClone);
                  }
                );
                return response;
              }
          );
        }
      }
    ) // end of promise for cache match
  ); // end of respond with
}
);