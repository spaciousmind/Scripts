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
var folderPNG = Folder(CurrentPath + "/PNG");
//=============Check if it exist, if not create it.============//
if(!folderPNG.exists) folderPNG.create();

var myDoc = app.activeDocument
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
var saveFile = File(CurrentPath +"/PNG/"+ docName + ".png");


////-----converts to RGB--------------////
//app.activeDocument.convertProfile("Working RGB", Intent.RELATIVECOLORIMETRIC, true, true );

savePNG();

function savePNG() {
//    try{
//    activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
 //   }
 //   catch(e){
 //    }
    SavePNG(saveFile);
}


//savePNG_LR();
myDoc.close(SaveOptions.SAVECHANGES);


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
function SavePNG(saveFile, jpegQuality){
    var pngOpts = new ExportOptionsSaveForWeb();
  //  pngOpts.embedColorProfile = true;
  //  pngOpts.formatOptions = FormatOptions.STANDARDBASELINE;
  //  pngOpts.matte = MatteType.NONE;
  //  pngOpts.quality = 12;

        pngOpts.format = SaveDocumentType.PNG;
        pngOpts.PNG8 = false;
        pngOpts.quality = 100;
    //pngOpts.compression = 9;
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, pngOpts);
}


////// function save LR jpeg //////
function savePNG_LR() {
// change saveFile suffix to _LR.jpg
//    var saveFile = File(CurrentPath +"/PNG/"+ docName + "_LR.png");
// duplicate original document
//    var LRdoc = app.activeDocument.duplicate(docName + "_LR", true);
// close original document
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)


    LRdoc.resizeImage( 1200, null, null, ResampleMethod.AUTOMATIC );
    displayDialogs = DialogModes.NO;
    SavePNG(saveFile);
    LRdoc.close(SaveOptions.DONOTSAVECHANGES)
}




////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}
