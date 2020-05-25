//SaveAsAI12.jsx 
 
//DESCRIPTION 
 
//This sample gets files specified by the user from the  
//selected folder and batch processes them and saves them  
//as PDFs in the user desired destination with the same  
//file name. 
 
//**********************************************************/  
  
// Main Code [Execution of script begins here]  
  
// uncomment to suppress Illustrator warning dialogs  
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;  
  
var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, illustratorSaveOpts;  
  
// Select the source folder.  
sourceFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to AI', '~' );  
  
// If a valid folder is selected  
if ( sourceFolder != null )  
{  
    files = new Array();  
    fileType = prompt( 'Select type of Illustrator files to you want to process. Eg: *.ai', ' ' );  
      
    // Get all files matching the pattern  
    files = sourceFolder.getFiles( fileType );  
      
    if ( files.length > 0 )  
    {  
        // Get the destination to save the files  
        destFolder = Folder.selectDialog( 'Select the folder where you want to save the converted AI files.', '~' );  
        for ( i = 0; i < files.length; i++ )  
        {  
            var optRef = new OpenOptions();  
            optRef.updateLegacyText = true;  
  
  
            sourceDoc = app.open(files[i], DocumentColorSpace.CMYK, optRef); // returns the document object  
                                      
            // Call function getNewName to get the name and file to save the ai  
            targetFile = getNewName();  
              
            // Call function getIllustratorOptions get the illustratorSaveOptions for the files  
            illustratorSaveOpts = getIllustratorOptions( );  
              
            // Save as AI  
            sourceDoc.saveAs( targetFile, illustratorSaveOpts );  
              
            sourceDoc.close();  
        }  
        alert( 'Files are saved as AI in ' + destFolder );  
    }  
    else  
    {  
        alert( 'No matching files found' );  
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
    ext = '.ai'; // new extension for AI file  
    newName = "";  
          
    for ( var i = 0 ; docName[i] != "." ; i++ )  
    {  
        newName += docName[i];  
    }  
    newName += ext; // full AI name of the file  
      
    // Create a file object to save the ai file  
    saveInFile = new File( destFolder + '/' + newName );  
      
  
    return saveInFile;  
}  
  
  
  
  
/********************************************************* 
 
getIllustratorOptions: Function to set the AI saving options of the  
files using the illustratorSaveOptions object. 
 
**********************************************************/  
  
function getIllustratorOptions()  
{  
      
    // Create the PDFSaveOptions object to set the AI options  
    var illustratorSaveOpts = new IllustratorSaveOptions();  
      
    // Setting IllustratorSaveOptions properties.   
    illustratorSaveOpts.embedLinkedFiles = true;  
    illustratorSaveOpts.fontSubsetThreshold = 0.0  
    illustratorSaveOpts.pdfCompatible = true  
    illustratorSaveOpts.compatibility = Compatibility.ILLUSTRATOR14  
    illustratorSaveOpts.embedICCProfile =  false  
  
    return illustratorSaveOpts;  