//$.writeln("========================================");

var undoName = "trim selected frames to bleedbounds"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);

function main(){
  var bleed = app.activeDocument.documentPreferences.documentBleedTopOffset;
  var mySelection = app.activeDocument.selection[0];

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
