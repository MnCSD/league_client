"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electronAPI = {
    getAppVersion: () => electron_1.ipcRenderer.invoke('get-app-version'),
    windowMinimize: () => electron_1.ipcRenderer.invoke('window-minimize'),
    windowMaximize: () => electron_1.ipcRenderer.invoke('window-maximize'),
    windowClose: () => electron_1.ipcRenderer.invoke('window-close'),
    windowIsMaximized: () => electron_1.ipcRenderer.invoke('window-is-maximized'),
};
electron_1.contextBridge.exposeInMainWorld('electronAPI', electronAPI);
