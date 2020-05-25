var docRef = activeDocument;  
var obj = docRef.rasterItems[0]; //docRef.placedItems[0];   
var newGroup = docRef.groupItems.add();   
var dupobj = obj.duplicate(newGroup,ElementPlacement.PLACEATEND);  
var cercle = newGroup.pathItems.ellipse(-300,200,80,80,false,true);   
var c1, c2, dx, dy;  
c1 = centreObj(cercle);   
c2 = centreObj(dupobj);    
dx = c1[0]-c2[0];    
dy = c1[1]-c2[1];    
dupobj.translate(dx,dy);    
newGroup.clipped = true;  
  
 

// ----  
function centreObj(objet) {  
  var rect = objet.geometricBounds;  
  return [(rect[2]+rect[0])/2,(rect[1]+rect[3])/2];  
}  