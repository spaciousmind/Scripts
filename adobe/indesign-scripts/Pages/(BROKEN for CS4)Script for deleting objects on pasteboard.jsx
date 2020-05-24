var objs = app.documents[0].pageItems.everyItem().getElements();
while(obj=objs.pop()){
     if(obj.parent instanceof Spread){obj.remove()}
}