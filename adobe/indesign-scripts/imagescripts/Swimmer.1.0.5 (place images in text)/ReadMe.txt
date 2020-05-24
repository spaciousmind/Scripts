# Swimmer script

Version 1.0.5
12-March-2019

Free script for Adobe InDesign CC, created for PePcon 2014 attendees by Kris Coppieters, Rorohiko Ltd.

This script allows you to swap words for small images and back. 

--

About Rorohiko Ltd:

Rorohiko specialises in making printing, publishing and web workflows more efficient.

This script is a free sample of the custom solutions we create for our customers.

If your workflow is hampered by boring or repetitive tasks, inquire at

  sales@rorohiko.com

The scripts we write for our customers repay for themselves within weeks or months.

--

Tested with InDesign CC; very probably works with earlier versions too.

Check for updates at

https://www.rorohiko.com/wordpress/2014/06/24/peoples-choice-indesign-script-pepcon-2014-replace-words-images-vice-versa/

## Function

Swimmer allows you to swap words for small images and back. 

Run Swimmer.jsxbin by double-clicking it on the scripts panel, and it will scan all text stories in the current 
document for certain GREP expressions, and replace each GREP expression by a specific image.

When installing the Swimmer script, make sure to install both Swimmer.jsxbin and the SwimmerConfig.ini file 
in the same location. If you want to try the sample file, you also need to copy the images folder to the same
location.

The easiest is to bring up the Scripts panel (Window - Utilities - Scripts), and right-click or Control-click
the 'User' folder icon. Select 'Reveal in Finder' or 'Reveal in Explorer'. 

You should now see a folder called 'Scripts Panel'. Double-click 'Scripts Panel' to open it. Then drag
Swimmer.jsxbin and SwimmerConfig.ini into the Scripts Panel folder. Also drag the 'images' folder to the same
place if you want to try the sample document. Later on, you can delete the 'images' folder - it's just for the
sake of the example.

Make a backup of your documents before running Swimmer - just in case.

## Example

Open the SwimmerConfig.ini file with a text editor like TextWrangler, BBEdit, NotePad or NotePad++. Do not use 
word processing tools like MS Word, WordPad (Windows) or TextEdit (Mac): it has to be a proper text editor
program.

Before anything else: any text entered between double quotes in this .ini file needs to be treated a bit specially.
The backslash (\) is considered a special character, and if you need to enter a backslash in a quoted string, you need to 
double it up. For example, "C:\\Users\\kris\\Desktop Folder\\images" would stand for "C:\Users\kris\Desktop Folder\images".

The sample file provided looks like this:

    baseFolder = "./images"

    ++
    text = "\\bcup\\b"
    imageName = "cup.jpg"
    caseSensitive = 0

    ++
    text = "\\blemon\\b"
    imageName = "lemon.jpg"

    ++
    text = "\\bdog\\b"
    imageName = "dog.jpg"

Open the 'sample.idml' file. The file is provided as .idml because it was created in InDesign CC, but the script
does work with older versions of InDesign. Using .idml allows users of older InDesigns to try the sample file
too.

Double-click the script Swimmer.jsxbin on the Scripts panel. 

Double-click the same script a second time to perform the reverse operation. 

Swimmer is a 'single undo' script: if you run Swimmer, you only need to do a single Undo if you want to revert, despite
the script performing many steps.

### Locating the images

The first entry in the config file (baseFolder) tells the script where to find the image files for replacing. The sample 
provided has the images in the same folder as the script. For 'real life' use you want to change the baseFolder entry to
some proper file path to the folder with your images. 

If you don't know what the folder path is, and you are on a Mac, you could use ShowPaths:

https://www.rorohiko.com/wordpress/downloads/showpaths/

Download it (it's free), decompress, and drag/drop your images folder onto the ShowPaths application icon. It will show
the path you need to copy-paste into the SwimmerConfig.ini file. 

On Windows, you'd determine and put in your Windows folder path. Make sure to double up any backslashes in the path - 
server paths like "\\SERVER\ImageFolder" would become "\\\\SERVER\\ImageFolder"

### Defining the replacements

The next few entries define GREP patterns to look for, and the image files to replace them with. Each entry is preceded by a 
line with two + signs. 

You can have as many entries as you like: simply add more lines '++' and additional text =... and  imageName = ... entries.

The ++ is a separator, so don't leave it out: each image replacement needs a corresponding ++

The text = ... entry defines a GREP expression. The samples look for words 'cup', 'lemon', and 'dog'. The GREP expressions
are \bcup\b, \blemon\b and \bdog\b - the \b is a special GREP code that means 'word boundary'. By adding those before and 
after we can make sure the script will only tackle loose words - it won't replace the 'cup' in 'cupholder' because the
cup is embedded in a word and so the 'cup' is not followed by a word boundary.

Because of the 'backslash-doubling' the actual entries in the config file read \\bcup\\b,... 

The imageName=... define file names for the images to be inserted. Make sure the images are the correct size (e.g. open them
in Photoshop and check them out). 

If you try to run this script with large images (e.g. multiple inches in size) you'll end up with an unmanageable
monstrosity when these large images are put inline into your text: it will become permanently overset.

The optional caseSensitive = ... (either a 0 or a 1) entry allows you to make the GREP pattern case-sensitive or not.

    text = "\\bcup\\b"
    imageName = "cup.jpg"
    caseSensitive = 0

means: look for cup, CUP, Cup, or any other variant.

    text = "\\bCup\\b"
    imageName = "cup.jpg"
    caseSensitive = 1

would mean: look for Cup, but leave alone CUP, cup or any other variant

If you omit the caseSensitive entry it is assumed to be 0 (i.e. by default, Swimmer assumes case-insensitivity).

There is also an optional objectStyle = ... entry, followed by an object style name. By default, Swimmer will
assign an object style 'SwimmerObjectStyle' to any of the inline images. 

This might not be sufficient, e.g. where you want particular images to have a different baseline shift. For those
situations, you can add objectStyle = ..., for example:

    text = "\\bcup\\b"
    imageName = "cup.jpg"
    caseSensitive = 0
    objectStyle = "CupObjectStyle"

and then the cup can have a different base line shift, for example.

## Version History

    1.0.5 12-March-2019: Added support for object styling on the images

    1.0.4 31-July-2014: Added support for EPS images.

    1.0.3 30-July-2014: Fixed bug introduced in version 1.0.1, which was causing a crash when document has no tables.

    1.0.2 16-July-2014: Added support for overset cells in tables

    1.0.1 13-July-2014: Added support for text in tables

    1.0.0 18-June-2014: First release at PePcon 2014

## Legal

### Disclaimer

This software is provided as is without warranty of any kind, either expressed or implied, including, but not limited to the implied 
warranties of software programs and fitness for a particular purpose. The entire risk as to the quality and performance of 
the program is with you. If you use the program, please do so with the understanding that you assume all risks of using it. 
 
### License

This license covers the 'Swimmer' script

Copyright (c) 2014-2019 by Rorohiko Ltd. All rights reserved.
https://www.rorohiko.com
support@rorohiko.com

The Swimmer script is free and can be used and redistributed at no cost. Only the original .zip file can be redistributed
(which should include this ReadMe.txt document, sample config file and sample images). It is not allowed to redistribute
files from this .zip file separately.

Swimmer was created during PePcon 2014 based on audience requests.

For more info about PePcon, please visit:

http://www.pepcon.com