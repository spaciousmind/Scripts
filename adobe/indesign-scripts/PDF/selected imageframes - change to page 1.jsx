//var time1 = Number(timeString());

var undoName = "change to Page Number 1 of link";
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);


function main(){

var mySelection = app.selection;
var chosenPage = 1
chosenPage = parseInt(chosenPage);



for (var i=0; i < mySelection.length; i++){

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

//var time2 = Number(timeString());
//alert(Math.round((time2-time1)/1000) +" seconds");


function placeFile(currentFile, chosenPage){

inddCropPrefs = app.importedPageAttributes.importedPageCrop;
pdfCropPrefs = app.pdfPlacePreferences.pdfCrop;



  app.pdfPlacePreferences.pageNumber = chosenPage;
  app.importedPageAttributes.pageNumber = chosenPage;
  filePath = currentFile.itemLink.filePath;
  try{
    filetoPlace = File(filePath);
    currentFile.place(filetoPlace, false);
  } catch (e){
    if(currentFile.itemLink.status == LinkStatus.LINK_MISSING || currentFile.itemLink.status == LinkStatus.LINK_INACCESSIBLE){
      alert("Missing link:\r" + filePath + "\r\rNo changes have been made!");
    }
  }
}
}

////// function to get the current time //////
//function timeString(){
//  var now = new Date();
//  return now.getTime();}
