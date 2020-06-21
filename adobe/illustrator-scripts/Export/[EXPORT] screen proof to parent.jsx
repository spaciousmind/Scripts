﻿/**********************************************************ADOBE SYSTEMS INCORPORATEDCopyright 2005-2010 Adobe Systems Incorporated All Rights ReservedNOTICE:  Adobe permits you to use, modify, and dstribute this file in accordance with the termsof the Adobe license agreement accompanying it.  you have received this file from a sourceote than Adobe, then your use, modification,or distribution of it requires the prior writn permission of Adobe.*******************************************************//********************************************************** Sve sPDFs.jsxDESCRIPTIONThis sample gets files specified by the user from theeectdfolder and batch processes them and saves them a DFsi the user desired destination with the same ienam. *****************************************************/// Main Code [Execution of script begins here]// uncomment to suppress Illustrator warning dialogs// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;
//=============Find Current Documents path================//var currentPath = activeDocument.path;
var parentFolder = decodeURI(currentPath.parent);
var printerPath = "~/Desktop/HOLD/";
//var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var docName = app.activeDocument.name.match(/[^.ai$]/)var myDoc = app.activeDocument.name.match();
            if ( app.documents.length > 0 ) {	var sourceDoc = app.activeDocument;
	// Call function getNewName to get the name and file to save the pdf	targetFileParent = getNewNameParent();
	targetFilePrinter = getNewNamePrinter();
	targetFileAI = getNewNameAI();
// Call function getPDFOptions get the PDFSaveOptions for the files	pdfSaveOptsParent = getPDFOptionsParent();
	pdfSaveOptsPrinter = getPDFOptionsPrinter();
	illustratorSaveOpts = getAIOptions();
	// Save as pdf then as orgiinal AI//	sourceDoc.saveAs( targetFilePrinter, pdfSaveOptsPrinter );
	sourceDoc.saveAs( targetFileParent, pdfSaveOptsParent );
	sourceDoc.saveAs( targetFileAI, illustratorSaveOpts);
	}function getNewNameParent(){	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name.match(/^.*[^.ai]/i);
	ext = ' - CMYK_scr_proof.pdf';
 // new extension for pdf file	newName = "";
		for ( var i = 0 ;
  docName[i];
   i++ )	{		newName += docName[i];
	}	newName += ext;
  // full pdf name of the file	// Create a file object to save the pdf	saveInFileParent = new File( parentFolder + '/' + newName );
	return saveInFileParent;}

  function getNewNamePrinter(){	docName = sourceDoc.name.match(/^.*[^.ai]/i);
	ext = ' - HR_proof_nobleed.pdf';
	newName = "";
		for ( var i = 0 ;
  docName[i];
   i++ )	{		newName += docName[i];
	}	newName += ext;
  // full pdf name of the file	saveInFilePrinter = new File( printerPath + '/' + newName );
	return saveInFilePrinter;}

function getNewNameAI(){	saveInFileAI = new File( currentPath + '/' + sourceDoc.name );
	return saveInFileAI;}

function getPDFOptionsParent(){	// Create the PDFSaveOptions object to set the PDF options
  var pdfSaveOptsParent = new PDFSaveOptions();
  // Setting PDFSaveOptions properties. Please see the JavaScript Reference	// for a description of these properties.	// Add more properties here if you like
  pdfSaveOptsParent.pDFPreset = "Screen Proof CMYK";
// uncomment to view the pdfs after conversion.	//
  //  pdfSaveOpts.viewAfterSaving = true;
	 return pdfSaveOptsParent;}

function getPDFOptionsPrinter(){
  var pdfSaveOptsPrinter = new PDFSaveOptions();
  pdfSaveOptsPrinter.pDFPreset = "Inferno Print File (no bleed)"	return pdfSaveOptsParent;}

function getAIOptions(){
  var illustratorSaveOpts = new IllustratorSaveOptions();
  illustratorSaveOpts.pdfCompatible = false;
  return illustratorSaveOpts;}
