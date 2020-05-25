var pdfSaveOpts = new PDFSaveOptions();
pdfSaveOpts.pDFPreset = "Inferno Print File (no trim marks)"
var abRange = ""
z = 1;



//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var folderPDF = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!folderPDF.exists) folderPDF.create();

var docName = app.activeDocument.name.match(/^.*[^.ai]/i); 
var myDoc = app.activeDocument.name.match();
      var sourceDoc = app.activeDocument; 

        if (folderPDF) {
            if ( app.documents.length > 0 ) {
                var destFile = new File(folderPDF + '/' + docName);
          
                var artboardRef = sourceDoc.artboards;

				for (i = 1; i <= artboardRef.length; i++){

					targetFile = getNewName();

					pdfSaveOpts.artboardRange = z;
                    sourceDoc.saveAs(targetFile,pdfSaveOpts);
                    z = Number(z) + 1;
                    
				}
                

                // Call function to get the names for the files
                targetFileAI = getNewNameAI();
                
                // get the saveoptions for the files
                illustratorSaveOpts = getAIOptions();
                
                // save as original AI
                sourceDoc.saveAs( targetFileAI, illustratorSaveOpts );
                
                
                
                }
            }






function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '_ab' + z + '.pdf'; // new extension for pdf file
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



function getAIOptions()
{
	var illustratorSaveOpts = new IllustratorSaveOptions();
	illustratorSaveOpts.pdfCompatible = false;

	return illustratorSaveOpts;

}
