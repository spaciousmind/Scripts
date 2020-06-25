var time1 = Number(timeString());

myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];

var currentPath = myDocument.filePath;
var parentFolder = decodeURI(currentPath.parent);
var printerPath = "~/Desktop/HOLD/";
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;



sendHR();  //script to send hr to printer
exportHR();  // export hr to project folder

//If the active document has been changed since it was last saved, save it.
if(app.activeDocument.modified == true){
               app.activeDocument.save();
           }


var time2 = Number(timeString());


alert(Math.round((time2-time1)/1000) +" seconds"  +"\n\n" + "exported: " + "\n" + docName + "_HR.pdf" + "and sent" + "_HR.pdf" + "to printer");)





function sendHR(){
    var myDocument = app.documents.item(0);
    var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no trim marks)");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(printerPath + "/" + docName + "_HR.pdf"),
		false,
		myPDFExportPreset
	);
}



function exportHR(){
    var myDocument = app.documents.item(0);
	  var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no trim marks)");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(currentPath + "/" + docName + "_HR.pdf"),
		false,
		myPDFExportPreset
	);

}


////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime();
}
