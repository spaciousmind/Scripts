//
// SizeLabels.jsx
//
// Version 0.0.4
//
// (C) 2012 Rorohiko Ltd.
// All rights reserved.
// By Kris Coppieters
// kris@rorohiko.com
//
//
// Installing:
//
// Unzip this .zip and move the .jsx file into your Scripts Panel folder inside your
// Scripts folder inside your InDesign application folder. 
//
// For more info see:
//
// http://indesignsecrets.com/how-to-install-scripts-in-indesign.php
//
// How it works:
//
// This script adds printing info labels to every frame. The labels are on a separate layer
// named "SizeLabels" so all of these added labels can be deleted again by simply deleting 
// the layer.
//
// If you move or resize items, simply re-run the script to update the labels.
//
// Before (re)running the script, you can define a paragraph style "SizeLabelStyle".
// This style will be applied to all the contents of the labels.
//
// Before (re)running the script, you can define an object style "SizeLabelObjectStyle".
// This object style will be applied to all label frames - so if you want a specific background
// fill or frame, do it via this object style.
//
// You can change the units of the size labels. I've set it to inches. Change the line below that has
// kUnitToUse - you can use:
// MeasurementUnits.CENTIMETERS
// MeasurementUnits.CICERO
// MeasurementUnits.INCHES
// MeasurementUnits.MILLIMETERS
// MeasurementUnits.PICAS
// MeasurementUnits.PIXELS
// MeasurementUnits.POINTS
//
// By default the script will not attempt to label 'nested' frames. If you want to also label
// nested frames (e.g. inline frames, anchored frames, frames pasted into frames,...) change the line
// below to read:
// kLabelNestedItems = 1
//
// If you want a specific frame to remain unlabeled, you can use the Script Label palette to
// assign a script label "ignore" to this frame. The script will then not label this frame until 
// the script label is removed again.
//
// Change the lines with kDontLabelImageFrames, kDontLabelTextFrames, kDontLabelOtherFrames
// below if you want to limit the labeling to only certain types of frames: change the '0'
// into '1' to enable these options.
// 
// Change the line with kShowImageFileName if you want to also show image names in addition to the
// size for image frames.
// 
// Small frames are not labeled - the cut off point is currently any frame less than 0.1 inch high
// or 0.1 inch wide. You can change the cutoff point by adjusting the lines with kDontLabelBelowWidth
// or kDontLabelBelowHeight below.
//
// For debugging:
//
// To de-instrument (comment LogEntry/LogExit): do a global find change and
// replace pattern       /**///      with pattern    /**///
// To instrument (uncomment LogEntry/LogExit): do a global find change and
// replace pattern       /**///      with pattern    /**///
//

//#targetengine "com.rorohiko.indesignscripts.SizeLabels2"

var gErr;
var gScriptFile;
var gCaches;

try
{
    if (app.activeScript instanceof File)
    {
        var gScriptFile = app.activeScript;
    }
}
catch (gErr)
{
}

if (typeof(kLogLevel) == "undefined")
{
    const kLogLevel = 5;
    const kMaxLogNestLevel = 5;
    const kLogToMessageBox = 0;
    const kLogToConsole = 0;
    const kLogToFile = 0;
    const kLogFileName = "SizeLabels.log";
    const kIgnoreFrameLabel = "ignore";
    const kSizeLabelLayerName = "SizeLabels";
    const kLabelNestedItems = 0;
    const kDontLabelImageFrames = 0;
    const kDontLabelTextFrames = 0;
    const kDontLabelOtherFrames = 0;
    const kUnitToUse = MeasurementUnits.INCHES;
    const kShowImageFileName = 0; // Set this to 1 to prepend the image file name to the label
    // All measurements below are expressed in kUnitToUse (e.g. inches if MeasurementUnits.INCHES is used)
    const kRoundToDecimals = 2;
    // Separators to use between items - e.g. MyImage.jpg - 7.22 x 9.34
    const kSeparatorBetweenNameAndSize = " - ";
    const kSeparatorBetweenWidthAndHeight = " x ";
    const kDontLabelBelowWidth = 0.1; // Expressed in kUnitToUse
    const kDontLabelBelowHeight = 0.1; // Expressed in kUnitToUse
    const kLabelStyleName = "SizeLabelStyle";
    const kLabelObjectStyleName = "SizeLabelObjectStyle";
    const kLabelHeight = 0.3; // Expressed in kUnitToUse
    const kLabelWidth = 2.5; // Expressed in kUnitToUse (e.g. inch).
}

var gRunState =
{
    logToMessageBox: kLogToMessageBox,
    logToConsole: kLogToConsole,
    logToFile: kLogToFile,
    functionNestLevel: 0,
    logFunctionEntry: true,
    logFunctionExit: true,
    logLevel: kLogLevel,
    logFileName: kLogFileName
};

Main();

// ****************

