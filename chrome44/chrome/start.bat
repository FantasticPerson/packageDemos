set b=%cd%
regsvr32 "%cd%\fingerPrint\FignerPrints_ActiveX.ocx"
chrome.exe  https://www.baidu.com
exit