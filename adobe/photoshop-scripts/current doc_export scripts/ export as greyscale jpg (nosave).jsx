
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






changetoK()
saveK_JPG();
activeDocument.close(SaveOptions.DONOTSAVECHANGES)


//-----------------------------------------------------------
//                        FUNCTIONS


//===========================================================
///change to greyscale
function changetoK(){
app.activeDocument.convertProfile("Working Gray", Intent.RELATIVECOLORIMETRIC, true, true );  
activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );

}


////// function save as greyscale jpeg //////
function saveK_JPG(saveFilejpg, jpegQuality){
    var saveFilejpg = File( CurrentPath + "/" + docName + "_K.jpg");
    var jpgOpts = new JPEGSaveOptions(); 
    jpgOpts.embedColorProfile = true;  
    jpgOpts.formatOptions = FormatOptions.STANDARDBASELINE;  
    jpgOpts.matte = MatteType.NONE;  
    jpgOpts.quality = 12;  
    activeDocument.saveAs(saveFilejpg, jpgOpts, true,Extension.LOWERCASE);  
}





//-----------------------------------------------------------
//                        CLOSING ARGUMENTS
//===========================================================



// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;



