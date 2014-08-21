var testRegister = require('../custom_modules/test-register.js')();

testRegister.addTest('basicMFCObjects', function() {
	this.execute(function(data){
		return {
			mfc : typeof window.mfc,
			settings : (typeof window.mfc !== 'undefined') ? typeof window.mfc.settings : typeof window.mfc,
			controller : (typeof window.mfc !== 'undefined') ? typeof window.mfc.controller : typeof window.mfc,
			tools : (typeof window.mfc !== 'undefined') ? typeof window.mfc.tools : typeof window.mfc,
			app : (typeof window.mfc !== 'undefined') ? typeof window.mfc.app : typeof window.mfc,
			amplify : typeof window.amplify,
			require : typeof window.requirejs,
			define : typeof window.define,
			jquery : typeof window.$
		}

	}, [], function(result){

		var win = result.value;

		this.verify.equal(win.mfc, 'object', 'window.mfc is an object');
		this.verify.equal(win.settings, 'object', 'mfc.settings object is present');
		this.verify.equal(win.controller, 'object', 'mfc.controller object is present');
		this.verify.equal(win.tools, 'object', 'mfc.tools object is present');
		this.verify.equal(win.app, 'object', 'mfc.app object is present')
		
		this.verify.equal(win.amplify, 'object', 'amplify object loaded');
		this.verify.equal(win.require, 'function', 'require.js loaded');
		this.verify.equal(win.define, 'function', 'require.js define() method present');
		this.verify.equal(win.jquery, 'function', 'jQuery loaded');

	});
})

testRegister.addTest('errors', function() {
	this.execute(
		function() {
			return window.mfcJSErrors;
		},
		[],
		function(result) {
			var errorMessage = "";
			
			if (typeof result !== "undefined" && typeof result.value !== "undefined" && result.value !== null) {
				
					for (var i = 0; i < result.value.length; i ++) {
						errorMessage += " " + (i+1) + ") ";
						if (result.value[i].originalEvent) {
							errorMessage += (result.value[i].originalEvent.message);
						} else if (result.value[i].message) {
							errorMessage += result.value[i].message;
						} else {
							try	{
								errorMessage += result.value[i];
							} catch (e) {
								console.warn("[[in testsJS('errors'), found an error but it didn't conform to the normal structure, see below]]");
								console.warn(result.value[i]);
							}
						};
						if (result.value.length < i+1) {
							errorMessage += '\n ';
						};
					}
			}
			if (result.value === null) {
				result.value = [];
			};

			if (errorMessage.length > 1) 
				errorMessage = ": " + errorMessage;

			this.verify.ok(result.value.length === 0, "No JS errors" + errorMessage);
		}
	)
})

module.exports.command = function(config) {
	testRegister.runTests(this, config);
	return this;
}

