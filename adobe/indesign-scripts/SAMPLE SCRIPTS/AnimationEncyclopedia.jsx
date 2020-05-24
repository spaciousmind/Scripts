//AnimationEncyclopedia.jsx
//An InDesign JavaScript
//
//Author:  Brenda Burden
//Creates a 6-page sample doc demonstrating the InDesign Animation feature

// Search Reference
// PAGE ONE - Sample of Animation Properties 
// PAGE TWO - Sample of all Animation Events
// PAGE THREE - Sample of Additional Animation Properties and Settings, including Duration, Play count, Loop, Speed and Origin
// PAGE FOUR - Sample of Animate To, Animate From, To Current location
// PAGE FIVE - Sample of creating Timing Groups, setting Delays, and looping a Timing Group
// PAGE SIX - Complex A-B-C-D animation that can be created only through scripting (cannot be created in the UI)
main()
function main(){
	mySetSWFExportPreferences();
	var myDocument = app.documents.add();
	mySetUnits(MeasurementUnits.inches);
	myDocument.transparencyPreferences.blendingSpace = BlendingSpace.RGB;
	myDocument.documentPreferences.facingPages = false;
	myDocument.documentPreferences.pageWidth = 11.111;
	myDocument.documentPreferences.pageHeight = 8.333;
	var myRed = myMakeColor("Red", ColorSpace.RGB, ColorModel.process, [255, 0, 0]);
	var myGreen = myMakeColor("Green", ColorSpace.RGB, ColorModel.process, [0, 255, 0]);
	var myBlue = myMakeColor("Blue", ColorSpace.RGB, ColorModel.process, [0, 0, 255]);
	var myPurple = myMakeColor("Purple", ColorSpace.RGB, ColorModel.process, [200, 0, 255]);
	var myLightGray = myMakeColor("Light Gray", ColorSpace.RGB, ColorModel.process, [200, 200, 200]);
	var myNoneSwatch = myDocument.swatches.item("None");
	//
	//Page 1
	//
	//Create a motion path using motionPathPoints. This is similar to drawing a regular path using the
	//entirePath property. If you wish to set keyframes to correspond to points in the path, use motionPath 
	//instead of motionPathPoints. See example on Page 6.
	mySetUnits(MeasurementUnits.points);
	var myMotionPath = [[[[0,0],[0,0],[0,0]],[[565, 0],[565, 0],[565, 0]] ],true];
	var myCurvedMotionPath = [[[[0,0],[0,0],[0,0]],[[565,0],[565,-150],[565,0]] ],true]; 
	mySetUnits(MeasurementUnits.inches);
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(0), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(0), [.25,0,1,11.111], "Animation Properties", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text labels.
	myMakeTextFrame(myDocument.pages.item(0), [1.25,1,1.625,10.5], "Motion Path", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [2.25,1,2.625,10.5], "Rotation", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [3.25,1,3.625,10.5], "Opacity", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [4.25,1,4.625,10.5], "Scale", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [5.25,1,5.625,10.5], "Combination", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [6.25,1,6.625,10.5], "Color Fade", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(0), [7.25,1,7.625,10.5], "Motion Path with Curve", "Myriad Pro", 18, Justification.leftAlign, true);
	//Add rectangles.
	var myRectangle1P1 = myMakeRectangle(myDocument.pages.item(0), [1.625,1,2,2], "Motion Path Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle2P1 = myMakeRectangle(myDocument.pages.item(0), [2.625,1,3,2], "Rotation Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle3P1 = myMakeRectangle(myDocument.pages.item(0), [3.625,1,4,2], "Opacity Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle4P1 = myMakeRectangle(myDocument.pages.item(0), [4.625,1,5,2], "Scale Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle5P1 = myMakeRectangle(myDocument.pages.item(0), [5.625,1,6,2], "Combination Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle6P1 = myMakeRectangle(myDocument.pages.item(0), [6.625,1,7,2], "Color Fade Rectangle Blue", myBlue, myNoneSwatch, 0);
	var myRectangle7P1 = myMakeRectangle(myDocument.pages.item(0), [6.625,1,7,2], "Color Fade Rectangle Purple", myPurple, myNoneSwatch, 0);
	var myRectangle8P1 = myMakeRectangle(myDocument.pages.item(0), [7.625,1,8,2], "Motion Path with Curve Rectangle", myPurple, myNoneSwatch, 0);
	//Add animation properties.
	myRectangle1P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle2P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle2P1.animationSettings.rotationArray = [[0, 0], [23, 270]];
	myRectangle3P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle3P1.animationSettings.opacityArray = [[0,100],[23,10]];  
	myRectangle4P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle4P1.animationSettings.scaleXArray = [[0,100],[23,20]];  
	myRectangle4P1.animationSettings.scaleYArray = [[0,100.0],[23,20]];  
	myRectangle5P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle5P1.animationSettings.scaleXArray = [[0,100],[23,120]];  
	myRectangle5P1.animationSettings.scaleYArray = [[0,100],[23,10]];  
	myRectangle5P1.animationSettings.rotationArray = [[0,0],[23,-270]];  
	myRectangle5P1.animationSettings.opacityArray = [[0,100],[23,25]];  
	myRectangle6P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle6P1.animationSettings.opacityArray = [[0,0],[23,100]]; 
	myRectangle7P1.animationSettings.motionPathPoints = myMotionPath;
	myRectangle7P1.animationSettings.opacityArray = [[0,100],[23, 50]]; 
	myRectangle8P1.animationSettings.motionPathPoints = myCurvedMotionPath;
	var myPageOneTimingSettings = myDocument.spreads.item(0).timingSettings;
	//Remove the default On Page Load timing list.
	myPageOneTimingSettings.timingLists[0].remove();
	//Add an On Page Click timing list.
	var p1TimingOnPageClickList = myPageOneTimingSettings.timingLists.add({triggerEvent:DynamicTriggerEvents.onPageClick});
	//Add Animations as separate On Page Click Timing Groups
	var p1timingGroup1 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle1P1, delaySeconds: 0});
	var p1timingGroup2 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle2P1, delaySeconds: 0}); 
	var p1timingGroup3 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle3P1, delaySeconds: 0}); 
	var p1timingGroup4 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle4P1, delaySeconds: 0}); 
	var p1timingGroup5 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle5P1, delaySeconds: 0}); 
	var p1timingGroup6 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle6P1, delaySeconds: 0}); 
	//Link Rectangle 6 and 7
	p1timingGroup6.timingTargets.add({dynamicTarget: myRectangle7P1, delaySeconds: 0});
	var p1timingGroup7 = p1TimingOnPageClickList.timingGroups.add({dynamicTarget: myRectangle8P1, delaySeconds: 0});
	//
	//Page 2
	//
	var myMotionPreset = app.motionPresets.item("twirl");
	myDocument.pages.add();
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(1), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(1), [.25,0,1,11.111], "Animation Events", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text labels.
	myMakeTextFrame(myDocument.pages.item(1), [1.25,1,1.625,10.5], "On Page Load", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(1), [2.25,1,2.625,10.5], "On Page Click", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(1), [3.25,1,3.625,10.5], "On Click (Self)", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(1), [4.25,1,4.625,10.5], "On Roll Over (Self)", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(1), [5.25,1,5.625,10.5], "On Button Event (On Click)", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(1), [6.25,1,6.625,10.5], "On State Load of Multi-State Object", "Myriad Pro", 18, Justification.leftAlign, true);
	//Add rectangles.
	var myRectangle1P2 = myMakeRectangle(myDocument.pages.item(1), [1.625,1,2,2], "On Page Load Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle2P2 = myMakeRectangle(myDocument.pages.item(1), [2.625,1,3,2], "On Page Click Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle3P2 = myMakeRectangle(myDocument.pages.item(1), [3.625,1,4,2], "Self Click Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle4P2 = myMakeRectangle(myDocument.pages.item(1), [4.625,1,5,2], "Self Roll Over Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle5P2 = myMakeRectangle(myDocument.pages.item(1), [5.625,1,6,2], "On Button Event (On Click) Rectangle", myPurple, myNoneSwatch, 0);
	//Apply the motion preset to the rectangles.
	myRectangle1P2.animationSettings.preset = myMotionPreset;
	myRectangle2P2.animationSettings.preset = myMotionPreset;
	myRectangle3P2.animationSettings.preset = myMotionPreset;
	myRectangle4P2.animationSettings.preset = myMotionPreset;
	myRectangle5P2.animationSettings.preset = myMotionPreset;
	//Add a button to control the animation of myRectangle5P2.
	var myPlayAnimationButton = myDocument.pages.item(1).buttons.add({geometricBounds:[5.625,3,6,4], name:"Play Animation Button", fillColor: myGreen, strokeColor: myNoneSwatch});
	var myAnimationBehavior = myPlayAnimationButton.animationBehaviors.add({behaviorEvent:BehaviorEvents.mouseDown, enableBehavior:true, animatedPageItem:myRectangle5P2, autoReverseOnRollOff:false, operation:AnimationPlayOperations.play});
	//Add a Multi-State Object (MSO).
	var myMSO = myDocument.pages.item(1).multiStateObjects.add({geometricBounds:[6.625,1,7,2], name:"Simple MSO", initiallyHidden:true});
	//Name default states.
	myMSO.states.item(0).name = "Top State";
	var myTopState = myMSO.states.item(0);
	myMSO.states.item(1).name = "Second State";
	var mySecondState = myMSO.states.item(1);
	var myThirdState = myMSO.states.add();
	myThirdState.name = "Third State";
	//Add page items to the states.
	var myRectangleMSO = myMakeRectangle(myTopState, [6.625,1,7,2], "Top State Rectangle", myPurple, myNoneSwatch, 0);
	myRectangleMSO.animationSettings.preset = myMotionPreset;
	var myOvalMSO = myMakeRectangle(mySecondState, [6.625,1,7,2], "Second State Oval", myPurple, myNoneSwatch, 0);
	myOvalMSO.convertShape(ConvertShapeOptions.convertToOval);
	myOvalMSO.animationSettings.preset = myMotionPreset;
	var myPolygonMSO = myMakeRectangle(myThirdState, [6.625,1,7,2], "Third State Polygon", myPurple, myNoneSwatch, 0);
	myPolygonMSO.convertShape(ConvertShapeOptions.convertToPolygon);
	myPolygonMSO.animationSettings.preset = myMotionPreset;
	//Add a button to control the animation of myMSO.
	var myPlayMSOButton = myDocument.pages.item(1).buttons.add({geometricBounds:[6.625,3,7,4], name:"Go to Next State of MSO Button", fillColor: myGreen, strokeColor: myNoneSwatch});	
	var myMSOBehavior = myPlayMSOButton.gotoNextStateBehaviors.add({associatedMultiStateObject:myMSO, loopsToNextOrPrevious:true, behaviorEvent:BehaviorEvents.mouseDown});
	//Page 2 timing section:
	var mySecondSpreadTimingSettings = myDocument.spreads.item(1).timingSettings;
	//Remove the default timing list.
	mySecondSpreadTimingSettings.timingLists.item(0).remove();
	//Create On Page Load
	var mySecondPageLoadTimingList = mySecondSpreadTimingSettings.timingLists.add({triggerEvent:DynamicTriggerEvents.onPageLoad});
	var secondSpreadTimingG1 = mySecondPageLoadTimingList.timingGroups.add({dynamicTarget: myRectangle1P2, delaySeconds: 0});
	//Create On Page Click
	var mySecondPageClickTimingList = mySecondSpreadTimingSettings.timingLists.add({triggerEvent:DynamicTriggerEvents.onPageClick});
	var secondSpreadTimingG2 = mySecondPageClickTimingList.timingGroups.add({dynamicTarget: myRectangle2P2, delaySeconds: 0.0});
	//Create Self Click
	var myRectangle3P2TimingList = myRectangle3P2.timingSettings.timingLists.add({triggerEvent:DynamicTriggerEvents.onSelfClick});
	//Create Self Roll Over
	var myRectangle4P2TimingList = myRectangle4P2.timingSettings.timingLists.add({triggerEvent:DynamicTriggerEvents.onSelfRollover});	
	//
	//Page 3
	//
	myDocument.pages.add();
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(2), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(2), [.25,0,1,11.111], "Additional Animation Properties and Settings", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text labels.
	myMakeTextFrame(myDocument.pages.item(2), [1.25,1,1.625,10.5], "Duration: 2 seconds", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [2.25,1,2.625,10.5], "Duration: .5 seconds", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [3.25,1,3.625,10.5], "Speed: Ease In", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [4.25,1,4.625,10.5], "Speed: Ease Out", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [5.25,1,5.625,10.5], "Speed: Ease In and Out", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [6.25,1,6.625,10.5], "Play Twice", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [7.25,1,7.625,10.5], "Loop", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [1.25,5,1.625,10.5], "Hide Until Animated", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [2.25,5,2.625,10.5], "Hide After Animating", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [3.25,5,3.625,10.5], "Origin Upper Left Corner", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(2), [4.25,5,4.625,10.5], "Origin Right, Vertical Center", "Myriad Pro", 18, Justification.leftAlign, true);	
	//Add rectangles.
	var myRectangle1P3 = myMakeRectangle(myDocument.pages.item(2), [1.625,1,2,2], "2-Second Duration Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle2P3 = myMakeRectangle(myDocument.pages.item(2), [2.625,1,3,2], ".5-Second Duration Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle3P3 = myMakeRectangle(myDocument.pages.item(2), [3.625,1,4,2], "Ease In Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle4P3 = myMakeRectangle(myDocument.pages.item(2), [4.625,1,5,2], "Ease Out Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle5P3 = myMakeRectangle(myDocument.pages.item(2), [5.625,1,6,2], "Ease In and Out Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle6P3 = myMakeRectangle(myDocument.pages.item(2), [6.625,1,7,2], "Play Twice Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle7P3 = myMakeRectangle(myDocument.pages.item(2), [7.625,1,8,2], "Loop Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle8P3 = myMakeRectangle(myDocument.pages.item(2), [1.625,5,2,6], "Hide Until Animated Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle9P3 = myMakeRectangle(myDocument.pages.item(2), [2.625,5,3,6], "Hide After Animating Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle10P3 = myMakeRectangle(myDocument.pages.item(2), [3.625,5,4,6], "Origin Upper Left Rectangle", myPurple, myNoneSwatch, 0);
	var myRectangle11P3 = myMakeRectangle(myDocument.pages.item(2), [4.625,5,5,6], "Origin Right Center Rectangle", myPurple, myNoneSwatch, 0);
	//Set animation properties.
	myRectangle1P3.animationSettings.duration = 2;
	myRectangle1P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle2P3.animationSettings.duration = 0.5;
	myRectangle2P3.animationSettings.rotationArray = [[0,0],[11,180]];
	myRectangle3P3.animationSettings.duration = 2;
	myRectangle3P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle3P3.animationSettings.easeType = AnimationEaseOptions.easeIn;
	myRectangle4P3.animationSettings.duration = 2;
	myRectangle4P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle4P3.animationSettings.easeType = AnimationEaseOptions.easeOut;
	myRectangle5P3.animationSettings.duration = 2;
	myRectangle5P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle5P3.animationSettings.easeType = AnimationEaseOptions.easeInOut;
	myRectangle6P3.animationSettings.duration = 2;
	myRectangle6P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle6P3.animationSettings.plays = 2;
	myRectangle7P3.animationSettings.duration = 2;
	myRectangle7P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle7P3.animationSettings.playsLoop = true;
	myRectangle8P3.animationSettings.duration = 2;
	myRectangle8P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle8P3.animationSettings.initiallyHidden = true;
	myRectangle8P3.animationSettings.hiddenAfter = false;
	myRectangle9P3.animationSettings.duration = 2;
	myRectangle9P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle9P3.animationSettings.initiallyHidden = false;
	myRectangle9P3.animationSettings.hiddenAfter = true;
	myRectangle10P3.animationSettings.duration = 2;
	myRectangle10P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle10P3.animationSettings.transformOffsets = [0, 0];
	myRectangle11P3.animationSettings.duration = 2;
	myRectangle11P3.animationSettings.rotationArray = [[0,0],[47,180]];
	myRectangle11P3.animationSettings.transformOffsets = [1.0,0.5];
	//
	//Page 4
	//
	myDocument.pages.add();
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(3), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(3), [.25,0,1,11.111], "Animate Options", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text labels.
	myMakeTextFrame(myDocument.pages.item(3), [1.25,1,1.625,10.5], "Animate: From Current Appearance", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(3), [2.25,1,2.625,10.5], "Animate: To Current Appearance", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(3), [3.25,1,3.625,10.5], "Animate: To Current Location", "Myriad Pro", 18, Justification.leftAlign, true);
	//Add rectangles.
	var myRectangle1P4 = myMakeRectangle(myDocument.pages.item(3), [1.625,1,2,2], "Animate From Current Appearance", myPurple, myNoneSwatch, 0);
	var myRectangle2P4 = myMakeRectangle(myDocument.pages.item(3), [2.625,1,3,2], "Animate To Current Appearance", myPurple, myNoneSwatch, 0);
	var myRectangle3P4 = myMakeRectangle(myDocument.pages.item(3), [3.625,1,4,2], "Animate To Current Location", myPurple, myNoneSwatch, 0);
	//Set animation properties.
	myRectangle1P4.animationSettings.preset = app.motionPresets.item("move-right-grow");
	myRectangle1P4.animationSettings.designOption = DesignOptions.FROM_CURRENT_APPEARANCE;
	myRectangle2P4.animationSettings.preset =  app.motionPresets.item("move-right-grow");
	myRectangle2P4.animationSettings.designOption = DesignOptions.TO_CURRENT_APPEARANCE;
	myRectangle3P4.animationSettings.preset = app.motionPresets.item("fly-in-left");
	//
	//Page 5
	//
	myDocument.pages.add();
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(4), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(4), [.25,0,1,11.111], "Timing Panel - Timing Groups and Delays", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text labels.
	myMakeTextFrame(myDocument.pages.item(4), [1.25,1,1.625,10.5], "A-1", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [2.25,1,2.625,10.5], "A-2", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [3.25,1,3.625,10.5], "A-3", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [4.25,1,4.625,10.5], "A-4", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [5.25,1,5.625,10.5], "B-1", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [6.25,1,6.625,10.5], "B-2", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [7.25,1,7.625,10.5], "B-3", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [1.25,5,1.625,10.5], "C-1", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [2.25,5,2.625,10.5], "C-2", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [3.25,5,3.625,10.5], "C-3", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [4.25,5,4.625,10.5], "C-4", "Myriad Pro", 18, Justification.leftAlign, true);
	myMakeTextFrame(myDocument.pages.item(4), [5.25,5,5.625,10.5], "C-5", "Myriad Pro", 18, Justification.leftAlign, true);
	//Add rectangles.
	var myRectangle1P5 = myMakeRectangle(myDocument.pages.item(4), [1.625,1,2,2], "A-1", myPurple, myNoneSwatch, 0);
	var myRectangle2P5 = myMakeRectangle(myDocument.pages.item(4), [2.625,1,3,2], "A-2", myPurple, myNoneSwatch, 0);
	var myRectangle3P5 = myMakeRectangle(myDocument.pages.item(4), [3.625,1,4,2], "A-3", myPurple, myNoneSwatch, 0);
	var myRectangle4P5 = myMakeRectangle(myDocument.pages.item(4), [4.625,1,5,2], "A-4", myPurple, myNoneSwatch, 0);
	var myRectangle5P5 = myMakeRectangle(myDocument.pages.item(4), [5.625,1,6,2], "B-1", myGreen, myNoneSwatch, 0);
	var myRectangle6P5 = myMakeRectangle(myDocument.pages.item(4), [6.625,1,7,2], "B-2", myGreen, myNoneSwatch, 0);
	var myRectangle7P5 = myMakeRectangle(myDocument.pages.item(4), [7.625,1,8,2], "B-3", myGreen, myNoneSwatch, 0);
	var myRectangle8P5 = myMakeRectangle(myDocument.pages.item(4), [1.625,5,2,6], "C-1", myBlue, myNoneSwatch, 0);
	var myRectangle9P5 = myMakeRectangle(myDocument.pages.item(4), [2.625,5,3,6], "C-2", myBlue, myNoneSwatch, 0);
	var myRectangle10P5 = myMakeRectangle(myDocument.pages.item(4), [3.625,5,4,6], "C-3", myBlue, myNoneSwatch, 0);
	var myRectangle11P5 = myMakeRectangle(myDocument.pages.item(4), [4.625,5,5,6], "C-4", myBlue, myNoneSwatch, 0);
	var myRectangle12P5 = myMakeRectangle(myDocument.pages.item(4), [5.625,5,6,6], "C-5", myBlue, myNoneSwatch, 0);
	//Animation settings (note that you cannot use a page item as the target of a timing group
	//if you have not applied animation settings to the it).
	myRectangle1P5.animationSettings.preset = myMotionPreset;
	myRectangle2P5.animationSettings.preset = myMotionPreset;
	myRectangle3P5.animationSettings.preset = myMotionPreset;
	myRectangle4P5.animationSettings.preset = myMotionPreset;
	myRectangle5P5.animationSettings.preset = myMotionPreset;
	myRectangle6P5.animationSettings.preset = myMotionPreset;
	myRectangle7P5.animationSettings.preset = myMotionPreset;
	myRectangle8P5.animationSettings.preset = myMotionPreset;
	myRectangle9P5.animationSettings.preset = myMotionPreset;
	myRectangle10P5.animationSettings.preset = myMotionPreset;
	myRectangle11P5.animationSettings.preset = myMotionPreset;
	myRectangle12P5.animationSettings.preset = myMotionPreset;
	//Page 5 timing section:
	var myFifthSpreadTimingSettings = myRectangle1P5.parent.timingSettings;
	myFifthSpreadTimingSettings.timingLists.item(0).remove();
	var myFifthPageLoadTimingList = myFifthSpreadTimingSettings.timingLists.add(DynamicTriggerEvents.onPageLoad);
	//A group.
	var myFifthSpreadTimingG1 = myFifthPageLoadTimingList.timingGroups.add(myRectangle1P5, 0);
	myFifthSpreadTimingG1.timingTargets.add (myRectangle2P5, 0);
	myFifthSpreadTimingG1.timingTargets.add (myRectangle3P5, 0);
	myFifthSpreadTimingG1.timingTargets.add (myRectangle4P5, 0);
	//B group.
	var myFifthSpreadTimingG2 = myFifthPageLoadTimingList.timingGroups.add(myRectangle5P5, 1);
	myFifthSpreadTimingG2.timingTargets.add (myRectangle6P5,.5);
	myFifthSpreadTimingG2.timingTargets.add (myRectangle7P5, 1);
	//Enable Group Loop
	myFifthSpreadTimingG2.playsLoop = true;
	//C group.
	var myFifthSpreadTimingG3 = myFifthPageLoadTimingList.timingGroups.add(myRectangle8P5, .25);
	myFifthSpreadTimingG3.timingTargets.add (myRectangle9P5, .25);
	myFifthSpreadTimingG3.timingTargets.add (myRectangle10P5, .25);
	myFifthSpreadTimingG3.timingTargets.add (myRectangle11P5, .25);
	myFifthSpreadTimingG3.timingTargets.add (myRectangle12P5, .25);
	//Enable Group Plays 2
	myFifthSpreadTimingG3.plays = 2;
	//
	//Page 6
	//
	myDocument.pages.add();
	//Create a background rectangle.
	myMakeRectangle(myDocument.pages.item(5), [0,0,8.333,11.111], "Background Rectangle", myLightGray, myNoneSwatch, 0); 
	//Create a headline text frame.
	myMakeTextFrame(myDocument.pages.item(5), [.25,0,1,11.111], "Scripted Animation with Multiple Property Changes", "Myriad Pro", 28, Justification.centerAlign, false);
	//Add text label.
	myMakeTextFrame(myDocument.pages.item(5), [1.25,1,1.625,10.5], "6-Second Animation with one or more property changes per second", "Myriad Pro", 18, Justification.leftAlign, true);
	//Add rectangle.
	var myRectangle1P6 = myMakeRectangle(myDocument.pages.item(5), [1.625,1,2,2], "Scripted Animation Rectangle", myPurple, myNoneSwatch, 0);
	//Set duration before adding keyframes when scripting animations
	myRectangle1P6.animationSettings.duration = 6;
	//Assumes 24 Frames Per Second (FPS)
	//23 = 1 second, 47 = 2 seconds, 71 = 3 seconds, 95 = 4 seconds, 119 = 5 seconds, 143 = 6 seconds
	mySetUnits(MeasurementUnits.points);
	//Note that the animation here is created with motionPath, which allows for setting keyframes that correspond to points in the path
	myRectangle1P6.animationSettings.motionPath = [[0, [[0, 0], [0, 0], [0, 0]]], [23, [[200, 0], [200, 0], [200, 0]]], [47, [[200, 200], [200, 200], [200, 200]]], [119, [[0, 200], [0, 200], [0, 200]]], [143, [[0, 0], [0, 0], [0, 0]]]];
	mySetUnits(MeasurementUnits.inches);
	//Note that this animation allows setting multiple changes in opacity, scale and rotation that 
	//correspond to points in the motion path.  This functionality is not available in the Animation panel UI.
	myRectangle1P6.animationSettings.rotationArray =  [[0, 0], [23, 180], [47, 0], [71, -180], [95, 0], [119, 180], [143, -360]];
	myRectangle1P6.animationSettings.scaleXArray = [ [0, 100.0 ], [23, 200.0], [47, 100.0], [71, 300.0], [95, 100.0], [119, 200.0], [143, 100.0] ];
	myRectangle1P6.animationSettings.scaleYArray = [ [0, 100.0 ], [23, 0.0], [47, 100.0], [71, 0.0], [95, 100.0], [119, 300.0], [143, 100.0] ];
	myRectangle1P6.animationSettings.opacityArray = [ [0, 100.0 ], [23, 0.0], [47, 100.0], [71, 0.0], [95, 100.0], [119, 0.0], [143, 100.0] ]; 
	myRectangle1P6.animationSettings.plays = 1;
	myRectangle1P6.animationSettings.playsLoop = false;
	myRectangle1P6.animationSettings.easeType = AnimationEaseOptions.noEase;
	myRectangle1P6.animationSettings.transformOffsets = [0.5, 0.5];
	myRectangle1P6.animationSettings.designOption = DesignOptions.fromCurrentAppearance; 
	myRectangle1P6.animationSettings.initiallyHidden = false;
	myRectangle1P6.animationSettings.hiddenAfter = false;
}
//Utility functions.
function mySetUnits(myUnits){
	app.documents.item(0).viewPreferences.horizontalMeasurementUnits = myUnits;
	app.documents.item(0).viewPreferences.verticalMeasurementUnits = myUnits;
}
function myMakeTextFrame(myPage, myBounds, myString, myFontName, myPointSize, myJustification, myFitToContent){
	var myTextFrame = myPage.textFrames.add({geometricBounds:myBounds});
	myTextFrame.texts.item(0).insertionPoints.item(0).contents = myString
	myTextFrame.texts.item(0).parentStory.appliedFont = app.fonts.item(myFontName);
	myTextFrame.texts.item(0).parentStory.pointSize = myPointSize;
	myTextFrame.texts.item(0).parentStory.fillColor = app.documents.item(0).swatches.item("Black");
	myTextFrame.texts.item(0).justification = myJustification;
	if(myFitToContent == true){
		myTextFrame.fit(FitOptions.frameToContent);
	}
	return myTextFrame;
}
function myMakeRectangle(myPage, myBounds, myString, myFillColor,  myStrokeColor, myStrokeWeight){
	var myRectangle = myPage.rectangles.add({geometricBounds:myBounds, fillColor:myFillColor, strokeWeight:myStrokeWeight, strokeColor:myStrokeColor, name:myString});
	return myRectangle;
}
function myMakeColor(myColorName, myColorSpace, myColorModel, myColorValue){
	var myColor;
	var myDocument = app.documents.item(0);
	myColor = myDocument.colors.item(myColorName);
	if(myColor.isValid == false){
		myColor = myDocument.colors.add({name:myColorName});
	}
	myColor.properties = {space:myColorSpace, model:myColorModel, colorValue:myColorValue};
	return myColor;
}
function mySetSWFExportPreferences(){
	app.swfExportPreferences.rasterizePages= false;
	app.swfExportPreferences.flattenTransparency = false;
	app.swfExportPreferences.dynamicMediaHandling = DynamicMediaHandlingOptions.includeAllMedia;
	app.swfExportPreferences.frameRate = 24;	
}
