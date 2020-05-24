// This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/.

#targetengine "session03";
var myScriptPath = (File(app.activeScript.fullName).parent.fsName).toString().replace(/\\/g, '/')+"/HT_Resources/";
var w = new Window("palette", "Humane Type v1.5");
var tImage1 = w.add("image", undefined, File(myScriptPath+"t1.png"));

var myInputGroup = w.add("group");
var img = myInputGroup.add("image", undefined, File(myScriptPath+"1.png"));
var slider = myInputGroup.add('slider {minvalue: 0, maxvalue: 45, value: 15}');
var value = myInputGroup.add('edittext {text: 15, characters: 3, justify: "center", active: true}');
slider.onChanging = function () {
	value.text = slider.value
}
value.onChanging = function () {
	slider.value = Number(value.text)
}

var myInputGroup2 = w.add("group");
var img2 = myInputGroup2.add("image", undefined, File(myScriptPath+"2.png"));
var slider2 = myInputGroup2.add('slider {minvalue: 0, maxvalue: 45, value: 5}');
var value2 = myInputGroup2.add('edittext {text: 5, characters: 3, justify: "center", active: true}');
slider2.onChanging = function () {
	value2.text = slider2.value
}
value2.onChanging = function () {
	slider2.value = Number(value2.text)
}

var myInputGroup3 = w.add("group");
var img3 = myInputGroup3.add("image", undefined, File(myScriptPath+"3.png"));
var slider3 = myInputGroup3.add('slider {minvalue: 0, maxvalue: 30, value: 3}');
var value3 = myInputGroup3.add('edittext {text: 3, characters: 3, justify: "center", active: true}');
slider3.onChanging = function () {
	value3.text = slider3.value
}
value3.onChanging = function () {
	slider3.value = Number(value3.text)
}

var updateBodyButton = w.add('button {text: "Do Body"}');
updateBodyButton.alignment = 'fill';
updateBodyButton.onClick = function () {
	app.doScript(handWrite, undefined, undefined, UndoModes.entireScript);
}
w.separator = w.add("panel");
w.separator.alignment = 'fill';

var tImage2 = w.add("image", undefined, File(myScriptPath+"t2.png"));

var myInputGroup4 = w.add("group");
var img4 = myInputGroup4.add("image", undefined, File(myScriptPath+"4.png"));
var slider4 = myInputGroup4.add('slider {minvalue: 0, maxvalue: 15, value: 3}');
var value4 = myInputGroup4.add('edittext {text: 3, characters: 3, justify: "center", active: true}');
slider4.onChanging = function () {
	value4.text = slider4.value
}
value4.onChanging = function () {
	slider4.value = Number(value4.text)
}

var myInputGroup4 = w.add("group");
var img5 = myInputGroup4.add("image", undefined, File(myScriptPath+"5.png"));
var slider5 = myInputGroup4.add('slider {minvalue: 0, maxvalue: 5, value: 1}');
var value5 = myInputGroup4.add('edittext {text: 1, characters: 3, justify: "center", active: true}');
slider5.onChanging = function () {
	value5.text = slider5.value
}
value5.onChanging = function () {
	slider5.value = Number(value5.text)
}

var myInputGroup5 = w.add("group");
var img6 = myInputGroup5.add("image", undefined, File(myScriptPath+"6.png"));
var slider6 = myInputGroup5.add('slider {minvalue: 0, maxvalue: 300, value: 100}');
var value6 = myInputGroup5.add('edittext {text: 100, characters: 3, justify: "center", active: true}');
slider6.onChanging = function () {
	value6.text = slider6.value
}
value6.onChanging = function () {
	slider6.value = Number(value6.text)
}

var myInputGroup6 = w.add("group");
var img7 = myInputGroup6.add("image", undefined, File(myScriptPath+"7.png"));
var slider7 = myInputGroup6.add('slider {minvalue: 0, maxvalue: 300, value: 0}');
var value7 = myInputGroup6.add('edittext {text: 0, characters: 3, justify: "center", active: true}');
slider7.onChanging = function () {
	value7.text = slider7.value
}
value7.onChanging = function () {
	slider7.value = Number(value7.text)
}

