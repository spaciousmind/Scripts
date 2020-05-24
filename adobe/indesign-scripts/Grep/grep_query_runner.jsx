
(function(){
	
	//------------------------------------------------------------------------
	// Some things to restore the previous session's selection
	
	function scriptPath(){
		try {
			return app.activeScript;
		}
		catch (e) {
			return File (e.fileName);
		}
	}

	function saveData(obj) {
		var f = File(scriptPath().fullName.replace(/\.jsx$/,'.txt'));
		f.open('w');
		f.write(obj.toSource());
		f.close();
	}

	function getPrevious() {
		var f = File(scriptPath().fullName.replace(/\.jsx$/,'.txt'));
		var obj = {};
		if (f.exists){
			f.open('r');
			var temp = f.read();
			f.close();
			obj = eval(temp);
		}
		return obj;
	}

	//------------------------------------------------------------------------
	// Create an array of GREP queries from the app and the user folder
	
	function findQueries () {

		function findQueriesSub (dir) {
			var f = Folder(dir).getFiles('*.xml');
			return f;
		}
	
		var queryFolder = app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/Grep/";
		var appFolder = Folder.appPackage+'/Presets/Find-Change Queries/Grep/'+$.locale;
		var list = findQueriesSub (appFolder);
		list = list.concat (findQueriesSub (queryFolder));
		for (var i = list.length-1; i >= 0; i--) {
			list[i] = decodeURI(list[i].name.replace('.xml', ''));
		}
		return list;
	}

	//------------------------------------------------------------------------
	// Convert an array of ListItems to an array of strings
	
	function getQueryNames (sel) {
		var arr = [];
		for (var i = 0; i < sel.length; i++) {
			arr.push (sel[i].text);
		}
		return arr;
	}
	
	//------------------------------------------------------------------------

	var previous = getPrevious();
	
	var w = new Window ('dialog', 'Run queries', undefined, {closeButton: false});
		w.listContainer = w.add ('group');
		w.list = w.listContainer.add ('listbox', undefined, findQueries(), {multiselect: true});
		w.list.preferredSize = [300, 500];
		w.buttons = w.add ('group');
			w.buttons.add ('button', undefined, 'Cancel');
			w.buttons.add ('button', undefined, 'Run', {name: 'ok'});
	
	w.onShow = function () {
		if (previous.hasOwnProperty ('location')) {
			w.location = previous.location;
		}
		if (previous.hasOwnProperty ('queries')) {
			for (var i = 0; i < previous.queries.length; i++) {
				w.list.selection = w.list.find(previous.queries[i]);
			}
		}
	}
	
	if (w.show() == 1 && w.list.selection !== null) {
		var queries = getQueryNames (w.list.selection);
		saveData ({queries: queries, location: [w.location.x, w.location.y]});
		for (var i = 0; i < queries.length; i++) {
			app.loadFindChangeQuery (queries[i], SearchModes.grepSearch);
			app.documents[0].changeGrep();
		}
	}

}());