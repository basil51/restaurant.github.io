const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/register.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
];

// Call Install Event
self.addEventListener('install', (e) => {
    console.log('SW installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('SW cashing files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('SW activated');
    // Remove unwanted cashes
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('SW Clearing old cashe');
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
});

// Call fetch Event
self.addEventListener('fetch', e => {
    console.log('Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});