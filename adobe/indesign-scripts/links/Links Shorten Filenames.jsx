/*

Links Shorten Filenames
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
    var fileNew;
    var fileVersion;
    var i;
    var link;
    var maxLength = 31; // Default max filename length. Set as desired.
    var name;
    var nameEdit;
    var nameNew;

    if (!app.documents.length) {
        alert("Open a document.");
        return;
    }
    doc = app.activeDocument;
    maxLength = Number(prompt("Enter maximum filename length:", maxLength));
    if (!maxLength) {
        // User cleared value or pressed ESC.
        return;
    }
    // Last chance to backup data first.
    if (!confirm("WARNING!\nFiles on disk will be renamed and this cannot be undone. Make backup copies of files before proceeding. Are you sure you want to continue?", true)) {
        return;
    }
    // Proceed.
    progress(doc.links.length);
    for (i = 0; i < doc.links.length; i++) {
        link = doc.links[i];
        progress.message(link.name);
        file = new File(link.filePath);
        // Spilt filename into name and extension.
        name = link.name.replace(/.[^.]+$/, "");
        ext = link.name.replace(/^.*\./, "");
        // Transformations to truncate long filenames.
        if (link.name.length > maxLength) {
            // Truncate name portion to maxLength less extension length.
            nameEdit = name.slice(0, (maxLength - ext.length - 1));
            // Trim whitespace.
            nameEdit = nameEdit.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            // Did name change?
            if (nameEdit != name) {
                // Test if new name already exists.
                nameNew = nameEdit;
                fileVersion = 1;
                fileNew = new File(file.path + "/" + nameNew + "." + ext);
                while (fileNew.exists) {
                    // File exists. Add version suffix.
                    // Shorten nameShort by 2 characters to allow for suffix.
                    fileVersion++;
                    nameNew = nameEdit.substring(0, nameEdit.length - 2) + "~" + fileVersion;
                    fileNew = new File(file.path + "/" + nameNew + "." + ext);
                }
                // Rename and relink.
                if (file.exists) {
                    file.rename(nameNew + "." + ext);
                    link.relink(file);
                    link.update();
                }
            }
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