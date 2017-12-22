(function () { 
  angular
   .module('BaitsaagchApp')
   .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['myGlobalVars', 'baitsaagchData'];
  function homeCtrl (myGlobalVars, baitsaagchData) {//Ehleed root page ruu orohod ub geer unshij avchirdag heseg
    var vm = this;

    vm.sidebar = {
      hello: "Энэ өдрийн мэнд!",
      content: "Энэхүү апп нь авто тээврийн байцаагчийн ажлыг хөнгөвчилхөд зориулсан апп юм. Нэмэлт боломжуудыг оруулахыг хүсвэл BaitsaagchApp @yahoo.com хаягаар холбогдоно уу."
    };
    vm.message = "Checking transports information";
    
    baitsaagchData.getTransportsList(myGlobalVars.name)
    .then(function successCallback(response) {
      //console.log(response);
      vm.message = response.data.length > 0 ? "" : "Энэ байршилд ирэх автобус олдсонгүй";
      vm.transports = response.data ;
    },
    function errorCallback(response) {
      vm.message = "Sorry, something's gone wrong";
    });
  }
})();