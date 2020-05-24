function moveToConsideringAnchor(obj, xyDest, anchorPt)
// -------------------------------------
// <obj>      : any singular PageItem specifier
// <xyDest>   : [x,y] location expressed in the current ruler space
// <anchorPt> : the considered AnchorPoint (default is top-left)
{
    if( !(obj && 'transform' in obj) ) return;
 
    var CS_PASTEBOARD = CoordinateSpaces.pasteboardCoordinates;
 
    anchorPt || (anchorPt=AnchorPoint.topLeftAnchor);
 
    var xy0 = obj.resolve(anchorPt,CS_PASTEBOARD)[0],
        xy1 = obj.resolve([xyDest,anchorPt],CS_PASTEBOARD,true)[0],
        dx = xy1[0]-xy0[0],
        dy = xy1[1]-xy0[1];
 
    obj.transform(CS_PASTEBOARD,[0,0],[1,0,0,1,dx,dy]);
}
 
// ---
// SAMPLE CODE
// ---
 
// Your settings:
var CONSIDERED_ANCHOR = AnchorPoint.BOTTOM_RIGHT_ANCHOR,
    XY_DESTINATION = [159,61.3]; // in ruler space
 
var sel = (1==app.selection.length) && app.selection[0];
 
if( sel instanceof Rectangle )
    {
    moveToConsideringAnchor(sel, XY_DESTINATION,
        CONSIDERED_ANCHOR);
    }
 