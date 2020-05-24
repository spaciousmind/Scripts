var newLayer = app.activeDocument.layers.add();

var tfs = 

app

.activeDocument

.spreads.everyItem().getElements();

while(tf = tfs.pop()){

   tf.duplicate();

}
newLayer.name = "TEXT";