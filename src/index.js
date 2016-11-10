/**
 * Created by dandan.wu on 2016/11/8.
 */
exports.generatePackage = function generateMainJs(appName,pluginType,pluginList){
    let path = require('path');
    let rootPath = path.resolve(__dirname,'../');
    let generateWin7NewMain = require('./tools/json_win_7_new').winNew;
    let generateWin7OldMain = require('./tools/json_win_7_old').winOld;
    let generateWinFunc = pluginType == 0 ? generateWin7NewMain : generateWin7OldMain;
    let cleanPath = require('./tools/cleanPath').cleanPath;
    let copyDir = require('./tools/copyDirectory').copyDirectory;
    let archive = require('./tools/archiveDirectory').archiveDirectory;
    let winNewPath = 'packages/electron-lastest/True.test-win32-ia32';
    let winOldPath = 'packages/electron-older/True.test-win32-ia32';
    let generateMainJson = require('./tools/generateMainJson').generateMainJson;
    var btn = document.getElementById('generateBtn');
    var infoDiv = document.getElementById('progressInfo');
    btn.disabled = true;
    infoDiv.innerText = "1/4 清理空间...";
    cleanPath('temp',copyFiles);
    function copyFiles(){
        infoDiv.innerText = "2/4 复制内容...";
        copyDir(winNewPath,'temp',generateJson);
    }
    function generateJson() {
        infoDiv.innerText = "3/4 生成配置文件...";
        generateMainJson(0,true,true,"https://www.baidu.com",compress);
    }
    function compress() {
        infoDiv.innerText = "4/4 压缩文件...";
        archive('temp','archive','output',complete);
    }
    function complete(){
        infoDiv.innerText = '';
        btn.disabled = false;
        alert("生成成功");
    }
};