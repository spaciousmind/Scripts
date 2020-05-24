#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.


;#SingleInstance force

^j::
   Send, My bloody First Script 4
Return

^n::                                       ; Ctrl & n Hotkey
   Run, foobar2000                      ; Run the program notepad.exe when you press Ctrl & n
Return                                     ; This ends the hotkey. The code below this will not get triggered.

;^2::                                       ; Ctrl & n Hotkey
;   Run, Adobe Bridge CC (64bit)                      ; Run the program notepad.exe when you press Ctrl & n
;Return                                     ; This ends the hotkey. The code below this will not get triggered.

