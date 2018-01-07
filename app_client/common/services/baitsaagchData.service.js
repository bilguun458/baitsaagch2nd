//require('..../config.json');
(function () {
	angular
	 .module('BaitsaagchApp')
	 .service('baitsaagchData', baitsaagchData);

	baitsaagchData.$inject = ['$q', '$http'];
	function baitsaagchData ($q, $http) {
		var readConfigFile = function() {
			var deferred = $q.defer();

			$http.get('config.json').then(function successCallback(response) {
		      //console.log(response.data.getTransportsList);
		      deferred.resolve(response);
		    });

		    return deferred.promise;
		}

		var getTransportsList = function (loc) {
			return readConfigFile().then(function (response) {
				return $http.get(response.data.getTransportsList + loc);
			});
		};
		var getTransport = function (id) {
			return readConfigFile().then(function (response) {
				return $http.get(response.data.getTransport + id);
			});
		};
		var getLocs = function () {
			return readConfigFile().then(function (response) {
				return $http.get(response.data.getLocs);
			});
		};
		var getLocation = function (bus_num) {
			return readConfigFile().then(function (response) {
				return $http.get(response.data.getLocation + bus_num);
			});
		};
		return {
			getTransportsList : getTransportsList,
			getTransport : getTransport,
			getLocs : getLocs,
			getLocation : getLocation
		};
	}
})();