// Go to the master spread of the active page

(function () {
	try {
		var index;
		var page = app.windows[0].activePage;
		if (page.appliedMaster.pages.length === 1) {
			index = 0;
		} else {
			index = page.side === PageSideOptions.LEFT_HAND ? 0 : 1;
		}
		app.windows[0].activePage = page.appliedMaster.pages[index];
	} catch (_) {
	}
}());