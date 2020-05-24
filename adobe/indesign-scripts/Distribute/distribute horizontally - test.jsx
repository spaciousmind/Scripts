var myDoc = app.activeDocument;

var mySel = myDoc.selection;

myDoc.distribute(mySel, DistributeOptions.HORIZONTAL_SPACE, AlignDistributeBounds.MARGIN_BOUNDS);

app.activeDocument.align (app.selection, AlignOptions.BOTTOM_EDGES);