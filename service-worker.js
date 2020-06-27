const CACHE_NAME = "Torque-v23";
var assetsCache = [
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
    "/js/install-service-worker.js",
    "/assets/maulana.jpg",
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
    "/assets/location2.png",
    "/assets/people.png",
    "/assets/teleskop.png",
    "/assets/login.png",
    "/assets/Torque512x512.png",
    "/assets/Torque384x384.png",
    "/assets/Torque256x256.png",
    "/assets/Torque192x192.png",
    "/assets/Torque96x96.png",
    "/manifest.json",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"

];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(assetsCache);
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
                console.log("ServiceWorker : use assets from cache ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker : load assets form server ",
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