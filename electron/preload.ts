import { contextBridge, ipcRenderer } from 'electron';

export interface IElectronAPI {
  getAppVersion: () => Promise<string>;
  windowMinimize: () => Promise<void>;
  windowMaximize: () => Promise<void>;
  windowClose: () => Promise<void>;
  windowIsMaximized: () => Promise<boolean>;
}

const electronAPI: IElectronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);