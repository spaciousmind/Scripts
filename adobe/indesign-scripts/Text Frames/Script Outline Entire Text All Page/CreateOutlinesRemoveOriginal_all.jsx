myPage = app.activeWindow.activePage;
for (j=myPage.textFrames.length- 1; j >= 0; j--){
	try{
		myPage.textFrames[j].createOutlines();
		myPage.textFrames[j].remove();
		}catch(e){}
	}