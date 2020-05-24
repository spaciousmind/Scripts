//// LatteUI.jsx - John Peterson// (c) 2005-2007 Adobe Systems Inc.  All Rights Reserved//// This file has tools to translate Eve dialog descriptions generated by// the Latte application into ScriptUI resources.///*@@@BUILDINFO@@@ LatteUI.jsx 1.0.0.1*/// Debug string class optionally displays results as they're added.function DbgString(){	this.data = "";	this.debug = true;}DbgString.prototype.toString = function () { return this.data; }DbgString.prototype.add = function ( str ){	if (this.debug)		$.write(str);	this.data += str.replace(/\n/g, " ");}function tabs(num){	s = "";	for (i = 0; i < num; ++i)		s += "\t";	return s;}// Given an Eve dialog description in the string "src", return// a ScriptUI resource description string.function translateLatte(src, srcFilePath, debug_mode){	// Build translation tables xxx['Latte'] = "ScriptUI";	var nouns = new Array();	nouns['dialog']			= "dialog";	nouns['palette']			= "palette";	nouns['group']			= "Group";	nouns['frame']			= "Panel";	nouns['cluster']		= "Panel";		nouns['edit_text']		= "EditText";	nouns['static_text']	= "StaticText";	nouns['button']			= "Button";	nouns['checkbox']		= "Checkbox";	nouns['popup_menu']		= "DropDownList";	nouns['popup']			= "DropDownList";	nouns['picture_button']	= "IconButton";	nouns['image']			= "Image";	nouns['user_item']		= "Group";	nouns['listbox']		= "ListBox";	nouns['progress_bar']		= "Progressbar";	nouns['picture']			= "Image";	nouns['slider']			= "Slider";	nouns['radio']			= "RadioButton";	var aligns = new Array();	aligns['align_top']		= 'top';	aligns['align_bottom']	= 'bottom';	aligns['align_fill']	= 'fill';	aligns['align_left']	= 'left';	aligns['align_right']	= 'right';	aligns['place_row']		= 'row';	aligns['place_column']	= 'column';		var margindex = new Array();	margindex['top'] 		= 1;	margindex['left']		= 0;	margindex['right']		= 2;	margindex['bottom']		= 3;	var props = new Array();	props['child_horizontal']	= 'alignChildren';	props['child_vertical']		= 'alignChildren';	props['placement']			= 'orientation';	props['horizontal']			= 'alignment';	props['vertical']			= 'alignment';	props['multiline']			= 'properties: { multiline';	props['name']				= 'text';	// These are handled as special cases	props['view_id']			= 'view_id';	props['width']				= 'width';	props['height']				= 'height';	props['margin_top']			= 'margins';	props['margin_left']		= 'margins';	props['margin_right']		= 'margins';	props['margin_bottom']		= 'margins';	props['resource_id']		= 'image';	// OK, sometimes there are things script UI has that Latte can't	// express, like "creation properties".  We use the item_id field	// to specify these, because item_id is available in all Latte controls	// and it's not used by ScriptUI.	props['item_id']			= 'CR_PROP_HACK';	props['text_trim']			= 'TT_PROP_HACK';	var srcnoun, noun, params, term, rest, stmt;	var view_id = 0;	var level = 0;		var resultString = new DbgString();	resultString.debug = debug_mode;	while (src)	{		// Pull off 'noun(params)' and either the ';' or the '{' following		// Known evil bug:  If the parameter contains quoted parenthesis, the match fails.		// e.g.: "text: 'this is (a problem)'"   <--- Parens in quotes		// RE below from Mihai Nita fixes the above limitation, but runs too slow//		stmt = src.match(/\s*(\w+)\s*\(((?:(?:\w+\s*:\s*\S+)|(?:\w+\s*:\s*'[^']+')|,|\s*)+)\)\s*([;{])\s*([\s\S]*)/);		stmt = src.match(/\s*(\w*)\(([^)]*)\)\s*([;{])\s*([\s\S]*)/)		if (stmt)		{			srcnoun = stmt[1];					// class (edit_text, group, etc.)			params = stmt[2].split(/,\s*/);		// Make a list of "xyz: abc" properties			term = stmt[3];						// "{" or ";"			rest = stmt[4];						// The rest of the Eve text after stmt						noun = nouns[srcnoun];			if (! noun)			{				alert("Unknown noun: " + srcnoun, "Conversion", true);				return null;			}						// Parse the parameter list			var	i, j, outputParams = "";			var sizeParam = false, width = 20, height = 20;	// Default sizes			var marginVals = [0, 0, 0, 0];				// left, top, right, bottom			var marginParam = false;			var alignmentParam = false;			var alignmentVals = ['',''];			var mval;			viewname = "view" + view_id++;			for (i in params)			{				// p[0]=name,p[1]=value//				var p = params[i].split(/\s*:\s*/);		// Uh, sorry, no. Param might have a ':' in it!				var colonpos = params[i].search(/\s*:\s*/);				var colonsize= params[i].match(/\s*:\s*/)[0].length;				var p = [params[i].slice(0,colonpos), params[i].slice(colonpos+colonsize)];								if (props[p[0]])				{					var left, right, quotes;										left = props[p[0]];					if (aligns[p[1]])						right = aligns[p[1]];					else						right = p[1];											// Handle special cases					switch (left)					{					case 'CR_PROP_HACK':									left = 'properties';									// Extract the properties from the surrouncing single quotes									right = p[1].match(/'([^']*)'/)[1];									// We can't put the "ok" in "name:ok" in single quotes, otherwise Latte									// gags on it.  So we look for "name" as a special case, and re-wrap it.  Ugh.									var nameArg = right.match(/name\s*:\s*(\S*)/);									if (nameArg)										right = "name: '" + nameArg[1] + "'";									right = '{' + right + '}';									break;														case 'TT_PROP_HACK':									left = 'properties';									// Extract the properties from the surrouncing single quotes									right = p[1].match(/'([^']*)'/)[1];									// We can't put the "ok" in "truncate:middle" in single quotes, otherwise Latte									// gags on it.  So we look for "truncate" as a special case, and re-wrap it.  Ugh.									var nameArg = right.match(/truncate\s*:\s*(\S*)/);									if (nameArg)										right = "truncate: '" + nameArg[1] + "'";									right = '{' + right + '}';									break;					case 'view_id':	viewname = p[1].match(/'(\w*)'/)[1];									break;														case 'width':	width = p[1].match(/\D*(\d*)/)[1];									sizeParam = true;																		break;										case 'alignment':									alignmentParam = true;									if (p[0] == 'horizontal')										alignmentVals[0] = right;									if (p[0] == 'vertical')										alignmentVals[1] = right;									break;											case 'height':	height = p[1].match(/\D*(\d*)/)[1];	// add default width									sizeParam = true;									break;														case 'image':	if (noun == "Image")									{										right = p[1].match(/\s*'([^']+)'/)[1];										if ((right[0] != '/') && srcFilePath)											right = srcFilePath + '/' + right;									}									else										continue;	// Ignored for menus, etc.									break;														case 'margins':	// Convert margin_top/left/etc into an index into marginVals									marginVals[margindex[p[0].slice(7)]] = eval(p[1].match(/\D*(\d*)/)[1]);									marginParam = true;									break;															// Multiline needs a "properties: { ... }" wrapper					case 'properties: { multiline':										right = p[1].match(/.*(true|false)/)[1] + " }";									break;					}											// Only add quotes if it's not a number, a size, true|false, 					// has properties { .. }, or already has a quote					if (right.match(/^\[.*/) 						|| right.match(/^\d+$/)						|| right.match(/^'[^']*'/)						|| right.match(/^true|^false/)						|| left.match(/^properties.*/))						quotes = ""					else						quotes = "'"											// Only add to output if not a special case					if (! p[0].match(/^view_id|^width|^height|^horizontal|^vertical|^margin_\w+/))					{						if (outputParams.length > 0)							outputParams += ", ";						outputParams += left + ": " + quotes + right + quotes;					}				}			}						if ((sizeParam || marginParam || alignmentParam) && (outputParams.length > 0))				outputParams += ", ";			// If we have a size, output it here (we've captured height & width by now)			if (sizeParam)				outputParams += "size: [" + width.toString() + ", " + height.toString() + "]";						if (marginParam)				outputParams += "margins: [" + marginVals[0] + ", " + marginVals[1] + ", " + marginVals[2] + ", " + marginVals[3] + "]";							// Collect horizontal / vertical into an array pair if both are provided.			if (alignmentParam)			{				if (alignmentVals[0] == '')					outputParams += "alignment:'" + alignmentVals[1] + "'";				else				if (alignmentVals[1] == '')					outputParams += "alignment:'" + alignmentVals[0] + "'";				else					outputParams += "alignment:['" +alignmentVals[0] + "','" + alignmentVals[1] + "']";			}											var isGroup = (srcnoun == 'group' 						  || srcnoun = 'cluster' 						  || srcnoun == 'frame' 						  || srcnoun == 'palette'						  || srcnoun == 'dialog');						// Treat empty groups like other (non-group) nouns			if (isGroup && term == ';')				isGroup = false;						resultString.add(tabs(level));			if ((noun != "dialog") && (noun != "palette"))				resultString.add( viewname + ": " );			resultString.add(noun);						if (isGroup)			{				resultString.add("\n" + tabs(level) + "{\n");				level++;				if (outputParams.length > 0)				{					resultString.add(tabs(level) + outputParams)				}			}			else			{				resultString.add("{ " + outputParams + " }")			}						if (outputParams.length > 0)			{				if (rest[0] != '}')					resultString.add(",");				resultString.add("\n");			}						while ((rest[0] == "}") && (level > 0))			{				level--;				resultString.add( tabs(level) + "}" );				// If we hit the closing "}", grab everything after it.				if (rest[0] == "}")					rest = rest.match(/\s*\}\s*([\s\S]*)/)[1];								if ((rest[0] != "}") && (level > 0))					resultString.add(",");				resultString.add("\n");			}		} // if (stmt)				//		if (level < 0)//			alert("Too many close braces?","",true);		if (! stmt)			{			if (level > 0)				while(--level)					resultString.add(tabs(level) +"}\n");			resultString.add("}\n");	// level 0			src = null;		}		else			src = rest;	}	// while		return resultString.toString();}// Traverse the window structure to find a named control.// WARNING: Controls better not have names that collide with other// JavaScript object parameters.  F'rinstance, a name like "length"// would be Really Bad.  Maybe you want to stick underscores or something// similarly ugly on your view names?  You have been warned.function findControlRoutine( root, name ){	var i, c;		if (root.type == 'ListItem')		return null;			if (root[name])		return root[name];	else		if (root.children)			for (i = 0; i < root.children.length; i++)			{				c = findControlRoutine( root.children[i], name );				if (c)					return c;			}			return null;}function findControlMethod( name ){	return findControlRoutine( this, name );}/*// Why isn't this part of the JS Array class?function remove(key){	var i;	for (i in this)		if (this[i] == key)			this.splice(i,1);}*/function latteUI(filename, debug_mode){	var res;	// Check to see if a latte description was passed in instead of just a filename	if ((filename.match(/^palette\s*[(]|^dialog\s*[(]/)) && (!filename.match(/.+[.]exv$/)))		res = translateLatte(filename, null, debug_mode);	else	{		var f = new File(filename);		f.open('r');		res = translateLatte(f.read(), f.path, debug_mode);		f.close();		Folder.current = g_StackScriptFolderPath; // Work around bug 2505978	}	if (! res)	{		alert("Unable to read or process latte file");		return null;	}	var w = new Window(res);	// match our dialog background color to the host application	w.findControl = findControlMethod;	return w;}// Should really be a const, need to figure out how to make it a library	var kCanceled = 2;//-----------------------------------------------------