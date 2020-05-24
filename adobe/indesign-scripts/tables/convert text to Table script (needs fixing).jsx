// Target to Indesign software

#target indesign
var doc = app.activeDocument;

//--------------------------------------------------------------------------------------

// Declare myDoc

var myDoc = app.documents[0];  

//--------------------------------------------------------------------------------------

//If nothing selected alert them to select and run the script

var a_table = app.selection[0];
if (a_table == null){
alert("No table selected. Please select and proceed"); exit()}

//--------------------------------------------------------------------------------------   

// Create swacthes

try{
var myColor = doc.colors.add(); 
myColor.colorValue = [0,0,0,0]; 
myColor.name = "Paragraph_Header_Text_White_Color"; 
var myColor = doc.colors.add(); 
myColor.colorValue = [80,0,60,10]; 
myColor.name = "Table_Header_Color"; 
var myColor = doc.colors.add(); 
myColor.colorValue = [40,0,30,0]; 
myColor.name = "Table_Sub_Head_Color"; 
var myColor = doc.colors.add(); 
myColor.colorValue = [80,0,70,40]; 
myColor.name = "Table_Stroke_Color"; 
var myColor = doc.colors.add(); 
myColor.colorValue = [0,0,0,100]; 
myColor.name = "Table_text_Color"; 

//--------------------------------------------------------------------------------------   

// Paragraph style & celly style 

doc.paragraphStyles.add({name:"Table Header", appliedFont:"Arial", fontStyle: "Bold", pointSize:8, leading:10.5, fillColor: "Paragraph_Header_Text_White_Color"});
doc.paragraphStyles.add({name:"Table Text", appliedFont:"Arial", fontStyle: "Regular", pointSize:8, leading:10, fillColor: "Table_text_Color"});
doc.paragraphStyles.add({name:"Table Footer", appliedFont:"Arial", fontStyle: "Regular", pointSize:8, leading:10, fillColor:"Table_text_Color"});
doc.paragraphStyles.add({name:"Table Price", appliedFont:"Arial", fontStyle: "Bold", pointSize:8, leading:10, fillColor: "Table_text_Color"});
doc.paragraphStyles.add({name:"Table Sub Heading", appliedFont:"Arial", fontStyle: "Bold", pointSize:8, leading:10, fillColor:"Table_text_Color"});
doc.paragraphStyles.add({name:"Table Header Price", appliedFont:"Arial", fontStyle: "Bold", pointSize:8, leading:10, fillColor: "Paragraph_Header_Text_White_Color"});
doc.paragraphStyles.add({name:"Table Header Right", appliedFont:"Arial", fontStyle: "Bold", pointSize:8, leading:10.5, justification: Justification.RIGHT_ALIGN});
doc.cellStyles.add({name:"Header",  topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", fillColor: "Table_Header_Color", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Header", rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color", topEdgeStrokeColor: "Table_Stroke_Color", bottomEdgeStrokeColor: "Table_Stroke_Color"});
doc.cellStyles.add({name:"Body", topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", topEdgeStrokeWeight: "0.5", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Text", bottomEdgeStrokeColor: "Table_Stroke_Color", rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color"});
doc.cellStyles.add({name:"Sub-Heading",  topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", fillColor: "Table_Sub_Head_Color", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Sub Heading",  bottomEdgeStrokeColor: "Table_Stroke_Color",  rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color"});
doc.cellStyles.add({name:"Price Header", topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Header Price", fillColor: "Table_Header_Color", rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color", topEdgeStrokeColor: "Table_Stroke_Color", bottomEdgeStrokeColor: "Table_Stroke_Color"});
doc.cellStyles.add({name:"Footer", topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Footer", bottomEdgeStrokeColor: "Table_Stroke_Color", rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color", topEdgeStrokeColor: "Table_Stroke_Color"});
doc.cellStyles.add({name:"Price", topEdgeStrokeWeight: "0.5", rightEdgeStrokeWeight: "0.5", leftEdgeStrokeWeight: "0.5",bottomEdgeStrokeWeight: "0.5", verticalJustification:VerticalJustification.CENTER_ALIGN, appliedParagraphStyle: "Table Price", bottomEdgeStrokeColor: "Table_Stroke_Color", rightEdgeStrokeColor: "Table_Stroke_Color", leftEdgeStrokeColor: "Table_Stroke_Color"});
doc.tableStyles.add({name:"Tablestyle", bodyRegionCellStyle: "Body", headerRegionCellStyle: "Header", leftColumnRegionCellStyle: "Body"});
}
catch(e)
{
// Delete Unused Swatches
 var myunusedswatch = doc.unusedSwatches;
 for (var i = myunusedswatch.length-1; i>=0; i--){
     var myS = doc.unusedSwatches[i];
     var name= myS.name;
     if(name != ""){
         myS.remove(); } } }

//--------------------------------------------------------------------------------------

// Rename the text frame

app.selection[0].name = "Main1"; 
var myTFs = myDoc.textFrames.item("Main1");
 
//--------------------------------------------------------------------------------------

// Character style to none

myTFs .select();  
mySel = app.selection[0];  
myStory = mySel.parentStory; 
for (loop=0; loop<myStory.paragraphs.length; loop++)  
myStory.paragraphs[loop].appliedCharacterStyle = app.activeDocument.characterStyles.item("[None]"); 

//--------------------------------------------------------------------------------------

// Modify the basic  Paragraph Style

myTFs .select();  
mySel = app.selection[0];  
myStory = mySel.parentStory; 
for (loop=0; loop<myStory.paragraphs.length; loop++)  
myStory.paragraphs[loop].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
var style = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
style.pointSize=0.2;

//--------------------------------------------------------------------------------------

// Remove  the enter mark on end of the document 

var myStory = app.selection[0].parentStory;  
if(myStory.characters[-1].contents == "\r"){  
myStory.characters[-1].remove();}  

//--------------------------------------------------------------------------------------

//Apply the basic paragraph style to selected Frame

mySel = app.selection[0];  
myStory = mySel.parentStory; 
for (loop=0; loop<myStory.paragraphs.length; loop++)  
myStory.paragraphs[loop].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
 
 //--------------------------------------------------------------------------------------
 
// Find Table Text 

var doc = app.activeDocument;              
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;        
app.findGrepPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 

 //--------------------------------------------------------------------------------------
 
// Convert text to table and apply table style 

app.findTextPreferences = app.changeTextPreferences = null;  
app.findTextPreferences.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("[Basic Paragraph]");           
var mySelection = app.activeDocument.selection[0].parentStory.findText(true);           
for (var i = 0; i < mySelection.length; i++) {                
var myTable = mySelection[i].convertToTable();     
myTable.appliedTableStyle = "Tablestyle";                               
myTable.clearTableStyleOverrides(); 
myTable.clearTableStyleOverrides(); 
app.selection[0].fit(FitOptions.FRAME_TO_CONTENT);}  

//--------------------------------------------------------------------------------------

// Select all text inside the selected table

myTFs.select();
var myDoc = app.selection[0];   
app.findTextPreferences = app.changeTextPreferences = null;          
app.findTextPreferences.appliedParagraphStyle= app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
var myFound = myDoc.findText()
for(i=0; i<myFound.length; i++){    
myFound[i].appliedParagraphStyle=app.activeDocument.paragraphStyles.itemByName("Table Text");}
 
//--------------------------------------------------------------------------------------

// Apply body cell style to all cells

var all = app.selection[0].tables[0].cells.everyItem().getElements();  
for(i=0; i<all.length; i++){  
all[i].cells.everyItem().appliedCellStyle = app.activeDocument.cellStyles.itemByName("Body");
all[i].cells.everyItem().clearCellStyleOverrides();}

//--------------------------------------------------------------------------------------

// Apply header cell style to first row

var all = app.selection[0].tables[0].rows[0].getElements();  
for(i=0; i<all.length; i++){      
all[i].cells.everyItem().appliedCellStyle = app.activeDocument.cellStyles.itemByName("Header");
all[i].cells.everyItem().clearCellStyleOverrides();  }

//--------------------------------------------------------------------------------------

//Apply last entire column to price styles

myTFs .select();  
var myTable = app.selection[0].tables[0].columns[-1].cells.everyItem().getElements();      
for(i=0; i<myTable.length; i++){  
myTable[i].columns[-1].cells.everyItem().appliedCellStyle = app.activeDocument.cellStyles.itemByName("Price");
myTable[i].columns[-1].cells.everyItem().clearCellStyleOverrides();
myTable[i].columns[-1].rightEdgeStrokeWeight = 0.5;}


//--------------------------------------------------------------------------------------

//Merge the empty Rows

myTFs .select();  
var myDoc = app.activeDocument;
if (app.selection.length) {
var myTableFrame = app.selection[0];
if (myTableFrame.tables.length) {
var myTable = myTableFrame.tables[0];
fixupTable(myDoc, myTable);}
else {
alert("This frame contains no table.");}}
else {
alert("Please select a frame containing your table.");}

function fixupTable(myDoc, myTable) {
for (var rowNum = 0; rowNum < myTable.rows.length; rowNum++) {
var myRow = myTable.rows[rowNum];
var allCellsBlank = true;
for (var cellNum = 1; cellNum < myRow.cells.length; cellNum++) {
if (myRow.cells[cellNum].contents.length > 0) {
allCellsBlank = false;
break;}}
if (allCellsBlank) { // merge the cells
for (var cellNum = myRow.cells.length-2; cellNum > -1; cellNum--) {
myRow.cells[cellNum].merge(myRow.cells[cellNum+1]);
myRow.cells[cellNum].appliedCellStyle = app.activeDocument.cellStyles.itemByName("Sub-Heading");                    
myRow.cells[cellNum].cells.everyItem().clearCellStyleOverrides();
myRow.cells[cellNum].rightEdgeStrokeWeight = 0.5;
myRow.cells[cellNum].topEdgeStrokeWeight = 0.5;}}}}

//--------------------------------------------------------------------------------------

// Find last cell in a row and apply  price cell style

myTFs .select();  
var myTable = app.selection[0].tables[0].columns[-1].cells[0].getElements();  
for(i=0; i<myTable.length; i++){  
myTable[i].columns[-1].cells[0].select(); 
myTable[i].columns[-1].cells[0].appliedCellStyle = app.activeDocument.cellStyles.itemByName("Price Header");
myTable[i].columns[-1].cells[0].clearCellStyleOverrides();  
myTable[i].columns[-1].cells[0].fillColor = "Table_Header_Color"; }

//--------------------------------------------------------------------------------------

// Find merged last row if its merged apply footer cell style also convert to footer row

myTFs .select();  
var myDoc = app.activeDocument,  
myTable = app.selection[0].tables[0];  
var checkMerged = myTable.rows[-1].cells[0].columnSpan;  
if (checkMerged !== 1){  
myTable.rows[-1].select();  
myTable.rows[-1].cells.everyItem().appliedCellStyle = app.activeDocument.cellStyles.itemByName("Footer");
myTable.rows[-1].cells.everyItem().clearCellStyleOverrides();  }  

//--------------------------------------------------------------------------------------

//Reset the Paragraph style

myTFs .select();  
mySel = app.selection[0];  
myStory = mySel.parentStory; 
for (loop=0; loop<myStory.paragraphs.length; loop++)  
myStory.paragraphs[loop].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
var style = app.activeDocument.paragraphStyles.item("[Basic Paragraph]"); 
style.pointSize=12;

//--------------------------------------------------------------------------------------

// Last Fit frame to content

myTFs .select();  
app.selection[0].fit(FitOptions.FRAME_TO_CONTENT)

//--------------------------------------------------------------------------------------
 
// Rename the Text frame

myTFs .select();  
app.selection[0].name = "Text frame"+ +new Date;



alert ("Table Created");




            