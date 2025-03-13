// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	showDonateOverlay: (x: number, y: number) => ipcRenderer.send('show-donate-overlay', { x, y }),
});
