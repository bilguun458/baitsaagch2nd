(function () { 
	angular
	 .module('BaitsaagchApp')
	 .service('myGlobalVars', myVars);

	function myVars () {
		return {
	    	name : 'Улаанбаатар',
	    	lat : 47.8864,
	    	lng : 106.9057
		};
	}
})();