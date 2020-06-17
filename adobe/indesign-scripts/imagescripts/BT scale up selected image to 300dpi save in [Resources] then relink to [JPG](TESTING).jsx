#target indesign

$.writeln("=======================================================");
os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC" : "WINDOWS";
var doc = app.activeDocument;
var myChar = "»"
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
if (os == "MAC"){
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];}
else{
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];}
var myLinkResourcesFolder = myLink.filePath.match(/(.*\d\d\d\d\d Resources)/)[1];
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkFullName = myLink.name;
var effectivePPI = String(myImage.effectivePpi);
effectivePPI.match(/(\d+),(\d+)/);
var ppiH = effectivePPI.replace(/(\d+),(\d+)/, '$1');
var ppiV = effectivePPI.replace(/(\d+),(\d+)/, '$2');

$.writeln("myChar = " +myChar);
$.writeln("myLinkResourcesFolder = " +myLinkResourcesFolder);
$.writeln("myLinkCurrentFolder = " +myLinkCurrentFolder);
$.writeln("myLinkName = " +myLinkName);

if (ppiH == ppiV) {
	if (ppiH < 300) {
		var scalePercentage = ((300 - ppiH) / ppiH) * 100 + 100;
		var scalePercentageRounded = Math.round(scalePercentage);
			$.writeln("scalePercentage = " + scalePercentage);
			$.writeln("scalePercentageRounded = " + scalePercentageRounded);
	if (os == "MAC"){
		var theFile = File(myLinkResourcesFolder + "\:" + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');}
	else {
		var theFile = File(myLinkResourcesFolder + "\\" + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');}
		CreateBridgeTalkMessage(myLinkfp, myLinkName, scalePercentage);
	} else {
		alert("PPI higher than 300 already");
	}
} else {
	alert("Horizontal and vertical resolutions are not the same.");
}

//---------------------FUNCTIONS-----------------
function CreateBridgeTalkMessage(imagePath, myLinkName, scalePct) {
	var bt = new BridgeTalk();
	bt.target = "photoshop";
	bt.body = ResaveInPS.toSource()+"("+os.toSource()+ "," +myLinkResourcesFolder.toSource()+ "," +imagePath.toSource()+ "," + myLinkName.toSource()+ "," + scalePct.toSource()+ "," + myChar.toSource()+ ");";
	bt.onError = function(errObj) {
		$.writeln(errObj.body)}
	bt.onResult = function(resObj) {
  	$.writeln(resObj.body)}
	bt.send(30);
		myLink.relink(theFile);
    myLink.update();
}

//-----------------------------------------------
function ResaveInPS(os, resourcesFolder, imagePath, myLinkName, scalePct, myChar) {
	$.writeln("-------------------------------------------------------");
	var psDoc;
	$.writeln("myChar = " +myChar);
	app.displayDialogs = DialogModes.NO;
	$.writeln("imagePathOriginal = " + imagePath);
	var decoded = decodeURI(imagePath);
	var encoded = encodeURI(imagePath);
	var decoded2 = decodeURI(encoded);
	$.writeln("»");
	$.writeln("decoded = " + decoded);
	$.writeln("encoded = " + encoded);
		$.writeln("decoded2 = " + decoded2);
	if (os == "MAC"){
		var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");
		$.writeln("mac");
		$.writeln("imagePath = " + imagePath);}
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");
	$.writeln("imagePathPSD = " + imagePathPSD);
}
