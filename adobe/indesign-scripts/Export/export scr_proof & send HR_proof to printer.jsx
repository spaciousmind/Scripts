var time1 = Number(timeString());
myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);
var printerPath = "~/Desktop/HOLD/";

try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
    $.writeln("true");}}
catch(err){
  $.writeln("false");
  var jobFolder = currentPath;}
$.writeln("jobFolder = " +jobFolder);


sendHRProoftoPrinter();  //script to send hr proof to printer
cmykScrProoftoJobFolder();  // export scr proof to job folder

//If the active document has been changed since it was last saved, save it.
if(app.activeDocument.modified == true){
  app.activeDocument.save();}

var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported: " + docName + "_scr-proof.pdf & HR_proof sent to printer");

//=======================functions========================
//////function to export HR_proof to printer///////////
function sendHRProoftoPrinter(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no bleed)");
  myDocument.exportFile(ExportFormat.pdfType, File(printerPath + "/" + docName + "_nobleed_HR_PROOF.pdf"), false, myPDFExportPreset);}

//////function to export screen proof to job folder///////////
function cmykScrProoftoJobFolder(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("Screen Proof CMYK");
  myDocument.exportFile(ExportFormat.pdfType, File(jobFolder + "/" + docName + "_scr-proof.pdf"), false, myPDFExportPreset);}

////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime();
}
