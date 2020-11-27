var mydoc = app.activeDocument;


for (i = 0; i < mydoc.artboards.length; i++) {
  var myABbounds = mydoc.artboards[i].artboardRect;
  var myABname = mydoc.artboards[i].name;
  var myTextFrame = mydoc.textFrames.add();
  myTextFrame.position = [myABbounds[0]+4, myABbounds[1]-3];
  myTextFrame.contents = myABname;

}
