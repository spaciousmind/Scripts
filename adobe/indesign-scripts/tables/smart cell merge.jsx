/***********************************************************************/
/*                                                                     */
/*      SmartCellMerge ::  Merge selected cells by rows or by columns  */
/*                                                                     */
/*      [Ver: 1.0]    [Author: Marc Autret]      [Modif: 04/16/12]     */
/*      [Lang: EN]    [Req: InDesign CS4/CS5+]   [Creat: 04/09/12]     */
/*                                                                     */
/*      Installation:                                                  */
/*                                                                     */
/*      1) Place the current file into Scripts/Scripts Panel/          */
/*                                                                     */
/*      2) Start InDesign, open a document                             */
/*                                                                     */
/*      3a) To open the script preferences dialog                      */
/*          make sure no cell is selected                              */
/*                                                                     */
/*      3b) To perform a 'smart merge',                                */
/*          select the cells you want to operate                       */
/*                                                                     */
/*      4) Exec script from Window > Automatisation > Scripts          */
/*         (double-click on the script name)                           */
/*                                                                     */
/*      Bugs & Feedback : marc{at}indiscripts{dot}com                  */
/*                        www.indiscripts.com                          */
/*                                                                     */
/***********************************************************************/

var SCRIPT_NAME = 'SmartCellMerge',
	SCRIPT_VERSION = '1.0',
	DEF_SEPARATOR = '\t',
	C_PRIVATE = '\uE000';

var getPrefs = function()
//--------------------------------------
{
	var s = app.extractLabel(SCRIPT_NAME);
	return s ?
		(new Function('return '+s))() :
		{ separator: DEF_SEPARATOR, mergeDirection:0 };
};

var savePrefs = function(/*obj*/pfs)
//--------------------------------------
{
	app.insertLabel(SCRIPT_NAME,'{'+
		'separator:'+pfs.separator.toSource()+','+
		'mergeDirection:'+pfs.mergeDirection+
		'}');
};

