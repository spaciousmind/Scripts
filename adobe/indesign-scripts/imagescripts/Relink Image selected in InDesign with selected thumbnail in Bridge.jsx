#target "bridge" 

if((MenuElement.find("myRelink" )))	{
	$.writeln("Error:Menu element already exists!\nRestart Bridge to run this snippet again.");
	}
else {	
	main ();
	}



function main () {
	relinkinInDesign = new MenuElement( "command", "Relink in InDesign", "at the end of Tools", 
	"myRelink" ); 

	relinkinInDesign.onSelect = function () { 
		var brSel = app.document.selections[0].spec.toString();
		var bt = new BridgeTalk();
		bt.target = "indesign";
		theScript = "var IDsel = app.selection[0]; \n";
				theScript += "if (IDsel instanceof Graphic){ \n";
				theScript += "var theGraphic = IDsel;\n";
				theScript += "}else{\n";
				theScript += "var theGraphic = IDsel.graphics[0];\n";
				theScript += "}\n";
				theScript += "var theFile = File(\""+brSel+"\");\n";
				theScript += "theGraphic.itemLink.relink(theFile);\n";
				theScript += "theGraphic.itemLink.update();\n";
		bt.body=theScript;
		bt.send()
	}
}
