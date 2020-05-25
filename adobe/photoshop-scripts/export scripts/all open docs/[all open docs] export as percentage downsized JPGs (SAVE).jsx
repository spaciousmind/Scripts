
var time1 = Number(timeString());

// Save the display dialogs
var startDisplayDialogs = app.displayDialogs
// display no dialogs
app.displayDialogs = DialogModes.NO

// set starting unit prefs
startRulerUnits = preferences.rulerUnits;
// Set units to percentage
app.preferences.rulerUnits = Units.PERCENT;

var Blah = prompt("percentage", "50");

//try {

    if (app.documents.length > 0 ) {

        var options, i, sourceDoc, targetFile;
        for ( i = app.documents.length-1; i > -1 ; i-- ){



//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var myFolder = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!myFolder.exists) myFolder.create();
 

var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];  


var newdoc = app.activeDocument.duplicate(docName + "_" + Blah, true)

newdoc.resizeImage(Number(Blah), null, 300, ResampleMethod.BICUBICAUTOMATIC);

saveJPG();
newdoc.close(SaveOptions.DONOTSAVECHANGES)
activeDocument.close(SaveOptions.SAVECHANGES)

}
}


//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================

////// function save HR jpeg //////
function saveJPG(saveFile, jpegQuality){
    var saveFile = File(CurrentPath + "/" + docName + "_scaled_" + Blah + "_pct.jpg")
    var jpgOpts = new JPEGSaveOptions(); 
    jpgOpts.embedColorProfile = true;  
    jpgOpts.formatOptions = FormatOptions.STANDARDBASELINE;  
    jpgOpts.matte = MatteType.NONE;  
    jpgOpts.quality = 12;  //// - [out of 12] 1 - shitty, 12 = maximum
    activeDocument.saveAs(saveFile, jpgOpts, true,Extension.LOWERCASE);  
}





//-----------------------------------------------------------
//                        CLOSING ARGUMENTS
//===========================================================


////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}


// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;



