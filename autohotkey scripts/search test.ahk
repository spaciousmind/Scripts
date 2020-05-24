;based on JEE_ExpWinSetFoc:
;Explorer window interaction (folder windows/Desktop, file/folder enumeration/selection/navigation/creation) - AutoHotkey Community
;https://autohotkey.com/boards/viewtopic.php?f=6&t=35041

q:: ;explorer - focus file/folder, deselect other items
vName := "New Folder"
WinGet, hWnd, ID, A
WinGetClass, vWinClass, % "ahk_id " hWnd
if !(vWinClass = "CabinetWClass") && !(vWinClass = "ExploreWClass")
	return
for oWin2 in ComObjCreate("Shell.Application").Windows
	if (oWin2.HWND = hWnd)
	{
		oWin := oWin2
		break
	}
oItems := oWin.Document.Folder.Items
;SVSI_FOCUSED = 0x10 ;SVSI_ENSUREVISIBLE := 0x8
;SVSI_DESELECTOTHERS := 0x4 ;SVSI_EDIT := 0x3
;SVSI_SELECT := 0x1 ;SVSI_DESELECT := 0x0
oWin.Document.SelectItem(oItems.Item("" vName), 0x1D)
oWin := oWin2 := oItems := ""
return
