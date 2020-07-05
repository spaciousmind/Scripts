$.writeln("========================================");

var undoName = "trim selected frames to bleedbounds"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);

function main(){
  var bleed = app.activeDocument.documentPreferences.documentBleedTopOffset;
  var sel = app.activeDocument.selection;

  for (var i=0; i < sel.length; i++){
    var mySelection = app.activeDocument.selection[i];
    var myPage = mySelection.parentPage.name;
    var mySpread = mySelection.parentPage.parent.index + 1;
    var pagesLength = app.activeDocument.documentPreferences.pagesPerDocument;

    if (myPage != null){
      $.writeln("myPage = " + myPage);
      $.writeln("mySpread = " + mySpread);
      $.writeln("pagesLength = " + pagesLength);

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

      }
    else {
      alert("selection not even on a page");}
}}

//DEBUG CODE
/*
$.writeln("myFrame.topLeftY = " + Math.round(myFrame.topLeftY));
$.writeln("myFrame.topLeftX = " + Math.round(myFrame.topLeftX));
$.writeln("myFrame.bottomRightY = " + Math.round(myFrame.bottomRightY));
$.writeln("myFrame.bottomRightX = " + Math.round(myFrame.bottomRightX));
$.writeln(".");
$.writeln("bleedBounds.topLeftY = " + Math.round(bleedBounds.topLeftY));
$.writeln("bleedBounds.topLeftX = " + Math.round(bleedBounds.topLeftX));
$.writeln("bleedBounds.bottomRightY = " + Math.round(bleedBounds.bottomRightY));
$.writeln("bleedBounds.bottomRightX = " + Math.round(bleedBounds.bottomRightX));
*/
