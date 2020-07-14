/// NOTES FOR FIXING
// GET IT TO SAVE INTO PSD FOLDER.
//ALSO MAKE SURE IT CONVERTS TO 300DPI


//var time1 = Number(timeString());

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
var outputFolder = CurrentPath;



var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
//var saveFile = File(CurrentPath +"/PSD/"+ docName + "_CMYK.psd");
//var Blah = prompt("name?", docName)

activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );

savePSD();
savePSD_flat();
app.open(saveFile)
//saveJPG();
//activeDocument.close(SaveOptions.DONOTSAVECHANGES)







//-----------------------------------------------------------
//                        CLOSING ARGUMENTS
//===========================================================



// Reset display dialogs
app.displayDialogs = startDisplayDialogs

// restore units prefs
preferences.rulerUnits = startRulerUnits;

//var time2 = Number(timeString());
//alert(((time2-time1)/1000)+" seconds ")








//-----------------------------------------------------------
//                        FUNCTIONS
//===========================================================
//var saveFile = File(CurrentPath +"/PSD/"+ docName + "_CMYK.psd");
////// function save HR jpeg //////
function savePSD_flat(saveFile, jpegQuality){
   var saveFile = File( outputFolder + "/" + docName + "_alpha_flat.psd");
   // PSDSaveOptions = new photoshopSaveOptions;
   // PSDSaveOptions.layers = true;
    psdFlatSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
    psdSaveOptions.layers = false;

    activeDocument.saveAs(saveFile, psdFlatSaveOptions, true, Extension.LOWERCASE);
        activeDocument.close(SaveOptions.DONOTSAVECHANGES)

}

//function savePSD(){
//activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );
//savePSD();
//activeDocument.close(SaveOptions.DONOTSAVECHANGES)
//}

function savePSD(saveFile){
   var saveFile = File( outputFolder + "/" + docName + "_alpha.psd");
   // PSDSaveOptions = new photoshopSaveOptions;
   // PSDSaveOptions.layers = true;
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
//    psdSaveOptions.layers = false;

    activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);


}




////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}
