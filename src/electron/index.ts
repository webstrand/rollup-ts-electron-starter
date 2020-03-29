import { app, BrowserWindow } from "electron";
import { join as pathJoin } from "path";

app.allowRendererProcessReuse = true;
app.on("ready", createWindow);
app.on("window-all-closed", () => app.quit());
function createWindow(): void {
	const window = new BrowserWindow({
		title: "Hello World",
		webPreferences: {
			sandbox: true,
		},
	});
	window.webContents.openDevTools({ mode: "bottom" });
	window.loadFile(pathJoin(__dirname, "index.html"));
}
