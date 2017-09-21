angular.module("gallery.app")

.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            controller: "homeInitCtrl",
            template: window.tmp_custom + "<div ng-include=\"'" + configSite.template_view + "/home.html'\" ></div>"
        })
        .when("/video/:videoAlias", {
            controller: "homeInitCtrl",
            templateUrl: configSite.template_view + "/video.html"
        })
        .when("/tags/:tag", {
            controller: "homeInitCtrl",
            templateUrl: configSite.template_view + "/tags.html"
        })
        .when("/search", {
            controller: "homeInitCtrl",
            templateUrl: configSite.template_view + "/search.html"
        })
        .when("/live", {
            controller: "homeInitCtrl",
            templateUrl: configSite.template_view + "/live.html"
        })
        .otherwise({
            templateUrl: configSite.template_view + "/404.html"
        });
    $locationProvider.html5Mode({
        enabled: false    
    });
}]);