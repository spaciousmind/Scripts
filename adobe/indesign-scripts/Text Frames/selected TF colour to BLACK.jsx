﻿app.doScript(doFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "change text frame colours");


function doFunction(){
var doc = app.activeDocument;
var sel = app.selection;
for (var i=0; i < sel.length; i++){
    app.selection[i].texts.everyItem().fillColor = "Black"}
}
