const root = document.querySelector(":root");

const searchDropdown = document.getElementById("search-dropdown");
searchDropdown.value = localStorage.getItem("search") ?? "google";
searchDropdown.addEventListener("change", event =>
	localStorage.setItem("search", event.target.value)
);

const getColor = color => {
	return (
		"#" +
		getComputedStyle(document.documentElement)
			.getPropertyValue(`--${color}`)
			.slice(1)
	);
};

const bg = document.getElementById("bg");
bg.value = localStorage.getItem("bg") ?? getColor("bg");
const setbgColor = event => {
	localStorage.setItem("bg", event.target.value);
	if (root instanceof HTMLElement)
		root.style.setProperty("--bg", event.target.value);
	window["bg"].value = event.target.value;
};
bg.addEventListener("change", event => setbgColor(event));

const fg = document.getElementById("fg");
fg.value = localStorage.getItem("fg") ?? getColor("fg");
const setfgColor = event => {
	localStorage.setItem("fg", event.target.value);
	if (root instanceof HTMLElement)
		root.style.setProperty("--fg", event.target.value);
	window["fg"].value = event.target.value;
};
fg.addEventListener("change", event => setfgColor(event));

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
	bg.value = getColor("bg");
	fg.value = getColor("fg");
});

const title = document.getElementById("title");
title.value = localStorage.getItem("title") ?? "aero";
title.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		localStorage.setItem("title", event.target.value);
	}
});

const transportDropdown = document.getElementById("transport-dropdown");
transportDropdown.value =
	localStorage.getItem("transport-path") ?? "/libcurl/index.mjs";
transportDropdown.addEventListener("change", event =>
	localStorage.setItem("transport-path", event.target.value)
);

const wispUrl = document.getElementById("wisp-url");
wispUrl.value =
	localStorage.getItem("wisp-url") ??
	`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/wisp/`;
wispUrl.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		localStorage.setItem("wisp-url", event.target.value);
	}
});

const bareUrl = document.getElementById("bare-url");
bareUrl.value =
	localStorage.getItem("bare-url") ??
	`${location.protocol}//${location.host}/bare/`;
bareUrl.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		localStorage.setItem("bare-url", event.target.value);
	}
});
