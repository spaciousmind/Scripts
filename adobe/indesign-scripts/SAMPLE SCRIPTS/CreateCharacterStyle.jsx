//CreateCharacterStyle.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "CreateCharacterStyle.jsx" 3.0.0 15 December 2009
*/
//This script creates a complete character style based on the formatting attributes of the text selection. Note that this differs
//from creating a character style based on example text using the user interface--when you do that, only the formatting attributes
//that differ from the document's default text formatting are recorded by the style.
//To use the script, select some text and run the script. Enter a name for your character style, then click OK to create the style.
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
		if (app.selection.length == 1){
			switch (app.selection[0].constructor.name){
				case "Text":
				case "InsertionPoint":
				case "Character":
				case "Word":
				case "Line":
				case "TextStyleRange":
				case "Paragraph":
				case "TextColumn":
					myDisplayDialog();
					break;
				default:
					alert("The selected object is not a text object. Select some text and try again.");
					break;
			}
		}
		else{
			alert("Please select some text and try again.");
		}
	}
	else{
		alert("No documents are open. Please open a document, select some text, and try again.");
	}
}
function myDisplayDialog(){
	var myDialog = app.dialogs.add({name:"CreateCharacterStyle"});
	with (myDialog.dialogColumns.add()){
		staticTexts.add({staticLabel:"Character Style Name:"});
	}
        with (myDialog.dialogColumns.add()){
		var myCharacterStyleNameField = textEditboxes.add({editContents:"myNewCharacterStyle"});
        }
	var myResult = myDialog.show();
	if (myResult == true){
		var myCharacterStyleName = myCharacterStyleNameField.editContents;
		myDialog.destroy();
		myDefineCharacterStyle(myCharacterStyleName);
	}
	else{
		myDialog.destroy;
	}
}
function myDefineCharacterStyle(myCharacterStyleName){
	var myCharacterStyle;
	var myDocument = app.activeDocument;
	//Create the character style if it does not already exist.
	myCharacterStyle = myDocument.characterStyles.item(myCharacterStyleName);
	try{
		myCharacterStyle.name;
	}
	catch (myError){
		myCharacterStyle = myDocument.characterStyles.add({name:myCharacterStyleName});
	}
	var myCharacter = app.selection[0].insertionPoints.item(0);
	myCharacterStyle.appliedFont = myCharacter.appliedFont;
	myCharacterStyle.fontStyle = myCharacter.fontStyle;
	myCharacterStyle.pointSize = myCharacter.pointSize;
	myCharacterStyle.leading = myCharacter.leading;
	myCharacterStyle.appliedLanguage = myCharacter.appliedLanguage;
	myCharacterStyle.kerningMethod = myCharacter.kerningMethod;
	myCharacterStyle.tracking = myCharacter.tracking;
	myCharacterStyle.capitalization = myCharacter.capitalization;
	myCharacterStyle.position = myCharacter.position;
	myCharacterStyle.ligatures = myCharacter.ligatures;
	myCharacterStyle.noBreak = myCharacter.noBreak;
	myCharacterStyle.horizontalScale = myCharacter.horizontalScale;
	myCharacterStyle.verticalScale = myCharacter.verticalScale;
	myCharacterStyle.baselineShift = myCharacter.baselineShift;
	myCharacterStyle.skew = myCharacter.skew;
	myCharacterStyle.fillColor = myCharacter.fillColor;
	myCharacterStyle.fillTint = myCharacter.fillTint;
	myCharacterStyle.strokeTint = myCharacter.strokeTint;
	myCharacterStyle.strokeWeight = myCharacter.strokeWeight;
	myCharacterStyle.overprintStroke = myCharacter.overprintStroke;
	myCharacterStyle.overprintFill = myCharacter.overprintFill;
	myCharacterStyle.otfFigureStyle = myCharacter.otfFigureStyle;
	myCharacterStyle.otfOrdinal = myCharacter.otfOrdinal;
	myCharacterStyle.otfFraction = myCharacter.otfFraction;
	myCharacterStyle.otfDiscretionaryLigature = myCharacter.otfDiscretionaryLigature;
	myCharacterStyle.otfTitling = myCharacter.otfTitling;
	myCharacterStyle.otfContextualAlternate = myCharacter.otfContextualAlternate;
	myCharacterStyle.otfSwash = myCharacter.otfSwash;
	myCharacterStyle.otfSlashedZero = myCharacter.otfSlashedZero;
	myCharacterStyle.otfHistorical = myCharacter.otfHistorical;
	myCharacterStyle.otfStylisticSets = myCharacter.otfStylisticSets;
	myCharacterStyle.strikeThru = myCharacter.strikeThru;
	if(myCharacter.strikeThru == true){
		myCharacterStyle.strikeThroughColor = myCharacter.strikeThroughColor;
		myCharacterStyle.strikeThroughGapColor = myCharacter.strikeThroughGapColor;
		myCharacterStyle.strikeThroughGapOverprint = myCharacter.strikeThroughGapOverprint;
		myCharacterStyle.strikeThroughGapTint = myCharacter.strikeThroughGapTint;
		myCharacterStyle.strikeThroughOffset = myCharacter.strikeThroughOffset;
		myCharacterStyle.strikeThroughOverprint = myCharacter.strikeThroughOverprint;
		myCharacterStyle.strikeThroughTint = myCharacter.strikeThroughTint;
		myCharacterStyle.strikeThroughType = myCharacter.strikeThroughType;
		myCharacterStyle.strikeThroughWeight = myCharacter.strikeThroughWeight;
	}
	myCharacterStyle.strokeColor = myCharacter.strokeColor;
	myCharacterStyle.strokeTint = myCharacter.strokeTint;
	myCharacterStyle.strokeWeight = myCharacter.strokeWeight;
	myCharacterStyle.tracking = myCharacter.tracking;
	myCharacterStyle.underline = myCharacter.underline;
	if(myCharacter.underline == true){
		myCharacterStyle.underlineColor = myCharacter.underlineColor;
		myCharacterStyle.underlineGapColor = myCharacter.underlineGapColor;
		myCharacterStyle.underlineGapOverprint = myCharacter.underlineGapOverprint;
		myCharacterStyle.underlineGapTint = myCharacter.underlineGapTint;
	        myCharacterStyle.underlineOffset = myCharacter.underlineOffset;
		myCharacterStyle.underlineOverprint = myCharacter.underlineOverprint;
		myCharacterStyle.underlineTint = myCharacter.underlineTint;
		myCharacterStyle.underlineType = myCharacter.underlineType;
		myCharacterStyle.underlineWeight = myCharacter.underlineWeight;
	}
	myCharacterStyle.verticalScale = myCharacter.verticalScale;
}