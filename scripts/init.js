// Set options
{
	const title = localStorage.getItem("title");
	const favicon = localStorage.getItem("favicon");

	function changeFavicon(url) {
		const link =
			document.querySelector("link[rel*='icon']") ||
			document.createElement("link");

		if (link instanceof HTMLLinkElement) {
			link.type = "image/x-icon";
			link.rel = "shortcut icon";
			link.href = url;

			document.getElementsByTagName("head")[0].appendChild(link);
		}
	}

	if (favicon) changeFavicon(favicon);
	if (typeof title === "string") document.title = title;

	// Colorway
	const root = document.querySelector(":root");
	if (root instanceof HTMLElement) {
		const bg = localStorage.getItem("bg");
		if (bg) root.style.setProperty("--bg", bg);
		const fg = localStorage.getItem("fg");
		if (fg) root.style.setProperty("--fg", fg);
	}
}
