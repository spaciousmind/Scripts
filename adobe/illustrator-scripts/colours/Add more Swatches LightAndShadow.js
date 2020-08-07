/////////////////////////////////////////////////////////////////
//Add Highlight And Shadow Swatches v.1 -- CS, CS2
//>=--------------------------------------
// A simple script for Animators. Takes current fill color from color pallate.
// a prompt will ask you to name the color, then it adds it to the swatch palate,
// along with the highlight and shadow for that color.
//
// feel free to tweak the values to get whatever percentages work best for you.
//
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
//////////////////////////////////////////////////////////////////

var docRef= app.activeDocument;
if ( app.documents.length > 0 )
{
		//set RGB values here
	RGBdarkenBy = -35;
	RGBlightenBy = 75;
		//set CMYK values here
	CMYKdarkenBy = 10;
	CMYKlightenBy = -18;
	defName = "";
	nameMsg = "Enter a name for the selected color:\n";

	//get Color Space Name
	t=[];
	t = ((activeDocument.documentColorSpace)+"").split(".")
	colSpace = t[1];

	try{
			var fill = docRef.defaultFillColor;
			if(docRef.defaultFilled == false){
			throw ("Sorry, no default fill found.\nPlease select a fill color.");

			}
			if (fill.typename != "SpotColor" && fill.typename != "RGBColor" && fill.typename != "CMYKColor")
			{
				throw("Sorry, "+fill.typename+" Objects are not currently supported.\nPlease convert the color to "+colSpace+".");
			}

			if(fill.typename == "SpotColor"){
				nameMsg += "***Warning: You have selected a spot color.***\nNew swatches will be converted to the current documents default color space.";
				fill = docRef.defaultFillColor.spot.color;
				defName = colSpace+"("+docRef.defaultFillColor.spot.name+")";
			}
				if(fill.typename == "RGBColor"){
					fr = roundHack(fill.red);
					fg = roundHack(fill.green);
					fb = roundHack(fill.blue);
					if (defName.length <1 )
					{
						defName = "r="+ fr+" g="+fg + " b="+fb;
					}
					colName = getName();
					//If you want to add more RGB color variations, add them here:
					makeColor([fr,fg,fb],RGBlightenBy,colName+" Highlight");
					makeColor([fr,fg,fb],0,colName);
					makeColor([fr,fg,fb],RGBdarkenBy,colName+" Shadow");
				} else if(fill.typename == "CMYKColor"){
					fc = roundHack(fill.cyan);
					fm = roundHack(fill.magenta);
					fy = roundHack(fill.yellow);
					fk = roundHack(fill.black);
					if (defName.length <1)
					{
						defName = "c="+ fc+" m="+fm + " y="+fy+ " k="+fk;
					}
					colName = getName();
					makeColor([fc,fm,fy,fk],55,colName+" Highlight+55");
					makeColor([fc,fm,fy,fk],50,colName+" Highlight+50");
					makeColor([fc,fm,fy,fk],45,colName+" Highlight+45");
					makeColor([fc,fm,fy,fk],40,colName+" Highlight+40");
					makeColor([fc,fm,fy,fk],35,colName+" Highlight+35");
					makeColor([fc,fm,fy,fk],30,colName+" Highlight+30");
					makeColor([fc,fm,fy,fk],25,colName+" Highlight+25");
					makeColor([fc,fm,fy,fk],20,colName+" Highlight+20");
					makeColor([fc,fm,fy,fk],15,colName+" Highlight+15");
					makeColor([fc,fm,fy,fk],10,colName+" Highlight+10");
					makeColor([fc,fm,fy,fk],0,colName);
					makeColor([fc,fm,fy,fk],-10,colName+" Shadow-10");
					makeColor([fc,fm,fy,fk],-15,colName+" Shadow-15");
					makeColor([fc,fm,fy,fk],-20,colName+" Shadow-20");
					makeColor([fc,fm,fy,fk],-25,colName+" Shadow-25");
					makeColor([fc,fm,fy,fk],-30,colName+" Shadow-30");
					makeColor([fc,fm,fy,fk],-35,colName+" Shadow-35");
					makeColor([fc,fm,fy,fk],-40,colName+" Shadow-40");
					makeColor([fc,fm,fy,fk],-45,colName+" Shadow-45");
					makeColor([fc,fm,fy,fk],-50,colName+" Shadow-50");
					makeColor([fc,fm,fy,fk],-55,colName+" Shadow-55");
				}

		}
	catch(e) {
		alert("Problem Found:\n"+e);
	}

}
function getName(){
	x = prompt(nameMsg,defName);
	if (x == null)
	{
		throw "No name value entered";
	}
	return x;
	}
function makeColor(arr,offset,cname){
	for (each in arr)
	{
		arr[each] = parseInt(arr[each]);
		arr[each] += offset;
	}

	if(arr.length == 3){
	//RGB
			var nc = new RGBColor();
				nc.red = limit(arr[0],255);
				nc.green = limit(arr[1],255);
				nc.blue = limit(arr[2],255);

	} else if (arr.length == 4){
	//CMYK
			var nc = new CMYKColor();
				nc.cyan = limit(arr[0],100);
				nc.magenta = limit(arr[1],100);
				nc.yellow = limit(arr[2],100);
				nc.black = limit(arr[3],100);

	}
		var col = docRef.swatches.add();
			col.name = cname;
			col.color = nc;
}
function roundHack(n){
	//make it a string
	n = n +"" ;
	ta = [];
	ta = n.split(".");
	return ta[0];
}
function limit(num,max){
	if (num <= 0)
		{
			return 0;
		}
		else if(num > max )
		{
			return max;
		}
		else {
			return num;
		}
}
