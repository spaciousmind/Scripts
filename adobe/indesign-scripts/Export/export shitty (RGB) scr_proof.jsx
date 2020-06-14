var time1 = Number(timeString());
myDocument = app.documents.item(0);
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var currentPath = decodeURI(myDocument.filePath);


try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
    $.writeln("true");}}
catch(err){
  $.writeln("false");
  var jobFolder = currentPath;}
$.writeln("jobFolder = " +jobFolder);

exportShittyScrProof(); //export shitty screen proof to jobFolder

if(app.activeDocument.modified == true){
	app.activeDocument.save();
	}

var time2 = Number(timeString());
alert(Math.round((time2-time1)/1000) +" seconds" +"\n\n" + "exported: " + docName + "_RGB-LR.pdf");


//=======================functions========================
//////function to export shitty screen proof to job folder///////////
function exportShittyScrProof(){
  var myDocument = app.documents.item(0);
	var myPDFExportPreset = app.pdfExportPresets.item("shitty screen proof RGB");
  myDocument.exportFile(ExportFormat.pdfType, File(jobFolder + "/" + docName + "_RGB-LR.pdf"), false, myPDFExportPreset);}


function timeString (){
	var now = new Date();
	return now.getTime();}





	var myPDFExportPreset = app.pdfExportPresets.item("shitty screen proof RGB");

		File(CurrentPath + "/" + docName + "_RGB-LR.pdf"),
