mytext = app.pasteWithoutFormatting();

var changeObject = app.selection[0];

app.findGrepPreferences.properties = ({findWhat:"blah"});
app.changeGrepPreferences.properties = ({changeTo:mytext});
app.selection[0].changeGrep();