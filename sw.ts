importScripts("./aeroGit/dist/aero.sw.js");

self.addEventListener("install", () => self.skipWaiting());

function wrapLink(link: string) {
	link = link.replace(/:\d+:\d+$/g, "");

	return `<a href="${link}">${link}</a>`;
}
function fmtErr(stack: string) {
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

self.addEventListener("fetch", event => {
	return event.respondWith(
		self.handle(event).catch(
			err =>
				new Response(
					`
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
		<p id="err">${fmtErr(err.stack)}<p>
	</body>
</html>
			`,
					{ headers: { "content-type": "text/html" }, status: 500 }
				)
		)
	);
});
