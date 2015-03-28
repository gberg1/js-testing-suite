//Implementats assertion
/*the function named assert creates a new <li> element containing the description, 
assigns a class named pass or fail, depending upon the value of the assertion parameter (value),
and it appends the new element to a list element in the document body */
function assert (value, desc) {
   var li = document.createElement("li");
   li.className = value ? "pass" : "fail";
   li.appendChild(document.createTextNode(desc));
   document.getElementById("results").appendChild(li);
}
//test suite contains two tests: one that will always succeed and one that will always fail
window.onload = function () {
	assert(true, "The test suite is running.");
	assert(false, "Fail!");
	};

//Implements test grouping using an immediate function
(function(){ 
/*includes a results variable that holds a reference to the current test group 
(this way the logging assertions are inserted correctly) */
	var results;
	this.assert = function assert (value, desc) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if (!value) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	this.test = function test (name, fn) {
		results = document.getElementById("results");
		results = assert(true, name).appendChild(
			document.createElement("ul"));
		fn();
	};
})();

window.onload = function() {
	test("A test.", function() {
		assert(true, "first assertion completed");
		assert(true, "Second assertion completed");
		assert(true, "Third assertion completed");
	}); 
	this.test("Another test.", function() {
		assert(true, "first assertion completed");
		assert(true, "Second assertion completed");
		assert(true, "Third assertion completed");
	});
	test("A third test.", function () {
		assert(null, "fail");
		assert(5, "pass")
	});
};

(function() {
		var queue = [], paused = false, results; 

/* test(fn) takes a function that contains a number of assertions - either run asynchronously or synchronously - and places it on the queue
to await execution */

		this.test = function(name, fn) {
			queue.push(function() {
				results = document.getElementById("results");
				results = assert(true, name).appendChild(
					document.createElement("ul"));
				fn();
			});
/*the internal implementation function runTest() is called whenever a test is queued or dequeued.
It checks to see if the suite is currently unpaused and if there is something in the queue, 
in which case it would dequeue a test and try to execute it. Also, after the test group is finished executing,
runTest() will check to see if the suite is currently paused, and if its not (meaning only asynchronous tests were run in this group),
runTest() will begin executing the next group of tests */

			runTest();
		};

//pause() should be called from within a test function and tells the test suite to pause executing tests until the test group is done

		this.pause = function () {
			paused = false;
			setTimeout(runTest, 1);
		};

//resume() unpauses the tests and starts the next test running after a short delay designed to avoid long-running code blocks.

		this.resume = function () {
			paused = false;
			setTimeout(runTest, 1);
		};
		function runTest() {
			if (!paused && queue.length) {
				queue.shift()();
				if (!paused) {
					resume();
				}
			}
		}
	this.assert = function(value, desc) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if (!value) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};	
})();
window.onload = function() {
	test("Async Test #1", function(){
		pause();
		setTimeout(function(){
			assert(true, "First test completed");
			resume();
		}, 1000;
	});
});
