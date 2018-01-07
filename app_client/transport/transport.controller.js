(function () {
	angular
	.module('BaitsaagchApp')
	.controller('transportCtrl', transportCtrl);

	transportCtrl.$inject = ['$routeParams', 'baitsaagchData', '$sce', '$window'];
	function transportCtrl ($routeParams, baitsaagchData, $sce, $window) {
		var vm = this;
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;

		baitsaagchData.getTransport($routeParams.bus_id)
	    .then(function successCallback(response) {
	      //console.log(response);
	      vm.transport = response.data;
	      vm.content = {
	      	speed : (vm.transport.distance/(((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1))).toFixed(2) + "км/цаг"
		  };

		  vm.fromDir = vm.transport.directions[0].name;
		  vm.toDir = vm.transport.directions[vm.transport.directions.length - 1].name;

		  vm.calculateAndDisplayRoute = function() {
      		baitsaagchData.getLocation()//select deerh loc unshih heseg
	        .then(function successCallback(response) {
	          var pos = response.data;
	          console.log(vm.transport);

	          vm.busMarker = new google.maps.Marker({
				position: pos,
				map: vm.map,
				title: 'Автобус',
				animation: google.maps.Animation.BOUNCE,
				label: 'Bus',
	          });

	        },
	        function errorCallback(response) {
	        });
		    
		    var routeData = {
				origin: vm.transport.directions[0].lat + ', ' + vm.transport.directions[0].lng,
				destination: vm.transport.directions[vm.transport.directions.length - 1].lat + ', ' + vm.transport.directions[vm.transport.directions.length - 1].lng,
				travelMode: 'DRIVING',
				waypoints: []
		    }

		    for (var i = 1; i < vm.transport.directions.length - 1; i++) {
		    	routeData.waypoints.push({
				    location: vm.transport.directions[i].lat + ', ' + vm.transport.directions[i].lng,
				    stopover: true
				});
		    }

		    directionsService.route(routeData, function(response, status) {
			if (status === 'OK') {
			    directionsDisplay.setDirections(response);
			} else {
			    window.alert('Directions request failed due to ' + status);
			}
		    });

		}
		vm.calculateAndDisplayRoute();

		$window.initMap = function() {
		    vm.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 6,
			center: {lat: 46.3529, lng: 108.4032}
		    });
		    directionsDisplay.setMap(vm.map);
		    var marker = vm.busMarker;

		};
		$window.initMap();
	      //console.log(((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1));
	    },
	    function errorCallback(response) {
	      console.log("ene duudagdana gej baihguiee");
	    });
	    vm.change = function() {
	    	if ( vm.restTime > (((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1)) ) {
	    		vm.content = {
			      	speed : 'Амарсан цаг явсан цагаас хэтэрч болохгүй'
				  };
	    		//vm.restTime = vm.restTime / 10 - vm.restTime % 10;
	    	} else if (vm.restTime == null) { 
	    		vm.content = {
	    			speed : (vm.transport.distance/(((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1))).toFixed(1) + "км/цаг"
	        	};
	    	} else {
	    		vm.content = {
	        		speed : (vm.transport.distance/((((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1)) - vm.restTime)).toFixed(1)  + "км/цаг"
	        	};
	    	}
      	};

      	
	}
})();