$.writeln("----------------------------");
var runscript = {};
runscript.script_dir = "/e/Projects/Scripts/adobe/indesign-scripts"; //PUT SCRIPTS DIR IN HERE
$.writeln(runscript.script_dir);
runscript.history = get_history();
$.writeln("runscript history = "+runscript.history.lastScript);

myScript = File (runscript.script_dir + '/' + runscript.history.lastScript);
$.writeln("myScript ="+myScript);

try{
  app.doScript(myScript);}
  catch(e){
    alert (e.message + "\r(line " + e.line + ")");
  }


//----------------------------------------------------------
// Read the settings file

function get_history () {
  var f = File(runscript.script_dir+'/runscript.txt');
  if (f.exists) {
    return $.evalFile (f);
  }
}
