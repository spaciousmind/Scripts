
var myDoc = app.activeDocument;

app.selection[0].cells.everyItem().fillColor = myDoc.swatches.item("None");
app.selection[0].cells.everyItem().rightEdgeStrokeWeight = 0;
app.selection[0].cells.everyItem().height = "3mm";