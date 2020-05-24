var undoName = "darken selected rows based on colour"
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);

function main(){

rowcount = app.selection[0].rows.length;
$.writeln("rowcount: " + rowcount);

for (var i=0; i < rowcount; i++){

	$.writeln(i+ ": " + app.selection[0].rows[i].fillColor);
	if (app.selection[0].rows[i].fillColor == Object(Color));
		app.selection[0].rows[i].fillTint = 50;
}
}