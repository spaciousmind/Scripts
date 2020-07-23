//$.writeln("==========================")
var undoName = "Choose Page Number of link";
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);


function main(){

var mySelection = app.selection;
var chosenPage = prompt("Choose Page Number:", "1");
chosenPage = parseInt(chosenPage);
//$.writeln("chosenPage =" + chosenPage);



for (var i=0; i < mySelection.length; i++){
//$.writeln("--------------")

  if (mySelection[i].hasOwnProperty("graphics") && (mySelection[i].graphics.length != 0)) {
    var myFrame = mySelection[i];
    contentSwitch(myFrame, chosenPage);}

  else if ((mySelection[i] instanceof PDF)||(mySelection[i] instanceof ImportedPage)) {
    var myFrame = mySelection[i].parent;
    contentSwitch(myFrame, chosenPage);}

  else {
    alert ("Please select a frame with placed PDF, AI or INDD file!");}
}

function contentSwitch(myFrame, chosenPage){
//  $.writeln("type = " +myFrame.allGraphics[0].constructor.name + " Page = " + chosenPage);
//  $.writeln(myFrame.allGraphics[0].constructor.name)  //to get type
  switch (myFrame.allGraphics[0].constructor.name) {
  case "PDF":
    currentFile = myFrame.pdfs[0];
      placeFile (currentFile, chosenPage);
    break;
  case "ImportedPage":
    currentFile = myFrame.importedPages[0];
    placeFile (currentFile, chosenPage);
    break;
  default:
    alert("No PDF, AI or INDD file in the selected frame!")}
}

function placeFile(currentFile, chosenPage){
//  $.writeln("placeFile chosenPage =" + chosenPage);

inddCropPrefs = app.importedPageAttributes.importedPageCrop;
pdfCropPrefs = app.pdfPlacePreferences.pdfCrop;
//  $.writeln("pdfCropPrefs = " + pdfCropPrefs);
//  $.writeln("inddCropPrefs = " + inddCropPrefs);



  app.pdfPlacePreferences.pageNumber = chosenPage;
  app.importedPageAttributes.pageNumber = chosenPage;
//  $.writeln("placeFile");
  filePath = currentFile.itemLink.filePath;
//  $.writeln("filePath =" + filePath);
//  $.writeln("myFrame =" + myFrame);
//  $.writeln("currentFile =" + currentFile);
  try{
    filetoPlace = File(filePath);
//    $.writeln("filetoPlace =" + filetoPlace)
    currentFile.place(filetoPlace, false);
  } catch (e){
    if(currentFile.itemLink.status == LinkStatus.LINK_MISSING || currentFile.itemLink.status == LinkStatus.LINK_INACCESSIBLE){
      alert("Missing link:\r" + filePath + "\r\rNo changes have been made!");
    }
  }
}
}
