angular.module("gallery.app")


.factory('commonService', ['$http','styleService','formatValidateService', 
    function($http, styleService, formatValidateService) {
        var _header = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        return {
            http:{
                header: _header
            },
            styleService: styleService,
            formatValidateService: formatValidateService
        }
}])