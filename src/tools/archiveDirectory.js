/**
 * Created by dandan.wu on 2016/11/9.
 */
exports.archiveDirectory = function(srcDir,destName,destDir,cb){
    const EZA=require('easy-zip-archiver');
    var path = require('path');
    var fs = require('fs');
    var cleanDest = require('./cleanPath').cleanPath;
    var rootPath = path.resolve(__dirname,'../../');

    cleanDest('destDir',archive);

    function archive() {
        var srcPath = path.resolve(rootPath,'./'+srcDir);
        var outpathDir = path.resolve(rootPath,'./'+destDir+'/'+destName+'.zip');
        var outpath = path.resolve(rootPath,'./'+destDir);
        console.log(srcPath);
        console.log(outpathDir);
        if(!fs.existsSync(outpath)){
            fs.mkdirSync(outpath);
        }
        var eza=EZA.create(outpathDir);

        eza.push(srcPath);
        eza.run().close();
        if(cb){
            cb();
        }
    }
};
