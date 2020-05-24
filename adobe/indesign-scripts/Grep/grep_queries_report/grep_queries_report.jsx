//DESCRIPTION: List GREP queries in a new document
// Peter Kahrel -- www.kahrel.plus.com

if (parseInt (app.version) > 4)
    grep_queries ();


function grep_queries ()
    {
    var s = find_queries ();
    print_queries (s);
    }


function find_queries ()
    {
    var xml;
    var queries = Folder (app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/Grep/").getFiles ("*.xml");
    var s = "";
    for (var i = 0; i < queries.length; i++)
        {
        queries[i].open ("r");
        xml = new XML (queries[i].read ());
        s += "@@@//" + queries[i].name.replace (/%20/g, " ") + "\r";
        queries[i].close();
        s += "###" + xml.Description.FindExpression.@value + "\r";
        s += ">>>" + xml.Description.ReplaceExpression.@value + "\r\r";
        }
    return s
    }


function print_queries (s)
    {
    var doc = open_template ("/grep_format.indd");
    var tf = doc.textFrames[0];
    tf.contents = s;
    if (doc.name == "grep_format.indd")
        {
        app.findGrepPreferences = app.changeGrepPreferences = null;
        apply_styles ("^@@@", "contents");
        apply_styles ("^###", "find_what");
        apply_styles ("^>>>", "change_to");
        }
    app.findGrepPreferences = app.changeGrepPreferences = null;
    app.findGrepPreferences.findWhat = "^@@@|^###|^>>>";
    doc.changeGrep();
    if (tf.overflows)
        {
        flow (doc, tf);
        app.activeWindow.activePage = doc.pages[0];
        }
    if (parseInt (app.version) == 5 && doc.name == "grep_format.indd")
        highlight_cs3 (doc)
    }


function apply_styles (tag, stylename)
    {
    app.findGrepPreferences.findWhat = tag;
    try
        {
        app.changeGrepPreferences.appliedParagraphStyle = app.documents[0].paragraphStyles.item (stylename);
        app.changeGrep ()
        }
    catch (_) {}
    }



// If the template can be found, open it.
// If it can't be found, create a new document

function open_template (s)
    {
    var f = app.scriptPreferences.scriptsFolder + s;
    if (File (f).exists)
        {
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.neverInteract;
        var doc = app.open (File (f));
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
        doc.textFrames.everyItem().remove();
        add_frame (doc);
        }
    else
        {
        var doc = app.documents.add ();
        add_frame (doc)
        }
    return doc;
    }


function add_frame (doc)
    {
    var m = doc.pages[0].marginPreferences;
    var gb = [m.top, m.left, 
        doc.documentPreferences.pageHeight - m.bottom, 
        doc.documentPreferences.pageWidth - m.right];
    doc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
    doc.pages[0].textFrames.add ({geometricBounds: gb});
    }



function flow (doc, tf)
	{
    var gb = tf.geometricBounds;
    while (doc.pages[-1].textFrames[0].overflows)
        {
        doc.pages.add ().textFrames.add ({geometricBounds: gb});
        doc.pages[-1].textFrames[0].previousTextFrame = doc.pages[-2].textFrames[0]
        }
    }



function highlight_cs3 (target)
    {
    try
        {
        app.findGrepPreferences = app.changeGrepPreferences = null;
        apply (target, "blue-light", "(?<!\\\\)[\\[\\]|?+*]");
        apply (target, "green", "\\(\\?-?[=!:i#xms]");
        apply (target, "green", "\\(\\?<[=!]");
        apply (target, "green", "(?<!\\\\)[(){}]");
        apply (target, "black", "(?<!\\\\)\\[.+?[^\\\\]\\]");
        apply (target, "blue-light", "(?<!\\\\)[\\[\\]]");
        apply (target, "red", "\\\\[\\w\\.]");
        apply (target, "orange", "\\\\[xp]\\{.+?\\}");
        apply (target, "orange", "(?<!\\\\)\\~.");
        apply (target, "orange", "\\[?\\[([=:]).+?\\1\\]\\]?");
        apply (target, "comments", "//.+");
        }
    catch (_) {}
    }


function apply (target, style, grep)
    {
    app.findGrepPreferences.findWhat = grep;
    app.changeGrepPreferences.appliedCharacterStyle = 
        app.documents[0].characterStyles.item (style);
    target.changeGrep()
    }