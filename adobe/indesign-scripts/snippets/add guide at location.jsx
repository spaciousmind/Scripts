var doc = app.documents.add();
var myPage = doc.pages.item(0);

with(doc)
{
//add guide slice
guides.add({
 //guideType:GuideTypeOptions.LIQUID, ----- ruler by default
 location:20,
 orientation:HorizontalOrVertical.horizontal
});
}
