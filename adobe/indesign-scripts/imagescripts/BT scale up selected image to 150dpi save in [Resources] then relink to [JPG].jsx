#target indesign


os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC" : "WINDOWS";
var doc = app.activeDocument;
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;

if (os == "MAC"){
	var seperator = ":";
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];}
else{
	var seperator = "/";
	var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];}

var myLinkResourcesFolder = myLink.filePath.match(/(.*\d\d\d\d\d Resources)/)[1];
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkFullName = myLink.name;
var effectivePPI = String(myImage.effectivePpi);
effectivePPI.match(/(\d+),(\d+)/);
var ppiH = effectivePPI.replace(/(\d+),(\d+)/, '$1');
var ppiV = effectivePPI.replace(/(\d+),(\d+)/, '$2');

$.writeln("myLinkResourcesFolder = " +myLinkResourcesFolder);
$.writeln("myLinkCurrentFolder = " +myLinkCurrentFolder);
$.writeln("myLinkName = " +myLinkName);

// NOTE had to set the value to 152 to get it over 150dpi.


if (ppiH == ppiV) {
	if (ppiH < 152) {
		var scalePercentage = ((152 - ppiH) / ppiH) * 100 + 100;
		var scalePercentageRounded = Math.round(scalePercentage);
		$.writeln("scalePercentage = " + scalePercentage);
		$.writeln("scalePercentageRounded = " + scalePercentageRounded);
		var theFile = File(myLinkResourcesFolder + seperator + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');
		CreateBridgeTalkMessage(myLinkfp, myLinkName, scalePercentage);
	} else {
		alert("PPI higher than 150 already");	}
} else {
	alert("Horizontal and vertical resolutions are not the same.");}

//---------------------FUNCTIONS-----------------
function CreateBridgeTalkMessage(imagePath, myLinkName, scalePct) {
	var bt = new BridgeTalk();
	bt.target = "photoshop";
	bt.body = ResaveInPS.toSource()+"("+os.toSource()+ "," +myLinkResourcesFolder.toSource()+ "," +imagePath.toSource()+ "," + myLinkName.toSource()+ "," + scalePct.toSource()+");";
	bt.onError = function(errObj) {
		$.writeln(errObj.body)}
	bt.onResult = function(resObj) {
  	$.writeln(resObj.body)}
	bt.send(30);
		myLink.relink(theFile);
    myLink.update();
}

//-----------------------------------------------
function ResaveInPS(os, resourcesFolder, imagePath, myLinkName, scalePct) {
	$.writeln("-------------------------------------------------------");
	var psDoc;
	app.displayDialogs = DialogModes.NO;
	$.writeln("stupidChar = " + stupidChar);
	if (os == "MAC"){
		var stupidChar = String.fromCharCode(0x00BB);
		var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:" +stupidChar+ " ");
		var resourcesFolder = resourcesFolder.replace(/(^.*)(\u00BB.)/, "WIP:" +stupidChar+ " ");
		var seperator = ":";}
	else {
		var seperator = "/";}
	var imagePathPSD = imagePath.replace(/([^\.]+$)/,"psd");
	var startRulerUnits = app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PERCENT;
	$.writeln("imagePath = " + imagePath);
	$.writeln("resourcesFolder = " + resourcesFolder);
	psDoc = File(imagePathPSD);
	if (psDoc.exists){
		psDoc = app.open(psDoc);
		$.writeln("opened =" +imagePathPSD);}
	else{
		origExt = imagePath.match(/[^\.]+$/);
		$.writeln(myLinkName + ".psd does not exist, opening " +myLinkName + "." + origExt + " instead");
		psDoc = app.open(new File(imagePath));}
		var currentPath = psDoc.path;
	psdSaveOptions = new PhotoshopSaveOptions();
		psdSaveOptions.layers = true;
	jpgSaveOptions = new JPEGSaveOptions();
		jpgSaveOptions.embedColorProfile = true;
		jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
		jpgSaveOptions.matte = MatteType.NONE;
		jpgSaveOptions.quality = 12;
	$.writeln("saveFilePSD = " +resourcesFolder + seperator + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.psd');
	$.writeln("saveFileJPG = " +resourcesFolder + seperator + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.jpg');
	var saveFilePSD = File(resourcesFolder + seperator + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.psd');
	var saveFileJPG = File(resourcesFolder + seperator + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.jpg');
	psDoc.resizeImage(Number(scalePct), null, 300, ResampleMethod.BICUBICAUTOMATIC);
	psDoc.saveAs(saveFileJPG, jpgSaveOptions, true, Extension.LOWERCASE);
	psDoc.saveAs(saveFilePSD, psdSaveOptions, true, Extension.LOWERCASE);
	psDoc.close(SaveOptions.DONOTSAVECHANGES);
	app.open(saveFilePSD);
	app.preferences.rulerUnits = startRulerUnits;
	app.displayDialogs = DialogModes.ALL;
}
