﻿/**********************************************************ADOBE SYSTEMS INCORPORATED Copyright 2005-2010 Adobe Systems Incorporated All Rights Reserved NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the termsof the Adobe license agreement accompanying it.  If you have received this file from a source other than Adobe, then your use, modification,or distribution of it requires the prior written permission of Adobe. *********************************************************//********************************************************** Save as PDFs.jsxDESCRIPTIONThis sample gets files specified by the user from the selected folder and batch processes them and saves them as PDFs in the user desired destination with the same file name. **********************************************************/// Main Code [Execution of script begins here]// uncomment to suppress Illustrator warning dialogs// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;//=============Find Current Documents path================//var CurrentPath = activeDocument.path;//=============Establish current documents destination===============//var folderPDF = Folder(CurrentPath + '/' + 'new PDFs');//=============Check if it exist, if not create it.============//if(!folderPDF.exists) folderPDF.create();var docName = app.activeDocument.name.match(/^.*[^.ai]/i); var myDoc = app.activeDocument.name.match();        if (folderPDF) {            if ( app.documents.length > 0 ) {                var destFile = new File(folderPDF + '/' + docName + "_HR");                var sourceDoc = app.activeDocument;                                  // Call function getNewName to get the name and file to save the pdf                targetFile = getNewName();                                // Call function getPDFOptions get the PDFSaveOptions for the files                pdfSaveOpts = getPDFOptions2( );                                // Save as pdf                sourceDoc.save();                sourceDoc.saveAs( targetFile, pdfSaveOpts );                sourceDoc.close();                                                                }            }                                //DONT NEED THIS FOR LABELS.        //open ai file again      //          app.open(File(CurrentPath + '/' + docName + '.ai'));        /*********************************************************getNewName: Function to get the new file name. The primaryname is the same as the source file.**********************************************************/function getNewName(){	var ext, docName, newName, saveInFile, docName;	docName = sourceDoc.name;	ext = '.pdf'; // new extension for pdf file	newName = "";			for ( var i = 0 ; docName[i] != "." ; i++ )	{		newName += docName[i];	}	newName += ext; // full pdf name of the file		// Create a file object to save the pdf	saveInFile = new File( folderPDF + '/' + newName );		return saveInFile;}function getPDFOptions2(){	// Create the PDFSaveOptions object to set the PDF options	var pdfSaveOpts = new PDFSaveOptions();		// Setting PDFSaveOptions properties. Please see the JavaScript Reference	// for a description of these properties.	// Add more properties here if you like	pdfSaveOpts.pDFPreset = "High Quality Print 150LPI 2";	    	// uncomment to view the pdfs after conversion.	// pdfSaveOpts.viewAfterSaving = true;		return pdfSaveOpts;}