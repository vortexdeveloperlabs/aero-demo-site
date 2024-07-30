importScripts("aero/config.aero.js");
importScripts("aero/sw.aero.js");

self.addEventListener("install", () => self.skipWaiting());

function wrapLink(link) {
	const wrappedLink = link.replace(/:\d+:\d+$/g, "");

	return `<a href="${wrappedLink}">${wrappedLink}</a>`;
}
function fmtErr(stack) {
	return (
		stack
			// Put locations on a new line and tab
			.split("at ")
			.map(loc => loc.replace(/^(http:|https:).+/gm, m => wrapLink(m)))
			.join("<br>&emsp;")
			// Bold the error
			.replace(/(^[^:]*)(?:: )([^:]*)/g, "<b>$1</b>: <i>$2</i>")
			// Format the links
			.replace(/\(([^()]*)\)/gms, (_m, g1) => `(${wrapLink(g1)})`)
	);
}

self.addEventListener("fetch", async event =>
	event.respondWith(
		handle(event).catch(err => {
			setTimeout(() => {
				throw err;
			}, 500);
			return new Response(
				/* html */ `
<!DOCTYPE html>
<html>
	<body>
		<style>
			body {
				font-family: arial, sans-serif;
			}
			#err {
				font-family: monospace;
			}
		</style>
		<h1 id="title" style="color: red">Aero Bug</h1>
		<p id="err">${fmtErr(err.stack)}<br>${err.cause}<p>
    <script src="/scripts/sdk/ProxyManager.js">
      const proxyManager = new ProxyManager();
      proxyManager.add("/sw.js", prefix);
    </script>
	</body>
</html>
			`,
				{ headers: { "content-type": "text/html" }, status: 500 }
			);
		})
	)
);
