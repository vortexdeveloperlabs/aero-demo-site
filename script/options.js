window.toggleStealth = () =>
	localStorage.setItem("stealth", !localStorage.getItem("stealth"));

window.changeSearch = () => {
	const dropdown = document.getElementById("dropdown");

	setCookie("search", dropdown.value);
};

const title = document.getElementById("title");
title.value = localStorage.getItem("title");
title.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		const value = event.target.value;

		localStorage.setItem("title", value);
	}
});

window.bg = document.getElementById("bg");
window.fg = document.getElementById("fg");
const clear = document.getElementById("clear");

const root = document.querySelector(":root");

function setColor(way, color) {
	localStorage.setItem(way, color);
	root.style.setProperty(`--${way}`, color);
	window[way].value = color;
}
function getColor(v) {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(`--${v}`)
		.slice(1);
}

const origBg = getColor("bg");
const origFg = getColor("fg");

// Reflect the current value
if (bg) bg.value = localStorage.getItem("bg") ?? getColor("bg");
if (fg) fg.value = localStorage.getItem("fg") ?? getColor("fg");

// Update to the new value
bg.addEventListener("change", event => setColor("bg", event.target.value));
fg.addEventListener("change", event => setColor("fg", event.target.value));
// Revert colors to default
clear.addEventListener("click", () => {
	setColor("bg", origBg);
	setColor("fg", origFg);
});

const box = document.getElementById("stealth");
if (localStorage.getItem("stealth")) box.checked = true;

const dropdown = document.getElementById("dropdown");
const engine = localStorage.getItem("search");
if (engine) dropdown.selected = engine;
