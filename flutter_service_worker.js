'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/NOTICES": "65927a9256022709295bd07d61a17fc5",
"assets/assets/images/special-drink7.png": "3986b202c2e318e683ce1d6766d0c83b",
"assets/assets/images/special-drink6.png": "1a7c0690f674837db3a2bd9d962e2c7a",
"assets/assets/images/coxinhas.png": "fecf2de041f89eb99dbf13481bc4efcf",
"assets/assets/images/fish-n-salsa.png": "e7fd62c478514500a74ffa53cb5f35d3",
"assets/assets/images/pamonha.png": "b7413145eab19e3376b0c0424f9281cb",
"assets/assets/images/steak-veggies.png": "660394a28fc5ff3ae95877d415626f1c",
"assets/assets/images/visa.png": "395080dd383da732904ee2e9f39d8291",
"assets/assets/images/shrimp-n-rice.png": "31300d12dc3b13dee71caf76d78aaacd",
"assets/assets/images/chicken-salad.png": "c67b3df688affe97d7249ef116114538",
"assets/assets/images/chicken-tender.png": "6e45a381ddf5655fd4311386042be27d",
"assets/assets/images/caipirinha.jpg": "a27d4769a10cf2fc0017215af958beb5",
"assets/assets/images/spagetti.png": "e1fc8d070af5eac521837cf600b76b15",
"assets/assets/images/chicken-tortilla.png": "9c171abab08f2356e3900476b918f2e0",
"assets/assets/images/special-drink1.png": "c3ab8e5ee04be2d097692865702654a6",
"assets/assets/images/penne-au-sugo.png": "67fe89c285375cb6670f119157566473",
"assets/assets/images/special-drink4.png": "98654e2a3d709ef2e279eaa7b7488280",
"assets/assets/images/lasagna-bolognese.jpg": "a3e592dd6c0e63cbc63c427ca178ae92",
"assets/assets/images/special-drink3.png": "b5432011104d59059072d05426ec2cff",
"assets/assets/images/special-drink2.png": "41bcf60448711782fe9c8448ad32bde9",
"assets/assets/images/hamburger-ink.png": "c1e2a4860e0eb856e1d250a0f5f33c51",
"assets/assets/images/special-drink5.png": "50476d163271f914dda30314d0ce39c5",
"assets/assets/images/steak.png": "f6734d83883d371265dacdb3d4766b6e",
"assets/assets/images/tapioca-taco.jpg": "2fb20b1ff3162bfbf90fea6da60ac31d",
"assets/assets/images/rice-n-beans.jpg": "ec9c7cf6ddf406f931379e9166970fc6",
"assets/assets/images/cold-noodles.png": "f349b4401a360b7eff716826d128267a",
"assets/assets/fonts/Caveat-Regular.ttf": "04c3547e70bd8d53833d325c37f9621f",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "6f4a85734ff4386d8a1876798a793d41",
"assets/AssetManifest.json": "d7a498253b2d3adc58956072db444a98",
"assets/FontManifest.json": "7c43355e64795521259531675ab87ac5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/fonts/MaterialIcons-Regular.otf": "2a7dd264ad061c8d36245f47e3731db6",
"index.html": "8ee2362ddf5216586b9e81b521dd06e9",
"/": "8ee2362ddf5216586b9e81b521dd06e9",
"main.dart.js": "c748735c54b29006c1a4ed78102080d0",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"version.json": "fc88ea62d06a46f19192c001276437be",
"manifest.json": "ac320296d123f5cc0018e38ab0aaab55",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
