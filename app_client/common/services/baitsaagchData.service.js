(function () { 
	angular
	 .module('BaitsaagchApp')
	 .service('baitsaagchData', baitsaagchData);

	baitsaagchData.$inject = ['$http'];
	function baitsaagchData ($http) {
		var getTransportsList = function (loc) {
			return $http.get('/api/transports/'+ loc);
		};
		var getTransport = function (id) {
			return $http.get('/api/transport/' + id);
		};
		var updateCameDate = function (id, late, speed, change) {
			return $http.put('/api/transport/' + id + '/' + late + '/' + speed + '/' + change);
		};
		return {
			getTransportsList : getTransportsList,
			getTransport : getTransport,
			updateCameDate : updateCameDate
		};
	}
})();