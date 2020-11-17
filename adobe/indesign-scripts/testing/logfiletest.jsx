var logFile = {};
logFile.dir = "/e/Projects/Scripts/adobe/indesign-scripts/testing";
logFile.name = "test-logFile.txt"
logFile.path = logFile.dir + "/" + logFile.name;
logFile.file = new File( logFile.path );
logFile.contents = get_contents();

//- get history
function get_contents (){
  logFile.file.open('r')
  return logFile.file.read();
    }


// --- add to log file
	function log_item (item) {
		logFile.file.open("w");
    logFile.file.write (item);
    logFile.file.write ( "\r" + logFile.contents);
		logFile.file.close();
	}

log_item ( "test" )
$.writeln(logFile.contents);
