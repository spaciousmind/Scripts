var myDoc = app.activeDocument;
var newLayer = myDoc.layers.add();
$.writeln(myDoc.toSource());
with (myDoc){
	var myPage = pages.item(0);
	var pagesLength = documentPreferences.pagesPerDocument;
$.writeln("pages length = " + pagesLength);
    $.writeln(myPage.toSource());
	//var myBounds = myGetBounds(myPage,myDoc);
    var myPageWidth = documentPreferences.pageWidth;
var myPageHeight = documentPreferences.pageHeight;
var myX1 = 0;
var myX2 = myPageWidth;
var myY1 = 0;
var myY2 = myPageHeight;
	with (myDoc.pages.item(0)){
		myRectangle = myPage.rectangles.add({geometricBounds:[myY1, myX1, myY2, myX2]});
		myRectangle.strokeColor = "Black";
		myRectangle.strokeWeight = 1;
		myRectangle.move(newLayer);
		newLayer.name = "TEXT";
	with (myDoc.pages.item(1)){
		myRectangle = myPage.rectangles.add({geometricBounds:[myY1, myX1, myY2, myX2]});
		myRectangle.strokeColor = "Black";
		myRectangle.strokeWeight = 1;
		myRectangle.move(newLayer);
		newLayer.name = "TEXT";
}
}}




function myGetBounds (myDoc,myPage){

}