var sel=app.activeDocument.selection[0];

var b = sel.geometricBounds;

var w = b[3]-b[1];

var h = b[2]-b[0];

alert("\ndocnumber" + i + "\nWidth: " + w + "\nHeight: " + h);