
#InstallKeybdHook				; Better keyboard handling
#NoEnv							; Better compatibility
#SingleInstance Force			; No dialog when restarting
SendMode Input					; Faster keystrokes
SetWorkingDir %A_ScriptDir%		; Ensures a consistent starting directory

#Include QuickStartDef.ahk
;#Include AppLaunchHotkeys.ahk

Return ; END OF AUTO-EXECUTE SECTION

#Include QuickStart.ahk


#IfWinActive, ahk_class illustrator
^r::Run, Illustrator.exe E:\Projects\Scripts\adobe\illustrator-scripts\my-runscript-illustrator.jsx

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
      Run, "C:\Program Files\Adobe\Adobe Bridge CC 2019\Bridge.exe" , , Max

  ;    WinGet, active_id, ID, A
 ;     WinWait, ahk_id %active_id%
  ;    MsgBox bridge is loading now
  ;    ForceWinMaximize("ahk_exe Bridge.exe")
   }
   Return

^Numpad3::
   If WinExist("ahk_exe sublime_text.exe")
   {
      ToggleWinMinimize("ahk_exe sublime_text.exe")
   }
   Else
   {
	 Run, "C:\Program Files\Sublime Text 3\sublime_text.exe" , , Max
   ;  WinGet, active_id, ID, A
   ;  WinWait, ahk_id %active_id%
   ;  ForceWinMaximize("ahk_exe sublime_text.exe")
   }
   Return


^Numpad5::
IfWinNotExist, ahk_id %exp_1%
{
  Run, explorer
  sleep 1000
  WinGet, exp_1, ID, A
  return
}
IfWinActive, ahk_id %exp_1%
  send, #{down}
else
  WinActivate
return

/*
numpadpgdn::
IfWinNotExist, ahk_id %exp_2%
{
  Run, explorer
  sleep 1000
  WinGet, exp_2, ID, A
  return
}
IfWinActive, ahk_id %exp_2%
  send, #{down}
else
  WinActivate
return
*/


/*
^Numpad5:: ; ctrl + numpad 5 ;activate Explorer windows
GroupAdd, Explorer, ahk_class ExploreWClass
GroupAdd, Explorer, ahk_class CabinetWClass
WinGet, vWinList, List, ahk_group Explorer
Loop, % vWinLis♣t
  WinActivate, % "ahk_id " vWinList%A_Index%
return
*/

^Numpad6::
   If WinExist("ahk_exe chrome.exe")
   {
      ToggleWinMinimize("ahk_exe chrome.exe")
   }
   Else
   {
      Run, "chrome.exe" , , Max
      ; Run, "chrome.exe" , Max, mychrome
     ; MsgBox the value in mychrome is %mychrome%
     ; MsgBox chrome is loading now
    ;  WinWait ahk_pid %mychrome%
     ; WinWait ahk_pid %OutputVarPID%
     ; WinGet, active_id, ID, A
      ;WinWait, ahk_id %active_id%
     ; ForceWinMaximize(%mychrome%)
    ; WinGet, active_id, ID, A
	; WinWait, ahk_id %active_id%
	; ForceWinMaximize("%active_id%")
      Return
   }
   Return

#a:: Winset, Alwaysontop, , A
Return

#n::
	If WinExist("ahk_exe notepad.exe")
	{	
	  ToggleWinMinimize("ahk_exe notepad.exe")
	}
	Else
	{
	  Run, "notepad.exe" , , Max
	  WinGet, active_id, ID, A
	  WinWait, ahk_id %active_id%
	  ForceWinMaximize("ahk_exe notepad.exe")
	}
	Return

#c::
	If WinExist("ahk_exe gnucash.exe")
	{
		ToggleWinMinimize("ahk_exe gnucash.exe")
	}
	Else
	{
		Run, "C:\Program Files (x86)\gnucash\bin\gnucash.exe", , Max
		SoundPlay, D:\Sounds\system sounds\slot-machine-daniel_simon.mp3
	}
	Return


;---------------------------------------------
#^c::
  If WinActive("ahk_class CabinetWClass")
  {

  
  Send, {AppsKey}
  Sleep, 300
  Send, {up}
  Sleep, 50
  Send, {up}
  Sleep, 50
  Send, {Enter}
  Sleep, 10
  Send, {f}
    Sleep, 2
  Send, {o}
    Sleep, 2
  Send, {l}
    Sleep, 2
  Send, {d}
    Sleep, 2
  Send, {e}
  Sleep, 2
  Send, {r}
  Sleep, 2
  Send, {Enter}
  Sleep, 100
  Send, {AppsKey}
  Sleep, 300
  Send, {n}
  Sleep, 50
  Send, {up}
  Sleep, 50
  Send, {up}
  Sleep, 50
  Send, {up}
  Sleep, 10
  Send, {Enter}
  Sleep, 500
  Send, {Del}
  Sleep, 100
  Send, {y}
  }
  return

  ;   ************* some  functions   **************

ControlGetText(Control="", WinTitle="", WinText="", ExcludeTitle="", ExcludeText="") 
{ 
   ControlGetText, OutputVar, % Control, % WinTitle, % WinText, % ExcludeTitle, % ExcludeText 
   Return OutputVar 
}


;-------------------------------------------------


#d::
   If WinExist("ahk_exe InDesign.exe")
   {
      ToggleWinMinimize("ahk_class indesign")
   }
   Else
   {
      Run, "InDesign.exe" , , Max
    ;  MsgBox indesign is loading now
     ; WinGet, active_id, ID, A
    ;  WinWait, ahk_id %active_id%
     ; ForceWinMaximize("ahk_class indesign")
   }
   return



#f::
	return

#^h::
	If WinActive("ahk_class CabinetWClass")
	{
	Send, !{Enter}
	Sleep, 300
	Send, {Tab}
	Send, {Space}{Enter}
	}

return

#m::
	If WinExist("foobar2000")
	{
		ToggleWinMinimize("ahk_exe foobar2000.exe")
	}
	Else
	{
		Run, "foobar2000.exe" , , Max
	}
	return

#p::
	If WinExist("ahk_exe Photoshop.exe")
	{
		ToggleWinMinimize("ahk_class photoshop")
	}
	Else
	{
		Run, "photoshop.exe" , , Max
	}
	return
	

#i::
    If WinExist("ahk_exe illustrator.exe")
    {
      ToggleWinMinimize("ahk_class illustrator")
    }
    Else
    {
      Run, "illustrator.exe" , , Max
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

;----------------TESTS---------------------

#t::
	WinGet, active_id, ID, A
	WinMaximize, ahk_id %active_id%
   MsgBox, The active window's ID is "%active_id%".
return

#r::
;Run, Notepad.exe, C:\My Documents, max
var := 5
MsgBox The value in the variable named Var is %Var%.
CopyOfVar = %Var%
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
