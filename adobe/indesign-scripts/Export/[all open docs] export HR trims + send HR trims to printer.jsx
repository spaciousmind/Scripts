var time1 = Number(timeString());


for (var i=0; i < app.documents.length; i++){

myDocument = app.documents.item(i);
var docName = myDocument.name.match(/(.*)(\.[^\.]+)/)[1];
$.writeln(docName);
var printerPath = "~/Desktop/HOLD/";
var currentPath = myDocument.filePath;

sendHR_trims();  //script to send hr proof to printer
exportHR_trims();  // export scr proof to parent folder

//If the active document has been changed since it was last saved, save it.
if(app.activeDocument.modified == true){
               app.activeDocument.save();}
}




var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds")




//<snippet>
function sendHR_trims(){
	//<fragment>
  //  var myDocument = app.documents.item(0);
    var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(printerPath + "/" + docName + "_HR_trims.pdf"),
		false,
		myPDFExportPreset
	);
    //</fragment>
}
//</snippet>

//<snippet>
function exportHR_trims(){
	//<fragment>
//    var myDocument = app.documents.item(0);
	  var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(currentPath + "/" + docName + "_HR_trims.pdf"),
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
