const CACHE_NAME = "Torque-v3";
var urlsToCache = [
    "/",
    "/navbar.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/login.html",
    "/pages/product.html",
    "/pages/cart.html",
    "/css/materialize.min.css",
    "/css/styles.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/init.js",
    "/assets/curry.jpg",
    "/assets/nike-offwhite.jpg",
    "/assets/rsz_cs-offwhite.jpg",
    "/assets/nmd.jpg",
    "/assets/react-55.jpg",
    "/assets/about-sneakers.png",
    "/assets/yeezy.jpg",
    "/assets/yeezy-onfeet.jpg",
    "/assets/pohon.jpg",
    "/assets/bulan.png",
    "/assets/location.png",
    "/assets/people.png",
    "/assets/faq.png",
    "/assets/location2.png",
    "/assets/login.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});