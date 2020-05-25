#target Illustrator  
  
//  script.name = shrinkABtoFitArt_CS4.jsx;  
//  script.description = resizes active artboard to fit the the Art (+ margins);  
//  script.required = one document with at least one piece of art;  
//  script.parent = carlos canto // 5/3/11;  
//  script.elegant = false;  
  
var margins = 0 

if (app.documents.length > 0)  
    {  
        //alert("more than 0");  
          var idoc = app.activeDocument;  
          var pageItemsCount = idoc.pageItems.length;  
        if (pageItemsCount>=1)  
            {   

                              var activeABindex = idoc.artboards.getActiveArtboardIndex();  
                              var newAB = idoc.artboards[activeABindex];  
  
                              var iartBounds = idoc.visibleBounds;  
                                
                              var ableft = iartBounds[0]-margins;  
                              var abtop = iartBounds[1]+margins;  
                              var abright = iartBounds[2]+margins;  
                              var abbottom = iartBounds[3]-margins;  
                                
                              newAB.artboardRect = [ableft, abtop, abright, abbottom];  
                                
                              var myZoom = idoc.activeView.zoom;  
                              idoc.activeView.zoom = myZoom+.01;  
                              idoc.activeView.zoom = myZoom;  
  
                         }  
                    else  
                         {  
                              alert("nos vamos");  
                         }  
             }  
         else  
            {  
                alert("there is no art in the active document");  
             }  
