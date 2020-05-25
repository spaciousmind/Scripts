//#target Illustrator

//  script.name = fitObjectToArtboardBounds.jsx;

//  script.description = resizes selected object to fit exactly to Active Artboard Bounds;

//  script.required = select ONE object before running; CS4 & CS5 Only.

//  script.parent = carlos canto // 01/25/12;

//  script.elegant = false;

 

 

 

 

var idoc = app.activeDocument;

selec = idoc.selection;

if (selec.length==1)

    {

        // get document bounds

        var docw = idoc.width;

        var doch = idoc.height;

        var activeAB = idoc.artboards[idoc.artboards.getActiveArtboardIndex()]; // get active AB

 

 

 

 

        docLeft = activeAB.artboardRect[0];

        docTop = activeAB.artboardRect[1];

 

 

 

 

        // get selection bounds

        var sel = idoc.selection[0];

        var selVB = sel.visibleBounds;

        var selVw = selVB[2]-selVB[0];

        var selVh = selVB[1]-selVB[3];

 

 

 

 

        var selGB = sel.geometricBounds;

        var selGw = selGB[2]-selGB[0];

        var selGh = selGB[1]-selGB[3];

 

 

 

 

        // get the difference between Visible & Geometric Bounds

        var deltaX = selVw-selGw;

        var deltaY = selVh-selGh;

 

 

        if (sel.width > sel.height) {

            var newWidth = docw-deltaX;

            var ratio = sel.width / newWidth;

            sel.width = newWidth; // width is Geometric width, so we need to make it smaller...to accomodate the visible portion.

            sel.height = sel.height * ratio;

        } else {

            var newHeight = doch-deltaY;

            var ratio = sel.height / newHeight;

            sel.height = newHeight;

            sel.width = sel.width / ratio;

        }

 

 

 

 

        sel.top = (doch / 2) - (sel.height / 2);

        sel.left = (docw / 2) - (sel.width / 2);

 

 

    }

    else

        {

            alert("select ONE object before running");

        }