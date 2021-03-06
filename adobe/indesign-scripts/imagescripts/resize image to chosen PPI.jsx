﻿/**
* @@@BUILDINFO@@@ EffectivePPI.js
This script rescale selected images according to the chosen resolution
*/


if (parseFloat(app.version) < 6) {
main();
} else {
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, "Expand State Abbreviations");
}



function main() {
var multiplicador = prompt("Choose effective PPI:", "300");

if (isNumber(multiplicador) && multiplicador > 0) {
var effectivePPIThreshold = multiplicador;

var myDocument = app.activeDocument;
var userHoriz = myDocument.viewPreferences.horizontalMeasurementUnits;
var userVert = myDocument.viewPreferences.verticalMeasurementUnits;
myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;


for (var i = 0; i < app.selection.length; i++) {

var theImageFrame = app.selection[i];
var theImage = theImageFrame.images[0]
var effectivePPI = String(theImage.effectivePpi);
var imageBounds = theImage.geometricBounds;
var imageWidth = imageBounds[3] - imageBounds[1];
var imageHeight = imageBounds[2] - imageBounds[0];

effectivePPI.match(/(\d+),(\d+)/);

var ppiH = effectivePPI.replace(/(\d+),(\d+)/, '$1');
var ppiV = effectivePPI.replace(/(\d+),(\d+)/, '$2');

if (ppiH == ppiV) {
var theRatio = ppiH / effectivePPIThreshold;
var newImageWidth = imageWidth * theRatio;
var newImageHeight = imageHeight * theRatio;
theImage.geometricBounds = [imageBounds[0], imageBounds[1], imageBounds[0] + newImageHeight, imageBounds[1] + newImageWidth];
theImageFrame.fit(FitOptions.frameToContent);
} else {
alert("Horizontal and vertical resolutions are not equal.");
}

}

myDocument.viewPreferences.horizontalMeasurementUnits = userHoriz;
myDocument.viewPreferences.verticalMeasurementUnits = userVert;

} else {
alert("Invalid input.");
}
}

function isNumber(n) {
return !isNaN(parseFloat(n)) && isFinite(n);
}
