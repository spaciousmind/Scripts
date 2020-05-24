if (parseFloat(app.version) < 6)
doSwapitems();
else
app.doScript(doSwapitems, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "autosize ALL text boxes");


function doSwapitems()
{

var tfs = app.activeDocument.spreads.everyItem().textFrames.everyItem().getElements();



while(tf = tfs.pop()){

   tf.textFramePreferences.autoSizingReferencePoint =
   AutoSizingReferenceEnum.TOP_CENTER_POINT;

   tf.textFramePreferences.autoSizingType = 
   AutoSizingTypeEnum.HEIGHT_ONLY;






}
}

