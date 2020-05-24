// Written by Kasyan Servetsky
// October 5, 2017
// http://www.kasyan.ho.com.ua
// e-mail: askoldich@yahoo.com
//=========================================================================================================================
if (app.documents.length == 0) ErrorExit("Please open a document and try again.");

const gScriptName = "Create Text Anchors";
const gScriptVersion = "2.0";
var gDoc = app.activeDocument;
if (!gDoc.characterStyles.item("Anchor").isValid) ErrorExit("Character style \"Anchor\" doesn't exist.");

CreateDestinations();

//======================================================== FUNCTIONS  =====================================================
function CreateDestinations() {
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.nothing;
	app.findGrepPreferences.findWhat = ".+";
	app.findGrepPreferences.appliedCharacterStyle = gDoc.characterStyles.item("Anchor");
	var finds = gDoc.findGrep();
	
	var destCounter = 0;

	for ( var j = finds.length-1; j >= 0; j-- ) {
		var found = finds[j];
		var name = found.contents;
		
		try {
			if (!gDoc.hyperlinkTextDestinations.itemByName(name).isValid) {
				var hypTextDest = gDoc.hyperlinkTextDestinations.add(found);
				hypTextDest.name = name;
				destCounter++;
			}
			else {
				var increment = 1;
				while (gDoc.hyperlinkTextDestinations.itemByName(name).isValid) {
					name = name.replace(/\-\d+$/, "") + "-" + increment++;
				}
				

				var hypTextDest = gDoc.hyperlinkTextDestinations.add(found);
				hypTextDest.name = name;
				destCounter++;
			}
		}
		catch(e) {}
	}

	if (destCounter == 0) {
		alert("No text anchors have been created.", gScriptName + " - " + gScriptVersion);
	}
	else if (destCounter == 1) {
		alert("One text anchor has been created.", gScriptName + " - " + gScriptVersion);
	}
	else if (destCounter > 1) {
		alert(destCounter  + " text anchors have been created.", gScriptName + " - " + gScriptVersion);
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function ErrorExit(error, icon) {
	alert(error, gScriptName + " - " + gScriptVersion, icon);
	exit();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------