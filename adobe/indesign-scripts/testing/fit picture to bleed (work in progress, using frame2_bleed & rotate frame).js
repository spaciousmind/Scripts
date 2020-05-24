/*
Remove_Frame_Rotation.jsx
An InDesign Javascript
Bruno Herfst 2011
version 1.1
Moves the rotation of frames to it’s contents.
This way you end up with rotated content in stead of rotated frames.
*/

#target indesign;

main();

function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		if(app.selection.length != 0){
			//Get the first item in the selection.
			for(var i=0;i<app.selection.length;i++){
				var mySelection = app.selection[i];
				//alert(mySelection.constructor.name)
				switch(app.selection[i].constructor.name){
					case "Image":
					case "EPS":
					case "PDF":
					case "AI":
					case "ImportedPage":
						break;
					default:
						alert("Please select an image and try again.");
						exit();
				}
			}
			straighten(app.selection);

		}else{
			alert("Please select an image and try again.");
		}
	}else{
		alert("Please open a document and try again.");
	}
}


funtion scaleImage(myImg){
	for(var i=0;i<app.selection.length;i++){
		var myImg = app.selection[i];
		var myRect = myImg.parent,
			imgBounds = myImg.geometricBounds;
		var myPage = myRect.parentPage
		var mySpread = myPage.parent;

		//check bounds
		var rectBounds = myRect.geometricBounds,
			pageBounds = myPage.bounds, 
			//in the format [y1, x1, y2, x2], top-left and bottom-right pageWidth = myPage.bounds[3]-myPage.bounds[1];
			pageWidth = myPage.bounds[3]-myPage.bounds[1];

		//check bleed (can be made more specific, good for now)
		var bleed = myDoc.documentPreferences.documentBleedTopOffset;
		
		//check if image meant to be a spread
		if(rectBounds[1] < pageWidth*0.25 && rectBounds[3] > pageWidth*1.75){
			//spread
			var bleedBound = new Array(-bleed,-bleed,pageBounds[2]+bleed,pageWidth*2+bleed);
		else{
			//page
			if(mydoc.documentPreferences.facingPages {
				if(mypage.side == PageSideOptions.RIGHT_HAND){
					var bleedBound = new Array(pageBounds[0]-bleed,pageBounds[1],pageBounds[2]+bleed,pageBounds[3]+bleed);
				} else if(myPage.side == PageSideOptions.LEFT_HAND){
					var bleedBound = new Array(pageBounds[0]-bleed,pageBounds[1]-bleed,pageBounds[2]+bleed,pageBounds[3]);
				} else { //pageSideOptions.SINGLE_SIDED
					var bleedBound = new Array(pageBounds[0]-bleed,pageBounds[1]-bleed,pageBounds[2]+bleed,pageBounds[3]+bleed);
				}

				}
			})
		}
		}

	}
}



function straighten(myImg){
	for(var i=0;i<app.selection.length;i++){
		var myImg = app.selection[i];
		//Find out what the rotation angle is
		var myRect = myImg.parent,
			rectRot = myRect.rotationAngle,
			imgBounds = myImg.geometricBounds;
		
		//Create the transformation matrix
		var rectTransformationMatrix = app.transformationMatrices.add({counterclockwiseRotationAngle:-rectRot});
			imgTransformationMatrix = app.transformationMatrices.add({counterclockwiseRotationAngle:rectRot});
		// Rotate a rectangle "myRectangle" around its center point
		myRect.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, rectTransformationMatrix);
		myImg.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, imgTransformationMatrix);
		
		myImg.geometricBounds = imgBounds;
	}
}