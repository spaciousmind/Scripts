function checkWhichTable() {
    if (app.selection.length != 1) return null;

 var currentTable = app.selection[0];






 var a_table = checkWhichTable();



 var a = 0;
 a < allTables.length;
 a++) processTable(allTables[a]);


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
    var myDoc = app.activeDocument;

      row = changes[l].parent.parentRow.cells.everyItem();

          row.height = "6mm";

          row.appliedCellStyle = "size cells";
//         row.cells.everyItem().texts.everyItem().pointSize = 6;
          row.split(HorizontalOrVertical.HORIZONTAL)
          ﻿
          row.innerRowStrokeColor = app.activeDocument.swatches.item("TRS Blue");
          row.innerRowStrokeWeight = 1;
          row.innerRowStrokeTint = 100;

      }
      oldRow = row;

  }
}