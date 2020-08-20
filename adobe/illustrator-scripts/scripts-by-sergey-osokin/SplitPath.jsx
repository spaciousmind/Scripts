/*
  SplitPath.jsx for Adobe Illustrator
  Description: Script for subtract Shapes from Paths. Pathfinder in Illustrator does not do it =)
  Requirements: Adobe Illustrator CS6 and above
  Date: August, 2018
  Author: Sergey Osokin, email: hi@sergosokin.ru
  ============================================================================
  Installation: https://github.com/creold/illustrator-scripts#how-to-run-scripts
  ============================================================================
  Versions:
  0.1 Initial version (old name 'PathSubtract'). Manual preparation document. 2 separate script files for run.
  1.0 Two script files merged in one. Added GUI: choose 2 methods — analogues of the Pathfinder panel.
  ============================================================================
  Donate (optional): If you find this script helpful, you can buy me a coffee
                     via PayPal http://www.paypal.me/osokin/usd
  ============================================================================
  NOTICE:
  Tested with Adobe Illustrator CC 2018/2019 (Mac/Win).
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  ============================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ============================================================================
  Check other author's scripts: https://github.com/creold
*/

//@target illustrator

// Global variables
var SCRIPT_NAME = 'SplitPath',
    SCRIPT_VERSION = 'v.1.0';

if (app.documents.length > 0) {
    var doc = app.activeDocument,
        fillOk = false,
        rectIntersect;
}

function main() {
    if (app.documents.length == 0) {
        alert('Error: \nOpen a document and try again.');
        return;
    }

    if ((app.version.substr(0, 2)) < 16) {
        alert('Error: \nSorry, ' + SCRIPT_NAME + ' script only works in versions CS6 (v16) and above.\n' + 'You are using Adobe Illustrator v' + app.version.substr(0, 2));
        return;
    }

    if (doc.selection.length == 0) {
        alert('Error: \nPlease, select two or more not grouped objects.');
        return;
    }

    if (chkFill(doc.selection) == false) {
        alert(SCRIPT_NAME + ' Error: \nPlease, fill the mask object in any color.');
        return;
    }

    // Create Main Window
    var win = new Window('dialog', SCRIPT_NAME + ' ' + SCRIPT_VERSION, undefined);
    win.orientation = 'column';
    win.alignChild = ['fill', 'fill'];

    // Split method
    var chooseMethod = win.add('panel', undefined, 'What to do?');
    chooseMethod.orientation = 'row';
    chooseMethod.alignChild = ['fill', 'fill'];
    chooseMethod.margins = [10, 20, 10, 10];
    var minusRadio = chooseMethod.add('radiobutton', undefined, 'Minus Front'),
        intersectRadio = chooseMethod.add('radiobutton', undefined, 'Intersect');
    minusRadio.value = true;

    // Buttons
    var btns = win.add('group');
    btns.alignChild = ['fill', 'fill'];
    btns.orientation = 'row';
    var cancel = btns.add('button', undefined, 'Cancel', {name: 'cancel'});
    cancel.helpTip = 'Press Esc to Close';
    var ok = btns.add('button', undefined, 'OK', {name: 'ok'});
    ok.helpTip = 'Press Enter to Run';
    ok.active = true;

    var copyright = win.add('statictext', undefined, '\u00A9 Sergey Osokin, sergosokin.ru');
    copyright.justify = 'center';
    copyright.enabled = false;

    cancel.onClick = function () {
        win.close();
    }

    ok.onClick = function () {
        try {
            if (minusRadio.value) {
                pathSubtract();
            } else {
                pathIntersect();
            }
        } catch (e) {
            //showError(e);
        }
        win.close();
    }

    win.center();
    win.show();
}

// Minus Front method
function pathSubtract() {
    prepare(doc.selection);
    expand(doc.selection);
}

// Intersect method
function pathIntersect() {
    var saveSel = new Array(),
        saveFill = new Array();

    prepare(doc.selection);
    for (var k = 0; k < doc.selection.length; k++) {
        var item = doc.selection[k];
        if (item.filled && item.closed) {
            saveFill.push(item);
        } else if (item.typename === 'CompoundPathItem'
            && item.pathItems[0].filled && item.pathItems[0].closed) {
            saveFill.push(item);
        } else if (!item.closed) {
            saveSel.push(item);
        }
    }

    addRectIntersect();
    deselect();

    for (var l = 0; l < saveFill.length; l++) {
        saveFill[l].selected = true;
    }
    rectIntersect.selected = true;
    app.executeMenuCommand('group');
    app.executeMenuCommand('Live Pathfinder Minus Back');
    app.executeMenuCommand('expandStyle');
    app.executeMenuCommand('ungroup');

    for (var j = 0; j < saveSel.length; j++) {
        saveSel[j].selected = true;
    }
    expand(doc.selection);
}

// Searching unfilled objects
function chkFill(obj) {
    for (var s = 0; s < obj.length; s++) {
        try {
            if (obj[s].filled && obj[s].closed) {
                fillOk = true;
            }
            if (obj[s].typename === 'CompoundPathItem') {
                var itemCP = obj[s].pathItems[0];
                if (itemCP.filled && itemCP.closed) {
                    fillOk = true;
                }
            }
            if (obj[i].typename === 'GroupItem') {
                chkFill(obj[s].pageItems);
            }
        } catch (e) { }
    }
    return fillOk;
}

// Releasing all groups in selection
function prepare(obj) {
    for (i = 0; i < doc.selection.length; i++) {
        var itemGI = doc.selection[i];
        if (itemGI.typename === 'GroupItem') {
            release(itemGI, 'pageItems');
        }
    }
    app.redraw();
}

function release(obj, type) {
    for (m = obj[type].length - 1; m >= 0; m--) {
        obj[type][m].move(obj, ElementPlacement.PLACEAFTER);
    }
}

function expand(obj) {
    app.executeMenuCommand('Make Planet X');
    app.executeMenuCommand('Expand Planet X');
    selection[0].groupItems[selection[0].groupItems.length - 1].remove();
    app.executeMenuCommand('ungroup');
}

function addRectIntersect() {
    var selObj = doc.selection;
    if (selObj instanceof Array) {
        // Used code from FitArtboardToArt.jsx by Darryl Zurn
        // for draw top rectangle = selection bounds size
        var initBounds = selObj[0].visibleBounds;
        for (var i = 1; i < selObj.length; i++) {
            groupBounds = selObj[i].visibleBounds;
            if (groupBounds[0] < initBounds[0]) {
                initBounds[0] = groupBounds[0];
            }
            if (groupBounds[1] > initBounds[1]) {
                initBounds[1] = groupBounds[1];
            }
            if (groupBounds[2] > initBounds[2]) {
                initBounds[2] = groupBounds[2];
            }
            if (groupBounds[3] < initBounds[3]) {
                initBounds[3] = groupBounds[3];
            }
        }
    }

    var top = initBounds[1],
        left = initBounds[0],
        width = initBounds[2] - initBounds[0],
        height = initBounds[1] - initBounds[3];

    rectIntersect = doc.pathItems.rectangle(top, left, width, height);
    rectIntersect.filled = true;
    rectIntersect.strokeColor = new NoColor();
}

function getSelection() {
    return doc.selection;
}

function deselect() {
    doc.selection = null;
}

function showError(err) {
    if (confirm(scriptName + ': an unknown error has occurred.\n' +
        'Would you like to see more information?', true, 'Unknown Error')) {
        alert(err + ': on line ' + err.line, 'Script Error', true);
    }
}

try {
    main();
} catch (e) {
    //showError(e);
}