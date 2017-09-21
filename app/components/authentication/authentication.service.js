angular.module("authentication.service", [
])

/**
 * @ngdoc type
 * @module authentication.service
 * @name AuthenticationService
 *
 * @description
 *
 * ## Servicio de autenticación
 * Funcionalidades para ingresar y autenticar usuarios junto con sus credenciales
 */
.factory('AuthenticationService', ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', '$q', '$location', '$window',
    function(Base64, $http, $cookieStore, $rootScope, $timeout, $q, $location, $window) {
        var service = {};
        service.Login = function(username, password, callback) {
            var req = {
                method: 'GET',
                url: endPoint['private'],
                params: { uname: username, pwd: password }
            };
            $http(req).then(function(response) {
                callback(response.data);
            }, function(error) {
                console.log(" service.Login response error", error);
            });
        };
        service.SetCredentials = function(username, password) {
            var authdata = Base64.encode(username + ':' + password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('_authdata', $rootScope.globals);
        };

        service.ClearCredentials = function() {
            $rootScope.globals = {};
            $cookieStore.remove('_authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
        /**
         * Payment service
         */
        service.PaymentLogin = function(password, mail, idsitio, callback) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: endPoint['PaymentLogin'],
                data: { pwd: password, email: mail, sitio: idsitio }
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log(" service.PaymentValid response error", error);
                });
            //callback(deferred.promise);
            return deferred.promise;
        };
        service.PaymentValidate = function(password, mail, idsitio, callback) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: endPoint['getValidatePayment'],
                //params: { pwd: password, email: mail }
                data: { pwd: password, email: mail, sitio: idsitio }
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log(" service.PaymentValid response error", error);
                });
            //callback(deferred.promise);
            return deferred.promise;
        };

        service.SetCredentialsPayment = function(username, mail, idtrans) {
            var authdata = Base64.encode(username + ':' + mail + ':' + idtrans);
            $rootScope.globalsPayment = {
                currentUser: {
                    mail: mail,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('_paydata', $rootScope.globalsPayment);
        };

        service.ClearCredentialsPayment = function() {
            $rootScope.globalsPayment = {};
            $cookieStore.remove('_paydata');
            $cookieStore.remove('_paydata_init');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.PaymentStatus = function() {
            var _paydata = $cookieStore.get('_paydata');
            if ($location.path() !== '/payment' && !_paydata) {
                $location.path('/payment');
            }
        };

        service.PaymentInit = function(data) {
            $cookieStore.remove('_paydata_init');
            var authdata = Base64.encode(JSON.stringify(data));
            $cookieStore.put('_paydata_init', authdata);
        };

        service.PaymentSuccess = function() {
            var _paydata_init = $cookieStore.get('_paydata_init');
            if ($location.path() == '/paymentsuccess' && !_paydata_init) {
                $location.path('/payment');
            } else {
                _paydata_init = Base64.decode(_paydata_init);
                return JSON.parse(_paydata_init);
            }
        };
        /**
         * custom data
         */
        service.LoginCustomValidate = function(email, idsitio) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: endPoint['LoginCustomValidate'],
                params: { email: email, idsite: idsitio }
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log(" service.LoginCustomValidate response error", data, status, headers, config);
                });
            return deferred.promise;
        };

        service.LoginCustom = function(email, password, idsitio) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: endPoint['LoginCustom'],
                params: { email: email, pwd: password, idsite: idsitio }
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log(" service.LoginCustom response error", data, status, headers, config);
                });
            return deferred.promise;
        };

        service.SetCredentialsCustom = function(username, mail, idtrans, idsitio, iduser) {
            var session = $cookieStore.get('_authdata_LoginCustom');
            var authdata = Base64.encode(username + ':' + mail + ':' + idtrans + ':' + idsitio + ':' + iduser);
            $rootScope.globalsCustom = {
                currentUser: {
                    mail: mail,
                    session: idtrans,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('_authdata_LoginCustom', $rootScope.globalsCustom);
        };

        service.ClearCredentialsCustom = function() {
            $rootScope.globalsCustom = {};
            $cookieStore.remove('_authdata_LoginCustom');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        service.LoginCustomStatus = function() {
            var authdata = $cookieStore.get('_authdata_LoginCustom');
        };

        service.LoginCustomRecoverPassword = function(email, idsitio) {
            var deferred = $q.defer();
            var req = {
                method: 'PUT',
                url: endPoint['LoginCustom'],
                params: { email: email, idsite: idsitio }
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log(" service.LoginCustom response error", data, status, headers, config);
                });
            return deferred.promise;

        };

        service.LoginCustomSignOut = function() {
            var authdata = $cookieStore.get('_authdata_LoginCustom');
            var req = {
                method: 'DELETE',
                url: endPoint['LoginCustom'],
                params: authdata
            };
            $http(req)
                .success(function(data, status, headers, config) {
                    console.log("LoginCustomSignOut", data);
                    if (data.msg === 'ok') {
                        service.ClearCredentialsCustom();
                        $window.location.reload();
                    } else {

                    }
                }).error(function(data, status, headers, config) {
                    console.log(" service.LoginCustomSignOut response error", data, status, headers, config);
                });
        };


        service.signOut = function(){
            AuthenticationService.ClearCredentials();
            if (configSite.custom_access == '1') {
                AuthenticationService.LoginCustomSignOut();
            }
            $window.location.reload();
        }
        //return
        return service;
    }
])
/**
 * @ngdoc type
 * @module authentication.service
 * @name Base64
 *
 * @description
 *
 * ## Servicio de conversión de tipos en base a 64.
 * 
 */
.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    return {
        encode: function(input) {
            var output = "";
            var chr1,
                chr2,
                chr3 = "";
            var enc1,
                enc2,
                enc3,
                enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function(input) {
            var output = "";
            var chr1,
                chr2,
                chr3 = "";
            var enc1,
                enc2,
                enc3,
                enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
})