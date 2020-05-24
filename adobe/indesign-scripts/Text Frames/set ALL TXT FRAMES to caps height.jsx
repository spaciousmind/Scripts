if (parseFloat(app.version) < 6)
doSwapitems();
else
app.doScript(doScript, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "set baseline to cap height all text frames");


function doScript()
{

var tfs = app.activeDocument.spreads.everyItem().textFrames.everyItem().getElements();



while(tf = tfs.pop()){


   tf.textFramePreferences.firstBaselineOffset = FirstBaseline.CAP_HEIGHT;





}
}

