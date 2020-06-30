#target indesign

os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC": "WINDOWS";


var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
if (os == "MAC"){
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];}
else {
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];}








CreateBridgeTalkMessage(myLinkfp, myLinkName);

//-------------------FUNCTIONS--------------------------
function CreateBridgeTalkMessage(imagePath, myLinkName)
{
	var bt = new BridgeTalk();
	bt.target = "photoshop";
	bt.body = OpenInPS.toSource()+"("+os.toSource()+ "," +imagePath.toSource()+ "," + myLinkName.toSource()+ ");";
	bt.onError = function(errObj) {}
	bt.onResult = function(resObj) {}
	bt.send(30);
}

function OpenInPS(os, imagePath, myLinkName){


	app.displayDialogs = DialogModes.NO;
	if (os == "MAC"){
		var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");}
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");

	var psDoc = File(imagePathPSD);
	if (psDoc.exists){
		app.open(psDoc);
		alert("opened = " +imagePathPSD);}
	else {
		origExt = imagePath.match(/[^\.]+$/);

		alert(myLinkName + ".psd does not exist, opening " +myLinkName + "." + origExt + " instead");
		psDoc = app.open(new File(imagePath));}
	}
