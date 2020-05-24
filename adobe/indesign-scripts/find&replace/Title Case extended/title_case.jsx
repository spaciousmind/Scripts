// Description: Title case
// Peter Kahrel www.kahrel.plus.com
// An old script, tarted up in 2012 and in 2015

/*__________________________________________________________________________________

The script converts text to title case.
Words in the text file 'title_case_exceptions.txt' (which must be in the script folder) are ignored.

Five modes:

1. Insertion point in italic text: process just the italic text of the current paragraph.
2. Insertion point selected, not in italic text: try to find text in quotes in the current paragraph and process that.
3. Insertion point selected, not in italic text and not in quotes: do the ins. point's parent paragraph.
4. Selection is not an insertion point but some selected text: process whatever is selected.
5. Text frame selected: process the frame's parent story.
6. Nothing selected: marked paragraph styles are title-cased.
____________________________________________________________________________________*/


title_case ('title_case_exceptions.txt');

function title_case (exceptions) {
	// Get the exceptions from the text file
	var ignore = find_exceptions (exceptions);
	
	if (app.selection.length == 0) {
		titeCaseParagraphStyles (ignore);
		exit();
	}
	
	if (app.selection[0] instanceof TextFrame) {
		process_story (app.selection[0].parentStory, ignore);
		return;
	}

	// If the selection is an insertion point and the ins. point is italic, then do whatever is in italics
	if (app.selection[0].constructor.name == 'InsertionPoint') {
		if (app.selection[0].fontStyle == 'Italic') {
			var sel = get_italic_text (app.selection[0].paragraphs[0]);
		} else {
			// If the ins. point is embraced by quotes, return that,
			// otherwise return the whole paragraph
			var sel = get_quote (app.selection[0].paragraphs[0]);
			if (sel == null) {
				sel = app.selection[0].paragraphs[0];
			}
		}
	} else {
		// else do whatever is selected
		var sel = app.selection[0];
	}
	
	if (sel != null) {
		sel.contents = apply_title_case (sel, ignore);
	}
}


// END ----------------------------------------------------------

function get_italic_text (par) {
	var first, last;
	first = last = app.selection[0].insertionPoints[0].index - par.insertionPoints[0].index;
	var ip = par.insertionPoints.everyItem().getElements();
	while (ip[first].fontStyle == 'Italic') first--;
	while (ip[last].fontStyle == 'Italic') last++;
	return par.characters.itemByRange (first, last-2);
}


function get_quote (par) {
	// Try to match text in double quotes
	var s = par.contents;
	if (s.indexOf('\u201C') > -1 && s.indexOf('\u201D') > -1) {
		return get_quote_sub (par, SpecialCharacters.DOUBLE_LEFT_QUOTE, SpecialCharacters.DOUBLE_RIGHT_QUOTE);
	}

	if (s.indexOf('\u2018') > -1 && s.indexOf('\u2019') > -1) {
		return get_quote_sub (par, SpecialCharacters.SINGLE_LEFT_QUOTE, SpecialCharacters.SINGLE_RIGHT_QUOTE);
	}

	// No quotation marks, exit
	return null;
}


function get_quote_sub (par, first_char, last_char) {
	var first, last;
	first = last = app.selection[0].insertionPoints[0].index - par.insertionPoints[0].index;
	var ch = par.characters.everyItem().getElements();
	while (ch[first].contents != first_char) first--;
	while (ch[last].contents != last_char) last++;
	return par.characters.itemByRange (first+1, last-1);
}


function process_story (story, ignore) {
	app.findGrepPreferences = null;
	app.findGrepPreferences.fontStyle = 'Italic';
	var found = story.findGrep();
	for (var i = 0; i < found.length; i++) {
		found[i].contents = apply_title_case (found[i], ignore);
	}
}


function apply_title_case (sel, ignore) {
	// Content returned by .itemsByRange() is an array.
	// Content of a selection or of found array items are strings
	if (sel.contents instanceof Array) {
		sel = sel.contents[0];
	} else {
		sel = sel.contents;
	}
		
	// Insert spaces after non-breaking spaces, quotes, forced line breaks, and opening parentheses.
	// If we don't, we won't be able to see the first letter of the word following them
	var temp = sel.replace (/([\u00A0\u2018\u201C\u000A\r(])/g, ' $1 ');
	
	// Split selection into array of words
	var temp_array = temp.split (' ');
	
	// Upper-case all words in the array, skipping words filtered by 'keep_low'
	for( var i = 0; i < temp_array.length; i++ ) {
		if (!keep_low (temp_array[i], ignore)) {
			temp_array[i] = init_upper (temp_array[i]);
		}
	}
	
	// String the array elements together into a sentence
	temp = temp_array.join (' ');
	
	// Remove the spaces we inserted as the first step
	temp = temp.replace (/ ([\r\u00A0\u2018\u201C\u000A(]) /g, '$1');
	
	// Capitalise any letter following a colon+space or a period+space
	temp = temp.replace (/([-:.] ?)(\w)/g, 
		function () {
			return (arguments[1]) + (arguments[2]).toUpperCase()
		});
	
	return temp;
}


// Init-cap a single word
function init_upper (s) {
	try {
		return s[0].toUpperCase() + s.slice(1);
	} catch (_) {
		return s;
	}
}


// Check if a word should be ignored
function keep_low (w, ignore) {
	try {
		return ignore.indexOf ('|'+w+'|') >-1
	} catch (_) {
		return false;
	}
}


function find_exceptions (s) {
	var f = File (script_dir () + '/' + s);
	if (f.exists) {
		f.open ('r');
		var temp = f.read ();
		f.close ();
		return '|' + temp.replace (/[\n\r]/g, '|') + '|';
	} 
	alert ('Cannot find ' + s + ' in the script folder.', 'Error', true)
	exit();
}


function script_dir () {
	try {
		return File (app.activeScript).path;
	} catch (e) {
		return File (e.fileName).path;
	}
}


function titeCaseParagraphStyles (ignore) {
	var pstyles = app.documents[0].allParagraphStyles;
	
	function tcase (list) {
		for (var i = list.length-1; i >= 0; i--) {
			list[i].contents = apply_title_case (list[i], ignore);
		}
	}

	app.findGrepPreferences = null;
	for (var i = pstyles.length-1; i > 0; i--) {
		if (pstyles[i].extractLabel ('title case') !== '') {
			app.findGrepPreferences.appliedParagraphStyle = pstyles[i];
			tcase (app.documents[0].findGrep())
		}
	}
}