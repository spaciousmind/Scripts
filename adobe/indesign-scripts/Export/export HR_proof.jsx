var time1 = Number(timeString());

myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);
app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;


try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
    $.writeln("true");}}
catch(err){
  $.writeln("false");
  var jobFolder = currentPath;}
$.writeln("jobFolder = " +jobFolder);

HRProoftoJobFolder();  // export HR proof to job folder

//If the active document has been changed since it was last saved, save it.
if (app.activeDocument.modified == true){
  app.activeDocument.save();}

var time2 = Number(timeString());

alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported: " + docName + "_HR_proof.pdf");

//=======================functions========================
//////function to export HR proof to job folder///////////
function HRProoftoJobFolder() {
  var myDocument = app.documents.item(0);
  var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no bleed)");
  myDocument.exportFile(ExportFormat.pdfType, File(jobFolder + "/" + docName + "_HR_proof.pdf"), false, myPDFExportPreset);}


  ////// function to get the current time //////
function timeString(){
  var now = new Date();
  return now.getTime();}
