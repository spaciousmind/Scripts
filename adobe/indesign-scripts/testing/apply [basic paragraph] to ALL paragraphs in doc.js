#target indesign
var myDoc = app.documents[0];
var myFrames = myDoc.textFrames;

var myObjectStyle = "[Basic Text Frame]"; //Object Style has to already he default in indesign
//var myParaStyle = [Basic Paragraph];
var myCharStyle = "[None]";

for (var i=0; i< myFrames.length ; i++) {
myFrames[i].applyObjectStyle(myDoc.objectStyles.item(myObjectStyle));

for (x=0; x < myFrames[i].paragraphs.length; x++){

        myFrames[i].parentStory.paragraphs[x].appliedParagraphStyle = app.activeDocument.paragraphStyles.item('[Basic Paragraph]');

    }



}
