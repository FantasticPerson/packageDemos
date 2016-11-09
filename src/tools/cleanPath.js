/**
 * Created by dandan.wu on 2016/11/9.
 */
var fs = require('fs');
var path = require('path');

exports.cleanPath = function cleanPath(path){
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
};