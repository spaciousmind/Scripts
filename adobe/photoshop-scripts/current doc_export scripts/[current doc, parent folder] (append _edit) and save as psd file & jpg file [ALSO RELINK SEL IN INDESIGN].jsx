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
var outputFolder = decodeURI(CurrentPath.parent)



var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];
//var saveFile = File(CurrentPath +"/PSD/"+ docName + "_CMYK.psd");
//var Blah = prompt("name?", docName)

activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );
savePSD();
saveJPG();
var insertFile = outputFolder + "/" + docName + "_edit.jpg"
bridgetalk();
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
function saveJPG(saveFile, jpegQuality){
    var saveFile = File(outputFolder + "/" + docName + "_edit.jpg");
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.embedColorProfile = true;
    jpgOpts.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOpts.matte = MatteType.NONE;
    jpgOpts.quality = 12;  //// - [out of 12] 1 - shitty, 12 = maximum
    activeDocument.saveAs(saveFile, jpgOpts, true,Extension.LOWERCASE);
}

//function savePSD(){
//activeDocument.resizeImage( null, null, 300, ResampleMethod.NONE );
//savePSD();
//activeDocument.close(SaveOptions.DONOTSAVECHANGES)
//}

function savePSD(saveFile){
   var saveFile = File( outputFolder + "/" + docName + "_edit.psd");
   // PSDSaveOptions = new photoshopSaveOptions;
   // PSDSaveOptions.layers = true;
    psdSaveOptions = new PhotoshopSaveOptions();


  //  psdSaveOptions = new photoshopSaveOptions()
//    psdSaveOptions.layers = false;

    activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);
    activeDocument.close(SaveOptions.DONOTSAVECHANGES)
    app.open(saveFile)
}


//bridgetalk
function bridgetalk(){
	var bt = new BridgeTalk();
	bt.target = "indesign";
	theScript = "var IDsel = app.selection[0]; \n";
		theScript += "if (IDsel instanceof Graphic){ \n";
		theScript += "var theGraphic = IDsel;\n";
		theScript += "}else{\n";
		theScript += "var theGraphic = IDsel.graphics[0];\n";
		theScript += "}\n";
		theScript += "var theFile = File(\""+insertFile+"\");\n";
		theScript += "theGraphic.itemLink.relink(theFile);\n";
		theScript += "theGraphic.itemLink.update();\n";
	bt.body = theScript;
	bt.send();
}




////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}
