
var myDoc = app.activeDocument;

app.selection[0].cells.everyItem().bottomEdgeStrokeColor = myDoc.swatches.item("TRS Blue");
app.selection[0].cells.everyItem().bottomEdgeStrokeWeight = 1;
app.selection[0].cells.everyItem().bottomEdgeStrokeTint = 100;
