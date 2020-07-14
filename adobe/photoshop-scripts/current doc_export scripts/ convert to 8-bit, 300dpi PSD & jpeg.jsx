var time1 = Number(timeString());


// Save the display dialogs
var startDisplayDialogs = app.displayDialogs;
// display no dialogs
app.displayDialogs = DialogModes.NO;

// set starting unit prefs
    startRulerUnits = preferences.rulerUnits;

//app.preferences.rulerUnits = Units.PERCENT;


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var myFolder = Folder(CurrentPath);
//=============Check if it exist, if not create it.============//
if(!myFolder.exists) myFolder.create();
 

var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];  



processImage();
save_PSD();
save_JPG();
activeDocument.close(SaveOptions.DONOTSAVECHANGES)

//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================

function processImage(){
activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );
activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT

}

function save_PSD(saveFile){  
   var saveFile = File( CurrentPath + "/" + docName + ".psd");
   // PSDSaveOptions = new photoshopSaveOptions;   
   // PSDSaveOptions.layers = true;  
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
//    psdSaveOptions.layers = false;
    activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);   
}  


function save_JPG(saveFilejpg, jpegQuality){
    var saveFilejpg = File( CurrentPath + "/" + docName + ".jpg");
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


////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}

