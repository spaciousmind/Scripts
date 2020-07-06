//$.writeln("========================================");
//CLEAN UP ALL THE DEBUG CODE IF THIS WORKS WELL CONSISTANTLY - 07-07-2020

var undoName = "trim selected frames to bleedbounds"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);

function main(){
  var myDoc = app.activeDocument;
  var bleed = app.activeDocument.documentPreferences.documentBleedTopOffset;
  var sel = app.activeDocument.selection;

  for (var i=0; i < sel.length; i++){
    var mySelection = app.activeDocument.selection[i];
    var pagesLength = app.activeDocument.documentPreferences.pagesPerDocument;

    if (mySelection.parentPage != null){
      var myPage = mySelection.parentPage.name;
      var mySpread = mySelection.parentPage.parent.index + 1;
      //$.writeln("myPage = " + myPage);
      //$.writeln("mySpread = " + mySpread);
      //$.writeln("pagesLength = " + pagesLength);

      var myFrame = {};
      myFrame.topLeftY = mySelection.geometricBounds[0],
      myFrame.topLeftX = mySelection.geometricBounds[1],
      myFrame.bottomRightY = mySelection.geometricBounds[2],
      myFrame.bottomRightX = mySelection.geometricBounds[3];

      var pageBounds = {};
      pageBounds.topLeftY = mySelection.parentPage.bounds[0],
      pageBounds.topLeftX = mySelection.parentPage.bounds[1],
      pageBounds.bottomRightY = mySelection.parentPage.bounds[2],
      pageBounds.bottomRightX = mySelection.parentPage.bounds[3];

      var bleedBounds = {};
      bleedBounds.topLeftY = pageBounds.topLeftY - bleed,
      bleedBounds.topLeftX = pageBounds.topLeftX - bleed,
      bleedBounds.bottomRightY = pageBounds.bottomRightY + bleed,
      bleedBounds.bottomRightX = pageBounds.bottomRightX + bleed;



if ((myPage == pagesLength) && (pagesLength % 2 == 0)){
  var isTheLastPageSingle = "yes";}

if (myPage % 2 == 0){
  //$.writeln('left page')
  var pageSide = "left";
  }
else{
  //$.writeln('right page')
  var pageSide = "right";
}

if(myDoc.documentPreferences.facingPages && (myPage !=1 && isTheLastPageSingle != "yes")){
  //$.writeln("ultimate winner");
  //$.writeln("pageside = " + pageSide);
  if (pageSide == "left"){
    //$.writeln("left side test");
    var bleedBounds = {};
    bleedBounds.topLeftY = pageBounds.topLeftY - bleed,
    bleedBounds.topLeftX = pageBounds.topLeftX - bleed,
    bleedBounds.bottomRightY = pageBounds.bottomRightY + bleed,
    bleedBounds.bottomRightX = pageBounds.bottomRightX*2 + bleed;
  }else{
    //$.writeln("right side test");
    var bleedBounds = {};
    bleedBounds.topLeftY = pageBounds.topLeftY - bleed,
    bleedBounds.topLeftX = pageBounds.topLeftX - pageBounds.topLeftX - bleed,
    bleedBounds.bottomRightY = pageBounds.bottomRightY + bleed,
    bleedBounds.bottomRightX = pageBounds.bottomRightX + bleed;
  }

}
//else{
      if (myFrame.topLeftY < bleedBounds.topLeftY){
        mySelection.geometricBounds = [bleedBounds.topLeftY, myFrame.topLeftX, myFrame.bottomRightY, myFrame.bottomRightX];
        myFrame.topLeftY = bleedBounds.topLeftY;}
      if (myFrame.topLeftX < bleedBounds.topLeftX){
        mySelection.geometricBounds = [myFrame.topLeftY, bleedBounds.topLeftX, myFrame.bottomRightY, myFrame.bottomRightX];
        myFrame.topLeftX = bleedBounds.topLeftX;}
      if (myFrame.bottomRightY > bleedBounds.bottomRightY){
        mySelection.geometricBounds = [myFrame.topLeftY, myFrame.topLeftX, bleedBounds.bottomRightY, myFrame.bottomRightX];
        myFrame.bottomRightY = bleedBounds.bottomRightY;}
      if (myFrame.bottomRightX > bleedBounds.bottomRightX){
        mySelection.geometricBounds = [myFrame.topLeftY, myFrame.topLeftX, myFrame.bottomRightY, bleedBounds.bottomRightX];
        myFrame.bottomRightX = bleedBounds.bottomRightX;}
//}
      }
    else {
      alert("selection not even on a page");}
}}

//DEBUG CODE
/*
//$.writeln("myFrame.topLeftY = " + Math.round(myFrame.topLeftY));
//$.writeln("myFrame.topLeftX = " + Math.round(myFrame.topLeftX));
//$.writeln("myFrame.bottomRightY = " + Math.round(myFrame.bottomRightY));
//$.writeln("myFrame.bottomRightX = " + Math.round(myFrame.bottomRightX));
//$.writeln(".");
//$.writeln("bleedBounds.topLeftY = " + Math.round(bleedBounds.topLeftY));
//$.writeln("bleedBounds.topLeftX = " + Math.round(bleedBounds.topLeftX));
//$.writeln("bleedBounds.bottomRightY = " + Math.round(bleedBounds.bottomRightY));
//$.writeln("bleedBounds.bottomRightX = " + Math.round(bleedBounds.bottomRightX));
*/


/*
if(myDoc.documentPreferences.facingPages){
  //$.writeln("trooooooooo");
}
if(myPage !=1){
  //$.writeln("trooooooooo2");
}
if(isTheLastPageSingle != "yes"){
  //$.writeln("trooooooooo3");
}

  //$.writeln('you win2')

  if (pagesLength % 2 == 0){
    //$.writeln('even number')
    if (myPage == pagesLength){
      //$.writeln('you are on the last page, and its a single')
    }
  }else{
    //$.writeln('odd number')
  }
*/

    //  }
