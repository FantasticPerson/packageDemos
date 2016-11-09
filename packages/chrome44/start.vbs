Set ws = CreateObject("Wscript.Shell")
Set f = CreateObject("Scripting.FileSystemObject")
Set fso = f.GetFile(wscript.scriptfullname)
p = replace(fso.Path,f.GetFileName(fso.Path),"chrome")
ws.currentdirectory=p
ws.run "cmd /c start.bat",vbhide