/**
 * Created by dandan.wu on 2016/11/10.
 */
exports.generateMainJson = function(pluginType=0,needRefreshKey=false,needFlash=false,url="",cb){
    let winNewGenerate = require('./json_win_7_new').winNew;
    let winOldGenerate = require('./json_win_7_old').winOld;
    let generateFunc = pluginType == 0 ? winNewGenerate : winOldGenerate;
    let mainJson = generateFunc(needRefreshKey,needFlash,url);
    let path = require('path');
    let fs = require('fs');
    let writePath = path.resolve(__dirname,'../../temp/resources/app/main.js');
    console.log(fs.existsSync(writePath));
    fs.writeFile(writePath,mainJson,function (err) {
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