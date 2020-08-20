alignToBottomObject()

function alignToBottomObject()

{

    var docRef = app.activeDocument;

    var sel = docRef.selection; //i changed this from array to be more descriptive

    const ALIGNMENT_PREFERENCE_VERTICAL = true;

    const ALIGNMENT_PREFERENCE_HORIZONTAL = true;

    if(sel.length <= 1)

    {

        alert("Please select at least 2 items.");

        return;

    }

    var bottomObject = sel[sel.length-1];

    var keyCenter = getCenterPoint(bottomObject);

    var curItem,curCenter;

    for(var x=0, len = sel.length-1; x < len; x++)

    {

        curItem = sel;



        if(ALIGNMENT_PREFERENCE_HORIZONTAL)

        {

            //align the object horizontally

            curItem.left = keyCenter.h - curItem.width/2;

        }

        if(ALIGNMENT_PREFERENCE_VERTICAL)

        {

            //align the object vertically

            curItem.top = keyCenter.v + curItem.height/2;

        }

    }

    function getCenterPoint(item)

    {

        return {"h":item.left + item.width/2, "v":item.top - item.height/2};

    }

}

alignToBottomObject();
