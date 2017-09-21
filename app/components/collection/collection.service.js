angular.module("collection.service", [])

/**
 * @ngdoc type
 * @module collection.service
 * @name CollectionDataGeneralService
 *
 * @description
 *
 * ## Servicio de carga y generacion de colleciones
 * 
 */
.factory('CollectionDataGeneralService', ['$http', function($http) {

    var getVideoCollection = function(params) {
        var json = btoa(JSON.stringify({ order: params.order, filters: params.filters, source: params.source }));
        return $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            url: endPoint['getCollectionMethod'] + "/" + params.id_collection +
                "?page=" + params.page +
                "&items=" + params.items +
                "&videoId=" + params.videoId +
                "&tags=" + params.tags +
                "&keywords=" + params.keywords +
                "&json=" + json +
                "&cache=" + params.cache
        });
    };

    var getVideosExtraData = function(params) {
        return $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            url: endPoint['getVideosData']
        });
    };

    var getSourceVideoCollection = function(id_site) {
        return $http({
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            url: endPoint['getVideoSourceCollections']
        });
    };

    var setLikeOnVideoCollection = function(params) {
        return $http({
            method: 'PUT',
            //headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'},
            data: params,
            url: endPoint['setAsLikedVideo']
        });
    };

    return {
        getVideoCollection: getVideoCollection,
        getVideosExtraData: getVideosExtraData,
        getSourceVideoCollection: getSourceVideoCollection,
        setLikeOnVideoCollection: setLikeOnVideoCollection
    };
}])