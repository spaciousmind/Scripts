var idoc = app.activeDocument;  
var activeABindex = idoc.artboards.getActiveArtboardIndex(0);
var msg = "Enter Artboard Name";
var ABname = String(Window.prompt (msg, idoc.artboards[activeABindex].name, "artboard name"));
idoc.artboards[activeABindex].name = ABname;