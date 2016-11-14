/**
 * Created by dandan.wu on 2016/11/10.
 */
exports.generateJson = function (needFingerPrint=false,url="",cb) {
    var fs = require('fs');
    var path = require('path');
    var destPath = path.resolve(__dirname,'../../win32/chrome/start.bat');
    var returnJson = '';
    returnJson += 'set b=%cd%\r\n';
    if(needFingerPrint) {
        returnJson += 'regsvr32 \"\%cd\%\\fingerPrint\\FignerPrints_ActiveX.ocx\"\r\n';
    }
    returnJson += 'chrome.exe  '+url+'\r\n';
    returnJson += 'exit';

    fs.writeFile(destPath,returnJson,function (err) {
        if(err){
            if(cb){
                cb(false);
            }
            console.log(err);
        } else {
            if(cb) {
                cb(true);
            }
        }
    });
};
