module.exports.command = function(page, waitTime) {

	if (typeof waitTime == "undefined") waitTime = 50;

	this
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/f1200.png")

		.resizeWindow(1000, 800)
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/e1000.png")

		.resizeWindow(835, 800)
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/d835.png")

		.resizeWindow(615, 800)
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/c615.png")

		.resizeWindow(480, 800)
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/b480.png")

		.resizeWindow(320, 800)
		.pause(waitTime)
		.saveScreenshot("reports/breakpoints/"+page+"/a320.png")

		.resizeWindow(1200, 800)

	return this;

}