var myDocument = app.documents.item(0);
with (myDocument){
	var myPage = pages.item(0);
	var myBounds = myGetBounds(myPage,myDocument);
	with (myDocument.pages.item(0)){
		myRectangle = myPage.rectangles.add({geometricBounds:[myY1, myX1, myY2, myX2]});
	}
}




function myGetBounds (myDocument,myPage){
var myPageWidth = myDocument.documentPreferences.pageWidth
var myPageHeight = myDocument.documentPreferences.pageHeight
var myX1 = 0;
var myX2 = myPageWidth;
var myY1 = 0;
var myY2 = myPageHeight;
}