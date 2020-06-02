#target indesign

$.writeln("====================================");

var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];

$.writeln("myImage = " +myImage)
$.writeln("myLink = " +myLink)
$.writeln("myLinkfp = " +myLinkfp)
$.writeln("myLinkName = " +myLinkName)
$.writeln("myLinkCurrentFolder = " +myLinkCurrentFolder)
$.writeln("-------------------");

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
	$.writeln("imagePath = " +imagePath);
	$.writeln("myLinkName = " +myLinkName);
	var psDoc;
	app.displayDialogs = DialogModes.NO;
	var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");
	psDoc = app.open(new File(imagePathPSD));
}
