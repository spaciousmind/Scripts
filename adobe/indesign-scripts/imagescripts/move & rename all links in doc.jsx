#target indesign

if (app.documents.length == 0) {

   err("No documents are open. Please open a document and try again.");

}

if (app.activeDocument.links.length == 0) {

   err("The current document contains no images. Please open a document containing images and try again.");

}

var myFind, myChange, myResult;

var myFolder = Folder.selectDialog ("Choose a new job folder");

if (myFolder != null) {

   var myDoc = app.activeDocument;

   var myLinks = myDoc.links;



   var myDialog = app.dialogs.add({name:"Change job number", canCancel:true});

   var myColumn = myDialog.dialogColumns.add();

   var myPanel = myColumn.borderPanels.add();

   var myLabel1 = myPanel.staticTexts.add({staticLabel:"Change "});

   var myText1 = myPanel.textEditboxes.add();

   if (app.extractLabel("kas_myText1") != "") {

      myText1.editContents = app.extractLabel("kas_myText1");

   }

   var myLabel2 = myPanel.staticTexts.add({staticLabel:" to "});

   var myText2 = myPanel.textEditboxes.add();

   if (app.extractLabel("kas_myText2") != "") {

      myText2.editContents = app.extractLabel("kas_myText2");

   }



   if(myDialog.show() == true){

      var myFind = myText1.editContents;

      var myChange = myText2.editContents;



      app.insertLabel("kas_myText1", myFind);

      app.insertLabel("kas_myText2", myChange);



      for (i = myLinks.length-1; i >= 0 ; i--) {

         var myLink = myLinks[i];

         var myFile = new File(myLink.filePath);

         var myNewName = myLink.name.replace(myFind, myChange);

         var myNewFile = new File(myFolder + "/" + myNewName);

         if (myFile!= myNewFile) {

            if (myFile.exists) {

               myFile.copy(myNewFile);

               myLink.relink(myNewFile);

               myLink.update();

            }

         }

      }

      myDialog.destroy();

      alert("Done!");

   }

   else{

      myDialog.destroy();

   }

}

function err(e) {

   alert(e);

   exit();

}