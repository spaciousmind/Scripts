﻿#targetengine "reportColors"var main = function() {	var sma = app.scriptMenuActions.item("Report Colors");	if ( !sma.isValid ) {		app.scriptMenuActions.add("Report Colors");		var myEventListener = sma.eventListeners.add(			"onInvoke",			function(){				var doc = app.properties.activeDocument,				fo = Folder.selectDialog ("Please select a folder where to save the file 2"),				sws, n, data = [], f;								if ( !fo) return;								f = File ( fo+"/colours.txt" );				!doc && doc = app;				sws = doc.swatches.everyItem().getElements();				n = sws.length; 				while ( n-- ) {					data.push ( sws[n].colorvalue );				}								if ( data.length ) {					f.open('w');					f.write ( data.join("\r" ) );					f.close();				}							alert( data.length? "Report done !" : "No swatches could be reported" );			}		);	}		var spfm = app.menus.item("$ID/SwatchesPanelPopup");	var mySampleScriptMenu = spfm.menuItems.item( "Report Colors" );	!mySampleScriptMenu.isValid && spfm.menuItems.add ( sma );}main();