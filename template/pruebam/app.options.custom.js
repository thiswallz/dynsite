console.log("INIT OPTION")
angular.module("gallery.options.custom")

.controller('homeInitCtrl.custom', ['$rootScope','$scope', 
    function($rootScope,$scope) {
        $scope.custom = {};


        $scope.custom.msg ="PROPIEDAD DESDE EXTENSION";


        $scope.custom.fnexample = function(){
            alert("examples")
        }

}])
