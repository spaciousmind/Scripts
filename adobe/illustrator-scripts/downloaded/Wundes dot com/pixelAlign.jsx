/////////////////////////////////////////////////////////////////
//Align to Pixels v.1 -- CS, CS5
//>=--------------------------------------
// A super simple script that aligns all selected objects to nearest pixel values.
// Note: This is version 1, so please check to see if it works. 
// I had some problems with stroked objects.
// v. 1.1 added check for height and width so script can work on line objects.
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
////////////////////////////////////////////////////////////////// 

var doc = activeDocument;
var sel = doc.selection;

var selLen = sel.length;

while(selLen--)
{
    fidget(sel[selLen]);    
}

function fidget(item)
{
    if(item.height){
        item.height = pixAlign(item.height);
    }
    if(item.width){
        item.width = pixAlign(item.width);
    }   
    item.top = pixAlign(item.top);
    item.left = pixAlign(item.left);
 }

function pixAlign(n)
{
    return Math.round(n)
 }
    