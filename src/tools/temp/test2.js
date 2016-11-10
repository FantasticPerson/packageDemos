/**
 * Created by dandan.wu on 2016/11/8.
 */
var fs = require('fs');
var path = require('path');
// const streamCopyDir = require('stream-copy-dir')


var outputPath = path.resolve(__dirname,"./output");
var originPath = path.resolve(__dirname,"./packages/electron-lastest/True.test-win32-ia32");

var copyFolder = require('stream-copy-dir');
var handlebars = require('handlebars');

function copyDir(originPath,outputPath) {
    return new Promise(function (resolve,reject) {
        copyFolder(originPath, outputPath)
            .once('error', function (err) {
                console.log('copy failed');
                reject(err);
            })
            .once('finish', function () {
                console.log('copied and modified without errors');
                resolve("success");
            })
    });
}

var taskArray = [];

function copyFile(originPath,outputPath){
    var files = fs.readdirSync(originPath);
    if(files && files.hasOwnProperty('length') && files.length > 0){
        taskArray.push(copyDir(originPath,outputPath));
        var copyFiles = function(files,originPath){
            taskArray.push(copyDir(originPath,outputPath));
            files.map((nameItem)=>{
                var srcPath = path.resolve(outputPath,'./'+nameItem);
                var subPath = path.resolve(originPath,'./'+nameItem);
                if(fs.statSync(subPath).isDirectory()){
                    copyFile(subPath,srcPath);
                }
            })
        };
        copyFiles(files,originPath);
    }
}

copyFile(originPath,outputPath);

Promise.all(taskArray).then(function(){
    console.log("sfsdfsdf");
});
