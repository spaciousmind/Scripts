myDoc = app.activeDocument;
mySelection = myDoc.selection[0];
myPage = mySelection.parentPage;
var myCounter = "";

if(myDoc.documentPreferences.facingPages) {
  $.writeln("facing pages")
}else{
  $.writeln("single pages")
}

///*
for (p=0; p<myDoc.pages.length; p++)
{
//     myLabel = myDoc.name.replace(/\D+/,'') + '_'
    //    + app.activeDocument.pages[p].name +'_'+myCounter;
        myLabel = app.activeDocument.pages[p].name;
        $.writeln("myLabel = " + myLabel);
     /* .. use myLabel here .. */
}
//*/

for (p = 0; p < myDoc.pages.length; p++)
{
//  $.writeln("myLabel = " + myLabel);
}

if (myPage != null){

pagesLength = myDoc.documentPreferences.pagesPerDocument
$.writeln("myPage = " + myPage.name);
$.writeln("pages length = " + pagesLength);
}

//mySpread = myDoc.Spreads[1]
//$.writeln(mySpread.pages.length);
