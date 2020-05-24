//DESCRIPTION: Multi Copy to Multi Pages
// A Jongware script, 2-Feb-2012
// Make sure there is something appropriate selected
if (app.documents.length > 0 && app.selection.length > 0 && !(app.selection[0].hasOwnProperty(“baseline”)))
{
if (parseFloat(app.version) < 6)
multiCopy (app.selection);
else
app.doScript(multiCopy, ScriptLanguage.JAVASCRIPT, app.selection, UndoModes.ENTIRE_SCRIPT, “Multi Copy to Multi Pages”);
} else
{
alert (“No valid selection.nPlease select one single object with the black arrow before running this script.”);
}
function multiCopy (sel)
{
originalPage = app.layoutWindows[0].activePage.documentOffset;
pagerange = prompt (“Apply to page range (logical page numbers):”, String(originalPage+1)+”-“+String(app.activeDocument.pages.length));
if (pagerange != null)
{
pagerange_nrs = pagerange.match(/^(d+)-(d+)$/);
if (pagerange_nrs.length == 3)
{
// ID pages start counting at 0, so subtract 1:
startpg = Number(pagerange_nrs[1])-1;
if (startpg < 0)
{
alert (“Surely you are joking? You can't start at page 0!”);
return;
}
endpg = Number(pagerange_nrs[2]);
if (endpg >= app.activeDocument.pages.length)
{
alert (“Surely you are joking? You can't continue after the last page!”);
return;
}
// Subtracting 1 not necessary for the end page
// (that's due to JavaScript for..loop behavior)
for (i=startpg; i<endpg; i++)
{
if (i != originalPage)
{
for (j=0; j<sel.length; j++)
sel[j].duplicate (app.activeDocument.pages[i]);
}
}
} else
alert ('Bad page range. Please use “from-to” syntax using logical page numbering.');
}
}