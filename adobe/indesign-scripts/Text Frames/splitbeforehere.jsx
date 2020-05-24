/*
---------------------------------------------------------------------- --------------------------------------------
StorySplitter
---------------------------------------------------------------------- --------------------------------------------
An InDesign CS/CS2/CS3 JavaScript by FourAces
© The Final Touch 2006
Version 3.0.0
 
 
Splits the selected Story to separate Text Frames, while maintaining their contents.
---------------------------------------------------------------------- --------------------------------------------
Update by Naomi Kennedy
With modification by Chris Jennings
*/
#targetengine "session"
app.scriptPreferences.enableRedraw = 0;
 
var myScriptVer = "3.0";
 
 
 
if(app.documents.length != 0){
    mySplitBefore();
}else{
          alert("No Active Document Found.\nPlease open an InDesign document and select a Story to split.");
}
 
 
//-------------------------------------------------------------------- --------
 
 
 
function mySplitBefore(){
          var mySelection = app.activeDocument.selection;
          if(mySelection[0].previousTextFrame == null){
                    alert("Unable to break thread.\nThe selected Text Frame is the FIRST text frame of the thread.");
          }
          else{
                    var myBfBreakFrame = mySelection[0].previousTextFrame;
                    var myAfBreakFrame = mySelection[0];
                    var myBreakStory = myBfBreakFrame.parentStory;
                    mySelection[0].previousTextFrame = null;
                    if(myBfBreakFrame.overflows == true){
                              var myOversetText = myBreakStory.texts.itemByRange(myBfBreakFrame.insertionPoints[-1],myBreakStory.insertionPoints[-1]);
                              myOversetText.select();
                              app.cut();
                              app.select(myAfBreakFrame.insertionPoints[0]);
                              app.paste();
                              app.select(myAfBreakFrame.insertionPoints[0]);
//                               app.menuActions.itemByID(118822).invoke();
                              app.menuActions.itemByID(119567).invoke();
                    }
          }
}
 
 