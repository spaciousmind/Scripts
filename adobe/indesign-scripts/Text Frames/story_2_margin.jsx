/*
Story_2_Margin.jsx
Indesign CS5 javascript
Bruno Herfst 2013
Finds stories and resizes and aligns all textframes to pagemargin.
(except for locked layers)
*/

#target indesign
main();

function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		myDoc = app.activeDocument;
		if(app.selection.length != 0){
		    var mySelection = app.selection[0];
		    var myStory = undefined;
			switch(mySelection.constructor.name){
				//we can add insertion points paragraphs too just look them up
                case "TextFrame":
                case "Paragraph":
                case "Text":
                case "Line":
                case "Word":
                case "Character":
                	myStory = mySelection.parentStory
				    break;
		    default:
		        var ws = mySelection.constructor.name;
			    alert("This is a "+ws+" \rPlease select a TextFrame and try again.");
			    exit();
			}
			alignStory(myStory);
		}else{
			alert("Please select a TextFrame and try again.");
		}
	}else{
		alert("Please open a document and try again.");
	}
}

function alignStory(myStory){
	for(var myCounter = myStory.textContainers.length-1; myCounter >= 0; myCounter --){
		var myTextFrame = myStory.textContainers[myCounter];
		switch(myTextFrame.constructor.name){
			case "TextFrame":
				//I use a try statement here so it will continue moving text 
				//even if it finds text on a locked layer.
				try{
  					fit(myTextFrame);
				}
				catch (myError){}
				break;
			default:
				try{
					fit(myTextFrame);
				}
				catch (myError){}
		}
	}
}

function fit(myRect){
	var myPage = myRect.parentPage;
	var marginBounds = getMarginBounds(myPage);
	myRect.geometricBounds = marginBounds;
}

function getMarginBounds(thisPage){
    pH = doRound(thisPage.bounds[2]-thisPage.bounds[0], 3);
    pW = doRound(thisPage.bounds[3]-thisPage.bounds[1], 3);
    if(thisPage.side == PageSideOptions.LEFT_HAND){
		return [thisPage.marginPreferences.top, pW-thisPage.marginPreferences.left, pH-thisPage.marginPreferences.bottom, thisPage.marginPreferences.right];	
	} else { // PageSideOptions.SINGLE_SIDED or PageSideOptions.RIGHT_HAND
		return [thisPage.marginPreferences.top, pW-thisPage.marginPreferences.right, pH-thisPage.marginPreferences.bottom, thisPage.marginPreferences.left];
	} 
}
function doRound(myNum, roundDec) {
	var roundMulit = Math.pow(10,roundDec);
	return Math.round(myNum*roundMulit)/roundMulit;
}