/******************************************************************/
/*                                                                */
/*         Manual trick by Wadym Martynowski                      */
/*         https://www.linkedin.com/in/wadym-martynowski          */
/*         to get rid of unwanted text attributes                 */
/*         overriding paragraph style                             */
/*                                                                */
/*         JavaScript automated by Frédéric Robin                 */
/*         https://www.linkedin.com/in/robinfredericf/en          */
/*         http://robinfredericf.free.fr                          */
/*                                                                */
/*         Thanks for help to                                     */
/*         Uwe Laubender, Timothy Ariel Walden and                */
/*         especially Kasyan Servetsky http://kasyan.ho.com.ua    */
/*                                                                */
/*                                                                */
/******************************************************************/

#target "InDesign";
#targetengine PerfectionistOfStyles

$.localize = true;
$.locale = null;
//$.locale = "en";

var tip = {
    en: "This script is intended to be used while selecting (or placing the cursor in) some text with a paragraph/character style applied "
        +"and some unwanted overridden attributes that will be reverted to the style's values "
        +"for all occurrences where the same overrides affect the same style in the document.",
    fr: "Ce script est prévu pour être utilisé en sélectionnant (ou plaçant le curseur dans) du texte ayant un style de paragraphe/de caractère appliqué "
        +"et certains attributs affectés par des remplacements indésirables qui seront rétablis à la valeur du style "
        +"pour toutes les occurrences où les mêmes remplacements affectent le même style dans le document."
};


