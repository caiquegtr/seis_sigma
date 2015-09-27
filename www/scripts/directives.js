(function(){
	///////////////////////////////////////////
	// Iterate over array of avaialable events
	// and add them to the CCGestures module:
	///////////////////////////////////////////
	["tap", "singletap", "longtap", "doubletap", "swipe", "swipeleft", 
	"swiperight", "swipeup", "swipedown"].forEach(function(gesture) {
		// Camel Case each directive:
		//===========================
		var ccGesture = "cc" + (gesture.charAt(0).toUpperCase() + gesture.slice(1));

		// Create module for each directive:
		//==================================
		CCGestures.directive(ccGesture, ["$parse",
		  function($parse) {
		    return {
		      // Restrict to attribute:
		      restrict: "A",
		      compile: function ($element, attr) {
		        // Define the attribute for the gesture:
		        var fn = $parse(attr[ccGesture]);
		        return function ngEventHandler(scope, element) {
		          // Register event for directive:
		          $(element).on(gesture, function (event) {
		            scope.$apply(function () {
		              fn(scope, {$event: event});
		            });
		          });
		        };
		      }
		    };
		  }
		]);
	});
	
})();