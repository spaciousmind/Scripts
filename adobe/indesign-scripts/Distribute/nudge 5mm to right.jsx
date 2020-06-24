var undoName = "nudge selected 5mm to the right";
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);

function main(){
  var mySelection = app.selection;
  for (var i=0; i < mySelection.length; i++){
    mySel = mySelection[i];
    gbounds = mySel.geometricBounds
    topleftY = gbounds[0];
    topleftX = gbounds[1];
    mySel.move([topleftX + 5,topleftY])
      //  mySelection[i].move([5,0])
}
}
