myDocument = app.activeDocument;
var myDocument = app.documents.item(0);
var myPage = myDocument.pages.item(0);
var pageBounds = myPage.bounds
z=0;



for (i = 1; i <= myDocument.pages.length; i++){
var rect = myDocument.pages.item(z).rectangles.add({fillColor:'None', strokeColor:'Black', geometricBounds:pageBounds});
z+1;
}
