//var time1 = Number(timeString());

var undoName = "change to Page Number 2 of link";
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);


function main(){

var mySelection = app.selection;
var chosenPage = 2

for (var i=0; i < mySelection.length; i++){

  var myFrame = mySelection[i];
  currentFile = myFrame.importedPages[0];
  inddCropPrefs = app.importedPageAttributes.importedPageCrop;
  app.importedPageAttributes.pageNumber = chosenPage;
  filePath = currentFile.itemLink.filePath;
  filetoPlace = File(filePath);
  currentFile.place(filetoPlace, false);
}


//var time2 = Number(timeString());
//alert(Math.round((time2-time1)/1000) +" seconds");


}


////// function to get the current time //////
function timeString(){
  var now = new Date();
  return now.getTime();}
