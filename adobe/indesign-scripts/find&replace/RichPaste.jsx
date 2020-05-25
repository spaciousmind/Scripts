/***********************************************************************/
/*                                                                     */
/*    RichPaste ::  Paste contents into the current font with          */
/*                  respect to minimal formatting (italic, bold...)    */
/*                                                                     */
/*  [Ver: 1.7]       [Author: Marc Autret]           [Modif: 04/06/16] */
/*  [Lang: EN|FR|DE] [Req: InDesign CS4/CS5/CS6/CC]  [Creat: 10/03/12] */
/*                                                                     */
/*    Installation:                                                    */
/*                                                                     */
/*    1) Place the current file into your Scripts/Scripts Panel/       */
/*       folder                                                        */
/*                                                                     */
/*    2) Run InDesign, open a target document                          */
/*                                                                     */
/*    3) Copy (Cmd-C) a formatted text from any application            */
/*                                                                     */
/*    4) Place the text cursor at the target location                  */
/*                                                                     */
/*    5) Exec the script from Window > Automation > Scripts            */
/*                         or Window > Utilities > Scripts             */
/*                       (double-click on the script name)             */
/*                                                                     */
/*    Bugs & Feedback : marc{at}indiscripts{dot}com                    */
/*                      www.indiscripts.com                            */
/*                                                                     */
/***********************************************************************/

