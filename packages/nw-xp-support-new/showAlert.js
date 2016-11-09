function setAlertFunc(){
    if(window.hasOwnProperty('require') && !window.hasOwnProperty('nodeRequire')){
        window.nodeRequire = window.require;
        delete window.require;
    }
    if(window.hasOwnProperty('nodeRequire')) {
        window.alert = function(msg=' ') {
            var date = Date.now();
            var gui = nodeRequire('nw.gui');
            gui.Window.open('http://10.10.61.104:8080/index.html?msg=' + msg + '&data=' + date, {
                fullscreen: false,
                always_on_top: true,
                resizable: false,
                frame: false,
                width: 400,
                height: 120
            });
        }
    }
}

function checkIsNodeEnviroment(){
    if(window.hasOwnProperty('require') && !window.hasOwnProperty('nodeRequire')){
        window.nodeRequire = window.require;
        delete window.require;
    }
}
            