﻿/*
   Indesign Calendar Wizard
   Release 5.0.0

   Authored by by Scott Selberg
   March 11, 2006

   Subversion Revision: $Revision: 157 $
   Author: $Author: sselberg $
   Subversion Head URL: $HeadURL: svn+ssh://sselberg@svn.code.sf.net/p/calendarwizard/code/trunk/calendarWizard.js $

*/

/********************************************************************/
// Variable Declarations                                            
/********************************************************************/
var commonFilesDirectory = 'source-files';
var scriptName;
var scriptDirectory;
var fileNameAndPath;

var selector = new Object();

//splash = new Window( "palette" );
var splashWindow = new Window( "palette" );
with( splashWindow.add( "group{ orientation:'column' }") ){
   add( 'statictext' , undefined, "Loading Calendar Wizard.." );
   //add( "button", undefined, "OK" );
};
splashWindow.show();

//if( settings.bCS || settings.bCS2 )
if( String(app.version).split(".")[0] <= 4 )
{
   scriptName      = "calendarWizard.js";
   scriptDirectory = Folder.startup + "/Presets/Scripts/calendarWizard";
   fileNameAndPath = scriptDirectory + "/" + scriptName;
}
else
{
   fileNameAndPath = $.fileName;
   scriptName      = fileNameAndPath.substring( fileNameAndPath.lastIndexOf( "/" ) + 1 )
   scriptDirectory = fileNameAndPath.substring( 0, fileNameAndPath.lastIndexOf( "/" )  )
}

$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/common.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/gui.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/settings.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/language.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/styles.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/presets.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/parseUserInput.js" );
$.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/scriptUiPresets.js" );

var settings = initializeSettings( scriptName, scriptDirectory );

// --------------------------------------------------------------- //
// Main Application
// --------------------------------------------------------------- //
var bOK = CalendarWizardGui2( settings, splashWindow );
splashWindow.close( 0 );

if( bOK == 1 ){
   if( settings.bFitCalendarToFrame ){
      $.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/utilities.js" );
      fitCalendarToFrame( settings );
   } else if( settings.bRealignCalendars ){
      $.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/utilities.js" );
      realignCalendarTables( settings );
   } else {
      if( settings.bGridCalendar ){
         $.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/gridCalendar.js" );
      } else if( settings.bListCalendar ){
         $.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/listCalendar.js" );
      } else if( settings.bLineCalendar ){
         $.evalFile( scriptDirectory + "/" + commonFilesDirectory + "/lineCalendar.js" );
      }
      
      SetupAndCreateCalendar( settings );
   }
}
