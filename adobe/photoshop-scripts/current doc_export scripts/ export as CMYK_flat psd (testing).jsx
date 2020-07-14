
// Save the display dialogs
var startDisplayDialogs = app.displayDialogs
// display no dialogs
app.displayDialogs = DialogModes.NO

// set starting unit prefs
    startRulerUnits = preferences.rulerUnits;
// Set units to pixels
    preferences.rulerUnits = Units.PIXELS;


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var myFolder = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!myFolder.exists) myFolder.create();

var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1].replace(/_RGB/i,"");


activeDocument.save();
activeDocument.suspendHistory("ZZZ", "changetoCMYK()");
executeAction( charIDToTypeID('undo'), undefined, DialogModes.NO );


//-----------------------------------------------------------
//                        CLOSING ARGUMENTS
//===========================================================



// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;




//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================

//change colour profile here to whatever we use at work
function changetoCMYK(){
app.activeDocument.convertProfile("Working CMYK", Intent.RELATIVECOLORIMETRIC, true, true );
saveCMYK_flat_PSD();
}



function saveCMYK_flat_PSD(saveFile){
    // change saveFile suffix to _sml.tif
    var saveFile = File( CurrentPath + "/" + docName + "_CMYK_flat.psd");
   // PSDSaveOptions = new photoshopSaveOptions;
   // PSDSaveOptions.layers = true;
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
    psdSaveOptions.layers = false;
    activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);
}
