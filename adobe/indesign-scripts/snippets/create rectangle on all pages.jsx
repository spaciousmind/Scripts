app.doScript(doFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "create rectangle all pages");

function doFunction(){

var doc = app.activeDocument;

for (var i=0; i < doc.pages.length; i++){
	var myPage = doc.pages.item(i);
	var pageBounds = myPage.bounds
	var rect = myPage.rectangles.add({strokeColor:'Black', geometricBounds:pageBounds});
}
}
