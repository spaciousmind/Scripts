﻿//DESCRIPTION:Convert the selected image to a "background" image of gray on an accent color

// Modified 2019-03-26b
// Keith Gilbert, Gilbert Consulting
// www.gilbertconsulting.com

Pre();
  
// Do some setup stuff
function Pre () {  
	var  
		_scriptRedraw = app.scriptPreferences.enableRedraw,  
		_userInteraction = app.scriptPreferences.userInteractionLevel;  
		_measurementUnit = app.scriptPreferences.measurementUnit;
	app.scriptPreferences.enableRedraw = false;  
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;  
	app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
	if (app.documents.length) {
		if(app.selection.length == 1) {
			var myDoc = app.activeDocument;
			switch(app.selection[0].constructor.name){
				case "Rectangle":
				case "Oval":
				case "Polygon":
					if (app.selection[0].graphics.length == 0) {
						alert("Please select a frame containing a graphic and try again.");
						return;
					}
					else {
						if (app.selection[0].parent.constructor.name == "Group") {
							alert("Please select a single frame that isn't in a group, and try again.");
							return;
						}
					}
					// Main();
					app.doScript(Main, undefined, undefined, UndoModes.ENTIRE_SCRIPT,"Run Script");
					break;				
				case "TextFrame":
				case "TextBox":
				case "GraphicLine":
				case "Image":
				case "PDF":
				case "EPS":
				case "Character":
				case "Word":
				case "TextStyleRange":
				case "Line":
				case "Paragraph":
				case "TextColumn":
				case "Text":
				case "Table":
				case "Cell":
				default:
					alert("Please select a single image frame and try again.");
					break;
			}
		}
		else {
			alert("Please select a single image frame and try again.");
		}
	}
	else {  
		alert("No InDesign documents are open. Please open a document and try again.");
	}  
	app.scriptPreferences.enableRedraw = _scriptRedraw;  
	app.scriptPreferences.userInteractionLevel = _userInteraction;  
	app.scriptPreferences.measurementUnit = _measurementUnit;
}  

function Main() {
	var myDoc = app.activeDocument;
	var mySelection = app.selection[0];
	var myAnchored = false;
	// Check to see if frame is inline or anchored
	if (mySelection.parent.constructor.name == "Character") {
		var myInsertionPoint = mySelection.parent.insertionPoints[0];
		var myAnchoredObjectSettings = mySelection.anchoredObjectSettings.properties;
		var myAnchored = true;
		var myBounds = mySelection.geometricBounds; // Memorize the position of the frame, because this changes when the anchor is released
		mySelection.anchoredObjectSettings.anchoredPosition = AnchorPosition.anchored; // Memorize all the anchor properties
		mySelection.anchoredObjectSettings.releaseAnchoredObject(); // Release the anchor
		mySelection.geometricBounds = myBounds; // Move the frame back into position
	}
	var myResults = myInput();
	if (myResults) {
		var myOpacity = myResults[0];
		var myColor = myResults[1];
	}
	else {
		return;
	}
	// Duplicate the frame
	var myDuplicate = mySelection.duplicate();
	myDuplicate.graphics[0].remove();
	// Set the blend mode of the graphic in the frame to luminosity
	var myGraphic = mySelection.graphics[0];
	myGraphic.transparencySettings.blendingSettings.blendMode = BlendMode.LUMINOSITY;
	// Fill the frame with black
	mySelection.fillColor = myDoc.swatches.itemByName("Black");
	// Set the blend mode of the selected frame to multiply
	mySelection.transparencySettings.blendingSettings.blendMode = BlendMode.MULTIPLY;
	// Set the opacity of the selected frame to the value chosen by the user
	mySelection.transparencySettings.blendingSettings.opacity = Number(myOpacity);
	// Fill the duplicate with the swatch the user selected
	myDuplicate.fillColor = myDoc.swatches[myColor.index+2];
	myDuplicate.strokeColor = myDoc.swatches.item("None");
	// Make sure the duplicate doesn't have a text wrap
	myDuplicate.textWrapPreferences.textWrapMode = TextWrapModes.NONE;
	// Send the duplicate behind the selection
	myDuplicate.sendToBack(mySelection);
	// Group the duplicate and the selection
	var myGroup = myDoc.groups.add([myDuplicate,mySelection]);
	if (myAnchored) { // If the frame was anchored or inline, put it back anchored or inline
		myGroup.anchoredObjectSettings.insertAnchoredObject(myInsertionPoint);
		myGroup.anchoredObjectSettings.properties = myAnchoredObjectSettings;
	}
	// Re-select the original selection
	myGroup.select();
}

