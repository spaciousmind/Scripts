//var newLayer = app.activeDocument.layers.add();

var tfs = 

app

.activeDocument

.spreads.everyItem().textFrames.everyItem().getElements();

while(tf = tfs.pop()){

   tf.locked = false;

}

//app.activeDocument.allPageItems.everyItem().locked = false;
