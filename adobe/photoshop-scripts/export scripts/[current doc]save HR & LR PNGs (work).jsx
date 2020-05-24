var time1 = Number(timeString());

// Save the display dialogs
var startDisplayDialogs = app.displayDialogs
// display no dialogs
app.displayDialogs = DialogModes.NO


//=============Find Current Documents path================//
var CurrentPath = activeDocument.path;
//=============Establish current documents destination===============//
var folderPNG = Folder(CurrentPath + "/PNG");
//=============Check if it exist, if not create it.============//
if(!folderPNG.exists) folderPNG.create();
 
var HRdoc = app.activeDocument
var docName = app.activeDocument.name.match(/^.*[^.psd][^.tif]/i);    
var saveFile = File(CurrentPath +"/PNG/"+ docName + "_HR.png");


savePNG_HR();
function savePNG_HR() {
    activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
    SavePNG(saveFile);
}


if  ( HRdoc.width > 800 ) {
    savePNG_LR();
    }

else{
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)
    }

function savePNG_LR() {
// change saveFile suffix to _LR.png
    var saveFile = File(CurrentPath +"/PNG/"+ docName + "_LR.png");
// duplicate original document
    var LRdoc = app.activeDocument.duplicate(docName + "_LR", true);
// close original document
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)
// set starting unit prefs
    startRulerUnits = preferences.rulerUnits;
// Set units to pixels
    preferences.rulerUnits = Units.PIXELS;

    LRdoc.resizeImage( 800, null, 72, ResampleMethod.BICUBICSHARPER );
    displayDialogs = DialogModes.NO;
    SavePNG(saveFile);
    LRdoc.close(SaveOptions.DONOTSAVECHANGES)

    // restore units prefs
    preferences.rulerUnits = startRulerUnits;
}

function SavePNG(saveFile){
    var pngOpts = new ExportOptionsSaveForWeb; 
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = false; 
    pngOpts.quality = 100;
    activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts); 
}

// Reset display dialogs
app.displayDialogs = startDisplayDialogs



    var time2 = Number(timeString());

    alert(((time2-time1)/1000)+" seconds\nstart "+time1+"\nend "+time2)

    ////// function to get the date //////

    function timeString () {

      var now = new Date();

      return now.getTime()

      };
