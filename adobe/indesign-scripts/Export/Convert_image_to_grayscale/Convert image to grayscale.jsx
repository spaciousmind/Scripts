//DESCRIPTION:Convert the selected image to grayscale

// Modified 2019-03-26
// Keith Gilbert, Gilbert Consulting
// www.gilbertconsulting.com

Pre();
  
function Pre () {  
	var  
		_scriptRedraw = app.scriptPreferences.enableRedraw,  
		_userInteraction = app.scriptPreferences.userInteractionLevel;  
		_measurementUnit = app.scriptPreferences.measurementUnit;
	app.scriptPreferences.enableRedraw = false;  
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;  
	app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
	if (app.documents.length) {
		if(app.selection.length == 1) {
			switch(app.selection[0].constructor.name){
				case "Rectangle":
				case "Oval":
				case "Polygon":
					if (app.selection[0].graphics.length == 0) {
						alert("Please select a frame containing a graphic and try again.");
						return;
					}
					app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");
					break;				
				case "TextFrame":
				case "TextBox":
				case "GraphicLine":
				case "Image":
				case "PDF":
				case "EPS":
				case "Character":
				case "Word":
				case "TextStyleRange":
				case "Line":
				case "Paragraph":
				case "TextColumn":
				case "Text":
				case "Table":
				case "Cell":
				default:
					alert("Please select a single image frame containing a graphic and try again.");
					break;
			}
		}
		else {
			alert("Please select a single image frame containing a graphic and try again.");
		}
	}
	else {  
		alert("No InDesign documents are open. Please open a document and try again.");
	}  
	app.scriptPreferences.enableRedraw = _scriptRedraw;  
	app.scriptPreferences.userInteractionLevel = _userInteraction;  
	app.scriptPreferences.measurementUnit = _measurementUnit;
}  

function Main() {
	var myDoc = app.activeDocument;
	var mySelection = app.selection[0];
	mySelection.fillColor = myDoc.swatches.itemByName("Black");
	var myGraphic = mySelection.graphics[0];
	myGraphic.transparencySettings.blendingSettings.blendMode = BlendMode.LUMINOSITY;
}