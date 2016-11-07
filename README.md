#True-Package
##nw-xp-support-new
####运行步骤
```
1.npm install
```
```
2.npm run start
```
####打包
```
1.node builder.js
```
```
2.打包出来的文件（TrueCms.zip）解压开来，
点击去 看到文件win32再点进去，看到src再点进去 ，里面有个index.html文件，
window.location = 'http://192.168.0.136:8881/TrueCMS/';
将上面这一行的URL改成你需要的URL
```
####已解决的问题
```
1.falsh 插件 
```

####待解决的问题

##nw-xp-support-older
####运行步骤
```
1.npm install
```
```
2.npm run start
```
####打包
```
1.node builder.js
```
```
2.打包出来的文件（TrueCms.zip）解压开来，
点击去 看到文件win32再点进去，看到src再点进去 ，里面有个index.html文件，
window.location = 'http://192.168.0.136:8881/TrueCMS/';
将上面这一行的URL改成你需要的URL
```
####已解决的问题
```
1.falsh 插件 不能按照官方的api文档去设置
通过下载一个绿色版的Chrome浏览器，将里面的PepperFlash这个文件夹拷贝出来，放到打包出来的文件夹里面
```
```
2.alert 会导致闪退  自己实现alert的功能
    方法：新建一个窗口，设置成alert的样式
    为了创建自定义的窗口，需要node环境去使用nw的api（通过设置package.json里面node-remote）
    重新alert方法（showAlert.js）
```
####待解决的问题
##electron-lastest
####运行步骤

```
1.npm install
```
```
2.npm run start
```
####打包
```
1.npm run build
```
```
2.打包出来的文件（True.test-win32-ia32.zip）解压开来，
找到resources 点击去 看到文件app再点进去，看到main.js 
mainWindow.loadURL('http://192.168.0.136:8881/TrueCMS/');
将上面这一行的URL改成你需要的URL
```
####已解决的问题
####待解决的问题
##electron-older
####运行步骤
```
1.npm install
```
```
2.npm run start
```
####打包
```
1.npm run build
```
```
2.打包出来的文件（True.test-win32-ia32.zip）解压开来，
找到resources 点击去 看到文件app再点进去，看到main.js 
mainWindow.loadURL('http://192.168.0.136:8881/TrueCMS/');
将上面这一行的URL改成你需要的URL
```
####已解决的问题
```
1.添加flash插件
```
```
2.添加快捷键刷新功能
```
```
3.解决窗口之间的通信问题
```
```
4.alert title
```
```
5.窗口打开全屏
```
```
6.require报错问题
```
```
7.新建可以自定义大小的窗口
```
```
8.iframe刷新问题，通过loadUrl的方法刷新
```
```
9.执行.bat文件
```
####待解决问题
```
1.crossDomain
```
```
2.语言环境被解析成英文（原本就是中文）
```
##chrome44-for-windows
####运行步骤
```
1.修改url，进入chrome文件夹，编辑start.bat
2.运行start.vbs
```
####已解决问题
```
1.设置主页，启动页后，将文件夹拷的别的机器上，设置失效，这是因为保存设置的文件里面会根据机器生成一个hash，机器变了文件就会重置，
 通过启动浏览器时同时打开需要打开的网页来解决此问题
```
####未解决问题

