$.writeln("==========================")
var undoName = "replace all PDFs or INDD links in file";
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);


function main(){

  myDoc = app.documents.item(0);

  var filePath = File.openDialog("Select your file",)
  filetoPlace = File(filePath);


  var frameselect = app.activeDocument.spreads.everyItem().rectangles.everyItem().getElements();

  while(frame = frameselect.pop()){
    frame.place(filetoPlace, false);
  }
}
