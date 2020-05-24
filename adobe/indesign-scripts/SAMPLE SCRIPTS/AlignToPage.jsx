//AlignToPage.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "AlignToPage.jsx" 3.0.0 15 December 2009
*/
//Aligns the items in the selection to the specified location on the page.
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
//
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	var myObjectList = new Array;
	if (app.documents.length != 0){
		if (app.selection.length != 0){
			for(var myCounter = 0;myCounter < app.selection.length; myCounter++){
				switch (app.selection[myCounter].constructor.name){
					case "Rectangle":
					case "Oval":
					case "Polygon":
					case "TextFrame":
					case "Group":
					case "Button":
					case "GraphicLine":
						myObjectList.push(app.selection[myCounter]);
						break;
				}
			}
			if (myObjectList.length != 0){
				myDisplayDialog(myObjectList);
			}
			else{
				alert ("Please select a page item and try again.");
			}
		}
		else{
			alert ("Please select an object and try again.");
		}
	}
	else{
		alert ("Please open a document, select an object, and try again.");
	}
}
function myDisplayDialog(myObjectList){
	var myDialog = app.dialogs.add({name:"AlignToPage"});
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){
			with(dialogColumns.add()){
				with(borderPanels.add()){
					staticTexts.add({staticLabel:"Vertical"});
					var myVerticalAlignmentButtons = radiobuttonGroups.add();
					with(myVerticalAlignmentButtons){
						radiobuttonControls.add({staticLabel:"Top", checkedState: true});
						radiobuttonControls.add({staticLabel:"Center"});
						radiobuttonControls.add({staticLabel:"Bottom"});
						radiobuttonControls.add({staticLabel:"None"});
					}
				}
			}
			with(dialogColumns.add()){
				with(borderPanels.add()){
					staticTexts.add({staticLabel:"Horizontal"});
					var myHorizontalAlignmentButtons = radiobuttonGroups.add();
					with(myHorizontalAlignmentButtons){
						radiobuttonControls.add({staticLabel:"Left", checkedState: true});
						radiobuttonControls.add({staticLabel:"Center"});
						radiobuttonControls.add({staticLabel:"Right"});
						radiobuttonControls.add({staticLabel:"None"});
					}
				}
			}
		}
		with(dialogRows.add()){
			var myConsiderMarginsCheckbox = checkboxControls.add({staticLabel:"Consider Page Margins", checkedState:false});
		}
	}
	var myResult = myDialog.show();
	if(myResult == true){
		myVerticalAlignment = myVerticalAlignmentButtons.selectedButton;
		myHorizontalAlignment = myHorizontalAlignmentButtons.selectedButton;
		myConsiderMargins = myConsiderMarginsCheckbox.checkedState;
		myDialog.destroy();
		if (!((myHorizontalAlignment == 3)&&(myVerticalAlignment == 3))){
			myAlignObjects(myObjectList, myVerticalAlignment, myHorizontalAlignment, myConsiderMargins);
		}
	}
	else{
		myDialog.destroy();
	}
}
function myAlignObjects(myObjectList, myVerticalAlignment, myHorizontalAlignment, myConsiderMargins){
	var myXCenter, myYCenter;
	var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
	var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
	var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
	app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
	app.activeDocument.zeroPoint = [0,0];
	myPage = app.activeWindow.activePage;
	if(myConsiderMargins == true){
		var myMarginPreferences = myPage.marginPreferences;
		if(myPage.side == PageSideOptions.leftHand){
			var myOutsideMargin = myMarginPreferences.left;
			var myInsideMargin = myMarginPreferences.right;
			myXCenter = myOutsideMargin + ((myPageWidth - (myInsideMargin+myOutsideMargin))/2)
		}
		else{
			var myInsideMargin = myMarginPreferences.left;
			var myOutsideMargin = myMarginPreferences.right;
			myXCenter = myInsideMargin + ((myPageWidth - (myInsideMargin+myOutsideMargin))/2)
		}
		var myBottomMargin = myMarginPreferences.bottom;
		var myTopMargin = myMarginPreferences.top;
	    myYCenter = myTopMargin + ((myPageHeight - (myTopMargin+ myBottomMargin))/2)
		switch(myHorizontalAlignment){
			case 0:
				myX = myInsideMargin;
				break;
			case 1:
				myX = myXCenter;
				break;
			case 2:
				myX = myPageWidth - myOutsideMargin;
				break;
			case 3:
				myX = "None";
				break;
		}
		switch(myVerticalAlignment){
			case 0:
				myY = myTopMargin;
				break;
			case 1:
				myY = myYCenter;
				break;
			case 2:
				myY = myPageHeight - myBottomMargin;
				break;
			case 3:
				myY = null;
				break;
		}
	}
	else{
		myXCenter = myPageWidth/2;
		myYCenter = myPageHeight/2;
		switch(myHorizontalAlignment){
			case 0:
				myX = 0;
				break;
			case 1:
				myX = myXCenter;
				break;
			case 2:
				myX = myPageWidth;
				break;
			case 3:
				myX = "None";
				break;
		}
		switch(myVerticalAlignment){
			case 0:
				myY = 0;
				break;
			case 1:
				myY = myYCenter;
				break;
			case 2:
				myY = myPageHeight;
				break;
			case 3:
				myY = "None";
				break;
		}
	}
	for(myCounter = 0; myCounter < myObjectList.length; myCounter ++){
		myAlignObject(myObjectList[myCounter], myX, myY, myHorizontalAlignment, myVerticalAlignment);
	}
	app.activeDocument.viewPreferences.rulerOrigin = myOldRulerOrigin;
}
function myAlignObject(myObject, myX, myY, myHorizontalAlignment, myVerticalAlignment){
	var myBounds = myObject.geometricBounds;
	var myWidth = myBounds[3]-myBounds[1];
	var myHeight = myBounds[2]-myBounds[0];
	switch(myHorizontalAlignment){
		case 0:
			break;
		case 1:
			myX = myX-(myWidth/2);
			break;
		case 2:
			myX = myX-myWidth;
			break;
		case 3:
			myX = myBounds[1];
			break;
	}
	switch(myVerticalAlignment){
		case 0:
			break;
		case 1:
			myY = myY-(myHeight/2);
			break;
		case 2:
			myY = myY-myHeight;
			break;
		case 3:
			myY = myBounds[0];
			break;
	}	
	myObject.move([myX, myY]);
}
