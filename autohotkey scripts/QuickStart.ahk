
#space::
	Gui, Destroy
	Gui, Font, s11, Consolas
	Gui, Add, Edit, x5 y5 w200 h25 vQuickStartQuery, %LastQSQuery%
	Gui, Add, Button, x210 y5 w25 h25 +Default gQuickStartGo, →
	Gui, Show, w240 h35, QuickStart v2
	Gui, Font
Return
; #+g::#g ; "Gamer bar" Win10 compatibility attempt doesn't work :(

QuickStartGo:
	Gui, Submit
	Gui, Destroy
	If ( QuickStart[QuickStartQuery] ) {
		If QuickStart[QuickStartQuery] is alnum
			Run % QuickStart[QuickStartQuery]
		Else QuickStart[QuickStartQuery].Call()
		LastQSQuery := QuickStartQuery
	}
	Else
		SoundPlay *-1
Return


; Escape if these labels they are already used by the main script
GuiClose:
GuiEscape:
	Gui, Destroy
Return
