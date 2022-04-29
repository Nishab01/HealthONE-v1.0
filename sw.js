const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic';
const assets = [
    './',
    './index.php',
    './app.js',
    './sw.js',
    './pages/fallback.php',
    './img/nav-home.webp',
    './img/nav-about.webp',
    './img/nav-feedback.webp'
];

//limiting cache size
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

//installing SW :: install event
self.addEventListener('install', (evt) => {
    console.log('SW installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('shell assets Caching');
            //caching pages
            cache.addAll(assets);
        })
    );
});

//activating SW :: activate event
self.addEventListener('activate', (evt) => {
    console.log('SW activated');
    evt.waitUntil(
        //collecting all versions of cache
        caches.keys().then((keys) => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map((key) => caches.delete(key))
            )
        })
    );
});

//fetching :: fetch event
self.addEventListener('fetch', (evt) => {
    console.log('FETCH event working');
    evt.respondWith(
        caches.match(evt.request).then((cacheRes) => {
            return cacheRes || fetch(evt.request).then((fetchRes) => {
                return caches.open(dynamicCacheName).then((cache) => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 10);
                    return fetchRes;
                })
            });
            //return from cache OR continue normal fetch request
        }).catch(() => {
            if(evt.request.url.indexOf('.php') > -1){
                return caches.match('./pages/fallback.php');
            }       
        })
    );
});