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
                var folderPDF = Folder(CurrentPath);    
                var folderAI = Folder(CurrentPath);
                //=============Check if it exist, if not create it.============//    
                if(!folderPDF.exists) folderPDF.create();                                            
                // Get the file to save the document as pdf into    
//               targetFile = this.getTargetFile(sourceDoc.name, '.pdf', folderPDF);    
                if (folderPDF) {                                    
                
                    var destFile = new File(folderPDF + '/' + docName + "_HR");
                    // Call function to get the names for the files
                    targetFileAI = getNewNameAI();
            
                    // get the saveoptions for the files
                    illustratorSaveOpts = getAIOptions();
            
                    // Save as pdf, then save as original AI
                    sourceDoc.saveAs( targetFileAI, illustratorSaveOpts );
                    sourceDoc.close();    
                    savedDocs++;  
                
                }    
            }  
      
            if(savedDocs == openDocs)  
            {  
                alert(savedDocs + ' documents saved as AI files (pdf compatible)' );    
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




function getNewNameAI()
{
    saveInFileAI = new File( folderAI + '/' + sourceDoc.name );

    return saveInFileAI;
}





function getAIOptions()
{
    var illustratorSaveOpts = new IllustratorSaveOptions();
    illustratorSaveOpts.pdfCompatible = true;

    return illustratorSaveOpts;

}
