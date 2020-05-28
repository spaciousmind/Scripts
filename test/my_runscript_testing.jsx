
$.writeln("==================");
var dir = "/e/Projects/Scripts/test";
var re = new RegExp(dir);
$.writeln(re);


var scripts = get_scripts (Folder (dir), [], 1);


function get_scripts (dir, list, level) {
  $.writeln("------------");
//  $.writeln("level = " +level);
  var f = dir.getFiles ('*.*');

  for (var i = 0; i < f.length; i++) {


    if (/\.jsx?(bin)?/.test(f[i])) {
            $.writeln("pi = " + f[i]);
    }

//  $.writeln("i = " + i);
    //  var p = f[i].getRelativeURI();
var p = f[i].path.match(/("/e/Projects/Scripts/test")/);
//p.match(/(test)/);
            $.writeln("ppppppp = " +p);
//  newPath = Paths.get(f[i]);
//  $.writeln("newPath = " newPath)
    if (f[i] instanceof Folder && !/^\./.test(f[i].name)) {

//    $.writeln("fi = " + f[i]);
      get_scripts (f[i], list, level+1);
    } else if (/\.jsx?(bin)?/.test(f[i])) {
      //$.bp(f[i].name === 'index_show.jsx')
      //prefix = level > 1 ? f[i].parent.name.replace(/^.+\//,'/') : '';
  //    preprefix = level > 1 ? f[i].parent.parent.name + '/' : '';
      prefix = level > 1 ? f[i].parent.name + '/' : '';
  //    $.writeln("prefix = " + prefix);



  //var re = new RegExp("/e/Projects/Scripts/test/"");
  //$.writeln(re);

//  var newf = "/e/Projects/Scripts/test/b/c/d/d.jsx";
//newf.match(/(re)/)[1];
//$.writeln("newf =" + newf);

      list.push (decodeURI (prefix + f[i].name));
//      $.writeln("newf = "+newf)
    }
  }
  return list;
}
