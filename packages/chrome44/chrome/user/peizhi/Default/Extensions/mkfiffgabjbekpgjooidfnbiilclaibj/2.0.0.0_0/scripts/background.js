function $(id) {
	return document.getElementById(id);
}

function kwsNavigate(id,url)
{
	if (0 == url.length)
	{
		return;
	}
	
	chrome.tabs.update(id,{"url":url});
}

function OnClose(id, obj)
{
	kwsNotifyClose(id, "null");
}

function OnCreate(tab)
{
	if (0 == tab.url.length || tab.url.match(/^chrome/)) 
	{
		return;
	}
	kwsCheckUrl(tab.id, tab.url);
}

function OnUpdate(tabId, obj, tab)
{
	if (0 == tab.url.length || tab.url.match(/^chrome/))
	{
		return;
	}
	
	if (obj.status == "loading")
		kwsCheckUrl(tabId, tab.url);
	else if (obj.status == "complete")
		kwsNPComplete(tabId, tab.url, tab.title);
}
chrome.tabs.onRemoved.addListener(OnClose);
chrome.tabs.onCreated.addListener(OnCreate);
chrome.tabs.onUpdated.addListener(OnUpdate);

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

		if ("fish" == request.type)
			kwsCheckContent(request.url, request.title, request.body, request.keyword, request.description);
		else if ("npcompletenotify" == request.type)
			kwsNPCompleteNotify(request.url, request.from, request.np);
		else if ("graycheck" == request.type)
			kwsGrayCheck(request.title, request.url, request.referrer, request.body);
		else if ("report" == request.type)
			kwsReport(JSON.stringify(request));
		else if ("beforeWeiboMark" == request.type) {
			setTimeout(function(){kwsWeiboMark(sender.tab.id, request.url, request.from);}, 10);
		}
		else if ("capture" == request.type) {
			capturePortion(sender.tab.id, request);
		}
        else if ("markSetting" == request.type) {
            setTimeout(function(){kwsMarkSetting();}, 10);
        }
        else if ("openWeiboMarkLog" == request.type) {
            setTimeout(function(){kwsOpenWeiboMarkLog();}, 10);
        } 
        else if ("launch" == request.type) {
        	if (port == null) 
        	{
        		connectToNativeHost(request.message);
        	}
        } 
        else if("tempWhite" == request.type) {
        	kwsTempWhite(request.url);
        }
			
  });

function kwsGetContent(tabId, flags)
{
	chrome.tabs.executeScript(tabId, {file:"scripts\\content.js"}, function(){
	chrome.tabs.sendRequest(tabId, {f: flags});});
}
function kwsInject(tabId, s, inSameContext)
{
    var script;
    if (inSameContext == true) {
        script = 'var c = Math.random().toString().substr(2);\
                a = document.createElement("script");\
                a.id = c;\
                a.type = "text/javascript";\
                a.innerHTML = "' + s + '"+";document.documentElement.removeChild(document.getElementById(" + c + "));";document.documentElement.appendChild(a);';
    }
    else {
        script = s;
    }
	chrome.tabs.executeScript(tabId, {code:script},function(){});
}

function capturePortion(tabId, request) {
	setTimeout(function(){kwsSaveCaptureImg(tabId, JSON.stringify(request));}, 10);
}

function kwsSendRequest(tabId, action, str, first) {
    chrome.tabs.sendRequest(tabId, {a:action, s:str, f:first});
}

function kwsForwardWeibo(tabId, imgUrl, text) {
    if (text.length == 0) return;
    if (imgUrl == "null") imgUrl = "";
    chrome.tabs.get(tabId, function(tab){
        var tpl;
        if(tab.url.match(/http:\/\/(.*?\.)?weibo\.com/)) {
            tpl = 'http://service.weibo.com/share/share.php?url=&appkey=&title=' + encodeURIComponent(text) + '&pic=' + imgUrl + '&ralateUid=&language=zh_cn';
        } else {
            tpl = 'http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&url=&appkey=&assname=&title=' + encodeURIComponent(text) + '&pic=' + imgUrl;
        }
        chrome.tabs.create({openerTabId:tabId, url:tpl}); 
    });
}

function kwsNotifyClose(tabId,url)
{
	var json = {
				"Function": "kwsNotifyClose",
				"TabId": tabId,
				"Url":url
				};

	sendNativeMessage(json);
}

