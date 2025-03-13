import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

let mainWindow: BrowserWindow;
if (started) {
	app.quit();
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		transparent: true, // Nền trong suốt
		frame: false, // Không hiển thị viền cửa sổ
		// skipTaskbar: true, // Không hiển thị trên taskbar
		// alwaysOnTop: true, // Luôn hiển thị trên cùng
		// focusable: false, // Không nhận focus từ hệ thống
		// resizable: false, // Không cho phép resize
		// show: false, // Không hiển thị ngay khi khởi tạo
		webPreferences: {
			/* nodeIntegration: false,
			contextIsolation: true, */
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	//mainWindow.setPosition(20, height - 170);
	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.webContents.openDevTools();
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
