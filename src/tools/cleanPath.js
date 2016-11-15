/**
 * Created by dandan.wu on 2016/11/9.
 */
var fs = require('fs');
var path = require('path');
var asar = require('original-fs-asar');
var promiseNum = 0;

exports.cleanPath = function cleanPath(path2,cb){
    var promiseArray = [];
    var mvSrc1 = path.resolve(path2,'./resources/electron');
    var mvSrc2 = path.resolve(path2,'./resources/atom');
    var mvSrc;
    if(fs.existsSync(mvSrc1+'.asar')){
        mvSrc = mvSrc1;
    } else if(fs.existsSync(mvSrc2+'.asar')){
        mvSrc = mvSrc2;
    }
    if(mvSrc){
        fs.renameSync((mvSrc+'.asar'), (mvSrc+'.zip'));
    }
    function promiseRemove(path,isDir){
        return new Promise(function(resolve){
            if(!fs.existsSync(path)){
                resolve();
            }
            var func = isDir ? fs.rmdirSync : fs.unlinkSync;
            func(path);
            resolve();
        })
    }
    var isExist = fs.existsSync(path2);
    if(!isExist) {
        cb();
        return;
    }
    fs.readdir(path2,function(err,files){
        var rmDir = function(files,dir){
            files.map(function(nameItem){
                var subPath = path.resolve(dir,'./'+nameItem);
                if(fs.statSync(subPath).isDirectory()){
                    var subFiles = fs.readdirSync(subPath);
                    promiseNum++;
                    rmDir(subFiles,subPath);
                } else {
                    promiseArray[promiseArray.length] = promiseRemove(subPath,false)
                }
            });
            promiseArray[promiseArray.length] = promiseRemove(dir,true);
            promiseNum--;
            if(promiseNum == 0){
                Promise.all(promiseArray)
                    .then(function () {
                        cb();
                    })
                    .catch(function (err){
                        console.log(err);
                    });
            }
        };
        if(files.length >= 0){
            promiseNum++;
            rmDir(files,path2);
        }
    });
};