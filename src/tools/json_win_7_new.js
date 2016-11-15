/**
 * Created by dandan.wu on 2016/11/8.
 */
exports.winNew =  function getMainJson(needRefreshKey=false,needFlash=false,needFingerPrint,url=""){
    var returnJson = "/**\r\n";
    returnJson += " *Created by packageMaker jsonWin7New\r\n";
    returnJson += (" *"+Date()+"\r\n");
    returnJson += " */\r\n";

    returnJson += "const electron = require('electron');\r\n";
    if(needRefreshKey) {
        returnJson += "const {globalShortcut} = require('electron');\r\n";
    }
    returnJson += "const app = electron.app;\r\n";
    returnJson += "const BrowserWindow = electron.BrowserWindow;\r\n";
    returnJson += "let mainWindow;\r\n";

    returnJson += "function createWindow() {\r\n";
    returnJson += "\tconst {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;\r\n";
    returnJson += "\tmainWindow = new BrowserWindow({\r\n";
    returnJson += "\t\twidth, height, webPreferences: {\r\n";
    returnJson += "\t\t\tnodeIntegration: false,\r\n";
    returnJson += "\t\t\tplugins: true\r\n";
    returnJson += "\t\t}\r\n";
    returnJson += "\t});\r\n";
    returnJson += "\tmainWindow.loadURL('"+url+"');\r\n";
    returnJson += "\t//mainWindow.webContents.openDevTools();\r\r";
    returnJson += "\tmainWindow.on('closed', function () {\r\n";
    returnJson += "\t\tmainWindow = null;\r\n";
    returnJson += "\t});\r\n";

    if(needRefreshKey) {
        returnJson += "\tglobalShortcut.register('f5', function () {\r\n";
        returnJson += "\t\tvar win = BrowserWindow.getFocusedWindow();\r\n";
        returnJson += "\t\tif (win) {\r\n";
        returnJson += "\t\t\tvar contents = win.webContents;\r\n";
        returnJson += "\t\t\tcontents.reloadIgnoringCache();\r\n";
        returnJson += "\t\t}\r\n";
        returnJson += "\t});\r\n";
    }
    returnJson += "}\r\n";

    if(needFlash) {
        returnJson += "app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/pepflashplayer.dll');\r\n";
        returnJson += "app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');\r\n";
    }

    returnJson += "app.on('ready', createWindow);\r\n";
    returnJson += "app.on('window-all-closed', function () {\r\n";
    returnJson += "\tif (process.platform !== 'darwin') {\r\n";
    returnJson += "\t\tapp.quit()\r\n";
    returnJson += "\t}\r\n";
    returnJson += "});\r\n";

    returnJson += "app.on('activate', function () {\r\n";
    returnJson += "\tif (mainWindow === null) {\r\n";
    returnJson += "\t\tcreateWindow()\r\n";
    returnJson += "\t}\r\n";
    returnJson += "});\r\n";

    return returnJson;
};




