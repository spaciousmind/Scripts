#target indesign

var doc = app.activeDocument;
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkcurrentFolder = myLink.filePath.match(/^(.*[\:])/)[1];

var decodedmyLinkName = encodeURI(myLinkName);
var decodedmyLinkcurrentFolder = encodeURI(myLinkcurrentFolder);
$.writeln("decodedmyLinkName = " + decodedmyLinkName);
$.writeln("decodedmyLinkcurrentFolder = " + decodedmyLinkcurrentFolder);
$.writeln("myLinkfp = " +myLinkfp);
$.writeln("myLinkName = " +myLinkName);
$.writeln("myLinkcurrentFolder  = " +myLinkcurrentFolder );

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
		$.writeln("THEFILEPRE = " + myLinkcurrentFolder + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');
//				var theFile = File("WIP/Whakauae/05352_WHAKAUAE_2019%20Annual%20Report/05352%20Resources/New%20cover%20pics/Options/test_upscaled_185-pct.jpg");
//					$.writeln("theFile = " + theFile);
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
	bt.body = ResaveInPS.toSource()+"("+imagePath.toSource()+ "," + myLinkName.toSource()+ "," + scalePct.toSource()+");";
	bt.onError = function(errObj) {
		}
	bt.onResult = function(resObj) {
        		}
	bt.send(30);
//		myLink.relink(theFile);
 //   myLink.update();
}

//-----------------------------------------------
function ResaveInPS(imagePath, myLinkName, scalePct) {
	$.writeln("imagePath = " + imagePath);
	$.writeln("myLinkName = " + myLinkName);
	$.writeln("scalePct = " + scalePct);
	var psDoc;
	app.displayDialogs = DialogModes.NO;
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
	var saveFilePSD = File( currentPath + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.psd');
	var saveFileJPG = File( currentPath + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.jpg');
	psDoc.resizeImage(Number(scalePct), null, 300, ResampleMethod.BICUBICAUTOMATIC);
	psDoc.saveAs(saveFileJPG, jpgSaveOptions, true, Extension.LOWERCASE);
	psDoc.saveAs(saveFilePSD, psdSaveOptions, true, Extension.LOWERCASE);
	psDoc.close(SaveOptions.DONOTSAVECHANGES);
	app.open(saveFilePSD);
	app.preferences.rulerUnits = startRulerUnits;
	app.displayDialogs = DialogModes.ALL;
}
