#target indesign

/////check link to theFile --- not opening .psd in photoshop
$.writeln("---------------------------");
var doc = app.activeDocument;
var myImage = app.selection[0].images[0];
var myLink = app.selection[0].graphics[0].itemLink;
var myLinkfp = myLink.filePath;
var myLinkName = myLink.name.match(/(.*)(\.[^\.]+)/)[1];
var myLinkCurrentFolder = myLink.filePath.match(/^(.*[\\])/)[1];

$.writeln("myLinkfp = "+myLinkfp);

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
				var theFilepre = myLinkCurrentFolder +  myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg';
				var theFile = File(myLinkCurrentFolder + "\\" + myLinkName + '_upscaled_' + Math.round(scalePercentage) + '-pct.jpg');
				$.writeln("theFilepre = " +theFilepre);
				$.writeln("theFile = " +theFile);

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
		myLink.relink(theFile);
    myLink.update();
}


	// var imagePath = imagePath.replace(/(^.*)(\u00BB.)/, "WIP:» ");  //--version for WORK. USE IN BELOW FUNCTION
//-----------------------------------------------
function ResaveInPS(imagePath, myLinkName, scalePct) {
	var psDoc;
	app.displayDialogs = DialogModes.NO;
	$.writeln("imagepathpre = "+imagePath);
	var imagePath = imagePath.replace(/([^\.]+$)/,"psd");
		$.writeln("imagepathpost = "+imagePath);
	var startRulerUnits = app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PERCENT;
	psDoc = app.open(new File(imagePath));
	psdSaveOptions = new PhotoshopSaveOptions();
		psdSaveOptions.layers = true;
	jpgSaveOptions = new JPEGSaveOptions();
		jpgSaveOptions.embedColorProfile = true;
		jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
		jpgSaveOptions.matte = MatteType.NONE;
		jpgSaveOptions.quality = 12;
	var saveFilePSD = File( psDoc.path + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.psd');
	var saveFileJPG = File( psDoc.path + "/" + myLinkName + '_upscaled_' + Math.round(scalePct) + '-pct.jpg');
	psDoc.resizeImage(Number(scalePct), null, 300, ResampleMethod.BICUBICAUTOMATIC);
	psDoc.saveAs(saveFileJPG, jpgSaveOptions, true, Extension.LOWERCASE);
	psDoc.saveAs(saveFilePSD, psdSaveOptions, true, Extension.LOWERCASE);
	psDoc.close(SaveOptions.DONOTSAVECHANGES);
	app.open(saveFilePSD);
	app.preferences.rulerUnits = startRulerUnits;
	app.displayDialogs = DialogModes.ALL;
}
