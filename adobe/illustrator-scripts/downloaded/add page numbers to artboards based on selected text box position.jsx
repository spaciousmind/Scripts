//    #target illustrator  
    // global variables  
      
    ////////////////////////////////////////////////////  
    // Set up varaibles  
    ////////////////////////////////////////////////////  
      
      
    var pageNumber = app.activeDocument.artboards.getActiveArtboardIndex() + 1,  
        doc = app.activeDocument;  
      


selectedItems = doc.selection;      
      
      
    //make sure only 1 item is selected  
    if(selectedItems.length > 1 || selectedItems.length < 1) {  
        alert('please select only one item')  }
    else {   
        var selectionTopPosition = doc.selection[0].top,  
            selectionLeftPosition = doc.selection[0].left;  
        doc.selection[0].remove();  
        doc.selection = null;  
        //remove selection  
        //alert(selectionLeftPosition+" "+selectionTopPosition);  
    }  
      
      
    //create page numbers layer  
    var pageNumbersLayer = doc.layers.add();  
    pageNumbersLayer.name = "page numbers";  
    var pageNumbersLayerGroup = pageNumbersLayer.groupItems.add();  
      
      
    // main loop  
    //loop through artboards   
    for(i = 0; i < app.activeDocument.artboards.length; i++){  
        app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;  
        doc.artboards.setActiveArtboardIndex(i);  
        alert('active artboard is '+i);  
        var pageNumber = doc.artboards.getActiveArtboardIndex() + 1;  
        var pageCount = i + 1;  
      
      
        var textRef = pageNumbersLayerGroup.textFrames.add();  
        textRef.contents = pageCount.toString();  
        textRef.top = selectionTopPosition;  
        textRef.left = selectionLeftPosition;  
        pageCount++;  
    }  