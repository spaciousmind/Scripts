//====================================================================
// PDFImportCropPref Reloaded
// (should work in ID CS/CS2/CS3/CS4/CS5/CS6/CC)
//====================================================================
(function(o,a,z,r,i,x,t,k)
{
    for(k in o) o.hasOwnProperty(k) &&
        (a['_'+z]=t=+o[k]) &&
        (a[z++]=k.substr(5).replace(r,' ')) &&
        (i||(x==t&&(i=z)));
 
    (((k='userInteractionLevel')in(o=app))?o:o.scriptPreferences)
        [k] = +UserInteractionLevels.interactWithAll;
 
    (t=o.dialogs).length && t.everyItem().destroy();
 
    r=(t=t.add({name:"Place PDF Crop Preference"}))
        .dialogColumns.add().dialogRows.add()
        .staticTexts.add({staticLabel:"Choose preference: "})
        .parent.dropdowns.add({stringList:a,selectedIndex:i-1});
 
    o.activate();
 
    t.show() &&
        (o.pdfPlacePreferences.pdfCrop=a['_'+r.selectedIndex]);
 
})(PDFCrop,[],0,/_/g,0,+app.pdfPlacePreferences.pdfCrop);
//PDF import crop preferences;