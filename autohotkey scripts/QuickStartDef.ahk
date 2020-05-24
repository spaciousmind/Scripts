
QuickStart := {}
QS_TextEditor := "C:\Program Files\Sublime Text 3\sublime_text.exe"

{ ; Games
QuickStart.steam				:= "C:\Program Files (x86)\Steam\Steam.exe"
QuickStart.steamdir				:= "C:\Program Files (x86)\Steam\steamapps\common\"
QuickStart.ftl					:= "steam://rungameid/212680" ; Faster Than Light
QuickStart.ftlfiles				:= A_MyDocuments . "\My Games\FasterThanLight\"
QuickStart.ksp					:= "steam://rungameid/220200" ; Kerbal Space Program
QuickStart.sb					:= "steam://rungameid/211820" ; Starbound
QuickStart.se					:= "steam://rungameid/244850" ; Space Engineers
QuickStart.stanley				:= "steam://rungameid/221910" ; Stanley Parable
QuickStart.surgeonsim			:= "steam://rungameid/233720" ; Surgeon Simulator
}

{ ; Computer
QuickStart.pc					:= "::{20d04fe0-3aea-1069-a2d8-08002b30309d}"
QuickStart.c					:= "C:\"
QuickStart.d					:= "D:\"
QuickStart.e					:= "E:\"
QuickStart.f					:= "F:\"
QuickStart.ad					:= A_AppData
QuickStart.cmd					:= Func( "QS_Admin" ).Bind( "cmd.exe" )
QuickStart.cp					:= "Control Panel"
QuickStart.erb					:= Func( "QS_EmptyRecycleBin" ) ; ERB = Empty Recycle Bin
QuickStart.explorer				:= Func( "QS_RestartExplorer" )
QuickStart.ip					:= Func( "QS_CopyText" ).Bind( A_IPAddress1 )
QuickStart.pd					:= "C:\ProgramData\"
QuickStart.pf					:= "C:\Program Files\"
QuickStart.pf32					:= A_ProgramFiles
QuickStart.pf86					:= A_ProgramFiles
QuickStart.pfall				:= Func( "QS_RunMore" ).Bind( "C:\Program Files\",  A_ProgramFiles ) ; Opens both "Program Files" and "Program Files (x86)"
QuickStart.shellnew				:= A_WinDir . "\ShellNew\"
QuickStart.startup				:= "shell:startup"
QuickStart.startup2				:= "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup\"
QuickStart.tm					:= "taskmgr.exe /7" ; The "/7" is to ensure that it will not take up extra taskbar space if Task Manager is already pinned
QuickStart.windir				:= A_WinDir
}

{ ; Windows Accessories
QuickStart.rec					:= "C:\Windows\Sysnative\SoundRecorder.exe"
QuickStart.snip					:= "C:\Windows\Sysnative\SnippingTool.exe"
QuickStart.notes				:= "C:\Windows\Sysnative\gStikyNot.exe"
QuickStart.vol					:= "SndVol.exe"
}

{ ; User Folder
QuickStart[A_UserName]			:= "C:\Users\" . A_UserName
QuickStart.me					:= "C:\Users\" . A_UserName
QuickStart.db					:= A_MyDocuments . "\Dropbox\"
QuickStart.desktop				:= "C:\Users\" . A_UserName . "\Desktop\"
QuickStart.dl					:= "C:\Users\" . A_UserName . "\Downloads\"
QuickStart.docs					:= A_MyDocuments
QuickStart.music				:= "C:\Users\" . A_UserName . "\Music\"
QuickStart.pics					:= "C:\Users\" . A_UserName . "\Pictures\"
QuickStart.vids					:= "C:\Users\" . A_UserName . "\Videos\"
}

{ ;custom
Quickstart.illustratorscripts		:= "C:\Program Files\Adobe\Adobe Illustrator CC 2015.3\Presets\en_US\Scripts"
Quickstart.indesignscripts		:= "C:\Program Files\Adobe\Adobe InDesign CC 2015\Scripts"
Quickstart.photoshopscripts		:= "C:\Program Files\Adobe\Adobe Photoshop CC 2015.5\Presets\Scripts"
}


{ ; AutoHotkey
QuickStart.edit				:= A_ScriptDir
QuickStart.editme				:= QS_TextEditor . A_ScriptFullPath
QuickStart.qedit				:= QS_TextEditor . A_ScriptDir . "\QuickStartDef.ahk" ; Edit this script to add more QuickStart stuff!
QuickStart.ahk2exe				:= "C:\Program Files\AutoHotkey\Compiler\Ahk2Exe.exe"
QuickStart.keyhistory			:= Func( "QS_KeyHist" )
QuickStart.spy					:= "C:\Program Files\AutoHotkey\WindowSpy.ahk"
QuickStart.winspy				:= "C:\Program Files\AutoHotkey\AU3_Spy.exe"
}

{ ; Programs
QuickStart.blender				:= "C:\Program Files\Blender\blender.exe"
QuickStart.chrome				:= "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
QuickStart.keep					:= "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe  --profile-directory=Default --app-id=hmjkmjkepdijhoojdojkdfohbdgmmhki" ; Launches Google Keep in a separate window (requires Google Chrome)
QuickStart.movie				:= "C:\Program Files (x86)\Windows Live\Photo Gallery\MovieMaker.exe"
QuickStart.services				:= "services.msc"
QuickStart.vjcfg				:= "C:\Program Files\vJoy\x64\vJoyConf.exe"
QuickStart.vjfeed				:= "C:\Program Files\vJoy\x64\vJoyFeeder.exe"
QuickStart.vjmonitor			:= "C:\Program Files\vJoy\x64\JoyMonitor.exe"
QuickStart.wmp					:= "C:\Program Files (x86)\Windows Media Player\wmplayer.exe"
}

{ ; Modules - You can delete these unless you are using some of my other scripts
; QuickStart.googlelist			:= Func( "QS_GoSub" ).Bind( "GoogleGui" )
; QuickStart.googlist				:= Func( "QS_GoSub" ).Bind( "GoogleGui" )
; QuickStart.sort					:= Func( "QS_GoSub" ).Bind( "ABCGui" )
}

{ ; Websites
QuickStart.cubemix				:= "http://cube.crider.co.uk/scrambler.html"
QuickStart.tones				:= "http://wki.pe/Piano_key_frequencies" ; to be used with SoundBeep
QuickStart.viscube				:= "http://cube.crider.co.uk/visualcube.php"
QuickStart.help					:= "firefox.exe https://autohotkey.com/docs/AutoHotkey.htm"
QuickStart.tv					:= "chrome.exe http://2ddl.io/category/tv-shows/"
}

QS_Admin( RunList* ) {
	For RunNum, RunItem in RunList
		Run *RunAs %RunItem%
}

QS_CopyText( CopyText ) {
	Clipboard := CopyText
	TrayTip, QuickStart v2, %CopyText% copied to clipboard
}

QS_EmptyRecycleBin() {
	NumPut( VarSetCapacity( SHQUERYRBINFO,20,0 ), SHQUERYRBINFO )
	DllCall( "Shell32\SHQueryRecycleBinA", Int,0, UInt,&SHQUERYRBINFO )
	If (NumGet( SHQUERYRBINFO, 0 ? 12 : 4,"Int64" )) {
		FileRecycleEmpty
		SoundPlay C:\Windows\media\recycle.wav
	}
}

QS_GoSub( Subroutine ) {
	GoSub %Subroutine%
}

QS_KeyHist() {
	KeyHistory
}

QS_ShowMenu( MenuName ) {
	Menu, %MenuName%, Show
}

QS_RestartExplorer( WaitTime = 100 ) {
	PostMessage, 0x12, 0, 0, , ahk_exe explorer.exe	; WM_Quit
	Sleep %WaitTime%
	PostMessage, 0x12, 0, 0, , ahk_exe explorer.exe	; WM_Quit
	Sleep %WaitTime%
	Run %A_Windir%\explorer.exe
}

QS_RunMore( RunList* ) {
	For RunNum, RunItem in RunList
		Run %RunItem%
}