function main() {
    //if no document is open, the appropriate Error will be thrown  
    if (app.activeDocument.selection.length !== 1) { 
        throw new Error ({en:"Nothing or to many things selected.", fr:"Aucun ou trop d'éléments sélectionnés."}); 
    }  

    var s = app.activeDocument.selection[0];

    if (! s.hasOwnProperty('baselineShift')) { 
        throw new Error ({en:"No text selected.", fr:"Aucun texte sélectionné."}); 
    }
    
    var redefineParagraphStyle = app.menuActions.itemByID(8458);
    var redefineCharacterStyle = app.menuActions.itemByID(8459);
    var rootCStyle = app.activeDocument.characterStyles[0];
    var rootPStyle = app.activeDocument.paragraphStyles[0];
    var basicPStyle = app.activeDocument.paragraphStyles[1];
    
    var reftxt;
    function findOverride() {
        if ('characters' in s && s.characters.length) {
            //The selection could contain many various overrides that we won't handle all at once, so
            //we restrain the selection to its 1st character affected by any override so that the user 
            //will better understand which is the reference character used to clean up the overrides
            for (var i=0; i<=s.characters.length; i++) {
                if (i === s.characters.length) { return false; }
                if (s.characters[i].styleOverridden) { break; }
            }
            reftxt = s.characters[i];
            app.select(reftxt);
        } else {
            reftxt = s.insertionPoints[0];
            if (! reftxt.styleOverridden) { return false; }
        }
        //Sometimes styleOverridden is true although neither of the two "redefine style" actions is enabled (rootPStyle or rootCStyle is overridden).
        return (redefineParagraphStyle.enabled || redefineCharacterStyle.enabled);
    }
    if (! findOverride()) { throw new Error ({en:"No style override detected.", fr:"Pas de remplacement de style détecté."}); }
    var myCStyle = reftxt.appliedCharacterStyle;
    var myCStyleName = myCStyle.name;
    var myPStyle = reftxt.appliedParagraphStyle;
    var myPStyleName = myPStyle.name;
    
    var w = new Window ('dialog');
    w.add (
        'statictext', 
        undefined, 
        {
            fr:"Eliminer dans tout le document les remplacements de styles affectant la sélection, partout où les mêmes remplacements affectent ",
            en:"Suppress in all the document the style overrides affecting the selection, everywhere the same overrides affect "
        }, 
        {multiline:true}
    );
    var P_or_C = w.add (
        'dropdownlist',
        undefined,
        [
            {
                fr:"le même style de paragraphe : ",
                en:"the same paragraph style: "
            } + myPStyleName,
            {
                fr:"le même style de caractère : ",
                en:"the same character style: "
            } + myCStyleName
        ]
    );
    P_or_C.selection = (redefineCharacterStyle.enabled) ? 1 : 0;
    with (w.add ('group',undefined,undefined,{orientation:'row'})) {add('button',undefined,'Cancel');add('button',undefined,'OK');alignment='right';}
    
    if (redefineParagraphStyle.enabled && redefineCharacterStyle.enabled && w.show() !== 1) { return false; }
    
    
    function eradicateCurrentOverrides(tries) {
        
        if (P_or_C.selection.index === 0 && (redefineCharacterStyle.enabled || myCStyle !== rootCStyle)) {
            //required to avoid for example, 
            //“bold” attribute applied using a character style causing the overridden “bold” attributes to disappear elsewhere
            if (reftxt.characters.length) {
                reftxt = reftxt.insertionPoints.lastItem();
                app.select(reftxt);
            }
            reftxt.applyCharacterStyle(rootCStyle);
        }

        if (myPStyle.index > 0) {
            var myPStyleCopy = myPStyle.duplicate();
            
            if (tries === 2) {
                //routine for the particular case "Does not work.idml" submitted by Wadym on 3 january 2018
                //where some kind of invisible drop caps nested style prevents the deletion of language and character direction replacement
                myPStyle.basedOn = rootPStyle;
                for (var k in {bulletsCharacterStyle:1,dropCapStyle:1,numberingCharacterStyle:1}) {
                    if (k in myPStyle) { myPStyle[k] = rootCStyle; }
                }
                for (var k in {nestedGrepStyles:1,nestedLineStyles:1,nestedStyles:1}) {
                    if (! (k in myPStyle && myPStyle[k].length)) { continue; }
                    for (var i=myPStyle[k].length-1; i>=0; i--) {
                        if (! myPStyle[k][i].isValid) { continue; }
                        myPStyle[k][i].appliedCharacterStyle = rootCStyle; 
                        myPStyle[k][i].remove();
                    }
                }
            }
        }

        switch (P_or_C.selection.index) {
                
            case 0: // paragraph style
                redefineParagraphStyle.invoke();
                break;
            
            case 1: // character style
                var myCStyleCopy = myCStyle.duplicate();
                redefineCharacterStyle.invoke();
                myCStyle.remove(myCStyleCopy);
                myCStyleCopy.name = myCStyleName;
                myCStyle = myCStyleCopy;
                break;
        }
        if (myPStyle.index > 1) {
            myPStyle.remove(myPStyleCopy);
            myPStyleCopy.name = myPStyleName;
            myPStyle = myPStyleCopy;
        } else if (myPStyle === basicPStyle) {
            //Less reliable method enabling the use of the script on [Basic Paragraph] style
            //Doesn't restore all the nested style deleted in the mode 2 routine
            myPStyle.properties = myPStyleCopy.properties;
            myPStyleCopy.remove(myPStyle);
        }
        
        if (! reftxt.styleOverridden) { return 1; }
        if (myPStyle.index < 2) { return 1; }
        if (P_or_C.selection.index === 0 && redefineParagraphStyle.enabled) { return 2; }
        if (P_or_C.selection.index === 1 && redefineCharacterStyle.enabled) { return 2; }
        return 1;
    }

    if (eradicateCurrentOverrides(1) === 2) { eradicateCurrentOverrides(2); }
}

 
app.doScript(
    function() { 
        try { main(); } 
        catch(e) { alert(e + "\r\n" + tip); } 
    },
    ScriptLanguage.JAVASCRIPT,
    undefined,
    UndoModes.ENTIRE_SCRIPT,
    File($.fileName).name
);

