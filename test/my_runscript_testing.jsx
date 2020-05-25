
$.writeln("-----------------------------");
var dir = "/e/Projects/Scripts/test";
var re = new RegExp(dir);
$.writeln(re);


var scripts = get_scripts (Folder (dir), [], 1);


function get_scripts (dir, list, level) {
  var f = dir.getFiles ('*.*');
  for (var i = 0; i < f.length; i++) {

    if (f[i] instanceof Folder && !/^\./.test(f[i].name)) {
      $.writeln("fi = " + f[i]);
      get_scripts (f[i], list, level+1);
    } else if (/\.jsx?(bin)?/.test(f[i])) {
      //$.bp(f[i].name === 'index_show.jsx')
      //prefix = level > 1 ? f[i].parent.name.replace(/^.+\//,'/') : '';
      prefix = level > 1 ? f[i].parent.name + '/' : '';
      $.writeln("prefix = " + prefix);
      var newf = decodeURI (prefix + f[i].name));
      list.push (decodeURI (prefix + f[i].name));
      $.writeln("newf = "+newf)
    }
  }
  return list;
}
