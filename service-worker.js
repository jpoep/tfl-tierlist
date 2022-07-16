const build = [
  "/_app/immutable/start-df9718ed.js",
  "/_app/immutable/pages/__layout.svelte-4064d19a.js",
  "/_app/immutable/assets/pages/__layout.svelte-c77a3056.css",
  "/_app/immutable/assets/titillium-web-latin-ext-400-normal-05e41516.woff2",
  "/_app/immutable/assets/titillium-web-all-400-normal-36ceefe1.woff",
  "/_app/immutable/assets/titillium-web-latin-400-normal-557f6d08.woff2",
  "/_app/immutable/assets/titillium-web-latin-ext-700-normal-8f8ebc7e.woff2",
  "/_app/immutable/assets/titillium-web-all-700-normal-65d21c1b.woff",
  "/_app/immutable/assets/titillium-web-latin-700-normal-d5c1172f.woff2",
  "/_app/immutable/error.svelte-cd1ca991.js",
  "/_app/immutable/pages/index.svelte-5e8f5c5f.js",
  "/_app/immutable/assets/pages/index.svelte-794694ae.css",
  "/_app/immutable/chunks/index-8c7a71bd.js",
  "/_app/immutable/chunks/index-0665da37.js",
  "/_app/immutable/chunks/paths-396f020f.js",
  "/_app/immutable/chunks/index-e1c47fd3.js"
];
const files = [
  "/.nojekyll",
  "/CNAME",
  "/favicon.png",
  "/logo-120x120.png",
  "/logo-128x128.png",
  "/logo-144x144.png",
  "/logo-152x152.png",
  "/logo-180x180.png",
  "/logo-192x192.png",
  "/logo-384x384.png",
  "/logo-512x512.png",
  "/logo-72x72.png",
  "/logo-96x96.png",
  "/logos/atlanta-fletiamo.avif",
  "/logos/atlanta-fletiamo.png",
  "/logos/atlanta-fletiamo.webp",
  "/logos/bellektro-ghetto-2.avif",
  "/logos/bellektro-ghetto-2.avif~",
  "/logos/bellektro-ghetto-2.jpg",
  "/logos/bellektro-ghetto-2.webp",
  "/logos/bellektro-ghetto-2.webp~",
  "/logos/bellektro-ghetto.avif",
  "/logos/bellektro-ghetto.png",
  "/logos/bellektro-ghetto.webp",
  "/logos/dragapult-disco.avif",
  "/logos/dragapult-disco.jpg",
  "/logos/dragapult-disco.webp",
  "/logos/dragapult-disco.webp~",
  "/logos/freddyursa.avif",
  "/logos/freddyursa.jpg",
  "/logos/freddyursa.png",
  "/logos/freddyursa.webp",
  "/logos/galar-rapidashs.avif",
  "/logos/galar-rapidashs.avif~",
  "/logos/galar-rapidashs.jpg",
  "/logos/galar-rapidashs.webp",
  "/logos/galar-rapidashs.webp~",
  "/logos/gda-2.avif",
  "/logos/gda-2.avif~",
  "/logos/gda-2.jpg",
  "/logos/gda-2.webp",
  "/logos/gda-2.webp~",
  "/logos/gda.avif",
  "/logos/gda.jpg",
  "/logos/gda.png",
  "/logos/gda.webp",
  "/logos/kopflos-dorsten.avif",
  "/logos/kopflos-dorsten.png",
  "/logos/kopflos-dorsten.webp",
  "/logos/machakey.avif",
  "/logos/machakey.jpeg",
  "/logos/machakey.webp",
  "/logos/machakey.webp~",
  "/logos/miami-heatran.avif",
  "/logos/miami-heatran.png",
  "/logos/miami-heatran.webp",
  "/logos/oliberlo-chancentod.avif",
  "/logos/oliberlo-chancentod.png",
  "/logos/oliberlo-chancentod.webp",
  "/logos/pixelspark.avif",
  "/logos/pixelspark.jpg",
  "/logos/pixelspark.png",
  "/logos/pixelspark.webp",
  "/logos/psv-nilsoking.avif",
  "/logos/psv-nilsoking.png",
  "/logos/psv-nilsoking.webp",
  "/logos/quellbrunn-quaxo-transparent.avif",
  "/logos/quellbrunn-quaxo-transparent.png",
  "/logos/quellbrunn-quaxo-transparent.webp",
  "/logos/quellbrunn-quaxo.avif",
  "/logos/quellbrunn-quaxo.jpg",
  "/logos/quellbrunn-quaxo.png",
  "/logos/quellbrunn-quaxo.webp",
  "/logos/stomping-dannex.avif",
  "/logos/stomping-dannex.jpg",
  "/logos/stomping-dannex.webp",
  "/logos/surging-strikes.avif",
  "/logos/surging-strikes.png",
  "/logos/surging-strikes.webp",
  "/logos/tripled.avif",
  "/logos/tripled.avif~",
  "/logos/tripled.jpg",
  "/logos/tripled.webp",
  "/logos/tuspo-salamence.avif",
  "/logos/tuspo-salamence.png",
  "/logos/tuspo-salamence.webp",
  "/logos/zygarde-green.avif",
  "/logos/zygarde-green.png",
  "/manifest.json",
  "/pokeball-logo.svg",
  "/sounds/dannex.mp3",
  "/sounds/impact.mp3",
  "/sounds/oli.mp3",
  "/sounds/pokescout.mp3",
  "/sounds/ppv.mp3",
  "/sounds/sword-thud.mp3",
  "/sounds/till.mp3",
  "/till.png"
];
const version = "1657982417813";
const worker = self;
const FILES = `cache${version}`;
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
  const cache = await caches.open(`offline${version}`);
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
