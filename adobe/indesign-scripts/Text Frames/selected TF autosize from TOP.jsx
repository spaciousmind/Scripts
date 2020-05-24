if (parseFloat(app.version) < 6)
main();
else
var undoName = "selected TF's to autosize centre left point"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

var doc = app.activeDocument;
var sel = app.selection;

for (var i=0; i < sel.length; i++){
	var mySelection = app.activeDocument.selection[i];

		if (mySelection instanceof TextFrame){
			mySelection.textFramePreferences.autoSizingReferencePoint =
			AutoSizingReferenceEnum.CENTER_POINT;

			mySelection.textFramePreferences.autoSizingType = 
			AutoSizingTypeEnum.HEIGHT_ONLY;



}
}
}


