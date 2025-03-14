import { ToggleTouchMode } from './../app.events';
import { ToggleTouchModeDataTransfer } from './apps/shared/context-brige.types';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { fileURLToPath } from 'url';

let mainWindow: BrowserWindow;
if (started) {
	app.quit();
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
	mainWindow = new BrowserWindow({
		fullscreen: false,
		resizable: true,
		transparent: true,
		frame: false,
		// skipTaskbar: true,
		// alwaysOnTop: true,
		focusable: true,
		// show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
	mainWindow.once('ready-to-show', () => {
		mainWindow.maximize();
		mainWindow.show();
		// mainWindow.webContents.openDevTools();
	});
	/* // Cho phép người dùng click xuyên qua phần trong suốt
	mainWindow.setIgnoreMouseEvents(true, { forward: true });

	// Bắt sự kiện khi hover vào notification để cho phép kéo thả
	ipcMain.on('enable-mouse-events', () => {
		mainWindow.setIgnoreMouseEvents(false);
	});

	ipcMain.on('disable-mouse-events', () => {
		mainWindow.setIgnoreMouseEvents(true, { forward: true });
	});

	// Ngăn focus vào cửa sổ khi click
	mainWindow.on('focus', () => {
		mainWindow.setIgnoreMouseEvents(true, { forward: true });
	}); */

	ipcMain.on(ToggleTouchMode, (_, data: ToggleTouchModeDataTransfer) => {
		console.log(`{} UI emit event with: `, data);
		if (data.state) {
		}
		//  mainWindow.setS()
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
