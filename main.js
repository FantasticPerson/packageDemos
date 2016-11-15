const electron = require('electron');
const {globalShortcut} = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    // const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    var width = 1220;
    var height = 730;
    mainWindow = new BrowserWindow({
        width, height, webPreferences: {
            nodeIntegration: true,
            plugins: true
        },
        maximizable:false,
        resizable:false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    var ret = globalShortcut.register('f5', function () {
        var win = BrowserWindow.getFocusedWindow();
        if (win) {
            var contents = win.webContents;
            contents.reloadIgnoringCache();
        }
    });
}

app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/pepflashplayer.dll');
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');
app.commandLine.appendSwitch('--enable-npapi');

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});


