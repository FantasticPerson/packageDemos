chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
		var url_ = document.location.href;
		var titleStr="";
		var bodyStr="";
		var keywordsStr="";
		var desStr="";
		
		if (request.f & 1){//title
			titleStr=document.title.substr(0,512);
			//alert(titleStr)
		}
		if (request.f & 2){//keywords
			var metaElements = document.getElementsByTagName("meta");
			for (i=0;i<metaElements.length;i++){
				if (metaElements[i].name == "keywords") {
						keywordsStr = metaElements[i].content.substr(0,512);
						break;
					}
			}
			//alert(keywordsStr)
		}
		if (request.f & 4){//des
			var metaElements = document.getElementsByTagName("meta");
			for (i=0;i<metaElements.length;i++){
				if (metaElements[i].name == "description") {
						desStr = metaElements[i].content.substr(0,512);
						break;
					}
			}
			//alert(desStr)
		}
		if (request.f & 8){//body
			bodyStr = document.body.outerText.substr(0, 512);
			//alert(bodyStr)			
		}
		
		chrome.extension.sendRequest({type:"fish", url:url_, title:titleStr, body:bodyStr, keyword:keywordsStr, description:desStr});
  });
 
