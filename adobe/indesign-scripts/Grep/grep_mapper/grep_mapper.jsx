//DESCRIPTION: Enter Unicode ranges in the active document
// Peter Kahrel 2009, 2013 --- www.kahrel.plus.com

#target indesign;
#targetengine grep_mapper;

// Only CS4 and later
if (parseInt (app.version) > 5){
	unicode_ranges();
	var w = create_window();
	w.show();
}


// Show a panel with GREP classes -----------------------------------------------------------------

function create_window ()
	{
	var w = new Window ("palette", 'GREP mapper');
	w.alignChildren = "right";
	w.grep_object = create_object ();
	w.tree = w.add ("treeview"); w.tree.preferredSize = [200, 200];

	var wc = w.tree.add ("node", "Standard wildcards");
	var posix = w.tree.add ("node", "POSIX");
	var uni = w.tree.add ("node", "Unicode properties");
	
	wc.add ("item", "Word character");
	wc.add ("item", "Lower-case letter");
	wc.add ("item", "Upper-case letter");
	wc.add ("item", "Digit");
	wc.add ("item", "White space");

	posix.add ("item", "alnum");
	posix.add ("item", "alpha");
	posix.add ("item", "blank");
	posix.add ("item", "digit");
	posix.add ("item", "graph");
	posix.add ("item", "lower");
	posix.add ("item", "print");
	posix.add ("item", "punct");
	posix.add ("item", "space");
	posix.add ("item", "upper");
	posix.add ("item", "word");
	posix.add ("item", "xdigit");

	var uni_letter = uni.add ("node", "Letter");
		uni_letter.add ("item", "Lowercase letter");
		uni_letter.add ("item", "Uppercase letter");
		uni_letter.add ("item", "Titlecase letter");
		uni_letter.add ("item", "Modifier letter");
		uni_letter.add ("item", "Other letter");
	var uni_mark = uni.add ("node", "Mark");
		uni_mark.add ("item", "Non-spacing mark");
		uni_mark.add ("item", "Spacing combining mark");
		uni_mark.add ("item", "Enclosing mark");
	var uni_sep = uni.add ("node", "Separator");
		uni_sep.add ("item", "Space separator");
		uni_sep.add ("item", "Line separator");
		uni_sep.add ("item", "Paragraph separator");
	var uni_symbol = uni.add ("node", "Symbol");
		uni_symbol.add ("item", "Math symbol");
		uni_symbol.add ("item", "Currency symbol");
		uni_symbol.add ("item", "Modifier symbol");
		uni_symbol.add ("item", "Other symbol");
	var uni_number = uni.add ("node", "Number");
		uni_number.add ("item", "Decimal digit number");
		uni_number.add ("item", "Letter number");
		uni_number.add ("item", "Other number");
	var uni_punct = uni.add ("node", "Punctuation");
		uni_punct.add ("item", "Dash punctuation");
		uni_punct.add ("item", "Open punctuation");
		uni_punct.add ("item", "Close punctuation");
		uni_punct.add ("item", "Initial punctuation");
		uni_punct.add ("item", "Final punctuation");
		uni_punct.add ("item", "Connector punctuation");
		uni_punct.add ("item", "Other punctuation");

	
	w.tree.onChange = function(){
		w.text = w.grep_object[w.tree.selection.text];
	}

	w.tree.onDoubleClick = function(){
		if (w.tree.selection.parent.constructor.name != 'TreeView'){
			app.documents[0].paragraphStyles[1].nestedGrepStyles[0].grepExpression = "^[[:xdigit:]]+\\t"+w.grep_object[w.tree.selection.text];
		}
	} 

	return w;
} // create_window


