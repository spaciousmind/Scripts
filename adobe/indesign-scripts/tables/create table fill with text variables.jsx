if(app.documents.length > 0){
  var myDoc = app.activeDocument;
  var myVariables = myDoc.textVariables;
  var myVariablesTable = ["Index","Name","Type"];
  var rowCount = 1;
 
  for(var i = 0; i < myVariables.length; i++){
    myVariablesTable.push(String(myVariables[i].index));
    myVariablesTable.push(String(myVariables[i].name));
    myVariablesTable.push(String(myVariables[i].variableType));
    rowCount++;
  }
 
  var myTextFrame = myDoc.pages[0].textFrames.add();
  myTextFrame.geometricBounds = [20,20,250,300];
 
  var myVariablesTbl = myTextFrame.insertionPoints[0].tables.add();
  myVariablesTbl.columnCount = 3;
  myVariablesTbl.columns.item(0).width="15mm";
  myVariablesTbl.columns.item(2).width="90mm";
  myVariablesTbl.bodyRowCount = rowCount;
  myVariablesTbl.contents = myVariablesTable;
  myTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
}