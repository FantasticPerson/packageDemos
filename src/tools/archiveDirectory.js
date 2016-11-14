/**
 * Created by dandan.wu on 2016/11/9.
 */
exports.archiveDirectory = function(srcDir,destName,destDir,cb){
    const EZA=require('easy-zip-archiver');
    var path = require('path');
    var fs = require('fs');
    var cleanDest = require('./cleanPath').cleanPath;
    var rootPath = path.resolve(__dirname,'../../');
    var atomZipPath = path.resolve(rootPath,'./'+srcDir+'/resources/atom.zip');
    var atomZipPath2 = path.resolve(rootPath,'./'+srcDir+'/resources/atom.asar');
    var electronZipPath = path.resolve(rootPath,'./'+srcDir+'/resources/electron.zip');
    var electronZipPath2 = path.resolve(rootPath,'./'+srcDir+'/resources/electron.asar');
    var asar = require('original-fs-asar');
    // var dest = path.resolve(__dirname,'../../77.asar');
    // var src = path.resolve(__dirname,'../../ff');
    // asar.createPackage(src,dest,function(err){
    //     console.log(err);
    // });


    // cleanDest(destDir,archive);
    //
    // function archive(){
    //     var spawn = require('child_process').spawn;
    //     console.log();
    //     var bat = spawn('cmd.exe', [path.resolve(__dirname, './archiveTool'), 'archive.bat']);
    //     bat.stdout.on('data', function(data) {
    //         console.log(data);
    //     });
    //     bat.stderr.on('data', function(data) {
    //         console.log(data);
    //     });
    //     bat.on('exit', function(data) {
    //         console.log(`Child exited with code ${code}`)
    //     });
    // }
    /*function rename() {
        if(fs.existsSync(atomZipPath)){
            fs.rename(atomZipPath,atomZipPath2,function () {
                archive()
            })
        } else if(fs.existsSync(electronZipPath)){
            fs.rename(electronZipPath,electronZipPath2,function () {
                archive()
            })
        } else {
            archive();
        }
    }

    function archive() {
        var srcPath = path.resolve(rootPath,'./'+srcDir);
        var outpathDir = path.resolve(rootPath,'./'+destDir+'/'+destName+'.zip');
        var outpath = path.resolve(rootPath,'./'+destDir);
        if(!fs.existsSync(outpath)){
            fs.mkdirSync(outpath);
        }
        var eza=EZA.create(outpathDir);

        eza.push(srcPath);
        eza.run().close();
        if(cb){
            cb();
        }
    }*/
};
