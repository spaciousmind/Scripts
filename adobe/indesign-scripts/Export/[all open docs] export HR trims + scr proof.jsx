var time1 = Number(timeString());


for (var i=0; i < app.documents.length; i++){

myDocument = app.documents.item(i);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];

var CurrentPath = myDocument.filePath;
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

mySnippet();
mySnippet2();
// mySnippet3();


//If the active document has been changed since it was last saved, save it.
if(app.activeDocument.modified == true){
               app.activeDocument.save();}
}




var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds")




//<snippet>
function mySnippet(){
	//<fragment>
    var myDocument = app.documents.item(i);
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
	var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(CurrentPath + "/" + docName + "_HR_trims.pdf"),
		false,
		myPDFExportPreset
	);
    //</fragment>
}
//</snippet>



//<snippet>
function mySnippet2(){
	//<fragment>
    var myDocument = app.documents.item(i);
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
	var myPDFExportPreset = app.pdfExportPresets.item("Screen Proof CMYK");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(CurrentPath + "/" + docName + "_CMYK-scr-proof.pdf"),
		false,
		myPDFExportPreset
	);
    //</fragment>
}
//</snippet>

////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime();
}
