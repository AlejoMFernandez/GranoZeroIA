// sw.js — Service Worker de GranoZero
// Estrategia: cache-first para assets propios, network-first para CDNs.

const CACHE_VERSION = "granozero-v1";
const STATIC_CACHE = `gz-static-${CACHE_VERSION}`;

// Archivos del proyecto a precachear (todo lo necesario para offline)
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",

  // Hojas de estilo
  "./sections.css",

  // Scripts
  "./cafes.js",
  "./data.js",
  "./tweaks-panel.jsx",
  "./bean.jsx",
  "./sounds.jsx",
  "./cafe-svgs.jsx",
  "./dock.jsx",
  "./sections.jsx",
  "./app.jsx",

  // Assets
  "./assets/bean.png",
  "./assets/logo-full.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-192-maskable.png",
  "./assets/icon-512-maskable.png",
  "./assets/favicon-32.png",
  "./assets/apple-touch-icon.png",
  "./assets/cafes/espresso.png",
];

// CDNs externos — los cacheamos a medida que se piden
const EXTERNAL_PATTERNS = [
  /^https:\/\/unpkg\.com\//,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
];

// ─── INSTALL: precache de archivos propios ──────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // addAll falla si UN solo archivo no existe; lo hacemos con tolerancia.
      return Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("[SW] skip precache:", url, err.message);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE: limpiar caches viejos ────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("gz-") && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH: estrategia híbrida ─────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Solo manejamos GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isExternal = EXTERNAL_PATTERNS.some((p) => p.test(req.url));
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // Cache-first para archivos propios
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          // Cachear la respuesta para próximas visitas
          if (res && res.status === 200 && res.type === "basic") {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(req, clone));
          }
          return res;
        }).catch(() => {
          // Si todo falla y se pide HTML, devolver index
          if (req.destination === "document") {
            return caches.match("./index.html");
          }
          return new Response("", { status: 504 });
        });
      })
    );
  } else if (isExternal) {
    // Stale-while-revalidate para CDNs (React, Babel, Fonts)
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(req, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
  // Otros orígenes: pasan directo
});
