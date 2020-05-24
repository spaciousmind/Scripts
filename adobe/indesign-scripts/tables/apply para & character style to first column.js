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

myTable.columns[0].cells.everyItem().texts.everyItem().paragraphs.everyItem().appliedParagraphStyle = app.activeDocument.paragraphStyleGroups.item("WFS 2020").paragraphStyles.item("titles")
myTable.columns[0].cells.everyItem().texts.everyItem().characters.everyItem().appliedCharacterStyle = app.activeDocument.characterStyles.item("[None]")
}