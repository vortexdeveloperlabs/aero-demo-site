import handle from "./aero/handle.js";
import dynamicUpdates from "./aero/updates.js";

self.addEventListener("install", event => self.skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(
		handle(event).catch(err => new Response(err.stack, { status: 500 }))
	)
);

dynamicUpdates();