var setPrefs = function()
//--------------------------------------
{
	var	PNG_TAB = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\xD1\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\x9A\x9C\x18\x00\x00\x00\x04gAMA\x00\x00\xD8\xEB\xF5\x1C\x14\xAA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\x80\x83\x00\x00\xF4%\x00\x00\x84\xD1\x00\x00m_\x00\x00\xE8l\x00\x00<\x8B\x00\x00\x1BX\x83\xE7\x07x\x00\x00\x00\xFEIDATx\xDAb\xFC\xFF\xFF?\x039\x00 \x80\x18\xC9\xD5\b\x10@dk\x04\b \xB25\x02\x04\x10\x8AF\x19IIFK\xD6\x93\xFF`\xFC\xE3\xBF\xCDY\x81\x14\x88\xFF\x1F\x8A\x19\x9E<\x7F\x0E\x96\x03\b &t\x93@\x8A\x81\x98\x13\xCA\x05id\x06Y\x80\xAE\x0E \x80\xD052B\xC5X\xA1|\x0E f\xC1f\x01@\x00\xA1\x0B\xFC\x87:\r\x88\xFF\xBF\x87\xCA3a\xB3\x11 \x80\xB0\xF9\xF15\x90\xC9\x0F\xB5\th\xD2\xDFK'~[\x99\x03\x99\xBF@\x06\xC2\xFC\b\x10@\x18N\xF8\xCD\xF0\xDE\x1C\xA6\t\x04\xDE\xFC\xDB\x95\x88\xE4\\\u00B8\xCD\x00\x01\x84\xE1\xC73\xBF=\x9E<\xFE;S\t\xC4\xB9\xFB\xB7\xD9\xF8\xCE\xDF\x86\x97P?\xA3h\x04\b \f\xA7B\x15qA1\x0B\xD8\x11\f\f\xDF\x80\xF8;\x88\rt*X\x03@\x00\xB1`\x89\xDB\xBFP\xFF0B\xE5\xFF@5\xFFEV\x04\x10@,8B\xF5'T!\x13\x94\xFF\x07)!\x80\x01@\x80\x01\x00\xB4\xDDY\x882\x03C\xDF\x00\x00\x00\x00IEND\xAEB`\x82",
		PNG_EOP = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\xD1\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\x9A\x9C\x18\x00\x00\x00\x04gAMA\x00\x00\xD8\xEB\xF5\x1C\x14\xAA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\x80\x83\x00\x00\xF4%\x00\x00\x84\xD1\x00\x00m_\x00\x00\xE8l\x00\x00<\x8B\x00\x00\x1BX\x83\xE7\x07x\x00\x00\x012IDATx\xDAb\xFC\xFF\xFF?\x039\x00 \x80\x98\x18\xC8\x04\x00\x01\xC4\x02c022\n\x00)[\x1D\x1D\x1Dc\x10\x9F\x93\x93S\x12Y\xE1\xB3\xC7\x8F3\x81\x14\xD8yO\x9E?\xFF\x0F\x10@,Hr\xB6\xCE\xCE\xCE:\x8A\x8A\x8A\x1F\xE6\xCE\x9D\xFB\x15\xE8\x05Ii\t\x89|\x90\xC4\xD3\x17/&\x02\xD9\xCC@\xE6?(f\x00\b \xB0Se$%\x19\x81\x94\xF1\xBF\x7F\xFF\x9E\xED\xDD\xBB\xF7\x0B\x90-\x045\x8C\x03\x88\xD9\xA0lV\xA8z\x90Z\x06\x80\x00\x82\xD9\b\xE6\x1C8p\x00\xE4\x14a\xA0mBHa\xF0\x1FI\r\x13\xCCF\x80\x00bB\xF2\xE3\x05\xA8&Q \xCD\x8Dl \x1A\x00\x8B\x01\x04\x10\\#;\x1B\xDB1\xA0\xE6G@\xFC\x1D\x88\xDF#)\xFC\x07\xA5Q\xE2\r \x80\xE0\x81#,(\bR\xBC\x03\x88\xF7\x82\xFC\x05\f\x90ft\xC5\xC8\x00 \x80X\x90L\x03\x99\xFC\x07\xCD\x89\xFFpi\x06\b &X\xBC i\xFC\x05\xC4?\xA1\xF2\x7Fqi\x04\b \xB8\x1F\x914\x83\x14\xFF&d#@\x001bK\xAB\xC0x\x05E6\f#\x03\x90\xA1\x7F\x81\x96\xFC\x05\b \x16\x1C~\x87\xD9\x8E\x1E\x1Dp\x17\x00\x04\x18\x00\xE0\xC3_\x9D\x10\x1E\xA9;\x00\x00\x00\x00IEND\xAEB`\x82",
		PNG_FLB = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0E\x00\x00\x00\x0E\b\x06\x00\x00\x00\x1FH-\xD1\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\x9A\x9C\x18\x00\x00\x00\x04gAMA\x00\x00\xB1\x8E|\xFBQ\x93\x00\x00\x00 cHRM\x00\x00z%\x00\x00\x80\x83\x00\x00\xF9\xFF\x00\x00\x80\xE9\x00\x00u0\x00\x00\xEA`\x00\x00:\x98\x00\x00\x17o\x92_\xC5F\x00\x00\x01 IDATx\xDAb\xFC\xFF\xFF?\x039\x00 \x80\x98\x18\xC8\x04\x00\x01D\xB6F\x80\x00\xC2\xAA\xD1\xD7\xE8\x12\x17!\x8D\x00\x01\xC4\b\xF3\xA3\x8C\xA4$\x986\x90\xD8\xA2\xC2\xC8\xC8z\xFB\xC7\x9FG\xBC\xD7_\xA7~\x05\x89\x19J\xEE\xFCw\xFE\xB9;3\x90\tV\xFC\xE4\xF9\xF3\xFF\x00\x01\xC4\x82l\nL\xD3\x9F\x7F\x1F\xD5\x81\x9A~\xA2\xB9\b\xA4\xF6\x1F\x14\xFF\x07\b d\x8D\x8C M`\x15L\xFC7\x81\xB6\xA0\xBB\x8E\x1D\x88\x7F\x03\xF1\x1F\x90f\x80\x00B\xB1\xF1\xD7\xDF\x97\x9Al\xCC\xE2\xD7?\xFC8bz\xFF}\xF3\x03\xA8\"d\x1B\xFF\xC28\x00\x01\x84\xEC\x14\xC6\xAB\xAF\xE2\x1E|\xFCq\xCCD\x80\xC3\xE6\xB4$o\xAC\fP\x8C\r\xAA\x81\x19\xAA\x06\x1E\xE9\x00\x01\x84\xAC\x11$\xF8\xEF\xDE\xFB\xC6\xDB\xAF\xBFm\xD2y\xFDu\xCB3\x90#\x80\x18\xE4\xD7\x1FP\xFC\x07\xEAG\x06\x80\x00B\x0EUF\xA8A\xACP[\x98\xA0N\x83)\xFE\x0F\xA3A\xA1\n\x10@,\xE86Bm\x01)fD\x0EE\xF4\x90\x02\b \x164>L\xC1_\xA8F\x9C\t\x19 \x80\x18\xC9M\xE4\x00\x01\x06\x00\x99\xFEiX\x98C]\x8B\x00\x00\x00\x00IEND\xAEB`\x82";

	var displaySeparator = function(/*str*/s)
		{
		return s.
			replace(/\t/g,'{TAB}').
			replace(/[\n\r]/g,'{EOP}').
			replace(/\x0A/g,'{FLB}');
		};

	var cleanSeparator = function(/*str*/s)
		{
		return s.
			replace(/\{TAB\}/g,'\t').
			replace(/\{EOP\}/g,'\r').
			replace(/\{FLB\}/g,'\x0A');
		};

	var u,
		o = getPrefs(),
		w = new Window('dialog', ' ' + [SCRIPT_NAME, SCRIPT_VERSION, '\xA9 Indiscripts.com'].join('  |  ')),
		// ---
		pDir = w.add('panel', u, "Direction"),
		rHoriz = pDir.add('radiobutton', u, "Horizontally  [merge columns in each row]"),
		rVert = pDir.add('radiobutton', u, "Vertically  [merge rows in each column]"),
		// ---
		pSep = w.add('panel', u, "Separator"),
		sSep = pSep.add('statictext', u, "Use the following charater(s) as separator:"),
		gSep = pSep.add('group'),
		eSep = gSep.add('edittext', u, ""),
		iTab = gSep.add('iconbutton', u, PNG_TAB, {code:'TAB'}),
		iEop = gSep.add('iconbutton', u, PNG_EOP, {code:'EOP'}),
		iFlb = gSep.add('iconbutton', u, PNG_FLB, {code:'FLB'}),
		// ---
		gValid = w.add('group'),
		bOK = gValid.add('button', u, "Save settings"),
		bCancel = gValid.add('button', u, "Cancel");
	
	w.orientation = 'column';
	w.alignChildren = ['fill','top'];
	w.defaultElement = bOK;
	w.cancelElement = bCancel;
	
	pDir.margins = [15,20,15,15];
	pDir.orientation = 'column';
	pDir.alignChildren = ['left', 'top'];
	rHoriz.value = !(o.mergeDirection),
	rVert.value = !!(o.mergeDirection);
	
	pSep.margins = [15,20,15,15];
	pSep.orientation = 'column';
	pSep.alignChildren = ['left', 'top'];
	// ---
	gSep.orientation = 'row';
	gSep.alignChildren = ['left', 'center'];
	gSep.spacing = 2;
	// ---
	eSep.characters = 20;
	iTab.size = iEop.size = iFlb.size = [18,18];
	iTab.helpTip = "Tabulation";
	iEop.helpTip = "End of Paragraph";
	iFlb.helpTip = "Forced Line Break";
	eSep.text = displaySeparator(o.separator);
	eSep.active = true;

	gSep.addEventListener('click', function(ev)
		{
			var t = ev.target.properties;
			if( (!t) || !(t.hasOwnProperty('code')) ) return;
			eSep.textselection = '{'+t.code+'}';
		});
	
	gValid.alignment = ['right', 'bottom'];
	
	if( 1==w.show() )
		{
			o.mergeDirection = +rVert.value;
			o.separator = cleanSeparator(eSep.text);
			savePrefs(o);
		}
};