function ConvertToFrame(thePageItem)
{
    /**///LogEntry("ConvertToFrame");
    var retVal = thePageItem.getElements()[0];
    /**///LogExit("ConvertToFrame");
    
    return retVal;
}
 
// ****************

function CollectionToArray(theCollection)
{
    /**///LogEntry("CollectionToArray");
    var retVal = theCollection.everyItem().getElements().slice(0);
    /**///LogExit("CollectionToArray");
    
    return retVal;
}

// ****************

function GetImageFile(pageItem)
{
    /**///LogEntry("GetImageFile");

    var imageFile = null;
    do 
    {
        try
        {
            pageItem = ConvertToFrame(pageItem);

            if ( !("allGraphics" in pageItem))
            {
				break;
            }
		   
		   var allGraphics = pageItem.allGraphics.slice(0);
		   if (allGraphics.length == 0)
		   {
			   break;
		   }
	   
		   var graphic = allGraphics[0];
		   var link = graphic.itemLink;
		   imageFile = new File(link.filePath);
        }
        catch (gErr)
        {            
        }
    }
    while (false);

    /**///LogExit("GetImageFile");

    return imageFile;
} 

// ****************

function GetImageName(pageItem)
{
    /**///LogEntry("GetImageName");

    var imageName = "";
    do 
    {
        var imageFile = GetImageFile(pageItem);
        if (imageFile == null)
        {
            break;
        }

        imageName = imageFile.displayName;
    }
    while (false);

    /**///LogExit("GetImageName");

    return imageName;
} 

// ****************

function GetOuterPageItem(pageItem)
{
    /**///LogEntry("GetOuterPageItem");
    
    var retVal = null;
    do
    {
        try
        {
            retVal = pageItem.parent;
            if (retVal instanceof Spread || retVal instanceof Page)
            {
                retVal = pageItem;
                break;
            }
        
            if (retVal instanceof Character)
            {
                retVal = GetOuterPageItem(retVal.parentTextFrames[0]);              
                break;
            }
        }
        catch (gErr)
        {
            retVal = null;
        }
    }
    while (false);

    /**///LogExit("GetOuterPageItem");
    
    return retVal;
}
 
// ****************

function LogMessage(message,collapseLines)
{
    if (gRunState.logToConsole)
    {
        $.writeln(message);
    }
    if (gRunState.logToFile)
    {
        var logFile = new File(gScriptFile.parent + "/" + gRunState.logFileName);
        var now = new Date();
        logFile.open("a");
        logFile.write(now.toString() + ": " + message + "\n");
        logFile.close();
    }
    if (gRunState.logToMessageBox)
    {
        alert(message);
    }
}

// ****************

function LogEntry(message)
{
    if (gRunState.logFunctionEntry)
    {
        if (gRunState.functionNestLevel < kMaxLogNestLevel) {
            for (var idx = 0; idx < gRunState.functionNestLevel; idx++)
            {
                message = "  " + message;
            }
            LogNote(message + "<",true);
        }
    }
    gRunState.functionNestLevel++;
}

// ****************

function LogError(message)
{
    if (gRunState.logLevel >= 1)
    {
        LogMessage("***ERROR***: "+message,false);
    }
}

// ****************

function LogExit(message)
{
    gRunState.functionNestLevel--;
    if (gRunState.functionNestLevel < 0)
    {
        LogError("LogExit: unbalanced function nesting");
    }
    if (gRunState.logFunctionExit)
    {
        if (gRunState.functionNestLevel < kMaxLogNestLevel) {
            for (var idx = 0; idx < gRunState.functionNestLevel; idx++)
            {
                message = "  " + message;
            }
            LogNote(message + ">",true);
        }
    }
}

// ****************

function LogNote(message)
{
    if (gRunState.logLevel >= 3)
    {
        LogMessage("Note: "+message,false);
    }
}

// ****************

function LogWarning(message)
{
    if (gRunState.logLevel >= 2)
    {
        LogMessage("WARNING: "+message,false);
    }
}

// ****************

function Main()
{
    /**///LogEntry("Main");
    
    var savedUserInteractionLevel = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    
    do 
    {
        try 
        {
            var activeDocument = app.activeDocument;
            if (! (activeDocument instanceof Document)) 
            {
                LogError("Main: activeDocument is not a Document");
                break;
            }
            
            var savedHorizontalMeasurementUnits = activeDocument.viewPreferences.horizontalMeasurementUnits;
            activeDocument.viewPreferences.horizontalMeasurementUnits = kUnitToUse;
            var savedVerticalMeasurementUnits = activeDocument.viewPreferences.verticalMeasurementUnits;
            activeDocument.viewPreferences.verticalMeasurementUnits = kUnitToUse;
            var savedRulerOrigin = activeDocument.viewPreferences.rulerOrigin;
            activeDocument.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
            do 
            {
                try 
                {
                    ProcessFrames(activeDocument);
                }
                catch (gErr) 
                {
                    alert("The script encountered a situation it does not know how to handle. The error it received into says '" + gErr + "' in Main()");
                }
            }
            while (false);
            activeDocument.viewPreferences.rulerOrigin = savedRulerOrigin;
            activeDocument.viewPreferences.horizontalMeasurementUnits = savedHorizontalMeasurementUnits;
            activeDocument.viewPreferences.verticalMeasurementUnits = savedVerticalMeasurementUnits;
        }
        catch (gErr)
        {
            alert("The script encountered a situation it does not know how to handle. The error it received into says '" + gErr + "' in Main()");
            LogError("Main throws " + gErr);
        }
    }
    while (false);
    app.scriptPreferences.userInteractionLevel = savedUserInteractionLevel;

    /**///LogExit("Main");
}

