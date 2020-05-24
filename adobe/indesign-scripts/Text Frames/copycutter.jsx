//DESCRIPTION:CopyCutter — Cut your Copy at the Cursor
// Jongware, 24-Mar-2010

if (parseFloat(app.version) < 6)
doCopysplit();
else
app.doScript(doCopysplit, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "split copy at insertion point");


function doCopysplit()
{
if (app.selection.length == 1 && app.selection[0] instanceof InsertionPoint)
{
if (app.selection[0].parentTextFrames[0].previousTextFrame == null &&
app.selection[0].paragraphs.previousItem(app.selection[0].paragraphs[0]) != null)
{
oldframe = app.selection[0].parentTextFrames[0];
topline = app.selection[0].paragraphs[0].baseline;
newframe = oldframe.duplicate();
newframe.characters.itemByRange(app.selection[0].paragraphs[0].index - app.selection[0].parent.paragraphs[0].index-1, newframe.characters.lastItem().index).remove();
oldframe.paragraphs.itemByRange(oldframe.paragraphs[0], app.selection[0].paragraphs.previousItem(app.selection[0].paragraphs[0])).remove();
newframe.fit (FitOptions.FRAME_TO_CONTENT);

vdiff = topline - oldframe.characters[0].baseline;
newheight = oldframe.geometricBounds[2] - oldframe.geometricBounds[0] - vdiff;
oldframe.geometricBounds = [oldframe.geometricBounds[2] - newheight, oldframe.geometricBounds[1], oldframe.geometricBounds[2], oldframe.geometricBounds[3]];
//oldframe.fit (FitOptions.FRAME_TO_CONTENT);
newframe.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_CENTER_POINT;
newframe.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
oldframe.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_CENTER_POINT;
oldframe.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
}
} 
}




