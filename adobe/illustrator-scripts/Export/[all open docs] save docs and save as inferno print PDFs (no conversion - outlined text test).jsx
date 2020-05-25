// uncomment to suppress Illustrator warning dialogs
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    try {    
        var savedDocs = 0;  
        var openDocs = app.documents.length;  
        if (app.documents.length > 0 ) {    
            for ( i = app.documents.length-1; i > -1 ; i-- ){  
                sourceDoc = app.documents[i]; // returns the document object 
                    docName = sourceDoc.name;   
                //=============Find Current Documents path================//    
                var CurrentPath = sourceDoc.path;    
                //=============Establish current documents destination===============//    
                var folderPDF = Folder(CurrentPath + '/' + 'new PDFs');    
                var folderAI = Folder(CurrentPath);
                //=============Check if it exist, if not create it.============//    
                if(!folderPDF.exists) folderPDF.create();                                            
                // Get the file to save the document as pdf into    
//               targetFile = this.getTargetFile(sourceDoc.name, '.pdf', folderPDF);    
                if (folderPDF) {                                    
                
                    var destFile = new File(folderPDF + '/' + docName + "_HR");
                    // Call function to get the names for the files
                    targetFile = getNewName();
                    targetFileAI = getNewNameAI();
            
                    // get the saveoptions for the files
                    pdfSaveOpts = getPDFOptions();
                    illustratorSaveOpts = getAIOptions();
            
                    // Save the AI file first
                    sourceDoc.saveAs( targetFileAI, illustratorSaveOpts );

                    //convert all text to outlines

                    //select all command
                    app.selection = null;  
                    pItems = app.windows[0].activeSpread.pageItems;  
                    app.select (pItems, SelectionOptions.ADD_TO);  
                    //create outlines with selection
                    app.selection.createOutline();
                    //save pdf doc & close
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
//is this irrelevant?''//

function getTargetFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + "_HR" + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += "_HR"
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );
	return myFile;
}

//***************************/
/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName()
{
    var ext, docName, newName, saveInFile, docName;
    docName = sourceDoc.name;
    ext = '_HR_NCC.pdf'; // new extension for pdf file
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
    saveInFileAI = new File( folderAI + '/' + sourceDoc.name );

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
    illustratorSaveOpts.pdfCompatible = false;

    return illustratorSaveOpts;

}
