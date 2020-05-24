if (parseFloat(app.version) < 6)
doFunction();
else
app.doScript(doFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "step and repeat all pages");

function doFunction(){

var doc = app.activeDocument;

for (var i=0; i < doc.pages.length; i++){
	var myPage = doc.pages.item(i);
	var pageBounds = myPage.bounds
	var rect = myPage.rectangles.add({strokeColor:'Black', geometricBounds:pageBounds});
	var rect2 = myDocument.pages.item(1).rectangles.add({strokeColor:'Black', geometricBounds:pageBounds});
}
}