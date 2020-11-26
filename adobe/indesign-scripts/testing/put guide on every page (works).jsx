//remove layer script
{

//An InDesign JavaScript
/*
@@@BUILDINFO@@@ "Films_Slick Templates.jsx" v1.0 November 2015
*/
//This script will prepare any slick template format for use for Films specific use, including DVD, Blu-ray, Fatpack and 12 disc Fatpack.
//Huge Thanks to Tom Byrne for making this code work, originally provimded on indesignsecrets.com user loicaigon.

//For more information on InDesign scripting, go to https://www.adobe.com/products/indesign/scripting/index.html
//Or visit the InDesign Scripting User to User forum at https://www.adobeforums.com.
//
function removeLayers(layersNamesArray) {
  var d,
    ls,
    l,
    n,
    r,
    c = 0;
  if (
    !app.documents.length ||
    !layersNamesArray ||
    !(layersNamesArray instanceof Array)
  )
    return;

  d = app.activeDocument;
  ls = d.layers;

  for (var i = 0; i < ls.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      l = ls[i];
      if (l.name == arr[j]) {
        //$.writeln(l.toSource())
        l.remove();
        c++;
        //Reset the loop and start again
        i = 0;
        break;
      }
    }
  }
  alert(c > 0 ? "Removed " + c + " layers" : "Removed none layers");
}
var arr = ["TEMPORARY GUIDES"];
removeLayers(arr);

//var arr = [“TV Licensor Logos and Inner Slick Template Layout Elements”,”Anime Licensor Logos (if not included, obtain logo from raw assets or previously done slick)”,”Disc Number Icon Back (Palace / No QR Code – Black)”,”Disc Number Icon Back (Palace / No QR Code – White)”,”Country of Origin Flags (Palace / No QR Code White Text)”,”Country of Origin Flags (Palace / No QR Code Black Text)”,”Specs Box Cartoon Network/Adult Swim (White)”,”Specs Box Cartoon Network/Adult Swim (Black)”,”Specs Box (Palace / No QR Code – White)”,”Specs Box (Palace / No QR Code – Black)”,”Specs Box Anime/Pop Culture (Black)”,”Specs Box Anime/Pop Culture (White)”,”Studio Ghibli Layout Elements”,”Adult Swim Layout Elements”,”Cartoon Network Layout Elements (Madman Logo Not present on front)”,”Directors Suite Layout Elements”,”Palace Layout Elements”,”SBS Template Elements”];

//=========================================================
}



//start actual code here
var myDoc = app.activeDocument;
var pagesLength = myDoc.documentPreferences.pagesPerDocument;
var spreadsLength = myDoc.spreads.length;

doScript();

function doScript() {
  //Create a layer to hold the TEMPORARY GUIDES (if it does not already exist).
  var newLayer = myDoc.layers.item("TEMPORARY GUIDES");
  try {
    newLayerName = newLayer.name;
    alert("TEMPORARY GUIDES EXISTS");
  } catch (myError) {
    var newLayer = myDoc.layers.add({ name: "TEMPORARY GUIDES" });
    doGuides();
  }

  function doGuides() {
        for ( var i=0; i < spreadsLength; i++ ){
        with (myDoc){
          var mySpread = spreads.item(i);
            mySpread.guides.add({
  					location:20,
   					orientation:HorizontalOrVertical.horizontal
				      });




    }
  }
}
}
