/**
 * Created by wudandan on 16/9/1.
 */


function clean(delPath){
    var mFs = require('fs');
    var mPath = require('path');
    var rmdir = function (dirPath) {
        var files = mFs.readdirSync(dirPath);
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {
                var filePath = mPath.join(dirPath, files[i]);
                if (mFs.statSync(filePath).isFile()) {
                    mFs.unlinkSync(filePath);
                } else {
                    rmdir(filePath);
                }
            }
        mFs.rmdirSync(dirPath);
    };

    try {
        rmdir(delPath);
        console.log('delete ok');
    } catch (e) {
        console.log(e.message);
    }
}

function createDic(name) {
    var path = require('path');
    var fs = require('fs');
    var resolvePath = path.resolve(__dirname,'./build/'+name);
    if(fs.existsSync(resolvePath)){
        return true;
    } else {
        fs.mkdirSync(resolvePath);
    }
}

function copyFile(dir1,dir2){
    var fs = require('fs');
    var readStream  = fs.createReadStream(dir1);
    var writeStream = fs.createWriteStream(dir2);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
        console.log('copy end');
    });
    readStream.on('error', function () {
        console.log('copy error');
    });
}
clean('./build');

var NwBuilder = require('nw-builder');

var nw = new NwBuilder({
    files: [
        './package.json',
        './index.html'
    ], // 包含文件
    platforms: ['win32'], // 打包的平台
    version: '0.14.7' // 使用 NW.js 的版本
});

nw.on('log', console.log); // 日志打印函数

//开始构建
nw.build().then(function(){
    //createDic('src');
    //createDic('PepperFlash');
    //copyFile('./src/index.html','./build/src/index.html');
    //copyFile('./PepperFlash/manifest.json','./build/PepperFlash/manifest.json');
    //copyFile('./PepperFlash/pepflashplayer.dll','./build/PepperFlash/pepflashplayer.dll');
    console.log('build complete!')
}).catch(function(err){
    console.log(err);
});

