﻿Main();function Main() {	if (app.documents.length > 0) {		var doc = app.activeDocument;		if (doc.converted) {			var version = GetAppVersionName();			var newPath = doc.filePath + "/" + doc.name.replace(/\.indd$/, "") + "_" + version.replace(/\s/, "_") + ".indd";			doc.save(new File(newPath));		}	}}function GetAppVersionName() {	var appPath = app.filePath.fsName,	tempArr = (File.fs == "Windows") ? appPath.split("\\") : appPath.split("/"),	appName = tempArr[tempArr.length - 1].replace(/^Adobe InDesign\s/, "").replace(/\s\(32-bit\)/, "").replace(/\s+/, " ");	return appName;}