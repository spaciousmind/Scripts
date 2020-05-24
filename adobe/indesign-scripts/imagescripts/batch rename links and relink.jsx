//RenameRelink.jsx
//An InDesign CS2 JavaScript
//
//Renames the file of the selected linked graphic and relinks to the renamed graphic.
//Used in the production of "Real World Adobe InDesign CS2"
//
if(app.documents.length != 0){
 if((app.documents.item(0).allGraphics.length != 0)&&(app.selection.length != 0)){
  //A production version of this script would probably include
  //a more complete list of graphic/page item types.
  switch(app.selection[0].constructor.name){
   //If a frame is selected with the Selection tool...
   case "Rectangle":
   case "Oval":
   case "Polygon":
    if(app.selection[0].graphics.length != 0){
     myDisplayDialog(app.selection[0].graphics.item(0));
    }
    break;
   //If a graphic is selected with the Direct Selection tool...
   case "Image":
   case "EPS":
   case "PDF":
    myDisplayDialog(app.selection[0]);
    break;
  }
 }
}
function myDisplayDialog(myGraphic){
 //A production version of this script would probably check the link
 //status before proceeding to get the link file.
 var myLink = myGraphic.itemLink;
 var myLinkName = myLink.name;
 var myLinkFile = File(myLink.filePath);
 //A production version of this script would check to see if
 //the link file is present, and whether it's an alias/shortcut
 //rather than a file.
 var myDialog = app.dialogs.add({name:"Rename Graphic"});
 with(myDialog.dialogColumns.add()){
  with(dialogRows.add()){
   with(dialogColumns.add()){
    staticTexts.add({staticLabel:"File name:"});
   }
   with(dialogColumns.add()){
    var myFileNameField = textEditboxes.add({editContents:myLinkName, minWidth:200});
   }
  }
 }
 var myResult = myDialog.show();
 if(myResult == true){
  var myFileName = myFileNameField.editContents;
  myDialog.destroy();
  myRenameGraphic(myLink, myLinkFile, myFileName);
 }
 else{
  myDialog.destroy();
 }
}
function myRenameGraphic(myLink, myLinkFile, myFileName){
 //A production version of the script would put up an error if the
 //file cannot be renamed (for whatever reason).
 myLinkFile.rename(myFileName);
 myLink.relink(myLinkFile);
 myLink.update();
}