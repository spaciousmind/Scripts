﻿
myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];

var CurrentPath = myDocument.filePath;
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

mySnippet();

//<snippet>
function mySnippet(){
	//<fragment>
    var myDocument = app.documents.item(0);
	//The document.export parameters are:
	//Format as (use either the ExportFormat.pdfType enumeration
	//or the string "Adobe PDF")
	//To as File
	//ShowingOptions as boolean (setting this option to true displays the
	//PDF Export dialog box)
	//Using as PDF export preset (or a string that is the name of a
	//PDF export preset)
	//The default PDF export preset names are surrounded by square breackets
	//(e.g., "[High Quality Print], [Press Quality], or [Smallest File Size]").
	var myPDFExportPreset = app.pdfExportPresets.item("Chron & RCP");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(CurrentPath + "/" + docName + "_newsprint.pdf"),
		false,
		myPDFExportPreset
	);
    //</fragment>
}
//</snippet>
