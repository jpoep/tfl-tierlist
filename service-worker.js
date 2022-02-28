const timestamp = 1646056291103;
const build = [
  "/tfl-tierlist/_app/start-71c7ab26.js",
  "/tfl-tierlist/_app/pages/__layout.svelte-8d6d7c71.js",
  "/tfl-tierlist/_app/assets/pages/__layout.svelte-6559a077.css",
  "/tfl-tierlist/_app/error.svelte-d4708113.js",
  "/tfl-tierlist/_app/pages/index.svelte-d8dc5735.js",
  "/tfl-tierlist/_app/assets/pages/index.svelte-f85064e7.css",
  "/tfl-tierlist/_app/chunks/vendor-468a6b0b.js"
];
const files = [
  "/tfl-tierlist/.nojekyll",
  "/tfl-tierlist/favicon.png",
  "/tfl-tierlist/manifest.json"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files.filter((it) => !it.endsWith(".nojekyll")));
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = (isStaticAsset || url.pathname.startsWith("/PokeAPI/sprites/")) && await caches.match(event.request);
      return cachedAsset || await fetchAndCache(event.request);
    })());
  }
});
