
angular.module("gallery.options.custom")
.run(['$rootScope', function($rootScope) {

    console.log("Desarrollar situaciones generales")
}])
.controller('homeInitCtrl.custom', ['$rootScope','$scope', 
    function($rootScope,$scope) {
        console.timeEnd("Termino Custom JS extension")

        $scope.custom = {};


        $scope.custom.msg ="PROPIEDAD DESDE EXTENSION";


        $scope.custom.fnexample = function(){
            alert("examples")
        }

        $scope.custom.pop = function(){
	        toaster.pop('info', "title", "text");
	    };

}])
