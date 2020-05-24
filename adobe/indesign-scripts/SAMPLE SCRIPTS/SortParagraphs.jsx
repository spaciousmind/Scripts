//SortParagraphs.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "SortParagraphs.jsx" 3.0.0 15 December 2009
*/
//Sorts the paragraphs in the selection in alphabetical order.
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
//
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		if(app.selection.length > 0){
			switch(app.selection[0].constructor.name){
				case "Text":
				case "TextColumn":
				case "TextFrame":
					if(app.selection[0].paragraphs.length > 1){
						myDisplayDialog();
					}
					else{
						alert("Please select at least two paragraphs of text (or a text frame) try again.");
					}
					break;
				case "Cell":
				case "Row":
				case "Table":
				case "Column":
					alert("This script cannot sort table rows, columns, or cells.\rTry converting the table to text, sorting \rthe text, and then converting back to a table.");
					break;
				default:
					alert("Please select at least two paragraphs of text (or a text frame) try again.");
			}
		}
		else{
			alert("Please select at least two paragraphs of text (or a text frame) try again.");
		}
	}
	else{
		alert("No documents are open. Please open a document and try again.");
	}
}
function myDisplayDialog(){
	var myDialog = app.dialogs.add({name:"Sort Options"});
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel:"Sort Method:"});
			}
			with(dialogColumns.add()){
				var mySortMethodDropdown = dropdowns.add({stringList:["Ignore Formatting (faster)", "Retain Formatting (slower)"], selectedIndex:0});
			}		
		}
		with(dialogRows.add()){
			var myIgnoreSpacesCheckbox = checkboxControls.add({staticLabel:"Ignore Spaces", checkedState:true});
		}
		with(dialogRows.add()){
			var myReverseSortCheckbox = checkboxControls.add({staticLabel:"Reverse Sort", checkedState:false});
		}
	}
	var myResult = myDialog.show();
	if(myResult == true){
		var mySortMethod = mySortMethodDropdown.selectedIndex;
		var myIgnoreSpaces = myIgnoreSpacesCheckbox.checkedState;
		var myReverseSort = myReverseSortCheckbox.checkedState;
		myDialog.destroy();
		mySortParagraphs(mySortMethod, myIgnoreSpaces, myReverseSort);
	}
	else{
		myDialog.destroy();
	}
}
function mySortParagraphs(mySortMethod, myIgnoreSpaces, myReverseSort){
	var myParagraphs, myCleanUp, myItemMoved, myCounter, myStringA, myStringB;
	if(app.selection[0].constructor.name == "TextFrame"){
		myParagraphs = app.selection[0].paragraphs;
	}
	else{
		if((app.selection[0].contents == "")||(app.selection[0].paragraphs.length <= 1)){
			myParagraphs = app.selection[0].parentTextFrames[0].paragraphs;
		}
		else{
			myParagraphs = app.selection[0].paragraphs;
		}
	}
	//If the last paragraph in the selection is the last paragraph of the story,
	//and if the last paragraph does not end in a carriage return character,
	//then add a carriage return character at the end of the last paragraph.
	if(myParagraphs.item(0).parentStory.insertionPoints.item(-1).index == myParagraphs.item(-1).insertionPoints.item(-1).index){
		myParagraphs.item(-1).insertionPoints.item(-1).contents = "\r";
		myCleanUp = true;
	}
	else{
		myCleanUp = false;
	}
	//Switch statement added here to allow for others to add custom sort methods. To do this,
	//add another item to the dropdown menu in the dialog function, then add a corresponding
	//case in the switch below.
	switch(mySortMethod){
		case 0:
			//JavaScript sort:
			var myString = "";
			var myArray = myParagraphs.everyItem().contents;
			if(myIgnoreSpaces != true){
				if(myReverseSort != true){
					myArray = myArray.sort(mySort);
				}
				else{
					myArray = myArray.sort(myReverseSort);
				}
			}
			else{
				if(myReverseSort != true){
					myArray = myArray.sort(mySortIgnoringSpaces);
				}
				else{
					myArray = myArray.sort(myReverseSortIgnoringSpaces);
				}
			}
			for(myCounter = 0; myCounter < myArray.length; myCounter ++){
				myString += myArray[myCounter];
			}
			var myStartCharacter = myParagraphs.item(0).characters.item(0);
			var myEndCharacter = myParagraphs.item(-1).characters.item(-1);
			var myText = myParagraphs.item(0).parentStory.texts.itemByRange(myStartCharacter, myEndCharacter);
			//Replace the contents with the string;
			myText.contents = myString;
			break;
		case 1:
			//Simple bubble sort (demonstrates the paragraph.move() method):
			if(myReverseSort != true){
				do{
					myItemMoved = false;
					myCounter = 0;
					do{
						myStringA = myParagraphs.item(myCounter).contents.toLowerCase();
						myStringB = myParagraphs.item(myCounter+1).contents.toLowerCase();
						if(myIgnoreSpaces == true){
							myStringA = myStringA.replace(/\s/gi, "");
							myStringB = myStringB.replace(/\s/gi, "");
						}
						if(myStringA > myStringB){
							myParagraphs.item(myCounter).move(LocationOptions.after, myParagraphs.item(myCounter+1));
							myItemMoved = true;
						}
						myCounter ++;
						}while (myCounter < myParagraphs.length-1);	
					myCounter = myParagraphs.length-1;
					do{
						myStringA = myParagraphs.item(myCounter).contents.toLowerCase();
						myStringB = myParagraphs.item(myCounter-1).contents.toLowerCase();
						if(myIgnoreSpaces == true){
							myStringA = myStringA.replace(/\s/gi, "");
							myStringB = myStringB.replace(/\s/gi, "");
						}
						if(myStringA < myStringB){
							myParagraphs.item(myCounter).move(LocationOptions.before, myParagraphs.item(myCounter-1));
							myItemMoved = true;
						}
						myCounter --;
					}while(myCounter > 1);
				}while(myItemMoved != false);
			}
			else{
				do{
					myItemMoved = false;
					myCounter = 0;
					do{
						myStringA = myParagraphs.item(myCounter).contents.toLowerCase();
						myStringB = myParagraphs.item(myCounter+1).contents.toLowerCase();
						if(myIgnoreSpaces == true){
							myStringA = myStringA.replace(/\s/gi, "");
							myStringB = myStringB.replace(/\s/gi, "");
						}
						if(myStringA < myStringB){
							myParagraphs.item(myCounter).move(LocationOptions.after, myParagraphs.item(myCounter+1));
							myItemMoved = true;
						}
						myCounter ++;
						}while (myCounter < myParagraphs.length-1);	
					myCounter = myParagraphs.length-1;
					do{
						myStringA = myParagraphs.item(myCounter).contents.toLowerCase();
						myStringB = myParagraphs.item(myCounter-1).contents.toLowerCase();
						if(myIgnoreSpaces == true){
							myStringA = myStringA.replace(/\s/gi, "");
							myStringB = myStringB.replace(/\s/gi, "");
						}
						if(myStringA > myStringB){
							myParagraphs.item(myCounter).move(LocationOptions.before, myParagraphs.item(myCounter-1));
							myItemMoved = true;
						}
						myCounter --;
					}while(myCounter > 1);
				}while(myItemMoved != false);				
			}
			break;
			//User-defined cases can be added here.
	}
	//If we added a return at the end of the story, we should now
	//remove the extra return at the end of the story.
	if(myCleanUp == true){
		myParagraphs.item(0).parentStory.characters.item(-1).remove();
	}
}
function mySort(a, b){
	a = a.toLowerCase();
	b = b.toLowerCase();
	if(a > b){
		return 1;
	}
	if(a < b){
		return -1;
	}
	return 0;
}
function mySortIgnoringSpaces(a, b){
	var myRegExp = /\s/gi;
	a = a.toLowerCase().replace(myRegExp, "");
	b = b.toLowerCase().replace(myRegExp, "");
	if(a > b){
		return 1;
	}
	if(a < b){
		return -1;
	}
	return 0;
}
function myReverseSort(a, b){
	a = a.toLowerCase();
	b = b.toLowerCase();
	if(a > b){
		return -1;
	}
	if(a < b){
		return 1;
	}
	return 0;
}
function myReverseSortIgnoringSpaces(a, b){
	var myRegExp = /\s/gi;
	a = a.toLowerCase().replace(myRegExp, "");
	b = b.toLowerCase().replace(myRegExp, "");
	if(a > b){
		return -1;
	}
	if(a < b){
		return 1;
	}
	return 0;
}