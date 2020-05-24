var mySelection = app.activeDocument.selection;





if (mySelection instanceof TextFrame){
		   app.activeDocument.selection.textFramePreferences.autoSizingReferencePoint =
		   AutoSizingReferenceEnum.TOP_CENTER_POINT;

		   app.activeDocument.selection.textFramePreferences.autoSizingType = 
		   AutoSizingTypeEnum.HEIGHT_ONLY;



}



