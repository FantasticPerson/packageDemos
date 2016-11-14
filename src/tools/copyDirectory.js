/**
 * Created by dandan.wu on 2016/11/9.
 */
exports.copyDirectory = function (srcDir,destDir,pluginList,cb) {
    var fs = require('fs');
    var path = require('path');
    var rootPath = path.resolve(__dirname,'../../');
    var originPath = path.resolve(rootPath,srcDir);
    var asar = require('original-fs-asar');
    var copyFolder = require('stream-copy-dir');
    var funcNum = 0;
    var pathArray = [destDir];
    var promiseTasks = [];
    var pluginArray = ['PepperFlash','fingerPrint'];
    var cleanPath = require('./cleanPath').cleanPath;

    function createPath() {
        for(var i = 0; i< pathArray.length;i++){
            if(!fs.existsSync(pathArray[i])){
                fs.mkdirSync(pathArray[i]);
            }
        }
    }

    function filter(nameItem) {
        if(pluginArray.indexOf(nameItem) >= 0){
            if(pluginList.indexOf(pluginArray.indexOf(nameItem)) >= 0){
                console.log(nameItem);
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    function copyDir(originPath,outputPath) {
        return new Promise(function (resolve,reject) {
            if(fs.existsSync(outputPath)){
                resolve();
            }
            copyFolder(originPath, outputPath)
                .once('error', function (err) {
                    reject(err);
                })
                .once('finish', function () {
                    resolve("success");
                })
        });
    }

    function copyFile(originPath,outputPath){
        var files = fs.readdirSync(originPath);
        if(files && files.hasOwnProperty('length') && files.length > 0){
            var copyFiles = function(files,originPath){
                promiseTasks[promiseTasks.length] = copyDir(originPath,outputPath);
                files.map((nameItem)=>{
                    var srcPath = path.resolve(originPath, './' + nameItem);
                    var subPath = path.resolve(outputPath, './' + nameItem);
                    if(nameItem != 'electron.asar' && nameItem != 'atom.asar'){
                        if (fs.statSync(srcPath).isDirectory()) {
                            if(filter(nameItem)) {
                                pathArray.push(subPath);
                                funcNum++;
                                copyFile(srcPath, subPath);
                            }
                        }
                    }
                });
            };
            copyFiles(files,originPath);
        }
        funcNum--;
        if(funcNum == 0){
            createPath();
            Promise.all(promiseTasks).then(function () {
                var asarDestPath1 = path.resolve(outputPath,'./resources/electron');
                var asarDestPath2 = path.resolve(outputPath,'./resources/atom');
                var asarDestPath;
                if(fs.existsSync(asarDestPath1+'.folder')) {
                    asarDestPath = asarDestPath1;
                } else if(fs.existsSync(asarDestPath2+'.folder')){
                    asarDestPath = asarDestPath2;
                }
                if(asarDestPath){
                    asar.createPackage(asarDestPath+'.folder',asarDestPath+'.asar',function () {
                        cleanPath(asarDestPath+'.folder',function(){
                            cb();
                        });
                    });
                }
                else {
                    cb();
                }
            });
        }
    }
    funcNum++;
    copyFile(originPath,destDir);
};