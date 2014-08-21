module.exports = function() {

	var context = null,
		tests = [];

	function runAllTests() {
		for (var name in tests) {
			runTest(name);
		}
	}

	function addTest(name, test) {
		if (!tests[name])
			tests[name] = test;
	}	

	function runTests(con, params) {

		if (typeof con === "undefined") { console.log("test-register:runTests - Method runTests: 1st parameter must be the nightwatch context;"); return false;} 

		this.setContext(con);

		if (typeof params === "undefined" || typeof params.execute === "undefined") {
			runAllTests();
		} else {
			
			var tests = params.execute;

			if (typeof tests == "string" && tests == "all") {
				runAllTests();
			}
			else if (typeof tests == "string") {
				runTest(tests)
			}
			else if (Array.isArray(tests)) {
				for (var i = 0; i < tests.length; i++) {
					this.runTest(tests[i]);
				}
			}
		}

		
	}

	function runTest(name) {
		if (typeof tests[name] !== "undefined") {
			tests[name].call(context);
		}
	}

	function setContext(c) {
		context = c;
	}

	function viewTests() {
		for (var name in tests)
			console.log(name + ":" + tests[name])
	}

	return {
		runAllTests : runAllTests,
		addTest : addTest,
		runTests : runTests,
		runTest : runTest,
		setContext : setContext,
		viewTests : viewTests
	}
	
}