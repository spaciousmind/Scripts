
QuickStart := {}
QS_TextEditor := "C:\Program Files\Sublime Text 3\sublime_text.exe"

{ ; Computer

QuickStart.c					:= "C:\"
QuickStart.d					:= "D:\"
QuickStart.e					:= "E:\"
QuickStart.k					:= "K:\"
}

{ ; Windows Accessories
QuickStart.rec					:= "C:\Windows\Sysnative\SoundRecorder.exe"
QuickStart.snip					:= "C:\Windows\Sysnative\SnippingTool.exe"
QuickStart.notes				:= "C:\Windows\Sysnative\gStikyNot.exe"
QuickStart.vol					:= "SndVol.exe"
}

{ ; AutoHotkey
QuickStart.edit					:= A_ScriptDir
QuickStart.editme				:= QS_TextEditor . A_ScriptFullPath
QuickStart.qedit				:= QS_TextEditor . A_ScriptDir . "\QuickStartDef.ahk" ; Edit this script to add more QuickStart stuff!
QuickStart.ahk2exe				:= "C:\Program Files\AutoHotkey\Compiler\Ahk2Exe.exe"
QuickStart.keyhistory			:= Func( "QS_KeyHist" )
QuickStart.spy					:= "C:\Program Files\AutoHotkey\WindowSpy.ahk"
}
