importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

workbox.core.setCacheNameDetails({
  prefix: "PhrassedChatCache",
  precache: "precache",
  runtime: "runtime",
});

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  /\.js$/,
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: "js-cache",
  })
);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: "css-cache",
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener("install", function (event) {
  console.log("Installing service worker");
  if (self.skipWaiting) {
    console.log("Installing update now!");
    self.skipWaiting();
  }
});
