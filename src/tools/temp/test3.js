/**
 * Created by dandan.wu on 2016/11/9.
 */
const EZA=require('easy-zip-archiver');
var path = require('path');

var srcPath = path.resolve(__dirname,'./output');
var outpathDir = path.resolve(__dirname,'./originPath/tt.zip');
var eza=EZA.create(outpathDir);

eza.push(srcPath);
eza.run().close();