// Get input from the user
function myInput () {
	// Thanks to Marc Autret for the code for generating the swatch drop-down list!!
	// See https://forums.adobe.com/thread/780105?tstart=0

	// PNG-String Generator (=> 13X13 pixels)  
	//----------------------------------------------------------  
	var pngSwatch = (function()  
	{  
		// Table of CRCs of 8-bit messages  
		var CRC_256 = [0, 0x77073096, 0xee0e612c, 0x990951ba, 0x76dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0xedb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x9b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x1db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x6b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0xf00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x86d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x3b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x4db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0xd6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0xa00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x26d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x5005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0xcb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0xbdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d];  
		
		// PNG Cyclic Redundancy Code algorithm -- http://www.w3.org/TR/PNG/#D-CRCAppendix  
		var crc32 = function(/*uint[]*/buf)  
			{  
			var c = 0xffffffff >>> 0,  
				n = buf.length >>> 0,  
				i;  
			for( i=0 ; i < n ; ++i )  
				c = CRC_256[( ( c>>>0 ) ^ buf[i]) & 0xff] ^ (c >>> 8);  
		
			return (c ^ 0xffffffff)>>>0;  
			};  
	
		var PNG_PROLOG = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\r\x00\x00\x00\r\b\x03\x00\x00\x00E5\x14N\x00\x00\x00\x06",  
			PNG_EPILOG = "\x00\x00\x00\x16IDATx\xDAb`D\x06\f\x8C\f\b0\xC8x\xC8\x00 \xC0\x00\x11\xC6\x001{U\x93\xB6\x00\x00\x00\x00IEND\xAEB`\x82";  
	
		return function(/*uint[3]*/rgb)  
			{  
			var buf = [0x50,0x4C,0x54,0x45, rgb[0], rgb[1], rgb[2], 0, 0, 0],  
				crc = crc32(buf),  
				i, r;  
				
			buf = buf.concat([ (crc>>>24)&0xFF, (crc>>>16)&0xFF, (crc>>>8)&0xFF, (crc>>>0)&0xFF ]);  
			i = buf.length;  
			while( i-- )  
				buf[i] = String.fromCharCode(buf[i]);  
				
			r = PNG_PROLOG + buf.join('') + PNG_EPILOG;  
				
			buf.length = 0;  
			buf = null;  
			return r;  
			};  
	})();  

	// Parse the app|doc Swatches (supports CMYK and RGB)  
	//----------------------------------------------------------  
	var CMYK = ColorSpace.CMYK,  
		RGB = ColorSpace.RGB,  
		LAB = ColorSpace.LAB;  
	
	var PROCESS = ColorModel.PROCESS;  
	
	var     target = (app.documents.length&&app.activeDocument)||app,  
		swatches = target.swatches.everyItem().getElements(),  
		n = swatches.length,  
		color, rgbValues,  
		colors = [],  
		i, t;  
	
	for( i=n-1 ; i>=0 ; i-- )  
		{  
		color = swatches[i];  
		rgbValues = false;  
	
		if( !(swatches[i] instanceof Color) ) continue;  
		color = color.getElements()[0];  
	
		switch( color.space )  
			{  
			case CMYK:  
				if( color.model != PROCESS ) break;  
				if( 'Black' == color.name )  
						{  
						rgbValues = [0,0,0];  
						break;  
						}  
						
				// backup cmyk  
				t = color.colorValue;  
				// convert cmyk to rvb  
				color.space = RGB;  
				rgbValues = color.colorValue;  
				// revert to cmyk  
				color.space = CMYK;  
				color.colorValue = t;  
				break;  
			case RGB:  
				rgbValues = color.colorValue;  
				break;  
			case LAB:  
				// todo!  
				break;  
			default:  
				;  
			}  
	
		if( false !== rgbValues )  
			colors.unshift( {name:color.name, png: pngSwatch(rgbValues)} );  
		}  
	
	var myWindow = new Window ("dialog", "Convert image to gray with background color");
	myWindow.preferredSize.width = 350;
		var myInputGroup0 = myWindow.add ("group");
			myInputGroup0.alignment = "left";
			myInputGroup0.add ("statictext", undefined, "Background color:");
			var ddl = myInputGroup0.add ("dropdownlist");
			n = colors.length;  
			for( i=0 ; i < n ; ++i )  
				(ddl.add('item', "\xa0"+colors[i].name)).image = colors[i].png;  
			ddl.selection = 0;
		var myInputGroup1 = myWindow.add ("group");
			myInputGroup1.alignment = "left";
			myInputGroup1.add ("statictext", undefined, "Image opacity (1-100):");
			var myOpacity = myInputGroup1.add ("edittext", undefined, "30");
				myOpacity.characters = 3;
				myOpacity.active = false;
		var myButtonGroup = myWindow.add ("group");
			myButtonGroup.alignment = "right";
			myButtonGroup.add ("button", undefined, "OK");
			myButtonGroup.add ("button", undefined, "Cancel");
	if (myWindow.show () == 1) {
		return [myOpacity.text, ddl.selection];
	}
	else {
		return false;
	}
}

