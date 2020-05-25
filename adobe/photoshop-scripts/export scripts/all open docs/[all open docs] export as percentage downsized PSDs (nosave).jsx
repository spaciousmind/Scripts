
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

save_flat_PSD();
newdoc.close(SaveOptions.DONOTSAVECHANGES)
activeDocument.close(SaveOptions.DONOTSAVECHANGES)

}
}


//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================

function save_flat_PSD(saveFile){  
    // change saveFile suffix to _sml.tif
    var saveFile = File( CurrentPath + "/" + docName + "_scaled_" + Blah + "_pct_flat.psd");
   // PSDSaveOptions = new photoshopSaveOptions;   
   // PSDSaveOptions.layers = true;  
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
    psdSaveOptions.layers = false;
    activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);   
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



