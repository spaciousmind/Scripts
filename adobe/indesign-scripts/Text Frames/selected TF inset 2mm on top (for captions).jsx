if (parseFloat(app.version) < 6)
main();
else
var undoName = "selected TF inset 2mm on top"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

var doc = app.activeDocument;
var sel = app.selection;

for (var i=0; i < sel.length; i++){
	var mySelection = app.activeDocument.selection[i];

		if (mySelection instanceof TextFrame){
			mySelection.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
			mySelection.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
			mySelection.textFramePreferences.insetSpacing = ["2mm",0,0,0];

}
}
}