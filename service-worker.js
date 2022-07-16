const r = [
  "/_app/immutable/assets/titillium-web-latin-ext-400-normal-05e41516.woff2",
  "/_app/immutable/assets/titillium-web-latin-400-normal-557f6d08.woff2",
  "/_app/immutable/assets/titillium-web-latin-ext-700-normal-8f8ebc7e.woff2",
  "/_app/immutable/assets/titillium-web-latin-700-normal-d5c1172f.woff2",
  "/_app/immutable/assets/titillium-web-all-400-normal-36ceefe1.woff",
  "/_app/immutable/assets/titillium-web-all-700-normal-65d21c1b.woff",
  "/_app/immutable/start-fd2f875e.js",
  "/_app/immutable/pages/__layout.svelte-b5be459d.js",
  "/_app/immutable/assets/__layout-1e33ba6f.css",
  "/_app/immutable/error.svelte-30c3d862.js",
  "/_app/immutable/pages/index.svelte-f870ed12.js",
  "/_app/immutable/assets/index-a6c351a7.css",
  "/_app/immutable/chunks/index-3e568538.js",
  "/_app/immutable/chunks/index-66fd6d2b.js",
  "/_app/immutable/chunks/paths-1c47712a.js",
  "/_app/immutable/chunks/index-8456a1b9.js"
], c = [
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
  "/logos/z69.avif",
  "/logos/z69.webp",
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
], n = "1657987463195", e = self, g = `cache${n}`, i = r.concat(c.filter((o) => !o.endsWith(".nojekyll"))), d = new Set(i);
e.addEventListener("install", (o) => {
  o.waitUntil(caches.open(g).then((s) => s.addAll(i)).then(() => {
    e.skipWaiting();
  }));
});
e.addEventListener("activate", (o) => {
  o.waitUntil(caches.keys().then(async (s) => {
    for (const a of s)
      a !== g && await caches.delete(a);
    e.clients.claim();
  }));
});
async function u(o) {
  const s = await caches.open(`offline${n}`);
  try {
    const a = await fetch(o);
    return s.put(o, a.clone()), a;
  } catch (a) {
    const l = await s.match(o);
    if (l)
      return l;
    throw a;
  }
}
e.addEventListener("fetch", (o) => {
  if (o.request.method !== "GET" || o.request.headers.has("range"))
    return;
  const s = new URL(o.request.url), a = s.protocol.startsWith("http"), l = s.hostname === self.location.hostname && s.port !== self.location.port, t = s.host === self.location.host && d.has(s.pathname), p = o.request.cache === "only-if-cached" && !t;
  a && !l && !p && o.respondWith((async () => (t || s.pathname.startsWith("/PokeAPI/sprites/")) && await caches.match(o.request) || u(o.request))());
});
