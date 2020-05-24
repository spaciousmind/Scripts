#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;#SingleInstance force

;^2::ToggleWinMinimize("notepad")
SetTitleMatchMode 2

^!r::
   Reload
   Sleep 1000
   MsgBox, 4,, The script could not be reloaded. Would you like to open it for editing?
   IfMsgBox, Yes, Edit
   Return


^Numpad2::
   If WinExist("ahk_exe Bridge.exe")
   {
   	  If WinExist("ahk_class Bridge_WindowClass")
      	ToggleWinMinimize("ahk_exe Bridge.exe")
      Return      
   }
   Else
   {
      Run, "C:\Program Files\Adobe\Adobe Bridge CC (64 Bit)\Bridge.exe"
      WinGet, active_id, ID, A
      WinWait, ahk_id %active_id%
      ForceWinMaximize("ahk_exe Bridge.exe")
   }
   Return

^Numpad3::
   If WinExist("ahk_exe sublime_text.exe")
   {
      ToggleWinMinimize("ahk_exe sublime_text.exe")
   }
   Else
   {
	  Run, "C:\Program Files\Sublime Text 3\sublime_text.exe"
     WinGet, active_id, ID, A
     WinWait, ahk_id %active_id%
     ForceWinMaximize("ahk_exe sublime_text.exe")
   }
   Return

^Numpad6::
   If WinExist("ahk_exe chrome.exe")
   {
      ToggleWinMinimize("ahk_exe chrome.exe")
   }
   Else
   {
      Run, "chrome.exe"
      WinGet, active_id, ID, A
      WinWait, ahk_id %active_id%
      ForceWinMaximize("ahk_exe chrome.exe")
   }
   Return

#n::
	If WinExist("ahk_exe notepad.exe")
	{	
	  ToggleWinMinimize("ahk_exe notepad.exe")
	}
	Else
	{
	  Run, "notepad.exe"
	  WinGet, active_id, ID, A
	  WinWait, ahk_id %active_id%
	  ForceWinMaximize("ahk_exe notepad.exe")
	}
	Return

#c::
SoundPlay, D:\Sounds\system sounds\slot-machine-daniel_simon.mp3
Return


#i::
   IfWinExist, ahk_class indesign
   If WinExist("ahk_exe InDesign.exe")
   {
      MsgBox apparently indesign exists
      ToggleWinMinimize("ahk_class indesign")
   }
   Else
   {
      Run, "InDesign.exe"
      WinGet, active_id, ID, A
      WinWait, ahk_id %active_id%
      ForceWinMaximize("ahk_class indesign")
   }
   return



;;---------------DEBUGgING---------------------
;^t::
;	#Persistent
;SetTimer, WatchActiveWindow, 200
;return
;WatchActiveWindow:
;WinGet, ControlList, ControlList, A
;ToolTip, %ControlList%
;return


#t::
	WinGet, active_id, ID, A
	WinMaximize, ahk_id %active_id%
   MsgBox, The active window's ID is "%active_id%".
return
;--------------------------------------------------


ToggleWinMinimize(TheWindowTitle) 
{ 
   SetTitleMatchMode,2 
   DetectHiddenWindows, Off 
   IfWinActive, %TheWindowTitle% 
   { 
     WinMinimize, %TheWindowTitle% 
   } 
   Else 
   { 
      IfWinExist, %TheWindowTitle% 
      { 
         WinGet, winid, ID, %TheWindowTitle% 
         DllCall("SwitchToThisWindow", "UInt", winid, "UInt", 1) 
      } 
   } 
   Return 
}

ForceWinMaximize(TheWindowTitle)
{
	SetTitleMatchMode, 2
	DetectHiddenWindows, Off
	WinMaximize, %TheWindowTitle%
	Return
}
