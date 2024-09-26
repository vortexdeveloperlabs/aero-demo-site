importScripts("aero/config.aero.js");
importScripts("aero/sw.aero.js");

importScripts("./scripts/sdk/aeroHandleSimple.js");

const aeroHandlerWithExtras = patchAeroHandler(aeroHandle);

self.addEventListener("install", () => skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(aeroHandlerWithExtras(event))
);
