'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "b3b87f9153d4406c14bc11865bbe1089",
"index.html": "5594e27c80cc9a5f8c3a19d488ae65dd",
"/": "5594e27c80cc9a5f8c3a19d488ae65dd",
"main.dart.js": "7fff442ca4eb782a8be8a0310a08b3bb",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "901d86fb8842ec0d66225a542131d689",
"assets/AssetManifest.json": "b59cacba073f9f5cd51ca8f099d9352c",
"assets/NOTICES": "188b9b5736d6d377622da473a11b2204",
"assets/FontManifest.json": "2f4f390230fc777a59d0a46c27fab2b1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/trophy.png": "83ce3482b204a16e23fd97a9026f4145",
"assets/assets/images/domis.png": "49a6ad9f346d4a1c04db220647721a86",
"assets/assets/images/kondra.png": "93a470371510c5e5ff6f1734764dc6d9",
"assets/assets/images/duels.png": "77068dae49580d64e3ec7e8fbbd3af52",
"assets/assets/images/laimis.png": "1595a31c2ebc80a8513cfa1af55a8bce",
"assets/assets/images/tournaments.png": "ef1fbd4c8845e6a943815bef5d796060",
"assets/assets/images/gabris.png": "6e7172252ccb090be9473f43bbe97d84",
"assets/assets/images/logo_horizontal.png": "168ea5384c2b6d6e30a12ce147a017e1",
"assets/assets/images/logo.png": "139c25d29972cb997fc597f1da02021f",
"assets/assets/images/championship.png": "133cea62b620b90a214fb01e1e74f147",
"assets/assets/images/line.png": "043fc90548a05c3bd414d3aa77045710",
"assets/assets/images/ringas.png": "7af56d3a6df22d14cf7c0be71954f9d4",
"assets/assets/images/back.png": "8dda5d1caa0b75ad253d83c0f0bf59c1",
"assets/assets/videos/gif.gif": "c93a13d5360720b88eb572ed87abd580",
"assets/assets/icons/faceebook_white.png": "a20fa408256ef3a3f9130cd401b186e9",
"assets/assets/icons/telegram.png": "8d31de0d9bc88fe57666907e0b1dc856",
"assets/assets/icons/discord_white.png": "887b11bb37db5b82082fdb7b34c0ced7",
"assets/assets/icons/instagram_white.png": "62f19423c44bec8c0ba53c21e82201c4",
"assets/assets/icons/instagram.png": "1a16c9c2ef81072530870e4a0477a738",
"assets/assets/icons/instagram_red.png": "f95bcb7435426c0a1693ce6d1f2b80c8",
"assets/assets/icons/telegram_white.png": "9e2a5199625d1855e93b341525a91fb3",
"assets/assets/icons/telegram_red.png": "086c0d1901c1308965b7043bba17304e",
"assets/assets/icons/facebook_red.png": "a43d8b9e91720c5c92cab2ea4eac30dc",
"assets/assets/icons/twitter_red.png": "fb7b9de9c8ab8bae29254266d5286145",
"assets/assets/icons/twitter.png": "134f66de36eb2f6aef86331d90d85b27",
"assets/assets/icons/discord.png": "f7ac2b67667278416047bf695a912b99",
"assets/assets/icons/twitter_white.png": "0728caa302697b85de1d0f8d09f3c296",
"assets/assets/icons/facebook.png": "8d27cac3f4188b84a50ae83c6d25ef46",
"assets/assets/icons/discord_red.png": "8ffaade652e8e0e08d419ab1642af751",
"assets/assets/nfts/triangle.png": "7bbe58d4d848db92b25678f56f2ff803",
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
