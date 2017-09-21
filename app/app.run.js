angular.module("gallery.app").run(['utilSectionService','$rootScope', '$location', '$cookieStore', '$http', '$window', 'AuthenticationService', function(utilSectionService, $rootScope, $location, $cookieStore, $http, $window, AuthenticationService) {
    /**
     * codigo google analytics
     */
    if (configSite.codigo_analytics != '') {
        // initialise google analytics
        $window.ga('create', configSite.codigo_analytics, 'auto');
        // record page view on each state change
        //$window.ga('send', 'pageview', $location.path());
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            $window.ga('send', 'pageview', $location.path());
        });
    }


    /**
     * para un sitio despublicado
     */
    if (configSite.ACTIVO == '0') {
        $location.path('/disable');
    } else {
        /**
         * cuando es un sitio con acceso propia base de datos
         */
        if (configSite.custom_access == '1') {
            $rootScope.isLogin = true; //variable que activa boton signOut
            // keep user logged in after page refresh
            $rootScope.globalsCustom = $cookieStore.get('_authdata_LoginCustom') || {};
            if ($rootScope.globalsCustom.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globalsCustom.currentUser.authdata;
            }
            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/logincustom' && !$rootScope.globalsCustom.currentUser) {
                    $location.path('/logincustom');
                }
            });
        }
        /**
         * cuando es un sitio privado
         */
        if (configSite.private == '1') {
            $rootScope.isLogin = true; //variable que activa boton signOut
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('_authdata') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }
            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }
        /**
         * sitio pagado
         */
        if (configSite.payment == '1') {
            $rootScope.globalsPayment = $cookieStore.get('_paydata') || {};
            if ($rootScope.globalsPayment.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globalsPayment.currentUser.authdata;
            }
        }
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            if (configSite.payment == '1' && $location.path() !== '/paymentsuccess') {
                AuthenticationService.PaymentStatus();
                if ($location.path() !== '/payment' && !$rootScope.globalsPayment.currentUser) {
                    $location.path('/payment');
                }
            }
        });
    }

}])