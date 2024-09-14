importScripts("aero/config.aero.js");
importScripts("aero/sw.aero.js");

importScripts("./scripts/sdk/aeroHandleSimple.js");

self.addEventListener("install", () => skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(patchAeroHandler(handle)(event))
);
