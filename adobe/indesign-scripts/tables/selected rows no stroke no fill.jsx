
if (parseFloat(app.version) < 6)
main();
else
var undoName = "edit tables"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

app.selection[0].rows.everyItem().fillColor = "Paper";
app.selection[0].rows.everyItem().fillTint = 0;

app.selection[0].rows.everyItem().leftEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().innerColumnStrokeWeight = 0;
app.selection[0].rows.everyItem().rightEdgeStrokeWeight = 0;

app.selection[0].rows.everyItem().topEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().innerRowStrokeWeight = 0;
app.selection[0].rows.everyItem().leftEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().bottomEdgeStrokeWeight = 0;

}
