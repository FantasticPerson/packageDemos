var bgPage = chrome.extension.getBackgroundPage();
function $(id) 
{
	return document.getElementById(id);
}

function init()
{
	$('_kws_up_money_').addEventListener('click', function (e) 
	{
		bgPage.appLauncher.StartKnpbox();
	});
	
	$('_kws_ad_').addEventListener('click', function (e) 
	{
		bgPage.appLauncher.StartKnpbox();
	});
	
	$('_kws_netpay_').addEventListener('click', function (e) 
	{
		bgPage.appLauncher.CreateTab( 'http://buy.ijinshan.com' );
	});
}

document.addEventListener('DOMContentLoaded', init);