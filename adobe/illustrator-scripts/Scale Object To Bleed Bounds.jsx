﻿    
    //  script.name = fitObjectToArtboardBounds.jsx;  
    //  script.description = resizes selected object to fit exactly to Active Artboard Bounds;  
    //  script.required = select ONE object before running; CS4 & CS5 Only.  
    //  script.parent = carlos canto // 01/25/12;  
    //  script.elegant = false;  
      
      
    var idoc = app.activeDocument;  
    selec = idoc.selection;  
    if (selec.length==1)  
              {  
                        // get document bounds  
                        var docw = idoc.width + 17.008; 
                        var doch = idoc.height + 17.008;
                        var activeAB = idoc.artboards[idoc.artboards.getActiveArtboardIndex()]; // get active AB  
      
      
                        docLeft = activeAB.artboardRect[0];  
                        docTop = activeAB.artboardRect[1];   
      
      
                        // get selection bounds  
                        var sel = idoc.selection[0];  
                        var selVB = sel.visibleBounds;  
                        var selVw = selVB[2]-selVB[0];  
                        var selVh = selVB[1]-selVB[3];  
      
      
                        var selGB = sel.geometricBounds;  
                        var selGw = selGB[2]-selGB[0];  
                        var selGh = selGB[1]-selGB[3];  
      
      
                        // get the difference between Visible & Geometric Bounds  
                        var deltaX = selVw-selGw;  
                        var deltaY = selVh-selGh;  
      
      
                        sel.width = docw-deltaX; // width is Geometric width, so we need to make it smaller...to accomodate the visible portion.  
                        sel.height = doch-deltaY;  
                        sel.top = docTop + 8.504; // Top is actually Visible top  
                        sel.left = docLeft - 8.504; // dito for Left  
      
      
              }  
    else  
              {  
                        alert("select ONE object before running");  
              }  