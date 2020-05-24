//SelectObjects.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "SelectObjects.jsx" 3.0.0 15 December 2009
*/
//This script selects all objects of a given type or types on the active spread.
//When you choose one of the imported graphic types, the script will select
//the frame containing the graphic (and not the graphic itself).
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
//
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if (app.documents.length != 0){
		if (app.activeWindow.activeSpread.pageItems.length != 0){
			myDisplayDialog();
		}
		else {
			alert("The active spread does not contain any page items.");
		}
	}
	else{
		alert("No documents are open. Please open a document and try again.");
	}
}
function myDisplayDialog(){
	var myDialog;
	//Create the SelectObjects dialog box.
	with(myDialog = app.dialogs.add({name:"SelectObjects"})){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Select:"});
				with(dialogColumns.add()){					
					var myRectanglesCheckbox = checkboxControls.add({staticLabel:"&Rectangles", checkedState:true});
					var myEllipsesCheckbox = checkboxControls.add({staticLabel:"&Ellipses", checkedState:true});
					var myPolygonsCheckbox = checkboxControls.add({staticLabel:"&Polygons", checkedState:true});
					var myGraphicLinesCheckbox = checkboxControls.add({staticLabel:"&Graphic Lines", checkedState:true});
					var myTextFramesCheckbox = checkboxControls.add({staticLabel:"&Text Frames", checkedState:true});
					var myGroupsCheckbox = checkboxControls.add({staticLabel:"G&roups", checkedState:true});
					var myImagesCheckbox = checkboxControls.add({staticLabel:"&Images", checkedState:true});
					var myPDFsCheckbox = checkboxControls.add({staticLabel:"P&DFs", checkedState:true});
					var myEPSsCheckbox = checkboxControls.add({staticLabel:"EP&Ss", checkedState:true});
				}
			}
		}
	}
	myResult = myDialog.show();
	if (myResult == true){
		var myObjectTypes = new Array;
		//Gather control settings from the dialog box and build
		//an array containing the object types to select.
		if (myRectanglesCheckbox.checkedState ==  true){
			myObjectTypes.push("rectangles");
		}
		if(myEllipsesCheckbox.checkedState==true){
			myObjectTypes.push("ovals");
		}
		if(myPolygonsCheckbox.checkedState==true){
			myObjectTypes.push("polygons");
		}
		if(myGraphicLinesCheckbox.checkedState==true){
			myObjectTypes.push("graphicLines");
		}
		if(myTextFramesCheckbox.checkedState==true){
			myObjectTypes.push("textFrames");
		}
		if(myGroupsCheckbox.checkedState==true){
			myObjectTypes.push("groups");
		}
		if(myImagesCheckbox.checkedState==true){
			myObjectTypes.push("images");
		}
		if(myPDFsCheckbox.checkedState==true){
			myObjectTypes.push("pdfs");
		}
		if(myEPSsCheckbox.checkedState==true){
			myObjectTypes.push("epss");
		}
		//Remove the dialog from memory.
		myDialog.destroy();
		mySelectObjects(myObjectTypes);
	}
	else{
		//Remove the dialog from memory.
		myDialog.destroy();
	}
}
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
function myIsInArray(myString, myArray){
	var myResult = false;
	for (myCounter = 0; myCounter < myArray.length; myCounter ++){
		if (myArray[myCounter] == myString){
			myResult = true;
			break;
		}
	}	
	return myResult;
}