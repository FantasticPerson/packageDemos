/**
 * Created by dandan.wu on 2016/11/8.
 */

exports.winOld = function generateJson(needRefreshKey=false,needFlash=false,needFingerPrint,url="") {
    var returnJson = "/**\r\n";
    returnJson += " *Created by packageMaker jsonWin7Old\r\n";
    returnJson += (" *" + Date() + "\r\n");
    returnJson += " */\r\n";

    returnJson += "var app = require('app');\r\n";
    returnJson += "var BrowserWindow = require('browser-window');\r\n";
    returnJson += "var mainWindow = null;\r\n";
    returnJson += "var globalShortcut = require('global-shortcut');\r\n";
    returnJson += "var needToExecBat = true;\r\n";
    returnJson += "var path = require('path');\r\n";
    returnJson += "require('crash-reporter').start();\r\n";

    if(needFingerPrint) {
        returnJson += "if(needToExecBat) {\r\n";
        returnJson += "\tvar spawn = require('child_process').spawn;\r\n";
        returnJson += "\tvar bat = spawn('cmd.exe', [path.resolve(__dirname, './fingerPrint'), 'InstallOcx.bat']);\r\n";
        returnJson += "\tbat.stdout.on('data', function(data) {\r\n";
        returnJson += "\t\tconsole.log(data);\r\n";
        returnJson += "\t});\r\n";
        returnJson += "\tbat.stderr.on('data', function(data) {\r\n";
        returnJson += "\t\tconsole.log(data);\r\n";
        returnJson += "\t});\r\n";
        returnJson += "\tbat.on('exit', function(data) {\r\n";
        returnJson += "\t\tconsole.log(`Child exited with code ${code}`)\r\n";
        returnJson += "\t});\r\n";
        returnJson += "}\r\n";
    }

    returnJson += "app.on('window-all-closed', function() {\r\n";
    returnJson += "\tif (process.platform != 'darwin') {\r\n";
    returnJson += "\t\tapp.quit();\r\n";
    returnJson += "\t}\r\n";
    returnJson += "});\r\n";

    if(needFlash) {
        returnJson += "app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/ppapi-flash-path/PepperFlash/pepflashplayer.dll');\r\n";
        returnJson += "app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');\r\n";
    }
    returnJson += "app.commandLine.appendSwitch('disable-http-cache');\r\n";

    returnJson += "app.on('ready', function() {\r\n";
    returnJson += "\tmainWindow = new BrowserWindow(\r\n";
    returnJson += "\t{\r\n";
    returnJson += "\t\ttitle: '中威政务协同', width: 800, height: 600,\r\n";
    returnJson += "\t\t'web-preferences': {\r\n";
    returnJson += "\t\t\t'plugins': true,\r\n";
    returnJson += "\t\t\t'nodeIntegration':false\r\n";
    returnJson += "\t\t}\r\n";
    returnJson += "\t});\r\n";

    returnJson += "\tmainWindow.loadUrl('"+url+"');\r\n";
    returnJson += "\tmainWindow.maximize();\r\n";
    returnJson += "\t//mainWindow.openDevTools();\r\n";
    returnJson += "\tmainWindow.on('closed', function() {\r\n";
    returnJson += "\t\tmainWindow = null;\r\n";
    returnJson += "\t});\r\n";

    if(needRefreshKey) {
        returnJson += "\tglobalShortcut.register('f5',function(){\r\n";
        returnJson += "\t\tvar win = BrowserWindow.getFocusedWindow();\r\n";
        returnJson += "\t\tif(win){\r\n";
        returnJson += "\t\t\twin.reload();\r\n";
        returnJson += "\t\t}\r\n";
        returnJson += "\t});\r\n";
        returnJson += "});\r\n";
    }
    returnJson += "app.commandLine.appendSwitch('--enable-npapi');\r\n";

    return returnJson;
};

