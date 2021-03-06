﻿

//Sets PDF export options, then exports the active document as PDF.

main();

function main(){

    mySnippet();

    myTeardown();

}

//<snippet>

function mySnippet(){

    //<fragment>

    //Sets PDF export options, then exports the active document as PDF.

    var myDocument = app.activeDocument;

    var myFileName;

    with(app.pdfExportPreferences){

    //Basic PDF output options.

    pageRange = PageRange.allPages;

    acrobatCompatibility = AcrobatCompatibility.acrobat6;

    exportGuidesAndGrids = false;

    exportLayers = false;

    exportNonPrintingObjects = false;

    exportReaderSpreads = false;
    generateThumbnails = false;

    try{

    ignoreSpreadOverrides = false;

    }

    catch(e){}

    includeBookmarks = false;

    includeHyperlinks = true;

    includeICCProfiles = false;

    includeSlugWithPDF = false;

    includeStructure = false;

    interactiveElementsOption = InteractiveElementsOptions.doNotInclude;

    //Setting subsetFontsBelow to zero disallows font subsetting;

    //set subsetFontsBelow to some other value to use font subsetting.

    subsetFontsBelow = 100;

    //Bitmap compression/sampling/quality options.

    colorBitmapCompression = BitmapCompression.jpeg;

      colorBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;

         colorBitmapSamplingDPI = 300

    //thresholdToCompressColor is not needed in this example.

    //colorBitmapSamplingDPcolorBitmapSamplingDPI is not needed when colorBitmapSampling is set to

        //none.

    grayscaleBitmapCompression = BitmapCompression.jpeg;

    grayscaleBitmapQuality = CompressionQuality.maximum;

    grayscaleBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;

         grayscaleBitmapSamplingDPI = 300

    //thresholdToCompressGray is not needed in this example.

    //grayscaleBitmapSamplingDPI is not needed when grayscaleBitmapSampling is

        //set to none.

    monochromeBitmapCompression = BitmapCompression.NONE;

    monochromeBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;

        monochromeBitmapSamplingDPI = 1200

    //thresholdToCompressMonochrome is not needed in this example.

    //monochromeBitmapSamplingDPI is not needed when monochromeBitmapSampling

        //is set to none.

    //Other compression options.

    compressionType = PDFCompressionType.compressNone;

    compressTextAndLineArt = true;

cropImagesToFrames = true;

optimizePDF = true;

    //Printers marks and prepress options.

    //Get the bleed amounts from the document's bleed.

        var myDocumentPreferences = myDocument.documentPreferences;

    bleedBottom = myDocumentPreferences.documentBleedBottomOffset;

    bleedTop = myDocumentPreferences.documentBleedTopOffset;

    bleedInside = myDocumentPreferences.documentBleedInsideOrLeftOffset;

    bleedOutside = myDocumentPreferences.documentBleedOutsideOrRightOffset;

    //If any bleed area is greater than zero, then include bleed marks.

        if(bleedBottom && bleedTop && bleedInside && bleedInside){

    bleedMarks = true;

    }

    else{

    bleedMarks = false;

    }

    colorBars = false;

    colorTileSize = 128;

    grayTileSize = 128;

    cropMarks = false;

    omitBitmaps = false;

    omitEPS = false;

    omitPDF = false;

    pageInformationMarks = false;

    pageMarksOffset = "12 pt";

    pdfColorSpace = PDFColorSpace.unchangedColorSpace;

    //Default mark type.

    pdfMarkType = 1147563124;

    printerMarkWeight = PDFMarkWeight.p125pt;

    registrationMarks = false;

    try{

    simulateOverprint = false;

    }

    catch(e){}

    useDocumentBleedWithPDF = true;

    //Set viewPDF to true to open the PDF in Acrobat or Adobe Reader.

    viewPDF = true;

    }

    //Now export the document. You'll have to fill in your own file path.

if (myDocument.modified == false) {

    myFileName = myDocument.fullName + "";

    if (myFileName.indexOf(".indd") != -1) {

        var myRegularExpression = /.indd/gi;

        myFileName = myFileName.replace(myRegularExpression, ".pdf");

    }

myDocument.exportFile(ExportFormat.pdfType, new File(myFileName), false);

} else {

    alert("Save your file before continuing");

}

//</fragment>

}

//</snippet>

//<teardown>

function myTeardown(){

}

//</teardown>
