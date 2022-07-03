'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "b3b87f9153d4406c14bc11865bbe1089",
"index.html": "636c43a5ffd79d4e8582cb33f33870d9",
"/": "636c43a5ffd79d4e8582cb33f33870d9",
"main.dart.js": "13a22ca2b62d9d06dcd079a8cd89892f",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "901d86fb8842ec0d66225a542131d689",
"assets/AssetManifest.json": "63b3c14481d0a983f40af11e05017a8f",
"assets/NOTICES": "0ebd72a11d58027954978773b5cd66ff",
"assets/FontManifest.json": "2f4f390230fc777a59d0a46c27fab2b1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/trophy.png": "83ce3482b204a16e23fd97a9026f4145",
"assets/assets/images/land.png": "60451b68b28ccbbd23d42cecf90e4856",
"assets/assets/images/kondra.png": "b089e9370839c4e9041a4fc6d05e1ea4",
"assets/assets/images/img.png": "811e9cb05952e30cf132ecc91ce5311a",
"assets/assets/images/land.svg": "c06fb6c651528cecb095a39188aa24f4",
"assets/assets/images/background.jpeg": "36e0034d9e4282e0ffb8c141bc779064",
"assets/assets/images/background.jpg": "cd2742b9a68dc912536735f879e0c8b3",
"assets/assets/images/background.png": "f619e5d69bfc2e73ff130e7e38c39808",
"assets/assets/images/gabris.png": "35f2cba7bf76a3044d44006a46176990",
"assets/assets/images/logo.png": "139c25d29972cb997fc597f1da02021f",
"assets/assets/images/logo2.png": "cecc1b3085a5967803e83c3eb7c88d43",
"assets/assets/images/stars.svg": "65dc8a2dc7543ccd99434148db776fcf",
"assets/assets/images/meteor.svg": "23774b64cdb9da0d9b48744a55fbe44f",
"assets/assets/images/logo_small.png": "9e8b5843561278345d6ce99ed9ab1ea3",
"assets/assets/images/meteor.png": "5ce044e7f1c7537a837c6ede62458249",
"assets/assets/images/background.webp": "2fe363472a93f3f198112511a18525e1",
"assets/assets/images/lightnings.svg": "379e292bd30ad0918456ec802754467a",
"assets/assets/nfts/trys.png": "1e321e153bbc93257a7c1f5de28e1340",
"assets/assets/nfts/nft4.jpg": "7b2306e637c8d5830f75b833e3c2d821",
"assets/assets/nfts/nft1.jpg": "9eb87aa48ff9c8fb1653e07ea35baa10",
"assets/assets/nfts/nft3.jpg": "aace8dc7f8b24a9ee6d17d3b10204f7d",
"assets/assets/nfts/nft2.jpg": "ba1d1f4eae25ff8ac9c610294b854cde",
"assets/assets/nfts/image1.png": "8937e47ccb0d6b3b901dc8a6105bdf30",
"assets/assets/nfts/image2.png": "4116cc7d9d7125b6fe06eace2225e81d",
"assets/assets/nfts/image3.png": "f918f097b6c529e4212042f478caecb9",
"assets/assets/fonts/Play/Play-Regular.ttf": "a83df317dd89c7dd5388a152a26b2236",
"assets/assets/fonts/Play/Play-Bold.ttf": "6a82d0104d58be230604d30b6159322c",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
