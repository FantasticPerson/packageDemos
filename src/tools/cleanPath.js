/**
 * Created by dandan.wu on 2016/11/9.
 */
var fs = require('fs');
var path = require('path');
var del = require('del');
var rootpath = path.resolve(__dirname,'../../');
var promiseNum = 0;

exports.cleanPath = function cleanPath(path2,cb){
    var mvSrc = path.resolve(rootpath,'./temp/resources/electron.asar');
    var mvDest = path.resolve(rootpath,'./temp/resources/electron.zip');
    var promiseArray = [];
    function renamesPromise(){
        return new Promise((resolve)=>{
            if(fs.existsSync(mvDest)) {
                resolve();
            }
            fs.rename(mvSrc, mvDest,function(){
                resolve();
            })
        });
    }
    promiseArray[0] = renamesPromise();
    function promiseRemove(path,isDir){
        return new Promise(function(resolve,reject){
            if(!fs.existsSync(path)){
                resolve();
            }
            var func = isDir ? fs.rmdirSync : fs.unlinkSync;
            func(path);
            resolve();
        })
    }
    var outputpath = path.resolve(rootpath,'./'+path2);
    var isExist = fs.existsSync(outputpath);
    if(!isExist) {
        cb();
        return;
    }
    fs.readdir(outputpath,function(err,files){
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
                    })
            }
        };
        if(files.length >= 0){
            promiseNum++;
            rmDir(files,outputpath);
        }
    });
};