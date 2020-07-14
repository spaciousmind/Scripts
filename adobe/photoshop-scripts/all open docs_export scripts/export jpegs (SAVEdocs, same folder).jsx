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


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var folderJPG = Folder(CurrentPath);
//var folderPSD = Folder(CurrentPath + "/psd");
//=============Check if it exist, if not create it.============//
if(!folderJPG.exists) folderJPG.create();


var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];

activeDocument.save();
activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );
save_JPG();
activeDocument.close(SaveOptions.DONOTSAVECHANGES)

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






function save_JPG(saveFilejpg, jpegQuality){
    var saveFilejpg = File( folderJPG + "/" + docName + ".jpg");
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile = true;
    jpgOpts.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOpts.matte = MatteType.NONE;
    jpgOpts.quality = 12;
    activeDocument.saveAs(saveFilejpg, jpgOpts, true,Extension.LOWERCASE);
}


////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}
