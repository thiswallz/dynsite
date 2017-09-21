
angular.module("gallery.options.custom")
.run(['$rootScope', function($rootScope) {

    console.log("Desarrollar situaciones generales")
}])
.controller('homeInitCtrl.custom', ['$rootScope','$scope', 'toaster',
    function($rootScope,$scope, toaster) {
        $scope.custom = {};

        $scope.custom.pop = function(){
            console.log(toaster)
	        toaster.pop('info', "title", "text");
	    };

}])
