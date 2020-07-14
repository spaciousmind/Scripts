var time1 = Number(timeString());

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
var folderJPG = Folder(CurrentPath + "/JPG");
//=============Check if it exist, if not create it.============//
if(!folderJPG.exists) folderJPG.create();
 
var HRdoc = app.activeDocument
var docName = app.activeDocument.name.match(/(.*)(\.[^\.]+)/)[1];  
//var docName = app.activeDocument.name.match(/^.*[^.psd][^.tif]/i);   ----this is old and fucked. 
var saveFile = File(CurrentPath +"/JPG/"+ docName + "_HR.jpg");


saveJPG_HR();
function saveJPG_HR() {
    try{
    activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
    }
    catch(e){
     }
    SaveJPG(saveFile);
}


if  ( HRdoc.width > 800 ) {
    saveJPG_LR();
    }

else{
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)
    }

function saveJPG_LR() {
// change saveFile suffix to _LR.jpg
    var saveFile = File(CurrentPath +"/JPG/"+ docName + "_LR.jpg");
// duplicate original document
    var LRdoc = app.activeDocument.duplicate(docName + "_LR", true);
// close original document
    HRdoc.close(SaveOptions.DONOTSAVECHANGES)


    LRdoc.resizeImage( 800, null, 72, ResampleMethod.AUTOMATIC );
    displayDialogs = DialogModes.NO;
    SaveJPG(saveFile);
    LRdoc.close(SaveOptions.DONOTSAVECHANGES)

    // restore units prefs
    preferences.rulerUnits = startRulerUnits;
}

function SaveJPG(saveFile){
    var jpgOpts = new ExportOptionsSaveForWeb; 
    jpgOpts.format = SaveDocumentType.JPEG
    jpgOpts.quality = 100;
    activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,jpgOpts); 
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
