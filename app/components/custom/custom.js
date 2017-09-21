/**
 *
 * @ngdoc module
 * @name gallery.custom
 *
 * @requires custom.directive,custom.filter,custom.service,custom.controller,ngSanitize,localytics.directives,angularTrix
 *
 * @description
 *
 * Modulo de comportamiento en la edicion de componentes de plantillas
 *
 *
 **/
angular.module("gallery.custom", [
    "custom.directive",
    "custom.filter",
    "custom.service",
    "custom.controller",
    "ngSanitize",
    "localytics.directives",
    "angularTrix"
])


.config(['$routeProvider', function($routeProvider) {

}])

.run(['$rootScope', function($rootScope) {
    $rootScope.getUrlCommonHtml = function() {
        return configSite.template_base + "" + "common/_content_customizer.html";
    };
    injectStylesEdit()
}])
