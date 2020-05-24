/* Copyright 2020, Kasyan Servetsky
April 30, 2020
Written by Kasyan Servetsky
http://www.kasyan.ho.ua
e-mail: askoldich@yahoo.com */
//======================================================================================
var scriptName = "Protect local styling",
doc;

PreCheck();

//===================================== FUNCTIONS ======================================
function ProtectLocalStyling() {
	var fontStyle, charStyle, foundItems, foundItem, notApplied,
	styles = ["Italic", "Bold", "Bold Italic", "Light", "Light Italic", "Book", "Regular Italic", "Medium", "Medium Italic", "Black", "Black Italic", "Semibold", "Semibold Italic"],
	noCharStyle = doc.characterStyles[0];
	
	for (var j = styles.length - 1; j >= 0; j--) {
		fontStyle = styles[j];
		charStyle = doc.characterStyles.item(fontStyle);

		app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
		app.findTextPreferences.appliedCharacterStyle = noCharStyle;
		app.findTextPreferences.fontStyle = fontStyle;
		foundItems = doc.findText();

		for (var i = 0; i < foundItems.length; i++) {
			foundItem = foundItems[i];
			notApplied = CheckParStyle(foundItem, fontStyle);
			
			if (notApplied) {
				if (!charStyle.isValid) charStyle = doc.characterStyles.add({name: fontStyle, fontStyle: fontStyle}); 
				foundItem.applyCharacterStyle(charStyle);
			}
		}
	}

	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function CheckParStyle(txt, fontStyle) {
	var appliedFontStyle = txt.appliedParagraphStyle.fontStyle;

	if (appliedFontStyle == fontStyle) {
		return false;
	}

	return true;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function PreCheck() {
	if (app.documents.length == 0) ErrorExit("Please open a document and try again.", true);
	doc = app.activeDocument;
	if (doc.converted) ErrorExit("The current document has been modified by being converted from older version of InDesign. Please save the document and try again.", true);
	if (!doc.saved) ErrorExit("The current document has not been saved since it was created. Please save the document and try again.", true);
	ProtectLocalStyling();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function ErrorExit(error, icon) {
	alert(error, scriptName, icon);
	exit();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------