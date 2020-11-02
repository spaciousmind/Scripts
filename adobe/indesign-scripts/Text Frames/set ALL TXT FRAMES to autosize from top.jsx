if (parseFloat(app.version) < 6)
doSwapitems();
else
app.doScript(doScript, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "all text in doc autosize from top");


function doScript()
{

var tfs = app.activeDocument.spreads.everyItem().textFrames.everyItem().getElements();



while(tf = tfs.pop()){


   tf.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
   tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;



}
}

