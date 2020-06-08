$.writeln("========================================");

var bleed = app.activeDocument.documentPreferences.documentBleedTopOffset;

myObj = app.selection[0];


var myFrame = {};
myFrame.object = app.selection[0],
myFrame.topLeftY = app.selection[0].geometricBounds[0],
myFrame.topLeftX = app.selection[0].geometricBounds[1],
myFrame.bottomRightY = app.selection[0].geometricBounds[2],
myFrame.bottomRightX = app.selection[0].geometricBounds[3];

var pageBounds = {};
pageBounds.topLeftY = app.selection[0].parentPage.bounds[0],
pageBounds.topLeftX = app.selection[0].parentPage.bounds[1],
pageBounds.bottomRightY = app.selection[0].parentPage.bounds[2],
pageBounds.bottomRightX = app.selection[0].parentPage.bounds[3];

var bleedBounds = {};
bleedBounds.topLeftY = pageBounds.topLeftY - bleed,
bleedBounds.topLeftX = pageBounds.topLeftX - bleed,
bleedBounds.bottomRightY = pageBounds.bottomRightY + bleed,
bleedBounds.bottomRightX = pageBounds.bottomRightX + bleed;


//$.writeln("myFrame.topLeftY = " + Math.round(myFrame.topLeftY));
//$.writeln("myFrame.topLeftX = " + Math.round(myFrame.topLeftX));
$.writeln("myFrame.bottomRightY = " + Math.round(myFrame.bottomRightY));
$.writeln("myFrame.bottomRightX = " + Math.round(myFrame.bottomRightX));
$.writeln(".");
//$.writeln("bleedBounds.topLeftY = " + Math.round(bleedBounds.topLeftY));
//$.writeln("bleedBounds.topLeftX = " + Math.round(bleedBounds.topLeftX));
$.writeln("bleedBounds.bottomRightY = " + Math.round(bleedBounds.bottomRightY));
$.writeln("bleedBounds.bottomRightX = " + Math.round(bleedBounds.bottomRightX));


if (myFrame.topLeftY < bleedBounds.topLeftY){
  myObj.geometricBounds = [bleedBounds.topLeftY, myFrame.topLeftX, myFrame.bottomRightY, myFrame.bottomRightX];
  myFrame.topLeftY = bleedBounds.topLeftY;}
if (myFrame.topLeftX < bleedBounds.topLeftX){
  myObj.geometricBounds = [myFrame.topLeftY, bleedBounds.topLeftX, myFrame.bottomRightY, myFrame.bottomRightX];
  myFrame.topLeftX = bleedBounds.topLeftX;}
if (myFrame.bottomRightY > bleedBounds.bottomRightY){
  myObj.geometricBounds = [myFrame.topLeftY, myFrame.topLeftX, bleedBounds.bottomRightY, myFrame.bottomRightX];
  myFrame.bottomRightY = bleedBounds.bottomRightY;}
if (myFrame.bottomRightX > bleedBounds.bottomRightX){
  $.writeln("trueX");
  myObj.geometricBounds = [myFrame.topLeftY, myFrame.topLeftX, myFrame.bottomRightY, bleedBounds.bottomRightX];
  myFrame.bottomRightX = bleedBounds.bottomRightX;}
