/*

Links Rename Web or Ebook
Copyright 2019 William Campbell
All Rights Reserved
Questions, comments, or custom programming, contact:
    william@marspremedia.com
    willcampbell7@gmail.com
    https://www.marspremedia.com/contact

Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

//@target indesign

(function () {

    var doc;
    var ext;
    var file;
    var i;
    var link;
    var name;

    if (!app.documents.length) {
        alert("Open a document.");
        return;
    }
    doc = app.activeDocument;
    if (!confirm("WARNING!\nFiles on disk will be renamed and this cannot be undone. Make backup copies of files before proceeding. Are you sure you want to continue?", true)) {
        return;
    }

    progress(doc.links.length);

    for (i = 0; i < doc.links.length; i++) {
        link = doc.links[i];
        progress.message(link.name);
        file = new File(link.filePath);
        name = link.name.replace(/.[^.]+$/, "");
        ext = link.name.replace(/^.*\./, "");
        name = name.toLowerCase();
        ext = ext.toLowerCase();
        // Replace punctuation with dash.
        name = name.replace(/[ ~`@#$%\^&\*()_=:;,\."'_~+<>\/\?\{\}\[\]\|\\]/g, "-");
        // Delete any leading dashes.
        name = name.replace(/^-/g, "");
        // Delete any leading underscores.
        name = name.replace(/^_/g, "");
        // Reduce double dashes to one.
        name = name.replace(/--/g, "-");
        if (file.exists) {
            // Rename with 'tmp-' prefix then without to
            // ensure change to lowercase takes effect,
            // in event it was the only change.
            file.rename("tmp-" + name + "." + ext);
            file.rename(name + "." + ext);
            // Then relink to renamed file and update.
            link.relink(file);
            link.update();
        }
        progress.increment();
    }

    progress.close();
    alert("Links successfully renamed and relinked.");

    function progress(steps) {
        var b;
        var t;
        var w;
        w = new Window("palette", "Progress", undefined, {
            closeButton: false
        });
        t = w.add("statictext");
        t.preferredSize = [450, -1]; // 450 pixels wide, default height.
        if (steps) {
            b = w.add("progressbar", undefined, 0, steps);
            b.preferredSize = [450, -1]; // 450 pixels wide, default height.
        }
        progress.close = function () {
            w.close();
        };
        progress.increment = function () {
            b.value++;
        };
        progress.message = function (message) {
            t.text = message;
            w.update();
        };
        w.show();
    }

})();