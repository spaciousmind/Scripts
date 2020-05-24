function checkWhichTable() {
    //ensure user made a selection 
    if (app.selection.length != 1) return null;
    var currentTable = app.selection[0];
    if (currentTable.hasOwnProperty("baseline")) currentTable = app.selection[0].parent;
    while (currentTable instanceof Cell || currentTable instanceof Row || currentTable instanceof Column) currentTable = currentTable.parent;
    if (!(currentTable instanceof Table)) return null;
    return currentTable;
}


app.doScript(checkUserSelection, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Process Table");


function checkUserSelection() {
    var a_table = checkWhichTable();
    if (a_table == null) {
        if (confirm("No table selected. Do you want to process *all* tables?") == false)
            return;
        allTables = app.activeDocument.stories.everyItem().tables.everyItem().getElements();
        for (var a = 0; a < allTables.length; a++) processTable(allTables[a]);
    } else processTable(a_table);
}


function processTable(myTable) { 
//USE THIS TO FIX CODE AND COUNT ROWS
//myRows = myTable.bodyRowCount;
//alert (myRows)



//myTable.columns[0].leftEdgeStrokeColor = "Paper";
lastColumn = myTable.columns.length - 1; /// gets the last column on the right
lastRow = myTable.rows.length - 1;

myTable.columns[0].leftEdgeStrokeWeight = 0;
myTable.columns[lastColumn].rightEdgeStrokeWeight = 0;
myTable.rows[lastRow].bottomEdgeStrokeWeight = 0;
//$.writeln(myTable.toSource());
    
    
//myTable.cells.everyItem().properties = {w
//topInset:"1mm", bottomInset:"1.5mm",
//leftEdgeStrokeColor:"Paper"w
  
} 