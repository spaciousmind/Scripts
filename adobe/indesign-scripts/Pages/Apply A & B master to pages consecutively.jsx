var undoName = "apply A & B master pages consecutively"
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, undoName);



function main(){

  var d=app.documents[0];

  //checks if facing pages is turned off.
  if(d.documentPreferences.facingPages == false){

      // applies A & B master to pages consecutively all the way down
      var masterSpreadsD = d.masterSpreads;
      var pagesD = d.pages;
      var totalNumber = 2;
      var master2Name = "A-Master";
      var master1Name = "B-Master";
      for(var n=0;n<pagesD.length;n=n+totalNumber){
          pagesD[n].appliedMaster = masterSpreadsD.itemByName(master1Name);
          };
      for(var n=1;n<pagesD.length;n=n+totalNumber){
          pagesD[n].appliedMaster = masterSpreadsD.itemByName(master2Name);
          };

      null;

      };



   //checks if facing pages is turned on
   if(d.documentPreferences.facingPages == true){

      //applies A & B Master to all left & right pages correctly
      var myDialog = app.dialogs.add ({name:"APPLY MASTERPAGE",canCancel:true});
      var allMasters = new Array;
      for (i=0; i<app.activeDocument.masterSpreads.length; i++)
        allMasters.push(app.activeDocument.masterSpreads[i].name);


      with (myDialog)
      {
        with (dialogColumns.add())
        {

        with (dialogRows.add())
        {
        staticTexts.add ({staticLabel:"LEFT   "});
        myleft = dropdowns.add ({stringList:allMasters, selectedIndex:0});
        }
        with (dialogRows.add())
        {
        staticTexts.add ({staticLabel:"RIGHT"});
        myright = dropdowns.add ({stringList:allMasters, selectedIndex:0});
        }
        }
      }
      if (myDialog.show() == true)
      {
      for(var p=0;p<d.pages.length;p++){

        //Looking for RIGHT hand pages:
          if(d.pages[p].side == PageSideOptions.RIGHT_HAND){
              d.pages[p].appliedMaster = d.masterSpreads.item(allMasters[myright.selectedIndex])
              };

          if(d.pages[p].side == PageSideOptions.LEFT_HAND){
              d.pages[p].appliedMaster = d.masterSpreads.item(allMasters[myleft.selectedIndex])
              }
           }
      }
  }
}

//or you can turn off the facing page when strating
//if(d.documentPreferences.facingPages == true){
//    d.documentPreferences.facingPages == false
//    };
