if (parseFloat(app.version) < 6) {
    main();
} else {
	var undoName = "fill selected images proportionally"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);
}

function main() {

	for (var i = 0; i < app.selection.length; i++){

		var imageFrame = app.selection[i];
		var image = imageFrame.images[0]
		image.fit (FitOptions.FILL_PROPORTIONALLY)
	}
}