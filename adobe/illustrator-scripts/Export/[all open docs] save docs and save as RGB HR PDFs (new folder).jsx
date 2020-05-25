// uncomment to suppress Illustrator warning dialogs
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    try {    
        var savedDocs = 0;  
        var openDocs = app.documents.length;  
        if (app.documents.length > 0 ) {    
            pdfSaveOpts = getPDFOptions( );    
            for ( i = app.documents.length-1; i > -1 ; i-- ){  
                sourceDoc = app.documents[i]; // returns the document object    
                //=============Find Current Documents path================//    
                var CurrentPath = sourceDoc.path;    
                //=============Establish current documents destination===============//    
                var folderPDF = Folder(CurrentPath + '/' + 'new PDFs');    
                //=============Check if it exist, if not create it.============//    
                if(!folderPDF.exists) folderPDF.create();                                            
                // Get the file to save the document as pdf into    
                targetFile = this.getTargetFile(sourceDoc.name, '.pdf', folderPDF);    
                if (folderPDF) {                                    
                    // Save as pdf    
                    sourceDoc.save();
                    sourceDoc.saveAs( targetFile, pdfSaveOpts );    
                    sourceDoc.close();    
                    savedDocs++;  
                }    
            }  
      
            if(savedDocs == openDocs)  
            {  
                alert(savedDocs + ' documents saved as PDF' );    
            }  
            else  
            {  
                var difference = openDocs - savedDocs;  
                alert(difference + " documents did not save properly")  
            }  
        }    
        else{    
            throw new Error('There are no documents open!');    
        }    
    }    
    catch(e) {    
        alert( e.message, "Script Alert", true);    
    }    


//**************************/

function getTargetFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + "_RGB_HR" + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += "_RGB_HR"
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );
	return myFile;
}

//***************************/


function getPDFOptions()
{
	// Create the PDFSaveOptions object to set the PDF options
	var pdfSaveOpts = new PDFSaveOptions();
	
	// Setting PDFSaveOptions properties. Please see the JavaScript Reference
	// for a description of these properties.
	// Add more properties here if you like
	pdfSaveOpts.pDFPreset = "RGB HR file";
	
    
	// uncomment to view the pdfs after conversion.
	// pdfSaveOpts.viewAfterSaving = true;
	

	return pdfSaveOpts;
}
