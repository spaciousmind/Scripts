//This script was auto generated by chainGREP.jsx//chainGREP.jsx is provided by Gregor Fellenz https://www.publishingx.de///Download at https://www.publishingx.de/download/chain-grepmain();function main() {	if (app.layoutWindows.length == 0) return;	if (app.selection.length != 1 || !app.selection[0].hasOwnProperty('changeGrep')) {		alert('Please select only one textframe or text range!');		return;	}	var changeObject = app.selection[0].parentStory;	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;	var doc = app.documents[0];	var style;	var options = app.findChangeGrepOptions.properties;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[format table headings waituhi kuratau 2019]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});		app.findGrepPreferences.properties = ({});		style = getStyleByString(doc, 'bold (black)', 'characterStyles');		if (!style.isValid) throw Error(localize(({en:"Missing find characterstyle [%1] for query [%2]", de:"Fehlendes Such-Zeichenformat [%1] bei Abfrage [%2]", fr:"La requête [%2] invoque en recherche un style de caractère manquant : [%1]", ja_JP:"クエリ[%2]の検索形式に設定された文字スタイル[%1]が見つかりませんでした"}), 'bold (black)', 'format table headings waituhi kuratau 2019') );		app.findGrepPreferences.appliedCharacterStyle =  style;		app.changeGrepPreferences.properties = ({spaceBefore:2.99999999369444});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findChangeGrepOptions.properties = options;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;};function getStyleByString(docOrGroup, string, property) {	if (string == '[No character style]') return docOrGroup[property][0];	if (string == '[No paragraph style]') return docOrGroup[property][0];	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];	stringResult = string.match (/^(.*?[^\\]):(.*)$/);	var styleName = (stringResult) ? stringResult[1] : string;	styleName = styleName.replace (/\\:/g, ':');	remainingString = (stringResult) ? stringResult[2] : '';	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString (styleOrGroup, remainingString, property);	return styleOrGroup;};