//WIP to do 1. only works properly if doc not facing pages. fix to add case for facing pages ( check out trim to current page bleedbounds script for ref )


doScript();

function doScript(){
var myDoc = app.activeDocument;
var pagesLength = myDoc.documentPreferences.pagesPerDocument;

//Create a layer to hold the temporary border (if it does not already exist).
var newLayer = myDoc.layers.item("TEMPORARY BORDER");
try{
	newLayerName = newLayer.name;
	alert("TEMPORARY BORDER EXISTS")
}
catch (myError){
	var newLayer = myDoc.layers.add({name:"TEMPORARY BORDER"});
	doBorders();
}


function doBorders(){
	for (var i=0; i < pagesLength; i++){
	with (myDoc){
		var myPage = pages.item(i);
		var myPageWidth = documentPreferences.pageWidth;
		var myPageHeight = documentPreferences.pageHeight;
		var myX1 = 0;
		var myX2 = myPageWidth;
		var myY1 = 0;
		var myY2 = myPageHeight;
		with (myPage){
			myRectangle = myPage.rectangles.add({geometricBounds:[myY1, myX1, myY2, myX2]});
			myRectangle.strokeColor = "Black";
			myRectangle.strokeWeight = 10;
			myRectangle.move(newLayer);
	//		newLayer.name = "TEMPORARY BORDER";
	}
	}}
}}




function myGetBounds (myDoc,myPage){

}


//$.writeln("1");
//$.writeln(myDoc.toSource());

//$.writeln("pages length = " + pagesLength);
//    $.writeln(myPage);
//		  $.writeln(myPage.toSource());
	//var myBounds = myGetBounds(myPage,myDoc);
/*
	 app.activeDocument.layers.itemByName('BLAH').remove();

	 */
