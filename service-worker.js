const timestamp = 1651237856153;
const build = [
  "/tfl-tierlist/_app/start-41a6c554.js",
  "/tfl-tierlist/_app/pages/__layout.svelte-b238adbd.js",
  "/tfl-tierlist/_app/assets/pages/__layout.svelte-6559a077.css",
  "/tfl-tierlist/_app/error.svelte-f2d62e4f.js",
  "/tfl-tierlist/_app/pages/index.svelte-554662d1.js",
  "/tfl-tierlist/_app/assets/pages/index.svelte-acc3f6ac.css",
  "/tfl-tierlist/_app/chunks/vendor-37050b0a.js",
  "/tfl-tierlist/_app/chunks/paths-4b3c6e7e.js"
];
const files = [
  "/tfl-tierlist/.nojekyll",
  "/tfl-tierlist/favicon.png",
  "/tfl-tierlist/logo-120x120.png",
  "/tfl-tierlist/logo-128x128.png",
  "/tfl-tierlist/logo-144x144.png",
  "/tfl-tierlist/logo-152x152.png",
  "/tfl-tierlist/logo-180x180.png",
  "/tfl-tierlist/logo-192x192.png",
  "/tfl-tierlist/logo-384x384.png",
  "/tfl-tierlist/logo-512x512.png",
  "/tfl-tierlist/logo-72x72.png",
  "/tfl-tierlist/logo-96x96.png",
  "/tfl-tierlist/logos/atlanta-fletiamo.avif",
  "/tfl-tierlist/logos/atlanta-fletiamo.png",
  "/tfl-tierlist/logos/atlanta-fletiamo.webp",
  "/tfl-tierlist/logos/bellektro-ghetto.avif",
  "/tfl-tierlist/logos/bellektro-ghetto.png",
  "/tfl-tierlist/logos/bellektro-ghetto.webp",
  "/tfl-tierlist/logos/freddyursa.avif",
  "/tfl-tierlist/logos/freddyursa.jpg",
  "/tfl-tierlist/logos/freddyursa.png",
  "/tfl-tierlist/logos/freddyursa.webp",
  "/tfl-tierlist/logos/gda.avif",
  "/tfl-tierlist/logos/gda.jpg",
  "/tfl-tierlist/logos/gda.png",
  "/tfl-tierlist/logos/gda.webp",
  "/tfl-tierlist/logos/kopflos-dorsten.avif",
  "/tfl-tierlist/logos/kopflos-dorsten.png",
  "/tfl-tierlist/logos/kopflos-dorsten.webp",
  "/tfl-tierlist/logos/miami-heatran.avif",
  "/tfl-tierlist/logos/miami-heatran.png",
  "/tfl-tierlist/logos/miami-heatran.webp",
  "/tfl-tierlist/logos/oliberlo-chancentod.avif",
  "/tfl-tierlist/logos/oliberlo-chancentod.png",
  "/tfl-tierlist/logos/oliberlo-chancentod.webp",
  "/tfl-tierlist/logos/pixelspark.avif",
  "/tfl-tierlist/logos/pixelspark.jpg",
  "/tfl-tierlist/logos/pixelspark.png",
  "/tfl-tierlist/logos/pixelspark.webp",
  "/tfl-tierlist/logos/psv-nilsoking.avif",
  "/tfl-tierlist/logos/psv-nilsoking.png",
  "/tfl-tierlist/logos/psv-nilsoking.webp",
  "/tfl-tierlist/logos/quellbrunn-quaxo-transparent.avif",
  "/tfl-tierlist/logos/quellbrunn-quaxo-transparent.png",
  "/tfl-tierlist/logos/quellbrunn-quaxo-transparent.webp",
  "/tfl-tierlist/logos/quellbrunn-quaxo.avif",
  "/tfl-tierlist/logos/quellbrunn-quaxo.jpg",
  "/tfl-tierlist/logos/quellbrunn-quaxo.png",
  "/tfl-tierlist/logos/quellbrunn-quaxo.webp",
  "/tfl-tierlist/logos/surging-strikes.avif",
  "/tfl-tierlist/logos/surging-strikes.png",
  "/tfl-tierlist/logos/surging-strikes.webp",
  "/tfl-tierlist/logos/tuspo-salamence.avif",
  "/tfl-tierlist/logos/tuspo-salamence.png",
  "/tfl-tierlist/logos/tuspo-salamence.webp",
  "/tfl-tierlist/manifest.json",
  "/tfl-tierlist/pokeball-logo.svg"
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
