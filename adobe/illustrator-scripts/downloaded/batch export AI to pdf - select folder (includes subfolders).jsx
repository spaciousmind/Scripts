#target illustrator  
  
main();  
  
//  
function main() {  
  
          var topLevel = Folder.selectDialog( 'Select the folder with Illustrator .ai fileList you want to convert to PDF' );  
  
          if ( topLevel != null ) {  
    
                    processDocs( recursiveFolders( topLevel, /\.ai$/i ), getPDFOptions() );  
    
          };  
  
};  
  
//  
function processDocs( aiFiles, opts ) {  
    
          var i, baseName, doc, saveFile;  
    
          for ( i = 0; i < aiFiles.length; i++ ) {  
    
                    doc = app.open( aiFiles[i] );  
    
                    baseName = decodeURI( doc.name.match( /(.*)\.[^\.]+$/ )[1] );  
    
                    saveFile = File( aiFiles[i].parent.fsName + '/' + baseName + '.pdf' );  
    
                    doc.saveAs( saveFile, opts );  
    
                    doc.close( SaveOptions.DONOTSAVECHANGES );  
    
          };  
    
};  
  
//  
function getPDFOptions() {  
    
    var pdfSaveOpts = new PDFSaveOptions();  
    
    pdfSaveOpts.acrobatLayers = true;  
    pdfSaveOpts.colorBars = false;  
    pdfSaveOpts.colorCompression = CompressionQuality.AUTOMATICJPEGHIGH;  
    pdfSaveOpts.compressArt = true;  
    pdfSaveOpts.embedICCProfile = true;  
    pdfSaveOpts.enablePlainText = true;  
    pdfSaveOpts.generateThumbnails = true;  
    pdfSaveOpts.optimization = true;  
    pdfSaveOpts.pageInformation = false;  
    pdfSaveOpts.preserveEditability = true;  
    
    return pdfSaveOpts;  
    
};  
  
//  
function recursiveFolders( fold, exp ) {  
    
          var fileList = Array(); // Our matching files…  
    
          getFiles( fold, exp, fileList );  
    
          return fileList;  
    
};  
  
//  
function getFiles( fold, exp, array ) {  
    
          var i, temp;  
    
          temp = Folder( fold ).getFiles(); // All files and folders…  
                       
          for ( i = 0; i < temp.length; i++ ) {  
    
                    if ( temp[i] instanceof File && RegExp( exp ).test( temp[i].fsName ) ) {  
    
                              array.push( temp[i] );  
    
                    };  
    
                    if ( temp[i] instanceof Folder ) {  
    
                              getFiles( temp[i].fsName, exp, array );  
    
                    };  
    
          };  
  
          return array;  
  