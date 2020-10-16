const CACHE_NAME = "explore-pwa.v1";

const urlsToCache = [
	"/",
	"/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/competition.html",
  "/pages/favorit.html",
  "/pages/home.html",
	"/css/materialize.min.css",
  "/css/style.css",
	"/js/api.js",
	"/js/controllers.js",
	"/js/idb.js",
	"/js/main.js",
  "/js/materialize.min.js",
  "/js/models.js",
  "/js/nav.js",
  "/js/page.js",
  "/js/register.js",
  "/img/icon-192x192.png",
  "/img/icon-256x256.png",
  "/img/icon-384x384.png",
  "/img/icon-512x512.png",
  "/img/icon-ios-192.png",
  "/img/logo-dark.png",
  "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap",
	"https://fonts.gstatic.com/s/rubik/v11/iJWKBXyIfDnIV7nBrXyw023e.woff2"
];

self.addEventListener('install', event => {
	event.waitUntil (
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(urlsToCache))
	);
})

self.addEventListener('fetch', event => {
	const BASE_URL = "https://api.football-data.org/";

	if (event.request.url.indexOf(BASE_URL) > -1) {
		event.respondWith (
			caches.open(CACHE_NAME)
				.then(cache => {
        	return fetch(event.request)
        		.then(response => {
          		cache.put(event.request.url, response.clone());
          		return response;
        		})
      	})
		);
	} else {
		event.respondWith (
			caches.match(event.request, { ignoreSearch: true })
				.then(response => response || fetch (event.request))
				.catch(err => console.log(err))
		)
	}
});

self.addEventListener('activate', event => {
	event.waitUntil (
		caches.keys()
		.then(cacheNames => {
			return Promise.all (
				cacheNames.map(cacheName => {
					if (cacheName !== CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})