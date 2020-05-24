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


var myObjectTypes = new Array;
myObjectTypes.push("rectangles");

function mySelectObjects(myObjectTypes){
	var myCounter;
	var myObjectsToSelect = new Array;
	with(app.activeWindow.activeSpread){
		for(myCounter = 0; myCounter < myObjectTypes.length; myCounter++){
			if((myObjectTypes[myCounter] != "images")&&(myObjectTypes[myCounter] != "epss")&&(myObjectTypes[myCounter] != "pdfs")){
				myPageItems = eval(myObjectTypes[myCounter]);
				if (myPageItems.length != 0){
					for(myPageItemCounter = 0; myPageItemCounter < myPageItems.length; myPageItemCounter ++){
						myObjectsToSelect.push(myPageItems[myPageItemCounter]);
					}
				}
			}
		}
		for(myCounter = 0; myCounter < pageItems.length; myCounter++){
			myPageItem = pageItems.item(myCounter);
			try{
				if(((myIsInArray("images", myObjectTypes) == true) && (myPageItem.images.length == 1))||
				((myIsInArray("epss", myObjectTypes) == true) && (myPageItem.epss.length == 1))||
				((myIsInArray("pdfs", myObjectTypes) == true) && (myPageItem.pdfs.length == 1))){
					//Is the page item already in the list of items to select?
					myID = myPageItem.id;
					myAlreadyAdded = false;
					for(myPageItemCounter = 0; myPageItemCounter<myObjectsToSelect.length; myPageItemCounter++){
						if(myObjectsToSelect[myPageItemCounter].id == myID){
							myAlreadyAdded = true;
							break;
						}
					}
					//If the page item was not already in the list of items to select, add it to the list.
					if (myAlreadyAdded == false){
						myObjectsToSelect.push(myPageItem);
					}
				}
			}
			catch(myError){
			}
		}
		parent.select(myObjectsToSelect, SelectionOptions.replaceWith);
		
	}
}