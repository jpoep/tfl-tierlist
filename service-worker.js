const timestamp = 1648053065734;
const build = [
  "/tfl-tierlist/_app/start-91eab3b0.js",
  "/tfl-tierlist/_app/pages/__layout.svelte-510458fd.js",
  "/tfl-tierlist/_app/assets/pages/__layout.svelte-6559a077.css",
  "/tfl-tierlist/_app/error.svelte-fc4cf3f8.js",
  "/tfl-tierlist/_app/pages/index.svelte-7bcb2ab1.js",
  "/tfl-tierlist/_app/assets/pages/index.svelte-51d618fd.css",
  "/tfl-tierlist/_app/chunks/vendor-58404c5c.js",
  "/tfl-tierlist/_app/chunks/paths-4b3c6e7e.js"
];
const files = [
  "/tfl-tierlist/.nojekyll",
  "/tfl-tierlist/favicon.png",
  "/tfl-tierlist/logos/atlanta-fletiamo.avif",
  "/tfl-tierlist/logos/atlanta-fletiamo.png",
  "/tfl-tierlist/logos/bellektro-ghetto.avif",
  "/tfl-tierlist/logos/bellektro-ghetto.png",
  "/tfl-tierlist/logos/freddyursa.avif",
  "/tfl-tierlist/logos/freddyursa.jpg",
  "/tfl-tierlist/logos/gda.avif",
  "/tfl-tierlist/logos/gda.jpg",
  "/tfl-tierlist/logos/kopflos-dorsten.avif",
  "/tfl-tierlist/logos/kopflos-dorsten.png",
  "/tfl-tierlist/logos/miami-heatran.avif",
  "/tfl-tierlist/logos/miami-heatran.png",
  "/tfl-tierlist/logos/oliberlo-chancentod.avif",
  "/tfl-tierlist/logos/oliberlo-chancentod.png",
  "/tfl-tierlist/logos/pixelspark.avif",
  "/tfl-tierlist/logos/pixelspark.jpg",
  "/tfl-tierlist/logos/psv-nilsoking.avif",
  "/tfl-tierlist/logos/psv-nilsoking.png",
  "/tfl-tierlist/logos/quellbrunn-quaxo-transparent.avif",
  "/tfl-tierlist/logos/quellbrunn-quaxo.avif",
  "/tfl-tierlist/logos/quellbrunn-quaxo.jpg",
  "/tfl-tierlist/logos/surging-strikes.avif",
  "/tfl-tierlist/logos/surging-strikes.png",
  "/tfl-tierlist/logos/tuspo-salamence.avif",
  "/tfl-tierlist/logos/tuspo-salamence.png",
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
    cache.put(request, response.clone());
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
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