function create_object (){
	return {
		"Word character": "\\w",
		"Lower-case letter": "\\l",
		"Upper-case letter": "\\u",
		"Digit": "\\d",
		"White space": "\\s",

		"alnum": "[[:alnum:]]",
		"alpha": "[[:alpha:]]",
		"blank": "[[:blank:]]",
		"digit": "[[:digit:]]",
		"graph": "[[:graph:]]",
		"lower": "[[:lower:]]",
		"print": "[[:print:]]",
		"punct": "[[:punct:]]",
		"space": "[[:space:]]",
		"upper": "[[:upper:]]",
		"word": "[[:word:]]",
		"xdigit": "[[:xdigit:]]",

		"Letter": "\\p{Letter}",
			"Lowercase letter": "\\p{Lowercase_letter}",
			"Uppercase letter": "\\p{Uppercase_letter}",
			"Titlecase letter": "\\p{Titlecase_letter}",
			"Modifier letter": "\\p{Modifier_letter}",
			"Other letter": "\\p{Letter_other}",
		"Mark": "\\p{Mark}",
			"Non-spacing mark": "\\p{Non_spacing_mark}",
			"Spacing combining mark": "\\p{Spacing_combining_mark}",
			"Enclosing mark": "\\p{Enclosing_mark}",
		"Separator": "\\p{Separator}",
			"Space separator": "\\p{Space_separator}",
			"Line separator": "\\p{Line_separator}",
			"Paragraph separator": "\\p{Paragraph_separator}",
		"Symbol": "\\p{Symbol}",
			"Math symbol": "\\p{Math_symbol}",
			"Currency symbol": "\\p{Currency_symbol}",
			"Modifier symbol": "\\p{Modifier_symbol}",
			"Other symbol": "\\p{Other_symbol}",
		"Number": "\\p{Number}",
			"Decimal digit number": "\\p{Decimal_digit_number}",
			"Letter number": "\\p{Letter_number}",
			"Other number": "\\p{Other_number}",
		"Punctuation": "\\p{Punctuation}",
			"Dash punctuation": "\\p{Dash_punctuation}",
			"Open punctuation": "\\p{Open_punctuation}",
			"Close punctuation": "\\p{Close_punctuation}",
			"Initial punctuation": "\\p{Initial_punctuation}",
			"Final punctuation": "\\p{Final_punctuation}",
			"Connector punctuation": "\\p{Connector_punctuation}",
			"Other punctuation": "\\p{Other_punctuation}",
		}
	} // create_object


// Open the idml/inx file and enter the selected  range(s) -------------------------------------------------------

function unicode_ranges()
	{
	if (app.documents.length > 0 && app.documents[0].extractLabel ('grep_mapper') != ""){
		return;
	}
	var data = find_data ('grep_mapper.txt');
	var selected = select_ranges (data.ranges);
	open_template (data.template)
	print_range (selected);
	app.activeWindow.activePage = app.activeDocument.pages[0];
	app.activeWindow.screenMode = ScreenModeOptions.previewToPage;
	app.activeWindow.zoom (ZoomOptions.fitSpread);
	app.activeDocument.textFrames[0].select();
	}

function print_range (array){ // two-dim array, ranges, headings
	var mess = message_window (30);
	mess.show();
	var to_print = [];
	var start, stop, j;
	for (var i = 0; i < array[0].length; i++){
		to_print.push (array[1][i]);
		start = array[0][i].split ('-')[0];
		stop = array[0][i].split ('-')[1];
		for (j = start; j <= stop; j++){
			mess.txt.text = start + '-' + stop;
			hexformat = pad(j.toString(16));
			to_print.push (hexformat + '\t' + getChar('0x'+hexformat));
		}
		to_print.push ("");  // This adds an empty line later on
	}
	mess.txt.text = 'Writing...';
	app.documents[0].pages[0].textFrames[0].parentStory.contents = to_print.join ('\r');
	// Remove spurious returns after \n and \r
	if (array[1][0] == 'Latin') del_returns();
	if (app.documents[0].pages[0].textFrames[0].overflows){
		add_pages (app.documents[0], mess);
	}
	try{mess.close()} catch(_){}
} // print_range


function getChar (hex){
	// Hex values come in in the form of 0x0000
	if (hex.length == 6){ // plane 0
		return String.fromCharCode (hex);
	}
	// Else plane 1+ (algorithm adapted from http://www.russellcottrell.com/greek/utilities/SurrogatePairCalculator.htm)
	var high = Math.floor ((hex - 0x10000) / 0x400) + 0xD800;
    var low = ((hex - 0x10000) % 0x400) + 0xDC00;
    return String.fromCharCode (high) + String.fromCharCode (low)
} // getChar


