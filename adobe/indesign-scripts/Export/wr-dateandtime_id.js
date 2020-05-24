//////////////////////////////////////////////////////////// english //// -------------------------// -=> WR-DateAndTime_ID <=-// -------------------------//// A Javascript for Adobe InDesign CS// by Wolfgang Reszel (ai-js@rumborak.de)//// Version 0.91 from 11.04.2008//// This script inserts the actual date or the actual time to a// predefined position in the document.//// To define the position, you'll have to create an textframe and// execute this script while the frame is selected. The whole object// has to be selected and not words or letters. You can mark more// objects, if you select each object separate and execute// the script on it.//// With the placeholders {DATE} and {TIME} you are able to define a// particular point, where the date or the time should be replaced.// If there is no placeholder in the textobject// "{FILENAME} ({DATE}, {TIME})" will be used as standard placeholders.//// To update the date and time execute this script without any object// selected. At line 134 you can add additional commands which are// executed after updating. (see examples)//// There are some additional placeholders://   {FILE}     - complete document-filename with path//   {FILEPATH} - only the documents filepath//   {FILENAME} - the filename of the document//// It is now possible to edit a DateAndTime-Object.//// To enable the english messages and date-format change the "de"// into "en" in line 86.//// Sorry for my bad english. For any corrections send an email to:// ai-js@rumborak.de////////////////////////////////////////////////////////////// Deutsch //// -------------------------// -=> WR-DateAndTime_ID <=-// -------------------------//// Ein Javascript fuer Adobe InDesign CS// von Wolfgang Reszel (ai-js@rumborak.de)//// Version 0.91 vom 11.04.2008//// Dieses Skript fuegt das aktuelle Datum und die aktuelle Uhrzeit an// eine vorher bestimmte Stelle im Dokument ein.//// Um eine Stelle zu bestimmen, muss man ein Textrahmen erzeugen, ihn// markieren und dann dieses Skript aufrufen. Es muss das gesamte Objekt// ausgewaehlt sein, nicht etwa Buchstaben oder Woerter. Es lassen sich// nacheinander auch mehrere Rahmen als Datum/Uhrzeit markieren.//// Mit den Platzhaltern {DATE} und {TIME} (in geschweiften Klammern)// kann man bestimmen, wo genau im Text das Datum und die Uhrzeit// erscheinen soll. Sind die Platzhalter nicht vorhanden, wird// automatisch "{FILENAME} ({DATE} - {TIME})" verwendet.//// Zum Aktualisieren des Datums/Uhrzeit muss man dieses Skript aufrufen// wenn kein Objekt ausgewaehlt ist. Ab Zeile 134 kannst du weitere Befehle// angeben, welche nach dem Aktualisieren ausgeführt werden. (siehe Beispiele)//// Es gibt noch einige zusaetzliche Platzhalter://   {FILE}     - kompletter Dateiname mit Pfad//   {FILEPATH} - nur der Verzeichnispfad des Dokuments//   {FILENAME} - der Dateiname des Dokuments//// Man kann nun ein Datum/Uhrzeit-Objekt bearbeiten.//// Um dieses Skript mit deutschen Meldungen und Datumsformat zu// versehen, muss in Zeile 86 das "en" durch ein "de" ersetzt werden.//// Verbesserungsvorschlaege an: ai-js@rumborak.de////$.bp();// -------------------------------------------------------------------var language="en";   // "de" fuer Deutsch// -------------------------------------------------------------------var WR="WR-DateAndTime_ID v0.91\n\n";if (language == "de") {  var format_preset = "{FILENAME} ({DATE} - {TIME})";  var MSG_askformat = WR+"Soll das Textobjekt als Datum/Uhrzeit formatiert werden? Formate:\n{DATE}, {TIME}, {FILE}, {FILEPATH} und {FILENAME}:"  var MSG_editformat = WR+"Datums-/Uhrzeitformat bearbeiten (Leer = entfernen). Formate:\n{DATE}, {TIME}, {FILE}, {FILEPATH} und {FILENAME}:"  var MSG_notexto = WR+"Kein Textrahmen!";  var MSG_selectedmany = "Zum Markieren als aktuelles Datum/Uhrzeit darf nur ein Textrahmen ausgew\xE4hlt sein und falls Sie die Daten aktualisieren wollen, darf kein Objekt ausgew\xE4hlt sein.";  var MSG_nodocs = WR+"Kein Dokument ge\xF6ffnet."  var Timeformat = 24;  var TimeSep = ":";  var AM = " am";  var PM = " pm";  var Dateformat = "dd.mm.yyyy";} else {  var format_preset = "{FILENAME} ({DATE}, {TIME})";  var MSG_askformat = WR+"Do you want to mark the textobject as actual date'n'time? Formats:\n{DATE}, {TIME}, {FILE}, {FILEPATH} und {FILENAME}:"  var MSG_editformat = WR+"Edit date'n'time (empty = remove). Formats:\n{DATE}, {TIME}, {FILE}, {FILEPATH} und {FILENAME}:"  var MSG_notexto = WR+"No textframe!";  var MSG_selectedmany = "To mark as actual date'n'time, you have to select only one textframe. If you want to update the date'n'time-objects, there must be no object selected.";  var MSG_nodocs = WR+"You have no open document."  var Timeformat = 12;  var TimeSep = ":";  var AM = " am";  var PM = " pm";  var Dateformat = "mm/dd/yyyy";}var error=0;if (app.documents.length<1) {  error++;  alert(MSG_nodocs)}if (error < 1) {  if (date_n_time()) {    // Export the document (remove the //)    //fName = app.activeDocument.filePath+"/"+app.activeDocument.name;    //fName = fName.replace(/\.indd/,".pdf");    //myFile = new File(fName);    //app.activeDocument.exportFile(ExportFormat.pdfType,myFile,true);    // Print the document (remove the //)    //app.activeDocument.print()  }}function TodayDate(){  var Today = new Date();  var Day = Today.getDate();  var Month = Today.getMonth() + 1;  var Year = Today.getYear();  var PreMon = ((Month < 10) ? "0" : "");  var PreDay = ((Day < 10) ? "0" : "");  if(Year < 999) Year += 1900;  var theDate = Dateformat.replace(/dd/,PreDay+Day);  theDate = theDate.replace(/mm/,PreMon+Month);  theDate = theDate.replace(/d/,Day);  theDate = theDate.replace(/m/,Month);  theDate = theDate.replace(/yyyy/,Year);  theDate = theDate.replace(/yy/,Year.toString().substr(2,2));  return theDate;}function TodayTime(){  var Today = new Date();  var Hours = Today.getHours();  var Minutes = Today.getMinutes();  var Suffix = "";  if (Timeformat == 12) {    if (Hours >= 12 ) {      Suffix = PM;    } else {      Suffix = AM;    }    if (Hours >= 13) {      Hours = Hours - 12;    }    if (Hours < 1) {      Hours = Hours + 12;    }  }  var PreHour = ((Hours < 10) ? "0" : "");  var PreMin = ((Minutes < 10) ? "0" : "");  return PreHour+Hours+TimeSep+PreMin+Minutes+Suffix;}function DateUpdate(Name) {  try {    var docpath = app.activeDocument.filePath.fsName;  } catch (e) {    docpath="";  }  var docname = app.activeDocument.name;  if (docpath.slice(2,3) == "\\") {    docsep = "\\";  } else {    docsep = ":";  }  var content = Name.slice(11);  var content = content.replace(/\{FILE\}/,docpath+docsep+docname);  var content = content.replace(/\{FILEPATH\}/,docpath);  var content = content.replace(/\{FILENAME\}/,docname);  var content = content.replace(/\{DATE\}/,TodayDate());  var content = content.replace(/\{TIME\}/,TodayTime());  return content;}function date_n_time(){  if (app.selection.length == 1) {    if (app.selection[0].toString() == "[object InsertionPoint]" || app.selection[0].toString() == "[object Text]"  || app.selection[0].toString() == "[object Character]") {      app.selection[0].parentTextFrames[0].select();    }    if (app.selection[0].toString() == "[object TextFrame]") {      if (app.selection[0].label.slice(0,11) == "actualDate:") {        dateformat = app.selection[0].label.slice(11);        dateformat = prompt(MSG_editformat, dateformat);        if(dateformat == "" ) {          app.selection[0].label="";          app.activeDocument.selection=null;        }        if(dateformat && dateformat !="" ) {          app.selection[0].label="actualDate:"+dateformat;          app.selection[0].contents = DateUpdate(app.selection[0].label);        }      } else {        dateformat = app.selection[0].contents;        if(dateformat.search(/\{DATE\}/) == -1 && dateformat.search(/\{TIME\}/) == -1 && dateformat.search(/\{FILE[A-Z]*\}/) == -1) dateformat = format_preset;        dateformat = prompt(MSG_askformat, dateformat);        if (dateformat) {          app.selection[0].label="actualDate:"+dateformat;          app.selection[0].contents = DateUpdate(app.selection[0].label);        }      }    } else {      alert ( MSG_notexto );    }  } else if (app.selection.length > 1) {    alert ( MSG_selectedmany );  } else {    var textFrames = app.activeDocument.textFrames;    for (var i = 0 ; i < textFrames.length; i++)    {      if (textFrames[i].label.slice(0,11) == "actualDate:") {        textFrames[i].contents = DateUpdate(textFrames[i].label);      }    }    return true  }}