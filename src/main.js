const { ipcMain } = require("electron");
const electron = require("electron");
const subscribe = require("./marker-subscriber");
const { poi } = require("../src/poi-data");
const { PointOfInterest } = require("./model/marker");
const { POIDataService } = require("./services/marker-service");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
let mainWindow;

app.on("ready", (_) => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile("src/index.html");

  mainWindow.on("closed", (_) => {
    console.log("closed");
    mainWindow = null;
  });
});
