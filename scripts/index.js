//import { prefix, backends } from "../aero/config.bundle.js";
const prefix = "/go/";
const backends = ["/bare/"];

import ProxyManager from "./sdk/ProxyManager.js";
//import stealth from "./sdk/stealth.js";
//import Search from "./sdk/Search.js";

{
	const proxyManager = new ProxyManager();

	proxyManager.add("/sw.ts", prefix);

	//const search = new Search(backends);

	function getSearchEngine() {
		const defaultSearch = "google";

		return localStorage.getItem("search") || defaultSearch;
	}

	function redirectTo(url) {
		const goto = location.origin + prefix + url;

		/*
		localStorage.getItem("stealth") === "true"
			? stealth(goto)
			: (location.href = goto);
    */
		location.href = goto;
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
		return query; //search[getSearchEngine()].url() + query.replace(/ /g, "+");
	}

	addEventListener("load", () => {
		const omnibox = document.getElementById("omnibox");

		const box = document.getElementById("box");

		if (
			omnibox instanceof HTMLInputElement &&
			box instanceof HTMLDivElement
		)
			omnibox.addEventListener("keyup", async event => {
				if (event.key === "Enter") go(omnibox.value || "");
				else {
					/*
					// Search suggestions
					const query = omnibox.value;

					const entries = await search[getSearchEngine()].ac(query);

					await search[getSearchEngine()].ac(query);

					const hasEntries = entries.length !== 0;

					// Reset the previous suggestions
					box.innerHTML = "";
					box.hidden = !hasEntries;

					if (hasEntries)
						for (const entry of entries) {
							// Create the link
							const link = document.createElement("a");

							link.href =
								location.origin + prefix + formatQuery(entry);
							link.text = entry;

							const line = document.createElement("br");

							box.appendChild(link);
							box.appendChild(line);
						}
										*/
				}
			});
	});
}
