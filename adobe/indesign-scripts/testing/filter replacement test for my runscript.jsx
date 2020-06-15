var w = new Window ('dialog', 'Script launcher', undefined, {closeButton: false});
  w.orientation = 'row';
  w.alignChildren = 'top';

    w.main = w.add ('group {orientation: "column"}');
    var entry = w.main.add ('edittext', undefined, "3");
      entry.minimumSize.width = 300;
    list = w.main.add ('listbox', undefined, "3");
      list.preferredSize = [600, 350];
      list.selection = 0;


    filter = "blah blah";
    filterRE = RegExp (filter, 'i')
    pattern = RegExp (" ")
    var result = pattern.test(filterRE)
    $.writeln("result =" + result);
    if (RegExp (" ").test(filterRE)){
      $.writeln("YES")
      var filterXX = filter.replace(/(" ")/, "XX");
  //		filterXX = filterRE.replace(/" "/, "(?:\\b|_).*?(?:\\b|_)")
      $.writeln("filterXX =" + filterXX);
    }
