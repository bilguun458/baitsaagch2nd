(function () { 
	angular
	 .module('BaitsaagchApp')
	 .service('myGlobalVars', myVars);

	function myVars () {
		return {
	    	name : 'Улаанбаатар'
		};
	}
})();