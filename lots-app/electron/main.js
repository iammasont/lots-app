const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window with frameless style to remove header
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#111111',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false, // This removes the header and default frame
    titleBarStyle: 'hidden'
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  
  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Create window when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when the dock icon is clicked and no windows are open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle file open dialog
ipcMain.handle('open-file-dialog', async (event, options) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(options);
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
});

// Handle saving LUT file
ipcMain.handle('save-lut', async (event, { content, defaultPath }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'CUBE Files', extensions: ['cube'] }
    ]
  });
  
  if (!canceled) {
    fs.writeFileSync(filePath, content);
    return filePath;
  }
  
  return null;
});

// Handle saving processed image
ipcMain.handle('save-image', async (event, { dataUrl, defaultPath }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'JPEG Images', extensions: ['jpg', 'jpeg'] },
      { name: 'PNG Images', extensions: ['png'] }
    ]
  });
  
  if (!canceled) {
    // Convert data URL to binary data
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, binaryData);
    return filePath;
  }
  
  return null;
});

// Handle saving preset
ipcMain.handle('save-preset', async (event, { content, defaultPath }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'LOTS Preset Files', extensions: ['lotspreset'] }
    ]
  });
  
  if (!canceled) {
    fs.writeFileSync(filePath, content);
    return filePath;
  }
  
  return null;
});

// Handle window controls
ipcMain.handle('window-control', (event, command) => {
  switch (command) {
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
      break;
    case 'close':
      mainWindow.close();
      break;
  }
});

// Handle app version request
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});