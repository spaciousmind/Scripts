# SmokeWordStacks script

Version 1.0.1
8-June-2015 

Free script for Adobe InDesign, created for PePcon 2015 attendees 
By Kris Coppieters, Rorohiko Ltd.
kris@rorohiko.com

https://www.rorohiko.com
http://www.pepcon.com

Tested with InDesign CC 2014; most probably works with many earlier versions too.

## Function

SmokeWordStacks marks certain text ranges with a character style, in order to point out 
accidental word stacks and/or hyphenation stacks. 

Example:
...
They wanted to be together in life. 
If they could be together right now,
they would not be apart in death
They had hyphen-
ated one life-
time away
...

The two occurrences of the word 'together' almost under one another can cause an odd 
visual effect, so you might want to inspect such occurrences.

Also, the word 'lifetime' will be marked as it is the second hyphenated word on 
consecutive lines with the hyphen roughly in the same horizontal position.

Once the potential problems are marked, they're easy to find using InDesign's built-in 
Find/Change functionality.

Run SmokeWordStacks.jsx by double-clicking it on the scripts panel, pick an option, and it
will scan all text stories in the current document for stacked words, letters and/or 
hyphenations.

## Installing

The easiest way to install SmokeWordStacks is to bring up the Scripts panel 
(Window - Utilities - Scripts), and right-click or Control-click the 'User' folder icon. 
Select 'Reveal in Finder' or 'Reveal in Explorer'. 

You should now see a folder called 'Scripts Panel'. Double-click 'Scripts Panel' to open
it. Then drag the SmokeWordStacks.jsxbin and SmokeWordStacks.ini files into this 
Scripts Panel folder.

SmokeWordStacks is a 'single undo' script: if you run SmokeWordStacks, you only need to do
a single Undo if you want to revert, despite the script performing many steps.

You might want to make a backup copy of your document before running SmokeWordStacks, 
just in case.

## Configuring SmokeWordStacks

Should you wish to tweak SmokeWordStacks.jsx, simply open the file SmokeWordStacks.ini
in a text editor like BBEdit or Notepad. 

The configuration file is fairly well commented, and should be self-explanatory. You can 
easily tweak the 'sensitivity' (the maximal the horizontal shift of the second copy of the
repeated word on the consecutive line). 

The script uses 'profiles', and you can tweak the samples provided, or add as many 
additional profiles as you like.  

When you run the script you need to pick one of the profiles. 

The section [main] contains shared default settings for all profiles.

All profiles are initially set up as specified in [main], and then individual settings
are overridden.

Further down, you'll find a section for each separate profile. In these sections you can 
override one or more settings against their default values in [main].

## Tips

After running the script, you should work backwards when fixing up issues. As you fix 
issues, you'll disturb the text flow. If you start at the end and work your way back to 
the beginning of the document, the markers won't be disturbed until you get to them.

Inspect the SmokeWordStacks.ini file: you can tweak the 'sensitivity' there. By setting 
higher values in the horizontalPositionToleranceInPoints and variants you can make the 
script pick up matches even if the second match is shifted a fair bit to the left or the 
right.

If the script does not seem to pick up some stacked words, letters or hyphenations, you 
might need to increase the horizontalPositionToleranceInPoints and similar values in 
the .ini file for the profile you're using

## Version History

    1.0.1 8-June-2015: Added support for hyphenation stacks, and for word fragment stacks.
    Added a config file, support for profiles, and a dialog for selecting a profile.

    1.0.0 5-June-2015: First unreleased version demonstrated at PePcon 2015

## Legal

### Disclaimer

This software is provided as is without warranty of any kind, either expressed or implied,
including, but not limited to the implied warranties of software programs and fitness for
a particular purpose. The entire risk as to the quality and performance of the program is
with you. If you use the program, please do so with the understanding that you assume all
risks of using it. 
 
### License

This license covers the 'SmokeWordStacks' script

Copyright (c) 2015 by Rorohiko Ltd. All rights reserved.
https://www.rorohiko.com
support@rorohiko.com

The SmokeWordStacks script is free and can be used and redistributed at no cost. Only the 
original .zip file can be redistributed (which should include this ReadMe.txt document, 
and the unmodified .jsx file). It is not allowed to redistribute files from this .zip file
separately. It is not allowed to redistribute modified versions of this script.

SmokeWordStacks was created during PePcon 2015 based on audience requests.

For more info about PePcon, please visit:

http://www.pepcon.com