var updateBodyButton2 = w.add('button {text: "Do Title"}');
updateBodyButton2.alignment = 'fill';
updateBodyButton2.onClick = function () {
	app.doScript(handTitle, undefined, undefined, UndoModes.entireScript);
}
w.pbar = w.add('progressbar', undefined, 0, 300);
w.pbar.alignment = 'fill';
w.pbar.visible = false;

function handTitle() {
	if (app.selection[0] instanceof  Text || app.selection[0] instanceof TextFrame || app.selection[0] instanceof Word ) {
		changeUnitsToPixels();
		var tf = app.selection[0];
		w.pbar.visible = true;
		w.pbar.maxvalue = tf.characters.length;
		for (var n = 0; n < tf.characters.length; n++) {
			var c = tf.characters[n];
			w.pbar.value = n + 1;
			var tempKern = c.tracking;
			var tempSize = c.pointSize;
			c.characterRotation = rand(-1 * slider4.value, slider4.value);
			c.skew = rand(0, 0.1);
			c.baselineShift = rand(-1 * slider5.value, slider5.value);
			c.tracking = rand(tempKern, tempKern + slider6.value);
			c.pointSize = rand(tempSize, tempSize + slider7.value);
		};
		changeUnitsBack();
		w.pbar.visible = false;
	} else {
		alert("Please select either a textframe or a text part")
	}
}

function handWrite() {
	if (app.selection[0] instanceof TextFrame) {
		var lineStart,
		lineEnd,
		lineY
		changeUnitsToPixels();
		var tPaths = new Array();
		var tf = app.selection[0]; 
		var currentPage = tf.parentPage;
		app.activeWindow.activePage = currentPage;
		tf.texts.everyItem().select();
		var selectionRightBound = tf.geometricBounds[3];
		var lines = tf.lines;
		var prevExtraY = 0;
		w.pbar.visible = true;
		w.pbar.maxvalue = lines.length;
		for (var m = 0; m < lines.length; m++) {
			w.pbar.value = m + 1;
			lineStart = lines[m].horizontalOffset;
			lineEnd = lines[m].endHorizontalOffset;
			lineY = lines[m].endBaseline;

			var midX = (selectionRightBound - lineStart) / 3 + lineStart;
			var extraX = rand(-slider2.value, slider2.value);
			var extraY = rand(-2, slider3.value) + prevExtraY;
			var x0,
			y0,
			x1,
			y1,
			h_x0,
			h_y0;
			prevExtraY = extraY;
			x0 = lineStart + extraX;
			y0 = lineY + extraY;
			x1 = lineEnd + extraX;
			y1 = lineY + rand(0, slider.value) + extraY;
			h_x0 = lineEnd + extraX;
			h_y0 = lineY + extraY;

			var gl = currentPage.graphicLines.add();
			gl.strokeColor = "None";
			gl.fillColor = "None";
			gl.paths[0].entirePath = [
				[[x0, y0], [x0, y0], [h_x0, h_y0]],
				[selectionRightBound + extraX, y1]
			];
			tPaths.push(gl);

		}
		var TP = tPaths[0].textPaths.add();
		for (var i = tPaths.length - 1; i > 0; i--) {
			var TP2 = tPaths[i].textPaths.add();
			TP.nextTextFrame = TP2;
		}
		app.cut();
		TP.texts.everyItem().select();
		app.paste();
		tf.remove();
		changeUnitsBack();
		w.pbar.visible = false;
		app.activeDocument.select(NothingEnum.NOTHING);
		app.menuActions.itemByID(118822).invoke(); 
	} else {
		alert("Please select a textframe");
	}
}

function changeUnitsToPixels() {
	if (typeof originalUnitsH === 'undefined')
		originalUnitsH = app.documents[0].viewPreferences.horizontalMeasurementUnits;
	if (typeof originalUnitsV === 'undefined')
		originalUnitsV = app.documents[0].viewPreferences.verticalMeasurementUnits;
	app.documents[0].viewPreferences.horizontalMeasurementUnits = app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;
}

function changeUnitsBack() {
	app.documents[0].viewPreferences.horizontalMeasurementUnits = originalUnitsH;
	app.documents[0].viewPreferences.verticalMeasurementUnits = originalUnitsV;
	delete originalUnitsH;
	delete originalUnitsV;
}

function rand(min, max) {
	return Math.random() * (max - min + 1) + min;
}

w.show();
