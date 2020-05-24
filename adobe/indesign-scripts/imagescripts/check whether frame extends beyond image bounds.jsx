// SELECT THE INNER IMAGE BEFORE YOU RUN THIS SNIPPET!
 
const CS_BOARD = +CoordinateSpaces.pasteboardCoordinates,
      BB_VISIBLE = +BoundingBoxLimits.outerStrokeBounds,
      BB_PATH = +BoundingBoxLimits.geometricPathBounds;
 
const EPSILON = 1e-6;  
 
var image = app.selection[0], // target image (selection) 
    parent = image.parent;  
 
// Temporarily transform the container so its image box
// be a rectangle in the perspective of the pasteboard.
// ---  
var origin = image.resolve([[.5,.5],BB_PATH],CS_BOARD)[0],
    mx = image.transformValuesOf(CS_BOARD)[0],  
    T = app.transformationMatrices.add(1,1,
      -mx.clockwiseShearAngle,
      -mx.counterclockwiseRotationAngle
      );
 
parent.transform(CS_BOARD,origin,T);  
 
// Retrieve image corners in board coord space.  
// ---  
var iTL = image.resolve([[0,0],BB_PATH],CS_BOARD)[0],  
    iBR = image.resolve([[1,1],BB_PATH],CS_BOARD)[0];  
 
// Retrieve parent *inboard box* corners in board coord space.
// ---  
var pTL = parent.resolve([[0,0],BB_VISIBLE,CS_BOARD],CS_BOARD)[0],
    pBR = parent.resolve([[1,1],BB_VISIBLE,CS_BOARD],CS_BOARD)[0];
 
// Revert the transformation.  
// ---  
parent.transform(CS_BOARD,origin,T.invertMatrix());  
 
// Check whether the rectangle <pTL,pBR> is included in <iTL,iBR>
// ---  
var r = pTL[0] >= iTL[0]-EPSILON && pTL[1] >= iTL[1]-EPSILON
     && pBR[0] <= iBR[0]+EPSILON && pBR[1] <= iBR[1]+EPSILON;
 
alert( r ? 'OK' : 'KO' ); 