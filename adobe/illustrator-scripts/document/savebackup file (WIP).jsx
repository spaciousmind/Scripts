/**********************************************************

ADOBE SYSTEMS INCORPORATED
Copyright 2005-2010 Adobe Systems Incorporated
All Rights Reserved

NOTICE:  Adobe permits you to use, modify, and
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.
If you have received this file from a source
other than Adobe, then your use, modification,
or distribution of it requires the prior
written permission of Adobe.

*********************************************************/

/**********************************************************

Save as PDFs.jsx

DESCRIPTION

This sample gets files specified by the user from the
selected folder and batch processes them and saves them
as PDFs in the user desired destination with the same
file name.

**********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;
//$.writeln("--------------------------------")


//=============Find Current Documents path================//
var myDoc = app.activeDocument.name.match();
var docName = app.activeDocument.name.match(/[^.ai$]/)
var currentPath = activeDocument.path;
var parentFolder = decodeURI(currentPath.parent);
var printerPath = "~/Desktop/HOLD/";
var jobNumber = currentPath.name.match(/(\d\d\d\d\d)/)[1];

try{ //check for job folder, if none then set it to current folder
  if (currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
    var jobFolder = currentPath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
}}
catch(err){
  var jobFolder = currentPath;}
//$.writeln("jobFolder = " +jobFolder);

var backupFolder = Folder(currentPath + "/" + jobNumber + " Resources" + "/" + "development" + "/" + "backup");
if(!backupFolder.exists) backupFolder.create();
var targetFileBackup = new File (myDoc.filePath + "/" + jobNumber + " Resources" + "/" + "development" + "/" + "backup" + "/" + docName + "_backup" + ".ai");

/*
$.writeln("currentPath = " + currentPath)
$.writeln("parentFolder = " + parentFolder)
$.writeln("jobNumber = " + jobNumber)
$.writeln("backupFolder = " + decodeURI(backupFolder))
$.writeln("targetFileBackup = " + targetFileBackup)
$.writeln("jobFolder = " +  decodeURI(jobFolder))
*/



            if ( app.documents.length > 0 ) {
	var sourceDoc = app.activeDocument;

	// Call function getNewName to get the name and file to save the pdf
//	targetFileBackup = getNewNameBackup();

	targetFileAI = getNewNameAI();
	targetFileBackup = getNewNameBackup();

	// Call function getPDFOptions get the PDFSaveOptions for the files
//	pdfSaveOptsBackup = getPDFOptionsBackup();

	illustratorSaveOpts = getAIOptions();

	// Save as pdf then as orgiinal AI

	sourceDoc.saveAs( targetFileBackup, illustratorSaveOpts);
	sourceDoc.saveAs( targetFileAI, illustratorSaveOpts);
	}





function getNewNameBackup()
{

		var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name.match(/^.*[^.ai]/i);
	ext = ' _backup.ai'; // new extension for pdf file
	newName = "";

	for ( var i = 0 ; docName[i]; i++ )
	{
		newName += docName[i];
	}
	newName += ext; // full pdf name of the file

	// Create a file object to save the pdf
	saveInFileBackup = new File( backupFolder + '/' + newName );
	// Create a file object to save the pdf
	//saveInFileBackup = new File (currentPath + "/" + jobNumber + " Resources" + "/" + "development" + "/" + "backup" + "/" + docName + "_backup" + ".ai");


	return saveInFileBackup;}



function getNewNameAI()
{
	saveInFileAI = new File( currentPath + '/' + sourceDoc.name );

	return saveInFileAI;}



function getAIOptions()
{
	var illustratorSaveOpts = new IllustratorSaveOptions();
	illustratorSaveOpts.pdfCompatible = false;

	return illustratorSaveOpts;}
