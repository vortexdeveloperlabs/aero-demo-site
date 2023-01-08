const title = localStorage.getItem("title");
const favicon = localStorage.getItem("favicon");
const stealth = localStorage.getItem("stealth");

function changeFavicon(url) {
	var link =
		document.querySelector("link[rel*='icon']") ||
		document.createElement("link");

	link.type = "image/x-icon";
	link.rel = "shortcut icon";
	link.href = url;

	document.getElementsByTagName("head")[0].appendChild(link);
}

if (favicon) changeFavicon(favicon);
if (title) document.title = title;
