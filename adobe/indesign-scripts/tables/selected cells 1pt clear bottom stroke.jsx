
var myDoc = app.activeDocument;

app.selection[0].cells.everyItem().bottomEdgeStrokeColor = myDoc.swatches.item("None");
app.selection[0].cells.everyItem().bottomEdgeStrokeWeight = 1;