function pad (s){
	if (s.length == 5) {
		return s.toUpperCase();
	}
	return ('0000'+s).slice(-4).toUpperCase()
}

// Remove empty lines at 00D0 and 00A0 (\r and \n)
function del_returns(){
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.findWhat = "(?<=(000D|000A)\\t[\\n\\r])\\r";
	app.changeGrepPreferences.changeTo = "";
	app.activeDocument.changeGrep();
}

function select_ranges (array){
	var labels_and_headings = get_labels (array);
	var labels = labels_and_headings[0];
	var headings = labels_and_headings[1];
	var w = new Window ('dialog', 'Unicode ranges');
        w.alignChildren = ['right', 'bottom'];
        var ranges = w.add ('listbox', undefined, labels, {multiselect: true});
            ranges.maximumSize.height = 400;
        var buttons = w.add ('group');
            buttons.orientation = 'row';
            buttons.add ('button', undefined, 'OK', {name: 'ok'});
            buttons.add ('button', undefined, 'Cancel', {name:'cancel'});
	if (w.show () == 1){
		return get_selected (ranges, headings);
	}
	exit();
}


function get_labels (array){
	var labels = [];
	var headings = [];
	var temp;
	for (var i = 0; i < array.length; i++){
		temp = array[i].split (' /');
		labels.push (temp[0]);
		headings.push (temp[1]);
	}
	return [labels, headings];
}


function get_selected (listbox, heading_array){
	var ranges = [];
	var headings = [];
	for (var i = 0; i < listbox.items.length; i++){
		if (listbox.items[i].selected){
			ranges.push (listbox.items[i].text.match (/\((0x[^\)]+)/)[1]);
			headings.push (heading_array[i])
		}
	}
	return [ranges, headings]
}


function find_data (f){
	var dir = script_dir () + '/';
	// check that the template is in the script directory
	var template = "grep_mapper.idml";
	if (!File (dir + template).exists){
		errorExit ("Cannot find the template " + template + "\rin the script folder.");
	}
	// now check that the ranges test file is in the script directory,
	// read it, and return array
	var range_file = File (dir+f);
	// Try and find the file with ranges
	if (!range_file.exists){
		errorExit ("Cannot find " + f + " in the script folder.");
	}
	range_file.open ("r");
	var file_contents = range_file.read ();
	range_file.close ();
	// split the file's contents into an array
	file_contents = file_contents.split (/[\r\n]/);
	return {template: dir+template, ranges: file_contents}
}


function open_template (s)
	{
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
	app.open (File (s));
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	app.documents[0].textPreferences.typographersQuotes = false;
	return app.documents[0]
	}


function add_pages (doc, mess)
	{
	mess.txt.text = 'Adding pages...';
	var m = app.activeDocument.pages[0].marginPreferences;
	var gb = [m.top, m.left, 
		doc.documentPreferences.pageHeight - m.bottom, 
		doc.documentPreferences.pageWidth - m.right];
	var col = doc.pages[0].textFrames[0].textFramePreferences.textColumnCount;
	doc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
	var n = 1;
	while (doc.pages[-1].textFrames[0].overflows)
		{
		mess.txt.text = 'Adding pages...' + String(n++);
		doc.pages.add ().textFrames.add ({geometricBounds: gb, textFramePreferences: {textColumnCount: col}});
		doc.pages[-1].textFrames[0].previousTextFrame = 
			doc.pages[-2].textFrames[0]
		}
	}


function script_dir ()
	{
	try {return File (app.activeScript).path}
	catch (e) {return File (e.fileName).path}
	}


function message_window (le){
	var dlg = new Window ('palette');
	//dlg.alignChildren = ['left', 'top'];
	dlg.txt = dlg.add ('statictext', undefined, "");
	dlg.txt.characters = le;
	return dlg;
}


function errorExit (m){
	alert (m, "Error", true);
	exit()
}