function kwsCheckUrl(tabId,url)
{

	var json = {
				"Function": "kwsCheckUrl",
				"TabId": tabId,
				"Url":url
				};

	sendNativeMessage(json);
}

function kwsNPComplete(tabId,url,title)
{
	var json = {
				"Function": "kwsNPComplete",
				"TabId": tabId,
				"Url":url,
				"Title":title
				};

	sendNativeMessage(json);
}

function kwsOpenKnpbox(cmd,param)
{
	var json = {
				"Function": "kwsOpenKnpbox",
				"Cmd": cmd,
				"Param":param
				};

	sendNativeMessage(json);
}

function kwsCheckContent(url, title, body, keyword, description)
{
	var json = {
				"Function": "kwsCheckContent",
				"Url": url,
				"Title":title,
				"Body":body,
				"Keyword":keyword,
				"Description":description
				};

	sendNativeMessage(json);
}

function kwsNPCompleteNotify(url, from, np)
{
	var json = {
				"Function": "kwsNPCompleteNotify",
				"Url": url,
				"From":from,
				"Amount":np 
				};

	sendNativeMessage(json);
}

function kwsGrayCheck(title, url, referrer, body) 
{
	var json = {
				"Function": "kwsGrayCheck",
				"Url": url,
				"Title":title,
				"Body":body,
				"Referrer":referrer 
				};

	sendNativeMessage(json);
}

function kwsReport(message)
{
	var json = {
				"Function": "kwsReport",
				"Message": message 
				};

	sendNativeMessage(json);
}

function kwsWeiboMark(tabId, url, from)
{
	var json = {
				"Function": "kwsGrayCheck",
				"Url": url,
				"From":from,
				"TabId":tabId
				};

	sendNativeMessage(json);
}

function kwsMarkSetting()
{
	var json = {
				"Function": "kwsMarkSetting" 
				};

	sendNativeMessage(json);
}

function kwsOpenWeiboMarkLog()
{
	var json = {
				"Function": "kwsOpenWeiboMarkLog" 
				};

	sendNativeMessage(json);
}

function kwsSaveCaptureImg(tabId, message)
{
	var json = {
				"Function": "kwsSaveCaptureImg" ,
				"TabId":tabId,
				"Info":message
				};

	sendNativeMessage(json);
}

function kwsTempWhite(url)
{
	var json = {
			"Function":"kwsTempWhite",
			"Url":url
	};
	sendNativeMessage(json);
}

var appLauncher = 
{
	
	StartKnpbox : function()
	{
		kwsOpenKnpbox('-from:20 -show:exposure -skip', 'StartKnpbox');
	},
	CreateTab : function( param )
	{
		chrome.tabs.create({url:param});
	},

	Init : function()
	{
		connectToNativeHost();
	},
};

var port = null; 


//onNativeDisconnect
function onDisconnected()
{
	console.log(chrome.runtime.lastError);
	console.log('disconnected from native app.');
	port = null;
}

function onRecievedNativeMessage(message) {
	console.log('recieved message from native app: ' + JSON.stringify(message));
	var func = message["Function"];
	if (func == "kwsNavigate")
	{
		var id = message["TabId"];
		var url = message["NavigateUrl"];
		kwsNavigate(id,url);
	}
	else if (func == "kwsGetContent") 
	{
		var id = message["TabId"];
		var updateFlag = message["UploadFlag"]; 	
		kwsGetContent(id,updateFlag);
	} 
	else if (func == "kwsInject") 
	{
		var id = message["TabId"];
		var res = message["Res"]; 	
		var inSameContext = message["InSameContext"];
		kwsInject(id,res,inSameContext);
	}

}

//connect to native host and get the communicatetion port
function connectToNativeHost()
{
	var nativeHostName = "com.kingsoft.duba.kschext";
	console.log(nativeHostName);
 	port = chrome.runtime.connectNative(nativeHostName);
	port.onMessage.addListener(onRecievedNativeMessage);
	port.onDisconnect.addListener(onDisconnected);

 } 

 function sendNativeMessage(message)
 {
 	//port.postMessage({message: msg});	
 	port.postMessage(message);	
 }

function init()
{
	connectToNativeHost();
}
document.addEventListener('DOMContentLoaded', init);