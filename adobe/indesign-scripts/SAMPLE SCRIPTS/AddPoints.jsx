﻿//AddPoints.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "AddPoints.jsx" 3.0.0 15 December 2009
*/
//Adds points to the paths of the selected page item(s). Points are added at the midpoint of
//each line segment; on curved line segments, the added point may be closer to one end point
//than it is to the other. This is because the "midpoint" is determined based on the "velocity"
//of the curve.
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//or drop by the InDesign Scripting User to User forum at http://www.adobeforums.com
//
main();
function main(){
	if (app.documents.length != 0){
		if (app.selection.length > 0){
			for(myCounter = 0; myCounter<app.selection.length; myCounter++){
				myPageItem = app.selection[myCounter];
				switch(myPageItem.constructor.name){
					case "Rectangle":
					case "Oval":
					case "Polygon":
					case "TextFrame":
					case "GraphicLine":
						for(myPathCounter = 0; myPathCounter < myPageItem.paths.length; myPathCounter++){
							myAddPoints(myPageItem.paths.item(myPathCounter));
						}
						break;
					default:			
						alert("Please select a rectangle, oval, polygon, graphic line, or text frame and try again.");
						break;
				}
			}
		}
		else{
			alert("Please select an object and try again.");
		}
	}
	else{
		alert("Please open a document, select an object, and try again.");
	}
}
function myAddPoints(myPath){
	myPointArray = new Array;
	for(myPathPointCounter = 0; myPathPointCounter < myPath.pathPoints.length; myPathPointCounter ++){
		myPathPoint = myPath.pathPoints.item(myPathPointCounter);
		if(myPathPointCounter != myPath.pathPoints.length-1){
			myNextPathPoint = myPath.pathPoints.item(myPathPointCounter+1);
		}
		else{
			myNextPathPoint = myPath.pathPoints.item(0);
		}
		//Get the anchor of the current point.
		myBx0 = myPathPoint.anchor[0];
		myBy0 = myPathPoint.anchor[1];
		//Get the right direction of the current point.
		myBx1 = myPathPoint.rightDirection[0];
		myBy1 = myPathPoint.rightDirection[1];
		//Get the left direction of the *next* point.
		myBx2 = myNextPathPoint.leftDirection[0];
		myBy2 = myNextPathPoint.leftDirection[1];
		//Get the anchor of the *next* point.
		myBx3 = myNextPathPoint.anchor[0];
		myBy3 = myNextPathPoint.anchor[1];
    		myPoints = myCalculatePoints(myBx0, myBy0, myBx1, myBy1, myBx2, myBy2, myBx3, myBy3);
		myPointA = myPoints[0];
		myPointB = myPoints[1];
		myPointC = myPoints[2];
		//Add the points to the path point array.
		//If the point is the first point in the array, set it; otherwise
		//set the previous point's right direction.
		if(myPathPointCounter == 0){
			myPointArray.push(myPointA);
			//Add the intermediate point.
			myPointArray.push(myPointB);
			//Add the end point of the current line segment.
			myPointArray.push(myPointC);
		}
		else{
			if(myPathPointCounter == myPath.pathPoints.length-1){
				if (myPath.pathType == PathType.closedPath){
					//Adjust the right direction of the preceding point.
					myPointArray[myPointArray.length-1][2] = myPointA[2];
					//Add the intermediate point.
					myPointArray.push(myPointB);
					//Adjust the left direction of the first point.
					myPointArray[0][0] = myPointC[0];
				}
			}
			else{
				//Adjust the right direction of the preceding point.
				myPointArray[myPointArray.length-1][2] = myPointA[2];
				//Add the intermediate point.
				myPointArray.push(myPointB);
				//Add the end point of the current line segment.
				myPointArray.push(myPointC);
			}
		}
	}
	//Now apply the array of triples (left direction, anchor, right direction) to the path.
	myPath.entirePath = myPointArray;
}
function myCalculatePoints(myBx0, myBy0, myBx1, myBy1, myBx2, myBy2, myBx3, myBy3){
	var myCx0, myCy0, myCx1, myCy1, myCx2, myCy2, myCx3, myCy3;
	var myDx0, myDy0, myDx1, myDy1, myDx2, myDy2, myDx3, myDy3;
	var myPointA, myPointB, myPointC;
	if((myBx1 == myBx0)&&(myBy1 == myBy0)&&(myBx2 == myBx3)&&(myBy2 == myBy3)){
		//Anchor of point 1 of segment 1
		myCx0 = myBx0;
		myCy0 = myBy0;
		//Anchor of point 2 of segment 1
		myCx3 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125;
		myCy3 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125;
		//Anchor of point 1 of segment 2 (not really necessary; same as ending of segment 1)
		myDx0 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125;
		myDy0 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125;
		//Anchor of point 2 of segment 2
		myDx3 = myBx3;
		myDy3 = myBy3;
		//RightDirection of point 1 of segment 1
		myCx1 = myCx0;
		myCy1 = myCy0;
		//LeftDirection of point 2 of segment 1
		myCx2 = myCx3;
		myCy2 = myCy3;
		//RightDirection of point 2 of segment 1 (i.e., point 1 of segment 2)
		myDx1 = myDx0;
		myDy1 = myDy0;
		//LeftDirection of point 2 of segment 2
		myDx2 = myDx3;
		myDy2 = myDy3;
	}
	else{
		//Anchor of point 1 of segment 1
		myCx0 = myBx0;
		myCy0 = myBy0;
		//RightDirection of point 1 of segment 1
		myCx1 = (myBx1 + myBx0) * 0.5;
		myCy1 = (myBy1 + myBy0) * 0.5;
		//LeftDirection of point 2 of segment 1
		myCx2 = (myBx2 + (2 * myBx1) + myBx0) * 0.25;
		myCy2 = (myBy2 + (2 * myBy1) + myBy0) * 0.25;
		//anchor of point 2 of segment 1
		myCx3 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125;
		myCy3 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125;
		//Anchor of point 1 of segment 2 (not really necessary; same as ending of segment 1)
		myDx0 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125;
		myDy0 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125;
		//RightDirection of point 2 of segment 1 (i.e., point 1 of segment 2)
		myDx1 = (myBx3 + (2 * myBx2) + myBx1) * 0.25;
		myDy1 = (myBy3 + (2 * myBy2) + myBy1) * 0.25;
		//LeftDirection of point 2 of segment 2
		myDx2 = (myBx3 + myBx2) * 0.5;
		myDy2 = (myBy3 + myBy2) * 0.5;
		//Anchor of point 2 of segment 2
		myDx3 = myBx3;
		myDy3 = myBy3;
	}
	myPointA = [[myBx0, myBy0], [myCx0, myCy0], [myCx1, myCy1]]
	myPointB = [[myCx2, myCy2], [myCx3, myCy3], [myDx1, myDy1]]
	myPointC = [[myDx2, myDy2], [myDx3, myDy3], [myDx3, myDy3]]
	return [myPointA, myPointB, myPointC]
}