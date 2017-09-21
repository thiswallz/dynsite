/**
 *
 * @ngdoc module
 * @name gallery.payment
 *
 * @requires payment.controller
 *
 * @description
 *
 * Modulo para los pagos por vista de videos y paginas customs
 *
 *
 **/
angular.module("gallery.payment", [
    "payment.controller"
])


.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
        .when('/payment', {
            templateUrl: configSite.template_view + "/payment.html"
        })
        .when('/paymentsuccess', {
            templateUrl: configSite.template_view + "/payment/_pay_voucher.html"
        })
}])