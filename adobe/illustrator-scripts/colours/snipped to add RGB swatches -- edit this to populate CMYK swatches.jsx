function test()

{

   //temporary hard coded values for the

   //target swatch and the new swatch

   const OLD_COLOR = "LightBlue";

   const NEW_COLOR = "GreenPoly";

   if (!app.documents.length)

   {

      alert("Please open a document first.");

      return;

   }

   //oldColor and newColor are strings representing name of color

   function changeColor(oldColor, newColor)

   {

      doc.selection = null;

      var oldSwatch = makeNewSwatch(oldColor);

      var newSwatch = makeNewSwatch(newColor);

      doc.defaultFillColor = oldSwatch.color;

      app.executeMenuCommand("Find Fill Color menu item");

      doc.defaultFillColor = newSwatch.color;

      doc.selection = null;

   }

   function makeNewSwatch(name)

   {

      var newSwatch;

      var colorValues;

      try

      {

         //check to see if the swatch already exists

         newSwatch = swatches[name];

      }

      catch (e)

      {

         try

         {

            colorValues = stockColors[name];

         }

         catch (er)

         {

            alert("Couldn't find color values for " + name + "\nUsing [0,0,0,0]");

            colorValues = [0, 0, 0, 0];

         }

         //swatch doesn't exist yet. create a new one.

         var color = new CMYKColor();

         color.cyan = colorValues[0];

         color.magenta = colorValues[1];

         color.yellow = colorValues[2];

         color.black = colorValues[3];

         newSwatch = swatches.add();

         newSwatch.name = name;

         newSwatch.color = color;

      }

      return newSwatch;

   }

   var doc = app.activeDocument,

      swatches = doc.swatches,

      newColor,

      newCMYKColor = new CMYKColor(),

      //the stockColors are part of the whole script. I am just using the one color for testing purposes. 

      stockColors = {

         BlackPoly: [80, 72, 68, 100],

         LightBlue: [100, 43, 0, 30],

         DarkBluePoly: [95, 74, 7, 44],

         PurplePoly: [82, 98, 0, 12],

         GreenPoly: [90, 12, 95, 40],

         YellowPoly: [0, 19, 89, 0],

         EcruPoly: [6, 13, 41, 4],

         OrangePoly: [0, 73, 98, 0],

         RedPoly: [7, 100, 82, 26],

         GreyPoly: [10, 4, 4, 14],

         WhitePoly: [0, 0, 0, 0]

      };

   changeColor(OLD_COLOR, NEW_COLOR);

}

test();