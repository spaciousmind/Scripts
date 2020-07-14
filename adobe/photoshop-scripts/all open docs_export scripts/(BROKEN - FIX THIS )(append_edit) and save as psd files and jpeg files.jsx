/// NOTES FOR FIXING
// GET IT TO SAVE INTO PSD FOLDER.
//ALSO MAKE SURE IT CONVERTS TO 300DPI


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


var myDoc = app.documents.item(i);
//=============Find Current Documents path================//
var currentPath = myDoc.path;
//=============Establish current documents destination===============//
var folderJPG = Folder(currentPath);
//=============Check if it exist, if not create it.============//
if(!folderJPG.exists) folderJPG.create();

var docName = myDoc.name.match(/(.*)(\.[^\.]+)/)[1];
//var saveFile = File(CurrentPath +"/PSD/"+ docName + "_CMYK.psd");

myDoc.resizeImage( null, null, 300, ResampleMethod.NONE );
savePSD();
saveJPG();
myDoc.close(SaveOptions.DONOTSAVECHANGES)

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
//var saveFile = File(CurrentPath +"/PSD/"+ docName + "_CMYK.psd");
////// function save HR jpeg //////
function saveJPG(saveFile, jpegQuality){
    var saveFile = File(outputFolder + "/" + docName + "_edit.jpg")
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile = true;
    jpgOpts.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOpts.matte = MatteType.NONE;
    jpgOpts.quality = 12;  //// - [out of 12] 1 - shitty, 12 = maximum
    myDoc.saveAs(saveFile, jpgOpts, true,Extension.LOWERCASE);
}

//function savePSD(){
//myDoc.resizeImage( null, null, 300, ResampleMethod.NONE );
//savePSD();
//myDoc.close(SaveOptions.DONOTSAVECHANGES)
//}

function savePSD(saveFile){
   var saveFile = File( outputFolder + "/" + docName + "_edit.psd");
   // PSDSaveOptions = new photoshopSaveOptions;
   // PSDSaveOptions.layers = true;
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
//    psdSaveOptions.layers = false;

    myDoc.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);
    myDoc.close(SaveOptions.DONOTSAVECHANGES)
    app.open(saveFile)
}




////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}