$.hasOwnProperty('RichPaste')||(function(H/*OST*/,S/*ELF*/,I/*NNER*/)
{
	H[S]=S;

	I.S_UID = "975d6c2823be0da45113ad8d43e03b6e", // md5('RichPaste')

	I.O_SETTINGS = {
		SCRIPT_NAME:	"RichPaste",
		SCRIPT_VERSION:	"1.7",
		// ---
		scriptURI:		'',			// Full path in URI notation -- managed by F_STARTUP_MANAGER
		startURI:		'',			// Full path in URI notation -- managed by F_STARTUP_MANAGER
		startVersion:	0,			// Installed version of the startup script -- zero by default
		// ---
		underline:		0,  		// Preserve (1) or ignore (0) underlines
		footnote:		1,  		// [reserved]
		italic:			1,  		// Preserve (1) or ignore (0) italic
		bold:			1, 			// Preserve (1) or ignore (0) bold
		symbol:			1,  		// Preserve the Symbol font
		extraFont1:		'',		 	// Preserve an opt. font #1 (custom)
		extraFont2:		'',		 	// Preserve an opt. font #2 (custom)
		// ---
		subScript:		1,			// [reserved] [ADD160111]
		supScript:		1,			// [reserved] [ADD160111]
		// ---
		hidePrefs:		0,			// Hide the preference dialog in paste context
		tryPaste:		1,			// Try to paste (managed from the menus)
	};

	I.C_FOOTNOTE = '\x04';

	I.FD_APP = 'macintosh' == File.fs.toLowerCase() ? Folder.appPackage.parent : Folder.appPackage;
	I.FD_APP_SCRIPTS = Folder( I.FD_APP.absoluteURI + '/Scripts' );
	I.FD_USER_SCRIPTS = app.scriptPreferences.scriptsFolder.parent;

	//==========================================================================
	// LABEL & SETTINGS UTILITIES
	//==========================================================================

	I.F_FROM_LABEL = function(/*DOM*/o,/*str*/s,/*any*/EMPTY_RET)
	//----------------------------------
	{
		s = o.extractLabel(s);
		return s ? (Function('return ' + s))() : EMPTY_RET;
	};

	I.F_TO_LABEL = function(/*DOM*/o,/*str*/s,/*obj*/x)
	//----------------------------------
	{
		o.insertLabel( s, x=x.toSource() );
		return x;
	};

	I.F_GET_CURRENT_SETTINGS = function(  oDef,r,k)
	//----------------------------------------------------------
	{
		oDef = I.O_SETTINGS;
		r = I.F_FROM_LABEL(app,I.S_UID,{});
		
		for( k in oDef )
		{
			if( !oDef.hasOwnProperty(k) ) continue;
			'undefined'==typeof r[k] && (r[k]=oDef[k]);
		}
		
		return r;
	};

	I.F_SAVE_SETTINGS = function(/*obj*/o)
	//----------------------------------------------------------
	{
		return I.F_TO_LABEL(app,I.S_UID,o);
	};

	//==========================================================================
	// ROUTINES
	//==========================================================================

	I.F_REFRESH_FOOTNOTES = function(/*Document*/doc,  fno,t0,s0,t1,s1)
	//----------------------------------------------------------
	{
		fno = doc.footnoteOptions;
		t0 = +fno.markerPositioning;
		s0 = fno.footnoteTextStyle;
		t1 = +FootnoteMarkerPositioning.SUPERSCRIPT_MARKER;
		s1 = doc.paragraphStyles.firstItem();
			
		if( t1===t0 ) t1 = +FootnoteMarkerPositioning.SUBSCRIPT_MARKER;
		
		fno.markerPositioning = t1;
		fno.footnoteTextStyle = s1;
		doc.recompose();
		fno.markerPositioning = t0;
		fno.footnoteTextStyle = s0;
		doc.recompose();
	};

	(I.F_SCAN_STYLE_RANGES = function F(/*TextStyleRanges*/tsRanges,/*obj*/oKeeps,  reNotPrintable,reBefTab,IB_MASK,IB_HIDE,FN_CHAR,undl,foot,itlc,bold,symb,ext1,ext2,subs,sups,a,n,i,o,t,f,fs,ff,sz,flags,curFlags,r,z)
	//----------------------------------------------------------
	// => [ initCharIndex, size, flags ][]
	{
		reNotPrintable = F.Q.reNotPrintableRange;
		reBefTab = F.Q.reBeforeTab;
		IB_MASK = F.Q.italBoldMask;
		IB_HIDE = 0xFFFF ^ IB_MASK;
		FN_CHAR = I.C_FOOTNOTE;

		undl = +(!!oKeeps.underline);
		foot = +(!!oKeeps.footnote);
		itlc = +(!!oKeeps.italic);
		bold = +(!!oKeeps.bold);
		symb = +(!!oKeeps.symbol);
		ext1 = +(!!oKeeps.extraFont1);
		ext2 = +(!!oKeeps.extraFont2);
		// --- [ADD160111]
		sups = +(!!oKeeps.supScript);
		subs = +(!!oKeeps.subScript);
		const P_SUP = sups && +Position.SUPERSCRIPT;
		const P_OSUP = sups && +Position.OT_SUPERSCRIPT;
		const P_SUB = subs && +Position.SUBSCRIPT;
		const P_OSUB = subs && +Position.OT_SUBSCRIPT;

	
		a = tsRanges.everyItem().getElements();
		n = a.length >>> 0;
	
		for( r=[], z=i=0, curFlags=-1 ; i < n ; ++i )
		{
			o = a[i].texts[0];
			sz = o.length;                                                      // character count
			t = o.contents;
	
			f = o.appliedFont.properties;
			ff = (f.fontFamily||'');
			fs = ((f=f.name)||'').toLowerCase().replace(reBefTab,'');
	
			flags = (
				( undl &&  1*o.underline ) |                                           // Underline
				( foot &&  2*(0 <= t.indexOf(FN_CHAR)) ) |                             // The range contains *at least* a FN
				( itlc &&  4*(0 <= fs.indexOf('ital') || 0 <= fs.indexOf('obliq')) ) | // Italic range [ADD160111] 'obliq'
				( bold &&  8*(0 <= fs.indexOf('bold')) )                               // Bold range
				);
	
			(IB_MASK&flags) && reNotPrintable.test(t) && (flags&=IB_HIDE);
	
			symb && (flags |= 16*("Symbol"==ff));
			ext1 && ((16&flags) || (flags |= 32*(oKeeps.extraFont1==ff||oKeeps.extraFont1==f)));
			ext2 && ((48&flags) || (flags |= 64*(oKeeps.extraFont2==ff||oKeeps.extraFont2==f)));
			
			// [ADD160111]
			// ---
			while( sups||subs )
			{
				if( t = o.baselineShift )
				{
					t > .1 && sups && (flags |= 256);
					t < -.1 && subs && (flags |= 512);
					break;
				}
				
				t = +o.position;
				
				if( sups && (t == P_SUP || t== P_OSUP) )
				{
					flags |= 256;
					break;
				}

				if( subs && (t == P_SUB || t== P_OSUB) )
				{
					flags |= 512;
				}

				break;
			}
	
			if( flags===curFlags )
			{
				r[z-1][1] += sz;
				continue;
			}

			r[z] = [o.insertionPoints[0].index, sz, flags];
			++z;
			curFlags = flags;
		}
	
		return r;

	}).Q = {
		reNotPrintableRange: /^\s+$/,
		reBeforeTab:         /^[^\t]+\t/,
		italBoldMask:        4|8,
	};

	(I.F_GET_CLIPBOARD_STYLE_RANGES = function F(/*obj*/oKeeps,  doc,t,n,r)
	//----------------------------------------------------------
	// => [ initCharIndex, size, flags ][]  +  .totalSize
	{
		doc = app.documents.add(true/*visible*/, F.Q.DOC_PARAMS);
		t = doc.textFrames.add(F.Q.FRAME_PARAMS);
	
		app.select(t.texts[0].insertionPoints[0]);
		app.paste();
		
		n = (t=t.parentStory).texts[0].length;
		r = I.F_SCAN_STYLE_RANGES(t.textStyleRanges,oKeeps);
		r.totalSize = n;

		doc.close(SaveOptions.NO);
		
		return r;
	}).Q = {
		DOC_PARAMS:
		{
			documentPreferences:
			{
				pageWidth: '500pt',
				pageHeight: '500pt',
			},
			textPreferences:
			{
				typographersQuotes: false,
				deleteEmptyPages: false,
				smartTextReflow: false,
			},
			zeroPoint:[0,0],
		},
		FRAME_PARAMS:
		{
			geometricBounds:[0,0,'500pt','500pt'],
		},
	};

	(I.SCAN_SELFONT_FORMATTINGS = function F(/*Text*/tx,  CYCLE,FT_INSTALLED,ip,c,actions,ft,a,i,r)
	//----------------------------------------------------------
	// => {story: <parentStory>, index: <ip index>,
	//     0: <normalFontName>, 1:<italFontName>,
	//     2: <boldFontName>, 3:<boldItalFontName> }
	{
		CYCLE = F.Q.cycle;
		FT_INSTALLED = F.Q.ftInstalled;

		r = {
			story: tx.parentStory.getElements()[0],
			index: tx.insertionPoints[0].index,
		};

		ip = tx.insertionPoints[-1];
		c = tx.length ? tx.characters[0] : ip;
		app.select(c);
		
		actions = app.menuActions;
		
		if( 0<=c.appliedFont.properties.fontStyleName.toLowerCase().indexOf('ital') )
			actions.itemByName("$ID/Apply italic").invoke();

		if( 0<=c.appliedFont.properties.fontStyleName.toLowerCase().indexOf('bold') )
			actions.itemByName("$ID/Apply bold").invoke();
	
		for( i=0 ; i < CYCLE.length ; ++i )
		{
			a = CYCLE[i].split('>');
			actions.itemByName("$ID/Apply "+a[0]).invoke();
			if( FT_INSTALLED != +(ft=c.appliedFont.properties).status ) break;
			r[a[1]] = ft.name;
		}
	
		i = i==CYCLE.length;
	
		app.select(r.story.insertionPoints.itemByRange(r.index,ip.index));
		
		a.length=0;
		return  i && r;

	}).Q = {
		cycle:       ['italic>1'/*ital*/, 'bold>3'/*boldital*/, 'italic>2'/*bold*/, 'bold>0'/*normal*/],
		ftInstalled: +FontStatus.installed,
	};

	I.F_APPLY_STYLE_RANGES = function(/*obj*/o,/*arr*/a,/*obj*/oKeeps,  chars,ip0,t,flags,subOp,supOp,p,s,i)
	//----------------------------------------------------------
	// o :: { story, index, 0..3 }
	// a :: [ initCharIndex, size, flags ][]
	{
		chars = o.story.characters;
		ip0 = o.index;
		i = a.length;
		
		subOp = supOp = false; // [ADD160111]

		while( i-- )
		{
			t = a[i];
			flags = t[2];
			p = ip0+t[0];
	
			t = chars.itemByRange(p, p+t[1]-1).texts[0];
	
			// Underline flag.
			// ---
			if( 1&flags )
			{
				t.underline = true;
			}
	
			// Font.
			// ---
			if( 112&flags )
			{
				t.appliedFont = (
					((16&flags) && 'Symbol\tRegular') ||
					((32&flags) && oKeeps.extraFont1) ||
					((64&flags) && oKeeps.extraFont2)
					);
			}
			else
			{
				t.appliedFont = o[3&(flags>>2)];
			}

			// Super/Sub script
			// ---
			if( 256&flags )
			{
				if( false===supOp )
				{
					supOp = t.getElements()[0].appliedFont.checkOpenTypeFeature(OpenTypeFeature.SUPERSCRIPT_FEATURE);
					supOp = +Position[supOp ? 'OT_SUPERSCRIPT' : 'SUPERSCRIPT'];
				}
				t.position = supOp;
			}

			if( 512&flags )
			{
				if( false===subOp )
				{
					subOp = t.getElements()[0].appliedFont.checkOpenTypeFeature(OpenTypeFeature.SUBSCRIPT_FEATURE);
					subOp = +Position[subOp ? 'OT_SUBSCRIPT' : 'SUBSCRIPT'];
				}
				t.position = subOp;
			}

			// Range containing footnote(s).
			// ---
			if( 2&flags )
			{
				s = t.contents;
				
				// [FIX160111] t.contents may be an Array!
				// ---
				('Array'==s.__class__) && (s=s.join(''));

				p = 0;
				while( ~(p=s.indexOf(I.C_FOOTNOTE,p)) )
				{
					t.characters[p].appliedFont = o[0];
					++p;
				}
			}
		}
	};

	//==========================================================================
	// USER INTERFACE
	//==========================================================================

	I.F_USER_INTERFACE = function(/*LocaleIndex*/LL,  ss,s,dlg,col,o,r)
	//----------------------------------------------------------
	{
		ss = I.F_GET_CURRENT_SETTINGS();
		
		s = localize("\xA0%1 Preferences (v%2)  |  \xA9indiscripts.com", ss.SCRIPT_NAME, ss.SCRIPT_VERSION);

		dlg = app.dialogs.add({name:s, canCancel:true});
		col = dlg.dialogColumns.add().borderPanels.add().dialogColumns.add();
		
		o = {
			italic: col.dialogRows.add().dialogColumns.add().
				checkboxControls.add({
				staticLabel: ["Preserve italic","Pr\xE9server l'italique","Schriftschnitt \"Italic\" beibehalten"][LL],
				checkedState: 1==ss.italic,
				}),
			bold: col.dialogRows.add().dialogColumns.add().
				checkboxControls.add({
				staticLabel: ["Preserve bold","Pr\xE9server le gras","Schriftschnitt \"Bold\" beibehalten"][LL],
				checkedState: 1==ss.bold,
				}),
			underline: col.dialogRows.add().dialogColumns.add().
				checkboxControls.add({
				staticLabel: ["Preserve underline","Pr\xE9server le soulignement","\"Unterstreichung\" beibehalten"][LL],
				checkedState: 1==ss.underline,
				}),
			symbol: col.dialogRows.add().dialogColumns.add().
				checkboxControls.add({
				staticLabel: ["Preserve the \"Symbol\" font","Pr\xE9server la police \"Symbol\"","\"Symbol\"-Schrift beibehalten"][LL],
				checkedState: 1==ss.symbol,
				}),
			_0: col.dialogRows.add().dialogColumns.add().
				staticTexts.add({
				staticLabel: " ",
				}),
			_1: col.dialogRows.add().dialogColumns.add().
				staticTexts.add({
				staticLabel: [
					"Also preserve the following fonts:",
					"Conserver \xE9galement les polices suivantes\xA0:",
					"Ebenso die folgenden Schriften beibehalten:"
					][LL],
				}),
			extraFont1: col.dialogRows.add().dialogColumns.add().
				staticTexts.add({
				staticLabel: ["Extra Font #1:","Police #1 :","Zus\xE4tzliche Schrift 1:"][LL],
				minWidth: 100,
				}).parent.parent.dialogColumns.add().
				textEditboxes.add({
				editContents: ss.extraFont1.replace('\t','-'),
				minWidth: 150,
				}),
			extraFont2: col.dialogRows.add().dialogColumns.add().
				staticTexts.add({
				staticLabel: ["Extra Font #2:","Police #2 :","Zus\xE4tzliche Schrift 2:"][LL],
				minWidth: 100,
				}).parent.parent.dialogColumns.add().
				textEditboxes.add({
				editContents: ss.extraFont2.replace('\t','-'),
				minWidth: 150,
				}),
			_2: col.dialogRows.add().dialogColumns.add().
				staticTexts.add({
				staticLabel: " ",
				}),
			hidePrefs: col.dialogRows.add().dialogColumns.add().
				checkboxControls.add({
				staticLabel: [
					"Do not show this dialog before pasting",
					"Ne pas afficher cette fen\xEAtre avant de coller",
					"Vor dem Einf\xFCgen diesen Dialog nicht anzeigen"
					][LL],
				checkedState: 1==ss.hidePrefs,
				}),
		};

		if( r=dlg.show() )
		{
			ss.italic = +o.italic.checkedState;
			ss.bold = +o.bold.checkedState;
			ss.underline = +o.underline.checkedState;
			ss.symbol = +o.symbol.checkedState;

			ss.extraFont1 = (o.extraFont1.editContents||'').replace('-','\t');
			ss.extraFont2 = (o.extraFont2.editContents||'').replace('-','\t');

			ss.hidePrefs = +o.hidePrefs.checkedState;
			
			I.F_SAVE_SETTINGS(ss);
		}

		//dlg.destroy(); // MAY CRASH CS4
		
		return r && ss;
	};

	//==========================================================================
	// STARTUP MANAGEMENT
	//==========================================================================

	I.JX_STARTUP_NAME = 'RichPasteStartup.jsx';
	I.JX_STARTUP_VERSION = 4;
	I.JX_STARTUP_SCRIPT = "// RichPaste Menu v.4\neval('@JSXBIN@ES@2.0@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');";


	I.F_REMOVE_LISTENERS = function(  ms,acIds,m,ids,a,mi,ac,el,t,i,smas)
	//----------------------------------
	// [ADD160108] This step is required to prevent event listeners
	// from being unexpectedly triggered while the script is updating.
	{
		ms = [
			// Edition submenu
			app.menus.itemByName('$ID/Main').submenus.itemByName('$ID/&Edit'),
			// Contextual menu
			app.menus.itemByName('$ID/RtMouseText')
		];

		acIds = [];

		while( m=ms.pop() )
		{
			if( !m.isValid ) continue;
			t = m.menuItems.everyItem();
			ids = t.id;
			a = t.associatedMenuAction;
			i = a.length;
			while( i-- )
			{
				ac = a[i];
				if( !ac || !ac.isValid ) continue;
				t = ac.label;
				if( 'runRP'!=t && 'prfRP'!=t ) continue;
				
				// ---
				// Here we have a menuItem whose action must be
				// removed as well as all listeners.
				// ---
				acIds.push(ac.id); // to be removed later
				
				// Destroy the menuitem listeners and the menuItem itself.
				// ---
				mi = m.menuItems.itemByID(ids[i]);
				if( !mi.isValid ) continue;
				mi.eventListeners.everyItem().remove();
				mi.remove();
			}
			
			// ---
			// Does the menu have a beforeDisplay event listener
			// that regards RichPaste and needs to be removed too?
			// ( concerns RP version < 1.5 )
			// ---
			
			t = m.eventListeners.everyItem();
			ids = t.id;
			a = t.handler;
			i = a.length;

			while( i-- )
			{
				t = a[i];
				if( !(t instanceof File) ) continue;
				t = t.name.toLowerCase();
				if( -1==t.indexOf('richpaste') ) continue;
				
				el = m.eventListeners.itemByID(ids[i]);
				if( !el.isValid ) continue;
				el.remove();
			}
		}

		t = acIds.length;
		smas = app.scriptMenuActions;
		while( t-- )
		{
			ac = smas.itemByID(acIds[t]);
			if( !ac.isValid ) continue;

			ac.eventListeners.everyItem().remove();
			ac.remove();
		}
	};

	I.F_WRITE_FILE = function(/*File|str*/fx,/*str*/s)
	//----------------------------------
	{
		fx = new File(''+fx);
		fx.encoding = 'BINARY';
		if( !fx.open('w') ) return false;

		// UTF8 Signature
		// ---
		fx.write("\xEF\xBB\xBF");
		
		// Write contents
		// ---
		fx.encoding = 'UTF-8';
		fx.writeln(s);
		
		fx.close();
		return fx;
	};

	I.F_GET_STARTUP_FILE = function F(/*0|1*/forceCreate,/*str*/fileName,/*str*/jsxBin,/*LocaleIndex*/LL,  fdApp,fdUser,fdHere,ffApp,ffUser,ff,s,w)
	//----------------------------------
	// FileName must be the name of the startup script, eg 'myStartup.jsx'.
	// jsxBin must contain the jsxbin string of the startup script.
	// [CHG160108] [FIX160406]
	{
		F.JUST_CREATED = 0; // [ADD150623] Used by I.F_STARTUP_MANAGER()

		// Target the 'startup scripts' folders
		// ---
		fdUser = Folder(I.FD_USER_SCRIPTS.absoluteURI + '/startup%20scripts');
		fdApp = Folder(I.FD_APP_SCRIPTS.absoluteURI + '/startup%20scripts');
		ff = false;
	
		// Check for folder availability
		// ---
		fdHere = fdUser.exists && (fdUser instanceof Folder);
		if( (!fdHere) && !fdUser.create() ) fdUser=false;

		fdHere = fdApp.exists && (fdApp instanceof Folder);
		if( (!fdHere) && !fdApp.create() ) fdApp=false;
		
		if( (!fdUser) && (!fdApp) )
		{
			throw "Unable to target any \"startup scripts\" folder.";
		}

		ffUser = fdUser && File(fdUser.absoluteURI + '/' + fileName);
		ffApp = fdApp && File(fdApp.absoluteURI + '/' + fileName);

		// [FIX160406]
		// Old code :: ff = ( ffUser && ffUser.exists ) ? ffUser : ffApp;
		// ---
		if( ffUser )
		{
			// Prefer ffUser if fdUser is available.
			// ---
			if( ffApp && ffApp.exists ){ ffApp.remove() }
			ff = ffUser;
		}
		else
		{
			// Only if fdUser is not available.
			// ---
			ff = ffApp;
		}

		if( !ff.exists ) forceCreate = -1; // The file does not exist yet

		// Create the file (if necessary.)
		// [CHG160108]
		// ---
		while( forceCreate )
		{
			// If the startup file needs to be rewritten
			// remove all event listeners first.
			// ---
			if(0 < forceCreate)
			{
				w = new Window('palette','RichPasteTmp',void 0,{borderless:true});
				w.add('statictext',void 0,[
					"Updating the script... (This may take a few seconds.)",
					"Mise \xE0 jour du script... (L'op\xE9ration peut prendre quelques secondes.)",
					"Aktualisierung des Skripts... (Dies kann einige Sekunden dauern.)"
					][LL]);
				w.margins = 50;
				w.center();
				w.show();
				w.update();
				I.F_REMOVE_LISTENERS();
				w.hide();
			}

			// Kill any existing startup file (if possible.)
			// ---
			if( ffApp && ffApp.exists ){ ffApp.remove() }
			if( ffUser && ffUser.exists ){ ffUser.remove() }

			// Write the new startup file.
			// ---
			(ff=I.F_WRITE_FILE(ff,jsxBin)) && (F.JUST_CREATED=1);
			
			if( !F.JUST_CREATED || 1 != forceCreate ) break;
			
			// [ADD160107] Prompt update.
			// ---
			s = I.O_SETTINGS;
			s = s.SCRIPT_NAME + ' ' + s.SCRIPT_VERSION;
			alert( [
				s + " has been properly updated.",
				s + " a \xE9t\xE9 correctement mis \xE0 jour.",
				s + " wurde aktualisiert."
				][LL] );
			break;
		}

		return ff;
	};

	I.F_STARTUP_MANAGER = function(/*str*/thisFileName,/*LocaleIndex*/LL,  ss,ff)
	//----------------------------------
	{
		ss = I.F_GET_CURRENT_SETTINGS();

		// Set/reset the scriptURI
		// ---
		ss.scriptURI = File(thisFileName).absoluteURI;

		ff = I.F_GET_STARTUP_FILE(
			/*forceCreate?*/+(ss.startVersion < I.JX_STARTUP_VERSION),
			I.JX_STARTUP_NAME,
			I.JX_STARTUP_SCRIPT,
			LL // [ADD160107]
			);

		if( !ff ) return ss; // cannot create the menus

		ss.startURI = ff.absoluteURI;
		
		if( I.F_GET_STARTUP_FILE.JUST_CREATED )
		{
			ss.startVersion = I.JX_STARTUP_VERSION;
			ss.hidePrefs = 0;
		}

		ss.SCRIPT_VERSION = I.O_SETTINGS.SCRIPT_VERSION;
		I.F_SAVE_SETTINGS(ss);

		if( I.F_GET_STARTUP_FILE.JUST_CREATED )
		{
			$.global.evt = 0;
			// $.evalFile(ff);
			app.doScript(ff, ScriptLanguage.javascript, undefined, UndoModes.AUTO_UNDO, I.O_SETTINGS.SCRIPT_NAME + 'Startup' );
		}

		return ss;
	};

	//==========================================================================
	// PASTE
	//==========================================================================

	I.F_PASTE = function(/*LocaleIndex*/LL,/*obj*/ss,  doc,sel,destParams,bkp,ranges)
	//----------------------------------------------------------
	{
		// Get the active doc.
		// ---
		doc = app.properties.activeDocument;
		if( !doc )
		{
			alert( [
				"No document available.",
				"Aucun document n'est disponible.",
				"Es ist keine InDesign-Datei verf\xFCgbar."
				][LL] );
			return;
		}
		
		// Get the selection.
		// ---
		sel = app.properties.selection;
		if( (!sel) || !sel.length || !('appliedFont' in (sel=sel[0])) )
		{
			alert( [
				"Put the cursor at the destination location. (You can also select a text range.)",
				"Placez le curseur \xE0 l'emplacement d\xE9sir\xE9. (Vous pouvez \xE9galement s\xE9lectionner du texte.)",
				"W\xE4hlen Sie als Ziel mit dem Textwerkzeug eine Einf\xFCgemarke oder beliebigen Text aus."
				][LL]
				);
			return;
		}
	
		// => {story, index, 0..3 }
		// ---
		destParams = I.SCAN_SELFONT_FORMATTINGS(sel);
		if( !destParams )
		{
			alert([
				"Unable to find italic and/or bold variants.",
				"Les variantes italiques et/ou gras n'ont pas pu \xEAtre identifi\xE9es.",
				"Die Schriftschnitte \"Italic\" und/oder \"Bold\" konnten in der Zielschrift nicht gefunden werden."
				][LL]
				);
			return;
		}
	
		// Scan the clipboard.
		// ---
		bkp = app.clipboardPreferences.preferStyledTextWhenPasting;
		if( !bkp ) app.clipboardPreferences.preferStyledTextWhenPasting = true;
		ranges = I.F_GET_CLIPBOARD_STYLE_RANGES(ss);
		if( !bkp ) app.clipboardPreferences.preferStyledTextWhenPasting = bkp;

		// Paste without formatting.
		// [FIX] pasteWithoutFmt may add space characters, we need to avoid that.
		// ---
		bkp = app.textEditingPreferences.smartCutAndPaste;
		if( bkp ) app.textEditingPreferences.smartCutAndPaste = false;
		app.pasteWithoutFormatting();
		if( bkp ) app.textEditingPreferences.smartCutAndPaste = bkp;
		
		// Force footnotes refresh.
		// ---
		I.F_REFRESH_FOOTNOTES(doc);

		// Apply the flags to the ranges.
		// ---
		I.F_APPLY_STYLE_RANGES(destParams, ranges, ss);
	};

	//==========================================================================
	// API
	//==========================================================================

	S.run = function(/*str*/thisFileName,  ss,L,LL)
	//----------------------------------------------------------
	{
		L = +app.locale;
		LL = 1*(L==+Locale.FRENCH_LOCALE)||2*(L==+Locale.GERMAN_LOCALE);

		ss = I.F_STARTUP_MANAGER(thisFileName,LL); // [ADD160107] LL passed in.
		if( ss && !(ss.hidePrefs&&ss.tryPaste) ){ ss=I.F_USER_INTERFACE(LL) }
		if( ss && ss.tryPaste ){ I.F_PASTE(LL,ss) }
	};


})($, {toString:function(){return 'RichPaste'}}, {});

app.scriptPreferences.enableRedraw = false;
app.doScript('$.RichPaste.run($.fileName)', ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, 'Rich Paste');
app.scriptPreferences.enableRedraw = true;
