var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;
var globalShortcut = require('global-shortcut');
require('crash-reporter').start();

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
  //mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.loadUrl('http://192.168.5.103:3002/trueWorkFlow/');
  //mainWindow.loadUrl('http://192.168.5.103:3002/trueOA/');
  //mainWindow.loadUrl('http://192.168.5.103:3002/trueOA/portalHome_portal.do');
  mainWindow.loadUrl('http://192.168.0.136:8881/TrueCMS/');

  mainWindow.maximize();
  //mainWindow.openDevTools();

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


