/**
 * Created by dandan.wu on 2016/11/9.
 */
exports.copyDirectory = function (srcDir,destDir,cb) {
    var fs = require('fs');
    var path = require('path');
    var rootPath = path.resolve(__dirname,'../../');
    var outputPath = path.resolve(rootPath,destDir);
    var originPath = path.resolve(rootPath,srcDir);

    var copyFolder = require('stream-copy-dir');
    var handlebars = require('handlebars');
    var funcNum = 0;
    var pathArray = [outputPath];
    var promiseTasks = [];

    function createPath() {
        console.log(pathArray);
        for(var i = 0; i< pathArray.length;i++){
            if(!fs.existsSync(pathArray[i])){
                fs.mkdirSync(pathArray[i]);
            }
        }
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
                    if(nameItem != 'electron.asar'){
                        if (fs.statSync(srcPath).isDirectory()) {
                            pathArray.push(subPath);
                            funcNum++;
                            copyFile(srcPath,subPath);
                        }
                    } else {
                        subPath = path.resolve(originPath, './' + 'electron.zip');
                        promiseTasks[promiseTasks.length] = copyDir(srcPath,subPath);
                    }
                });
                funcNum--;
                if(funcNum == 0){
                    createPath();
                    Promise.all(promiseTasks).then(function () {
                        var electronZipPath = path.resolve(outputPath,'./resources/electron.zip');
                        var electronZipPath2 = path.resolve(outputPath,'./resources/electron.asar');
                        if(fs.existsSync(electronZipPath)){
                            console.log("zipExist:"+fs.existsSync(electronZipPath));
                            fs.rename(electronZipPath, electronZipPath2,function (err) {
                                console.log(err);
                                console.log("all finished");
                                if(cb) {
                                    cb(true);
                                }
                            });
                        }
                    });
                }
            };
            copyFiles(files,originPath);
        }
    }
    funcNum++;
    copyFile(originPath,outputPath);
};