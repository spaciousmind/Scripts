#target indesign

os = $.os.toLowerCase().indexOf('mac') >= 0 ? "MAC" : "WINDOWS";
var doc = app.activeDocument;
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkResourcesFolder = myLink.filePath.match(/(.*\d\d\d\d\d Resources)/)[1];
$.writeln("myLinkResourcesFolder = " +myLinkResourcesFolder);
if (os == "MAC"){
	var myLinkparentFolder = myLink.filePath.match(/(.*\:[^\:]*)(\:[^\:]*\:)/)[1];}
else{
	var myLinkparentFolder = myLink.filePath.match(/(.*\\[^\\]*)(\\[^\\]*\\)/)[1];}

var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];

var effectivePPI = String(myImage.effectivePpi);
effectivePPI.match(/(\d+),(\d+)/);
var ppiH = effectivePPI.replace(/(\d+),(\d+)/, '$1');
var ppiV = effectivePPI.replace(/(\d+),(\d+)/, '$2');



if (ppiH == ppiV) {
	if (ppiH < 300) {
		var scalePercentage = ((300 - ppiH) / ppiH) * 100 + 100;
		var scalePercentageRounded = Math.round(scalePercentage);
			$.writeln("scalePercentage = " + scalePercentage);
			$.writeln("scalePercentageRounded = " + scalePercentageRounded);
	if (os == "MAC"){
		var theFile = File(myLinkparentFolder + "\:" + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');}
	else {
		var theFile = File(myLinkparentFolder + "\\" + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');}
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
	bt.body = ResaveInPS.toSource()+"("+os.toSource()+ "," +imagePath.toSource()+ "," + myLinkName.toSource()+ "," + scalePct.toSource()+");";
	bt.onError = function(errObj) {
		$.writeln(errObj.body)}
	bt.onResult = function(resObj) {
  	$.writeln(resObj.body)}
	bt.send(30);
		myLink.relink(theFile);
    myLink.update();
}

//-----------------------------------------------
function ResaveInPS(os, imagePath, myLinkName, scalePct) {
	var psDoc;
	app.displayDialogs = DialogModes.NO;
	if (os == "MAC"){
		var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");}
	var startRulerUnits = app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PERCENT;
	psDoc = app.open(new File(imagePath));
	var currentPath = psDoc.path;
	psdSaveOptions = new PhotoshopSaveOptions();
		psdSaveOptions.layers = true;
	jpgSaveOptions = new JPEGSaveOptions();
		jpgSaveOptions.embedColorProfile = true;
		jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
		jpgSaveOptions.matte = MatteType.NONE;
		jpgSaveOptions.quality = 12;
	var outputFolder = decodeURI(currentPath.parent);
	var saveFilePSD = File( outputFolder + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.psd');
	var saveFileJPG = File( outputFolder + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.jpg');
	psDoc.resizeImage(Number(scalePct), null, 300, ResampleMethod.BICUBICAUTOMATIC);
	psDoc.saveAs(saveFileJPG, jpgSaveOptions, true, Extension.LOWERCASE);
	psDoc.saveAs(saveFilePSD, psdSaveOptions, true, Extension.LOWERCASE);
	psDoc.close(SaveOptions.DONOTSAVECHANGES);
	app.open(saveFilePSD);
	app.preferences.rulerUnits = startRulerUnits;
	app.displayDialogs = DialogModes.ALL;
}
