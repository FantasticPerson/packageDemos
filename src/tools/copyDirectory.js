/**
 * Created by dandan.wu on 2016/11/9.
 */

exports.copyDirectory = function (srcDir,destDir) {
    var fs = require('fs');
    var path = require('path');
    var outputPath = path.resolve(__dirname,destDir);
    var originPath = path.resolve(__dirname,srcDir);

    var copyFolder = require('stream-copy-dir');
    var handlebars = require('handlebars');

    function copyDir(originPath,outputPath) {
        copyFolder(originPath, outputPath)
            .once('error', console.error)
            .once('finish', function () {
                console.log('copied and modified without errors')
            })
    }

    function copyFile(originPath,outputPath){
        console.log(originPath);
        console.log(outputPath);
        var files = fs.readdirSync(originPath);
        if(files && files.hasOwnProperty('length') && files.length > 0){
            copyDir(originPath,outputPath);
            var copyFiles = function(files,originPath){
                copyDir(originPath,outputPath);
                files.map((nameItem)=>{
                    var srcPath = path.resolve(outputPath,'./'+nameItem);
                    var subPath = path.resolve(originPath,'./'+nameItem);
                    if(fs.statSync(subPath).isDirectory()){
                        var subFiles = fs.readdirSync(subPath);
                        fs.mkdirSync(srcPath);
                        copyFile(subPath,srcPath);
                    }
                })
            };
            copyFiles(files,originPath);
        }
    }

    copyFile(originPath,outputPath);
};