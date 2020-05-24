// LinkExport-Pro_1a.jsx 
//DESCRIPTION: Exports some information about placed images in the active Document into a textfile in the same folder as the document.  
// The values are tab-separated, so that the content of the file can be copied to Excel via Clipboard. 
// The exported textfile has the ending ".txt". 
// Script by Martin Fischer (www.hilfdirselbst.ch)
// 
var myDoc = app.documents[0]; 
if (myDoc.saved == false) 
{ 
	alert("Error.\rYou must first save your document."); 
	exit(); 
} 
var myDocName = myDoc.name.split(".indd")[0]; 
var myTXT_File = myDocName + ' links' + '.txt'; 
var myPath = myDoc.filePath + "/"; 
var myCreator = "R*ch";	  
var myType = "TEXT";  
var theFiles = myDoc.links; 
var myData = "link\tpath\tpage\twidth\theight\t% vertical\t% horizontal\teff. PPI\r";	  
 
var f = new File( myPath + myTXT_File );  
f.open( 'w', myType, myCreator );  
f.writeln( myData );  
 
for (myCounter = 0; myCounter<theFiles.length;myCounter ++ ) {  
	var myBounds = theFiles[myCounter].parent.geometricBounds;  
	var myWidth = Math.round(myBounds[3]-myBounds[1]);  
	var myHeight = Math.round(myBounds[2]-myBounds[0]);  
	var myScaleVert = Math.round(theFiles[myCounter].parent.absoluteVerticalScale); 
	var myScaleHori = Math.round(theFiles[myCounter].parent.absoluteHorizontalScale); 
	var myImagePath = theFiles[myCounter].filePath; 
	// WARNING if vertical scale is different to horizontal scale 
	if (myScaleVert != myScaleHori) 
	{ 
		var myWarning = "% vertical is not equal % horizontal"; 
	} 
	else  
	{ 
		var myWarning = ""; 
	} 
	try  
	{  
		myPPI = (theFiles[myCounter].parent.effectivePpi); 
	}  
	catch (e)  
	{  
		myPPI = 0; 
	}  
	var myClass = theFiles[myCounter].parent.parent.parent.constructor.name; 
	// image placed on page 
	if (myClass == "Page")  
	{  
		myPage = theFiles[myCounter].parent.parent.parent.name; 
	}  
	// image embedded 
	else if (myClass == "Character") 
	{ 
		try  
		{	 
			myPage = theFiles[myCounter].parent.parent.parent.parentTextFrames[0].parent.name; 
		} 
		catch(e) 
		{ 
			myPage = "versteckt im 哹erlauf"; 
		} 
	}  
	else { 
		try  
		{  
			// image placed outside the pages 
			myPage = "Spread of " + theFiles[myCounter].parent.parent.parent.pages[0].name; 
		}  
		catch(e)  
		{  
			// don't know the page where the image is placed 
			alert ("Class: " + myClass + "\r" + theFiles[myCounter].name); 
		}  
	}  
	myData = theFiles[myCounter].name + "\t" + 'effective PPI = ' + myPPI +  "\n" + myImagePath + "\n" + "\r"; 
	f.writeln(myData);  
}  
f.close(); 