window.toggleStealth = () =>
	localStorage.setItem("stealth", !localStorage.getItem("stealth"));

window.changeSearch = () => {
	const dropdown = document.getElementById("dropdown");

	setCookie("search", dropdown.value);
};

window.addEventListener("load", () => {
	const title = document.getElementById("title");
	title.addEventListener("keyup", event => {
		if (event.key === "Enter") {
			const value = event.target.value;

			localStorage.setItem("title", value);
		}
	});

	const box = document.getElementById("stealth");
	if (localStorage.getItem("stealth")) box.checked = true;

	const engine = localStorage.getItem("search");
	const dropdown = document.getElementById("dropdown");
	if (engine) dropdown.selected = engine;
});
