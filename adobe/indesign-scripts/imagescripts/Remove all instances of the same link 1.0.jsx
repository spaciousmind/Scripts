// Remove all instances of the same link 1.0.jsx
// Remove all instances of the image selected in the active document
// Script for InDesign CS3 
// Version 1.0
// June 13 2010
// Written by Kasyan Servetsky
// http://www.kasyan.ho.com.ua
// e-mail: askoldich@yahoo.com
//--------------------------------------------------------------------------------------------------------------
if (app.documents.length == 0) ErrorExit("No documents are open. Please open a document and try again.", true);
var doc = app.activeDocument;
var links = doc.links;
if (app.selection.length != 1) ErrorExit("Select a graphic frame with image.", true);
var sel = app.selection[0];
if (sel.graphics.length != 1) ErrorExit("Selected graphic frame should contain an image.", true);
var selectedLink = sel.graphics[0].itemLink;
var selectedLinkPath = selectedLink.filePath + "";
if (selectedLink == null) ErrorExit("Selected item doesn't contain a link.", true);
var allInstances = [];
var counter = 0;
 
for (var j = 0; j < links.length; j++) {
     if (links[j].filePath == selectedLink.filePath) {
          allInstances.push(links[j]);
     }
}
 
if (allInstances.length == 1) {
     if (!confirm("This link has only one instance. Do you want to delete it?", false, "Delete all instances of a link")) exit();
}
 
for (var i = allInstances.length-1; i >= 0; i--) {
     try {
          var link = allInstances[i];
          var image = link.parent;
          var frame = image.parent;
          frame.remove();
          counter++;
     }
     catch(err) {
          $.writeln(i + " - " + err);
     }     
}
 
if (counter == 0) {
     alert("No links have been removed", "Delete all instances of a link");
}
else if (counter == 1) {
     alert("One clink has been removed", "Delete all instances of a link");
}
else if (counter > 1) {
     alert(counter  + " links have been removed", "Delete all instances of a link");
}
 
function ErrorExit(myMessage, myIcon) {
     alert(myMessage, "Error", myIcon);
     exit();
}