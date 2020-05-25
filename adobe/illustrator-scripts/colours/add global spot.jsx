addSpot ('FOIL', 10, 0, 100, 0);  

function addSpot(name, c, m, y, k) {  
    try {  
        swatch = app.activeDocument.swatches[name]; // if swatch exists....  
        addSpot (name+='1', c, m, y, k); // ...add 1 to swatch name  
    }  
    catch (e) {  
        var newSpot = app.activeDocument.spots.add();  
        newSpot.name = name;  

        var newColor = new CMYKColor();  
        newColor.cyan = c;  
        newColor.magenta = m;  
        newColor.yellow = y;  
        newColor.black = k;  


        newSpot.colorType = ColorModel.SPOT;  
        newSpot.color = newColor;  
        var newSpotColor = new SpotColor();  
        newSpotColor.spot = newSpot;  
    }  
}  