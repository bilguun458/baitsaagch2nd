(function () { 
  angular
   .module('BaitsaagchApp')
   .controller('locSelectCtrl', myCtrl);

  myCtrl.$inject = ['$scope', '$route', 'myGlobalVars'];
  function myCtrl ($scope, $route, myGlobalVars) {//Ehleed root page ruu orohod ub geer unshij avchirdag heseg, tegeed solih tutamd garganaa
    var vm = this;

    $scope.locs=[{name:"Улаанбаатар"},{name:"Дархан"},{name:"Чойр"},{name:"Замын Үүд"}];
    $scope.getHoPa=function(item){
      if (item != null) {
        myGlobalVars.name = item.name;
        $route.reload();
      }
    };
    
  }
})();