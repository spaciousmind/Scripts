var time1 = Number(timeString());

// Save the display dialogs
var startDisplayDialogs = app.displayDialogs
// display no dialogs
app.displayDialogs = DialogModes.NO

// set starting unit prefs
    startRulerUnits = preferences.rulerUnits;
// Set units to pixels
    preferences.rulerUnits = Units.PIXELS;

//try {

    if (app.documents.length > 0 ) {

        var options, i, sourceDoc, targetFile;
        for ( i = app.documents.length-1; i > -1 ; i-- ){


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var folderJPG = Folder(CurrentPath + "/JPG");
//=============Check if it exist, if not create it.============//
if(!folderJPG.exists) folderJPG.create();
 
var HRdoc = app.activeDocument
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];  
var saveFile = File(CurrentPath +"/JPG/"+ docName + "_HR.jpg");




saveJPG_HR();
function saveJPG_HR() {
    try{
    activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
    }
    catch(e){
     }
    SaveJPG(saveFile);
}


if  ( HRdoc.width > 800 ) {
    saveJPG_LR();
    }

else{
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)
    }

}


//-----------------------------------------------------------
//                        CLOSING ARGUMENTS
//===========================================================



// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;

var time2 = Number(timeString());
alert(((time2-time1)/1000)+" seconds ")
}






//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================


////// function save HR jpeg //////
function SaveJPG(saveFile){
    var jpgOpts = new ExportOptionsSaveForWeb; 
    jpgOpts.format = SaveDocumentType.JPEG
    jpgOpts.quality = 100;
    activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,jpgOpts); 
}


////// function save LR jpeg //////
function saveJPG_LR() {
// change saveFile suffix to _LR.jpg
    var saveFile = File(CurrentPath +"/JPG/"+ docName + "_LR.jpg");
// duplicate original document
    var LRdoc = app.activeDocument.duplicate(docName + "_LR", true);
// close original document
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)


    LRdoc.resizeImage( 800, null, 72, ResampleMethod.AUTOMATIC );
    displayDialogs = DialogModes.NO;
    SaveJPG(saveFile);
    LRdoc.close(SaveOptions.DONOTSAVECHANGES)
}



////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}