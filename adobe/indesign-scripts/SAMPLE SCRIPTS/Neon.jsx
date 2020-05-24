//Neon.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "Neon.jsx" 3.0.0 15 December 2009
*/
//This script creates a "blend" or "graduation" from the selected object or objects.
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
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
					case "GraphicLine":
						myObjectList.push(app.selection[myCounter]);
					break;
				}
			}
			if (myObjectList.length != 0){
				myDisplayDialog(myObjectList);
			}
			else{
				alert ("Please select a rectangle, oval, polygon, or graphic line and try again.");
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
	var mySwatchNamesList = new Array;
	var myLayerNamesList = new Array;
	for(var myCounter = 0;myCounter < app.activeDocument.colors.length; myCounter ++){
		//Do not add(); unnamed colors.
		if(app.activeDocument.colors.item(myCounter).name != ""){
			switch(app.activeDocument.colors.item(myCounter).name){
				case "Cyan":
				case "Magenta":
				case "Yellow":
				case "Registration":
				case "Paper":
					break;
				default:
					mySwatchNamesList.push(app.activeDocument.colors.item(myCounter).name);
			}
		}
	}
	for(var myCounter = 0;myCounter < app.activeDocument.mixedInks.length; myCounter ++){
		mySwatchNamesList.push(app.activeDocument.mixedInks.item(myCounter).name);
	}
	for(var myCounter = 0;myCounter < app.activeDocument.layers.length; myCounter ++){
		myLayerNamesList.push(app.activeDocument.layers.item(myCounter).name);
	}
	myLayerNamesList.push("New Layer");
	var myDialog = app.dialogs.add({name:"Neon"});
	with(myDialog){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Number of Steps:"});
				}
				with(dialogColumns.add()){
					var myNumberOfStepsField = integerEditboxes.add({editValue:12});
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"From:", minWidth:36});
				}
				with(dialogColumns.add()){
					with(dialogRows.add()){
						with(dialogColumns.add()){
							staticTexts.add({staticLabel:"Stroke Color:", minWidth:100});
						}
						with(dialogColumns.add()){
							var myFromStrokeColorMenu = dropdowns.add({stringList:mySwatchNamesList, selectedIndex:0});
						}
					}
					with(dialogRows.add()){
						with(dialogColumns.add()){
							staticTexts.add({staticLabel:"Stroke Weight:", minWidth:100});
						}
						with(dialogColumns.add()){
							var myFromStrokeWeightField = realEditboxes.add({editValue:12});
						}
					}
					with(dialogRows.add()){
						with(dialogColumns.add()){
							staticTexts.add({staticLabel:"Stroke Tint:", minWidth:100});
						}
						with(dialogColumns.add()){
							var myFromStrokeTintField = percentEditboxes.add({editValue:100});
						}
					}
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"To:", minWidth:36});
				}
				with(dialogColumns.add()){
					with(dialogRows.add()){
						with(dialogColumns.add()){
							staticTexts.add({staticLabel:"Stroke Weight:", minWidth:100});
						}
						with(dialogColumns.add()){
							var myToStrokeWeightField = realEditboxes.add({editValue:.25});
        	            			}
					}
					with(dialogRows.add()){
						with(dialogColumns.add()){
							staticTexts.add({staticLabel:"Stroke Tint:", minWidth:100});

						}
						with(dialogColumns.add()){
							var myToStrokeTintField = percentEditboxes.add({editValue:0});
						}
					}
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel:"Destination Layer:"});
				}
				with(dialogColumns.add()){
					var myLayersMenu = dropdowns.add({stringList:myLayerNamesList, selectedIndex:1});
				}
			}
		}
	}
	var myResult = myDialog.show();
	if(myResult == true){
		//Get the values from the dialog box controls
		var myNumberOfSteps = myNumberOfStepsField.editValue;
		var myFromStrokeColor = mySwatchNamesList[myFromStrokeColorMenu.selectedIndex];
		var myFromStrokeWeight = myFromStrokeWeightField.editValue;
		var myToStrokeWeight = myToStrokeWeightField.editValue;
		var myFromStrokeTint = myFromStrokeTintField.editValue;
		var myToStrokeTint = myToStrokeTintField.editValue;
		var myLayerName = myLayerNamesList[myLayersMenu.selectedIndex];
		myDialog.destroy();
		myNeon(myObjectList, myNumberOfSteps, myFromStrokeColor, myFromStrokeWeight, myToStrokeWeight, myFromStrokeTint, myToStrokeTint, myLayerName);
	}
	else{
		myDialog.destroy();
	}
}
function myNeon(myObjectList, myNumberOfSteps, myFromStrokeColor, myFromStrokeWeight, myToStrokeWeight, myFromStrokeTint, myToStrokeTint, myLayerName){	
	var myDocument = app.activeDocument;
	if (myLayerName == "New Layer"){
		var myLayer = myDocument.layers.add();
	}
	else{
		var myLayer = myDocument.layers.item(myLayerName);
	}
	var myTintIncrement = (myFromStrokeTint - myToStrokeTint) / myNumberOfSteps;
	var myStrokeIncrement = (myFromStrokeWeight - myToStrokeWeight) / myNumberOfSteps;
	for(var myObjectCounter = 0; myObjectCounter<myObjectList.length; myObjectCounter++){
		var myNeonItems = new Array;
		var myObject = myObjectList[myObjectCounter];
		//Apply the "From" properties to the original object.
		myObject.strokeWeight = myFromStrokeWeight;
		myObject.strokeColor = myDocument.swatches.item(myFromStrokeColor);
		myObject.strokeTint = myFromStrokeTint;
		if (myObject.strokeTint == -1){
			myStrokeTint = 100;
		}
		else{
			myStrokeTint = myObject.strokeTint;
		}
		myNeonItems[0] = myObject;
		for (myCounter = 1;myCounter<=myNumberOfSteps; myCounter++){
			var myClone = myObject.duplicate();
			myClone.bringToFront();
			myClone.strokeWeight = myObject.strokeWeight - (myStrokeIncrement * myCounter);
			myClone.strokeTint = myStrokeTint - (myTintIncrement * myCounter);
			myNeonItems.push(myClone);
		}
		//Group the blend items.
    	var myGroup = app.activeWindow.activeSpread.groups.add(myNeonItems);
		//Assign the group to a layer.
		myGroup.itemLayer = myLayer
	}
}