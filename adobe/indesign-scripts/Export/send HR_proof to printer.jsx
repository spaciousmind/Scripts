var time1 = Number(timeString());
myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);
var printerPath = "~/Desktop/HOLD/";
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

sendHRProoftoPrinter();  //script to send hr proof to printer


//If the active document has been changed since it was last saved, save it.
if(app.activeDocument.modified == true){
  app.activeDocument.save();}

var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + docName + "HR_proof sent to printer");

//=======================functions========================
//////function to export HR_proof to printer///////////
function sendHRProoftoPrinter(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no bleed)");
  myDocument.exportFile(ExportFormat.pdfType, File(printerPath + "/" + docName + "_nobleed_HR_PROOF.pdf"), false, myPDFExportPreset);}


////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime();
}
