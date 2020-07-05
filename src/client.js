import * as sapper from "@sapper/app";

sapper.start({
  target: document.querySelector("#sapper"),
});

const mode = process.env.NODE_ENV;
const dev = mode === "development";

// Check that service workers are supported
// dont load in development
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    if (!dev) navigator.serviceWorker.register("service-worker.js");

    // remove all old service workers when developing
    if (dev) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        console.log("Unloading service workers", registrations);
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
  });
}
