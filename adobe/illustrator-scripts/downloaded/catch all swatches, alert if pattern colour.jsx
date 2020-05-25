var doc = activeDocument;  
var theSwatches = doc.swatches;  
  
for (var i=0; i <= theSwatches.length-1; i++) {  
    swatchType = theSwatches[i].color.typename;  
    swatchName = theSwatches[i].name;  
    // alert name of pattern swatch  
    if (swatchType == "PatternColor") {alert(swatchName)};  
}  