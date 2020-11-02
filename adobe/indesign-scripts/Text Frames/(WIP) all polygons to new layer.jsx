var newLayer = app.activeDocument.layers.add();
var tfs = app.activeDocument.spreads.everyItem().SplineItems.everyItem().Polygons.getElements();

while(tf = tfs.pop()){
   tf.move(newLayer);
}
newLayer.name = "POLYGONS";
