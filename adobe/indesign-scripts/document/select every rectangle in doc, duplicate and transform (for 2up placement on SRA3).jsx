var frameselect = 
app.activeDocument.spreads.everyItem().rectangles.everyItem().getElements();

while(frame = frameselect.pop()){
	mycopy = frame.duplicate();
	//move to location, in mm, top left anchor point ([x, y]);
	mycopy.move([+226, 8.5])
}

//debug stuff to get width and height
//    var gbounds = frame.geometricBounds
//    var w = gbounds[3]-gbounds[1];
//    var h = gbounds[2]-gbounds[0];
//    $.writeln("\nWidth: " + w + "\nHeight: " + h)