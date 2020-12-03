/*
* This Script is Developed By Shyam Bihari  Swami - And - Sanjay Kumar Swami 
* Please visit www.youtube.com/sanjaykumarswami 
* and spread Your love with subscribe channel. 
* This is Free for You, 
* Share and talk about Sanjay Kumar Swami YouTube channel to each of your friend. Thank You ! Enjoy 
*/



   var maintainAspectRatio;// set to true to keep aspect ratio 
maintainAspectRatio = true;	
    if(app.documents.length>0){  
        app.activeDocument.suspendHistory ('Fit Layer to Canvas', 'FitLayerToCanvas('+maintainAspectRatio+')');  
    }  
    function FitLayerToCanvas( keepAspect ){// keepAspect:Boolean - optional. Default to false  
        var doc = app.activeDocument;  
        var layer = doc.activeLayer;  
        // do nothing if layer is background or locked  
        if(layer.isBackgroundLayer || layer.allLocked || layer.pixelsLocked  
                                || layer.positionLocked || layer.transparentPixelsLocked ) return;  
        // do nothing if layer is not normal artLayer or Smart Object  
        if( layer.kind != LayerKind.NORMAL && layer.kind != LayerKind.SMARTOBJECT) return;  
        // store the ruler  
        var defaultRulerUnits = app.preferences.rulerUnits;  
        app.preferences.rulerUnits = Units.PIXELS;  
          
        var width = doc.width.as('px');  
        var height =doc.height.as('px');  
        var bounds = app.activeDocument.activeLayer.bounds;  
        var layerWidth = bounds[2].as('px')-bounds[0].as('px');  
        var layerHeight = bounds[3].as('px')-bounds[1].as('px');  
              
        // move the layer so top left corner matches canvas top left corner  
        layer.translate(new UnitValue(0-layer.bounds[0].as('px'),'px'), new UnitValue(0-layer.bounds[1].as('px'),'px'));  
        if( !keepAspect ){  
            // scale the layer to match canvas  
            layer.resize( (width/layerWidth)*100,(height/layerHeight)*100,AnchorPosition.TOPLEFT);  
        }else if(width == height){
			var layerRatio = layerWidth / layerHeight;
			var ratio = width / height;
			
			var checker = true;
			
			if(ratio > layerRatio)
				if(!(layerHeight == height))
					checker = true;
			if(ratio < layerRatio)
				if(!(layerWidth == width))
					checker = true;
			if(checker){
				
            var newHeight =  height;
            var newWidth = width;  
			var resizePercent = newHeight/layerHeight*100;//Ye Resize percentage hai jo Change hota Hai			
			if(ratio > layerRatio)
				resizePercent = newWidth/layerWidth*100;
			
             
            app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT);  
		
			}	
		}
		else if((width < height)){  
		// width DOCUMENT gi width hai
		
			
			var layerRatio = layerWidth / layerHeight;
			var ratio = width / height;
			
			var checker = true;
			
			if(ratio > layerRatio)
				if(!(layerHeight == height))
					checker = true;
			if(ratio < layerRatio)
				if(!(layerWidth == width))
					checker = true;
			if(checker){
				
            var newHeight =  height;
            var newWidth = width;  
			var resizePercent = newHeight/layerHeight*100;//Ye Resize percentage hai jo Change hota Hai			
			if(ratio > layerRatio)
				resizePercent = newWidth/layerWidth*100;
			
             
            app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT);  
		
			}			
			
        } 
		else{  
            var layerRatio = layerWidth / layerHeight;
			var ratio = width / height;
			
			var checker = true;
			
			if(ratio < layerRatio)
				if(!(layerHeight == height))
					checker = true;
			if(ratio > layerRatio)
				if(!(layerWidth == width))
					checker = true;
			if(checker){
			 var newWidth = width;  
            var newHeight =  height; 
			
            if (newHeight >= height) {  
                newWidth = width;  
                newHeight = height;  
            }  
            var resizePercent = (newWidth/layerWidth)*(100);  
			if(ratio < layerRatio )
				resizePercent = newHeight/layerHeight*100;
			
            app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT);  	
			}
			
           
        } 
        // restore the ruler  
        app.preferences.rulerUnits = defaultRulerUnits;  
    }  