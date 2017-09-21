angular.module("channel.service", [
])

/**
 * @ngdoc type
 * @module channel.service
 * @name ChannelService
 *
 * @description
 *
 * ## Servicio de generación de Channel
 * 
 */
.factory('ChannelService', ['$http', function($http) {
    var urlBase = endPoint['Channel'];
    var dataFactory = {};
    dataFactory.getChannel = function(id) {
        return $http.get(urlBase + '/?uuid=' + id + '&player=');
    };
    return dataFactory;
}])