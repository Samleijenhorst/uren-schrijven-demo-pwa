var version = "0.0.19";

var RESOURCES_TO_PRELOAD = [
	"index.html",
	"register-worker.js",
	"css/style.css",
	"manifest.json",
	"i18n/i18n.properties",
	"model/firestore-todo.js",
	"model/firestore.js",
	"model/models.js",
	"utils/Notifications.js",
	"controller/App.controller.js",
	"controller/Detail.controller.js",
	"view/App.view.js",
	"view/Master.view.js",
	"view/Detail.view.js",
	"image/Icon-144.png",
	"image/Icon-192.png",
	"image/Icon-36.png",
	"image/Icon-48.png",
	"image/Icon-512.png",
	"image/Icon-72.png",
	"image/Icon-96.png"
];

RESOURCES_TO_PRELOAD = RESOURCES_TO_PRELOAD.concat([
	'../resources/sap-ui-core.js',
	'../resources/sap/ui/core/library-preload.js',
	'../resources/sap/ui/core/messagebundle_en.properties',
	'../resources/sap/ui/core/themes/sap_belize/library.css',
	'../resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2',
	'../resources/sap/ui/core/themes/sap_belize/fonts/72-Bold.woff2',
	'../resources/sap/ui/core/themes/sap_belize/fonts/72-Regular.woff2',
	'../resources/sap/m/library-preload.js',
	'../resources/sap/m/messagebundle_en.properties',
	'../resources/sap/m/themes/sap_belize/library.css',
	'../resources/sap/ui/layout/messagebundle_en.properties',
	'../resources/sap/ui/layout/library-preload.js',
	'../resources/sap/ui/layout/themes/sap_belize/library.css'
]);

var CACHE_NAME = "PWA-UREN-SCHRIJVEN-APP-" + version;
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(RESOURCES_TO_PRELOAD);
		})
		.catch(function (oError) {
			console.log("Error while caching the relevant files: " + oError);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			}
			var requestCopy = event.request.clone();
			return fetch(requestCopy).then(function (response) {
				if (!response) {
					return response;
				}
				if (response.status === 200 || response.type === ' opaque') {
					if (!event.request.url.startsWith('chrome-extension://')) {
						var responseCopy = response.clone();
						caches.open(CACHE_NAME).then(function (cache) {
							cache.put(event.request, responseCopy);
						});
					}
				}
				return response;
			});
		}).catch(function () {
			var req = event.request;
			return caches.match('/images/cancel.svg');
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	var notification = event.notification;
	var primaryKey = notification.data.primaryKey;
	var action = event.action;

	if (action === 'close') {
		notification.close();
	} else {
		clients.openWindow('https://www.ciber.nl');
		notification.close();
	}
});

self.addEventListener('push', function (event) {
	var body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Default body';
	}
	var options = {
		body: body,
		icon: 'Icon-48.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		},
		actions: [{
			action: 'explore',
			title: 'Ga naar de site'
		}, {
			action: 'close',
			title: 'Sluit de  notificatie'
		}, ]
	};

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});