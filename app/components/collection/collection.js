/**
 *
 * @ngdoc module
 * @name gallery.collection
 *
 * @requires collection.directive,collection.filter,collection.service,collection.controller
 *
 * @description
 *
 * Modulo para la construccion de mostradores de videos y colecciones
 *
 *
 **/
angular.module("gallery.collection", [
    "collection.directive",
    "collection.filter",
    "collection.service",
    "collection.controller"
])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/collection/:collection", {
            controller: "homeInitCtrl",
            templateUrl: configSite.template_view + "/collections.html"
        })
}])