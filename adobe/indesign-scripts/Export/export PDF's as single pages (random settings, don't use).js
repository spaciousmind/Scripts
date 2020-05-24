var myDoc = app.activeDocument;
var myFolderName = myDoc.filePath;
var myDocumentName = myDoc.name;
var myPages = myDoc.pages;
for (i = 0; i < myPages.length; i++){
    var myPage = myPages[i];
    var myPageName = myPage.name;
    var myFilePath = "/Users/kcote/Desktop/PDF/" + myDoc.name.slice (0, -5) + "page " + myPageName + ".pdf";
    var myFile = new File(myFilePath);
    app.pdfExportPreferences.pageRange = myPageName;
    //Do not open the PDF Export dialog box. Set “false” to “true” if you want the dialog box.
    myDoc.exportFile(ExportFormat.pdfType, myFile, false, "Press Quality");
    }