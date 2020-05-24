if (!app.documents.length) {  
  alert ('Open a document.'); exit();  
}  
// Set up the document  
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;  
app.documents[0].zeroPoint = [0,0];  
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;  
  
  
pages = app.documents[0].pages.everyItem().getElements();  
for (i = 0; i < pages.length; i++) {   
  if (!pages[i].pageItems.length) continue;  
  if (pages[i].pageItems.length > 1) {  
	pages[i].groups.add (pages[i].pageItems.everyItem().getElements());  
  }  
  frame = pages[i].pageItems[0];  
  gb = frame.geometricBounds;  
  frame.move ([0, 0]);  
  pages[i].marginPreferences.properties = {top: 0, left: 0, bottom: 0, right: 0};  
  pages[i].resize (CoordinateSpaces.INNER_COORDINATES,  
	AnchorPoint.TOP_LEFT_ANCHOR,  
	ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,  
	[gb[3]-gb[1], gb[2]-gb[0]]  
  );  
}