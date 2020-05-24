myDoc = app.documents.item(0);


try{
  myDoc.stories.everyItem().tables.everyItem().    
  cells.everyItem().texts.everyItem().    
  appliedLanguage = "English: UK";  
}
catch(e){}

try{
  myDoc.stories.everyItem().texts.everyItem().    
  appliedLanguage = "English: UK";  
}
catch(e){}

with(myDoc.textDefaults){
try{
appliedLanguage = "English: UK";
}
catch(e){}
hyphenation = false;
}
