var mydoc = app.activeDocument;  
 myJust = Justification.CENTER;

var topDiameter = 50;
var bottomDiameter = 50;


//get document bounds
var docw = mydoc.width;
var doch = mydoc.height;

var activeAB = mydoc.artboards[mydoc.artboards.getActiveArtboardIndex()]; // get active artboard

docLeft = activeAB.artboardRect[0];
docTop = activeAB.artboardRect[1];


//adds a debug text frame
var myTextFrame = mydoc.textFrames.add();
// Set the contents and position of the text frame
myTextFrame.position = [0,0];
myTextFrame.contents = "x centre: " + docw/2 + "\n" + "y centre: " + doch/2;

var topBlah = prompt("Top Text: ", "nothing");
var bottomBlah = prompt("Bottom Text: ", "nothing");


if (topBlah != "nothing") {
createTopText();    
}

if (bottomBlah != "nothing") {
createBottomText();
}

function createTopText(){ 
var circle = mydoc.pathItems.ellipse(-doch/2 +topDiameter/2, docw/2 -topDiameter/2, topDiameter, topDiameter);  //y axis, x axis, y size, x size
var textItem = mydoc.textFrames.pathText(circle); 
textItem.contents = topBlah;
TextFrameItem = textItem;
TextFrameItem.textRange.justification = myJust;
textItem.rotate(90);
}

function createBottomText(){
var circle = mydoc.pathItems.ellipse(-doch/2 +bottomDiameter/2, docw/2 -bottomDiameter/2, bottomDiameter, bottomDiameter); 
var textItem = mydoc.textFrames.pathText(circle); 
textItem.contents = bottomBlah;
TextFrameItem = textItem;
TextFrameItem.textRange.justification = myJust;
textItem.rotate(-180);
circle.polarity = PolarityValues.NEGATIVE;
}

 