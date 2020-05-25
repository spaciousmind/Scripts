// Written By Łukasz Wieczorek - hellowoo.com
// you can destribute this freely via creative commons(http://creativecommons.org/licenses/by-sa/3.0/)
// but leave this message in tact, or give credit to original script.

var numberOfEmptyTextBoxes = 0;
var layersWithNoText = new Array();
if ( app.documents.length > 0 ) {
    for ( i = 0; i < app.activeDocument.textFrames.length; i++ ) {
        text = app.activeDocument.textFrames[i].textRange;
        numWords = app.activeDocument.textFrames[i].words.length;
        if (numWords == 0){ 
            layersWithNoText.push(app.activeDocument.textFrames[i]);
            numberOfEmptyTextBoxes++; 
        }
    }
    if(numberOfEmptyTextBoxes > 0){
        alert("You have " + numberOfEmptyTextBoxes + " empty text boxes. They will be deleted.");
    }
    removeTextLayersWithNoContent(layersWithNoText);
}
function removeTextLayersWithNoContent(layersWithNoText) {
    var layersWithNoText = layersWithNoText;
    for (var i = 0; i < layersWithNoText.length; i++) {
        var currentIndex = layersWithNoText[i];
        layersWithNoText[i].remove();
    };
}