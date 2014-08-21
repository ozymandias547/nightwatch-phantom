var testURL = "/";

var tests = {
	
	"Homepage tests" : function(browser) {
		
		browser
			.url(browser.launch_url + testURL)
			.waitForPageLoad(30000)
			.waitForElementVisible('#page', 1000)
			
			.resizeWindow(1200, 800)

			// Click on 'about' menu nav item
			.waitForElementVisible('#about-nav-link a', 1000)
			.click('#about-nav-link a')
			.waitForElementVisible('#about', 1000)


			// Click on 'work' menu nav item
			.waitForElementVisible('#work-nav-link a', 1000)
			.click('#work-nav-link a')
			.waitForElementVisible('#work', 1000)


			// Click on 'insights' menu nav item
			.waitForElementVisible('#insights-nav-link a', 1000)
			.click('#insights-nav-link a')
			.waitForElementVisible('#insights', 1000)


			// Click on 'careers' menu nav item
			.waitForElementVisible('#careers-nav-link a', 1000)
			.click('#careers-nav-link a')
			.waitForElementVisible('#careers', 1000)


			// Click on 'contact' menu nav item
			.waitForElementVisible('#contact-nav-link a', 1000)
			.click('#contact-nav-link a')
			.waitForElementVisible('#contact_page', 1000)


			.end();
			
	}
}

module.exports = tests;