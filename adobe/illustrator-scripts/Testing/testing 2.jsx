
var mydoc = app.activeDocument;
var mySelection = mydoc.selection;
//var myBounds = mySelection[0].geometricBounds;
var myBounds = mydoc.artboards[1].artboardRect;
var myPos = myBounds[0];


//alert (mydoc.artboards[0]);
//alert(mydoc.artboards[1]);

//alert("mySelection" + myPos);
//alert("artboards length" + mydoc.artboards.length);