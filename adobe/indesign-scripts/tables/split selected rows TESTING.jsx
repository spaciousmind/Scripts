
if (parseFloat(app.version) < 6)
main();
else
var undoName = "edit tables"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

  var myDoc = app.activeDocument;


app.selection[0].rows.everyItem().split(HorizontalOrVertical.HORIZONTAL)
﻿
app.selection[0].rows[0].bottomEdgeStrokeColor = myDoc.swatches.item("TRS Blue");
app.selection[0].rows[0].bottomEdgeStrokeWeight = 1;
app.selection[0].rows[0].bottomEdgeStrokeTint = 100;

}
