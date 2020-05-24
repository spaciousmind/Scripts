Main();

function Main(){
	if (app.documents.length > 0) {
		var doc = app.activeDocument;
		var docName = doc.name.replace(/\.indd$/, "");
		var newDoc = prompt("Choose a new name for the document", docName);
		var newPath = doc.filePath + "/" + newDoc + ".indd";
		doc.save(new File(newPath))
		doc.close();
		app.open(File(newPath));
			}
}