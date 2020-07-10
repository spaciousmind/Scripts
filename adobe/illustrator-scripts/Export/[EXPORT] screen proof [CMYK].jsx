﻿//FIX TIMESTRING FUNCTIONS

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

//var time1 = Number(timeString());
//broken for

//=============Find Current Documents path================//
var currentPath = activeDocument.path;
var parentFolder = decodeURI(currentPath.parent);
var printerPath = "~/Desktop/HOLD/";
//=============Establish current documents destination===============//
var folderPDF = Folder(currentPath);
//=============Check if it exist, if not create it.============//
if(!folderPDF.exists) folderPDF.create();

//var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var docName = app.activeDocument.name.match(/[^.ai$]/)
var myDoc = app.activeDocument.name.match();


        if (folderPDF) {
            if ( app.documents.length > 0 ) {
                var destFile = new File(folderPDF + '/' + docName + "_HR");
                var sourceDoc = app.activeDocument;


                // Call function getNewName to get the name and file to save the pdf
                targetFile = getNewName();
                targetFileAI = getNewNameAI();

                // Call function getPDFOptions get the PDFSaveOptions for the files
                pdfSaveOpts = getPDFOptions();
                illustratorSaveOpts = getAIOptions();

                // Save as pdf then as orgiinal AI
                sourceDoc.saveAs( targetFile, pdfSaveOpts );
                sourceDoc.saveAs( targetFileAI, illustratorSaveOpts);



                }
            }

//var time2 = Number(timeString());
//alert(Math.round((time2-time1)/1000) +" seconds")




/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name.match(/^.*[^.ai]/i);
	ext = ' - CMYK_scr_proof.pdf'; // new extension for pdf file
	newName = "";

	for ( var i = 0 ; docName[i]; i++ )
	{
		newName += docName[i];
	}
	newName += ext; // full pdf name of the file

	// Create a file object to save the pdf
	saveInFile = new File( folderPDF + '/' + newName );


	return saveInFile;
}


function getNewNameAI()
{
	saveInFileAI = new File( folderPDF + '/' + sourceDoc.name );

	return saveInFileAI;
}

function getPDFOptions()
{
	// Create the PDFSaveOptions object to set the PDF options
	var pdfSaveOpts = new PDFSaveOptions();

	// Setting PDFSaveOptions properties. Please see the JavaScript Reference
	// for a description of these properties.
	// Add more properties here if you like
	pdfSaveOpts.pDFPreset = "Screen Proof CMYK";


	// uncomment to view the pdfs after conversion.
	// pdfSaveOpts.viewAfterSaving = true;


	return pdfSaveOpts;
}

function getAIOptions()
{
	var illustratorSaveOpts = new IllustratorSaveOptions();
	illustratorSaveOpts.pdfCompatible = false;

	return illustratorSaveOpts;

}
