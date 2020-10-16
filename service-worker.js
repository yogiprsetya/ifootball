importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	console.log(`Workbox berhasil dimuat`);

	workbox.precaching.precacheAndRoute([
		{ url: '/', revision: '3' },
		{ url: '/manifest.json', revision: '3' },
		{ url: '/index.html', revision: '3' },
		{ url: '/nav.html', revision: '3' },
		{ url: '/pages/competition.html', revision: '3' },
		{ url: '/pages/favorit.html', revision: '3' },
		{ url: '/pages/home.html', revision: '3' },
		{ url: '/css/materialize.min.css', revision: '3' },
		{ url: '/css/style.css', revision: '3' },
		{ url: '/js/api.js', revision: '3' },
		{ url: '/js/controllers.js', revision: '3' },
		{ url: '/js/idb.js', revision: '3' },
		{ url: '/js/main.js', revision: '3' },
		{ url: '/js/materialize.min.js', revision: '3' },
		{ url: '/js/models.js', revision: '3' },
		{ url: '/js/nav.js', revision: '3' },
		{ url: '/js/page.js', revision: '3' },
		{ url: '/js/register.js', revision: '3' },
		{ url: '/img/icon-192x192.png', revision: '3' },
		{ url: '/img/icon-256x256.png', revision: '3' },
		{ url: '/img/icon-384x384.png', revision: '3' },
		{ url: '/img/icon-512x512.png', revision: '3' },
		{ url: '/img/icon-ios-192.png', revision: '3' },
		{ url: '/img/logo-dark.png', revision: '3' }
	]);

	workbox.routing.registerRoute(
		/.*(?:png|jpg|jpeg)$/,
		new workbox.strategies.CacheFirst({
			cacheName: 'img-cache',
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200]
				}),
				new workbox.expiration.Plugin({
					maxEntries: 100,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				}),
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp('https://api.football-data.org/'),
		new workbox.strategies.StaleWhileRevalidate()
	)

	workbox.routing.registerRoute(
		/^https:\/\/fonts\.googleapis\.com/,
		new workbox.strategies.CacheFirst({
			cacheName: 'google-fonts-webfonts',
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200],
				}),
				new workbox.expiration.Plugin({
					maxAgeSeconds: 60 * 60 * 24 * 365,
					maxEntries: 30,
				}),
			],
		})
	);

	workbox.routing.registerRoute(
		/\.(?:js|css)$/,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'static-files',
		})
	);

	workbox.routing.registerRoute(
		new RegExp('/pages/'),
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'pages'
		})
	);

} else {
	console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
	var body;

	event.data ? body = event.data.text() : body = 'Push message no payload';

	var options = {
		body: body,
		icon: '/img/icon-512x512.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});