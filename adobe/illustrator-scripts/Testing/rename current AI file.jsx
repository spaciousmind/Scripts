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



//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var folderPDF = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!folderPDF.exists) folderPDF.create();

var docName = app.activeDocument.name.match(/^.*[^.ai]/i); 
var myDoc = app.activeDocument.name.match();

var msg = "Enter new name for AI file"

        if (folderPDF) {
            if ( app.documents.length > 0 ) {
                var newName = String(Window.prompt (msg, docName "Rename current AI File"))
                if (newName!=docName)
                {

	                var destFile = new File(folderPDF + '/' + docName + "_NCC_HR");
	                var sourceDoc = app.activeDocument; 
	 
	                
	                // Call function to get the names for the files
	                targetFile = getNewName();
	                targetFileAI = getNewNameAI();
	                
	                // get the saveoptions for the files
	                pdfSaveOpts = getPDFOptions();
	                illustratorSaveOpts = getAIOptions();
	                
	                // Save as pdf, then save as original AI
	 //               sourceDoc.saveAs( targetFile, pdfSaveOpts );
	                sourceDoc.saveAs( targetFileAI, illustratorSaveOpts );
	                
                
                }
                }
            }
        
        
      
/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '_NCC_HR.pdf'; // new extension for pdf file
	newName = "";
		
	for ( var i = 0 ; docName[i] != "." ; i++ )
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
	pdfSaveOpts.pDFPreset = "Inferno Print File (no trim marks - no conversion)";
	
    
	// uncomment to view the pdfs after conversion.
	// pdfSaveOpts.viewAfterSaving = true;
	

	return pdfSaveOpts;
}


function getAIOptions()
{
	var illustratorSaveOpts = new IllustratorSaveOptions();
	illustratorSaveOpts.pdfCompatible = true;

	return illustratorSaveOpts;

}
