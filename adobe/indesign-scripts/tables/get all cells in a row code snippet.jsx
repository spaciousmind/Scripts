
 var i, j, cells;
// Get all the rows in the document
var rows = app.documents[0].stories.everyItem().tables.everyItem().rows.everyItem().getElements();
for (i = 0; i < rows.length; i++) {
    // Get all the cells in a row
    cells = rows[i].cells.everyItem().getElements();
    for (j = cells.length-1; j >= 1; j--) {
        if (cells[j].contents == '') {
            cells[j-1].merge (cells[j]);
        }
    }
}