﻿var scriptName = "Fill selected empty cells with dashes",  doc, emptyParStyle;    app.doScript(PreCheck, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "\"" + scriptName + "\" script");    //===================================== FUNCTIONS ======================================  function Main() {      var cell,      cells = app.selection[0].cells;            for (var i = 0; i < cells.length; i++) {          cell = cells[i];            if (cell.contents.length == 0) {              cell.contents = "-"; // Change it to whatever you need: e.g. a space              cell.paragraphs[0].appliedParagraphStyle = emptyParStyle;          }      }  }  //---------------------------------------------------------------------------------------------------------------------------------------------------------  function MakeParStyle(name, properties) {      var parStyle = doc.paragraphStyles.item(name);      if (!parStyle.isValid) {          parStyle = doc.paragraphStyles.add({name: name});          if (properties != undefined) parStyle.properties = properties;      }      return parStyle;  }  //---------------------------------------------------------------------------------------------------------------------------------------------------------  function PreCheck() {      if (app.documents.length == 0) ErrorExit("Please open a document and try again.", true);      doc = app.activeDocument;      if (doc.converted) ErrorExit("The current document has been modified by being converted from older version of InDesign. Please save the document and try again.", true);      if (!doc.saved) ErrorExit("The current document has not been saved since it was created. Please save the document and try again.", true);      if (app.selection.length == 0) ErrorExit("Nothing is selected. Please, select a table or some cells in a table and try again.", true);      if (app.selection.length > 0 && (app.selection[0].constructor.name != "Cell" && app.selection[0].constructor.name != "Table")) ErrorExit("Wrong selection. Please, select a table or some cells in a table and try again.", true);      //  Add/change the properties you want to use for the style between the curly brackets      emptyParStyle = MakeParStyle("Empty", {appliedFont: "Minion Pro", fontStyle: "Regular"});      Main();  }  //--------------------------------------------------------------------------------------------------------------------------------------------------------  function ErrorExit(error, icon) {      alert(error, scriptName, icon);      exit();  }  //--------------------------------------------------------------------------------------------------------------------------------------------------------  