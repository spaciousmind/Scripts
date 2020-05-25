//DESCRIPTION: Create a JPEG preset using the application's export settings.


(function () {

	function script_dir () {
		try {
			return app.activeScript.path + '/';
		} catch (e) {
			return File (e.fileName).path + '/';
		}
	}

	function check_name (fstring) {
		if (!/\.jpeg_preset$/.test (fstring)) {
			fstring += '.jpeg_preset';
		}
		var f = File (fstring);
		if (!f.exists || askYN ('Replace ' + f.name.replace (/\.jpeg_preset$/i, '') + '?')) {
			return fstring;
		}
		return '';
	}

	function askYN (s) {
		var w = new Window ('dialog');
			w.statictxt = w.add ('group');
				w.statictxt.add ('statictext', undefined, s);
			w.buttons = w.add ('group');
				w.buttons.add ('button', undefined, 'Yes', {name: 'ok'});
				w.buttons.add ('button', undefined, 'No', {name: 'cancel'});
		return w.show() == 1;
	}

	function get_filename () {
		var fname;
		var dir = script_dir();
		var w = new Window ('dialog', 'Save JPEG preset', undefined, {closeButton: false});
			w.panel = w.add ('panel {orientation: "row"}');
				w.panel.add ('statictext {text: "Preset name: "}');
				w.panel.edit = w.panel.add ('edittext {characters: 40, active: true}');
			w.buttons = w.add ('group {alignment: "right"}');
				w.buttons.add ('button', undefined, 'Cancel', {name: 'cancel'});
				w.buttons.ok = w.buttons.add ('button', undefined, 'OK', {name: 'ok'});

		w.buttons.ok.onClick = function () {
			fname = check_name (dir + w.panel.edit.text);
			if (fname == '') {
				w.panel.edit.active = true;
			} else {
				w.close();
			}
		}
	
		if (w.show() == 2) {
			exit();
		}
	
		return fname;
	}


	function write_jpeg_preset (fstring) {
		var skip = {
			// serverPath and imageExtension can't be set in the interface, the others we never want
			eventListeners: true,
			events: true,
			isValid: true,
			parent: true,
			properties: true,
		};

		var arr = [];
		var props = app.jpegExportPreferences;

		for (var i in props) {
			if (!skip[i]) {
				try {
					arr.push (i + ': ' + props[i]);
				} catch (_){
				}
			}
		}
		arr.sort();
		var f = File (fstring);
		f.open('w');
		f.write (arr.join ('\r'));
		f.close();
	}

	//----------------------------------------------------------------------------

	var presetName = get_filename();
	write_jpeg_preset (presetName);

}());