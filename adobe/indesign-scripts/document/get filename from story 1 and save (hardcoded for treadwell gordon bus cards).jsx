Main();

function Main(){
	if (app.documents.length > 0) {
		var doc = app.activeDocument;
		var docName = doc.name.replace(/\.indd$/, "");
		myStory = app.activeDocument.stories.item(1);
		myName = myStory.paragraphs[0].contents.replace(/\s*$/,'');
		var newPath = doc.filePath + "/" + "05409_TREADWELL GORDON_2020 Bus Cards_" + myName + ".indd";
		doc.save(new File(newPath))
		doc.close();
		app.open(File(newPath));
			}
}