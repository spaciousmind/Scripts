
(function () {
	var contextMenu = app.menus.item ('$ID/RtMenuPagesSubPanel');
	if (!contextMenu.menuItems.item('$ID/90° CW').isValid) {
		contextMenu.menuSeparators.add (LocationOptions.AT_END);
		contextMenu.menuItems.add (app.menuActions.item('$ID/By 90deg CW'));
		contextMenu.menuItems.add (app.menuActions.item('$ID/By 90deg CCW'));
		//contextMenu.menuItems.add (app.menuActions.item('$ID/By 180deg')); // Does not work
		contextMenu.menuSeparators.add();
		contextMenu.menuItems.add (app.menuActions.item('$ID/To 0deg'));
	}
	contextMenu = app.menus.item ('$ID/RtMenuPagesPanel');
	if (!contextMenu.menuItems.item('$ID/90° CW').isValid) {
		contextMenu.menuSeparators.add (LocationOptions.AT_END);
		contextMenu.menuItems.add (app.menuActions.item('$ID/By 90deg CW'));
		contextMenu.menuItems.add (app.menuActions.item('$ID/By 90deg CCW'));
		//contextMenu.menuItems.add (app.menuActions.item('$ID/By 180deg')); // Does not work
		contextMenu.menuSeparators.add();
		contextMenu.menuItems.add (app.menuActions.item('$ID/To 0deg'));
	}
}());
