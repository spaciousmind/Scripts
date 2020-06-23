var time1 = Number(timeString());

myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

var CurrentPath = myDocument.filePath;


mySnippet();

if(app.activeDocument.modified == true){
	app.activeDocument.save();
	}

var time2 = Number(timeString());
alert (((time2-time1)/1000)+" seconds")

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
	var myPDFExportPreset = app.pdfExportPresets.item("HR_trims (no colour conversion)");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(CurrentPath + "/" + docName + "_NCC_HR_trims.pdf"),
		false,
		myPDFExportPreset
	);
    //</fragment>
}
//</snippet>

function timeString (){
	var now = new Date();
	return now.getTime();
}
