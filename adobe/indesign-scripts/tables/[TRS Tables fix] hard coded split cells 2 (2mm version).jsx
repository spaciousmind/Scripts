function checkWhichTable() {    //ensure user made a selection
    if (app.selection.length != 1) return null;

 var currentTable = app.selection[0];
    if (currentTable.hasOwnProperty("baseline")) currentTable = app.selection[0].parent;
    while (currentTable instanceof Cell || currentTable instanceof Row || currentTable instanceof Column) currentTable = currentTable.parent;
    if (!(currentTable instanceof Table)) return null;
    return currentTable;
}app.doScript(checkUserSelection, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Process Table");
function checkUserSelection() {
 var a_table = checkWhichTable();
    if (a_table == null) {        if (confirm("No table selected. Do you want to process *all* tables?") == false)            return;
        allTables = app.activeDocument.stories.everyItem().tables.everyItem().getElements();
        for (
 var a = 0;
 a < allTables.length;
 a++) processTable(allTables[a]);
    } else processTable(a_table);
}function processTable(myTable) {
  app.findGrepPreferences = app.changeGrepPreferences = null;

  app.changeGrepPreferences.appliedCharacterStyle = app.activeDocument.characterStyleGroups.item("2019 styles").characterStyleGroups.item("TABLES").characterStyles.item("sizes");

  //  app.changeGrepPreferences.appliedCharacterStyle = "sizes";

  app.findGrepPreferences.findWhat = '^.+?"'
 var changes = myTable.cells.everyItem().texts[0].paragraphs.everyItem().changeGrep();


 var row, l, oldRow;

    oldRow = false;

  changes = [].concat.apply(null,changes);
 // flatten array
  l = changes.length;



  while (l--) {
      row = changes[l].parent.parentRow.cells.everyItem();
      if (row !== oldRow){ // only make changes to row if not already changed. Not sure if this makes a difference with InDesign
          row.height = "4mm";


          row.appliedCellStyle = "size cells";
         row.cells.everyItem().texts.everyItem().pointSize = 6;
          row.split(HorizontalOrVertical.HORIZONTAL)
          ﻿
          row.innerRowStrokeColor = app.activeDocument.swatches.item("TRS Blue");
          row.innerRowStrokeWeight = 1;
          row.innerRowStrokeTint = 100;


      }
      oldRow = row;

  }

}
