(function () { 
  angular
   .module('BaitsaagchApp')
   .controller('homeCtrl', homeCtrl)
   .directive('test', transportDir);

  homeCtrl.$inject = ['$scope', 'myGlobalVars', 'baitsaagchData', '$compile', '$q'];
  function homeCtrl ($scope, myGlobalVars, baitsaagchData, $compile, $q) {//Ehleed root page ruu orohod ub geer unshij avchirdag heseg
    var vm = this;

    baitsaagchData.getLocs()//select deerh loc unshih heseg
    .then(function successCallback(response) {
      vm.locs = response.data ;
    },
    function errorCallback(response) {
    });
    vm.getHoPa=function(item){
      if (item != null) {
        myGlobalVars.name = item.name;
        myGlobalVars.lat = item.lat;
        myGlobalVars.lng = item.lng;

        vm.message = "Checking transports information";
          $( "#came" ).empty();
          $( "#come" ).empty();
    
        baitsaagchData.getTransportsList(myGlobalVars.name)
        .then(function successCallback(response) {
          //console.log(response);
          vm.message = response.data.length > 0 ? "" : "Энэ байршилд ирэх автобус олдсонгүй";
          vm.transports = response.data ;

          var checkCome = false;
          var checkCame = false;

          for (var i = 0; i < vm.transports.length; i++) {

            var vert = getDistanceFromLatLonInKm(vm.transports[i].directions[0].lat, vm.transports[i].directions[0].lng,
              vm.transports[i].directions[vm.transports[i].directions.length - 1].lat, vm.transports[i].directions[0].lng);
            var hori = getDistanceFromLatLonInKm(vm.transports[i].directions[0].lat, vm.transports[i].directions[0].lng,
              vm.transports[i].directions[0].lat, vm.transports[i].directions[vm.transports[i].directions.length - 1].lng);
            
            if (hori < vert) {
              if (vm.transports[i].directions[0].lat - vm.transports[i].directions[vm.transports[i].directions.length - 1].lat > 0) vm.up_down = "vertdown";
              else vm.up_down = "vertup";
            } else {
              if (vm.transports[i].directions[0].lng - vm.transports[i].directions[vm.transports[i].directions.length - 1].lng > 0) vm.up_down = "horileft";
              else vm.up_down = "horiright";
            }
            var el = $compile("<test info=\"vm.transports["+i+"]\"></test>")($scope);
            var loc_pos = {"lat": 46.353, "lng": 108.403};
            /*
            var get_loc = function() {
              var deferred = $q.defer();

              baitsaagchData.getLocation(vm.transports[i].busNumber)
              .then(function successCallback (response) {
                deferred.resolve(response);
              });

                return deferred.promise;
            }
            var loc_pos = get_loc().then(function (response) {
              console.log(response.data);
              return response.data;
            });
            console.log(loc_pos);*/

            if (vm.up_down == "vertup") {
                if (loc_pos.lat - myGlobalVars.lat > 0) {
                  if (checkCame == false) {
                    checkCame = true;
                    $( "#came" ).append("<h5>Өнгөрсөн</h5>");
                  }
                  $( "#came" ).append(el);
                }
                else {
                  if (checkCome == false) {
                    checkCome = true;
                    $( "#come" ).append("<h5>Ирэх</h5>");
                  }
                  $( "#come" ).append(el);
                }
              } else if (vm.up_down == "vertdown") {
                if (loc_pos.lat - myGlobalVars.lat < 0) {
                  if (checkCame == false) {
                    checkCame = true;
                    $( "#came" ).append("<h5>Өнгөрсөн</h5>");
                  }
                  $( "#came" ).append(el);
                }
                else {
                  if (checkCome == false) {
                    checkCome = true;
                    $( "#come" ).append("<h5>Ирэх</h5>");
                  }
                  $( "#come" ).append(el);
                }
              } else if (vm.up_down == "horileft") {
                if (loc_pos.lng - myGlobalVars.lng > 0) {
                  if (checkCame == false) {
                    checkCame = true;
                    $( "#came" ).append("<h5>Өнгөрсөн</h5>");
                  }
                  $( "#came" ).append(el);
                }
                else {
                  if (checkCome == false) {
                    checkCome = true;
                    $( "#come" ).append("<h5>Ирэх</h5>");
                  }
                  $( "#come" ).append(el);
                }
              } else if (vm.up_down == "horiright") {
                if (loc_pos.lng - myGlobalVars.lng < 0) {
                  if (checkCame == false) {
                    checkCame = true;
                    $( "#came" ).append("<h5>Өнгөрсөн</h5>");
                  }
                  $( "#came" ).append(el);
                }
                else {
                  if (checkCome == false) {
                    checkCome = true;
                    $( "#come" ).append("<h5>Ирэх</h5>");
                  }
                  $( "#come" ).append(el);
                }
              }
          }
        },
        function errorCallback(response) {
          vm.message = "Sorry, something's gone wrosng";
        });
      }
    };




    vm.sidebar = {
      hello: "Энэ өдрийн мэнд!",
      content: "Энэхүү апп нь авто тээврийн байцаагчийн ажлыг хөнгөвчилхөд зориулсан апп юм. Нэмэлт боломжуудыг оруулахыг хүсвэл BaitsaagchApp @yahoo.com хаягаар холбогдоно уу."
    }; 
    
  }

  function transportDir() {

    return {
      restrict: 'E',
      scope: {
        info: '='
      },
      template: '<a href="transport/{{ id }}"><div class="col-md-2 col-xs-12 list-group-item list-group-item-action" style="float: left; margin-left: 10px; margin-top: 10px;">'
                    +'<h5 style="position: absolute; right: 10px; margin-top: -35px;">{{ time }}</h5>'
                    +'<h3 style="margin-top: 0px;">{{ busNum }}</h3>'
                    +'<span>{{ fromDir }}-{{ toDir}}</span>'
                  +'</div></a>',
      controller: (['$scope', 'baitsaagchData', 'myGlobalVars', function ($scope, baitsaagchData, myGlobalVars) {
        //console.log($element[0].parentElement);
        //if ($element[0].parent)
        $scope.id = $scope.info._id;
        baitsaagchData.getLocation($scope.info.busNumber)//select deerh loc unshih heseg
        .then(function successCallback(response) {
          var pos = response.data;

          var time = getDistanceFromLatLonInKm(pos.lat, pos.lng, myGlobalVars.lat, myGlobalVars.lng) / 80;
          $scope.time = time.toFixed(1) + "цаг";
          //console.log(pos.lat);
        },
        function errorCallback(response) {
        });

        $scope.busNum = $scope.info.busNumber;
        $scope.fromDir = $scope.info.directions[0].name;
        $scope.toDir = $scope.info.directions[$scope.info.directions.length - 1].name;
      }])
    };
  }

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
})();