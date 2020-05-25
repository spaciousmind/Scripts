
// Save the display dialogs
var startDisplayDialogs = app.displayDialogs
// display no dialogs
app.displayDialogs = DialogModes.NO

// set starting unit prefs
    startRulerUnits = preferences.rulerUnits;

app.preferences.rulerUnits = Units.PERCENT;


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var myFolder = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!myFolder.exists) myFolder.create();
 

var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];  




activeDocument.save();

var newdoc = app.activeDocument.duplicate(docName, true)


saveJPG();
newdoc.close(SaveOptions.DONOTSAVECHANGES)


//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================

////// function save HR jpeg //////
function saveJPG(saveFile, jpegQuality){
    var saveFile = File(CurrentPath + "/" + docName + ".jpg")
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



// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;



