import { ToggleTouchMode } from '../app.events';
import { ToggleTouchModeDataTransfer, UIContextBridge } from './apps/shared/context-brige.types';
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('UIContextBridge', <UIContextBridge>{
	toggleTouchMode: (data) => ipcRenderer.send(ToggleTouchMode, data),
});
