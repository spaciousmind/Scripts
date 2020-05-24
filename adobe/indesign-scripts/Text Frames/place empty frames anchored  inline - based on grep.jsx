undoLabel = "place image frames inline between @ glyphs"
app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, undoLabel);

//main();

function main() {
	var name, f, file, text,
	arr = [];
	
	if(app.documents.length != 0) {
		var doc = app.activeDocument;	
//		var folder = Folder.selectDialog("Choose a folder with images");

//		if (folder != null) {
			app.findObjectPreferences = app.changeGrepPreferences  = NothingEnum.NOTHING;
			app.findGrepPreferences.findWhat = "@blah@";
   //         app.findGrepPreferences.findWhat = "@.+?@";   // find anything version
			f = doc.findGrep(true);
			
			for (i = 0; i < f.length; i++) {
             
				name = f[i].contents.replace(/@/g, "");
                
           //     var rect = paragraph.insertionPoints[1].rectangles.add({ geometricBounds : [0,0,"5mm","5mm"] });

//rect.place(myThumbnailFilePath);
				//file = File("E:\Projects\2020\WFS 2020\resources\Film Soc Pics\And Life Goes On\28639id_LifeGoesOn_1600_4.jpg");
				
	//			if (file.exists) {
     //           f[i].remove();
                myrect = f[i].insertionPoints[0].rectangles.add({geometricBounds : [0,0,"16mm","24mm"],strokeWeight : 0}); 
      //           myrect = AnchorPoint.TOP_LEFT_ANCHOR;
                myrect.anchoredObjectSettings.insertAnchoredObject(f[i].insertionPoints[0] , AnchorPosition.INLINE_POSITION);
               
                myrect.strokeWeight = 0;
                myrect.frameFittingOptions.fittingOnEmptyFrame = EmptyFrameFittingOptions.FILL_PROPORTIONALLY;
 //               myrect.images[0].fit (fitOptions.FILL_PROPORTIONALLY);
 
                f[i].remove();
     //           f[i] insertionPoints[0].rectangles.add
//works					f[i].insertionPoints[0].rectangles.add({ geometricBounds : [0,0,"5mm","5mm"] });
//				}
	//			else {
//					arr.push("File doesn't exist '" + name + "'");
//				}
		//	}
		
			app.findObjectPreferences = app.changeGrepPreferences  = NothingEnum.NOTHING;
			
			arr.push("------------------------------------------");
			text = arr.join("\r");
			writeToFile(text);
		}
	}
	else{
		alert("Please open a document and try again.");
	}	
}

function writeToFile(text) {
	var file = new File("~/Desktop/Place inline images.txt");
	if (file.exists) {
		file.open("e");
		file.seek(0, 2);
	}
	else {
		file.open("w");
	}
	file.write(text + "\r"); 
	file.close();
}