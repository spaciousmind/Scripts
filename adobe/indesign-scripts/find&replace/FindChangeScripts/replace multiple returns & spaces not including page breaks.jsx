//This script was auto generated by chainGREP.jsx//chainGREP.jsx is provided by Gregor Fellenz https://www.publishingx.de///Download at https://www.publishingx.de/download/chain-grepmain();function main() {	if (app.layoutWindows.length == 0) return;	var changeObject = app.documents[0];	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;	var doc = app.documents[0];	var style;	var options = app.findChangeGrepOptions.properties;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[replace column breaks with copyright symbol]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, widthSensitive:true});		app.findGrepPreferences.properties = ({findWhat:"~M"});		app.changeGrepPreferences.properties = ({changeTo:"~2"});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[Multiple Return to Single Return]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, widthSensitive:true});		app.findGrepPreferences.properties = ({findWhat:"~b~b+"});		app.changeGrepPreferences.properties = ({changeTo:"\\r"});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[Multiple Space to Single Space]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, widthSensitive:true});		app.findGrepPreferences.properties = ({findWhat:"[~m~>~f~|~S~s~<~/~.~3~4~% ]{2,}"});		app.changeGrepPreferences.properties = ({changeTo:"\\s"});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[replace copyright symbol with column breaks]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, widthSensitive:true});		app.findGrepPreferences.properties = ({findWhat:"~2"});		app.changeGrepPreferences.properties = ({changeTo:"~M"});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findChangeGrepOptions.properties = options;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;};function getStyleByString(docOrGroup, string, property) {	if (string == '[No character style]') return docOrGroup[property][0];	if (string == '[No paragraph style]') return docOrGroup[property][0];	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];	stringResult = string.match (/^(.*?[^\\]):(.*)$/);	var styleName = (stringResult) ? stringResult[1] : string;	styleName = styleName.replace (/\\:/g, ':');	remainingString = (stringResult) ? stringResult[2] : '';	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString (styleOrGroup, remainingString, property);	return styleOrGroup;};