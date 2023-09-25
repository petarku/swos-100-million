const { app, BrowserWindow } = require('electron');

// Initialize the @electron/remote module
require('@electron/remote/main').initialize();

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,  // This is set to false for demonstration purposes. For production, consider using IPC.
            enableRemoteModule: true  // Required for 'electron.remote' to work
        }
    });

    // Enable @electron/remote for this BrowserWindow
    require('@electron/remote/main').enable(win.webContents);

    // Load the index.html of the app.
    win.loadFile('index.html');

    // Open the DevTools. (optional)
    // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
