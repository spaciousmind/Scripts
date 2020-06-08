var bleed = app.activeDocument.documentPreferences.documentBleedTopOffset;

var myFrame = {};
myFrame.object = app.selection[0],
myFrame.topLeftX = app.selection[0].geometricBounds[0],
myFrame.topLeftY = app.selection[0].geometricBouds[1],
myFrame.bottomRightX = app.selection[0].geometricBounds[2],
myFrame.bottomRightY = app.selection[0].geometricBouds[3],

var pageBounds = {};
pageBounds.topLeftX = app.selection[0].parentPage.bounds[0],
pageBounds.topLeftY = app.selection[0].parentPage.bounds[1],
pageBounds.bottomRightX = app.selection[0].parentPage.bounds[2],
pageBounds.bottomRightY = app.selection[0].parentPage.bounds[3],

var bleedBounds = {};
bleedBounds.topLeftX = pageBounds.topLeftX - bleed,
bleedBounds.topLeftY = pageBounds.topLeftY - bleed,
bleedBounds.bottomRightX = pageBounds.bottomRightX + bleed,
bleedBounds.bottomRightY = pageBounds.bottomRightY + bleed,

if (myFrame.topLeftX < bleedBounds.topLeftX){
  myframe.object.geometricBounds = (bleedBounds.topLeftX, null, null, null);
}
