"use scrict";

import { prefix, proxyApi } from "/aero/config.js";

import ProxyManager from "./sdk/ProxyManager.js";
import stealth from "./sdk/stealth.js";
import Search from "./sdk/Search.js";

const proxyManager = new ProxyManager();

proxyManager.add("/sw.js", prefix);

const search = new Search(proxyApi);

function getSearchEngine() {
	const defaultSearch = "google";

	return localStorage.getItem("search") || defaultSearch;
}

function redirectTo(url) {
	const goto = location.origin + prefix + url;

	localStorage.getItem("stealth") === "true"
		? stealth(goto)
		: (location.href = goto);
}

function go(url) {
	redirectTo(
		url.includes(".") && !url.includes(" ")
			? url.substring(0, 4) === "http"
				? url
				: "https://" + url
			: formatQuery(url)
	);
}

function formatQuery(query) {
	return search[getSearchEngine()].url() + query.replace(/ /g, "+");
}

window.addEventListener("load", () => {
	const omnibox = document.getElementById("omnibox");

	const box = document.getElementById("box");

	omnibox.addEventListener("keyup", async event => {
		if (event.key === "Enter") go(omnibox.value || "");
		else {
			// Search suggestions
			const query = event.target.value;

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

					link.href = location.origin + prefix + formatQuery(entry);
					link.text = entry;

					const line = document.createElement("br");

					box.appendChild(link);
					box.appendChild(line);
				}
		}
	});
});
