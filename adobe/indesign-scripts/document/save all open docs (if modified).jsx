
for (var i=0; i < app.documents.length; i++){
	doc = app.documents.item(i);
	var docName = doc.name.match(/(.*)(\.[^\.]+)/)[1];
	var myPath = doc.filePath;
	if(doc.modified == true){
		doc.save();
//		doc.close(SaveOptions=SaveOptions.NO) -- doesnt work properly
		}

}