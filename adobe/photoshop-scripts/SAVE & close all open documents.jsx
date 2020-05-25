var time1 = Number(timeString());

//Savechanges & Close all the open documents
while (app.documents.length) {
activeDocument.close(SaveOptions.SAVECHANGES)
}

////// function to get the current time //////
function timeString () {
  var now = new Date();
  return now.getTime()
}