#target indesign
$.writeln("========================================");
var space = "\n";
myDoc = app.activeDocument;

var myRect = app.selection[0];
var myPage = myRect.parentPage;

//check imgBounds
var rectBounds = myRect.geometricBounds,
pageBounds = myPage.bounds //in the format [y1, x1, y2, x2], top-left and bottom-right

//check bleed (can be made more specific, good for now)
var bleed = myDoc.documentPreferences.documentBleedTopOffset;
//specific for pagesideoptions.SINGLE_SIDED ??
var bleedBounds = new Array(pageBounds[0]-bleed, pageBounds[1]-bleed, pageBounds[2]+bleed, pageBounds[3]+bleed);

//myRect.geometricBounds = bleedBound;
$.writeln("bleed = "+bleed);
$.writeln(".");

$.writeln("[rectBounds]: top left x = "+Math.round(rectBounds[0]));
$.writeln("[rectBounds]: top left y = "+Math.round(rectBounds[1]));
$.writeln("[rectBounds]: bottom right x = "+Math.round(rectBounds[2]));
$.writeln("[rectBounds]: bottom right y = "+Math.round(rectBounds[3]));
$.writeln(".");

$.writeln("[pageBounds]: top left x = "+Math.round(pageBounds[0]));
$.writeln("[pageBounds]: top left y = "+Math.round(pageBounds[1]));
$.writeln("[pageBounds]: bottom right x = "+Math.round(pageBounds[2]));
$.writeln("[pageBounds]: bottom right y = "+Math.round(pageBounds[3]));
$.writeln(".");

$.writeln("[bleedBounds]: top left x = "+Math.round(bleedBounds[0]));
$.writeln("[bleedBounds]: top left y = "+Math.round(bleedBounds[1]));
$.writeln("[bleedBounds]: bottom right x = "+Math.round(bleedBounds[2]));
$.writeln("[bleedBounds]: bottom right y = "+Math.round(bleedBounds[3]));
$.writeln(".");
