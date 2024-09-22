importScripts("aero/config.aero.js");
importScripts("aero/sw.aero.js");

importScripts("./scripts/sdk/aeroHandleSimple.js");

const aeroHandler = patchAeroHandler(handle);

self.addEventListener("install", () => skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(aeroHandler(event))
);
