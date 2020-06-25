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
    $.writeln("true");}}
catch(err){
  $.writeln("false");
  var jobFolder = currentPath;}
$.writeln("jobFolder = " +jobFolder);

sendHR_trims();  //script to send hr trims to printer
exportHR_trims();  // export hr trims to job folder

if(app.activeDocument.modified == true){
	app.activeDocument.save();
	}

var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported:" + "\n" + docName + "_" + myPageRange + "_HR_trims.pdf" + "\n" + "and send to printer");


//=======================functions========================
//////function to export shitty screen proof to job folder///////////
function exportShittyScrProof(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("shitty screen proof CMYK");
    app.pdfExportPreferences.pageRange = myPageRange;
  myDocument.exportFile(ExportFormat.pdfType, File(jobFolder + "/" + docName + "_" + myPageRange + "_LR.pdf"), false, myPDFExportPreset);}


function exportHR_trims(){
	//<fragment>
    var myDocument = app.documents.item(0);
	  var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");
    app.pdfExportPreferences.pageRange = myPageRange;

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(jobFolder + "/" + docName + "_" + myPageRange + "_HR_trims.pdf"),
		false,
		myPDFExportPreset
  );
}

function sendHR_trims(){
	//<fragment>
    var myDocument = app.documents.item(0);
    var myPDFExportPreset = app.pdfExportPresets.item("Inferno Print File 2");
    app.pdfExportPreferences.pageRange = myPageRange;

    myDocument.exportFile(
		ExportFormat.pdfType,
		File(printerPath + "/" + docName + "_" + myPageRange + "_HR_trims.pdf"),
		false,
		myPDFExportPreset
  );
}

function timeString (){
	var now = new Date();
	return now.getTime();}
