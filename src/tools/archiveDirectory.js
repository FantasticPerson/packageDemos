/**
 * Created by dandan.wu on 2016/11/9.
 */
exports.archiveDirectory = function(srcDir,destName,destDir){
    const EZA=require('easy-zip-archiver');
    var path = require('path');

    var srcPath = path.join(__dirname,srcDir);
    var outpathDir = path.resolve(__dirname,'./'+destDir+'/'+destName+'.zip');
    var eza=EZA.create(outpathDir);

    eza.push(srcPath);
    eza.run().close();
};
