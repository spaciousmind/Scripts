//CornerEffects.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "CornerEffects.jsx" 3.0.0 15 December 2009
*/
//Applies corner effects by redrawing the object.
//
//For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html
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
					case "GraphicLine":
					case "TextFrame":
					myObjectList.push(app.selection[myCounter]);
					break;
				}
			}
			if (myObjectList.length != 0){
				myDisplayDialog(myObjectList);	}
			else{
				alert ("Please select a rectangle, oval, polygon, text frame, or graphic line and try again.");
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
	var myStringList = ["all points","first point", "last point", "second point", "third point", "fourth point", "first two", "second and third", "last two", "first and last", "odd points", "even points"]
	//Store the current measurement units.
	var myOldXUnits = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
	var myOldYUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits;
	app.activeDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
	app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
	myDialog = app.dialogs.add({name:"CornerEffects"});
	with(myDialog){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Corner Type:"});
				var myCornerEffectButtons = radiobuttonGroups.add();
				with(myCornerEffectButtons){
					radiobuttonControls.add({staticLabel:"Rounded", checkedState:true});
					radiobuttonControls.add({staticLabel:"Inverse Rounded"});
					radiobuttonControls.add({staticLabel:"Bevel"});
					radiobuttonControls.add({staticLabel:"Inset"});
					radiobuttonControls.add({staticLabel:"Fancy"});
				}
			}
			with(borderPanels.add()){
				with (dialogColumns.add()){
					staticTexts.add({staticLabel:"Options:"});
				}
				with (dialogColumns.add()){
					with (dialogRows.add()){
						with (dialogColumns.add()){
							staticTexts.add({staticLabel:"Offset:", minWidth:50});
							staticTexts.add({staticLabel:"Pattern:", minWidth:50});
						}
						with (dialogColumns.add()){
							var myOffsetEditbox = measurementEditboxes.add({editValue:12});
							var myPatternDropdown = dropdowns.add({stringList:myStringList, selectedIndex:0});
						}
					}
				}
			}
		}
	}
	var myReturn = myDialog.show();
	if (myReturn == true){
		//Get the values from the dialog box.
		var myCornerType = myCornerEffectButtons.selectedButton;
		var myOffset = myOffsetEditbox.editValue;
		var myPattern = myStringList[myPatternDropdown.selectedIndex];
		myDialog.destroy();
		for(myCounter = 0; myCounter<myObjectList.length; myCounter++){
			myChangeCorners(myObjectList[myCounter], myCornerType, myOffset, myPattern);
		}
		//Reset the measurement units.
		app.activeDocument.viewPreferences.horizontalMeasurementUnits = myOldXUnits;
		app.activeDocument.viewPreferences.verticalMeasurementUnits = myOldYUnits;
	}
	else{
		myDialog.destroy();
	}
}
function myChangeCorners(myObject, myCornerType, myOffset, myPattern){
	var myPathPoint, myPoint, myPointA, myPointB, myPointC, myAnchor, myX, myY, myX1, myY1, myX2, myY2, myX3, myY3;
	var myNewX1, myNewY1, myNewX2, myNewY2, myXOffset, myYOffset, myPoint, myPathPoint;
	for(var myPathCounter = 0; myPathCounter < myObject.paths.length; myPathCounter ++){
		var myPath = myObject.paths.item(myPathCounter);
		myPointArray = new Array;
		for (var myPathPointCounter = 0; myPathPointCounter < myPath.pathPoints.length; myPathPointCounter ++){
			//Is the point a qualifying point?
			if(myPointTest(myPathPointCounter, myPath, myPattern) == false){
				myX1 = myPath.pathPoints.item(myPathPointCounter).leftDirection[0];
				myY1 = myPath.pathPoints.item(myPathPointCounter).leftDirection[1];
				myX2 = myPath.pathPoints.item(myPathPointCounter).anchor[0];
				myY2 = myPath.pathPoints.item(myPathPointCounter).anchor[1];
				myX3 = myPath.pathPoints.item(myPathPointCounter).rightDirection[0];
				myY3 = myPath.pathPoints.item(myPathPointCounter).rightDirection[1];
				myPoint = [[myX1, myY1], [myX2, myY2], [myX3, myY3]];
				myPointArray.push(myPoint);
			}
			else{
				myPointA = myPath.pathPoints.item(myPathPointCounter);
				myAnchor = myPointA.anchor;
				myX1 = myAnchor[0];
				myY1 = myAnchor[1];
				//myPointB is the *next* point on the path. If myPathPoint is the last point on the path, then
				//myPointB is the first point on the path.
				if (myPathPointCounter == (myPath.pathPoints.length - 1)){
					myPointB = myPath.pathPoints.item(0);
				}
				else{
					myPointB = myPath.pathPoints.item(myPathPointCounter + 1);
				}
				myAnchor = myPointB.anchor;
				myX2 = myAnchor[0];
				myY2 = myAnchor[1];
				//myPointC is the *previous* point on the path. If myPathPoint is the first point on the path,
				//then myPointC is the last point on the path.
				if (myPathPointCounter == 0){
					myPointC = myPath.pathPoints.item(myPath.pathPoints.length - 1);
				}
				else{
					myPointC = myPath.pathPoints.item((myPathPointCounter - 1) % myPath.pathPoints.length);
				}
				myAnchor = myPointC.anchor;
				myX3 = myAnchor[0];
				myY3 = myAnchor[1];
				var myPoints = myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset);
				myNewX1 = myPoints[0];
				myNewY1 = myPoints[1];
				myNewX2 = myPoints[2];
				myNewY2 = myPoints[3];
				//Calculate new path point values based on the path effect type.
				//We won't add the points to the path one at a time; instead, we'll
				//create an array that holds all of the point locations and curve
				//handle positions, and we will then 
				switch (myCornerType){
					case 0:
						//Rounded corner effect.
						myPoint = [[myNewX2, myNewY2], [myNewX2, myNewY2], [myX1, myY1]];
						myPointArray.push(myPoint);
						myPoint = [[myNewX1, myNewY1], [myNewX1, myNewY1], [myNewX1, myNewY1]];
						myPointArray.push(myPoint);
						break;
					case 1:
						//Inverse Rounded corner effect.
						myPoint = [[myNewX2, myNewY2], [myNewX2, myNewY2], [(myNewX2 + myNewX1 - myX1), (myNewY2 + myNewY1 - myY1)]];
						myPointArray.push(myPoint);
						myPoint = [[myNewX1, myNewY1], [myNewX1, myNewY1], [myNewX1, myNewY1]];
						myPointArray.push(myPoint);
						break;
					case 2:
						//Bevel corner effect.
						myPoint = [[myNewX2, myNewY2], [myNewX2, myNewY2], [myNewX2, myNewY2]];
						myPointArray.push(myPoint);
						myPoint = [[myNewX1, myNewY1], [myNewX1, myNewY1], [myNewX1, myNewY1]];
						myPointArray.push(myPoint);
						break;
					case 3:
						//Inset corner effect.
						myPoint = [[myNewX2, myNewY2], [myNewX2, myNewY2], [myNewX2, myNewY2]];
						myPointArray.push(myPoint);
						myPoint = [[(myNewX2 + myNewX1 - myX1), (myNewY2 + myNewY1 - myY1)],[(myNewX2 + myNewX1 - myX1), (myNewY2 + myNewY1 - myY1)],[(myNewX2 + myNewX1 - myX1), (myNewY2 + myNewY1 - myY1)]];
						myPointArray.push(myPoint);
						myPoint = [[myNewX1, myNewY1], [myNewX1, myNewY1], [myNewX1, myNewY1]];
						myPointArray.push(myPoint);
						break;
					case 4:
						//Fancy corner effect.
						var myOneThird = 0.33333333332;
						var myTwoThirds = 0.666666666667
						var myPointZX = myNewX2 + myNewX1 - myX1;
						var myPointZY = myNewY2 + myNewY1 - myY1;
						var myTemp1X = (myX1 - myNewX2) * myTwoThirds;
						var myTemp1Y = (myY1 - myNewY2) * myTwoThirds;
						var myTemp2X = (myX1 - myNewX1) * myTwoThirds;
						var myTemp2Y = (myY1 - myNewY1) * myTwoThirds;
						var myPointDX = myPointZX + myOneThird * (myNewX1 - myPointZX);
						var myPointDY = myPointZY + myOneThird * (myNewY1 - myPointZY);
						var myPointEX = myPointZX + myOneThird * (myNewX2 - myPointZX);
						var myPointEY = myPointZY + myOneThird * (myNewY2 - myPointZY);
						var myPointFX = myPointDX + myTwoThirds * (myX1 - myTemp1X - myPointDX);
						var myPointFY = myPointDY + myTwoThirds * (myY1 - myTemp1Y - myPointDY);
						var myPointGX = myPointEX + myTwoThirds * (myX1 - myTemp2X - myPointEX);
						var myPointGY = myPointEY + myTwoThirds * (myY1 - myTemp2Y - myPointEY);
						var myPointHX = myPointZX + myTemp1X + myTemp2X;
						var myPointHY = myPointZY + myTemp1Y + myTemp2Y;
						myPoint = [[myNewX2, myNewY2],[myNewX2, myNewY2],[myNewX2, myNewY2]];
						myPointArray.push(myPoint);
						myPoint = [[myPointEX, myPointEY],[myPointEX, myPointEY],[myPointEX, myPointEY]];
						myPointArray.push(myPoint);
						myPoint = [[myPointGX, myPointGY],[myPointGX, myPointGY],[myPointGX, myPointGY]];
						myPointArray.push(myPoint);
						myPoint = [[myPointHX, myPointHY],[myPointHX, myPointHY],[myPointHX, myPointHY]];
						myPointArray.push(myPoint);
						myPoint = [[myPointFX, myPointFY],[myPointFX, myPointFY],[myPointFX, myPointFY]];
						myPointArray.push(myPoint);
						myPoint = [[myPointDX, myPointDY],[myPointDX, myPointDY],[myPointDX, myPointDY]];
						myPointArray.push(myPoint);
						myPoint = [[myNewX1, myNewY1],[myNewX1, myNewY1],[myNewX1, myNewY1]];
						myPointArray.push(myPoint);
						break;
				}
			}
		}
		myPath.entirePath = myPointArray;
	}
}
function myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset){
	var myXAdjust, myYAdjust, myNewX1, myNewY1, myNewX2, myNewY2, myHypotenuse;
	myHypotenuse = Math.sqrt(Math.pow((myX1 - myX2),2) + Math.pow((myY1 - myY2),2));
	if (myY1 != myY2) {
		myXAdjust = ((myX1 - myX2) / myHypotenuse) * myOffset;
		myYAdjust = ((myY1 - myY2) / myHypotenuse) * myOffset;
		myNewX1 = myX1 - myXAdjust;
		myNewY1 = myY1 - myYAdjust;
	}
	else {
		myXAdjust = myOffset;
		myYAdjust = 0;
		if (myX1 < myX2) {
			myNewX1 = myX1 + myXAdjust;
			myNewY1 = myY1 + myYAdjust;
		}
		else{
			myNewX1 = myX1 - myXAdjust;
			myNewY1 = myY1 - myYAdjust;
		}
	}
	myHypotenuse = Math.sqrt(Math.pow((myX1 - myX3),2) + Math.pow((myY1 - myY3),2));
	if (myY1 != myY3) {
		myXAdjust = ((myX1 - myX3) / myHypotenuse) * myOffset;
		myYAdjust = ((myY1 - myY3) / myHypotenuse) * myOffset;
		myNewX2 = myX1 - myXAdjust;
		myNewY2 = myY1 - myYAdjust;
	}
	else{
		myXAdjust = myOffset;
		myYAdjust = 0;
		if (myX1 < myX3) {
			myNewX2 = myX1 + myXAdjust;
			myNewY2 = myY1 + myYAdjust;
		}
		else{
			myNewX2 = myX1 - myXAdjust;
			myNewY2 = myY1 - myYAdjust;
		}
	}
	return [myNewX1, myNewY1, myNewX2, myNewY2];
}
function myPointTest(myPathPointCounter, myPath, myPattern){
	//Do not apply the corner effect to the first or last point in an open path 
	//(this is the way that InDesign's corner effects work).
	if((myPath.pathType == PathType.openPath)&&((myPathPointCounter ==0)||(myPathPointCounter == myPath.pathPoints.length-1))){
		return false;
	}
	else{
		switch(myPattern){
			case "all points":
				return true;
			case "first point":
				if(myPathPointCounter == 0){
					return true;
				}
				else{
					return false;
				}
			case "last point":
				if(myPathPointCounter == myPath.pathPoints.length-1){
					return true;
				}
				else{
					return false;
				}			
			case "second point":
				if(myPathPointCounter == 1){
					return true;
				}
				else{
					return false;
				}
			case "third point":
				if(myPathPointCounter == 2){
					return true;
				}
				else{
					return false;
				}
			case "fourth point":
				if(myPathPointCounter == 3){
					return true;
				}
				else{
					return false;
				}
			case "first two":
				if((myPathPointCounter == 0)||(myPathPointCounter == 1)){
					return true;
				}
				else{
					return false;
				}
			case "second and third":
				if((myPathPointCounter == 1)||(myPathPointCounter == 2)){
					return true;
				}
				else{
					return false;
				}
			case "last two":
				if((myPathPointCounter == (myPath.pathPoints.length-2))||(myPathPointCounter == (myPath.pathPoints.length-1))){
					return true;
				}
				else{
					return false;
				}
			case "first and last":
				if((myPathPointCounter == 0)||(myPathPointCounter == (myPath.pathPoints.length-1))){
					return true;
				}
				else{
					return false;
				}
			//Because myPathPointCounter starts at 0, the even points on the path
			//actually fall on the odd numbers (when myPathPointCounter = 1, it's
			//the second point on the path). Therefore, we use % (mod) 2 != 0 for
			//even numbers.
			case "even points":
				if(myPathPointCounter % 2 != 0){
					return true;
				}
				else{
					return false;
				}
			case "odd points":
				if(myPathPointCounter % 2 == 0){
					return true;
				}
				else{
					return false;
				}
		}		
	}
}