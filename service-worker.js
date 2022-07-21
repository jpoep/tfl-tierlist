const m = [
  "/_app/immutable/assets/titillium-web-latin-ext-400-normal-05e41516.woff2",
  "/_app/immutable/assets/titillium-web-latin-400-normal-557f6d08.woff2",
  "/_app/immutable/assets/titillium-web-latin-ext-700-normal-8f8ebc7e.woff2",
  "/_app/immutable/assets/titillium-web-latin-700-normal-d5c1172f.woff2",
  "/_app/immutable/assets/titillium-web-all-400-normal-36ceefe1.woff",
  "/_app/immutable/assets/titillium-web-all-700-normal-65d21c1b.woff",
  "/_app/immutable/start-83f69449.js",
  "/_app/immutable/pages/__layout.svelte-0e78a8d3.js",
  "/_app/immutable/assets/__layout-8495a177.css",
  "/_app/immutable/error.svelte-866b3a2b.js",
  "/_app/immutable/pages/__layout-root.svelte-a03f5772.js",
  "/_app/immutable/pages/teams/__layout@root.svelte-ba2bd2eb.js",
  "/_app/immutable/pages/teams/__layout-single-team@root.svelte-1633cc91.js",
  "/_app/immutable/pages/index.svelte-633d67b1.js",
  "/_app/immutable/assets/index-a9104c0d.css",
  "/_app/immutable/pages/teams/_team_@single-team.svelte-3a352fc5.js",
  "/_app/immutable/assets/[team]@single-team-df96a616.css",
  "/_app/immutable/pages/teams/index.svelte-fb0f69aa.js",
  "/_app/immutable/assets/index-fd3525e6.css",
  "/_app/immutable/pages/teams/link.svelte-02df84b0.js",
  "/_app/immutable/chunks/index-7ce7c74a.js",
  "/_app/immutable/chunks/index-4916a16a.js",
  "/_app/immutable/chunks/paths-1c47712a.js",
  "/_app/immutable/chunks/navbar-8e02b7db.js",
  "/_app/immutable/assets/navbar-025804c3.css",
  "/_app/immutable/chunks/filter-be20cfaa.js",
  "/_app/immutable/chunks/tooltip-8e32afb5.js",
  "/_app/immutable/assets/tooltip-1298881e.css",
  "/_app/immutable/chunks/sprites-e8bb8e9f.js",
  "/_app/immutable/chunks/baseline-arrow-back-51f093c8.js",
  "/_app/immutable/chunks/team-e0431e55.js",
  "/_app/immutable/assets/team-00ff67f5.css"
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
  "/logos/bellektro-ghetto-2.jpg",
  "/logos/bellektro-ghetto-2.webp",
  "/logos/bellektro-ghetto.avif",
  "/logos/bellektro-ghetto.png",
  "/logos/bellektro-ghetto.webp",
  "/logos/dragapult-disco.avif",
  "/logos/dragapult-disco.jpg",
  "/logos/dragapult-disco.webp",
  "/logos/freddyursa.avif",
  "/logos/freddyursa.jpg",
  "/logos/freddyursa.png",
  "/logos/freddyursa.webp",
  "/logos/galar-rapidashs.avif",
  "/logos/galar-rapidashs.jpg",
  "/logos/galar-rapidashs.webp",
  "/logos/gda-2.avif",
  "/logos/gda-2.jpg",
  "/logos/gda-2.webp",
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
  "/logos/tripled.jpg",
  "/logos/tripled.webp",
  "/logos/tuspo-salamence.avif",
  "/logos/tuspo-salamence.png",
  "/logos/tuspo-salamence.webp",
  "/logos/z69.avif",
  "/logos/z69.png",
  "/logos/z69.webp",
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
], p = "1658434811894", e = self, n = `cache${p}`, i = m.concat(c.filter((s) => !s.endsWith(".nojekyll"))), r = new Set(i);
e.addEventListener("install", (s) => {
  s.waitUntil(caches.open(n).then((a) => a.addAll(i)).then(() => {
    e.skipWaiting();
  }));
});
e.addEventListener("activate", (s) => {
  s.waitUntil(caches.keys().then(async (a) => {
    for (const o of a)
      o !== n && await caches.delete(o);
    e.clients.claim();
  }));
});
async function u(s) {
  const a = await caches.open(`offline${p}`);
  try {
    const o = await fetch(s);
    return a.put(s, o.clone()), o;
  } catch (o) {
    const t = await a.match(s);
    if (t)
      return t;
    throw o;
  }
}
e.addEventListener("fetch", (s) => {
  if (s.request.method !== "GET" || s.request.headers.has("range"))
    return;
  const a = new URL(s.request.url), o = a.protocol.startsWith("http"), t = a.hostname === self.location.hostname && a.port !== self.location.port, l = a.host === self.location.host && r.has(a.pathname), g = s.request.cache === "only-if-cached" && !l;
  o && !t && !g && s.respondWith((async () => (l || a.pathname.startsWith("/PokeAPI/sprites/")) && await caches.match(s.request) || u(s.request))());
});
