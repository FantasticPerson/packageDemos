/**
 * Created by dandan.wu on 2016/11/8.
 */
exports.generatePackage = function generateMainJs(platformIndex,pluginType,pluginList,appName,url,savePath){
    let path = require('path');
    let cleanPath = require('./tools/cleanPath').cleanPath;
    let copyDir = require('./tools/copyDirectory').copyDirectory;
    let archive = require('./tools/archiveDirectory').archiveDirectory;
    let winNewPath = 'packages/electron-lastest/win7-win32-ia32';
    let winOldPath = 'packages/electron-older/win7-win32-ia32';
    let chromePath = 'packages/chrome44';
    let generateMainJson = require('./tools/generateMainJson').generateMainJson;
    let btn = document.getElementById('generateBtn');
    let infoDiv = document.getElementById('progressInfo');
    let generateChromeJson = require('./tools/generateChromeJson').generateJson;
    btn.disabled = true;
    // infoDiv.innerText = "1/4 清理空间...";
    // cleanPath(path.resolve(savePath,'./win32'),copyFiles);
    // function copyFiles(){
        infoDiv.innerText = "1/2 复制内容...";
        if(platformIndex == 0){
            var winPath = [winNewPath,winOldPath][pluginType];
            copyDir(winPath,path.resolve(savePath,'./'+appName),pluginList,generateJson);
        } else {
            copyDir(chromePath,path.resolve(savePath,'./'+appName),pluginList,generateChromeJson2);
        }
    // }
    function generateJson() {
        infoDiv.innerText = "2/2 生成配置文件...";
        console.log("pluginList:"+pluginList);
        var needFlash = pluginList.indexOf(0) >= 0;
        var needFingetPrint = pluginList.indexOf(0) >= 0;
        generateMainJson(pluginType,true,needFlash,needFingetPrint,url,path.resolve(savePath,'./'+appName),complete);
    }
    // function generateChromeJson2(){
    //     let needFingerPrint = pluginList.indexOf(1) >= 0;
    //     infoDiv.innerText = "3/4 生成配置文件...";
    //     generateChromeJson(needFingerPrint,url,compress);
    // }
    // function compress() {
    //     infoDiv.innerText = "4/4 压缩文件...";
    //     archive('temp',appName,'output',complete);
    // }
    function complete(){
        infoDiv.innerText = '';
        btn.disabled = false;
        alert("生成成功");
    }
};