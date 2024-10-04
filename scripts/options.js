const toggleStealth = () =>
	localStorage.setItem(
		"stealth",
		(!localStorage.getItem("stealth")).toString()
	);

const changeSearch = () => {
	const dropdown = document.getElementById("dropdown");
	if (dropdown instanceof HTMLSelectElement)
		setCookie("search", dropdown.value);
};

const title = document.getElementById("title");
if (title instanceof HTMLInputElement) {
	const titleItem = localStorage.getItem("title");
	if (titleItem) {
		title.value = titleItem;
		title.addEventListener("keyup", event => {
			if (event.key === "Enter") {
				const value = title.value;

				localStorage.setItem("title", value);
			}
		});
	}
}

const bg = document.getElementById("bg");
const fg = document.getElementById("fg");

const clear = document.getElementById("clear");
const root = document.querySelector(":root");

function setColor(way, color) {
	localStorage.setItem(way, color);
	if (root instanceof HTMLElement) root.style.setProperty(`--${way}`, color);
	window[way].value = color;
}
function getColor(color) {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(`--${color}`)
		.slice(1);
}

const origBg = getColor("bg");
const origFg = getColor("fg");

// Reflect the current value
if (bg instanceof HTMLLabelElement) {
	const input = document.getElementById(bg.htmlFor);
	if (input instanceof HTMLInputElement && input.type === "color")
		input.value = localStorage.getItem("bg") ?? getColor("bg");
}
if (fg) {
	fg.value = localStorage.getItem("fg") ?? getColor("fg");
}

// Update to the new value
bg.addEventListener("change", () => setColor("bg", bg.value));
fg.addEventListener("change", () => setColor("fg", bg.value));
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