var headerBodyRow = function(/*Cell*/c)
//--------------------------------------
{
	var	refCells = c.parent.cells,
		cs = c.cells,
		c0 = cs[0].name.split(':'),
		c1 = cs[-1].name.split(':'),
		i0 = +c0[0],
		i1 = +c1[0],
		j0 = +c0[1],
		// ---
		rows = c.rows,
		r = rows.length-1,
		j = r,
		rt = rows[j].rowType,
		a = [], z = 0, t;
	
	while( j-- )
		{
		if( rt != (t=rows[j].rowType) )
			{
			a[z++] = refCells.itemByRange( i0 + ':' + (1+j+j0), i1 + ':' + (r+j0));
			rt = t;
			r = j;
			}
		}
	a[z++] = refCells.itemByRange( i0 + ':' + (1+j+j0), i1 + ':' + (r+j0));
	
	return a;
};

var mergeCell = function(/*Cell*/c, /*0|1*/dir, /*str*/sep)
//--------------------------------------
// dir==0 => merge horizontally (i.e. merge cols in each row)
// dir==1 => merge vertically (i.e. merge rows in each col)
{
	var RC = ('\r').charCodeAt(0),
		// ---
		refCells = c.parent.cells,
		cs = c.cells,
		c0 = cs[0].name.split(':'),
		c1 = cs[-1].name.split(':'),
		// ---
		kMin = c0[1-dir],
		kMax = c1[1-dir],
		// ---
		r0, r1, k, t, s, p;
	
	if( c1[dir] <= c0[dir] ){ return 0; }

	for( k=kMax ; k >= kMin ; k-- )
		{
		c0[1-dir] = c1[1-dir] = k;
		(t = c0.concat())[dir]++;

		r0 = c0.join(':');
		r1 = c1.join(':');

		// Insert C_PRIVATE at the beginning of every cell which is a successor
		// ---
		refCells.itemByRange(t.join(':'),r1).
			texts.everyItem().insertionPoints[0].contents = C_PRIVATE;
		
		// Merge the targeted cells (row or column, depending on dir)
		// ---
		refCells.itemByRange(r0,r1).merge();
		
		// Resolve the resulting cell (from refCells)
		// ---
		t = refCells.itemByName(r0).getElements()[0];

		// Replace \r + C_PRIVATE by sep
		// ---
		s = t.texts[0].contents;
		while( -1 != p=s.lastIndexOf(C_PRIVATE) )
			{
			if( p && RC==s.charCodeAt(p-1) )
				{
				p--;
				t.texts[0].characters.itemByRange(p, 1+p).contents = sep;
				}
			else
				{
				t.texts[0].characters[p].contents = '';
				}
			s = s.substr(0,p);
			}
		}
	return 1+kMax-kMin;
};

var main = function()
{
	var sel = app.documents.length && app.selection,
		t = sel && 1==sel.length && sel[0],
		o, dir, rows, cols, a;
	
	if( t && (t instanceof Cell) )
		{
		o = getPrefs();
		rows = 1 < t.rowSpan;
		cols = 1 < t.columnSpan;
		dir = +(!!(( rows && cols ) ? o.mergeDirection : rows));
		app.scriptPreferences.enableRedraw = false;

		a = (1==dir && RowTypes.MIXED_STATE == t.rowType) ?
			headerBodyRow(t) :
			[t];
		while( t=a.shift() ){ mergeCell(t.getElements()[0], dir, ''+o.separator); }

		app.scriptPreferences.enableRedraw = true;
		}
	else
		{
		setPrefs();
		}
};

app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, SCRIPT_NAME);