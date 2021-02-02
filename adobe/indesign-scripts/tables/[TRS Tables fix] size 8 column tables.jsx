
if (parseFloat(app.version) < 6)
main();
else
var undoName = "edit tables"
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

/*
app.selection[0].rows.everyItem().fillColor = "Paper";
app.selection[0].rows.everyItem().fillTint = 0;

app.selection[0].rows.everyItem().leftEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().innerColumnStrokeWeight = 0;
app.selection[0].rows.everyItem().rightEdgeStrokeWeight = 0;

app.selection[0].rows.everyItem().topEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().innerRowStrokeWeight = 0;
app.selection[0].rows.everyItem().leftEdgeStrokeWeight = 0;
app.selection[0].rows.everyItem().bottomEdgeStrokeWeight = 0;
*/
  //        row.appliedCellStyle = "size cells";

app.selection[0].rows[0].height = "8mm";

var column1 = app.selection[0].columns[0]
var column2 = app.selection[0].columns[1]
var column3 = app.selection[0].columns[2]
var column4 = app.selection[0].columns[3]
var column5 = app.selection[0].columns[4]
var column6 = app.selection[0].columns[5]
var column7 = app.selection[0].columns[6]
var column8 = app.selection[0].columns[7]



column1.width = 11;
column1.cells.everyItem().texts.everyItem().justification = Justification.LEFT_ALIGN;
column1.cells.everyItem().topInset = 0;
column1.cells.everyItem().bottomInset = 0;
column1.leftInset = 1;
column1.rightInset = 0;

column2.width = 24.5;
column2.cells.everyItem().texts.everyItem().justification = Justification.RIGHT_ALIGN;

column3.width = 22.5;
column3.cells.everyItem().texts.everyItem().justification = Justification.CENTER_ALIGN;

column4.width = 20.5;
column4.cells.everyItem().texts.everyItem().justification = Justification.RIGHT_ALIGN;

column5.width = 22.5;
column5.cells.everyItem().texts.everyItem().justification = Justification.LEFT_ALIGN;
column5.leftInset = 3;

column6.width = 23.5;
column6.cells.everyItem().texts.everyItem().justification = Justification.LEFT_ALIGN;

column7.width = 21.5;
column7.cells.everyItem().texts.everyItem().justification = Justification.CENTER_ALIGN;
column7.leftInset = 0;
column7.rightInset = 0;

column8.width = 22.5;
column8.cells.everyItem().texts.everyItem().justification = Justification.RIGHT_ALIGN;
column8.leftInset = 0;
column8.rightInset = 3;

}
