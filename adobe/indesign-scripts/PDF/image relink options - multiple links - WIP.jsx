$.writeln("==========================")
var mySelection = app.selection;

for (var i=0; i < mySelection.length; i++){

  if (mySelection[i].hasOwnProperty("graphics") && (mySelection[i].graphics.length != 0)) {
    var myFrame = mySelection[i];
    contentSwitch(myFrame);}

  else if ((mySelection[i] instanceof PDF)||(mySelection[i] instanceof ImportedPage)) {
    var myFrame = mySelection[i].parent;
    contentSwitch(myFrame);}

  else {
    alert ("Please select a frame with placed PDF, AI or INDD file!");}
}

function contentSwitch(myFrame){
  $.writeln(myFrame.allGraphics[0].constructor.name)
//  switch (myFrame.allGraphics[0].constructor.name) {
//  case "PDF":

}
