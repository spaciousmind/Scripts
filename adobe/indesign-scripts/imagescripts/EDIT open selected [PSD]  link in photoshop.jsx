//DEBUG CODE -----
/*
if (imagePathPSD.exists){
	psDoc = app.open(new File(imagePathPSD));
	alert("opened = " +imagePathPSD);}
*/

// currently broken get this working   ------------------------
//	$.writeln("imagePath = " +imagePath);
//	$.writeln("imagePathPSD = " +imagePathPSD);
//	$.writeln("psDoc = " +psDoc);
//	if (psDoc.exists === true)
//
//	if (psDoc.exists === true){
//		alert("opened = " +imagePathPSD);}
//	else {
//		alert(imagePathPSD + " does not exist, opening jpg");
//		psDoc = app.open(new File(imagePath));}



#target indesign
$.writeln("====================================");
os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC": "WINDOWS";
$.writeln(os);

var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
if (os == "MAC"){
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];}
else {
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];}

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
	bt.body = OpenInPS.toSource()+"("+os.toSource()+ ","+imagePath.toSource()+ "," + myLinkName.toSource()+ ");";
	bt.onError = function(errObj) {
		$.writeln(errObj.body)
	}
	bt.onResult = function(resObj) {
		$.writeln(resObj.body)
	}
	bt.send(30);
}

function OpenInPS(os, imagePath, myLinkName){
	$.writeln("imagePath = " +imagePath);
	$.writeln("myLinkName = " +myLinkName);
	app.displayDialogs = DialogModes.NO;
	if (os == "MAC"){
		var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");}
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");
	$.writeln("imagePathPSD = "+imagePathPSD);
	psDoc = app.open(new File(imagePathPSD));
	}
