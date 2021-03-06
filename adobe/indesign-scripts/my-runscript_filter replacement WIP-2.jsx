// DESCRIPTION: Launch a script by typing its name or picking it from a recent-history list
// Peter Kahrel -- www.kahrel.plus.com
$.writeln("--------------------------------------------");
(function () {

	var runscript = {};
	runscript.script_dir = "/e/Projects/Scripts/adobe/indesign-scripts";
	runscript.history = get_history();
	runscript.history.recentScripts = removeDeletedItems (runscript.history.recentScripts);

	//---------------------------------------------------------
	// Get the directory that the script is run from

	function scriptPath() {
		try {
			return app.activeScript;
		} catch(e) {
			return File(e.fileName);
		}
	}

	//----------------------------------------------------------
	// Get all scripts -- .js, .jsx, .jsxbin

	function get_scripts (dir, list, level) {
		var f = dir.getFiles ('*.*');
		for (var i = 0; i < f.length; i++) {
			if (f[i] instanceof Folder && !/^\./.test(f[i].name)) {
				get_scripts (f[i], list, level+1);
			} else if (/\.jsx?(bin)?/.test(f[i])) {
				//$.bp(f[i].name === 'index_show.jsx')
				//prefix = level > 1 ? f[i].parent.name.replace(/^.+\//,'/') : '';
				prefix = level > 1 ? f[i].parent.name + '/' : '';
				list.push (decodeURI (prefix + f[i].name));
			}
		}
		return list;
	}

	//----------------------------------------------------------
	// Read the settings file

	function get_history () {
		var f = File(runscript.script_dir+'/runscript.txt');
		if (f.exists) {
			return $.evalFile (f);
		} else {
			return {
				lastScript: '',
				filter: true,
				applyFilterOnNextRun: false,
				filter_check: false,
				recentScripts: []
			}
		}
	}

	//-----------------------------------------------------------
	// Write the settings file

	function store_history (obj) {
		var f = File(runscript.script_dir+'/runscript.txt');
		obj.recentScripts = insert_item (obj.lastScript, runscript.history.recentScripts);
		f.open ('w');
		f.write (obj.toSource());
		f.close ();
	}

	//-------------------------------------------------------
	// Update the recent-scripts list

	function insert_item (new_item, list) {
		// If we ran the first script again, nothing to do
		if (list[0] === new_item) {
			return list;
		}
		var new_list = [new_item];
		var n = list.length < 15 ? list.length : 15;
		for (var i = 0; i < n; i++) {
			if (list[i] !== new_item) {
				new_list.push (list[i]);
			}
		}
		return new_list;
	}

	//---------------------------------------------------------------------------
	// Filter deleted scripts from the recentScripts list

	function removeDeletedItems (list) {
		var arr = [];
		for (var i = 0; i < list.length; i++) {
			if (File(runscript.script_dir + '/' + list[i]).exists) {
				arr.push (list[i]);
			}
		}
		return arr;
	}

	//---------------------------------------------------------------------------
	// Combine the history list with the contents of the script folder

	function getDropdownList () {
		var droplist;
		//var scripts = get_scripts (runscript.script_dir);
		var scripts = get_scripts (Folder (runscript.script_dir), [], 1);
		if (runscript.history.recentScripts.length === 0) {
			droplist = scripts;
		} else {
			droplist = runscript.history.recentScripts.concat ('----------------------------------------------').concat(scripts);
		}
		return droplist;
	}


	function get_a_script () {
		var i = 0;
		var filter = '';
		var filterRE = '';
		var droplist = getDropdownList();
		var listLength = droplist.length;
		var list;
		var w = new Window ('dialog', 'Script launcher', undefined, {closeButton: false});
			w.orientation = 'row';
			w.alignChildren = 'top';

			w.main = w.add ('group {orientation: "column"}');
				var entry = w.main.add ('edittext', undefined, droplist[0]);
					entry.minimumSize.width = 300;
				list = w.main.add ('listbox', undefined, droplist);
					list.preferredSize = [600, 350];
					list.selection = 0;



			w.buttons = w.add ('group {orientation: "column", alignChildren: "fill"}');
				w.buttons.add ('button', undefined, 'Run', {name: 'OK'});
				w.edit_button = w.buttons.add ('button', undefined, 'Edit');
				w.buttons.add ('button', undefined, 'Cancel', {name: 'cancel'});
				w.buttons.add ('panel');
				w.show_folder = w.buttons.add ('button', undefined, 'Folder');
				w.delete_button = w.buttons.add ('button', undefined, 'Delete');

				var options = w.main.add ('group {alignment: "left"}');
				var filter_check = options.add ('group {text: "Filter list"}');
				var applyFilterOnNextRun = options.add ('group {text: "Apply filter on next run"}');

			applyFilterOnNextRun.value = runscript.history.applyFilterOnNextRun;
			filter_check.value = runscript.history.filter_check;
			$.writeln("applyFilterOnNextRun.value = "+applyFilterOnNextRun.value);
			$.writeln("filter_check.value = "+filter_check.value);

			w.show_folder.onClick = function () {
				Folder(runscript.script_dir).execute();
			}

			w.edit_button.onClick = function() {
				File(runscript.script_dir+'/'+list.selection.text).execute();
			}

			w.delete_button.onClick = function() {
				try {
					File(runscript.script_dir+'/'+list.selection.text).remove();
				} catch(_){
				};
				var temp = deleteScriptName (list.selection.text);
				replace_list (temp);
			}

			function deleteScriptName (str) {
				var ret = [];
				var le = droplist.length;
				for (var i = 0; i < le; i++) {
					if (droplist[i] !== str) {
						ret.push (droplist[i]);
					}
				}
				return ret;
			}

			entry.onChanging = filter_list;

			function replace_list (temp) {
				// To change the dropdown, we replace the list object
				// rather than the items in the list. Much quicker.
				var templist = w.main.add ('listbox', list.bounds, temp);
				w.main.remove (list);
				list = templist;
				list.addEventListener('click', d_click);
				list.items[0].text.slice(0,3) == '---' ? list.selection = 1 : list.selection = 0;
			}

			function filter_list () {
				// If filter_check is true, we show only the scripts whose names contain what we type
				// by creating a new list on every keypress.
				// If filter_check is false, we leave the list for what it is and select the first entry
				// in the list that matches what we type
				filter = entry.text;
				filterRE = RegExp (filter, 'i')
				pattern = RegExp ("(?:\\b|_).*?(?:\\b|_)")
				//var result = pattern.test(filterRE)
				//$.writeln("result =" + result);
				if (RegExp (" ").test(filterRE)){
					$.writeln("YES")
					filterXX = filter.replace(/( )/g, pattern)
					filterXXRE = RegExp (filterXX, 'i');
			//		filterXX = filterRE.replace(/" "/, "(?:\\b|_).*?(?:\\b|_)")
				  $.writeln("filterXX =" + filterXX);
					 $.writeln("filterXXRE =" + filterXXRE);
				}

	//			filterZZ = RegExp ("^.*?(?:\\b|_)shitty(?:\\b|_).*?(?:\\b|_)proof(?:\\b|_).*?$")
				filterZZ = RegExp ("shitty(?:\\b|_).*?(?:\\b|_)proof")

				$.writeln("filterZZ =" + filterZZ);


				if (filter_check.value) {
					var temp = [];
					$.writeln("filterRE =" + filterRE);
					for (i = 0; i < droplist.length; i++) {
						//if (droplist[i].toLowerCase().indexOf (filter.toLowerCase()) > -1 || droplist[i].slice (0,3) === '---') {
						if (filterZZ.test (droplist[i])) {
							temp.push (droplist[i]);
						}
					}
					replace_list (temp);
				} else {
					i = 0;
					// Look for the first match
					while (i < listLength && list.items[i].text.toLowerCase().indexOf (filter.toLowerCase()) < 0) {
						++i;
					}
					if (list.items[i].text.toLowerCase().indexOf (filter.toLowerCase()) > -1) {
						list.selection = i;  // select it
					}
				}
			} // filter_list

			list.addEventListener('click', d_click);

			function d_click (event) {
				if (event.detail == 2 /*if double-click*/) { // Doesn't work in CC
					w.close (1);
				}
			}

			w.onShow = function () {
				//w.layout.layout();  // Is this necessary?
				entry.active = true;
				if (runscript.history.applyFilterOnNextRun && runscript.history.filter !== '') {
					entry.text = runscript.history.filter;
					filter_list();
				}
				w.location = runscript.history.location;
				list.revealItem(i);
			}

			if (w.show() == 2) {
				w.close();
				exit();
			}

			var script = list.selection.text;
			var obj = {
				location: [w.location.x, w.location.y],
				lastScript: script,
				filter: filter,
				applyFilterOnNextRun: false,
				filter_check: true
			}
			store_history (obj);
			return File (runscript.script_dir + '/' + script);
	} // dialog


	try {
		var script = get_a_script();
		app.doScript (script);
	} catch (e) {
		alert (e.message + "\r(line " + e.line + ")");
	}

}());
