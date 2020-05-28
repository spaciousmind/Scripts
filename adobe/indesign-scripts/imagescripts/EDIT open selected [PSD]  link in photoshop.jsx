#target indesign
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];

CreateBridgeTalkMessage(myLinkfp, myLinkName);

//-------------------FUNCTIONS--------------------------
function CreateBridgeTalkMessage(imagePath, myLinkName)
{
	var bt = new BridgeTalk();
	bt.target = "photoshop";
	bt.body = OpenInPS.toSource()+"("+imagePath.toSource()+ "," + myLinkName.toSource()+ ");";
	bt.onError = function(errObj) {}
	bt.onResult = function(resObj) {}
	bt.send(30);
}

function OpenInPS(imagePath, myLinkName)
{
	var psDoc;
	app.displayDialogs = DialogModes.NO;
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");
	psDoc = app.open(new File(imagePathPSD));
}

//DEBUG CODE -----
// currently broken get this working   ------------------------
//	$.writeln("imagePath = " +imagePath);
//	$.writeln("imagePathPSD = " +imagePathPSD);
//	$.writeln("psDoc = " +psDoc);
//	if (psDoc.exists === true)
//	{
//		alert("opened = " +imagePathPSD);
//	} else {
//		alert(imagePathPSD + " does not exist, opening jpg");
//		psDoc = app.open(new File(imagePath));
//	}
