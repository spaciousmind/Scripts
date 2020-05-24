/******************************************************************/
/*                                                                */
/*            Author: Frédéric ROBIN (robinfredericf)             */
/*                                                                */
/*        http://robinfredericf.free.fr                           */
/*        http://www.linkedin.com/in/robinfredericf/en            */
/*        http://fr.viadeo.com/fr/profile/robinfredericf          */
/*                                                                */
/*                    robinfredericf@gmail.com                    */
/*                                                                */
/******************************************************************/

#target "InDesign"


var extraOffset = 10;
/*
    ↳ Changer la valeur si besoin
 */


function isOutOfPage (item) {
    try {
        return ! ('parentPage' in item && item.parentPage !== null);
    } catch (e) { return true; }
}


function getParentPageOrNearestPage (item) {
     /* Nearest page for item out of page */
    if ('parentPage' in item && item.parentPage !== null) { return item.parentPage; }
    
    /*
        Si un pageItem n'a pas de parentPage il est probablement en dehors d'une page sur la table de montage. 
        En remontant dans la hiérarchie de ses parents on finira par atteindre une planche (Spread/MasterSpread). 
        Dans le cas d'un objet ancré il faut remonter dans ses parents en bifurquant vers parentTextFrames[0] 
        sans quoi ses parents seront Character > Story > Document > Application 
    */
    if ('parentTextFrames' in item) { return getParentPageOrNearestPage (item.parentTextFrames[0]); }
    
    /* Cas d’un objet sur le plan de montage */
    if (/(Master)?Spread/.test(item.parent.constructor.name)) {
        var spread = item.parent;
        /*Cas ou l’objet est dans le plan de montage à gauche ou à droite des pages*/
        if (item.geometricBounds[3] < spread.pages.firstItem().bounds[1]) {
            return spread.pages.firstItem();
        }
        if (item.geometricBounds[1] > spread.pages.lastItem().bounds[3]) {
            return spread.pages.lastItem();
        }
        /*Cas ou l’objet est dans le plan de montage au dessus ou en dessous des pages*/
        for (var i=0; i<spread.pages.length; i++) {
            if (item.geometricBounds[1] < spread.pages[i].bounds[3]) {
                return spread.pages[i];
            }
        }
    }
    
    /* Fallback */
    //$.writeln (item.constructor.name);
    switch (item.constructor.name) {
        case 'Document' :     return item.pages[0];
        case 'MasterSpread' : return item.pages[0];
        case 'Spread' :       return item.pages[0];
        case 'Page' :         return item;
        default: return getParentPageOrNearestPage (item.parent);
    }
}

function main() {

    var myDoc = app.activeDocument;
    var mySpread, myItems;
    if (app.selection.length) {
        myItems =  app.selection;
        mySpread = getParentPageOrNearestPage(myItems[0]).parent;
    } else {
        mySpread = app.layoutWindows[0].activePage.parent;
        var theItems = mySpread.pageItems;
        myItems = [];
        for (var i=0; i<theItems.length; i++) {
            if (
                //theItems[i].isValid && 
                (! theItems[i].locked) && 
                (! theItems[i].itemLayer.locked) && 
                theItems[i].visible && 
                theItems[i].itemLayer.visible &&
                (! isOutOfPage(theItems[i]))
            ) {
                myItems.push(theItems[i]);
            }
        }
    }
    
    var LeftRightWatershedX = mySpread.pages.firstItem().bounds[1];
    for (var i=0; i<mySpread.pages.length; i++) {
        if (mySpread.pages[i].side == PageSideOptions.LEFT_HAND) {
            LeftRightWatershedX = mySpread.pages[i].bounds[3];
        }
    }
    
    var dX, myPBM;
    
    for (var i=myItems.length-1; i>=0; i--) {
        
        var myPage = getParentPageOrNearestPage(myItems[i]);
        if (! myPage) { continue; }
       //var myPW = myPage.bounds[3] - myPage.bounds[1];
       
        if (myPage.side === PageSideOptions.LEFT_HAND) {
            dX = LeftRightWatershedX - mySpread.pages.firstItem().bounds[1];
            
        } else /* if(myActivePage.side == PageSideOptions.RIGHT_HAND || myActivePage.side == PageSideOptions.SINGLE_SIDED) */ {
            dX = mySpread.pages.lastItem().bounds[3] - LeftRightWatershedX;
        }
        
        /*
            Contrairement aux versions précédentes où l’on ajoutait à dX la largeur de la marge extérieure 
            de fond perdu/ligne-bloc de gauche pour les pages de gauche et celle de droite pour les pages de 
            droite/sans vis-à-vis, on ajoute désormais systématiquement la largeur des deux marges extérieures 
            quelle que soit le côté de la page afin d’éviter qu’un bloc dépassant des deux côtés sur une page 
            sans vis à vis ne continue à dépasser dans la zone de fond perdu/ligne-bloc après déplacement 
            sur la table de montage et ne soit visible dans la bleed/media box du pdf et que la valeur de 
            décalage soit la même aussi bien pour 3 types de pages (gauche/droite/sans vis à vis) de façon à 
            permettre aux éléments d’être replacés sur la page au même endroit après modification du nombre 
            de pages des planches
        */
        dX += Math.max (
            myDoc.documentPreferences.documentBleedInsideOrLeftOffset,
            myDoc.documentPreferences.slugInsideOrLeftOffset
        );
        dX += Math.max (
            myDoc.documentPreferences.documentBleedOutsideOrRightOffset,
            myDoc.documentPreferences.slugRightOrOutsideOffset
        );
        
        dX += extraOffset;
        
        myPBM = myDoc.pasteboardPreferences.pasteboardMargins;
        if (myPBM[0] < dX + extraOffset) {
            myDoc.pasteboardPreferences.pasteboardMargins = [dX + extraOffset, myPBM[1]];
        }
        
        if (myPage.side === PageSideOptions.LEFT_HAND) {
            dX *= -1; // dX négatif => vers la gauche
        }
        
        if (isOutOfPage(myItems[i])) { dX *= -1; }
            
        myItems[i].move(
            undefined, // "move by"
            [dX, 0]
        );
    }
}

app.doScript(
    function() { main() ; },
    ScriptLanguage.JAVASCRIPT,
    undefined,
    UndoModes.ENTIRE_SCRIPT,
    File($.fileName).name
);
