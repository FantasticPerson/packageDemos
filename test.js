/**
 * Created by dandan.wu on 2016/11/8.
 */
var fs = require('fs');
var path = require('path');
var outputPath = path.resolve(__dirname,'./output');
var  hello= require('./json_win_7_old').winOld;
function cleanPath(path){
    var isExist = fs.existsSync(outputPath);
    if(!isExist) {
        console.log("dirctory or file is not exist");
        return;
    }
    fs.readdir(outputPath,function(err,files){
        var rmDir = function(files,dir){
            files.map(function(nameItem){
                var subPath = path.resolve(dir,'./'+nameItem);
                if(fs.statSync(subPath).isDirectory()){
                    var subFiles = fs.readdirSync(subPath);
                    rmDir(subFiles,subPath);
                } else {
                    fs.unlinkSync(subPath);
                }
            });
            fs.rmdirSync(dir);
        };
        if(files.length > 0){
            rmDir(files,outputPath);
        }
    })
}
function createPath(dirName){
    var pathName = path.resolve(__dirname,'./'+dirName);
    fs.mkdirSync(pathName);
}

function generateMainJs(appName,plugInType,plugInList){
    var fileName = path.resolve(outputPath,'./main.js');
    fs.writeFile(fileName,hello(),function (err) {
        if(err){
            console.log(err);
        }
    });
}

generateMainJs();
