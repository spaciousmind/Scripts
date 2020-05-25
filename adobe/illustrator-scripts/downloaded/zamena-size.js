mySelection = activeDocument.selection;
if (mySelection.length>0){
 if (mySelection instanceof Array){
  goal=mySelection[0];
  centerPoint=goal.position[0]+(goal.width/2);
  centerPointVert=goal.position[1]-(goal.height/2);
  for (i=1; i<mySelection.length; i++){
   currItem=mySelection[i];
   centerPoint=currItem.position[0]+(currItem.width/2);
   centerPointVert=currItem.position[1]-(currItem.height/2);
   ratio=100/(goal.width/currItem.width);
   ratioV=100/(goal.height/currItem.height);
   newItem=goal.duplicate();
   newItem.position=Array((centerPoint-(goal.width/2)),(centerPointVert+(goal.height/2)));
   if(ratio<ratioV){
    newItem.resize(ratio,ratio,true,true,true,true,ratio)
   }else{
    newItem.resize(ratioV,ratioV,true,true,true,true,ratioV)
   }
   newItem.artworkKnockout=currItem.artworkKnockout;
   newItem.clipping=currItem.clipping;
   newItem.isIsolated=currItem.isIsolated;
   newItem.evenodd=currItem.evenodd;
   if(currItem.polarity){
    newItem.polarity=currItem.polarity
   }
   newItem.moveBefore(currItem);
   currItem.remove()
  }
 }
}else{}