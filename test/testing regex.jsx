$.writeln("------------------------------")
var doc = app.activeDocument;
var myFilePath = decodeURI(doc.filePath);
//var myFilePathMatch = myFilePath.match(/^.*(\d\d\d\d\d.*)$/)[1];
//var mystring = E\Projects\2020\test\test 2\test3\05032_VITA_blah blah\05321 Resources\green\2\;
//var match = myFilePath.match(/(\d)/);
//var match2 = decodeURI(myFilePath).match(/(^.*?\d\d\d\d\d)/)[1];
//var match3 = decodeURI(myFilePath).match(/\d\d\d\d\d(?!.*\d)/);

$.writeln("myFilePath = " +myFilePath);

try{
if (myFilePath.match(/(.*)(\d\d\d\d\d .*$)/)[1] != null){
var jobFolder = myFilePath.match(/(.*)(\d\d\d\d\d .*$)/)[1];
$.writeln("true");

}else{
$.writeln("false")}}
catch(err){
//  $.writeln("error = " +err);
  $.writeln("false");
  var jobFolder = myFilePath;
}
$.writeln("jobFolder = " +jobFolder);

/*
$.writeln("myFilePath = " +myFilePath);
$.writeln("jobFolder = " +jobFolder);
$.writeln("myFilePathMatch = " +myFilePathMatch);


if (myFilePath = myFilePath.match(/^.*(\d\d\d\d\d.*){2}$/)){
  $.writeln("true")}
else{
  $.writeln("false")}
*/

//$.writeln("match = " +match);
//$.writeln("match2 = " +match2);
//$.writeln("jobFolder = " +jobFolder);
//$.writeln("match3 = " +match3[2]);
//$.writeln("mystring = " +mytring);
