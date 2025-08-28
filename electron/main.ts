import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { isDev } from "./util";

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    resizable: true,
    transparent: true,
    icon: path.join(__dirname, "../build/icon.ico"),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../out/index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.handle("window-minimize", () => {
  mainWindow?.minimize();
});

ipcMain.handle("window-maximize", () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.restore();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle("window-close", () => {
  mainWindow?.close();
});

ipcMain.handle("window-is-maximized", () => {
  return mainWindow?.isMaximized();
});
