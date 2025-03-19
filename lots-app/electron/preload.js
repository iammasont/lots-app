const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
  saveLut: (data) => ipcRenderer.invoke('save-lut', data),
  saveImage: (data) => ipcRenderer.invoke('save-image', data),
  savePreset: (data) => ipcRenderer.invoke('save-preset', data),
  windowControl: (command) => ipcRenderer.invoke('window-control', command),
  getAppVersion: () => ipcRenderer.invoke('get-app-version')
});