// ****************

function ProcessFrames(doc)
{
    /**///LogEntry("ProcessFrames");

    var err;
    do 
    {
        if (! (doc instanceof Document)) 
        {
          LogError("ProcessFrames: doc should be a Document");
          break;
        }
        
        try 
        {
            var existingLayer = doc.layers.itemByName(kSizeLabelLayerName);
            existingLayer.id;
            existingLayer.remove();
        }
        catch (err)
        {
        }
        
        if (kLabelNestedItems) 
        {
            var pageItems = doc.allPageItems.slice(0);
        }
        else
        {
            var pageItems = CollectionToArray(doc.pageItems);
        }
        
        var frameReferences = [];
        for (var pageItemIdx = 0; pageItemIdx < pageItems.length; pageItemIdx++)
        {
            do 
            {
                var pageItem = pageItems[pageItemIdx];
                if (pageItem.itemLayer.name == kSizeLabelLayerName)
                {
                    break;
                }

                var pageItem = ConvertToFrame(pageItem);
                if (pageItem instanceof TextFrame)
                {
                    if (kDontLabelTextFrames) 
                    {
                        break;
                    }
                }
                else if (pageItem instanceof Graphic)
                {
                    if (kDontLabelImageFrames) 
                    {
                        break;
                    }
                }
                else 
                {
                    if (kDontLabelOtherFrames) 
                    {
                        break;
                    }
                }
                
                if (pageItem.label.toLowerCase() == kIgnoreFrameLabel) 
                {
                    break;
                }
            
                var width = pageItem.geometricBounds[3] - pageItem.geometricBounds[1];
                var height = pageItem.geometricBounds[2] - pageItem.geometricBounds[0];

                if (width < kDontLabelBelowWidth) 
                {
                    break;
                }
                if (height < kDontLabelBelowHeight) 
                {
                    break;
                }

                frameReferences.push(pageItem);
            }
            while (false);
        }
        
        var sizeLabelLayer = doc.layers.add({ name: kSizeLabelLayerName });
        
        for (var pageItemIdx = 0; pageItemIdx < frameReferences.length; pageItemIdx++)
        {
            try 
            {
                var pageItem = frameReferences[pageItemIdx];
                var width = pageItem.geometricBounds[3] - pageItem.geometricBounds[1];
                var height = pageItem.geometricBounds[2] - pageItem.geometricBounds[0];
                var labelItem = doc.textFrames.add(null, LocationOptions.BEFORE, GetOuterPageItem(pageItem));
                labelItem.itemLayer = sizeLabelLayer;
                
                var labelText = "";
                if (kShowImageFileName)
                {
                    var imageName = GetImageName(pageItem);
                    if (imageName != "")
                    {
                        labelText += imageName + kSeparatorBetweenNameAndSize;
                    }
                }
                labelText += RoundString(width, kRoundToDecimals) + kSeparatorBetweenWidthAndHeight + RoundString(height, kRoundToDecimals);

                labelItem.contents = labelText;
                var xPos = pageItem.geometricBounds[1];
                var yPos = pageItem.geometricBounds[0] - kLabelHeight;
                labelItem.geometricBounds = [ yPos, xPos, yPos + kLabelHeight, xPos + kLabelWidth ];
                try 
                {
                    labelItem.parentStory.characters.everyItem().appliedCharacterStyle = doc.characterStyles.item(0);
                }
                catch (err)
                {
                }
            
                try 
                {
                    labelItem.parentStory.paragraphs.everyItem().appliedParagraphStyle = kLabelStyleName;
                }
                catch (err)
                {
                }
                
                try 
                {
                    labelItem.appliedObjectStyle = doc.objectStyles.itemByName(kLabelObjectStyleName);
                }
                catch (err)
                {
                }
            }
            catch (err)
            {
            }           
        }
        
    }
    while (false);  
    
    /**///LogExit("ProcessFrames");
}

// ****************

function RoundString(numVal, decimals)
{
    
    /**///LogEntry("Round");
    var retVal = Math.round(numVal * Math.pow(10,decimals)) + "";
    retVal = retVal.substring(0,retVal.length-decimals) + "." + retVal.substring(retVal.length-decimals);
    /**///LogExit("Round");
    
    return retVal;
}


