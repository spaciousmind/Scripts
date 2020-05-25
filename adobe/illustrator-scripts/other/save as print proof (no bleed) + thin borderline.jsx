//*********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, illustratorSaveOpts, pdfSaveOpts;

var idoc = app.activeDocument;  
newCMYKColour = new CMYKColor;
newCMYKColour.black = 100;
newCMYKColour.cyan = 0;
newCMYKColour.magenta = 0;
newCMYKColour.yellow = 0;    
var CurrentPath = activeDocument.path;
var folderPDF = Folder(CurrentPath);
if(!folderPDF.exists) folderPDF.create();

// old version var docName = app.activeDocument.name.match(/^.*[^.ai]/i); 
var docName = app.activeDocument.name.match(/^.*(?=\.ai$)/)

        if (folderPDF) {
            if ( app.documents.length > 0 ) {
                var destFile = new File(folderPDF + '/' + docName + "_HR");
                var sourceDoc = app.activeDocument; 
                
                targetFile = getNewName();
                targetFileAI = getNewNameAI();
                pdfSaveOpts = getPDFOptions( );
                illustratorSaveOpts = getAIOptions();

                var artboardRef = sourceDoc.artboards;
                var rectLayer = sourceDoc.layers.add(); // so all rectangles will add to this layer
                //add rect for all artboards
                for (i = 0; i < artboardRef.length; i++) {
                	var top = artboardRef[i].artboardRect[1];
                	var left = artboardRef[i].artboardRect[0];
                	var width = artboardRef[i].artboardRect[2] - artboardRef[i].artboardRect[0];
                	var height = artboardRef[i].artboardRect[1] - artboardRef[i].artboardRect[3];
                	var rect = idoc.pathItems.rectangle(top, left, width, height);
                	rect.filled = false;
                	rect.strokeColor = newCMYKColour
                	rect.strokeWidth = .5;
                }
    
                sourceDoc.saveAs( targetFile, pdfSaveOpts );
                rectLayer.remove(); // remove layer to remove all rectangles.    
                sourceDoc.saveAs( targetFileAI, illustratorSaveOpts );

                
                }
            }
        



function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '_HR_CMYK_PROOF_nobleed.pdf'; 
	newName = "";		
	for ( var i = 0 ; docName[i] != "." ; i++ )
	{
		newName += docName[i];
	}
	newName += ext; 
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

	var pdfSaveOpts = new PDFSaveOptions();
	pdfSaveOpts.pDFPreset = "Inferno Print File (no bleed)";
	return pdfSaveOpts;
}


function getAIOptions()
{
	var illustratorSaveOpts = new IllustratorSaveOptions();
	illustratorSaveOpts.pdfCompatible = false;
	return illustratorSaveOpts;

}

