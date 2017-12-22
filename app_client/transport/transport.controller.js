(function () {
	angular
	.module('BaitsaagchApp')
	.controller('transportCtrl', transportCtrl);

	transportCtrl.$inject = ['$routeParams', 'baitsaagchData'];
	function transportCtrl ($routeParams, baitsaagchData) {
		var vm = this;

		baitsaagchData.getTransport($routeParams.bus_id)
	    .then(function successCallback(response) {
	      //console.log(response);
	      vm.transport = response.data;
	      vm.content = {
	      	speed : (vm.transport.distance/(((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1))).toFixed(2) + "км/цаг"
		  };

	      console.log(((Math.abs(Date.now() - Date.parse(vm.transport.fromDate))) / (1000 * 60 * 60)).toFixed(1));
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
      	vm.submit = function() {
		      console.log(vm.transport._id);
			var late, speed, change;
			if (vm.chb1 == true)
				late = true;
			else
				late = false;
			if (vm.chb2 == true)
				speed = true;
			else
				speed = false;
			if (vm.chb3 == true)
				change = true;
			else
				change = false;
			baitsaagchData.updateCameDate(vm.transport._id, late, speed, change)
			.then(function successCallback(response) {
		    },
		    function errorCallback(response) {
		    });
      	};
	}
})();