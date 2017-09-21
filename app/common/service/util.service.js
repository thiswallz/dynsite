angular.module("gallery.app")


.factory('utilSectionService', ['$http', '$sce',
    function($http, $sce) {
        function _getList(){
            if(window.configSite.sections && window.configSite.sections.length>0){
                return window.configSite.sections;
            }
            return [];
        }

        return {
            getList : _getList
        }
}])