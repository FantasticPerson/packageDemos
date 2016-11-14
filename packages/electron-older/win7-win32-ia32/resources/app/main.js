var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;
var globalShortcut = require('global-shortcut');
var needToExecBat = false;
var path = require('path');
require('crash-reporter').start();

if(needToExecBat) {
  var spawn = require('child_process').spawn;
  var bat = spawn('cmd.exe', [path.resolve(__dirname, './fingerPrint'), 'InstallOcx.bat']);
  bat.stdout.on('data', function(data) {
    console.log(data);
  });
  bat.stderr.on('data', function(data) {
    console.log(data);
  });
  bat.on('exit', function(data) {
    console.log(`Child exited with code ${code}`)
  });
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/ppapi-flash-path/PepperFlash/pepflashplayer.dll');
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');
app.commandLine.appendSwitch('disable-http-cache');

app.on('ready', function() {
  mainWindow = new BrowserWindow({title: '中威政务协同', width: 800, height: 600, 'web-preferences': {'plugins': true},icon: 'file://' + __dirname + '/logo.ico'});
  mainWindow.loadUrl('https://www.baidu.com');

  mainWindow.maximize();
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var ret = globalShortcut.register('f5',function(){
    var win = BrowserWindow.getFocusedWindow();
    if(win){
      win.reload();
    }
  });

});

app.commandLine.appendSwitch('--enable-npapi');


