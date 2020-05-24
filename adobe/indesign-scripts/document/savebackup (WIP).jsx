Main();

function Main(){
	if (app.documents.length > 0) {
		var doc = app.activeDocument;
		var docName = doc.name.replace(/\.indd$/, "");
		var currentPath = doc.filePath;
		var jobNumber = currentPath.name.match(/(\d\d\d\d\d)/)[1];
		var backupFolder = Folder(currentPath + "/" + jobNumber + " Resources" + "/" + "development" + "/" + "backup");
		if(!backupFolder.exists) backupFolder.create();
		var newPath = doc.filePath + "/" + jobNumber + " Resources" + "/" + "development" + "/" + "backup" + "/" + docName + "_backup" + ".indd";
		doc.save();
		doc.save(new File(newPath))
		doc.close();
		app.open(File(currentPath + "/" + docName + ".indd"));
			}
}