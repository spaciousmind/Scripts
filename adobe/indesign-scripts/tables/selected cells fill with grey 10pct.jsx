
var myDoc = app.activeDocument;

app.selection[0].cells.everyItem().fillColor = myDoc.swatches.item("Black");
app.selection[0].cells.everyItem().fillTint = 10;