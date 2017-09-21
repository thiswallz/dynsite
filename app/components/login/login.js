/**
 *
 * @ngdoc module
 * @name gallery.login
 *
 * @requires login.service,login.controller
 *
 * @description
 *
 * Modulo Login general de plantillas
 *
 *
 **/
angular.module("gallery.login", [
    "login.service",
    "login.controller"
])


.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: configSite.template_view + "/login.html"
        })
        .when('/logincustom', {
            templateUrl: configSite.template_view + "/logincustom.html"
        });
}])