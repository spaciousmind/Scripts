#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;#SingleInstance force

;^2::ToggleWinMinimize("notepad")
SetTitleMatchMode 2

^Numpad2::
   IFWinExist, ahk_class Bridge_WindowClass
      ToggleWinMinimize("ahk_exe Bridge.exe")
   Else
      Run, "C:\Program Files\Adobe\Adobe Bridge CC (64 Bit)\Bridge.exe"
      MsgBox, does not exist
   Return

^Numpad3::
   IfWinExist, ahk_class PX_WINDOW_CLASS
      ToggleWinMinimize("ahk_exe sublime_text.exe")
   Else
       Run, "C:\Program Files\Sublime Text 3\sublime_text.exe"
       MsgBox, does not exist
   Return

^Numpad6::
   IfWinExist, ahk_class Chrome_WidgetWin_1
      ToggleWinMinimize("ahk_exe chrome.exe")
   Else
      Run, "chrome.exe"
      MsgBox, does not exist
   Return

#n::
	If WinExist("ahk_exe notepad.exe")
	{	
		ToggleWinMinimize("ahk_exe notepad.exe")
		MsgBox, does exist
	}
	Else
	{
		Run, "notepad.exe"
		MsgBox, does not exist
	}
	Return


#i::
   IfWinExist, ahk_class indesign
      ToggleWinMinimize("ahk_class indesign")
   Else
      Run, "InDesign.exe"
   return

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
