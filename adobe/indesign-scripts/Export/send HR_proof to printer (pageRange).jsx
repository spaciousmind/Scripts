///edit this script to show page 1 to length of pagerange in document
myDocument = app.documents.item(0);
if (app.pdfExportPreferences.pageRange == null){
  var myPageRange = prompt("Choose a Page Range to export", "1-2")}
else{
  var myPageRange = prompt("Choose a Page Range to export", app.pdfExportPreferences.pageRange)}

var time1 = Number(timeString());

var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);
var printerPath = "~/Desktop/HOLD/";

try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
}}
catch(err){

  var jobFolder = currentPath;}
//$.writeln("jobFolder = " +jobFolder);

sendHRProoftoPrinter();  //script to send hr proof to printer

if(app.activeDocument.modified == true){
	app.activeDocument.save();
	}

var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported:" + "\n" + docName + "_" + myPageRange + "_HR_trims.pdf" + "\n" + "and send to printer");


//=======================functions========================
//////function to export shitty screen proof to job folder///////////

//////function to export HR_proof to printer///////////
function sendHRProoftoPrinter(){
	var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File (no bleed)");
	app.pdfExportPreferences.pageRange = myPageRange;
	myDocument.exportFile(ExportFormat.pdfType, File(printerPath + "/" + docName + "_pg" + myPageRange + "_nobleed_HR_PROOF.pdf"), false, myPDFExportPreset);
}




 

function timeString (){
	var now = new Date();
	return now.getTime();}
