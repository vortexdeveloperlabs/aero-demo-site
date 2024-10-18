import ProxyManager from "./sdk/ProxyManager.js";
//import stealth from "./sdk/stealth.js";
import Search from "./sdk/Search.js";

import initBareMux from "./initBareMux.js";

{
	const proxyManager = new ProxyManager();

	proxyManager.add("/sw.js", aeroConfig.prefix);

	const search = new Search();

	function getSearchEngine() {
		const defaultSearch = "google";

		return localStorage.getItem("search") || defaultSearch;
	}

	async function redirectTo(url) {
		await initBareMux();
		const frame = document.getElementById("frame");
		frame.style.display = "block";
		frame.src = aeroConfig.prefix + url;
	}

	function go(url) {
		redirectTo(
			url.includes(".") && !url.includes(" ")
				? url.substring(0, 4) === "http"
					? url
					: `https://${url}`
				: formatQuery(url)
		);
	}

	function formatQuery(query) {
		return `${search[getSearchEngine()].url() + query}`;
	}

	addEventListener("load", () => {
		const omnibox = document.getElementById("omnibox");

		const box = document.getElementById("box");

		if (
			omnibox instanceof HTMLInputElement &&
			box instanceof HTMLDivElement
		)
			omnibox.addEventListener("keyup", async event => {
				await initBareMux();

				if (event.key === "Enter") go(omnibox.value || "");
				else {
					// Search suggestions
					const query = omnibox.value;

					const entries = await search[getSearchEngine()].ac(query);

					const hasEntries = entries.length !== 0;

					// Reset the previous suggestions
					box.innerHTML = "";
					box.hidden = !hasEntries;

					if (hasEntries)
						for (const entry of entries) {
							// Create the link
							const link = document.createElement("a");

							link.onclick = () => {
								event.preventDefault();
								go(
									location.origin +
										aeroConfig.prefix +
										formatQuery(entry)
								);
							};
							link.text = entry;

							const line = document.createElement("br");

							box.appendChild(link);
							box.appendChild(line);
						}
				}
			});
	});
}
