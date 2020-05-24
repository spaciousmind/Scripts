///111100/// -- do not remove this line
/***********************************************************************/
/*                                                                     */
/*      Equalizer :: Transfer uniform coordinates (pos./size/angle)    */
/*                   to the selected objects (right-click menu)        */
/*                                                                     */
/*      [Ver: 2.08]         [Author: Marc Autret]    [Modif: 01/27/10] */
/* [Lang: EN|FR|DE|RU|AR|ES]  [Req: InDesign CS4]    [Creat: 02/20/06] */
/*                                                                     */
/*      Installation:                                                  */
/*                                                                     */
/*      1) Place the current file into Scripts/Startup Scripts/        */
/*         (if the folder Startup Scripts doesn't exist, create it)    */
/*                                                                     */
/*      2) Run InDesign, open a document, select one or more object(s) */
/*         (text frame, rectangle, etc.)                               */
/*                                                                     */
/*      3) Right-click on the object to get access to the UI           */
/*                                                                     */
/*      Bugs & Feedback : marc{at}indiscripts{dot}com                  */
/*                        www.indiscripts.com                          */
/*                                                                     */
/***********************************************************************/

#targetengine 'equalizer'

//======================================
// <L10N> :: FRENCH_LOCALE :: GERMAN_LOCALE :: SPANISH_LOCALE :: RUSSIAN_LOCALE :: ARABIC_LOCALE
//======================================
// Y Location :: Ordonn\u00E9e (Y) :: y-Position :: Ubicaci\u00F3n Y :: Y \u041a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u0430 :: \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0635\u0627\u062f\u064a
// X Location :: Abscisse (X) :: x-Position :: Ubicaci\u00F3n X :: X \u041a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u0430 :: \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0633\u064a\u0646\u064a
// Location :: Position :: Position :: Ubicaci\u00F3n :: \u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 :: \u0627\u0644\u0645\u0648\u0642\u0639
// Height :: Hauteur :: H\u00F6he :: Alto :: \u0412\u044b\u0441\u043e\u0442\u0430 :: \u0627\u0644\u0637\u0648\u0644
// Width :: Largeur :: Breite :: Ancho :: \u0428\u0438\u0440\u0438\u043d\u0430 :: \u0627\u0644\u0639\u0631\u0636
// Size :: Dimensions :: Gr\u00F6\u00DFe :: Tama\u00F1o :: \u0420\u0430\u0437\u043c\u0435\u0440 :: \u0627\u0644\u062d\u062c\u0645
// Shear :: D\u00E9formation/X :: Verbiegungswinkel :: Distorsi\u00F3n :: \u0421\u0434\u0432\u0438\u0433 :: \u0627\u0644\u0642\u0635
// Rotation :: Rotation :: Drehwinkel :: Rotaci\u00F3n :: \u0423\u0433\u043e\u043b \u043f\u043e\u0432\u043e\u0440\u043e\u0442\u0430 :: \u0627\u0644\u062f\u0648\u0631\u0627\u0646
// Angles :: Angles :: Winkel :: \u00C1ngulos :: \u0423\u0433\u043b\u044b :: \u0627\u0644\u0632\u0648\u0627\u064a\u0627
// Swap: :: Permuter : :: tauschen :: Intercambiar :: \u041f\u043e\u043c\u0435\u043d\u044f\u0442\u044c: :: \u062a\u0628\u062f\u064a\u0644
// Apply: :: Appliquer : :: anwenden :: Aplicar :: \u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c: :: \u062a\u0637\u0628\u064a\u0642
// Copy Coordinates :: Copier les coordonn\u00E9es :: Koordinaten kopieren :: Copiar Coordenadas :: \u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u044b :: \u0646\u0633\u062e \u0627\u0644\u0625\u062d\u062f\u0627\u062b\u064a\u0627\u062a
// Unable to apply the coordinates: :: Impossible d'appliquer les coordonn\u00E9es : :: Koordinaten k\u00F6nnen nicht angewendet werden :: No se pueden aplicar las coordenadas : :: \u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u043a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u044b: :: \u0644\u0627 \u064a\u0645\u0643\u0646 \u062a\u0637\u0628\u064a\u0642 \u0627\u0644\u0625\u062d\u062f\u0627\u062b\u064a\u0627\u062a
// Unable to swap the coordinates: :: Impossible de permuter les coordonn\u00E9es : :: Koordinaten k\u00F6nnen nicht getauscht werden :: No se pueden intercambiar las coordenadas : :: \u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043f\u043e\u043c\u0435\u043d\u044f\u0442\u044c \u043a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u044b: :: \u0644\u0627 \u064a\u0645\u0643\u0646 \u0645\u0628\u0627\u062f\u0644\u0629 \u0627\u0644\u0625\u062d\u062f\u0627\u062b\u064a\u0627\u062a
// Equalizer Preferences... :: Pr\u00E9f\u00E9rences Equalizer... :: Equalizer Voreinstellungen... :: Equalizer Preferencias... :: \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 Equalizer... :: \u0625\u0639\u062f\u0627\u062f\u0627\u062a Equalizer
// Equalizer 2.0 - Preferences :: Equalizer 2.0 - Pr\u00E9f\u00E9rences :: Equalizer 2.0 - Voreinstellungen :: Equalizer 2.0 - Preferencias :: Equalizer 2.0 - \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 :: \u0625\u0639\u062f\u0627\u062f\u0627\u062a Equalizer 2.0
// </L10N>
var L10N = L10N || (function()
	{
	var ln = (function()
		{ // <this> : Number
		for(var p in Locale) if(Locale[p] == this) return(p);
		}).call(app.locale);

	var parseL10N = /*str[]*/function(/*str*/locale_, /*[File]*/f)
		{
		var lines = (function()
			{ // <this> : File
			var	__com = '// ', __sep = ' :: ', __beg = '<L10N>', __end = '</L10N>';
			var l,r = [];
			var uEsc = function(){return String.fromCharCode(Number('0x'+arguments[1]));}
			if( this.open('r') )
				{
				var comSize=__com.length;
				while( !this.eof )
					{
					l = this.readln().replace(/\\u([0-9a-f]{4})/gi, uEsc);
					if( l.indexOf(__com) != 0 ) continue;
					if( l.indexOf(__end) >= 0 ) break;
					if( l.indexOf(__sep) < 0  ) continue;
					r.push(l.substr(comSize).split(__sep));
					}
				this.close();
				}
			while( (l=r.shift()) && l[0] != __beg ) {};
			return (l)?[l].concat(r):false;
			}).call(f||File(app.activeScript));

		var r=[];
		if (!lines) return r;
		var line = lines[0];
		var locIndex = (function()
			{
			for (var i=1,sz=line.length ; i<sz ; i++)
				if ( line[i] == locale_ ) return i;
			return 0;
			})();
		if (!locIndex) return r;
		
		while( line=lines.shift() )
			if ( typeof line[locIndex] != 'undefined' )
				r[line[0]] = line[locIndex];
		return r;
		}
	
	var tb = parseL10N(ln);
	__ = function(/*str*/ks){return(tb[ks]||ks);}
	return {locale: ln};
	})();

