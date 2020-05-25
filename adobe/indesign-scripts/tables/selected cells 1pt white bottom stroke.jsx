
var myDoc = app.activeDocument;

app.selection[0].cells.everyItem().bottomEdgeStrokeColor = myDoc.swatches.item("Paper");
app.selection[0].cells.everyItem().bottomEdgeStrokeWeight = 1;