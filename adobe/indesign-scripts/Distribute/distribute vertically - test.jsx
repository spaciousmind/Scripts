var myDoc = app.activeDocument;

var mySel = myDoc.selection;

myDoc.distribute(mySel, DistributeOptions.VERTICAL_SPACE, AlignDistributeBounds.MARGIN_BOUNDS);

app.activeDocument.align (app.selection, AlignOptions.LEFT_EDGES);