var UNITS = UNITS||(function()
// Units helper
//------------------------------------------------
{
var r={}, mu=MeasurementUnits;
r[mu.AGATES]='agt';
r[mu.CENTIMETERS]='cm';
r[mu.CICEROS]='ci';
r[mu.INCHES]='in';
r[mu.INCHES_DECIMAL]='in';
r[mu.MILLIMETERS]='mm';
r[mu.PICAS]='pc';
r[mu.POINTS]='pt';
return r;
})();


var Equalizer = Equalizer||(function()
//------------------------------------------------
{
var xyAnchor = (function()
	{
	var a = 
		{
		topLeftAnchor: 		[[1],[0]],
		topRightAnchor: 	[[3],[0]],
		bottomLeftAnchor: 	[[1],[2]],
		bottomRightAnchor: 	[[3],[2]],
		topCenterAnchor: 	[[1,3],[0]],
		bottomCenterAnchor:	[[1,3],[2]],
		leftCenterAnchor:	[[1],[0,2]],
		rightCenterAnchor:	[[3],[0,2]],
		centerAnchor:		[[1,3],[0,2]]
		};
	var tables = {};
	for(var p in a) tables[AnchorPoint[p]]=a[p];

	return function(ap)
		{
		var t = tables[ap||app.activeWindow.transformReferencePoint];
		var xp = [];
		for(var i=0; i<=1; i++)
			xp.push((t[i].length == 2)?
				(function(){var i0=t[i][0],i1=t[i][1]; return function(){return (this[i0]+this[i1])/2;};})(i):
				(function(){var i0=t[i][0]; return function(){return this[i0];};})(i)
				);
		return function(/*bounds*/b)
			{
			return [xp[0].call(b), xp[1].call(b)];
			};
		};
	})();

var settings = (function()
	{
	var prefs = (function()
		{
		var clone = function(obj)
			{
			var cl={},p;
			for(p in obj) cl[p]=obj[p];
			return cl;
			};
		var fields = {
			rePosX: true,
			rePosY: true,
			reSizeX: true,
			reSizeY: true,
			reAngleR: false,
			reAngleS: false,
			};
		var seek = (function()
			{
			var sf = File(app.activeScript);

			return function(mode)
				{
	    		if (! sf.open(mode) ) return null;
				sf.seek(0);
				if (sf.read(12).match(/\/{3}[01]{6}\/{3}/))
					{
					sf.seek(3);
					return sf;
        			}
				sf.close();
				return null;
				};
			})();
		return {
			get: function()
				{
				var f = seek('r');
				if (!f) return clone(fields);
				var p;
				for(p in fields) fields[p]=!!(f.read(1)-0);
				f.close();
				return clone(fields);
				},
			set: function(s)
				{
				var f = seek('e');
				if (!f) return false;
				var p;
				for(p in fields) f.write(s[p]?'1':'0');
				f.close();
				return true;
				},
			};
		})();
	var captions =
		{
		rePos: [__("Y Location"),__("X Location"),__("Location")],
		reSize: [__("Height"),__("Width"),__("Size")],
		reAngle: [__("Shear"),__("Rotation"),__("Angles")],
		};
	var ss = prefs.get();
	var refresh = function()
		{
		ss.rePos = ss.rePosX||ss.rePosY;
		ss.reSize = ss.reSizeX||ss.reSizeY;
		ss.reAngle = ss.reAngleR||ss.reAngleS;
		};
	refresh();
	return {
		get: function(){return ss;},
		save: function(ss_)
			{
			var p;
			for(p in ss_)
				if (p in ss) ss[p]=ss_[p];
			prefs.set(ss);
			refresh();
			},
		caption: function()
			{
			var cp = [];
			if (ss.rePos) cp.push(captions.rePos[2*(ss.rePosX?1:0)+(ss.rePosY?1:0)-1]);
			if (ss.reSize) cp.push(captions.reSize[2*(ss.reSizeX?1:0)+(ss.reSizeY?1:0)-1]);
			if (ss.reAngle) cp.push(captions.reAngle[2*(ss.reAngleR?1:0)+(ss.reAngleS?1:0)-1]);
			return cp.join('/');
			},
		};
	})();

var process = (function()
	{
	var innerSpace = CoordinateSpaces.innerCoordinates,
		geoBox = BoundingBoxLimits.geometricPathBounds,
		resizeMeth = ResizeMethods.replacingCurrentDimensionsWith,
		topLeft = AnchorPoint.topLeftAnchor,
		botRight = AnchorPoint.bottomRightAnchor,
		rulerPageOrigin = RulerOrigin.pageOrigin, // [fix091120]
		kRadian = Math.PI/180;

	var rfPoint,
		pgMove,
		datas,
		eSize,
		execs;
	
	// [fix100127]
	var hk = 1,
		vk = 1;
	var toPoints = function(/*bounds*/b)
		{
		return [b[0]*vk, b[1]*hk, b[2]*vk, b[3]*hk];
		};
	var resetToPointsConverter = function()
		{
		var vp = app.activeDocument.viewPreferences;
		hk = UnitValue(1,UNITS[vp.horizontalMeasurementUnits]).as('pt');
		vk = UnitValue(1,UNITS[vp.verticalMeasurementUnits]).as('pt');
		};
	// [/fix100127]

	var getSize = function() // [pts,pts]
		{ // this: PageItem
		var c = this.resolve([topLeft,geoBox],innerSpace)[0].
			concat(this.resolve([botRight,geoBox],innerSpace)[0]);
		return [
			c[2]-c[0],
			(c[3]-c[1])/((this.shearAngle)?Math.cos(kRadian*this.shearAngle):1)
			];
		};
		
	var getCoords = function() //pts [fix100127]
		{ // this: PageItem
		return {
			pageBounds: (this.parent.constructor==Page)?toPoints(this.parent.bounds):null, // [fix100127]
			size: getSize.call(this),
			bounds: toPoints(this.geometricBounds), // [fix100127]
			angles: [this.rotationAngle, this.shearAngle],
			}; // [/fix100127]
		};
		
	var exe_setPageMove = function(/*pts_bounds*/pgBounds)
		{
		var rpo = (app.activeDocument.viewPreferences.rulerOrigin == rulerPageOrigin); // [fix091120]
		var offsetX = -pgBounds[1]/hk; // [fix100127]
		return function()
			{
			// this: PageItem
			pgMove = [0,0];
			if(this.parent.constructor!=Page || rpo) return; // [fix091120]
			pgMove[0] = this.parent.bounds[1]+offsetX;
			};
		};

	var exe_reSize = function(/*num[2]*/size,/*bool*/onX,/*bool*/onY)
		{ // this: PageItem
		var sz = [
			onX?size[0]:ResizeConstraints.keepCurrentValue,
			onY?size[1]:ResizeConstraints.keepCurrentValue
			];
		return function()
			{ // this: PageItem
			this.resize([innerSpace, geoBox],rfPoint,resizeMeth, sz);
			};
		};

	var exe_reAngle = function(/*num[2]*/a,/*bool*/doRot,/*bool*/doShear)
		{
		var ra = a[0];
		var sa = a[1];
		
		return function()
			{// this: PageItem
			if (doRot) this.rotationAngle = ra;
			if (doShear) this.shearAngle = sa;
			};
		};

	var exe_rePos = function(/*pts_bounds*/srcBounds,/*bool*/onX,/*bool*/onY)
		{
		var xyPos = xyAnchor(rfPoint);
		var a = xyPos(srcBounds);
		var dx = (onX)?function(xy){return a[0]+pgMove[0]-xy[0];}:function(){return 0;}
		var dy = (onY)?function(xy){return a[1]+pgMove[1]-xy[1];}:function(){return 0;}

		return function()
			{ // this: PageItem
			var xy = xyPos(toPoints(this.geometricBounds));	// [fix100127]
			this.move(undefined,[dx(xy)/hk,dy(xy)/vk]);		// [fix100127]
			};
		};

	var get_Metrics = function()
		{
		rfPoint = app.activeWindow.transformReferencePoint;
		var hU = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
		var vU = app.activeDocument.viewPreferences.verticalMeasurementUnits;
		
		var d = datas||{size:[10,10],bounds:[0,0,10,10],angles:[0,0]};
		var xy = (xyAnchor(rfPoint))(d.bounds);
		
		return {
			hUnits: hU,
			vUnits: vU,
			ptSpreadPosX:xy[0], // [fix100127]
			ptSpreadPosY:xy[1], // [fix100127]
			ptSizeX:d.size[0],
			ptSizeY:d.size[1],
			angleR:d.angles[0],
			angleS:d.angles[1],
			};
		};

	var set_Metrics = function(newPos, newSize, newAngles)
		{
		var d = datas||{pageBounds:null,size:[10,10],bounds:[0,0,10,10],angles:[0,0]};
		
		if (newPos[0]!==null) d.bounds[1]=d.bounds[3]= newPos[0];
		if (newPos[1]!==null) d.bounds[0]=d.bounds[2]= newPos[1];

		if (newSize[0]!==null) d.size[0]=newSize[0];
		if (newSize[1]!==null) d.size[1]=newSize[1];
		
		if (newAngles[0]!==null) d.angles[0]=newAngles[0];
		if (newAngles[1]!==null) d.angles[1]=newAngles[1];

		datas = d;
		};

	var bef_exe = function(datas_)
		{
		rfPoint = app.activeWindow.transformReferencePoint;
		pgMove = [0,0];
		execs = [];

		var ss = settings.get();
		if (ss.rePosX && datas_.pageBounds!==null)
			execs.push(exe_setPageMove(datas_.pageBounds));
		if (ss.reSize)
			execs.push(exe_reSize(datas_.size,ss.reSizeX,ss.reSizeY));
		if (ss.reAngle)
			execs.push(exe_reAngle(datas_.angles,ss.reAngleR,ss.reAngleS));
		if (ss.rePos)
			execs.push(exe_rePos(datas_.bounds,ss.rePosX,ss.rePosY));
		eSize = execs.length;
		};

	return {
		copyCoords: function()
			{ // this: PageItem
			resetToPointsConverter(); // [fix100127]
			datas = getCoords.call(this);
			},
		setDatas: function(d)
			{
			var p;
			for(p in d) datas[p] = d[p];
			},
		applyCoords: function()
			{ // this: PageItem[]
			resetToPointsConverter(); // [fix100127]
			bef_exe(datas);
			var lck,i,o,obj,sz=this.length;
			for(o = 0; o<sz ; o++)
				{
				obj = this[o];
				lck = obj.locked;
				obj.locked = false;
				for(i=0 ; i<eSize ; i++) execs[i].call(obj);
				obj.locked = lck;
				}
			},
		swapCoords: function()
			{ // this: PageItem[2]
			resetToPointsConverter(); // [fix100127]
			var tDatas = [getCoords.call(this[0]),getCoords.call(this[1])];

			var obj,lck,o,i;
			for(o=0 ; o<=1 ; o++)
				{
				tDatas[o].pageBounds = null;
				bef_exe(tDatas[o]);
				obj = this[1-o];
				lck = obj.locked;
				obj.locked = false;
				for(i=0 ; i<eSize ; i++) execs[i].call(obj);
				obj.locked = lck;
				}
			},
		getMetrics: function()
			{
			return get_Metrics();
			},
		setMetrics: function(newPos, newSize, newAngles)
			{
			set_Metrics(newPos, newSize, newAngles);
			},
		enable: function()
			{
			var ss = settings.get();
			return (!!datas) && (ss.reSize||ss.reAngle||ss.rePos);
			},
		};
	})();

var dlg = (function()
	{
	var minW = 90;
	if ( L10N.locale == 'FRENCH_LOCALE' ) minW = 120;
	if ( L10N.locale == 'RUSSIAN_LOCALE' ) minW = 120;
	if ( L10N.locale == 'GERMAN_LOCALE' ) minW = 130;
	
	// [fix100127]
	/*
	var meBoxToUnit = function()
		{ // this: MeasurementEditbox
		return UnitValue(this.editValue,'pt').as(UNITS[this.editUnits]);
		};
	*/
	// [/fix100127]
		
	var dlgTitle = ' '+__("Equalizer 2.0 - Preferences")+'  |  \u00A9Indiscripts.com';
	var d = app.dialogs.add({name:dlgTitle, canCancel:true});
	var p = d.dialogColumns.add().borderPanels.add().dialogColumns.add();
	
	var addBlock = function(eBoxType, caption0, caption1)
		{ // this: container
		var rw = this.dialogRows.add();
		var eg0 = rw.enablingGroups.add({staticLabel:caption0});
		var eg0_edit = eg0[eBoxType].add({smallNudge:1,largeNudge:1,minWidth:minW});
		var eg1 = rw.enablingGroups.add({staticLabel:caption1});
		var eg1_edit = eg1[eBoxType].add({smallNudge:1,largeNudge:1,minWidth:minW});
		return {
			eGroups: [eg0,eg1],
			eGroupEdits: [eg0_edit,eg1_edit],
			};
		};

	var ctrls =
		{
		rePos: addBlock.call(p,'measurementEditboxes',__("X Location"),__("Y Location")),
		reSize: addBlock.call(p,'measurementEditboxes',__("Width"),__("Height")),
		reAngle: addBlock.call(p,'angleEditboxes',__("Rotation"),__("Shear")),
		};
		
	ctrls.reAngle.eGroupEdits[0].minimumValue = -180;
	ctrls.reAngle.eGroupEdits[0].maximumValue = 180;
	ctrls.reAngle.eGroupEdits[1].minimumValue = -89;
	ctrls.reAngle.eGroupEdits[1].maximumValue = 89;
	
	var m;

	return {
		show: function()
			{
			m = process.getMetrics();
			var ss = settings.get();
			(function(ctrl){ // rePos
				var egp = ctrl.eGroups;
				var eged = ctrl.eGroupEdits;
				egp[0].checkedState = ss.rePosX;
				eged[0].editUnits = m.hUnits;
				eged[0].editValue = m.ptSpreadPosX; // [fix100127]
				egp[1].checkedState = ss.rePosY;
				eged[1].editUnits = m.vUnits;
				eged[1].editValue = m.ptSpreadPosY; // [fix100127]
				})(ctrls.rePos);
			(function(ctrl){ // reSize
				var egp = ctrl.eGroups;
				var eged = ctrl.eGroupEdits;
				egp[0].checkedState = ss.reSizeX;
				eged[0].editUnits = m.hUnits;
				eged[0].editValue = m.ptSizeX;
				egp[1].checkedState = ss.reSizeY;
				eged[1].editUnits = m.vUnits;
				eged[1].editValue = m.ptSizeY;
				})(ctrls.reSize);
			(function(ctrl){ // reAngle
				var egp = ctrl.eGroups;
				var eged = ctrl.eGroupEdits;
				egp[0].checkedState = ss.reAngleR;
				eged[0].editValue = m.angleR;
				egp[1].checkedState = ss.reAngleS;
				eged[1].editValue = m.angleS;
				})(ctrls.reAngle);
			
			return d.show();
			},
		saveSettings: function()
			{
			var ss = {
				rePosX: ctrls.rePos.eGroups[0].checkedState,
				rePosY: ctrls.rePos.eGroups[1].checkedState,
				reSizeX: ctrls.reSize.eGroups[0].checkedState,
				reSizeY: ctrls.reSize.eGroups[1].checkedState,
				reAngleR: ctrls.reAngle.eGroups[0].checkedState,
				reAngleS: ctrls.reAngle.eGroups[1].checkedState,
				};
			settings.save(ss);
			
			var newPos = [
				ss.rePosX?ctrls.rePos.eGroupEdits[0].editValue:null, // [fix100127]
				ss.rePosY?ctrls.rePos.eGroupEdits[1].editValue:null, // [fix100127]
				];
			var newSize = [
				ss.reSizeX?ctrls.reSize.eGroupEdits[0].editValue:null,
				ss.reSizeY?ctrls.reSize.eGroupEdits[1].editValue:null,
				];
			var newAngles = [
				ss.reAngleR?ctrls.reAngle.eGroupEdits[0].editValue:null,
				ss.reAngleS?ctrls.reAngle.eGroupEdits[1].editValue:null,
				];
			process.setMetrics(newPos, newSize, newAngles);
			},
		};
	})();


var menuInterface = (function()
	{ // Installation
	var Handler = function(/*str*/title,/*bool*/adjustTitle,/*fct*/handler,/*fct*/setEnable)
		{
		this.action = null;
		this.title = (adjustTitle)?
			( ((L10N.locale=='GERMAN_LOCALE') || (L10N.locale=='ARABIC_LOCALE')) ?
				function(){return settings.caption()+' '+title;}:
				function(){return title+' '+settings.caption();}
				):
			function(){return title;};
		this.handler = handler;
		this.setEnable = setEnable||function(){return true;};
		}

	var handlers = {
		//---------------
		eqPreferences: new Handler(__("Equalizer Preferences..."),false,
			function(ev)
				{
				if(dlg.show())
					{
					dlg.saveSettings();
					}
				}),
		//---------------
		eqSwap: new Handler(__("Swap:"),true,
			function(ev)
				{
				try {
					app.doScript('process.swapCoords.call(app.selection);', ScriptLanguage.javascript,
					undefined, UndoModes.entireScript, ev.target.title);
					}
				catch(ex)
					{
					alert(__("Unable to swap the coordinates:")+' '+ex);
					}
				},
			function()
				{
				var s = app.selection;
				var r = (s.length==2) && ('geometricBounds' in s[0]) && ('geometricBounds' in s[1]);
				if( this.action ) this.action.enabled = r;
				return r;
				}),
		//---------------
		eqPaste: new Handler(__("Apply:"),true,
			function(ev)
				{
				try {
					app.doScript('process.applyCoords.call(app.selection);', ScriptLanguage.javascript,
					undefined, UndoModes.entireScript, ev.target.title);
					}
				catch(ex)
					{
					alert(__("Unable to apply the coordinates:")+' '+ex);
					}
				},
			function()
				{
				var r = process.enable();
				if( this.action ) this.action.enabled = r;
				return r;
				}),
		//---------------
		eqCopy: new Handler(__("Copy Coordinates"),false,
			function(ev)
				{
				process.copyCoords.call(app.selection[0]);
				},
			function()
				{
				var s = app.selection;
				var r = (s.length==1) && ('geometricBounds' in s[0]);
				if( this.action ) this.action.enabled = r;
				return r;
				}),
		};

	var smActions = app.scriptMenuActions;
	var ctxMenu = app.menus.item('$ID/RtMouseLayout');
	var sma, p, p0, h, r={};
	var ctxItems = ctxMenu.menuItems;
	for(p in handlers)
		{
		h = handlers[p];
		p0 = p0||p;
		sma = h.action = smActions.add(p);
		sma.title = h.title();
		sma.addEventListener('onInvoke', h.handler);
		r[p] = ctxItems.add(sma, LocationOptions.AT_BEGINNING);
		}
	ctxMenu.menuSeparators.add(LocationOptions.AFTER,r[p0]);
	
	ctxMenu.addEventListener('beforeDisplay',function(ev)
		{
		// [fix091119] -- prevents conflict when 'beforeDisplay' untimely occurs due to other startup script(s)
		if(!app.documents.length) return;
		// [/fix091119]
		var p;
		for(p in handlers)
			{
			handlers[p].setEnable();
			handlers[p].action.title = handlers[p].title();
			}
		});
	
	return {
		menuItems: r,
		};
	})();

return 'Equalizer Installed';
})();
