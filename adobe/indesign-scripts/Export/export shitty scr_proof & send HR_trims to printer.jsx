var time1 = Number(timeString());
myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);
var printerPath = "~/Desktop/HOLD/";
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;

try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
    $.writeln("true");}}
catch(err){
  $.writeln("false");
  var jobFolder = currentPath;}
$.writeln("jobFolder = " +jobFolder);


HRTrimstoPrinter();  //send HR_trims to printer
exportShittyScrProof(); //export shitty screen proof to jobFolder

//If the active document has been changed since it was last saved, save it.
if (app.activeDocument.modified == true){
  app.activeDocument.save();}

  var time2 = Number(timeString());
  alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported: " + docName + "_LR.pdf & HR_trims sent to printer");


alert(Math.round((time2-time1)/1000) +" seconds")



//=======================functions========================
//////function to send HR_trims to printer///////////
function HR_trimstoPrinter(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");
  myDocument.exportFile(ExportFormat.pdfType, File(printerPath + "/" + docName + "_HR_trims.pdf"), false,	myPDFExportPreset);}

//////function to export shitty screen proof to job folder///////////
function exportShittyScrProof(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("shitty screen proof CMYK");
  myDocument.exportFile(ExportFormat.pdfType, File(jobFolder + "/" + docName + "_LR.pdf"), false, myPDFExportPreset);}

////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime();
}
