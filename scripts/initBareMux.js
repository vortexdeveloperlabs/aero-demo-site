const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

const wispUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${
	location.host
}/wisp/`;

export default async () => {
	if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
};
