#target InDesign

//DESCRIPTION: Change PDF, AI and INDD page options

/*
    + Indesign Version: CS5.5 und 6, Mac OS
    + Autor: Roland Dreger
    + Datum: 9. Dezember 2013
*/



app.doScript(__main, ScriptLanguage.JAVASCRIPT , [], UndoModes.ENTIRE_SCRIPT, "PDF Page Options");


function __main () {

  if (app.documents.length == 0) {
    alert ("No document opened!\rTo run the script at least one document must be open.", "Error", true);
    return;
  }

  var _curFile,
      _filePath,
      _fileToPlace;

  if ((app.selection.length == 1) && app.selection[0].hasOwnProperty("graphics") && (app.selection[0].graphics.length != 0)) {

    var _frame = app.selection[0];
    __contentSwitch(_frame);

  } else if ((app.selection.length == 1) && ((app.selection[0] instanceof PDF)||(app.selection[0] instanceof ImportedPage))) {

    var _frame = app.selection[0].parent;
    __contentSwitch(_frame);

  } else {
    alert ("Please select a frame with placed PDF, AI or INDD file!");
  }

  function __contentSwitch(_frame) {
      switch (_frame.allGraphics[0].constructor.name) {
      case "PDF":
        _curFile = _frame.pdfs[0];
        __placeFile (_curFile);
        break;
      case "ImportedPage":
        _curFile = _frame.importedPages[0];
        __placeFile (_curFile);
        break;
      default :
        alert("No PDF, AI or INDD file in selected frame!");
    }
  } // END function __contentSwitch

  function __placeFile (_file) {
    _filePath = _file.itemLink.filePath;
    try {
      _fileToPlace = File(_filePath);
      _frame.place(_fileToPlace,true);
    } catch (e) {
      if(_file.itemLink.status == LinkStatus.LINK_MISSING || _file.itemLink.status == LinkStatus.LINK_INACCESSIBLE) {
        alert("Missing link:\r" + _filePath + "\r\rNo changes have been made!");
      }
    }
  } // END function __placeFile
} // END function __main
