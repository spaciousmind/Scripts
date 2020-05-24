//DESCRIPTION: Rotate spreads with rotated text frames
// Peter Kahrel -- www.kahrel.plus.com

(function () {

	function hasRotatedFrames (s) {
		var items = s.allPageItems;
		for (var i = items.length-1; i >= 0; i--) {
			if (items[i] instanceof TextFrame && items[i].rotationAngle === 90) {
				return true;
			}
		}
		return false;
	}


	function rotateSpreads () {
		var spreads = app.documents[0].spreads.everyItem().getElements();
		var rotatedSpreads = [];
		for (var i = 0; i < spreads.length; i++) {
			app.windows[0].activeSpread = spreads[i];
			if (hasRotatedFrames (app.windows[0].activeSpread)) {
				app.menuActions.itemByID(6186).invoke();
				rotatedSpreads.push(i);
			}
			app.documents[0].insertLabel ('rotatedSpreads', rotatedSpreads.toSource());
		}
	}


	function undoSpreadRotation () {
		var r = app.documents[0].extractLabel ('rotatedSpreads');
		if (r !== '') {
			r = eval(r);
			for (var i = 0; i < r.length; i++) {
				app.windows[0].activeSpread = app.documents[0].spreads[r[i]];
				app.menuActions.itemByID(6187).invoke();
			}
		}
		app.documents[0].insertLabel ('rotatedSpreads', '');
	}


	function main () {
		var w = new Window ('dialog', 'Spread rotation', undefined, {closeButton: false});
			w.panel = w.add ('panel {alignChildren: "left"}');
				w.panel.add ('radiobutton {text: "&Rotate spreads"}');
				w.panel.add ('radiobutton {text: "&Undo spread rotation"}');
			w.buttons = w.add ('group');
				w.buttons.add ('button {text: "OK"}');
				w.buttons.add ('button {text: "Cancel"}');
				
			if (app.documents[0].extractLabel ('rotatedSpreads') === '') {
				w.panel.children[0].value = true;
			} else {
				w.panel.children[1].value = true;
			}

		if (w.show() == 1) {
			if (w.panel.children[0].value) {
				rotateSpreads();
			} else {
				undoSpreadRotation();
			}
		}
	} // main

	main();

}());
