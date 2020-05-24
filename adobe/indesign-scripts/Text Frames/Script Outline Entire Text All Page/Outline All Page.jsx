if (parseFloat(app.version) < 6)
doOutlines();
else
app.doScript(doOutlines, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "outline all text");



function doOutlines()
{

var a = app.activeDocument.allPageItems,  t; 

while( t=a.pop() )  {

    if( !(t instanceof TextFrame) ) continue; 

    try{ var outlineList = t.createOutlines(true) ;//removes original

        var thisItem = outlineList[0];//assumes only 1 item in frame

        //in case you want to style polygon created

        //thisItem.fillColor = "Dark Red";

        //thisItem.strokeWeight = "0.25 pt";

       // thisItem.strokeColor = "Black";

    } catch(_){

    } 

}
}